// VIA ALTO Gear Finder Quiz Engine & Recommendations

import { PRODUCTS } from './products';

export const QUIZ_QUESTIONS = [
  {
    id: 'destination',
    step: 1,
    title: {
      en: 'Where is your upcoming expedition?',
      th: 'เส้นทางการผจญภัยครั้งต่อไปของคุณอยู่ที่ไหน?'
    },
    subtitle: {
      en: 'Select the terrain and expected weather conditions.',
      th: 'เลือกสภาพภูมิประเทศและสภาพอากาศที่คุณคาดว่าจะเผชิญ'
    },
    options: [
      {
        id: 'winter_alpine',
        title: {
          en: 'High Alpine & Cold Summits',
          th: 'ยอดเขาสูง & อากาศหนาวจัด'
        },
        description: {
          en: 'Sub-zero temperatures, freezing night winds (e.g. Doi Inthanon winter, European Alps, High Doi Peaks)',
          th: 'อุณหภูมิต่ำกว่า 10°C ลมกรรโชกแรงยามค่ำคืน (เช่น ดอยอินทนนท์หน้าหนาว, เทือกเขาแอลป์)'
        },
        icon: 'CloudSnow',
        climateTag: 'cold'
      },
      {
        id: 'tropical_rain',
        title: {
          en: 'Tropical Rainforest & Monsoon Trail',
          th: 'ป่าดิบชื้น & เส้นทางฤดูฝน'
        },
        description: {
          en: 'High humidity, river crossings, unpredictable downpours (e.g. Khao Yai, Umphang, Southern Ridges)',
          th: 'ความชื้นสูง ลุยน้ำ ข้ามลำธาร ฝนตกไม่คาดฝัน (เช่น เขาใหญ่, อุ้มผาง, ป่าดิบภาคใต้)'
        },
        icon: 'Droplets',
        climateTag: 'wet'
      },
      {
        id: 'ridge_fast',
        title: {
          en: 'Fast Scramble & Rocky Mountain Ridge',
          th: 'สันเขาหินชัน & เดินเร็วทางยาว'
        },
        description: {
          en: 'Exposed rocky ridges, loose scree, fast tempo scrambling (e.g. Khao Chang Phueak, Phu Kradueng)',
          th: 'สันคมมีด สันเขาหินเปิดโล่ง เดินทำเวลา คล่องตัว (เช่น สันหนอกวัว, เขาช้างเผือก)'
        },
        icon: 'Mountain',
        climateTag: 'fast'
      }
    ]
  },
  {
    id: 'duration',
    step: 2,
    title: {
      en: 'What is the planned trip duration?',
      th: 'ระยะเวลาการเดินทางทริปนี้ของคุณ?'
    },
    subtitle: {
      en: 'This determines pack capacity and camping shelter requirements.',
      th: 'เพื่อกำหนดขนาดความจุของเป้สะพายหลัง และระบบเต็นท์ที่พักแรม'
    },
    options: [
      {
        id: 'day_hike',
        title: {
          en: 'Day Trek (Fast & Light)',
          th: 'เดินป่า 1 วัน (ไปเช้า-เย็นกลับ)'
        },
        description: {
          en: 'Single day push without overnight shelter. Compact essentials only.',
          th: 'เดินไปเช้ากลับเย็น ไม่ค้างแรม เน้นอุปกรณ์จำเป็นขนาดกะทัดรัด คล่องตัว'
        },
        icon: 'Sun',
        durationTag: 'day'
      },
      {
        id: 'weekend_camp',
        title: {
          en: 'Weekend Camp (2 Days / 1 Night)',
          th: 'แคมป์ปิ้งวันหยุด (2 วัน 1 คืน / 3 วัน 2 คืน)'
        },
        description: {
          en: 'Overnight wilderness camping requiring shelter, sleep system, and trail cooking.',
          th: 'ค้างแรมในป่า ต้องการเต็นท์ ถุงนอน แผ่นรองนอน และชุดเตาอาหาร'
        },
        icon: 'Tent',
        durationTag: 'weekend'
      },
      {
        id: 'expedition',
        title: {
          en: 'Multi-Day Wilderness Expedition',
          th: 'เดินสำรวจระยะไกลหลายวัน (3+ คืน)'
        },
        description: {
          en: 'Self-sufficient remote traverse demanding heavy carrying capacity and durability.',
          th: 'พึ่งพาตนเองเต็มรูปแบบในป่าลึก แบกสัมภาระหนัก ทนทานสูงสุด'
        },
        icon: 'Compass',
        durationTag: 'expedition'
      }
    ]
  },
  {
    id: 'priority',
    step: 3,
    title: {
      en: 'What is your primary packing philosophy?',
      th: 'จุดเน้นสำคัญที่สุดในการจัดอุปกรณ์ของคุณ?'
    },
    subtitle: {
      en: 'Choose what matters most on the trail.',
      th: 'เลือกสิ่งที่คุณให้ความสำคัญเป็นอันดับหนึ่ง'
    },
    options: [
      {
        id: 'ultralight',
        title: {
          en: 'Ultralight & Speed Priority',
          th: 'เน้นเบาพิเศษ (Ultralight) & คล่องตัว'
        },
        description: {
          en: 'Shave every gram. Minimalist fabrics and titanium gear for maximum speed.',
          th: 'ลดน้ำหนักให้เบาที่สุด ใช้วัสดุไทเทเนียมและผ้าบางเบาเพื่อความเร็ว'
        },
        icon: 'Feather',
        priorityTag: 'light'
      },
      {
        id: 'durability',
        title: {
          en: 'All-Weather Defense & Durability',
          th: 'ความทนทานสูงสุด & ป้องกันทุกพายุ'
        },
        description: {
          en: 'Heavy-duty Cordura®, 100% waterproof membranes, and maximum alpine protection.',
          th: 'ผ้า Cordura® แข็งแกร่ง กันน้ำ 100% ปลอดภัยอบอุ่นแม้เจอพายุหนัก'
        },
        icon: 'Shield',
        priorityTag: 'rugged'
      },
      {
        id: 'balanced',
        title: {
          en: 'Balanced All-Rounder Setup',
          th: 'สมดุลรอบด้าน & คุ้มค่าที่สุด'
        },
        description: {
          en: 'Proven mountain essentials balancing comfort, durability, and weight.',
          th: 'อุปกรณ์มาตรฐานที่นักเดินเขานิยม สมดุลทั้งน้ำหนัก ความสบาย และราคา'
        },
        icon: 'CheckCircle',
        priorityTag: 'balanced'
      }
    ]
  }
];

// Helper to calculate recommendation based on user choices
export function getRecommendedKit(answers, lang = 'en') {
  const { destination, duration, priority } = answers;

  let matchedProductIds = [];
  let kitTitle = { en: 'Alpine Essential Kit', th: 'ชุดอุปกรณ์เดินเขามาตรฐาน' };
  let kitSubtitle = {
    en: 'Customized gear balance matched for your mountain itinerary.',
    th: 'จัดสรรชุดอุปกรณ์ตามเงื่อนไขการเดินทางและสภาพภูมิอากาศของคุณ'
  };
  let matchScore = 96;

  // Rule 1: High Alpine / Cold
  if (destination === 'winter_alpine') {
    if (duration === 'day_hike') {
      kitTitle = {
        en: 'Alpine Summit Push Day Kit',
        th: 'ชุดอุปกรณ์พิชิตยอดเขาระยะสั้นในอากาศหนาว'
      };
      kitSubtitle = {
        en: 'Thermal insulation, wind defense, and blister-free movement for freezing summits.',
        th: 'ฉนวนกันความหนาว กันลมแรง ป้องกันแผลพุพอง พร้อมอุปกรณ์พยุงข้อสำหรับยอดเขาหนาวจัด'
      };
      matchedProductIds = [13, 4, 21, 28, 16, 23, 11, 30]; // 18L Pack, Shell, Down Jacket, Neck Gaiter, Gloves, Merino Socks, Poles, First Aid
      matchScore = 98;
    } else if (duration === 'expedition') {
      kitTitle = {
        en: 'Sub-Zero Alpine Expedition Sanctuary Kit',
        th: 'ชุดเดินป่าสำรวจระยะไกลในเขตหนาวจัด (Alpine Expedition Kit)'
      };
      kitSubtitle = {
        en: 'Expedition hauler, storm-tested shelter, pure water filtration, and full thermal barrier down to sub-zero.',
        th: 'เป้ใหญ่ 50L เต็นท์ต้านพายุ กรองน้ำสะอาดในป่าลึก และฉนวนความร้อนรอบด้านรับมืออากาศติดลบ'
      };
      matchedProductIds = [3, 9, 10, 18, 21, 14, 26, 29, 30]; // 50L Pack, Tent, 0°C Bag, Pad, Down Jacket, Fleece, Water Filter, Camp Lantern, First Aid
      matchScore = 99;
    } else {
      kitTitle = {
        en: 'Sub-Zero Alpine Sanctuary Kit',
        th: 'ชุดเดินป่าค้างแรมป้องกันความหนาวจัด (Sub-Zero Kit)'
      };
      kitSubtitle = {
        en: 'Tested down to 0°C with thermal ground barrier, 800-fill down insulation, and warm ambient camp lighting.',
        th: 'ทนความหนาวได้ถึง 0°C ตัดความเย็นจากพื้นดิน แจ็กเก็ตดาวน์ 800-Fill และแสงสว่างอบอุ่นรอบแคมป์'
      };
      matchedProductIds = [1, 9, 10, 18, 21, 14, 29]; // Alpine 35L, Tent, 0°C Bag, Pad, Down Jacket, Fleece, Camp Lantern
      matchScore = 99;
    }
  }
  // Rule 2: Tropical Rainforest / Monsoon
  else if (destination === 'tropical_rain') {
    if (duration === 'day_hike') {
      kitTitle = {
        en: 'Monsoon Trail Fast Trek & River Crossing Kit',
        th: 'ชุดเดินป่าหน้าฝน & ลุยน้ำข้ามห้วยแบบคล่องตัว'
      };
      kitSubtitle = {
        en: 'Bounce-free hydration vest, dry bag electronics seal, rain shell pants, and waterproof lighting.',
        th: 'เป้น้ำกระชับตัว ถุงกันน้ำ 100% กางเกงกันฝนลุยพายุ และไฟฉายกันน้ำลึกสำหรับหน้าฝน'
      };
      matchedProductIds = [25, 17, 5, 22, 27, 20, 30]; // 8L Vest, Trail Runners, Utility Pants, Rain Pants, Dry Bags, Headlamp, First Aid
      matchScore = 98;
    } else {
      kitTitle = {
        en: 'Rainforest Expedition All-Weather Defense Kit',
        th: 'ชุดเดินป่าหน้าฝนค้างแรมแบบกันน้ำและพึ่งพาตนเองเต็มพิกัด'
      };
      kitSubtitle = {
        en: 'Full moisture barrier with Italian nubuck boots, 3-layer shell, storm rain pants, dry bags, and gravity purifier.',
        th: 'ป้องกันความเปียกชื้น 100% บูทหนังอิตาลี เสื้อ-กางเกงกันฝน ถุงกันน้ำ และเครื่องกรองน้ำสะอาดจากลำธาร'
      };
      const packId = duration === 'expedition' ? 3 : 1;
      matchedProductIds = [packId, 4, 22, 8, 9, 27, 26, 20]; // 35L/50L, Shell, Rain Pants, Boots, Tent, Dry Bags, Water Filter, Headlamp
      matchScore = 98;
    }
  }
  // Rule 3: Fast Scramble & Rocky Ridge
  else {
    if (priority === 'ultralight') {
      kitTitle = {
        en: 'Ultralight Ridge Fastpacking Kit',
        th: 'ชุดอุปกรณ์เบาพิเศษสำหรับสันเขา (Ultralight Fastpack Kit)'
      };
      kitSubtitle = {
        en: 'Bounce-free hydration vest, sun defense, featherweight windbreaker, and blister-defense merino.',
        th: 'เป้น้ำ 8L แนบลำตัว หมวกกันแดด UPF50+ เสื้อกันลมเบาหวิว และถุงเท้าเมอริโนซับแรงกระแทก'
      };
      matchedProductIds = [25, 15, 17, 24, 19, 11, 23, 30]; // 8L Vest, Windbreaker, Trail Runners, Sun Cap, Titanium Stove, Poles, Merino Socks, First Aid
      matchScore = 99;
    } else {
      kitTitle = {
        en: 'Classic Alpine Ridge Traverse Kit',
        th: 'ชุดเดินป่าข้ามสันเขาหินคลาสสิกครบเซต'
      };
      kitSubtitle = {
        en: 'Unwavering Vibram traction, carbon shock absorption, UPF 50+ sun protection, and essential trail first aid.',
        th: 'ยึดเกาะหินมั่นคงด้วย Vibram ไม้เท้าคาร์บอนลดแรงกดเข่า หมวกกันแดด UV และชุดปฐมพยาบาลพกพา'
      };
      matchedProductIds = [1, 7, 11, 6, 24, 12, 23, 30]; // 35L, Terra Shoes, Poles, Merino Tee, Sun Cap, Bottle, Merino Socks, First Aid
      matchScore = 97;
    }
  }

  // Retrieve full product objects
  const items = matchedProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  // Calculate stats
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const bundleDiscountPrice = Math.round(totalPrice * 0.9); // 10% Bundle Discount

  // Calculate approximate total weight in grams
  let totalWeightGrams = 0;
  items.forEach((item) => {
    const wStr = item.specs?.weight || '';
    if (wStr.includes('kg')) {
      const kg = parseFloat(wStr);
      if (!isNaN(kg)) totalWeightGrams += kg * 1000;
    } else {
      const g = parseInt(wStr.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(g)) totalWeightGrams += g;
    }
  });

  return {
    title: kitTitle[lang] || kitTitle.en,
    subtitle: kitSubtitle[lang] || kitSubtitle.en,
    matchScore,
    items,
    totalPrice,
    bundleDiscountPrice,
    totalWeightGrams: totalWeightGrams || 2850,
    totalWeightFormatted: totalWeightGrams > 1000
      ? `${(totalWeightGrams / 1000).toFixed(2)} kg`
      : `${totalWeightGrams} g`
  };
}
