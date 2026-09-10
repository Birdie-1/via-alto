import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const ordersRouter = Router();

ordersRouter.use(requireAuth);

// GET /api/orders - User Order History
ordersRouter.get('/', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { user_id: req.user.id },
      include: {
        items: true,
        shipping_address: true
      },
      orderBy: { created_at: 'desc' }
    });

    const formatted = orders.map((o) => ({
      id: o.id,
      date: o.created_at.toISOString().split('T')[0],
      status: o.status,
      total: o.total_thb,
      subtotal: o.subtotal_thb,
      shippingFee: o.shipping_fee_thb,
      discount: o.discount_thb,
      pointsEarned: o.points_earned,
      paymentMethod: o.payment_method,
      voucherCode: o.voucher_code,
      shippingDestination: o.shipping_address ? `${o.shipping_address.district}, ${o.shipping_address.province}` : 'Bangkok',
      shippingAddress: o.shipping_address,
      items: o.items.map((i) => ({
        id: i.product_id,
        name: i.product_name,
        price: i.unit_price_thb,
        quantity: i.quantity,
        size: i.selected_size,
        color: i.selected_color,
        image: i.image_url
      }))
    }));

    res.json({ orders: formatted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders', details: err.message });
  }
});

// POST /api/orders - Place Order
ordersRouter.post('/', async (req, res) => {
  try {
    const {
      items = [],
      shippingAddress,
      paymentMethod = 'promptpay',
      voucherCode,
      subtotal,
      shippingFee = 0,
      discount = 0,
      total
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cannot place an empty order.' });
    }

    if (!shippingAddress || !shippingAddress.address) {
      return res.status(400).json({ error: 'Shipping address is required.' });
    }

    // Generate unique order ID
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderId = `VA-${randomSuffix}`;

    // 1 Alpine Point per ฿100 spent
    const pointsEarned = Math.floor((total || subtotal) / 100);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Create Order
      const order = await tx.order.create({
        data: {
          id: orderId,
          user_id: req.user.id,
          status: 'confirmed',
          payment_method: paymentMethod,
          subtotal_thb: subtotal,
          shipping_fee_thb: shippingFee,
          discount_thb: discount,
          total_thb: total,
          points_earned: pointsEarned,
          voucher_code: voucherCode || null
        }
      });

      // 2. Insert Order Items
      for (const item of items) {
        await tx.orderItem.create({
          data: {
            order_id: order.id,
            product_id: item.product?.id || item.id,
            product_name: item.product?.name || item.name || 'Alpine Gear',
            selected_size: item.selectedSize || item.size || 'One Size',
            selected_color: item.selectedColor?.name || item.color || null,
            unit_price_thb: item.product?.price || item.price,
            quantity: item.quantity || 1,
            total_price_thb: (item.product?.price || item.price) * (item.quantity || 1),
            image_url: item.selectedColor?.image || item.product?.image || item.image || '/images/prod_alpine_35l.jpg'
          }
        });
      }

      // 3. Snapshot Shipping Address
      await tx.orderShippingAddress.create({
        data: {
          order_id: order.id,
          recipient_name: shippingAddress.name || req.user.full_name,
          phone: shippingAddress.phone || req.user.tel_no || '',
          address_line: shippingAddress.address,
          subdistrict: shippingAddress.subdistrict || '',
          district: shippingAddress.district || '',
          province: shippingAddress.province || '',
          postal_code: shippingAddress.postalCode || ''
        }
      });

      // 4. Mark Voucher as Used
      if (voucherCode) {
        await tx.userVoucher.updateMany({
          where: {
            user_id: req.user.id,
            voucher_code: voucherCode
          },
          data: {
            is_used: true,
            used_at: new Date()
          }
        });
      }

      // 5. Award Alpine Points to User
      const updatedUser = await tx.user.update({
        where: { id: req.user.id },
        data: { points: { increment: pointsEarned } },
        include: {
          marketing_profile: { include: { activities: true } },
          shipping_addresses: true,
          vouchers: { include: { voucher: true } }
        }
      });

      // 6. Clear User's Cart
      await tx.cartItem.deleteMany({ where: { user_id: req.user.id } });

      return { order, updatedUser };
    });

    res.status(201).json({
      success: true,
      order: {
        id: result.order.id,
        total: result.order.total_thb,
        pointsEarned: result.order.points_earned,
        status: result.order.status
      },
      pointsEarned,
      message: 'Order placed successfully'
    });
  } catch (err) {
    res.status(500).json({ error: 'Order placement failed', details: err.message });
  }
});
