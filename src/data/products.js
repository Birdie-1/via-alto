export const CATEGORIES = [
  {
    id: 'backpacks',
    name: 'Backpacks',
    name_th: 'เป้สะพายหลัง',
    image: '/images/cat_backpacks.jpg',
    description: 'Engineered for durability, balance, and carrying comfort on every ascent.',
    description_th: 'ออกแบบเพื่อความทนทาน สมดุล และความสบายในการสะพายตลอดการเดินขึ้นเขา'
  },
  {
    id: 'clothing',
    name: 'Clothing',
    name_th: 'เครื่องแต่งกาย',
    image: '/images/cat_clothing.jpg',
    description: 'Weather-protective alpine shells, utility layers, and thermal essentials.',
    description_th: 'เสื้อกันฝนกันลม เสื้อผ้าเดินป่า และเสื้อเก็บความอบอุ่นระดับเทคนิค'
  },
  {
    id: 'footwear',
    name: 'Footwear',
    name_th: 'รองเท้าเดินป่า',
    image: '/images/cat_footwear.jpg',
    description: 'High-traction footwear crafted for stability on rocky European trails.',
    description_th: 'รองเท้าที่ยึดเกาะสูง ออกแบบเพื่อความมั่นคงบนเส้นทางหินแถบยุโรป'
  },
  {
    id: 'camping',
    name: 'Camping',
    name_th: 'อุปกรณ์แคมป์ปิ้ง',
    image: '/images/cat_camping.jpg',
    description: 'Ultralight mountain shelters, insulated sleeping systems, and camp gear.',
    description_th: 'เต็นท์น้ำหนักเบา ถุงนอนเก็บอุณหภูมิ และอุปกรณ์แคมป์ปิ้งบนภูเขา'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    name_th: 'อุปกรณ์เสริม',
    image: '/images/cat_accessories.jpg',
    description: 'Precision trekking poles, insulated flasks, and trail navigation tools.',
    description_th: 'ไม้เท้าเดินป่าคาร์บอนไฟเบอร์ กระบอกน้ำเก็บอุณหภูมิ และไฟฉายเดินป่า'
  }
];

export const COLOR_PALETTE = [
  { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32' },
  { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28' },
  { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E' },
  { id: 'summit_ember', name: 'Summit Ember', name_th: 'ส้มเอมเบอร์', hex: '#D05A2B' },
  { id: 'glacier_slate', name: 'Glacier Slate', name_th: 'เทากลาเซียร์', hex: '#6B7A82' }
];

export const PRODUCTS = [
  // --- BACKPACKS ---
  {
    id: 1,
    name: 'Alpine 35L Backpack',
    name_th: 'เป้สะพายหลัง Alpine 35L',
    category: 'Backpacks',
    category_th: 'เป้สะพายหลัง',
    categoryId: 'backpacks',
    price: 2490,
    rating: 4.9,
    reviewsCount: 128,
    shortDesc: 'Lightweight day-to-multi-day hiking pack with ergonomic harness system.',
    shortDesc_th: 'เป้เดินป่าทางไกลน้ำหนักเบาพร้อมระบบสายสะพายตามหลักสรีรศาสตร์',
    description: 'Engineered for alpine routes and multi-day traverses. Built from ultra-durable ripstop nylon with an ergonomic back system that promotes airflow while keeping weight balanced close to your center of gravity.',
    image: '/images/prod_alpine_35l.jpg',
    badge: 'BESTSELLER',
    badge_th: 'ขายดีอันดับ 1',
    isFeatured: true,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_alpine_35l.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_alpine_35l_charcoal.jpg' },
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_alpine_35l_sand.jpg' }
    ],
    specs: {
      weight: '980 g',
      materials: '210D High-Tenacity Ripstop Nylon / Cordura® Base',
      materials_th: 'ไนลอนริปสตอป 210D เสริมก้นกระเป๋าด้วยผ้า Cordura® กันรอยขูดขีด',
      waterproofRating: 'DWR Coated (1,500 mm rain shield)',
      dimensions: '58 x 30 x 22 cm (35 Liters)',
      bestUse: 'Multi-Day Treks & Alpine Ridge Routes',
      bestUse_th: 'เดินป่าค้างแรม 2-3 วัน และเส้นทางสันเขาหินชัน'
    }
  },
  {
    id: 2,
    name: 'Trail 25L Daypack',
    name_th: 'เป้เดย์แพ็ก Trail 25L',
    category: 'Backpacks',
    category_th: 'เป้สะพายหลัง',
    categoryId: 'backpacks',
    price: 1890,
    rating: 4.7,
    reviewsCount: 94,
    shortDesc: 'Compact aerodynamic daypack built for fast and light mountain ascents.',
    shortDesc_th: 'เป้เดย์แพ็กทรงลู่ลมกะทัดรัด สำหรับการเดินเขาที่เน้นความเร็วและคล่องตัว',
    description: 'A versatile technical daypack featuring hydration reservoir routing, quick-stash stretch pockets, and a ventilated back panel designed for rapid pace day treks.',
    image: '/images/prod_trail_25l.jpg',
    badge: 'POPULAR',
    badge_th: 'ยอดนิยม',
    isFeatured: false,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_trail_25l.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_trail_25l.jpg' },
      { id: 'glacier_slate', name: 'Glacier Slate', name_th: 'เทากลาเซียร์', hex: '#6B7A82', image: '/images/prod_trail_25l.jpg' }
    ],
    specs: {
      weight: '640 g',
      materials: '100D Recycled Mini-Ripstop / AirMesh Harness',
      materials_th: 'ผ้าไนลอนรีไซเคิล 100D มินิริปสตอป และตาข่ายระบายอากาศ AirMesh',
      waterproofRating: 'DWR Coated (Water-Repellent)',
      dimensions: '48 x 26 x 18 cm (25 Liters)',
      bestUse: 'Single-Day Fast Hiking & Summit Assault',
      bestUse_th: 'เดย์ทริปเดินเขา 1 วัน และการปีนขึ้นยอดเขาแบบรวดเร็ว'
    }
  },
  {
    id: 3,
    name: 'Summit 50L Backpack',
    name_th: 'เป้เดินป่าใหญ่ Summit 50L',
    category: 'Backpacks',
    category_th: 'เป้สะพายหลัง',
    categoryId: 'backpacks',
    price: 3490,
    rating: 4.9,
    reviewsCount: 62,
    shortDesc: 'Expedition-grade trekking pack engineered for heavy loads on remote trails.',
    shortDesc_th: 'เป้สะพายหลังเกรดเดินสำรวจ ออกแบบเพื่อการแบกน้ำหนักในเส้นทางห่างไกล',
    description: 'Heavy-duty long-distance load hauler featuring an internal aluminum frame, floating top lid with security pocket, and multi-point compression straps for alpine expeditions.',
    image: '/images/prod_summit_50l.jpg',
    badge: 'EXPEDITION',
    badge_th: 'เกรดเดินสำรวจ',
    isFeatured: false,
    sizes: ['M', 'L'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_summit_50l.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_summit_50l.jpg' }
    ],
    specs: {
      weight: '1,420 g',
      materials: '420D Oxford Nylon + 7075 T6 Aluminum Stay Frame',
      materials_th: 'ผ้า Oxford Nylon 420D โครงอลูมิเนียมเกรดอากาศยาน 7075 T6',
      waterproofRating: '2,000 mm + Integrated Rain Cover included',
      dimensions: '72 x 34 x 28 cm (50+10 Liters)',
      bestUse: 'Remote Expeditions & Multi-Week Wilderness',
      bestUse_th: 'การเดินป่าระยะไกลหลายวัน และเส้นทางสำรวจทุรกันดาร'
    }
  },
  {
    id: 13,
    name: 'Alpine Summit 18L Pack',
    name_th: 'เป้พิชิตยอดเขา Alpine Summit 18L',
    category: 'Backpacks',
    category_th: 'เป้สะพายหลัง',
    categoryId: 'backpacks',
    price: 1490,
    rating: 4.8,
    reviewsCount: 45,
    shortDesc: 'Ultralight packable summit assault daypack with minimalist profile.',
    shortDesc_th: 'เป้พิชิตยอดเขาน้ำหนักเบาพิเศษ พับเก็บได้ในขนาดกะทัดรัด',
    description: 'Weighing under 380 grams, this packable summit daypack stows into its own top pocket. Built from silicone-treated Cordura ripstop for scramble routes and ridge runs.',
    image: '/images/prod_summit_18l.jpg',
    badge: 'ULTRALIGHT',
    badge_th: 'เบาพิเศษ',
    isFeatured: false,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_summit_18l.jpg' },
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_summit_18l.jpg' },
      { id: 'summit_ember', name: 'Summit Ember', name_th: 'ส้มเอมเบอร์', hex: '#D05A2B', image: '/images/prod_summit_18l.jpg' }
    ],
    specs: {
      weight: '380 g',
      materials: '70D Siliconized Cordura® Ripstop Nylon',
      materials_th: 'ผ้าไนลอน Cordura® 70D เคลือบซิลิโคน กันน้ำและรอยฉีกขาด',
      waterproofRating: '1,500 mm Polyurethane Coat',
      dimensions: '42 x 22 x 15 cm (Packs into 14x10 cm pouch)',
      bestUse: 'Rock Scrambling, Ridge Runs & Packable Travel',
      bestUse_th: 'การปีนหิน วิ่งสันเขา และพับพกพาในกระเป๋าเดินทาง'
    }
  },

  // --- CLOTHING ---
  {
    id: 4,
    name: 'Alpine Shell Jacket',
    name_th: 'เสื้อแจ็กเก็ตกันน้ำ Alpine Shell',
    category: 'Clothing',
    category_th: 'เครื่องแต่งกาย',
    categoryId: 'clothing',
    price: 2890,
    rating: 4.8,
    reviewsCount: 74,
    shortDesc: '3-layer waterproof and windproof technical mountain shell jacket.',
    shortDesc_th: 'เสื้อแจ็กเก็ตกันน้ำและกันลม 3 ชั้นระดับเทคนิคสำหรับการเดินป่า',
    description: 'Crafted from breathable 3-layer weatherproof membrane with fully taped seams, storm hood with halo adjustment, and water-repellent AquaGuard ventilation zippers.',
    image: '/images/prod_alpine_shell.jpg',
    badge: 'ESSENTIAL',
    badge_th: 'รุ่นหลัก',
    isFeatured: true,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_alpine_shell.jpg' },
      { id: 'summit_ember', name: 'Summit Ember', name_th: 'ส้มเอมเบอร์', hex: '#D05A2B', image: '/images/prod_alpine_shell_ember.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_alpine_shell_charcoal.jpg' }
    ],
    specs: {
      weight: '410 g',
      materials: '3-Layer eVent® Breathable Membrane / 40D Recycled Nylon Face',
      materials_th: 'เมมเบรน 3 ชั้นระบายความชื้น eVent® ผิวผ้าไนลอนรีไซเคิล 40D',
      waterproofRating: '20,000 mm Hydrostatic Head / 20,000 g/m² Breathability',
      dimensions: 'Athletic Alpine Cut (Layer-Friendly)',
      bestUse: 'Heavy Alpine Rain, Snow & High Mountain Winds',
      bestUse_th: 'ลุยพายุฝนหนัก ลมแรงบนสันเขา และหิมะในเขตหนาว'
    }
  },
  {
    id: 5,
    name: 'Trail Utility Pants',
    name_th: 'กางเกงเดินป่า Trail Utility',
    category: 'Clothing',
    category_th: 'เครื่องแต่งกาย',
    categoryId: 'clothing',
    price: 1990,
    rating: 4.6,
    reviewsCount: 53,
    shortDesc: 'Durable 4-way stretch trekking pants with reinforced abrasion panels.',
    shortDesc_th: 'กางเกงเดินป่ายืด 4 ทิศทาง ทนทานพร้อมแผ่นเสริมกันรอยขีดข่วน',
    description: 'Constructed with articulated knees and high-tenacity Cordura reinforcements at the seat and ankles. Water-resistant DWR coating sheds light rain and trail dust.',
    image: '/images/prod_trail_pants.jpg',
    badge: 'NEW',
    badge_th: 'มาใหม่',
    isFeatured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_trail_pants.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_trail_pants.jpg' },
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_trail_pants.jpg' }
    ],
    specs: {
      weight: '360 g',
      materials: '88% Polyamide, 12% Elastane 4-Way Stretch + Cordura® Knees',
      materials_th: 'โพลีเอไมด์ 88% อิลาสเทน 12% ยืดหยุ่น 4 ทิศทาง เสริมเข่าด้วย Cordura®',
      waterproofRating: 'DWR PFC-Free Water Repellent Coating',
      dimensions: 'Standard Trail Fit / Articulated Knees',
      bestUse: 'Bushwhacking, Rocky Scrambles & All-Season Trekking',
      bestUse_th: 'ลุยป่ารก ปีนป่ายโขดหิน และเดินป่าได้ทุกฤดูกาล'
    }
  },
  {
    id: 6,
    name: 'Mountain Base Tee',
    name_th: 'เสื้อเบสเลเยอร์ Mountain Base',
    category: 'Clothing',
    category_th: 'เครื่องแต่งกาย',
    categoryId: 'clothing',
    price: 890,
    rating: 4.5,
    reviewsCount: 88,
    shortDesc: 'Ultra-soft natural merino wool blend base layer tee for odor resistance.',
    shortDesc_th: 'เสื้อยืดขนแกะเมอริโนสัมผัสนุ่ม ลดการสะสมของกลิ่นและระบายเหงื่อยอดเยี่ยม',
    description: 'Combines temperature-regulating natural merino wool with durable recycled poly fibers. Naturally antimicrobial, quick-drying, and supremely comfortable next to skin.',
    image: '/images/prod_mountain_tee.jpg',
    badge: 'NATURAL',
    badge_th: 'ขนแกะธรรมชาติ',
    isFeatured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    colors: [
      { id: 'glacier_slate', name: 'Glacier Slate', name_th: 'เทากลาเซียร์', hex: '#6B7A82', image: '/images/prod_mountain_tee.jpg' },
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_mountain_tee.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_mountain_tee.jpg' }
    ],
    specs: {
      weight: '145 g',
      materials: '65% Australian Merino Wool (17.5 Micron), 35% Recycled Poly',
      materials_th: 'ขนแกะเมอริโนออสเตรเลีย 65% เส้นใย 17.5 ไมครอน ผสมโพลีเอสเตอร์ 35%',
      waterproofRating: 'Hydrophobic Moisture Wicking / Quick-Dry',
      dimensions: 'Slim Next-to-Skin Alpine Cut',
      bestUse: 'Multi-Day Trekking without Washing (Natural Anti-Odor)',
      bestUse_th: 'เดินป่าต่อเนื่องหลายวันโดยไม่เหม็นอับ ป้องกันกลิ่นตามธรรมชาติ'
    }
  },
  {
    id: 14,
    name: 'Nordic Merino Thermal Fleece',
    name_th: 'เสื้อฟลีซกันหนาว Nordic Merino',
    category: 'Clothing',
    category_th: 'เครื่องแต่งกาย',
    categoryId: 'clothing',
    price: 2490,
    rating: 4.9,
    reviewsCount: 67,
    shortDesc: 'Heavyweight grid fleece midlayer for sub-zero alpine ascents.',
    shortDesc_th: 'เสื้อฟลีซลายตารางเก็บความอบอุ่น สำหรับสภาพอากาศหนาวจัดบนยอดเขา',
    description: 'Micro-grid interior channels body heat while releasing excess vapor during high-exertion climbs. Features a tailored high collar and deep chest pocket.',
    image: '/images/prod_merino_fleece.jpg',
    badge: 'THERMAL',
    badge_th: 'เก็บความร้อน',
    isFeatured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    colors: [
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_merino_fleece.jpg' },
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_merino_fleece.jpg' }
    ],
    specs: {
      weight: '390 g',
      materials: 'Polartec® Power Grid™ Fleece (280 g/m²)',
      materials_th: 'ผ้าฟลีซ Polartec® Power Grid™ ลายรังผึ้งเก็บกักความร้อน 280 g/m²',
      waterproofRating: 'Wind-Resistant / High Breathability',
      dimensions: 'Mid-Layer Fit with High Thermal Collar',
      bestUse: 'Sub-Zero Summit Days & Cold Camp Evenings (0°C to -10°C)',
      bestUse_th: 'เดินเขาสภาพอากาศหนาวจัด 0°C ถึง -10°C และสวมใส่ยามค่ำในแคมป์'
    }
  },
  {
    id: 15,
    name: 'Dolomite Trail Windbreaker',
    name_th: 'เสื้อกันลมวิ่งเทรล Dolomite',
    category: 'Clothing',
    category_th: 'เครื่องแต่งกาย',
    categoryId: 'clothing',
    price: 1690,
    rating: 4.7,
    reviewsCount: 39,
    shortDesc: 'Ultralight packable DWR weather-resistant trail running wind shell.',
    shortDesc_th: 'เสื้อกันลมวิ่งเทรลน้ำหนักเบาพิเศษ กันละอองน้ำและพับเก็บได้เล็ก',
    description: 'Blocks mountain wind chill while packing down to the size of an apple. Engineered with laser-cut underarm ventilation and reflective logo accents.',
    image: '/images/prod_windbreaker.jpg',
    badge: 'NEW',
    badge_th: 'มาใหม่',
    isFeatured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    colors: [
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_windbreaker.jpg' },
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_windbreaker.jpg' },
      { id: 'summit_ember', name: 'Summit Ember', name_th: 'ส้มเอมเบอร์', hex: '#D05A2B', image: '/images/prod_windbreaker.jpg' }
    ],
    specs: {
      weight: '115 g',
      materials: '20D Ultra-Dense Ripstop Nylon (Air-Permeable)',
      materials_th: 'ผ้าไนลอนริปสตอปทอแน่นพิเศษ 20D น้ำหนักเบาดุจขนนก',
      waterproofRating: 'Windproof 1 CFM / DWR Light Rain Resistant',
      dimensions: 'Packs into its own chest pocket (8 x 7 cm)',
      bestUse: 'Speed Trail Running, Fast Hiking & Ridge Breezes',
      bestUse_th: 'วิ่งเทรลความเร็วสูง เดินเขาเร็ว และกันลมหนาวบนสันเขา'
    }
  },
  {
    id: 16,
    name: 'Alpine Pro Waterproof Gloves',
    name_th: 'ถุงมือกันน้ำ Alpine Pro',
    category: 'Clothing',
    category_th: 'เครื่องแต่งกาย',
    categoryId: 'clothing',
    price: 1190,
    rating: 4.6,
    reviewsCount: 31,
    shortDesc: 'Touchscreen-compatible mountain gloves with goat leather grip.',
    shortDesc_th: 'ถุงมือเดินป่ากันน้ำ รองรับทัชสกรีนพร้อมฝ่ามือหนังแพะแท้ยึดเกาะแน่น',
    description: 'Waterproof breathable insert with brushed fleece lining. Abrasion-resistant leather palm ensures steady grip on trekking poles and via ferrata cables.',
    image: '/images/prod_gloves.jpg',
    badge: 'WEATHERPROOF',
    badge_th: 'กันน้ำกันลม',
    isFeatured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_gloves.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_gloves.jpg' }
    ],
    specs: {
      weight: '130 g (pair)',
      materials: 'Full-Grain Goatskin Leather Palm + Waterproof Insert + Fleece',
      materials_th: 'ฝ่ามือหนังแพะแท้ ทนทานต่อการเสียดสี แทรกเยื่อกันน้ำและซับในฟลีซ',
      waterproofRating: '10,000 mm Waterproof / Windproof',
      dimensions: 'Pre-Curved Ergonomic Alpine Grip',
      bestUse: 'Via Ferrata, Cold Trekking Poles Grip & Scrambling',
      bestUse_th: 'ปีนผาเหล็ก Via Ferrata จับไม้เท้าเดินป่าในที่หนาวเย็น'
    }
  },

  // --- FOOTWEAR ---
  {
    id: 7,
    name: 'Terra Hiking Shoes',
    name_th: 'รองเท้าเดินป่า Terra Hiking',
    category: 'Footwear',
    category_th: 'รองเท้าเดินป่า',
    categoryId: 'footwear',
    price: 3290,
    rating: 4.8,
    reviewsCount: 96,
    shortDesc: 'Low-profile trail shoes offering agility, grip, and all-day comfort.',
    shortDesc_th: 'รองเท้าเดินป่าข้อสั้น คล่องตัว ยึดเกาะดีเยี่ยม นุ่มสบายตลอดวัน',
    description: 'Aggressive Vibram Megagrip rubber lugs deliver unwavering traction across wet rock and loose scree, combined with a responsive dual-density EVA midsole.',
    image: '/images/prod_terra_shoes.jpg',
    badge: 'FEATURED',
    badge_th: 'แนะนำ',
    isFeatured: true,
    sizes: ['M', 'L'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_terra_shoes.jpg' },
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_terra_shoes.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_terra_shoes.jpg' }
    ],
    specs: {
      weight: '390 g (Single shoe EU 42)',
      materials: 'Abrasion-Resistant Mesh + TPU Welded Overlays + Vibram® Outsole',
      materials_th: 'ผ้าตาข่ายทนทาน เสริมโครง TPU ไร้รอยต่อ และพื้นยาง Vibram® Megagrip',
      waterproofRating: 'DWR Water-Resistant (Quick-Draining Breathable)',
      dimensions: 'Drop: 6 mm / Lug Depth: 4.5 mm',
      bestUse: 'Fast Technical Day Treks, Loose Scree & Forest Trails',
      bestUse_th: 'เดินป่าทางขรุขระ ทางดิน หินกรวด และเส้นทางธรรมชาติทั่วไป'
    }
  },
  {
    id: 8,
    name: 'Alto Trek Boots',
    name_th: 'รองเท้าบูทเดินเขา Alto Trek',
    category: 'Footwear',
    category_th: 'รองเท้าเดินป่า',
    categoryId: 'footwear',
    price: 3890,
    rating: 4.9,
    reviewsCount: 47,
    shortDesc: 'Mid-cut waterproof trekking boots providing superior ankle stability.',
    shortDesc_th: 'รองเท้าบูทหนัง Nubuck ข้อกลาง กันน้ำ ป้องกันข้อเท้าพลิกบนทางหินชัน',
    description: 'Built with oiled Italian nubuck leather and a waterproof breathable membrane. High-cuff construction guards against rolled ankles on high alpine ascents.',
    image: '/images/prod_alto_boots.jpg',
    badge: 'ALPINE PRO',
    badge_th: 'อัลไพน์โปร',
    isFeatured: false,
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    colors: [
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_alto_boots.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_alto_boots.jpg' }
    ],
    specs: {
      weight: '560 g (Single boot EU 42)',
      materials: '2.2 mm Oiled Italian Nubuck Leather + Gore-Tex® Lining',
      materials_th: 'หนังนูบัคแท้จากอิตาลีหนา 2.2 มม. เคลือบน้ำมัน ซับใน Gore-Tex® กันน้ำ',
      waterproofRating: '28,000 mm Hydrostatic Head (100% Waterproof)',
      dimensions: 'High-Ankle Support / 5 mm Vibram® Trekking Lugs',
      bestUse: 'Heavy Backpacking, High Alpine Passages & Rocky Passes',
      bestUse_th: 'เดินป่าพร้อมเป้หนัก ข้ามช่องเขาหินสูงชัน และสภาพอากาศฝนตกชุก'
    }
  },
  {
    id: 17,
    name: 'Veloce Mountain Trail Runners',
    name_th: 'รองเท้าวิ่งเทรล Veloce Mountain',
    category: 'Footwear',
    category_th: 'รองเท้าเดินป่า',
    categoryId: 'footwear',
    price: 2990,
    rating: 4.7,
    reviewsCount: 54,
    shortDesc: 'Speed hiking and trail running shoes with rock protection plate.',
    shortDesc_th: 'รองเท้าวิ่งเทรลและเดินเขาความเร็วสูง พร้อมแผ่นป้องกันหินใต้ฝ่าเท้า',
    description: 'Designed for fast mountain terrain. Features an integrated rock defense plate, TPU toe bumper, and 5mm multi-directional traction lugs.',
    image: '/images/prod_trail_runners.jpg',
    badge: 'SPEED TRAIL',
    badge_th: 'สปีดเทรล',
    isFeatured: false,
    sizes: ['M', 'L'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_trail_runners.jpg' },
      { id: 'summit_ember', name: 'Summit Ember', name_th: 'ส้มเอมเบอร์', hex: '#D05A2B', image: '/images/prod_trail_runners.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_trail_runners.jpg' }
    ],
    specs: {
      weight: '290 g (Single shoe EU 42)',
      materials: 'Jacquard Engineered Mesh + Forefoot Carbon Rock Plate',
      materials_th: 'ผ้าตาข่าย Jacquard Mesh ระบายอากาศสูง พร้อมแผ่นคาร์บอนกันหินทิ่ม',
      waterproofRating: 'Hydrophobic Water-Shedding Upper',
      dimensions: 'Drop: 4 mm / Lug Depth: 5 mm',
      bestUse: 'Mountain Trail Running, Ultra-Marathon & Fastpacking',
      bestUse_th: 'วิ่งเทรลบนภูเขา งานวิ่งเทรลระยะไกล และเดินเขาแบบเร็ว'
    }
  },

  // --- CAMPING ---
  {
    id: 9,
    name: 'Alpine Shelter Tent',
    name_th: 'เต็นท์โดม Alpine Shelter 2P',
    category: 'Camping',
    category_th: 'อุปกรณ์แคมป์ปิ้ง',
    categoryId: 'camping',
    price: 4490,
    rating: 4.9,
    reviewsCount: 38,
    shortDesc: 'Ultralight 2-person alpine freestanding dome tent with storm resistance.',
    shortDesc_th: 'เต็นท์โดมเดินป่า 2 คน น้ำหนักเบาพิเศษ ทนทานต่อลมพายุบนยอดเขา',
    description: 'Engineered for high-altitude weather resilience. Aircraft-grade aluminum hub poles provide rock-solid stability against mountain gusts while weighing only 1.4kg.',
    image: '/images/prod_alpine_tent.jpg',
    badge: 'ULTRALIGHT',
    badge_th: 'เบาพิเศษ',
    isFeatured: false,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_alpine_tent.jpg' },
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_alpine_tent.jpg' }
    ],
    specs: {
      weight: '1,420 g (Trail Weight)',
      materials: '20D Ripstop Silnylon Fly / DAC Featherlite NSL Aluminum Poles',
      materials_th: 'ฟลายชีตผ้า Silnylon 20D เคลือบซิลิโคน เสาอลูมิเนียม DAC Featherlite',
      waterproofRating: '3,000 mm Fly / 5,000 mm Bathtub Floor',
      dimensions: 'Floor: 215 x 130 cm / Peak Height: 105 cm (Packs 42 x 13 cm)',
      bestUse: '3-Season High Altitude Camping & Alpine Storm Resistance',
      bestUse_th: 'กางแคมป์บนยอดเขาสูง 3 ฤดู ต้านทานลมพายุและฝนตกหนักได้ดีเยี่ยม'
    }
  },
  {
    id: 10,
    name: 'Trail Sleeping Bag',
    name_th: 'ถุงนอนขนห่าน Trail 0°C',
    category: 'Camping',
    category_th: 'อุปกรณ์แคมป์ปิ้ง',
    categoryId: 'camping',
    price: 2190,
    rating: 4.7,
    reviewsCount: 41,
    shortDesc: 'Mummy sleeping bag rated to 0°C with hydrophobic down insulation.',
    shortDesc_th: 'ถุงนอนทรงมัมมี่อุณหภูมิ 0°C ขนเป็ดกันชื้น น้ำหนักเบาอบอุ่น',
    description: 'Packed with 650-fill hydrophobic down in trapezoidal baffles that eliminate cold spots. Features an ergonomic draft collar and snag-free two-way zipper.',
    image: '/images/prod_sleeping_bag.jpg',
    badge: '0°C RATED',
    badge_th: 'กันหนาว 0°C',
    isFeatured: false,
    sizes: ['M', 'L'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_sleeping_bag.jpg' },
      { id: 'summit_ember', name: 'Summit Ember', name_th: 'ส้มเอมเบอร์', hex: '#D05A2B', image: '/images/prod_sleeping_bag.jpg' }
    ],
    specs: {
      weight: '780 g',
      materials: '650+ Fill Hydrophobic RDS Goose Down / 20D Taffeta Lining',
      materials_th: 'ขนห่านเกรด RDS 650+ ฟิลเพาเวอร์ เคลือบสารกันชื้น ซับในผ้าทัฟเฟต้า 20D',
      waterproofRating: 'DWR Water-Resistant Outer Shell',
      dimensions: 'Length: 205 cm (fits up to 188 cm height) / Compressed: 28 x 16 cm',
      bestUse: 'Alpine Camping down to 0°C (Doi Inthanon, Doi Luang Chiang Dao)',
      bestUse_th: 'แคมป์ปิ้งบนดอยสูงอากาศหนาวถึง 0°C เช่น ดอยอินทนนท์ เชียงดาว'
    }
  },
  {
    id: 18,
    name: 'Alpine Insulated Air Sleeping Pad',
    name_th: 'แผ่นรองนอนเป่าลมฉนวนความร้อน Alpine',
    category: 'Camping',
    category_th: 'อุปกรณ์แคมป์ปิ้ง',
    categoryId: 'camping',
    price: 1890,
    rating: 4.8,
    reviewsCount: 62,
    shortDesc: 'R-Value 4.8 thermal insulated inflatable sleeping mattress pad.',
    shortDesc_th: 'แผ่นรองนอนเป่าลม R-Value 4.8 กันความเย็นจากพื้นดิน หนานุ่มสบาย',
    description: 'Multi-layer reflective thermal film reflects radiant body heat back to the sleeper. Packs smaller than a 1-liter water bottle while offering 7.5cm of cushion.',
    image: '/images/prod_sleeping_pad.jpg',
    badge: 'R-VALUE 4.8',
    badge_th: 'ฉนวน R 4.8',
    isFeatured: false,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_sleeping_pad.jpg' },
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_sleeping_pad.jpg' }
    ],
    specs: {
      weight: '490 g',
      materials: '30D Ripstop Polyester with ThermaBarrier™ Reflective Film',
      materials_th: 'โพลีเอสเตอร์ริปสตอป 30D เสริมแผ่นฟิล์มสะท้อนความร้อน ThermaBarrier™',
      waterproofRating: 'Airtight TPU Laminate Insulation',
      dimensions: '183 x 52 x 7.5 cm (Packs into 20 x 9 cm)',
      bestUse: '4-Season Ground Insulation on Frozen Earth & Mountain Rocks',
      bestUse_th: 'ตัดความเย็นจากพื้นดินและหินภูเขา นอนอุ่นสบายตลอด 4 ฤดูกาล'
    }
  },
  {
    id: 19,
    name: 'Titanium Expedition Stove & Pot',
    name_th: 'ชุดเตาแก๊สและหม้อไทเทเนียม Titanium Set',
    category: 'Camping',
    category_th: 'อุปกรณ์แคมป์ปิ้ง',
    categoryId: 'camping',
    price: 1390,
    rating: 4.9,
    reviewsCount: 48,
    shortDesc: 'Ultralight 800ml titanium cookset with piezo micro gas burner.',
    shortDesc_th: 'ชุดหม้อไทเทเนียม 800ml พร้อมหัวเตาแก๊สขนาดจิ๋ว น้ำหนักเบาต้มน้ำเดือดเร็ว',
    description: 'Pure titanium construction guarantees zero metallic taste and extreme corrosion resistance. The micro-burner boils 500ml of mountain water in under 2.5 minutes.',
    image: '/images/prod_titanium_stove.jpg',
    badge: 'TITANIUM',
    badge_th: 'ไทเทเนียมแท้',
    isFeatured: false,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'glacier_slate', name: 'Glacier Slate', name_th: 'เทากลาเซียร์', hex: '#6B7A82', image: '/images/prod_titanium_stove.jpg' }
    ],
    specs: {
      weight: '168 g (Pot: 95g + Stove: 73g)',
      materials: 'Grade 1 Pure Titanium (0.4mm wall) + Brass Micro Jet Valve',
      materials_th: 'ไทเทเนียมบริสุทธิ์เกรด 1 บางเบา 0.4 มม. วาล์วทองเหลืองทนแรงดัน',
      waterproofRating: 'Corrosion-Proof & Rust-Proof Lifetime Metal',
      dimensions: 'Pot: 800 ml (11.5 cm diameter x 9 cm height)',
      bestUse: 'Fast Boiling Coffee, Dehydrated Meals & Solo Mountaineering',
      bestUse_th: 'ต้มน้ำร้อน ชงกาแฟ และปรุงอาหารอบแห้งบนยอดเขาแบบคนเดียว'
    }
  },

  // --- ACCESSORIES ---
  {
    id: 11,
    name: 'Summit Trekking Poles',
    name_th: 'ไม้เท้าเดินป่าคาร์บอนไฟเบอร์ Summit',
    category: 'Accessories',
    category_th: 'อุปกรณ์เสริม',
    categoryId: 'accessories',
    price: 1290,
    rating: 4.6,
    reviewsCount: 58,
    shortDesc: 'Carbon fiber telescoping trekking poles with natural ergonomic cork grips.',
    shortDesc_th: 'ไม้เท้าคาร์บอนไฟเบอร์น้ำหนักเบา ด้ามจับไม้ก๊อกซับเหงื่อกระชับมือ',
    description: 'Ultra-stiff 100% carbon fiber shafts reduce joint impact by up to 25%. Natural moisture-wicking cork handles with padded breathable wrist loops.',
    image: '/images/prod_trekking_poles.jpg',
    badge: 'PAIR',
    badge_th: 'คู่',
    isFeatured: true,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_trekking_poles.jpg' },
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_trekking_poles.jpg' }
    ],
    specs: {
      weight: '380 g (pair)',
      materials: '3-Section 100% 3K Carbon Fiber + Natural Portuguese Cork',
      materials_th: 'คาร์บอนไฟเบอร์ 3K แท้ 100% 3 ท่อน ด้ามจับไม้ก๊อกธรรมชาติโปรตุเกส',
      waterproofRating: 'Carbide Tungsten Tips + Mud / Snow Baskets',
      dimensions: 'Collapsed: 63 cm / Extended: 100 – 135 cm',
      bestUse: 'Knee Joint Pressure Relief on Steep Descents & Rocky Ascents',
      bestUse_th: 'ลดแรงกระแทกหัวเข่าและข้อเท้าขณะเดินลงเขาชัน'
    }
  },
  {
    id: 12,
    name: 'Terra Insulated Bottle',
    name_th: 'กระบอกน้ำเก็บอุณหภูมิ Terra 750ml',
    category: 'Accessories',
    category_th: 'อุปกรณ์เสริม',
    categoryId: 'accessories',
    price: 690,
    rating: 4.7,
    reviewsCount: 112,
    shortDesc: 'Double-wall vacuum insulated stainless steel 750ml flask in matte finish.',
    shortDesc_th: 'กระบอกน้ำสุญญากาศสแตนเลส 750ml เก็บความเย็น 24 ชม. ร้อน 12 ชม.',
    description: 'Maintains beverages icy cold for 24 hours or steaming hot for 12 hours. Constructed from puncture-resistant 18/8 food-grade stainless steel with BPA-free loop cap.',
    image: '/images/prod_insulated_bottle.jpg',
    badge: 'ECO',
    badge_th: 'รักษ์โลก',
    isFeatured: false,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_insulated_bottle.jpg' },
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_insulated_bottle.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_insulated_bottle.jpg' },
      { id: 'summit_ember', name: 'Summit Ember', name_th: 'ส้มเอมเบอร์', hex: '#D05A2B', image: '/images/prod_insulated_bottle.jpg' }
    ],
    specs: {
      weight: '340 g',
      materials: '18/8 Food-Grade Pro Stainless Steel (Powder Coated)',
      materials_th: 'สแตนเลสฟู้ดเกรด 18/8 ปลอดสาร BPA พ่นเคลือบสีแบบ Powder Coat',
      waterproofRating: 'Leak-Proof Silicone Sealed Loop Lid',
      dimensions: '750 ml Capacity (26 cm height x 7.5 cm base)',
      bestUse: 'All-Day Trail Hydration (Cold 24h / Warm Tea 12h)',
      bestUse_th: 'ดื่มน้ำบนเส้นทางเทรล เก็บความเย็น 24 ชั่วโมง หรือน้ำอุ่น 12 ชั่วโมง'
    }
  },
  {
    id: 20,
    name: 'Alpine Tech LED Headlamp 600lm',
    name_th: 'ไฟฉายคาดหัว Alpine Tech 600lm',
    category: 'Accessories',
    category_th: 'อุปกรณ์เสริม',
    categoryId: 'accessories',
    price: 990,
    rating: 4.8,
    reviewsCount: 79,
    shortDesc: 'Rechargeable 600-lumen IPX8 waterproof beam headlamp with red night vision.',
    shortDesc_th: 'ไฟฉายคาดหัวความสว่าง 600 ลูเมน กันน้ำ IPX8 ชาร์จ Type-C พร้อมไฟแดง',
    description: 'Dual-beam optics with white spot beam and wide floodlight for night navigation. USB-C fast charging with lock mode to prevent accidental turn-on in your pack.',
    image: '/images/prod_headlamp.jpg',
    badge: '600 LUMENS',
    badge_th: '600 ลูเมน',
    isFeatured: false,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_headlamp.jpg' },
      { id: 'summit_ember', name: 'Summit Ember', name_th: 'ส้มเอมเบอร์', hex: '#D05A2B', image: '/images/prod_headlamp.jpg' }
    ],
    specs: {
      weight: '72 g (with battery)',
      materials: 'Aircraft Anodized Aluminum Body + Reflective Elastic Headband',
      materials_th: 'บอดี้อลูมิเนียมเกรดอากาศยาน อโนไดซ์แข็ง สายคาดศีรษะสะท้อนแสง',
      waterproofRating: 'IPX8 Waterproof (Submersible up to 2 meters for 30 min)',
      dimensions: 'Beam Distance: 120 meters / Battery: 1,800 mAh USB-C',
      bestUse: 'Night Trekking, Pre-Dawn Summit Push & Camp Cooking',
      bestUse_th: 'เดินป่ายามค่ำคืน เดินขึ้นยอดเขาชมพระอาทิตย์ขึ้น และทำอาหารในแคมป์'
    }
  },

  // --- NEW EXPANSION PRODUCTS (21-30) ---
  {
    id: 21,
    name: 'Alpine Down Jacket 800-Fill',
    name_th: 'เสื้อแจ็กเก็ตขนเป็ด 800-Fill Alpine Down',
    category: 'Clothing',
    category_th: 'เครื่องแต่งกาย',
    categoryId: 'clothing',
    price: 4290,
    rating: 4.9,
    reviewsCount: 52,
    shortDesc: 'Ultralight packable 800-fill power hydrophobic goose down insulation jacket.',
    shortDesc_th: 'เสื้อแจ็กเก็ตดาวน์ 800 ฟิลเพาเวอร์ พับเก็บเล็ก อบอุ่นพิเศษในอากาศหนาวจัด',
    description: 'Engineered for sub-zero alpine conditions. Packed with 800-fill RDS-certified hydrophobic goose down in micro-baffle chambers that trap maximum radiant body heat while compressing down into its own internal pocket.',
    image: '/images/prod_down_jacket.jpg',
    badge: '800-FILL DOWN',
    badge_th: 'ขนเป็ด 800-FILL',
    isFeatured: true,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_down_jacket.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_down_jacket.jpg' },
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_down_jacket.jpg' }
    ],
    specs: {
      weight: '320 g',
      materials: '800+ Fill Power RDS Hydrophobic Goose Down / 15D Pertex® Quantum',
      materials_th: 'ขนห่านเกรดพรีเมียม 800+ ฟิลเพาเวอร์ ผ้าผิวนอก Pertex® Quantum 15D กันลม',
      waterproofRating: 'DWR Water-Repellent Shell (Windproof 100%)',
      dimensions: 'Packs into internal chest pocket (18 x 12 cm)',
      bestUse: 'Sub-Zero Summit Days & Extreme Cold Alpine Bivouacs',
      bestUse_th: 'รับมือสภาพอากาศหนาวจัด อุณหภูมิติดลบ ยอดเขาสูง'
    }
  },
  {
    id: 22,
    name: 'Storm Rain Pants',
    name_th: 'กางเกงกันฝนลุยพายุ Storm Rain Pants',
    category: 'Clothing',
    category_th: 'เครื่องแต่งกาย',
    categoryId: 'clothing',
    price: 2190,
    rating: 4.7,
    reviewsCount: 38,
    shortDesc: 'Packable 2.5-layer waterproof breathable shell pants with 3/4 side zips.',
    shortDesc_th: 'กางเกงกันฝน 2.5 ชั้น กันน้ำกันลมเต็มพิกัด พร้อมซิปข้างยาวสวมทับรองเท้าได้ทันที',
    description: 'Designed to pull on quickly over boots when mountain squalls hit. Features 3/4-length two-way side zippers for rapid ventilation and articulated knees for unrestricted scrambling.',
    image: '/images/prod_rain_pants.jpg',
    badge: '20,000 MM',
    badge_th: 'กันน้ำ 20,000 MM',
    isFeatured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    colors: [
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_rain_pants.jpg' },
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_rain_pants.jpg' }
    ],
    specs: {
      weight: '225 g',
      materials: '2.5-Layer 50D Recycled Ripstop Nylon with DryTouch Backer',
      materials_th: 'ผ้าไนลอนริปสตอป 50D รีไซเคิล 2.5 ชั้น ผิวสัมผัสด้านในไม่เหนียวติดผิว',
      waterproofRating: '20,000 mm Hydrostatic Head / 18,000 g/m² Breathability',
      dimensions: 'Tapered Ankle with Elastic Cord & Boot Hook',
      bestUse: 'Heavy Monsoon Downpours & Wet Alpine Scrambling',
      bestUse_th: 'ลุยพายุฝนหนัก เดินป่าหน้าฝน และข้ามธารน้ำเปียกชื้น'
    }
  },
  {
    id: 23,
    name: 'Merino Trail Socks (2-Pack)',
    name_th: 'ถุงเท้าขนแกะเมอริโนเดินป่า (แพ็ก 2 คู่)',
    category: 'Clothing',
    category_th: 'เครื่องแต่งกาย',
    categoryId: 'clothing',
    price: 790,
    rating: 4.9,
    reviewsCount: 143,
    shortDesc: 'Targeted cushioning blister-defense merino wool crew hiking socks.',
    shortDesc_th: 'ถุงเท้าเดินป่าขนแกะเมอริโน ลดการเสียดสี ป้องกันแผลพุพอง ระบายเหงื่อเร็ว',
    description: 'Knitted with fine-gauge merino wool for thermoregulation and natural anti-odor defense. Dense loop cushioning under the forefoot and heel absorbs impacts on long alpine descents.',
    image: '/images/prod_merino_socks.jpg',
    badge: '2-PACK',
    badge_th: 'แพ็ก 2 คู่',
    isFeatured: false,
    sizes: ['M', 'L'],
    inStock: true,
    colors: [
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_merino_socks.jpg' },
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_merino_socks.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_merino_socks.jpg' }
    ],
    specs: {
      weight: '75 g (pair)',
      materials: '68% Merino Wool, 28% Nylon, 4% Lycra® Elastane',
      materials_th: 'ขนแกะเมอริโน 68% ไนลอนทนทาน 28% เส้นใยไลคร่ายืดหยุ่น 4%',
      waterproofRating: 'Fast-Drying & Moisture-Wicking Fiber',
      dimensions: 'Mid-Calf Crew Height / Seamless Toe Closure',
      bestUse: 'Blister Prevention & Multi-Day Backpacking Comfort',
      bestUse_th: 'ป้องกันการเสียดสีและพุพอง เดินป่าต่อเนื่องหลายวันไม่อับชื้น'
    }
  },
  {
    id: 24,
    name: 'Alpine Sun Shield Cap',
    name_th: 'หมวกวิ่งเทรลกันแดด Alpine Sun Shield',
    category: 'Accessories',
    category_th: 'อุปกรณ์เสริม',
    categoryId: 'accessories',
    price: 650,
    rating: 4.7,
    reviewsCount: 64,
    shortDesc: 'UPF 50+ ultralight foldable brim mountain cap with laser ventilation.',
    shortDesc_th: 'หมวกกันแดด UPF 50+ พับปีกได้ น้ำหนักเบาพิเศษ ระบายอากาศด้วยเลเซอร์',
    description: 'Built for exposed alpine ridge lines. Weighing just 48 grams, this cap features a crushable EVA foam brim that recovers its shape and side laser-cut ventilation ports that keep you cool under high-altitude UV.',
    image: '/images/prod_sun_cap.jpg',
    badge: 'UPF 50+',
    badge_th: 'UPF 50+',
    isFeatured: false,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_sun_cap.jpg' },
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_sun_cap.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_sun_cap.jpg' }
    ],
    specs: {
      weight: '48 g',
      materials: '100% Recycled Quick-Dry Polyester / EVA Foam Flexible Brim',
      materials_th: 'ผ้าโพลีเอสเตอร์แห้งไว 100% ปีกหมวกโฟม EVA พับเก็บในกระเป๋าได้',
      waterproofRating: 'UPF 50+ Sun Block / DWR Water-Repellent Face',
      dimensions: 'Adjustable rear buckle (54 - 61 cm circumference)',
      bestUse: 'Exposed High-Sun Ridges, Trail Running & Scrambles',
      bestUse_th: 'เดินสันเขาแดดจัด วิ่งเทรลกลางแจ้ง และกิจกรรมบนภูเขาสูง'
    }
  },
  {
    id: 25,
    name: 'Trail Running Hydration Vest 8L',
    name_th: 'เป้น้ำวิ่งเทรล Trail Running Vest 8L',
    category: 'Backpacks',
    category_th: 'เป้สะพายหลัง',
    categoryId: 'backpacks',
    price: 2290,
    rating: 4.9,
    reviewsCount: 71,
    shortDesc: 'Ergonomic bounce-free mountain vest with dual 500ml HydraPak soft flasks.',
    shortDesc_th: 'เป้น้ำวิ่งเทรลกระชับลำตัว ไม่แกว่ง พร้อมขวดน้ำนิ่ม HydraPak 500ml คู่',
    description: 'Engineered with a body-hugging anatomical harness that eliminates bounce during steep technical descents. Features 8 smart stretch pockets, trekking pole quiver attachment, and 2 included 500ml soft flasks.',
    image: '/images/prod_hydration_vest.jpg',
    badge: '2 FLASKS INCL.',
    badge_th: 'แถมขวดน้ำ 2 ใบ',
    isFeatured: true,
    sizes: ['S', 'M', 'L'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_hydration_vest.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_hydration_vest.jpg' },
      { id: 'summit_ember', name: 'Summit Ember', name_th: 'ส้มเอมเบอร์', hex: '#D05A2B', image: '/images/prod_hydration_vest.jpg' }
    ],
    specs: {
      weight: '210 g (empty without flasks)',
      materials: '3D Breathable Mesh Harness / PowerStretch Elastane Pockets',
      materials_th: 'ตาข่ายระบายอากาศ 3D ตาข่ายผ้ายืด PowerStretch กระชับสรีระ',
      waterproofRating: 'Water-Resistant Zippered Phone & Key Security Pocket',
      dimensions: '8 Liters Storage / Compatible with 1.5L Reservoir',
      bestUse: 'Speed Fastpacking, Ultra-Trail Marathons & Light Day Hikes',
      bestUse_th: 'วิ่งเทรลระยะไกล เดินป่าความเร็วสูง และเดย์ทริปเน้นเบา'
    }
  },
  {
    id: 26,
    name: 'Gravity Water Filter & Purifier',
    name_th: 'เครื่องกรองน้ำเดินป่า Gravity Purifier 3L',
    category: 'Camping',
    category_th: 'อุปกรณ์แคมป์ปิ้ง',
    categoryId: 'camping',
    price: 1490,
    rating: 4.8,
    reviewsCount: 49,
    shortDesc: '0.1-micron hollow fiber trail gravity filtration system with 3L reservoir.',
    shortDesc_th: 'ระบบกรองน้ำแรงโน้มถ่วง 0.1 ไมครอน ถุงบรรจุน้ำ 3 ลิตร ดื่มน้ำสะอาดจากลำธาร',
    description: 'Filters 3 liters of natural mountain water in under 4 minutes using pure gravity. The 0.1-micron microfiltration hollow-fiber membrane removes 99.9999% of bacteria, protozoa, and microplastics from alpine streams.',
    image: '/images/prod_water_filter.jpg',
    badge: '0.1 MICRON',
    badge_th: '0.1 ไมครอน',
    isFeatured: false,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'glacier_slate', name: 'Glacier Slate', name_th: 'เทากลาเซียร์', hex: '#6B7A82', image: '/images/prod_water_filter.jpg' }
    ],
    specs: {
      weight: '145 g (full kit)',
      materials: 'Food-Grade TPU Reservoir / Hollow Fiber Membrane Cartridge',
      materials_th: 'ถุงบรรจุ TPU เกรดอาหาร ไส้กรอง Hollow Fiber กรองได้ 2,000 ลิตร',
      waterproofRating: 'BPA-Free, Chemical-Free Physical Filtration',
      dimensions: '3L Dirty Water Reservoir / 80 cm Quick-Connect Hose',
      bestUse: 'Natural Stream Hydration on Remote Multi-Day Treks',
      bestUse_th: 'กรองน้ำดื่มจากลำธารธรรมชาติในการเดินป่าระยะไกลหลายวัน'
    }
  },
  {
    id: 27,
    name: 'Ultralight Dry Bag Set (3/5/8L)',
    name_th: 'เซตถุงกันน้ำ Ultralight Dry Bag (3/5/8L)',
    category: 'Accessories',
    category_th: 'อุปกรณ์เสริม',
    categoryId: 'accessories',
    price: 890,
    rating: 4.8,
    reviewsCount: 83,
    shortDesc: 'Set of 3 ultralight roll-top waterproof Cordura dry sacks with D-ring buckles.',
    shortDesc_th: 'เซตถุงกันน้ำ 3 ขนาด (3L, 5L, 8L) ป้องกันสัมภาระเปียกชื้น 100%',
    description: 'Keeps electronics, sleeping bag, and dry clothes secure during river crossings and monsoon rains. Taped seams with non-wicking Hypalon roll-top closure.',
    image: '/images/prod_dry_bags.jpg',
    badge: '3-PACK SET',
    badge_th: 'เซต 3 ใบ',
    isFeatured: false,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_dry_bags.jpg' },
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_dry_bags.jpg' },
      { id: 'summit_ember', name: 'Summit Ember', name_th: 'ส้มเอมเบอร์', hex: '#D05A2B', image: '/images/prod_dry_bags.jpg' }
    ],
    specs: {
      weight: '95 g (Total 3 bags)',
      materials: '30D Diamond Ripstop Cordura® with Siliconized Coating',
      materials_th: 'ผ้าไนลอน Cordura® ริปสตอป 30D เคลือบซิลิโคนและเทปซีลตะเข็บ',
      waterproofRating: '10,000 mm Hydrostatic Head (100% Submersion Guard)',
      dimensions: '3L (15x25cm), 5L (18x32cm), 8L (20x38cm)',
      bestUse: 'Monsoon Expeditions, River Crossings & Pack Organization',
      bestUse_th: 'เดินป่าหน้าฝน ลุยข้ามลำธาร และจัดระเบียบอุปกรณ์ในเป้'
    }
  },
  {
    id: 28,
    name: 'Merino Neck Gaiter / Buff',
    name_th: 'ผ้าบัฟคอขนแกะเมอริโน Merino Neck Gaiter',
    category: 'Accessories',
    category_th: 'อุปกรณ์เสริม',
    categoryId: 'accessories',
    price: 590,
    rating: 4.9,
    reviewsCount: 92,
    shortDesc: '100% natural merino wool seamless multifunctional neck and face thermal gaiter.',
    shortDesc_th: 'ผ้าบัฟขนแกะเมอริโน 100% ไร้รอยต่อ กันลมหนาว ป้องกันฝุ่นและรังสี UV',
    description: 'Versatile cold-weather essential worn as a neck warmer, face mask, or beanie. Natural thermoregulation breathes comfortably while trapping core warmth in sub-zero alpine drafts.',
    image: '/images/prod_neck_gaiter.jpg',
    badge: '100% MERINO',
    badge_th: 'เมอริโนแท้',
    isFeatured: false,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_neck_gaiter.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_neck_gaiter.jpg' },
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_neck_gaiter.jpg' }
    ],
    specs: {
      weight: '45 g',
      materials: '100% Australian Superfine Merino Wool (200 g/m²)',
      materials_th: 'ขนแกะเมอริโนออสเตรเลียแท้ 100% ความหนา 200 g/m² สัมผัสนุ่มไม่คัน',
      waterproofRating: 'Breathable Moisture Vapor Permeable / Anti-Odor',
      dimensions: '50 cm length x 24 cm width (Tubular Stretch)',
      bestUse: 'Face & Neck Wind Protection on Cold Summits & Open Ridges',
      bestUse_th: 'กันลมหนาวกระทบใบหน้าและลำคอ บนยอดเขาและสันเขาเปิดโล่ง'
    }
  },
  {
    id: 29,
    name: 'Alpine LED Camp Lantern',
    name_th: 'ตะเกียงแคมป์ปิ้ง LED อัลไพน์ Alpine Lantern',
    category: 'Camping',
    category_th: 'อุปกรณ์แคมป์ปิ้ง',
    categoryId: 'camping',
    price: 1090,
    rating: 4.7,
    reviewsCount: 51,
    shortDesc: 'Collapsible 360° warm glow rechargeable camp lantern with powerbank mode.',
    shortDesc_th: 'ตะเกียงแคมป์ปิ้ง LED แสงวอร์มไวท์ 360 องศา ยุบเก็บได้ พร้อมโหมดชาร์จแบต',
    description: 'Provides 360-degree glare-free warm ambient light (2700K) inside your shelter or around the camp table. Built-in 4,400mAh battery doubles as an emergency power bank for trail phones.',
    image: '/images/prod_camp_lantern.jpg',
    badge: 'WARM GLOW',
    badge_th: 'แสงวอร์ม',
    isFeatured: false,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_camp_lantern.jpg' },
      { id: 'dolomite_sand', name: 'Dolomite Sand', name_th: 'เบจโดโลไมต์', hex: '#C8B89E', image: '/images/prod_camp_lantern.jpg' },
      { id: 'alpine_charcoal', name: 'Alpine Charcoal', name_th: 'เทาดำอัลไพน์', hex: '#292B28', image: '/images/prod_camp_lantern.jpg' }
    ],
    specs: {
      weight: '185 g',
      materials: 'Anodized Aluminum Cap + Brass Hook + Frosted Polycarbonate',
      materials_th: 'ฝาอลูมิเนียมอโนไดซ์ หูหิ้วทองเหลือง บอดี้โพลีคาร์บอเนตฝ้ากรองแสง',
      waterproofRating: 'IPX4 Water-Resistant (Heavy Mist & Splash Resistant)',
      dimensions: 'Collapsed: 11 x 6 cm / Extended: 16 x 6 cm',
      bestUse: 'Tent Interior Illumination, Camp Cooking & Emergency Phone Charge',
      bestUse_th: 'ให้แสงสว่างในเต็นท์ ทำอาหารรอบแคมป์ และชาร์จมือถือฉุกเฉิน'
    }
  },
  {
    id: 30,
    name: 'Trail Mountain First Aid Kit',
    name_th: 'ชุดปฐมพยาบาลเดินป่า Trail First Aid Kit',
    category: 'Accessories',
    category_th: 'อุปกรณ์เสริม',
    categoryId: 'accessories',
    price: 590,
    rating: 4.9,
    reviewsCount: 118,
    shortDesc: 'Comprehensive waterproof medical response kit with trauma shears and blister kit.',
    shortDesc_th: 'ชุดปฐมพยาบาลกันน้ำสำหรับเดินป่า พร้อมแผ่นแปะกันพุพองและกรรไกรฉุกเฉิน',
    description: 'Essential trail safety pack packed in a water-resistant ripstop zip pouch with carabiner loop. Contains antiseptic wipes, elastic compression wraps, blister hydrocolloid patches, emergency space blanket, and titanium tweezers.',
    image: '/images/prod_first_aid.jpg',
    badge: 'ESSENTIAL',
    badge_th: 'อุปกรณ์จำเป็น',
    isFeatured: true,
    sizes: ['One Size'],
    inStock: true,
    colors: [
      { id: 'summit_ember', name: 'Summit Ember', name_th: 'ส้มเอมเบอร์', hex: '#D05A2B', image: '/images/prod_first_aid.jpg' },
      { id: 'pine_forest', name: 'Pine Forest', name_th: 'เขียวป่าสน', hex: '#183C32', image: '/images/prod_first_aid.jpg' }
    ],
    specs: {
      weight: '160 g',
      materials: 'Waterproof Welded TPU Ripstop Pouch + Medical Components',
      materials_th: 'กระเป๋าผ้า TPU ริปสตอปกันน้ำ พร้อมอุปกรณ์ทางการแพทย์ 32 ชิ้น',
      waterproofRating: 'IPX6 Splash & Dust Tight Pouch',
      dimensions: '15 x 11 x 5 cm (With Carabiner Clip)',
      bestUse: 'Trail Blister Treatment, Sprain Support & Emergency Survival',
      bestUse_th: 'รักษาแผลพุพอง พยุงข้อเท้าพลิก และปฐมพยาบาลฉุกเฉินบนเขา'
    }
  }
];

export const formatPrice = (price) => {
  return `฿${price.toLocaleString('en-US')}`;
};
