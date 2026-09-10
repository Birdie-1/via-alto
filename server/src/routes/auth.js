import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'via_alto_alpine_secret_key_2026_super_secure';
const JWT_EXPIRES_IN = '7d';

function formatUserResponse(user) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.full_name,
    telNo: user.tel_no,
    dateOfBirth: user.date_of_birth,
    tier: user.tier,
    points: user.points,
    emailVerified: user.email_verified,
    createdAt: user.created_at,
    marketingProfile: user.marketing_profile
      ? {
          primaryActivities: user.marketing_profile.activities?.map((a) => a.activity_key) || [],
          experienceLevel: user.marketing_profile.experience_level,
          sizes: {
            apparel: user.marketing_profile.size_apparel,
            footwear: user.marketing_profile.size_footwear
          },
          region: user.marketing_profile.region,
          discoverySource: user.marketing_profile.discovery_source,
          lineId: user.marketing_profile.line_id,
          referralCode: user.marketing_profile.referral_code
        }
      : null,
    shippingAddress: user.shipping_addresses?.[0]
      ? {
          name: user.shipping_addresses[0].recipient_name,
          phone: user.shipping_addresses[0].phone,
          address: user.shipping_addresses[0].address_line,
          subdistrict: user.shipping_addresses[0].subdistrict,
          district: user.shipping_addresses[0].district,
          province: user.shipping_addresses[0].province,
          postalCode: user.shipping_addresses[0].postal_code
        }
      : null,
    vouchers: user.vouchers?.map((uv) => ({
      code: uv.voucher.code,
      discount: uv.voucher.discount_type === 'percentage' ? `${uv.voucher.discount_val}% OFF` : `฿${uv.voucher.discount_val} OFF`,
      description: uv.voucher.description_en,
      isUsed: uv.is_used
    })) || []
  };
}

// POST /api/auth/register
authRouter.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, marketingProfile } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'fullName, email, and password are required.' });
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (existing) {
      return res.status(409).json({ error: 'An account with this email address already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const referralCode = `ALTO-${fullName.split(' ')[0].toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    // Create User transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: email.toLowerCase().trim(),
          full_name: fullName.trim(),
          password_hash: passwordHash,
          points: 500, // 500 Welcome Points
          tier: 'Alpine Explorer'
        }
      });

      // Create Marketing Profile
      const prof = await tx.userMarketingProfile.create({
        data: {
          user_id: user.id,
          experience_level: marketingProfile?.experienceLevel || 'intermediate',
          size_apparel: marketingProfile?.sizes?.apparel || 'M',
          size_footwear: marketingProfile?.sizes?.footwear || '42',
          region: marketingProfile?.region || 'northern',
          discovery_source: marketingProfile?.discoverySource || 'website',
          lineId: marketingProfile?.lineId || null,
          referral_code: referralCode
        }
      });

      // Add activities
      const acts = marketingProfile?.primaryActivities || ['trekking'];
      for (const act of acts) {
        await tx.userActivity.create({
          data: {
            profile_id: prof.id,
            activity_key: act
          }
        });
      }

      // Assign Welcome Voucher: GOBEYOND10
      await tx.userVoucher.create({
        data: {
          user_id: user.id,
          voucher_code: 'GOBEYOND10',
          is_used: false
        }
      });

      return tx.user.findUnique({
        where: { id: user.id },
        include: {
          marketing_profile: { include: { activities: true } },
          shipping_addresses: true,
          vouchers: { include: { voucher: true } }
        }
      });
    });

    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    res.status(201).json({
      token,
      user: formatUserResponse(newUser)
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
});

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        marketing_profile: { include: { activities: true } },
        shipping_addresses: true,
        vouchers: { include: { voucher: true } }
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    res.json({
      token,
      user: formatUserResponse(user)
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

// GET /api/auth/me
authRouter.get('/me', requireAuth, async (req, res) => {
  res.json({ user: formatUserResponse(req.user) });
});

// PUT /api/auth/profile
authRouter.put('/profile', requireAuth, async (req, res) => {
  try {
    const { fullName, telNo, dateOfBirth, marketingProfile, shippingAddress } = req.body;
    const userId = req.user.id;

    await prisma.$transaction(async (tx) => {
      // Update User base info
      await tx.user.update({
        where: { id: userId },
        data: {
          full_name: fullName !== undefined ? fullName : undefined,
          tel_no: telNo !== undefined ? telNo : undefined,
          date_of_birth: dateOfBirth !== undefined ? dateOfBirth : undefined
        }
      });

      // Update Marketing Profile
      if (marketingProfile) {
        const prof = await tx.userMarketingProfile.upsert({
          where: { user_id: userId },
          update: {
            experience_level: marketingProfile.experienceLevel,
            size_apparel: marketingProfile.sizes?.apparel,
            size_footwear: marketingProfile.sizes?.footwear,
            region: marketingProfile.region,
            discovery_source: marketingProfile.discoverySource,
            line_id: marketingProfile.lineId
          },
          create: {
            user_id: userId,
            experience_level: marketingProfile.experienceLevel || 'intermediate',
            size_apparel: marketingProfile.sizes?.apparel || 'M',
            size_footwear: marketingProfile.sizes?.footwear || '42',
            region: marketingProfile.region || 'northern',
            discovery_source: marketingProfile.discoverySource || 'website',
            line_id: marketingProfile.lineId
          }
        });

        if (marketingProfile.primaryActivities && Array.isArray(marketingProfile.primaryActivities)) {
          await tx.userActivity.deleteMany({ where: { profile_id: prof.id } });
          for (const act of marketingProfile.primaryActivities) {
            await tx.userActivity.create({
              data: { profile_id: prof.id, activity_key: act }
            });
          }
        }
      }

      // Update or create shipping address
      if (shippingAddress) {
        const existingAddr = await tx.userShippingAddress.findFirst({ where: { user_id: userId } });
        if (existingAddr) {
          await tx.userShippingAddress.update({
            where: { id: existingAddr.id },
            data: {
              recipient_name: shippingAddress.name || req.user.full_name,
              phone: shippingAddress.phone || req.user.tel_no || '',
              address_line: shippingAddress.address,
              subdistrict: shippingAddress.subdistrict,
              district: shippingAddress.district,
              province: shippingAddress.province,
              postal_code: shippingAddress.postalCode
            }
          });
        } else {
          await tx.userShippingAddress.create({
            data: {
              user_id: userId,
              recipient_name: shippingAddress.name || req.user.full_name,
              phone: shippingAddress.phone || req.user.tel_no || '',
              address_line: shippingAddress.address,
              subdistrict: shippingAddress.subdistrict,
              district: shippingAddress.district,
              province: shippingAddress.province,
              postal_code: shippingAddress.postalCode,
              is_default: true
            }
          });
        }
      }
    });

    const updated = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        marketing_profile: { include: { activities: true } },
        shipping_addresses: true,
        vouchers: { include: { voucher: true } }
      }
    });

    res.json({ user: formatUserResponse(updated) });
  } catch (err) {
    res.status(500).json({ error: 'Profile update failed', details: err.message });
  }
});
