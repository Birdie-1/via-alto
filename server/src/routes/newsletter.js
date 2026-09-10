import { Router } from 'express';
import { prisma } from '../db.js';

export const newsletterRouter = Router();

// POST /api/newsletter/subscribe
newsletterRouter.post('/subscribe', async (req, res) => {
  try {
    const { email, name, source = 'homepage_cta' } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required.' });
    }

    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: email.toLowerCase().trim() },
      update: {
        is_active: true,
        source: source
      },
      create: {
        email: email.toLowerCase().trim(),
        name: name || null,
        source: source
      }
    });

    res.status(200).json({
      success: true,
      message: 'Subscribed successfully',
      subscriber
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to subscribe', details: err.message });
  }
});
