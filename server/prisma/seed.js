import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PRODUCTS } from '../../src/data/products.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🏔️ Starting VIA ALTO Database Seed...');

  // 1. Seed Categories
  const categories = [
    { id: 'backpacks', name_en: 'Backpacks', name_th: 'เป้สะพายหลัง', image_url: '/images/cat_backpacks.jpg' },
    { id: 'clothing', name_en: 'Apparel & Shells', name_th: 'เสื้อผ้าและแจ็คเก็ต', image_url: '/images/cat_clothing.jpg' },
    { id: 'footwear', name_en: 'Footwear', name_th: 'รองเท้าเดินป่า', image_url: '/images/cat_footwear.jpg' },
    { id: 'camping', name_en: 'Camp & Sleep', name_th: 'แคมป์ปิ้งและเต็นท์', image_url: '/images/cat_camping.jpg' },
    { id: 'accessories', name_en: 'Accessories', name_th: 'อุปกรณ์เสริม', image_url: '/images/cat_accessories.jpg' }
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat
    });
  }
  console.log('✅ Categories seeded (5)');

  // 2. Seed Signature Colors
  const colors = [
    { id: 'forest', name_en: 'Alpine Forest', name_th: 'เขียวฟอเรสต์', hex: '#183C32' },
    { id: 'sand', name_en: 'Dolomite Sand', name_th: 'ทรายโดโลไมต์', hex: '#C8B9A6' },
    { id: 'charcoal', name_en: 'Summit Charcoal', name_th: 'เทาชาร์โคล', hex: '#292B28' },
    { id: 'ember', name_en: 'Alpine Ember', name_th: 'ส้มเปลวเพลิง', hex: '#9E472A' },
    { id: 'frost', name_en: 'Glacier Frost', name_th: 'ฟ้าธารน้ำแข็ง', hex: '#4A6B6C' }
  ];

  for (const col of colors) {
    await prisma.color.upsert({
      where: { id: col.id },
      update: col,
      create: col
    });
  }
  console.log('✅ Color palette seeded (5)');

  // 3. Seed Vouchers
  const vouchers = [
    {
      code: 'GOBEYOND10',
      discount_type: 'percentage',
      discount_val: 10,
      min_spend: 0,
      description_en: '10% off your entire first expedition order',
      description_th: 'ลด 10% สำหรับคำสั่งซื้อแรกของคุณ',
      valid_days: 30
    },
    {
      code: 'SUMMIT15',
      discount_type: 'percentage',
      discount_val: 15,
      min_spend: 5000,
      description_en: '15% off orders over ฿5,000',
      description_th: 'ลด 15% เมื่อช้อปครบ ฿5,000',
      valid_days: 60
    },
    {
      code: 'FRIEND150',
      discount_type: 'fixed',
      discount_val: 150,
      min_spend: 1500,
      description_en: '฿150 off for referring fellow explorers',
      description_th: 'ส่วนลด ฿150 จากเพื่อนแนะนำ',
      valid_days: 90
    }
  ];

  for (const v of vouchers) {
    await prisma.voucher.upsert({
      where: { code: v.code },
      update: v,
      create: v
    });
  }
  console.log('✅ Vouchers seeded (3)');

  // 4. Seed Products from frontend products.js
  console.log(`📦 Found ${PRODUCTS.length} products to seed...`);

  for (const p of PRODUCTS) {
    const catId = (p.category || 'backpacks').toLowerCase();
    const descTh = p.description_th || p.description || null;

    await prisma.product.upsert({
      where: { id: p.id },
      update: {
        category_id: catId,
        name_en: p.name,
        name_th: p.name_th || p.name,
        price_thb: p.price,
        rating: p.rating,
        review_count: p.reviewCount || 0,
        badge_en: p.badge || null,
        badge_th: p.badge_th || null,
        image_url: p.image,
        description_en: p.description,
        description_th: descTh,
        specs_materials: p.specs?.materials || 'Technical Composite',
        specs_waterproof: p.specs?.waterproofRating || 'DWR Treated',
        specs_weight: p.specs?.weight || 'Ultralight',
        specs_dimensions: p.specs?.dimensions || 'Standard Fit',
        specs_best_use_en: p.specs?.bestUse || 'Alpine Exploration',
        specs_best_use_th: p.specs?.bestUse_th || 'การเดินป่าและปีนเขา',
        is_featured: !!p.isFeatured,
        in_stock: p.inStock !== false
      },
      create: {
        id: p.id,
        category_id: catId,
        name_en: p.name,
        name_th: p.name_th || p.name,
        price_thb: p.price,
        rating: p.rating,
        review_count: p.reviewCount || 0,
        badge_en: p.badge || null,
        badge_th: p.badge_th || null,
        image_url: p.image,
        description_en: p.description,
        description_th: descTh,
        specs_materials: p.specs?.materials || 'Technical Composite',
        specs_waterproof: p.specs?.waterproofRating || 'DWR Treated',
        specs_weight: p.specs?.weight || 'Ultralight',
        specs_dimensions: p.specs?.dimensions || 'Standard Fit',
        specs_best_use_en: p.specs?.bestUse || 'Alpine Exploration',
        specs_best_use_th: p.specs?.bestUse_th || 'การเดินป่าและปีนเขา',
        is_featured: !!p.isFeatured,
        in_stock: p.inStock !== false
      }
    });

    // Seed sizes
    if (p.sizes && Array.isArray(p.sizes)) {
      for (const size of p.sizes) {
        await prisma.productSize.upsert({
          where: {
            product_id_size: {
              product_id: p.id,
              size: size
            }
          },
          update: {},
          create: {
            product_id: p.id,
            size: size,
            stock_qty: 50
          }
        });
      }
    }

    // Seed color variants if any
    if (p.colors && Array.isArray(p.colors)) {
      for (const col of p.colors) {
        if (col.id) {
          await prisma.color.upsert({
            where: { id: col.id },
            update: {
              name_en: col.name || col.id,
              name_th: col.name_th || col.name || col.id,
              hex: col.hex || '#183C32'
            },
            create: {
              id: col.id,
              name_en: col.name || col.id,
              name_th: col.name_th || col.name || col.id,
              hex: col.hex || '#183C32'
            }
          });

          await prisma.productColorVariant.upsert({
            where: {
              product_id_color_id: {
                product_id: p.id,
                color_id: col.id
              }
            },
            update: { image_url: col.image || p.image },
            create: {
              product_id: p.id,
              color_id: col.id,
              image_url: col.image || p.image
            }
          });
        }
      }
    }
  }
  console.log(`✅ All ${PRODUCTS.length} products with sizes and colorways seeded`);

  // 5. Seed Demo User
  const passwordHash = await bcrypt.hash('alto2026', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'marco@via-alto.com' },
    update: {
      full_name: 'Marco Silva',
      password_hash: passwordHash,
      points: 740,
      tier: 'Alpine Explorer'
    },
    create: {
      id: 'demo-user-uuid-12345',
      email: 'marco@via-alto.com',
      full_name: 'Marco Silva',
      password_hash: passwordHash,
      tel_no: '081-987-6543',
      points: 740,
      tier: 'Alpine Explorer'
    }
  });

  // Marketing Profile
  const profile = await prisma.userMarketingProfile.upsert({
    where: { user_id: demoUser.id },
    update: {
      experience_level: 'intermediate',
      size_apparel: 'L',
      size_footwear: '42',
      region: 'northern',
      referral_code: 'ALTO-MARCO'
    },
    create: {
      user_id: demoUser.id,
      experience_level: 'intermediate',
      size_apparel: 'L',
      size_footwear: '42',
      region: 'northern',
      referral_code: 'ALTO-MARCO'
    }
  });

  // Activities
  for (const act of ['trekking', 'camping']) {
    await prisma.userActivity.upsert({
      where: {
        profile_id_activity_key: {
          profile_id: profile.id,
          activity_key: act
        }
      },
      update: {},
      create: {
        profile_id: profile.id,
        activity_key: act
      }
    });
  }

  // Shipping Address
  const existingAddress = await prisma.userShippingAddress.findFirst({
    where: { user_id: demoUser.id }
  });
  if (!existingAddress) {
    await prisma.userShippingAddress.create({
      data: {
        user_id: demoUser.id,
        recipient_name: 'Marco Silva',
        phone: '081-987-6543',
        address_line: '88/12 Alpine Ridge Condominium, Sukhumvit 55, Thonglor Soi 10',
        subdistrict: 'Khlong Tan Nuea',
        district: 'Watthana',
        province: 'Bangkok',
        postal_code: '10110',
        is_default: true
      }
    });
  }

  // Assign Vouchers to Demo User
  for (const v of ['GOBEYOND10', 'SUMMIT15', 'FRIEND150']) {
    await prisma.userVoucher.upsert({
      where: {
        user_id_voucher_code: {
          user_id: demoUser.id,
          voucher_code: v
        }
      },
      update: {},
      create: {
        user_id: demoUser.id,
        voucher_code: v,
        is_used: false
      }
    });
  }

  console.log('✅ Demo user seeded (Marco Silva <marco@via-alto.com>)');
  console.log('🏔️ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
