import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const cartRouter = Router();

// All cart operations require authentication
cartRouter.use(requireAuth);

// GET /api/cart
cartRouter.get('/', async (req, res) => {
  try {
    const items = await prisma.cartItem.findMany({
      where: { user_id: req.user.id },
      include: {
        product: {
          include: {
            color_variants: { include: { color: true } },
            sizes: true
          }
        }
      },
      orderBy: { created_at: 'asc' }
    });

    // Format to match frontend cart state
    const formatted = items.map((item) => {
      const colorVariant = item.product.color_variants.find(
        (cv) => cv.color_id === item.selected_color_id
      );
      return {
        id: item.id,
        productId: item.product_id,
        quantity: item.quantity,
        selectedSize: item.selected_size,
        selectedColor: colorVariant
          ? {
              id: colorVariant.color.id,
              name: colorVariant.color.name_en,
              name_th: colorVariant.color.name_th,
              hex: colorVariant.color.hex,
              image: colorVariant.image_url
            }
          : null,
        product: {
          id: item.product.id,
          name: item.product.name_en,
          name_th: item.product.name_th,
          price: item.product.price_thb,
          image: item.product.image_url
        }
      };
    });

    res.json({ items: formatted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve cart items', details: err.message });
  }
});

// POST /api/cart/items
cartRouter.post('/items', async (req, res) => {
  try {
    const { productId, size, colorId, quantity = 1 } = req.body;

    if (!productId || !size) {
      return res.status(400).json({ error: 'productId and size are required' });
    }

    const qty = parseInt(quantity, 10) || 1;

    // Check if item already exists in user cart
    const existing = await prisma.cartItem.findFirst({
      where: {
        user_id: req.user.id,
        product_id: parseInt(productId, 10),
        selected_size: size,
        selected_color_id: colorId || null
      }
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + qty }
      });
      return res.json({ item: updated, message: 'Quantity updated' });
    }

    const newItem = await prisma.cartItem.create({
      data: {
        user_id: req.user.id,
        product_id: parseInt(productId, 10),
        selected_size: size,
        selected_color_id: colorId || null,
        quantity: qty
      }
    });

    res.status(201).json({ item: newItem, message: 'Item added to bag' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item to bag', details: err.message });
  }
});

// PUT /api/cart/items/:id
cartRouter.put('/items/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { quantity } = req.body;

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id } });
      return res.json({ message: 'Item removed from bag' });
    }

    const updated = await prisma.cartItem.update({
      where: { id },
      data: { quantity: parseInt(quantity, 10) }
    });

    res.json({ item: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item quantity', details: err.message });
  }
});

// DELETE /api/cart/items/:id
cartRouter.delete('/items/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.cartItem.delete({ where: { id } });
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item', details: err.message });
  }
});

// DELETE /api/cart (Clear all)
cartRouter.delete('/', async (req, res) => {
  try {
    await prisma.cartItem.deleteMany({ where: { user_id: req.user.id } });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart', details: err.message });
  }
});
