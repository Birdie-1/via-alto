import { Router } from 'express';
import { prisma } from '../db.js';

export const productsRouter = Router();

// GET /api/products/featured
productsRouter.get('/featured', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { is_featured: true, in_stock: true },
      include: {
        sizes: true,
        color_variants: { include: { color: true } },
        category: true
      },
      take: 8
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch featured products', details: err.message });
  }
});

// GET /api/categories
productsRouter.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories', details: err.message });
  }
});

// GET /api/products - Filtered & Sorted Product List
productsRouter.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort, search, inStock, page = 1, limit = 50 } = req.query;

    const where = {};

    if (category && category !== 'all') {
      where.category_id = category.toLowerCase();
    }

    if (minPrice || maxPrice) {
      where.price_thb = {};
      if (minPrice) where.price_thb.gte = parseInt(minPrice, 10);
      if (maxPrice) where.price_thb.lte = parseInt(maxPrice, 10);
    }

    if (search) {
      where.OR = [
        { name_en: { contains: search, mode: 'insensitive' } },
        { name_th: { contains: search, mode: 'insensitive' } },
        { description_en: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (inStock === 'true') {
      where.in_stock = true;
    }

    // Sorting
    let orderBy = { id: 'asc' };
    if (sort === 'price_asc') orderBy = { price_thb: 'asc' };
    else if (sort === 'price_desc') orderBy = { price_thb: 'desc' };
    else if (sort === 'rating') orderBy = { rating: 'desc' };
    else if (sort === 'name') orderBy = { name_en: 'asc' };

    const take = parseInt(limit, 10);
    const skip = (parseInt(page, 10) - 1) * take;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        take,
        skip,
        include: {
          sizes: true,
          color_variants: {
            include: { color: true }
          },
          category: true
        }
      }),
      prisma.product.count({ where })
    ]);

    res.json({
      products,
      pagination: {
        total,
        page: parseInt(page, 10),
        limit: take,
        totalPages: Math.ceil(total / take)
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

// GET /api/products/:id - Single Product Details
productsRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        sizes: true,
        color_variants: {
          include: { color: true }
        },
        category: true
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product', details: err.message });
  }
});

// GET /api/products/:id/recommendations - Behavioral & Complementary Product Recommendations
productsRouter.get('/:id/recommendations', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const limit = parseInt(req.query.limit, 10) || 4;

    const currentProduct = await prisma.product.findUnique({
      where: { id },
      select: { id: true, category_id: true }
    });

    if (!currentProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const COMPLEMENTARY_MAP = {
      backpacks: ['clothing', 'accessories', 'footwear'],
      clothing: ['accessories', 'clothing', 'backpacks'],
      footwear: ['accessories', 'clothing', 'backpacks'],
      camping: ['camping', 'accessories', 'backpacks'],
      accessories: ['backpacks', 'clothing', 'camping']
    };

    const targetCategories = COMPLEMENTARY_MAP[currentProduct.category_id] || ['accessories', 'clothing'];

    const recommendations = await prisma.product.findMany({
      where: {
        id: { not: id },
        category_id: { in: targetCategories },
        in_stock: true
      },
      orderBy: [
        { is_featured: 'desc' },
        { rating: 'desc' }
      ],
      take: limit,
      include: {
        sizes: true,
        color_variants: {
          include: { color: true }
        },
        category: true
      }
    });

    res.json({
      productId: id,
      recommendations
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recommendations', details: err.message });
  }
});
