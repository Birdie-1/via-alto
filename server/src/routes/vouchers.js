import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';

export const vouchersRouter = Router();

// GET /api/vouchers - User's vouchers
vouchersRouter.get('/', requireAuth, async (req, res) => {
  try {
    const userVouchers = await prisma.userVoucher.findMany({
      where: { user_id: req.user.id },
      include: { voucher: true }
    });

    const formatted = userVouchers.map((uv) => ({
      code: uv.voucher.code,
      discount: uv.voucher.discount_type === 'percentage' ? `${uv.voucher.discount_val}% OFF` : `฿${uv.voucher.discount_val} OFF`,
      description: uv.voucher.description_en,
      description_th: uv.voucher.description_th,
      minSpend: uv.voucher.min_spend,
      isUsed: uv.is_used
    }));

    res.json({ vouchers: formatted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vouchers', details: err.message });
  }
});

// POST /api/vouchers/validate
vouchersRouter.post('/validate', optionalAuth, async (req, res) => {
  try {
    const { code, subtotal = 0 } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Voucher code is required' });
    }

    const voucher = await prisma.voucher.findUnique({
      where: { code: code.trim().toUpperCase() }
    });

    if (!voucher) {
      return res.status(404).json({ valid: false, error: 'Invalid voucher code.' });
    }

    if (subtotal < voucher.min_spend) {
      return res.status(400).json({
        valid: false,
        error: `Minimum spend of ฿${voucher.min_spend.toLocaleString()} required for this code.`
      });
    }

    // If user is authenticated, check if they already redeemed this voucher
    if (req.user) {
      const userVoucher = await prisma.userVoucher.findUnique({
        where: {
          user_id_voucher_code: {
            user_id: req.user.id,
            voucher_code: voucher.code
          }
        }
      });
      if (userVoucher && userVoucher.is_used) {
        return res.status(400).json({
          valid: false,
          error: 'This voucher code has already been redeemed.'
        });
      }
    }

    let discountAmount = 0;
    if (voucher.discount_type === 'percentage') {
      discountAmount = Math.round((subtotal * voucher.discount_val) / 100);
    } else {
      discountAmount = voucher.discount_val;
    }

    res.json({
      valid: true,
      code: voucher.code,
      discountType: voucher.discount_type,
      discountVal: voucher.discount_val,
      discountAmount,
      description: voucher.description_en,
      description_th: voucher.description_th
    });
  } catch (err) {
    res.status(500).json({ error: 'Voucher validation failed', details: err.message });
  }
});
