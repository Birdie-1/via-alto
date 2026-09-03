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
        en: 'Thermal insulation and speed stability for freezing ridge ascents.',
        th: 'รักษาความอบอุ่น คล่องตัวสูง สำหรับการเดินขึ้นยอดเขาที่หนาวเย็น'
      };
      matchedProductIds = [14, 4, 2, 11]; // Nordic Fleece, Shell Jacket, Trail 25L, Trekking Poles
      matchScore = 98;
    } else {
      kitTitle = {
        en: 'Sub-Zero Alpine Sanctuary Kit',
        th: 'ชุดเดินป่าค้างแรมป้องกันความหนาวจัด (Sub-Zero Kit)'
      };
      kitSubtitle = {
        en: 'Tested down to 0°C with thermal ground barrier and weatherproof shell.',
        th: 'ทนความหนาวได้ถึง 0°C ตัดความเย็นจากพื้นดิน พร้อมเต็นท์ต้านลมพายุ'
      };
      matchedProductIds = [1, 9, 10, 18, 14]; // Alpine 35L, Tent, Sleeping Bag, Sleeping Pad, Fleece
      matchScore = 99;
    }
  }
  // Rule 2: Tropical Rainforest / Monsoon
  else if (destination === 'tropical_rain') {
    if (duration === 'day_hike') {
      kitTitle = {
        en: 'Monsoon Trail Running & Fast Trek Kit',
        th: 'ชุดเดินป่าฤดูฝน & ลุยน้ำข้ามห้วย'
      };
      kitSubtitle = {
        en: 'High-drainage traction, quick-dry pants, and waterproof lighting.',
        th: 'ระบายน้ำเร็ว ไม่ลื่นบนหินเปียก พร้อมไฟฉายกันน้ำลุยฝนหนัก'
      };
      matchedProductIds = [17, 5, 20, 2]; // Veloce Runners, Trail Pants, Headlamp, Trail 25L
      matchScore = 97;
    } else {
      kitTitle = {
        en: 'Rainforest Expedition Weatherproof Kit',
        th: 'ชุดเดินป่าหน้าฝนค้างแรมแบบกันน้ำเต็มพิกัด'
      };
      kitSubtitle = {
        en: 'Maximum moisture barrier with waterproof nubuck boots and 3-layer shell.',
        th: 'ป้องกันความเปียกชื้น 100% ด้วยรองเท้าบูทหนัง Nubuck และเสื้อแจ็กเก็ตกันน้ำ 3 ชั้น'
      };
      matchedProductIds = [4, 8, 1, 9, 20]; // Alpine Shell, Alto Boots, 35L Pack, Tent, Headlamp
      matchScore = 98;
    }
  }
  // Rule 3: Fast Scramble & Rocky Ridge
  else {
    if (priority === 'ultralight') {
      kitTitle = {
        en: 'Ultralight Ridge Fastpacking Kit',
        th: 'ชุดอุปกรณ์เบาพิเศษสำหรับสันเขา (Ultralight Kit)'
      };
      kitSubtitle = {
        en: 'Sub-3kg total base gear designed for speed, agility, and minimal bulk.',
        th: 'น้ำหนักเบาพิเศษไม่เกิน 3 กก. คล่องแคล่ว ว่องไว บนทางหินแคบ'
      };
      matchedProductIds = [13, 15, 17, 19, 11]; // 18L Pack, Windbreaker, Trail Runners, Titanium Stove, Poles
      matchScore = 99;
    } else {
      kitTitle = {
        en: 'Classic Alpine Ridge Traverse Kit',
        th: 'ชุดเดินป่าข้ามสันเขาหินคลาสสิก'
      };
      kitSubtitle = {
        en: 'Unwavering Vibram traction, cork trekking poles, and reliable load transfer.',
        th: 'ยึดเกาะหินมั่นคงด้วยพื้น Vibram ไม้เท้าคาร์บอนซับแรง และเป้กระชับหลัง'
      };
      matchedProductIds = [1, 7, 11, 6, 12]; // 35L, Terra Shoes, Poles, Merino Tee, Insulated Bottle
      matchScore = 96;
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
