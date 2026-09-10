import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'via_alto_alpine_secret_key_2026_super_secure';

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Bearer token missing.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        marketing_profile: {
          include: { activities: true }
        },
        shipping_addresses: true,
        vouchers: {
          include: { voucher: true }
        }
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'User associated with token no longer exists.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

// Optional Auth (populates req.user if token is present, continues otherwise)
export async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });
      if (user) {
        req.user = user;
      }
    } catch {
      // Ignore token verification errors for optional auth
    }
  }
  next();
}
