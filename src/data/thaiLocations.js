/**
 * =========================================================================
 * ฐานข้อมูลจังหวัดและอำเภอ/เขต ทั่วประเทศไทย 77 จังหวัด 928 อำเภอ/เขต
 * สำหรับระบบ Checkout ของ VIA ALTO (GO BEYOND.)
 * ข้อมูลอ้างอิงจากฐานข้อมูลกรมการปกครอง (Open-source DOPA / MIT License)
 * รองรับชื่อภาษาไทย (name_th), ชื่อภาษาอังกฤษ (name_en) และรหัสไปรษณีย์ (zip_code)
 * =========================================================================
 */

// บรรทัดที่ 12: ประกาศชุดข้อมูลจังหวัดและอำเภอทั้งหมด 77 จังหวัด
export const THAI_PROVINCES_DATA = [
  {
    "id": 1,
    "name_th": "กรุงเทพมหานคร",
    "name_en": "Bangkok",
    "districts": [
      {
        "id": 1018,
        "name_th": "เขตคลองสาน",
        "name_en": "Khlong San",
        "zip_code": "10600"
      },
      {
        "id": 1046,
        "name_th": "เขตคลองสามวา",
        "name_en": "Khlong Sam Wa",
        "zip_code": "10510"
      },
      {
        "id": 1033,
        "name_th": "เขตคลองเตย",
        "name_en": "Khlong Toei",
        "zip_code": "10110"
      },
      {
        "id": 1043,
        "name_th": "เขตคันนายาว",
        "name_en": "Khan Na Yao",
        "zip_code": "10230"
      },
      {
        "id": 1030,
        "name_th": "เขตจตุจักร",
        "name_en": "Chatuchak",
        "zip_code": "10900"
      },
      {
        "id": 1035,
        "name_th": "เขตจอมทอง",
        "name_en": "Chom Thong",
        "zip_code": "10150"
      },
      {
        "id": 1036,
        "name_th": "เขตดอนเมือง",
        "name_en": "Don Mueang",
        "zip_code": "10210"
      },
      {
        "id": 1026,
        "name_th": "เขตดินแดง",
        "name_en": "Din Daeng",
        "zip_code": "10400"
      },
      {
        "id": 1002,
        "name_th": "เขตดุสิต",
        "name_en": "Dusit",
        "zip_code": "10300"
      },
      {
        "id": 1019,
        "name_th": "เขตตลิ่งชัน",
        "name_en": "Taling Chan",
        "zip_code": "10170"
      },
      {
        "id": 1048,
        "name_th": "เขตทวีวัฒนา",
        "name_en": "Thawi Watthana",
        "zip_code": "10170"
      },
      {
        "id": 1049,
        "name_th": "เขตทุ่งครุ",
        "name_en": "Thung Khru",
        "zip_code": "10140"
      },
      {
        "id": 1015,
        "name_th": "เขตธนบุรี",
        "name_en": "Thon Buri",
        "zip_code": "10600"
      },
      {
        "id": 1020,
        "name_th": "เขตบางกอกน้อย",
        "name_en": "Bangkok Noi",
        "zip_code": "10700"
      },
      {
        "id": 1016,
        "name_th": "เขตบางกอกใหญ่",
        "name_en": "Bangkok Yai",
        "zip_code": "10600"
      },
      {
        "id": 1006,
        "name_th": "เขตบางกะปิ",
        "name_en": "Bang Kapi",
        "zip_code": "10240"
      },
      {
        "id": 1021,
        "name_th": "เขตบางขุนเทียน",
        "name_en": "Bang Khun Thian",
        "zip_code": "10150"
      },
      {
        "id": 1031,
        "name_th": "เขตบางคอแหลม",
        "name_en": "Bang Kho Laem",
        "zip_code": "10120"
      },
      {
        "id": 1029,
        "name_th": "เขตบางซื่อ",
        "name_en": "Bang Sue",
        "zip_code": "10800"
      },
      {
        "id": 1047,
        "name_th": "เขตบางนา",
        "name_en": "Bang Na",
        "zip_code": "10260"
      },
      {
        "id": 1050,
        "name_th": "เขตบางบอน",
        "name_en": "Bang Bon",
        "zip_code": "10150"
      },
      {
        "id": 1025,
        "name_th": "เขตบางพลัด",
        "name_en": "Bang Phlat",
        "zip_code": "10700"
      },
      {
        "id": 1004,
        "name_th": "เขตบางรัก",
        "name_en": "Bang Rak",
        "zip_code": "10500"
      },
      {
        "id": 1005,
        "name_th": "เขตบางเขน",
        "name_en": "Bang Khen",
        "zip_code": "10220"
      },
      {
        "id": 1040,
        "name_th": "เขตบางแค",
        "name_en": "Bang Khae",
        "zip_code": "10160"
      },
      {
        "id": 1027,
        "name_th": "เขตบึงกุ่ม",
        "name_en": "Bueng Kum",
        "zip_code": "10240"
      },
      {
        "id": 1007,
        "name_th": "เขตปทุมวัน",
        "name_en": "Pathum Wan",
        "zip_code": "10330"
      },
      {
        "id": 1032,
        "name_th": "เขตประเวศ",
        "name_en": "Prawet",
        "zip_code": "10250"
      },
      {
        "id": 1008,
        "name_th": "เขตป้อมปราบศัตรูพ่าย",
        "name_en": "Pom Prap Sattru Phai",
        "zip_code": "10100"
      },
      {
        "id": 1014,
        "name_th": "เขตพญาไท",
        "name_en": "Phaya Thai",
        "zip_code": "10400"
      },
      {
        "id": 1001,
        "name_th": "เขตพระนคร",
        "name_en": "Phra Nakhon",
        "zip_code": "10200"
      },
      {
        "id": 1009,
        "name_th": "เขตพระโขนง",
        "name_en": "Phra Khanong",
        "zip_code": "10260"
      },
      {
        "id": 1022,
        "name_th": "เขตภาษีเจริญ",
        "name_en": "Phasi Charoen",
        "zip_code": "10160"
      },
      {
        "id": 1010,
        "name_th": "เขตมีนบุรี",
        "name_en": "Min Buri",
        "zip_code": "10510"
      },
      {
        "id": 1012,
        "name_th": "เขตยานนาวา",
        "name_en": "Yan Nawa",
        "zip_code": "10120"
      },
      {
        "id": 1037,
        "name_th": "เขตราชเทวี",
        "name_en": "Ratchathewi",
        "zip_code": "10400"
      },
      {
        "id": 1024,
        "name_th": "เขตราษฎร์บูรณะ",
        "name_en": "Rat Burana",
        "zip_code": "10140"
      },
      {
        "id": 1011,
        "name_th": "เขตลาดกระบัง",
        "name_en": "Lat Krabang",
        "zip_code": "10520"
      },
      {
        "id": 1038,
        "name_th": "เขตลาดพร้าว",
        "name_en": "Lat Phrao",
        "zip_code": "10230"
      },
      {
        "id": 1045,
        "name_th": "เขตวังทองหลาง",
        "name_en": "Wang Thonglang",
        "zip_code": "10310"
      },
      {
        "id": 1039,
        "name_th": "เขตวัฒนา",
        "name_en": "Watthana",
        "zip_code": "10110"
      },
      {
        "id": 1034,
        "name_th": "เขตสวนหลวง",
        "name_en": "Suan Luang",
        "zip_code": "10250"
      },
      {
        "id": 1044,
        "name_th": "เขตสะพานสูง",
        "name_en": "Saphan Sung",
        "zip_code": "10240"
      },
      {
        "id": 1013,
        "name_th": "เขตสัมพันธวงศ์",
        "name_en": "Samphanthawong",
        "zip_code": "10100"
      },
      {
        "id": 1028,
        "name_th": "เขตสาทร",
        "name_en": "Sathon",
        "zip_code": "10120"
      },
      {
        "id": 1042,
        "name_th": "เขตสายไหม",
        "name_en": "Sai Mai",
        "zip_code": "10220"
      },
      {
        "id": 1003,
        "name_th": "เขตหนองจอก",
        "name_en": "Nong Chok",
        "zip_code": "10530"
      },
      {
        "id": 1023,
        "name_th": "เขตหนองแขม",
        "name_en": "Nong Khaem",
        "zip_code": "10160"
      },
      {
        "id": 1041,
        "name_th": "เขตหลักสี่",
        "name_en": "Lak Si",
        "zip_code": "10210"
      },
      {
        "id": 1017,
        "name_th": "เขตห้วยขวาง",
        "name_en": "Huai Khwang",
        "zip_code": "10310"
      }
    ]
  },
  {
    "id": 64,
    "name_th": "กระบี่",
    "name_en": "Krabi",
    "districts": [
      {
        "id": 8104,
        "name_th": "คลองท่อม",
        "name_en": "Khlong Thom",
        "zip_code": "81120"
      },
      {
        "id": 8106,
        "name_th": "ปลายพระยา",
        "name_en": "Plai Phraya",
        "zip_code": "81160"
      },
      {
        "id": 8107,
        "name_th": "ลำทับ",
        "name_en": "Lam Thap",
        "zip_code": "81120"
      },
      {
        "id": 8105,
        "name_th": "อ่าวลึก",
        "name_en": "Ao Luek",
        "zip_code": "81110"
      },
      {
        "id": 8103,
        "name_th": "เกาะลันตา",
        "name_en": "Ko Lanta",
        "zip_code": "81150"
      },
      {
        "id": 8102,
        "name_th": "เขาพนม",
        "name_en": "Khao Phanom",
        "zip_code": "81140"
      },
      {
        "id": 8101,
        "name_th": "เมืองกระบี่",
        "name_en": "Mueang Krabi",
        "zip_code": "81000"
      },
      {
        "id": 8108,
        "name_th": "เหนือคลอง",
        "name_en": "Nuea Khlong",
        "zip_code": "81130"
      }
    ]
  },
  {
    "id": 56,
    "name_th": "กาญจนบุรี",
    "name_en": "Kanchanaburi",
    "districts": [
      {
        "id": 7111,
        "name_th": "ด่านมะขามเตี้ย",
        "name_en": "Dan Makham Tia",
        "zip_code": "71260"
      },
      {
        "id": 7107,
        "name_th": "ทองผาภูมิ",
        "name_en": "Pha Phum",
        "zip_code": "71180"
      },
      {
        "id": 7105,
        "name_th": "ท่ามะกา",
        "name_en": "Tha Maka",
        "zip_code": "71120"
      },
      {
        "id": 7106,
        "name_th": "ท่าม่วง",
        "name_en": "Tha Muang",
        "zip_code": "71110"
      },
      {
        "id": 7103,
        "name_th": "บ่อพลอย",
        "name_en": "Bo Phloi",
        "zip_code": "71160"
      },
      {
        "id": 7109,
        "name_th": "พนมทวน",
        "name_en": "Phanom Thuan",
        "zip_code": "71140"
      },
      {
        "id": 7104,
        "name_th": "ศรีสวัสดิ์",
        "name_en": "Si Sawat",
        "zip_code": "71250"
      },
      {
        "id": 7108,
        "name_th": "สังขละบุรี",
        "name_en": "Sangkhla Buri",
        "zip_code": "71240"
      },
      {
        "id": 7112,
        "name_th": "หนองปรือ",
        "name_en": "Nong Prue",
        "zip_code": "71220"
      },
      {
        "id": 7113,
        "name_th": "ห้วยกระเจา",
        "name_en": "Huai Krachao",
        "zip_code": "71170"
      },
      {
        "id": 7101,
        "name_th": "เมืองกาญจนบุรี",
        "name_en": "Mueang Kanchanaburi",
        "zip_code": "71000"
      },
      {
        "id": 7110,
        "name_th": "เลาขวัญ",
        "name_en": "Lao Khwan",
        "zip_code": "71210"
      },
      {
        "id": 7102,
        "name_th": "ไทรโยค",
        "name_en": "Sai Yok",
        "zip_code": "71150"
      }
    ]
  },
  {
    "id": 34,
    "name_th": "กาฬสินธุ์",
    "name_en": "Kalasin",
    "districts": [
      {
        "id": 4603,
        "name_th": "กมลาไสย",
        "name_en": "Kamalasai",
        "zip_code": "46130"
      },
      {
        "id": 4605,
        "name_th": "กุฉินารายณ์",
        "name_en": "Kuchinarai",
        "zip_code": "46110"
      },
      {
        "id": 4610,
        "name_th": "คำม่วง",
        "name_en": "Kham Muang",
        "zip_code": "46180"
      },
      {
        "id": 4618,
        "name_th": "ฆ้องชัย",
        "name_en": "Khong Chai",
        "zip_code": "46130"
      },
      {
        "id": 4617,
        "name_th": "ดอนจาน",
        "name_en": "Don Chan",
        "zip_code": "46000"
      },
      {
        "id": 4611,
        "name_th": "ท่าคันโท",
        "name_en": "Tha Khantho",
        "zip_code": "46190"
      },
      {
        "id": 4616,
        "name_th": "นาคู",
        "name_en": "Na Khu",
        "zip_code": "46160"
      },
      {
        "id": 4602,
        "name_th": "นามน",
        "name_en": "Na Mon",
        "zip_code": "46230"
      },
      {
        "id": 4607,
        "name_th": "ยางตลาด",
        "name_en": "Yang Talat",
        "zip_code": "46120"
      },
      {
        "id": 4604,
        "name_th": "ร่องคำ",
        "name_en": "Rong Kham",
        "zip_code": "46210"
      },
      {
        "id": 4613,
        "name_th": "สมเด็จ",
        "name_en": "Somdet",
        "zip_code": "46150"
      },
      {
        "id": 4609,
        "name_th": "สหัสขันธ์",
        "name_en": "Sahatsakhan",
        "zip_code": "46140"
      },
      {
        "id": 4615,
        "name_th": "สามชัย",
        "name_en": "Sam Chai",
        "zip_code": "46180"
      },
      {
        "id": 4612,
        "name_th": "หนองกุงศรี",
        "name_en": "Nong Kung Si",
        "zip_code": "46220"
      },
      {
        "id": 4614,
        "name_th": "ห้วยผึ้ง",
        "name_en": "Huai Phueng",
        "zip_code": "46240"
      },
      {
        "id": 4608,
        "name_th": "ห้วยเม็ก",
        "name_en": "Huai Mek",
        "zip_code": "46170"
      },
      {
        "id": 4606,
        "name_th": "เขาวง",
        "name_en": "Khao Wong",
        "zip_code": "46160"
      },
      {
        "id": 4601,
        "name_th": "เมืองกาฬสินธุ์",
        "name_en": "Mueang Kalasin",
        "zip_code": "46000"
      }
    ]
  },
  {
    "id": 49,
    "name_th": "กำแพงเพชร",
    "name_en": "Kamphaeng Phet",
    "districts": [
      {
        "id": 6204,
        "name_th": "ขาณุวรลักษบุรี",
        "name_en": "Khanu Woralaksaburi",
        "zip_code": "62130"
      },
      {
        "id": 6205,
        "name_th": "คลองขลุง",
        "name_en": "Khlong Khlung",
        "zip_code": "62120"
      },
      {
        "id": 6203,
        "name_th": "คลองลาน",
        "name_en": "Khlong Lan",
        "zip_code": "62180"
      },
      {
        "id": 6208,
        "name_th": "ทรายทองวัฒนา",
        "name_en": "Sai Thong Watthana",
        "zip_code": "62190"
      },
      {
        "id": 6210,
        "name_th": "บึงสามัคคี",
        "name_en": "Bueng Samakkhi",
        "zip_code": "62210"
      },
      {
        "id": 6209,
        "name_th": "ปางศิลาทอง",
        "name_en": "Pang Sila Thong",
        "zip_code": "62120"
      },
      {
        "id": 6206,
        "name_th": "พรานกระต่าย",
        "name_en": "Phran Kratai",
        "zip_code": "62110"
      },
      {
        "id": 6207,
        "name_th": "ลานกระบือ",
        "name_en": "Lan Krabue",
        "zip_code": "62170"
      },
      {
        "id": 6201,
        "name_th": "เมืองกำแพงเพชร",
        "name_en": "Mueang Kamphaeng Phet",
        "zip_code": "62000"
      },
      {
        "id": 6211,
        "name_th": "โกสัมพีนคร",
        "name_en": "Kosamphi Nakhon",
        "zip_code": "62000"
      },
      {
        "id": 6202,
        "name_th": "ไทรงาม",
        "name_en": "Sai Ngam",
        "zip_code": "62150"
      }
    ]
  },
  {
    "id": 28,
    "name_th": "ขอนแก่น",
    "name_en": "Khon Kaen",
    "districts": [
      {
        "id": 4009,
        "name_th": "กระนวน",
        "name_en": "Kranuan",
        "zip_code": "40170"
      },
      {
        "id": 4018,
        "name_th": "ชนบท",
        "name_en": "Chonnabot",
        "zip_code": "40180"
      },
      {
        "id": 4005,
        "name_th": "ชุมแพ",
        "name_en": "Chum Phae",
        "zip_code": "40130"
      },
      {
        "id": 4021,
        "name_th": "ซำสูง",
        "name_en": "Sam Sung",
        "zip_code": "40170"
      },
      {
        "id": 4007,
        "name_th": "น้ำพอง",
        "name_en": "Nam Phong",
        "zip_code": "40140"
      },
      {
        "id": 4002,
        "name_th": "บ้านฝาง",
        "name_en": "Ban Fang",
        "zip_code": "40270"
      },
      {
        "id": 4024,
        "name_th": "บ้านแฮด",
        "name_en": "Ban Haet",
        "zip_code": "40110"
      },
      {
        "id": 4010,
        "name_th": "บ้านไผ่",
        "name_en": "Ban Phai",
        "zip_code": "40110"
      },
      {
        "id": 4003,
        "name_th": "พระยืน",
        "name_en": "Phra Yuen",
        "zip_code": "40320"
      },
      {
        "id": 4012,
        "name_th": "พล",
        "name_en": "Phon",
        "zip_code": "40120"
      },
      {
        "id": 4020,
        "name_th": "ภูผาม่าน",
        "name_en": "Phu Pha Man",
        "zip_code": "40350"
      },
      {
        "id": 4016,
        "name_th": "ภูเวียง",
        "name_en": "Phu Wiang",
        "zip_code": "40150"
      },
      {
        "id": 4017,
        "name_th": "มัญจาคีรี",
        "name_en": "Mancha Khiri",
        "zip_code": "40160"
      },
      {
        "id": 4006,
        "name_th": "สีชมพู",
        "name_en": "Si Chomphu",
        "zip_code": "40220"
      },
      {
        "id": 4023,
        "name_th": "หนองนาคำ",
        "name_en": "Nong Na Kham",
        "zip_code": "40150"
      },
      {
        "id": 4015,
        "name_th": "หนองสองห้อง",
        "name_en": "Nong Song Hong",
        "zip_code": "40190"
      },
      {
        "id": 4004,
        "name_th": "หนองเรือ",
        "name_en": "Nong Ruea",
        "zip_code": "40210"
      },
      {
        "id": 4008,
        "name_th": "อุบลรัตน์",
        "name_en": "Ubolratana",
        "zip_code": "40250"
      },
      {
        "id": 4019,
        "name_th": "เขาสวนกวาง",
        "name_en": "Khao Suan Kwang",
        "zip_code": "40280"
      },
      {
        "id": 4011,
        "name_th": "เปือยน้อย",
        "name_en": "Pueai Noi",
        "zip_code": "40340"
      },
      {
        "id": 4001,
        "name_th": "เมืองขอนแก่น",
        "name_en": "Mueang Khon Kaen",
        "zip_code": "40000"
      },
      {
        "id": 4029,
        "name_th": "เวียงเก่า",
        "name_en": "Wiang Kao",
        "zip_code": "40150"
      },
      {
        "id": 4014,
        "name_th": "แวงน้อย",
        "name_en": "Waeng Noi",
        "zip_code": "40230"
      },
      {
        "id": 4013,
        "name_th": "แวงใหญ่",
        "name_en": "Waeng Yai",
        "zip_code": "40330"
      },
      {
        "id": 4022,
        "name_th": "โคกโพธิ์ไชย",
        "name_en": "Khok Pho Chai",
        "zip_code": "40160"
      },
      {
        "id": 4025,
        "name_th": "โนนศิลา",
        "name_en": "Non Sila",
        "zip_code": "40110"
      }
    ]
  },
  {
    "id": 13,
    "name_th": "จันทบุรี",
    "name_en": "Chanthaburi",
    "districts": [
      {
        "id": 2202,
        "name_th": "ขลุง",
        "name_en": "Khlung",
        "zip_code": "22110"
      },
      {
        "id": 2203,
        "name_th": "ท่าใหม่",
        "name_en": "Tha Mai",
        "zip_code": "22120"
      },
      {
        "id": 2209,
        "name_th": "นายายอาม",
        "name_en": "Na Yai Am",
        "zip_code": "22160"
      },
      {
        "id": 2205,
        "name_th": "มะขาม",
        "name_en": "Makham",
        "zip_code": "22150"
      },
      {
        "id": 2207,
        "name_th": "สอยดาว",
        "name_en": "Soi Dao",
        "zip_code": "22180"
      },
      {
        "id": 2210,
        "name_th": "เขาคิชฌกูฏ",
        "name_en": "Khao Khitchakut",
        "zip_code": "22210"
      },
      {
        "id": 2201,
        "name_th": "เมืองจันทบุรี",
        "name_en": "Mueang Chanthaburi",
        "zip_code": "22000"
      },
      {
        "id": 2208,
        "name_th": "แก่งหางแมว",
        "name_en": "Kaeng Hang Maeo",
        "zip_code": "22160"
      },
      {
        "id": 2206,
        "name_th": "แหลมสิงห์",
        "name_en": "Laem Sing",
        "zip_code": "22130"
      },
      {
        "id": 2204,
        "name_th": "โป่งน้ำร้อน",
        "name_en": "Pong Nam Ron",
        "zip_code": "22140"
      }
    ]
  },
  {
    "id": 15,
    "name_th": "ฉะเชิงเทรา",
    "name_en": "Chachoengsao",
    "districts": [
      {
        "id": 2411,
        "name_th": "คลองเขื่อน",
        "name_en": "Khlong Khuean",
        "zip_code": "24000"
      },
      {
        "id": 2410,
        "name_th": "ท่าตะเกียบ",
        "name_en": "Tha Takiap",
        "zip_code": "24160"
      },
      {
        "id": 2402,
        "name_th": "บางคล้า",
        "name_en": "Bang Khla",
        "zip_code": "24110"
      },
      {
        "id": 2403,
        "name_th": "บางน้ำเปรี้ยว",
        "name_en": "Bang Nam Priao",
        "zip_code": "24150"
      },
      {
        "id": 2404,
        "name_th": "บางปะกง",
        "name_en": "Bang Pakong",
        "zip_code": "24130"
      },
      {
        "id": 2405,
        "name_th": "บ้านโพธิ์",
        "name_en": "Ban Pho",
        "zip_code": "24140"
      },
      {
        "id": 2406,
        "name_th": "พนมสารคาม",
        "name_en": "Phanom Sarakham",
        "zip_code": "24120"
      },
      {
        "id": 2407,
        "name_th": "ราชสาส์น",
        "name_en": "Ratchasan",
        "zip_code": "24120"
      },
      {
        "id": 2408,
        "name_th": "สนามชัยเขต",
        "name_en": "Sanam Chai Khet",
        "zip_code": "24160"
      },
      {
        "id": 2401,
        "name_th": "เมืองฉะเชิงเทรา",
        "name_en": "Mueang Chachoengsao",
        "zip_code": "24000"
      },
      {
        "id": 2409,
        "name_th": "แปลงยาว",
        "name_en": "Plaeng Yao",
        "zip_code": "24190"
      }
    ]
  },
  {
    "id": 11,
    "name_th": "ชลบุรี",
    "name_en": "Chon Buri",
    "districts": [
      {
        "id": 2004,
        "name_th": "บางละมุง",
        "name_en": "Bang Lamung",
        "zip_code": "20150"
      },
      {
        "id": 2010,
        "name_th": "บ่อทอง",
        "name_en": "Bo Thong",
        "zip_code": "20270"
      },
      {
        "id": 2002,
        "name_th": "บ้านบึง",
        "name_en": "Ban Bueng",
        "zip_code": "20170"
      },
      {
        "id": 2006,
        "name_th": "พนัสนิคม",
        "name_en": "Phanat Nikhom",
        "zip_code": "20140"
      },
      {
        "id": 2005,
        "name_th": "พานทอง",
        "name_en": "Phan Thong",
        "zip_code": "20160"
      },
      {
        "id": 2007,
        "name_th": "ศรีราชา",
        "name_en": "Si Racha",
        "zip_code": "20110"
      },
      {
        "id": 2009,
        "name_th": "สัตหีบ",
        "name_en": "Sattahip",
        "zip_code": "20180"
      },
      {
        "id": 2003,
        "name_th": "หนองใหญ่",
        "name_en": "Nong Yai",
        "zip_code": "20190"
      },
      {
        "id": 2011,
        "name_th": "เกาะจันทร์",
        "name_en": "Ko Chan",
        "zip_code": "20240"
      },
      {
        "id": 2008,
        "name_th": "เกาะสีชัง",
        "name_en": "Ko Sichang",
        "zip_code": "20120"
      },
      {
        "id": 2001,
        "name_th": "เมืองชลบุรี",
        "name_en": "Mueang Chon Buri",
        "zip_code": "20000"
      }
    ]
  },
  {
    "id": 9,
    "name_th": "ชัยนาท",
    "name_en": "Chai Nat",
    "districts": [
      {
        "id": 1802,
        "name_th": "มโนรมย์",
        "name_en": "Manorom",
        "zip_code": "17110"
      },
      {
        "id": 1803,
        "name_th": "วัดสิงห์",
        "name_en": "Wat Sing",
        "zip_code": "17120"
      },
      {
        "id": 1805,
        "name_th": "สรรคบุรี",
        "name_en": "Sankhaburi",
        "zip_code": "17140"
      },
      {
        "id": 1804,
        "name_th": "สรรพยา",
        "name_en": "Sapphaya",
        "zip_code": "17150"
      },
      {
        "id": 1807,
        "name_th": "หนองมะโมง",
        "name_en": "Nong Mamong",
        "zip_code": "17120"
      },
      {
        "id": 1806,
        "name_th": "หันคา",
        "name_en": "Hankha",
        "zip_code": "17130"
      },
      {
        "id": 1808,
        "name_th": "เนินขาม",
        "name_en": "Noen Kham",
        "zip_code": "17130"
      },
      {
        "id": 1801,
        "name_th": "เมืองชัยนาท",
        "name_en": "Mueang Chai Nat",
        "zip_code": "17000"
      }
    ]
  },
  {
    "id": 25,
    "name_th": "ชัยภูมิ",
    "name_en": "Chaiyaphum",
    "districts": [
      {
        "id": 3603,
        "name_th": "คอนสวรรค์",
        "name_en": "Khon Sawan",
        "zip_code": "36140"
      },
      {
        "id": 3613,
        "name_th": "คอนสาร",
        "name_en": "Khon San",
        "zip_code": "36180"
      },
      {
        "id": 3606,
        "name_th": "จัตุรัส",
        "name_en": "Chatturat",
        "zip_code": "36130"
      },
      {
        "id": 3616,
        "name_th": "ซับใหญ่",
        "name_en": "Sap Yai",
        "zip_code": "36130"
      },
      {
        "id": 3607,
        "name_th": "บำเหน็จณรงค์",
        "name_en": "Bamnet Narong",
        "zip_code": "36160"
      },
      {
        "id": 3602,
        "name_th": "บ้านเขว้า",
        "name_en": "Ban Khwao",
        "zip_code": "36170"
      },
      {
        "id": 3611,
        "name_th": "บ้านแท่น",
        "name_en": "Ban Thaen",
        "zip_code": "36190"
      },
      {
        "id": 3614,
        "name_th": "ภักดีชุมพล",
        "name_en": "Phakdi Chumphon",
        "zip_code": "36260"
      },
      {
        "id": 3610,
        "name_th": "ภูเขียว",
        "name_en": "Phu Khiao",
        "zip_code": "36110"
      },
      {
        "id": 3608,
        "name_th": "หนองบัวระเหว",
        "name_en": "Nong Bua Rawe",
        "zip_code": "36250"
      },
      {
        "id": 3605,
        "name_th": "หนองบัวแดง",
        "name_en": "Nong Bua Daeng",
        "zip_code": "36210"
      },
      {
        "id": 3604,
        "name_th": "เกษตรสมบูรณ์",
        "name_en": "Kaset Sombun",
        "zip_code": "36120"
      },
      {
        "id": 3609,
        "name_th": "เทพสถิต",
        "name_en": "Thep Sathit",
        "zip_code": "36230"
      },
      {
        "id": 3615,
        "name_th": "เนินสง่า",
        "name_en": "Noen Sa-nga",
        "zip_code": "36130"
      },
      {
        "id": 3601,
        "name_th": "เมืองชัยภูมิ",
        "name_en": "Mueang Chaiyaphum",
        "zip_code": "36000"
      },
      {
        "id": 3612,
        "name_th": "แก้งคร้อ",
        "name_en": "Kaeng Khro",
        "zip_code": "36150"
      }
    ]
  },
  {
    "id": 69,
    "name_th": "ชุมพร",
    "name_en": "Chumphon",
    "districts": [
      {
        "id": 8608,
        "name_th": "ทุ่งตะโก",
        "name_en": "Thung Tako",
        "zip_code": "86220"
      },
      {
        "id": 8602,
        "name_th": "ท่าแซะ",
        "name_en": "Tha Sae",
        "zip_code": "86140"
      },
      {
        "id": 8603,
        "name_th": "ปะทิว",
        "name_en": "Pathio",
        "zip_code": "86160"
      },
      {
        "id": 8606,
        "name_th": "พะโต๊ะ",
        "name_en": "Phato",
        "zip_code": "86180"
      },
      {
        "id": 8605,
        "name_th": "ละแม",
        "name_en": "Lamae",
        "zip_code": "86170"
      },
      {
        "id": 8607,
        "name_th": "สวี",
        "name_en": "Sawi",
        "zip_code": "86130"
      },
      {
        "id": 8604,
        "name_th": "หลังสวน",
        "name_en": "Lang Suan",
        "zip_code": "86110"
      },
      {
        "id": 8601,
        "name_th": "เมืองชุมพร",
        "name_en": "Mueang Chumphon",
        "zip_code": "86000"
      }
    ]
  },
  {
    "id": 72,
    "name_th": "ตรัง",
    "name_en": "Trang",
    "districts": [
      {
        "id": 9202,
        "name_th": "กันตัง",
        "name_en": "Kantang",
        "zip_code": "92110"
      },
      {
        "id": 9208,
        "name_th": "นาโยง",
        "name_en": "Na Yong",
        "zip_code": "92170"
      },
      {
        "id": 9204,
        "name_th": "ปะเหลียน",
        "name_en": "Palian",
        "zip_code": "92120"
      },
      {
        "id": 9203,
        "name_th": "ย่านตาขาว",
        "name_en": "Yan Ta Khao",
        "zip_code": "92140"
      },
      {
        "id": 9209,
        "name_th": "รัษฎา",
        "name_en": "Ratsada",
        "zip_code": "92160"
      },
      {
        "id": 9207,
        "name_th": "วังวิเศษ",
        "name_en": "Wang Wiset",
        "zip_code": "92220"
      },
      {
        "id": 9205,
        "name_th": "สิเกา",
        "name_en": "Sikao",
        "zip_code": "92150"
      },
      {
        "id": 9210,
        "name_th": "หาดสำราญ",
        "name_en": "Hat Samran",
        "zip_code": "92120"
      },
      {
        "id": 9206,
        "name_th": "ห้วยยอด",
        "name_en": "Huai Yot",
        "zip_code": "92130"
      },
      {
        "id": 9201,
        "name_th": "เมืองตรัง",
        "name_en": "Mueang Trang",
        "zip_code": "92000"
      }
    ]
  },
  {
    "id": 14,
    "name_th": "ตราด",
    "name_en": "Trat",
    "districts": [
      {
        "id": 2302,
        "name_th": "คลองใหญ่",
        "name_en": "Khlong Yai",
        "zip_code": "23110"
      },
      {
        "id": 2304,
        "name_th": "บ่อไร่",
        "name_en": "Bo Rai",
        "zip_code": "23140"
      },
      {
        "id": 2306,
        "name_th": "เกาะกูด",
        "name_en": "Ko Kut",
        "zip_code": "23000"
      },
      {
        "id": 2307,
        "name_th": "เกาะช้าง",
        "name_en": "Ko Chang",
        "zip_code": "23170"
      },
      {
        "id": 2303,
        "name_th": "เขาสมิง",
        "name_en": "Khao Saming",
        "zip_code": "23130"
      },
      {
        "id": 2301,
        "name_th": "เมืองตราด",
        "name_en": "Mueang Trat",
        "zip_code": "23000"
      },
      {
        "id": 2305,
        "name_th": "แหลมงอบ",
        "name_en": "Laem Ngop",
        "zip_code": "23120"
      }
    ]
  },
  {
    "id": 50,
    "name_th": "ตาก",
    "name_en": "Tak",
    "districts": [
      {
        "id": 6305,
        "name_th": "ท่าสองยาง",
        "name_en": "Tha Song Yang",
        "zip_code": "63150"
      },
      {
        "id": 6302,
        "name_th": "บ้านตาก",
        "name_en": "Ban Tak",
        "zip_code": "63120"
      },
      {
        "id": 6307,
        "name_th": "พบพระ",
        "name_en": "Phop Phra",
        "zip_code": "63160"
      },
      {
        "id": 6309,
        "name_th": "วังเจ้า",
        "name_en": "Wang Chao",
        "zip_code": "63000"
      },
      {
        "id": 6303,
        "name_th": "สามเงา",
        "name_en": "Sam Ngao",
        "zip_code": "63130"
      },
      {
        "id": 6308,
        "name_th": "อุ้มผาง",
        "name_en": "Umphang",
        "zip_code": "63170"
      },
      {
        "id": 6301,
        "name_th": "เมืองตาก",
        "name_en": "Mueang Tak",
        "zip_code": "63000"
      },
      {
        "id": 6304,
        "name_th": "แม่ระมาด",
        "name_en": "Mae Ramat",
        "zip_code": "63140"
      },
      {
        "id": 6306,
        "name_th": "แม่สอด",
        "name_en": "Mae Sot",
        "zip_code": "63110"
      }
    ]
  },
  {
    "id": 17,
    "name_th": "นครนายก",
    "name_en": "Nakhon Nayok",
    "districts": [
      {
        "id": 2603,
        "name_th": "บ้านนา",
        "name_en": "Ban Na",
        "zip_code": "26110"
      },
      {
        "id": 2602,
        "name_th": "ปากพลี",
        "name_en": "Pak Phli",
        "zip_code": "26130"
      },
      {
        "id": 2604,
        "name_th": "องครักษ์",
        "name_en": "Ongkharak",
        "zip_code": "26120"
      },
      {
        "id": 2601,
        "name_th": "เมืองนครนายก",
        "name_en": "Mueang Nakhon Nayok",
        "zip_code": "26000"
      }
    ]
  },
  {
    "id": 58,
    "name_th": "นครปฐม",
    "name_en": "Nakhon Pathom",
    "districts": [
      {
        "id": 7302,
        "name_th": "กำแพงแสน",
        "name_en": "Kamphaeng Saen",
        "zip_code": "73140"
      },
      {
        "id": 7304,
        "name_th": "ดอนตูม",
        "name_en": "Don Tum",
        "zip_code": "73150"
      },
      {
        "id": 7303,
        "name_th": "นครชัยศรี",
        "name_en": "Nakhon Chai Si",
        "zip_code": "73120"
      },
      {
        "id": 7305,
        "name_th": "บางเลน",
        "name_en": "Bang Len",
        "zip_code": "73130"
      },
      {
        "id": 7307,
        "name_th": "พุทธมณฑล",
        "name_en": "Phutthamonthon",
        "zip_code": "73170"
      },
      {
        "id": 7306,
        "name_th": "สามพราน",
        "name_en": "Sam Phran",
        "zip_code": "73110"
      },
      {
        "id": 7301,
        "name_th": "เมืองนครปฐม",
        "name_en": "Mueang Nakhon Pathom",
        "zip_code": "73000"
      }
    ]
  },
  {
    "id": 36,
    "name_th": "นครพนม",
    "name_en": "Nakhon Phanom",
    "districts": [
      {
        "id": 4803,
        "name_th": "ท่าอุเทน",
        "name_en": "Tha Uthen",
        "zip_code": "48120"
      },
      {
        "id": 4805,
        "name_th": "ธาตุพนม",
        "name_en": "That Phanom",
        "zip_code": "48110"
      },
      {
        "id": 4811,
        "name_th": "นาทม",
        "name_en": "Na Thom",
        "zip_code": "48140"
      },
      {
        "id": 4809,
        "name_th": "นาหว้า",
        "name_en": "Na Wa",
        "zip_code": "48180"
      },
      {
        "id": 4807,
        "name_th": "นาแก",
        "name_en": "Na Kae",
        "zip_code": "48130"
      },
      {
        "id": 4804,
        "name_th": "บ้านแพง",
        "name_en": "Ban Phaeng",
        "zip_code": "48140"
      },
      {
        "id": 4802,
        "name_th": "ปลาปาก",
        "name_en": "Pla Pak",
        "zip_code": "48160"
      },
      {
        "id": 4812,
        "name_th": "วังยาง",
        "name_en": "Wang Yang",
        "zip_code": "48130"
      },
      {
        "id": 4808,
        "name_th": "ศรีสงคราม",
        "name_en": "Si Songkhram",
        "zip_code": "48150"
      },
      {
        "id": 4801,
        "name_th": "เมืองนครพนม",
        "name_en": "Mueang Nakhon Phanom",
        "zip_code": "48000"
      },
      {
        "id": 4806,
        "name_th": "เรณูนคร",
        "name_en": "Renu Nakhon",
        "zip_code": "48170"
      },
      {
        "id": 4810,
        "name_th": "โพนสวรรค์",
        "name_en": "Phon Sawan",
        "zip_code": "48190"
      }
    ]
  },
  {
    "id": 19,
    "name_th": "นครราชสีมา",
    "name_en": "Nakhon Ratchasima",
    "districts": [
      {
        "id": 3019,
        "name_th": "ขามทะเลสอ",
        "name_en": "Kham Thale So",
        "zip_code": "30280"
      },
      {
        "id": 3011,
        "name_th": "ขามสะแกแสง",
        "name_en": "Kham Sakaesaeng",
        "zip_code": "30290"
      },
      {
        "id": 3004,
        "name_th": "คง",
        "name_en": "Khong",
        "zip_code": "30260"
      },
      {
        "id": 3002,
        "name_th": "ครบุรี",
        "name_en": "Khon Buri",
        "zip_code": "30250"
      },
      {
        "id": 3006,
        "name_th": "จักราช",
        "name_en": "Chakkarat",
        "zip_code": "30230"
      },
      {
        "id": 3017,
        "name_th": "ชุมพวง",
        "name_en": "Chum Phuang",
        "zip_code": "30270"
      },
      {
        "id": 3008,
        "name_th": "ด่านขุนทด",
        "name_en": "Dan Khun Thot",
        "zip_code": "30210"
      },
      {
        "id": 3030,
        "name_th": "บัวลาย",
        "name_en": "Bua Lai",
        "zip_code": "30120"
      },
      {
        "id": 3012,
        "name_th": "บัวใหญ่",
        "name_en": "Bua Yai",
        "zip_code": "30120"
      },
      {
        "id": 3005,
        "name_th": "บ้านเหลื่อม",
        "name_en": "Ban Lueam",
        "zip_code": "30350"
      },
      {
        "id": 3013,
        "name_th": "ประทาย",
        "name_en": "Prathai",
        "zip_code": "30180"
      },
      {
        "id": 3014,
        "name_th": "ปักธงชัย",
        "name_en": "Pak Thong Chai",
        "zip_code": "30150"
      },
      {
        "id": 3021,
        "name_th": "ปากช่อง",
        "name_en": "Pak Chong",
        "zip_code": "30130"
      },
      {
        "id": 3028,
        "name_th": "พระทองคำ",
        "name_en": "Phra Thong Kham",
        "zip_code": "30220"
      },
      {
        "id": 3015,
        "name_th": "พิมาย",
        "name_en": "Phimai",
        "zip_code": "30110"
      },
      {
        "id": 3029,
        "name_th": "ลำทะเมนชัย",
        "name_en": "Lam Thamenchai",
        "zip_code": "30270"
      },
      {
        "id": 3025,
        "name_th": "วังน้ำเขียว",
        "name_en": "Wang Nam Khiao",
        "zip_code": "30370"
      },
      {
        "id": 3020,
        "name_th": "สีคิ้ว",
        "name_en": "Sikhio",
        "zip_code": "30140"
      },
      {
        "id": 3031,
        "name_th": "สีดา",
        "name_en": "Sida",
        "zip_code": "30430"
      },
      {
        "id": 3018,
        "name_th": "สูงเนิน",
        "name_en": "Sung Noen",
        "zip_code": "30170"
      },
      {
        "id": 3022,
        "name_th": "หนองบุญมาก",
        "name_en": "Nong Bun Mak",
        "zip_code": "30410"
      },
      {
        "id": 3016,
        "name_th": "ห้วยแถลง",
        "name_en": "Huai Thalaeng",
        "zip_code": "30240"
      },
      {
        "id": 3032,
        "name_th": "เฉลิมพระเกียรติ",
        "name_en": "Chaloem Phra Kiat",
        "zip_code": "30230"
      },
      {
        "id": 3026,
        "name_th": "เทพารักษ์",
        "name_en": "Thepharak",
        "zip_code": "30210"
      },
      {
        "id": 3001,
        "name_th": "เมืองนครราชสีมา",
        "name_en": "Mueang Nakhon Ratchasima",
        "zip_code": "30000"
      },
      {
        "id": 3027,
        "name_th": "เมืองยาง",
        "name_en": "Mueang Yang",
        "zip_code": "30270"
      },
      {
        "id": 3003,
        "name_th": "เสิงสาง",
        "name_en": "Soeng Sang",
        "zip_code": "30330"
      },
      {
        "id": 3023,
        "name_th": "แก้งสนามนาง",
        "name_en": "Kaeng Sanam Nang",
        "zip_code": "30440"
      },
      {
        "id": 3007,
        "name_th": "โชคชัย",
        "name_en": "Chok Chai",
        "zip_code": "30190"
      },
      {
        "id": 3010,
        "name_th": "โนนสูง",
        "name_en": "Non Sung",
        "zip_code": "30160"
      },
      {
        "id": 3024,
        "name_th": "โนนแดง",
        "name_en": "Non Daeng",
        "zip_code": "30360"
      },
      {
        "id": 3009,
        "name_th": "โนนไทย",
        "name_en": "Non Thai",
        "zip_code": "30220"
      }
    ]
  },
  {
    "id": 63,
    "name_th": "นครศรีธรรมราช",
    "name_en": "Nakhon Si Thammarat",
    "districts": [
      {
        "id": 8015,
        "name_th": "ขนอม",
        "name_en": "Khanom",
        "zip_code": "80210"
      },
      {
        "id": 8019,
        "name_th": "จุฬาภรณ์",
        "name_en": "Chulabhorn",
        "zip_code": "80180"
      },
      {
        "id": 8004,
        "name_th": "ฉวาง",
        "name_en": "Chawang",
        "zip_code": "80150"
      },
      {
        "id": 8007,
        "name_th": "ชะอวด",
        "name_en": "Cha-uat",
        "zip_code": "80180"
      },
      {
        "id": 8022,
        "name_th": "ช้างกลาง",
        "name_en": "Chang Klang",
        "zip_code": "80250"
      },
      {
        "id": 8018,
        "name_th": "ถ้ำพรรณรา",
        "name_en": "Tham Phannara",
        "zip_code": "80260"
      },
      {
        "id": 8009,
        "name_th": "ทุ่งสง",
        "name_en": "Thung Song",
        "zip_code": "80110"
      },
      {
        "id": 8011,
        "name_th": "ทุ่งใหญ่",
        "name_en": "Thung Yai",
        "zip_code": "80240"
      },
      {
        "id": 8008,
        "name_th": "ท่าศาลา",
        "name_en": "Tha Sala",
        "zip_code": "80160"
      },
      {
        "id": 8021,
        "name_th": "นบพิตำ",
        "name_en": "Nopphitam",
        "zip_code": "80160"
      },
      {
        "id": 8010,
        "name_th": "นาบอน",
        "name_en": "Na Bon",
        "zip_code": "80220"
      },
      {
        "id": 8017,
        "name_th": "บางขัน",
        "name_en": "Bang Khan",
        "zip_code": "80360"
      },
      {
        "id": 8012,
        "name_th": "ปากพนัง",
        "name_en": "Pak Phanang",
        "zip_code": "80140"
      },
      {
        "id": 8002,
        "name_th": "พรหมคีรี",
        "name_en": "Phrom Khiri",
        "zip_code": "80320"
      },
      {
        "id": 8020,
        "name_th": "พระพรหม",
        "name_en": "Phra Phrom",
        "zip_code": "80000"
      },
      {
        "id": 8005,
        "name_th": "พิปูน",
        "name_en": "Phipun",
        "zip_code": "80270"
      },
      {
        "id": 8013,
        "name_th": "ร่อนพิบูลย์",
        "name_en": "Ron Phibun",
        "zip_code": "80130"
      },
      {
        "id": 8003,
        "name_th": "ลานสกา",
        "name_en": "Lan Saka",
        "zip_code": "80230"
      },
      {
        "id": 8014,
        "name_th": "สิชล",
        "name_en": "Sichon",
        "zip_code": "80120"
      },
      {
        "id": 8016,
        "name_th": "หัวไทร",
        "name_en": "Hua Sai",
        "zip_code": "80170"
      },
      {
        "id": 8023,
        "name_th": "เฉลิมพระเกียรติ",
        "name_en": "Chaloem Phra Kiat",
        "zip_code": "80190"
      },
      {
        "id": 8006,
        "name_th": "เชียรใหญ่",
        "name_en": "Chian Yai",
        "zip_code": "80190"
      },
      {
        "id": 8001,
        "name_th": "เมืองนครศรีธรรมราช",
        "name_en": "Mueang Nakhon Si Thammarat",
        "zip_code": "80000"
      }
    ]
  },
  {
    "id": 47,
    "name_th": "นครสวรรค์",
    "name_en": "Nakhon Sawan",
    "districts": [
      {
        "id": 6015,
        "name_th": "ชุมตาบง",
        "name_en": "Chum Ta Bong",
        "zip_code": "60150"
      },
      {
        "id": 6003,
        "name_th": "ชุมแสง",
        "name_en": "Chum Saeng",
        "zip_code": "60120"
      },
      {
        "id": 6012,
        "name_th": "ตากฟ้า",
        "name_en": "Tak Fa",
        "zip_code": "60190"
      },
      {
        "id": 6007,
        "name_th": "ตาคลี",
        "name_en": "Takhli",
        "zip_code": "60140"
      },
      {
        "id": 6008,
        "name_th": "ท่าตะโก",
        "name_en": "Takhli",
        "zip_code": "60160"
      },
      {
        "id": 6005,
        "name_th": "บรรพตพิสัย",
        "name_en": "Banphot Phisai",
        "zip_code": "60180"
      },
      {
        "id": 6010,
        "name_th": "พยุหะคีรี",
        "name_en": "Phayuha Khiri",
        "zip_code": "60130"
      },
      {
        "id": 6011,
        "name_th": "ลาดยาว",
        "name_en": "Phayuha Khiri",
        "zip_code": "60150"
      },
      {
        "id": 6004,
        "name_th": "หนองบัว",
        "name_en": "Nong Bua",
        "zip_code": "60110"
      },
      {
        "id": 6006,
        "name_th": "เก้าเลี้ยว",
        "name_en": "Kao Liao",
        "zip_code": "60230"
      },
      {
        "id": 6001,
        "name_th": "เมืองนครสวรรค์",
        "name_en": "Mueang Nakhon Sawan",
        "zip_code": "60000"
      },
      {
        "id": 6013,
        "name_th": "แม่วงก์",
        "name_en": "Mae Wong",
        "zip_code": "60150"
      },
      {
        "id": 6014,
        "name_th": "แม่เปิน",
        "name_en": "Mae Poen",
        "zip_code": "60150"
      },
      {
        "id": 6002,
        "name_th": "โกรกพระ",
        "name_en": "Krok Phra",
        "zip_code": "60170"
      },
      {
        "id": 6009,
        "name_th": "ไพศาลี",
        "name_en": "Phaisali",
        "zip_code": "60220"
      }
    ]
  },
  {
    "id": 3,
    "name_th": "นนทบุรี",
    "name_en": "Nonthaburi",
    "districts": [
      {
        "id": 1202,
        "name_th": "บางกรวย",
        "name_en": "Bang Kruai",
        "zip_code": "11130"
      },
      {
        "id": 1204,
        "name_th": "บางบัวทอง",
        "name_en": "Bang Bua Thong",
        "zip_code": "11110"
      },
      {
        "id": 1203,
        "name_th": "บางใหญ่",
        "name_en": "Bang Yai",
        "zip_code": "11140"
      },
      {
        "id": 1206,
        "name_th": "ปากเกร็ด",
        "name_en": "Pak Kret",
        "zip_code": "11120"
      },
      {
        "id": 1201,
        "name_th": "เมืองนนทบุรี",
        "name_en": "Mueang Nonthaburi",
        "zip_code": "11000"
      },
      {
        "id": 1205,
        "name_th": "ไทรน้อย",
        "name_en": "Sai Noi",
        "zip_code": "11150"
      }
    ]
  },
  {
    "id": 76,
    "name_th": "นราธิวาส",
    "name_en": "Narathiwat",
    "districts": [
      {
        "id": 9612,
        "name_th": "จะแนะ",
        "name_en": "Chanae",
        "zip_code": "96220"
      },
      {
        "id": 9602,
        "name_th": "ตากใบ",
        "name_en": "Tak Bai",
        "zip_code": "96110"
      },
      {
        "id": 9603,
        "name_th": "บาเจาะ",
        "name_en": "Bacho",
        "zip_code": "96170"
      },
      {
        "id": 9604,
        "name_th": "ยี่งอ",
        "name_en": "Yi-ngo",
        "zip_code": "96180"
      },
      {
        "id": 9605,
        "name_th": "ระแงะ",
        "name_en": "Ra-ngae",
        "zip_code": "96130"
      },
      {
        "id": 9606,
        "name_th": "รือเสาะ",
        "name_en": "Rueso",
        "zip_code": "96150"
      },
      {
        "id": 9607,
        "name_th": "ศรีสาคร",
        "name_en": "Si Sakhon",
        "zip_code": "96210"
      },
      {
        "id": 9609,
        "name_th": "สุคิริน",
        "name_en": "Sukhirin",
        "zip_code": "96190"
      },
      {
        "id": 9611,
        "name_th": "สุไหงปาดี",
        "name_en": "Su-ngai Padi",
        "zip_code": "96140"
      },
      {
        "id": 9610,
        "name_th": "สุไหงโก-ลก",
        "name_en": "Su-ngai Kolok",
        "zip_code": "96120"
      },
      {
        "id": 9613,
        "name_th": "เจาะไอร้อง",
        "name_en": "Cho-airong",
        "zip_code": "96130"
      },
      {
        "id": 9601,
        "name_th": "เมืองนราธิวาส",
        "name_en": "Mueang Narathiwat",
        "zip_code": "96000"
      },
      {
        "id": 9608,
        "name_th": "แว้ง",
        "name_en": "Waeng",
        "zip_code": "96160"
      }
    ]
  },
  {
    "id": 43,
    "name_th": "น่าน",
    "name_en": "Nan",
    "districts": [
      {
        "id": 5508,
        "name_th": "ทุ่งช้าง",
        "name_en": "Thung Chang",
        "zip_code": "55130"
      },
      {
        "id": 5506,
        "name_th": "ท่าวังผา",
        "name_en": "Tha Wang Pha",
        "zip_code": "55140"
      },
      {
        "id": 5504,
        "name_th": "นาน้อย",
        "name_en": "Na Noi",
        "zip_code": "55150"
      },
      {
        "id": 5510,
        "name_th": "นาหมื่น",
        "name_en": "Na Muen",
        "zip_code": "55180"
      },
      {
        "id": 5512,
        "name_th": "บ่อเกลือ",
        "name_en": "Bo Kluea",
        "zip_code": "55220"
      },
      {
        "id": 5503,
        "name_th": "บ้านหลวง",
        "name_en": "Ban Luang",
        "zip_code": "55190"
      },
      {
        "id": 5505,
        "name_th": "ปัว",
        "name_en": "Pua",
        "zip_code": "55120"
      },
      {
        "id": 5514,
        "name_th": "ภูเพียง",
        "name_en": "Phu Phiang",
        "zip_code": "55000"
      },
      {
        "id": 5513,
        "name_th": "สองแคว",
        "name_en": "Song Khwae",
        "zip_code": "55160"
      },
      {
        "id": 5511,
        "name_th": "สันติสุข",
        "name_en": "Santi Suk",
        "zip_code": "55210"
      },
      {
        "id": 5515,
        "name_th": "เฉลิมพระเกียรติ",
        "name_en": "Chaloem Phra Kiat",
        "zip_code": "55130"
      },
      {
        "id": 5509,
        "name_th": "เชียงกลาง",
        "name_en": "Chiang Klang",
        "zip_code": "55160"
      },
      {
        "id": 5501,
        "name_th": "เมืองน่าน",
        "name_en": "Mueang Nan",
        "zip_code": "55000"
      },
      {
        "id": 5507,
        "name_th": "เวียงสา",
        "name_en": "Wiang Sa",
        "zip_code": "55110"
      },
      {
        "id": 5502,
        "name_th": "แม่จริม",
        "name_en": "Mae Charim",
        "zip_code": "55170"
      }
    ]
  },
  {
    "id": 77,
    "name_th": "บึงกาฬ",
    "name_en": "Bueng Kan",
    "districts": [
      {
        "id": 3806,
        "name_th": "บึงโขงหลง",
        "name_en": "Bueng Khong Long",
        "zip_code": "38220"
      },
      {
        "id": 3808,
        "name_th": "บุ่งคล้า",
        "name_en": "Bung Khla",
        "zip_code": "38000"
      },
      {
        "id": 3807,
        "name_th": "ปากคาด",
        "name_en": "Pak Khat",
        "zip_code": "38190"
      },
      {
        "id": 3804,
        "name_th": "พรเจริญ",
        "name_en": "Phon Charoen",
        "zip_code": "38180"
      },
      {
        "id": 3805,
        "name_th": "ศรีวิไล",
        "name_en": "Si Wilai",
        "zip_code": "38210"
      },
      {
        "id": 3802,
        "name_th": "เซกา",
        "name_en": "Seka",
        "zip_code": "38150"
      },
      {
        "id": 3801,
        "name_th": "เมืองบึงกาฬ",
        "name_en": "Mueang Bueng Kan",
        "zip_code": "38000"
      },
      {
        "id": 3803,
        "name_th": "โซ่พิสัย",
        "name_en": "So Phisai",
        "zip_code": "38170"
      }
    ]
  },
  {
    "id": 20,
    "name_th": "บุรีรัมย์",
    "name_en": "Buri Ram",
    "districts": [
      {
        "id": 3103,
        "name_th": "กระสัง",
        "name_en": "Krasang",
        "zip_code": "31160"
      },
      {
        "id": 3102,
        "name_th": "คูเมือง",
        "name_en": "Khu Mueang",
        "zip_code": "31190"
      },
      {
        "id": 3118,
        "name_th": "ชำนิ",
        "name_en": "Chamni",
        "zip_code": "31110"
      },
      {
        "id": 3104,
        "name_th": "นางรอง",
        "name_en": "Nang Rong",
        "zip_code": "31110"
      },
      {
        "id": 3113,
        "name_th": "นาโพธิ์",
        "name_en": "Na Pho",
        "zip_code": "31230"
      },
      {
        "id": 3108,
        "name_th": "บ้านกรวด",
        "name_en": "Ban Kruat",
        "zip_code": "31180"
      },
      {
        "id": 3121,
        "name_th": "บ้านด่าน",
        "name_en": "Ban Dan",
        "zip_code": "31000"
      },
      {
        "id": 3119,
        "name_th": "บ้านใหม่ไชยพจน์",
        "name_en": "Ban Mai Chaiyaphot",
        "zip_code": "31120"
      },
      {
        "id": 3107,
        "name_th": "ประโคนชัย",
        "name_en": "Prakhon Chai",
        "zip_code": "31140"
      },
      {
        "id": 3112,
        "name_th": "ปะคำ",
        "name_en": "Pakham",
        "zip_code": "31220"
      },
      {
        "id": 3115,
        "name_th": "พลับพลาชัย",
        "name_en": "Phlapphla Chai",
        "zip_code": "31250"
      },
      {
        "id": 3109,
        "name_th": "พุทไธสง",
        "name_en": "Phutthaisong",
        "zip_code": "31120"
      },
      {
        "id": 3106,
        "name_th": "ละหานทราย",
        "name_en": "Lahan Sai",
        "zip_code": "31170"
      },
      {
        "id": 3110,
        "name_th": "ลำปลายมาศ",
        "name_en": "Lam Plai Mat",
        "zip_code": "31130"
      },
      {
        "id": 3111,
        "name_th": "สตึก",
        "name_en": "Satuek",
        "zip_code": "31150"
      },
      {
        "id": 3105,
        "name_th": "หนองกี่",
        "name_en": "Nong Ki",
        "zip_code": "31210"
      },
      {
        "id": 3114,
        "name_th": "หนองหงส์",
        "name_en": "Nong Hong",
        "zip_code": "31240"
      },
      {
        "id": 3116,
        "name_th": "ห้วยราช",
        "name_en": "Huai Rat",
        "zip_code": "31000"
      },
      {
        "id": 3123,
        "name_th": "เฉลิมพระเกียรติ",
        "name_en": "Chaloem Phra Kiat",
        "zip_code": "31110"
      },
      {
        "id": 3101,
        "name_th": "เมืองบุรีรัมย์",
        "name_en": "Mueang Buri Ram",
        "zip_code": "31000"
      },
      {
        "id": 3122,
        "name_th": "แคนดง",
        "name_en": "Khaen Dong",
        "zip_code": "31150"
      },
      {
        "id": 3120,
        "name_th": "โนนดินแดง",
        "name_en": "Non Din Daeng",
        "zip_code": "31260"
      },
      {
        "id": 3117,
        "name_th": "โนนสุวรรณ",
        "name_en": "Non Suwan",
        "zip_code": "31110"
      }
    ]
  },
  {
    "id": 4,
    "name_th": "ปทุมธานี",
    "name_en": "Pathum Thani",
    "districts": [
      {
        "id": 1302,
        "name_th": "คลองหลวง",
        "name_en": "Khlong Luang",
        "zip_code": "12120"
      },
      {
        "id": 1303,
        "name_th": "ธัญบุรี",
        "name_en": "Thanyaburi",
        "zip_code": "12130"
      },
      {
        "id": 1305,
        "name_th": "ลาดหลุมแก้ว",
        "name_en": "Lat Lum Kaeo",
        "zip_code": "12140"
      },
      {
        "id": 1306,
        "name_th": "ลำลูกกา",
        "name_en": "Lam Luk Ka",
        "zip_code": "12130"
      },
      {
        "id": 1307,
        "name_th": "สามโคก",
        "name_en": "Sam Khok",
        "zip_code": "12160"
      },
      {
        "id": 1304,
        "name_th": "หนองเสือ",
        "name_en": "Nong Suea",
        "zip_code": "12170"
      },
      {
        "id": 1301,
        "name_th": "เมืองปทุมธานี",
        "name_en": "Mueang Pathum Thani",
        "zip_code": "12000"
      }
    ]
  },
  {
    "id": 62,
    "name_th": "ประจวบคีรีขันธ์",
    "name_en": "Prachuap Khiri Khan",
    "districts": [
      {
        "id": 7702,
        "name_th": "กุยบุรี",
        "name_en": "Kui Buri",
        "zip_code": "77150"
      },
      {
        "id": 7703,
        "name_th": "ทับสะแก",
        "name_en": "Thap Sakae",
        "zip_code": "77130"
      },
      {
        "id": 7704,
        "name_th": "บางสะพาน",
        "name_en": "Bang Saphan",
        "zip_code": "77140"
      },
      {
        "id": 7705,
        "name_th": "บางสะพานน้อย",
        "name_en": "Bang Saphan Noi",
        "zip_code": "77170"
      },
      {
        "id": 7706,
        "name_th": "ปราณบุรี",
        "name_en": "Pran Buri",
        "zip_code": "77120"
      },
      {
        "id": 7708,
        "name_th": "สามร้อยยอด",
        "name_en": "Sam Roi Yot",
        "zip_code": "77120"
      },
      {
        "id": 7707,
        "name_th": "หัวหิน",
        "name_en": "Hua Hin",
        "zip_code": "77110"
      },
      {
        "id": 7701,
        "name_th": "เมืองประจวบคีรีขันธ์",
        "name_en": "Mueang Prachuap Khiri Khan",
        "zip_code": "77000"
      }
    ]
  },
  {
    "id": 16,
    "name_th": "ปราจีนบุรี",
    "name_en": "Prachin Buri",
    "districts": [
      {
        "id": 2502,
        "name_th": "กบินทร์บุรี",
        "name_en": "Kabin Buri",
        "zip_code": "25110"
      },
      {
        "id": 2503,
        "name_th": "นาดี",
        "name_en": "Na Di",
        "zip_code": "25220"
      },
      {
        "id": 2506,
        "name_th": "บ้านสร้าง",
        "name_en": "Ban Sang",
        "zip_code": "25150"
      },
      {
        "id": 2507,
        "name_th": "ประจันตคาม",
        "name_en": "Prachantakham",
        "zip_code": "25130"
      },
      {
        "id": 2508,
        "name_th": "ศรีมหาโพธิ",
        "name_en": "Si Maha Phot",
        "zip_code": "25140"
      },
      {
        "id": 2509,
        "name_th": "ศรีมโหสถ",
        "name_en": "Si Mahosot",
        "zip_code": "25190"
      },
      {
        "id": 2501,
        "name_th": "เมืองปราจีนบุรี",
        "name_en": "Mueang Prachin Buri",
        "zip_code": "25000"
      }
    ]
  },
  {
    "id": 74,
    "name_th": "ปัตตานี",
    "name_en": "Pattani",
    "districts": [
      {
        "id": 9411,
        "name_th": "กะพ้อ",
        "name_en": "Kapho",
        "zip_code": "94230"
      },
      {
        "id": 9406,
        "name_th": "ทุ่งยางแดง",
        "name_en": "Thung Yang Daeng",
        "zip_code": "94140"
      },
      {
        "id": 9404,
        "name_th": "ปะนาเระ",
        "name_en": "Panare",
        "zip_code": "94130"
      },
      {
        "id": 9405,
        "name_th": "มายอ",
        "name_en": "Mayo",
        "zip_code": "94140"
      },
      {
        "id": 9410,
        "name_th": "ยะรัง",
        "name_en": "Yarang",
        "zip_code": "94160"
      },
      {
        "id": 9409,
        "name_th": "ยะหริ่ง",
        "name_en": "Yaring",
        "zip_code": "94150"
      },
      {
        "id": 9407,
        "name_th": "สายบุรี",
        "name_en": "Sai Buri",
        "zip_code": "94110"
      },
      {
        "id": 9403,
        "name_th": "หนองจิก",
        "name_en": "Nong Chik",
        "zip_code": "94170"
      },
      {
        "id": 9401,
        "name_th": "เมืองปัตตานี",
        "name_en": "Mueang Pattani",
        "zip_code": "94000"
      },
      {
        "id": 9412,
        "name_th": "แม่ลาน",
        "name_en": "Mae Lan",
        "zip_code": "94180"
      },
      {
        "id": 9402,
        "name_th": "โคกโพธิ์",
        "name_en": "Khok Pho",
        "zip_code": "94120"
      },
      {
        "id": 9408,
        "name_th": "ไม้แก่น",
        "name_en": "Mai Kaen",
        "zip_code": "94220"
      }
    ]
  },
  {
    "id": 5,
    "name_th": "พระนครศรีอยุธยา",
    "name_en": "Phra Nakhon Si Ayutthaya",
    "districts": [
      {
        "id": 1402,
        "name_th": "ท่าเรือ",
        "name_en": "Tha Ruea",
        "zip_code": "13130"
      },
      {
        "id": 1403,
        "name_th": "นครหลวง",
        "name_en": "Nakhon Luang",
        "zip_code": "13260"
      },
      {
        "id": 1413,
        "name_th": "บางซ้าย",
        "name_en": "Bang Sai",
        "zip_code": "13270"
      },
      {
        "id": 1405,
        "name_th": "บางบาล",
        "name_en": "Bang Ban",
        "zip_code": "13250"
      },
      {
        "id": 1407,
        "name_th": "บางปะหัน",
        "name_en": "Bang Pahan",
        "zip_code": "13220"
      },
      {
        "id": 1406,
        "name_th": "บางปะอิน",
        "name_en": "Bang Pa-in",
        "zip_code": "13160"
      },
      {
        "id": 1404,
        "name_th": "บางไทร",
        "name_en": "Bang Sai",
        "zip_code": "13190"
      },
      {
        "id": 1416,
        "name_th": "บ้านแพรก",
        "name_en": "Ban Phraek",
        "zip_code": "13240"
      },
      {
        "id": 1408,
        "name_th": "ผักไห่",
        "name_en": "Phak Hai",
        "zip_code": "13120"
      },
      {
        "id": 1401,
        "name_th": "พระนครศรีอยุธยา",
        "name_en": "Phra Nakhon Si Ayutthaya",
        "zip_code": "13000"
      },
      {
        "id": 1409,
        "name_th": "ภาชี",
        "name_en": "Phachi",
        "zip_code": "13140"
      },
      {
        "id": 1415,
        "name_th": "มหาราช",
        "name_en": "Maha Rat",
        "zip_code": "13150"
      },
      {
        "id": 1410,
        "name_th": "ลาดบัวหลวง",
        "name_en": "Lat Bua Luang",
        "zip_code": "13230"
      },
      {
        "id": 1411,
        "name_th": "วังน้อย",
        "name_en": "Wang Noi",
        "zip_code": "13170"
      },
      {
        "id": 1414,
        "name_th": "อุทัย",
        "name_en": "Uthai",
        "zip_code": "13210"
      },
      {
        "id": 1412,
        "name_th": "เสนา",
        "name_en": "Sena",
        "zip_code": "13110"
      }
    ]
  },
  {
    "id": 44,
    "name_th": "พะเยา",
    "name_en": "Phayao",
    "districts": [
      {
        "id": 5602,
        "name_th": "จุน",
        "name_en": "Chun",
        "zip_code": "56150"
      },
      {
        "id": 5605,
        "name_th": "ดอกคำใต้",
        "name_en": "Dok Khamtai",
        "zip_code": "56120"
      },
      {
        "id": 5606,
        "name_th": "ปง",
        "name_en": "Pong",
        "zip_code": "56140"
      },
      {
        "id": 5609,
        "name_th": "ภูกามยาว",
        "name_en": "Phu Kamyao",
        "zip_code": "56000"
      },
      {
        "id": 5608,
        "name_th": "ภูซาง",
        "name_en": "Phu Sang",
        "zip_code": "56110"
      },
      {
        "id": 5603,
        "name_th": "เชียงคำ",
        "name_en": "Chiang Kham",
        "zip_code": "56110"
      },
      {
        "id": 5604,
        "name_th": "เชียงม่วน",
        "name_en": "Chiang Muan",
        "zip_code": "56160"
      },
      {
        "id": 5601,
        "name_th": "เมืองพะเยา",
        "name_en": "Mueang Phayao",
        "zip_code": "56000"
      },
      {
        "id": 5607,
        "name_th": "แม่ใจ",
        "name_en": "Mae Chai",
        "zip_code": "56130"
      }
    ]
  },
  {
    "id": 65,
    "name_th": "พังงา",
    "name_en": "Phangnga",
    "districts": [
      {
        "id": 8203,
        "name_th": "กะปง",
        "name_en": "Kapong",
        "zip_code": "82170"
      },
      {
        "id": 8206,
        "name_th": "คุระบุรี",
        "name_en": "Khura Buri",
        "zip_code": "82150"
      },
      {
        "id": 8204,
        "name_th": "ตะกั่วทุ่ง",
        "name_en": "Takua Thung",
        "zip_code": "82130"
      },
      {
        "id": 8205,
        "name_th": "ตะกั่วป่า",
        "name_en": "Takua Pa",
        "zip_code": "82110"
      },
      {
        "id": 8207,
        "name_th": "ทับปุด",
        "name_en": "Thap Put",
        "zip_code": "82180"
      },
      {
        "id": 8208,
        "name_th": "ท้ายเหมือง",
        "name_en": "Thai Mueang",
        "zip_code": "82120"
      },
      {
        "id": 8202,
        "name_th": "เกาะยาว",
        "name_en": "Ko Yao",
        "zip_code": "82160"
      },
      {
        "id": 8201,
        "name_th": "เมืองพังงา",
        "name_en": "Mueang Phang-nga",
        "zip_code": "82000"
      }
    ]
  },
  {
    "id": 73,
    "name_th": "พัทลุง",
    "name_en": "Phatthalung",
    "districts": [
      {
        "id": 9302,
        "name_th": "กงหรา",
        "name_en": "Kong Ra",
        "zip_code": "93180"
      },
      {
        "id": 9305,
        "name_th": "ควนขนุน",
        "name_en": "Khuan Khanun",
        "zip_code": "93110"
      },
      {
        "id": 9304,
        "name_th": "ตะโหมด",
        "name_en": "Tamot",
        "zip_code": "93160"
      },
      {
        "id": 9309,
        "name_th": "บางแก้ว",
        "name_en": "Bang Kaeo",
        "zip_code": "93140"
      },
      {
        "id": 9306,
        "name_th": "ปากพะยูน",
        "name_en": "Pak Phayun",
        "zip_code": "93120"
      },
      {
        "id": 9308,
        "name_th": "ป่าบอน",
        "name_en": "Pa Bon",
        "zip_code": "93170"
      },
      {
        "id": 9310,
        "name_th": "ป่าพะยอม",
        "name_en": "Pa Phayom",
        "zip_code": "93110"
      },
      {
        "id": 9311,
        "name_th": "ศรีนครินทร์",
        "name_en": "Srinagarindra",
        "zip_code": "93000"
      },
      {
        "id": 9307,
        "name_th": "ศรีบรรพต",
        "name_en": "Si Banphot",
        "zip_code": "93190"
      },
      {
        "id": 9303,
        "name_th": "เขาชัยสน",
        "name_en": "Khao Chaison",
        "zip_code": "93130"
      },
      {
        "id": 9301,
        "name_th": "เมืองพัทลุง",
        "name_en": "Mueang Phatthalung",
        "zip_code": "93000"
      }
    ]
  },
  {
    "id": 53,
    "name_th": "พิจิตร",
    "name_en": "Phichit",
    "districts": [
      {
        "id": 6611,
        "name_th": "ดงเจริญ",
        "name_en": "Dong Charoen",
        "zip_code": "66210"
      },
      {
        "id": 6604,
        "name_th": "ตะพานหิน",
        "name_en": "Taphan Hin",
        "zip_code": "66110"
      },
      {
        "id": 6608,
        "name_th": "ทับคล้อ",
        "name_en": "Tap Khlo",
        "zip_code": "66150"
      },
      {
        "id": 6605,
        "name_th": "บางมูลนาก",
        "name_en": "Bang Mun Nak",
        "zip_code": "66120"
      },
      {
        "id": 6610,
        "name_th": "บึงนาราง",
        "name_en": "Bueng Na Rang",
        "zip_code": "66130"
      },
      {
        "id": 6612,
        "name_th": "วชิรบารมี",
        "name_en": "Wachirabarami",
        "zip_code": "66140"
      },
      {
        "id": 6602,
        "name_th": "วังทรายพูน",
        "name_en": "Wang Sai Phun",
        "zip_code": "66180"
      },
      {
        "id": 6609,
        "name_th": "สากเหล็ก",
        "name_en": "Sak Lek",
        "zip_code": "66160"
      },
      {
        "id": 6607,
        "name_th": "สามง่าม",
        "name_en": "Sam Ngam",
        "zip_code": "66140"
      },
      {
        "id": 6601,
        "name_th": "เมืองพิจิตร",
        "name_en": "Mueang Phichit",
        "zip_code": "66000"
      },
      {
        "id": 6606,
        "name_th": "โพทะเล",
        "name_en": "Pho Thale",
        "zip_code": "66130"
      },
      {
        "id": 6603,
        "name_th": "โพธิ์ประทับช้าง",
        "name_en": "Pho Prathap Chang",
        "zip_code": "66190"
      }
    ]
  },
  {
    "id": 52,
    "name_th": "พิษณุโลก",
    "name_en": "Phitsanulok",
    "districts": [
      {
        "id": 6503,
        "name_th": "ชาติตระการ",
        "name_en": "Chat Trakan",
        "zip_code": "65170"
      },
      {
        "id": 6502,
        "name_th": "นครไทย",
        "name_en": "Nakhon Thai",
        "zip_code": "65120"
      },
      {
        "id": 6505,
        "name_th": "บางกระทุ่ม",
        "name_en": "Bang Krathum",
        "zip_code": "65110"
      },
      {
        "id": 6504,
        "name_th": "บางระกำ",
        "name_en": "Bang Rakam",
        "zip_code": "65140"
      },
      {
        "id": 6506,
        "name_th": "พรหมพิราม",
        "name_en": "Phrom Phiram",
        "zip_code": "65150"
      },
      {
        "id": 6508,
        "name_th": "วังทอง",
        "name_en": "Wang Thong",
        "zip_code": "65130"
      },
      {
        "id": 6507,
        "name_th": "วัดโบสถ์",
        "name_en": "Wat Bot",
        "zip_code": "65160"
      },
      {
        "id": 6509,
        "name_th": "เนินมะปราง",
        "name_en": "Noen Maprang",
        "zip_code": "65190"
      },
      {
        "id": 6501,
        "name_th": "เมืองพิษณุโลก",
        "name_en": "Mueang Phitsanulok",
        "zip_code": "65000"
      }
    ]
  },
  {
    "id": 66,
    "name_th": "ภูเก็ต",
    "name_en": "Phuket",
    "districts": [
      {
        "id": 8302,
        "name_th": "กะทู้",
        "name_en": "Kathu",
        "zip_code": "83120"
      },
      {
        "id": 8303,
        "name_th": "ถลาง",
        "name_en": "Thalang",
        "zip_code": "83110"
      },
      {
        "id": 8301,
        "name_th": "เมืองภูเก็ต",
        "name_en": "Mueang Phuket",
        "zip_code": "83000"
      }
    ]
  },
  {
    "id": 32,
    "name_th": "มหาสารคาม",
    "name_en": "Maha Sarakham",
    "districts": [
      {
        "id": 4404,
        "name_th": "กันทรวิชัย",
        "name_en": "Kantharawichai",
        "zip_code": "44150"
      },
      {
        "id": 4412,
        "name_th": "กุดรัง",
        "name_en": "Kut Rang",
        "zip_code": "44130"
      },
      {
        "id": 4413,
        "name_th": "ชื่นชม",
        "name_en": "Chuen Chom",
        "zip_code": "44160"
      },
      {
        "id": 4410,
        "name_th": "นาดูน",
        "name_en": "Na Dun",
        "zip_code": "44180"
      },
      {
        "id": 4407,
        "name_th": "นาเชือก",
        "name_en": "Na Chueak",
        "zip_code": "44170"
      },
      {
        "id": 4406,
        "name_th": "บรบือ",
        "name_en": "Borabue",
        "zip_code": "44130"
      },
      {
        "id": 4408,
        "name_th": "พยัคฆภูมิพิสัย",
        "name_en": "Phayakkhaphum Phisai",
        "zip_code": "44110"
      },
      {
        "id": 4411,
        "name_th": "ยางสีสุราช",
        "name_en": "Yang Sisurat",
        "zip_code": "44210"
      },
      {
        "id": 4409,
        "name_th": "วาปีปทุม",
        "name_en": "Wapi Pathum",
        "zip_code": "44120"
      },
      {
        "id": 4405,
        "name_th": "เชียงยืน",
        "name_en": "Chiang Yuen",
        "zip_code": "44160"
      },
      {
        "id": 4401,
        "name_th": "เมืองมหาสารคาม",
        "name_en": "Mueang Maha Sarakham",
        "zip_code": "44000"
      },
      {
        "id": 4402,
        "name_th": "แกดำ",
        "name_en": "Kae Dam",
        "zip_code": "44190"
      },
      {
        "id": 4403,
        "name_th": "โกสุมพิสัย",
        "name_en": "Kosum Phisai",
        "zip_code": "44140"
      }
    ]
  },
  {
    "id": 37,
    "name_th": "มุกดาหาร",
    "name_en": "Mukdahan",
    "districts": [
      {
        "id": 4905,
        "name_th": "คำชะอี",
        "name_en": "Khamcha-i",
        "zip_code": "49110"
      },
      {
        "id": 4904,
        "name_th": "ดงหลวง",
        "name_en": "Dong Luang",
        "zip_code": "49140"
      },
      {
        "id": 4903,
        "name_th": "ดอนตาล",
        "name_en": "Don Tan",
        "zip_code": "49120"
      },
      {
        "id": 4902,
        "name_th": "นิคมคำสร้อย",
        "name_en": "Nikhom Kham Soi",
        "zip_code": "49130"
      },
      {
        "id": 4907,
        "name_th": "หนองสูง",
        "name_en": "Nong Sung",
        "zip_code": "49160"
      },
      {
        "id": 4906,
        "name_th": "หว้านใหญ่",
        "name_en": "Wan Yai",
        "zip_code": "49150"
      },
      {
        "id": 4901,
        "name_th": "เมืองมุกดาหาร",
        "name_en": "Mueang Mukdahan",
        "zip_code": "49000"
      }
    ]
  },
  {
    "id": 75,
    "name_th": "ยะลา",
    "name_en": "Yala",
    "districts": [
      {
        "id": 9508,
        "name_th": "กรงปินัง",
        "name_en": "Krong Pinang",
        "zip_code": "95000"
      },
      {
        "id": 9507,
        "name_th": "กาบัง",
        "name_en": "Kabang",
        "zip_code": "95120"
      },
      {
        "id": 9504,
        "name_th": "ธารโต",
        "name_en": "Than To",
        "zip_code": "95150"
      },
      {
        "id": 9503,
        "name_th": "บันนังสตา",
        "name_en": "Bannang Sata",
        "zip_code": "95130"
      },
      {
        "id": 9505,
        "name_th": "ยะหา",
        "name_en": "Yaha",
        "zip_code": "95120"
      },
      {
        "id": 9506,
        "name_th": "รามัน",
        "name_en": "Raman",
        "zip_code": "95140"
      },
      {
        "id": 9502,
        "name_th": "เบตง",
        "name_en": "Betong",
        "zip_code": "95110"
      },
      {
        "id": 9501,
        "name_th": "เมืองยะลา",
        "name_en": "Mueang Yala",
        "zip_code": "95000"
      }
    ]
  },
  {
    "id": 24,
    "name_th": "ยโสธร",
    "name_en": "Yasothon",
    "districts": [
      {
        "id": 3503,
        "name_th": "กุดชุม",
        "name_en": "Kut Chum",
        "zip_code": "35140"
      },
      {
        "id": 3504,
        "name_th": "คำเขื่อนแก้ว",
        "name_en": "Kham Khuean Kaeo",
        "zip_code": "35110"
      },
      {
        "id": 3507,
        "name_th": "ค้อวัง",
        "name_en": "Kho Wang",
        "zip_code": "35160"
      },
      {
        "id": 3502,
        "name_th": "ทรายมูล",
        "name_en": "Sai Mun",
        "zip_code": "35170"
      },
      {
        "id": 3505,
        "name_th": "ป่าติ้ว",
        "name_en": "Pa Tio",
        "zip_code": "35150"
      },
      {
        "id": 3506,
        "name_th": "มหาชนะชัย",
        "name_en": "Maha Chana Chai",
        "zip_code": "35130"
      },
      {
        "id": 3501,
        "name_th": "เมืองยโสธร",
        "name_en": "Mueang Yasothon",
        "zip_code": "35000"
      },
      {
        "id": 3508,
        "name_th": "เลิงนกทา",
        "name_en": "Loeng Nok Tha",
        "zip_code": "35120"
      },
      {
        "id": 3509,
        "name_th": "ไทยเจริญ",
        "name_en": "Thai Charoen",
        "zip_code": "35120"
      }
    ]
  },
  {
    "id": 68,
    "name_th": "ระนอง",
    "name_en": "Ranong",
    "districts": [
      {
        "id": 8504,
        "name_th": "กระบุรี",
        "name_en": "Kra Buri",
        "zip_code": "85110"
      },
      {
        "id": 8503,
        "name_th": "กะเปอร์",
        "name_en": "Kapoe",
        "zip_code": "85120"
      },
      {
        "id": 8502,
        "name_th": "ละอุ่น",
        "name_en": "La-un",
        "zip_code": "85130"
      },
      {
        "id": 8505,
        "name_th": "สุขสำราญ",
        "name_en": "Suk Samran",
        "zip_code": "85120"
      },
      {
        "id": 8501,
        "name_th": "เมืองระนอง",
        "name_en": "Mueang Ranong",
        "zip_code": "85000"
      }
    ]
  },
  {
    "id": 12,
    "name_th": "ระยอง",
    "name_en": "Rayong",
    "districts": [
      {
        "id": 2108,
        "name_th": "นิคมพัฒนา",
        "name_en": "Nikhom Phatthana",
        "zip_code": "21180"
      },
      {
        "id": 2105,
        "name_th": "บ้านค่าย",
        "name_en": "Ban Khai",
        "zip_code": "21120"
      },
      {
        "id": 2102,
        "name_th": "บ้านฉาง",
        "name_en": "Ban Chang",
        "zip_code": "21130"
      },
      {
        "id": 2106,
        "name_th": "ปลวกแดง",
        "name_en": "Pluak Daeng",
        "zip_code": "21140"
      },
      {
        "id": 2104,
        "name_th": "วังจันทร์",
        "name_en": "Wang Chan",
        "zip_code": "21210"
      },
      {
        "id": 2107,
        "name_th": "เขาชะเมา",
        "name_en": "Khao Chamao",
        "zip_code": "21110"
      },
      {
        "id": 2101,
        "name_th": "เมืองระยอง",
        "name_en": "Mueang Rayong",
        "zip_code": "21000"
      },
      {
        "id": 2103,
        "name_th": "แกลง",
        "name_en": "Klaeng",
        "zip_code": "21110"
      }
    ]
  },
  {
    "id": 55,
    "name_th": "ราชบุรี",
    "name_en": "Ratchaburi",
    "districts": [
      {
        "id": 7002,
        "name_th": "จอมบึง",
        "name_en": "Chom Bueng",
        "zip_code": "70150"
      },
      {
        "id": 7004,
        "name_th": "ดำเนินสะดวก",
        "name_en": "Damnoen Saduak",
        "zip_code": "70130"
      },
      {
        "id": 7074,
        "name_th": "ท้องถิ่นเทศบาลตำบลบ้านฆ้อง",
        "name_en": "Tet Saban Ban Kong",
        "zip_code": ""
      },
      {
        "id": 7006,
        "name_th": "บางแพ",
        "name_en": "Bang Phae",
        "zip_code": "70160"
      },
      {
        "id": 7010,
        "name_th": "บ้านคา",
        "name_en": "Ban Kha",
        "zip_code": "70180"
      },
      {
        "id": 7005,
        "name_th": "บ้านโป่ง",
        "name_en": "Ban Pong",
        "zip_code": "70110"
      },
      {
        "id": 7008,
        "name_th": "ปากท่อ",
        "name_en": "Pak Tho",
        "zip_code": "70140"
      },
      {
        "id": 7009,
        "name_th": "วัดเพลง",
        "name_en": "Wat Phleng",
        "zip_code": "70170"
      },
      {
        "id": 7003,
        "name_th": "สวนผึ้ง",
        "name_en": "Suan Phueng",
        "zip_code": "70180"
      },
      {
        "id": 7001,
        "name_th": "เมืองราชบุรี",
        "name_en": "Mueang Ratchaburi",
        "zip_code": "70000"
      },
      {
        "id": 7007,
        "name_th": "โพธาราม",
        "name_en": "Photharam",
        "zip_code": "70120"
      }
    ]
  },
  {
    "id": 33,
    "name_th": "ร้อยเอ็ด",
    "name_en": "Roi Et",
    "districts": [
      {
        "id": 4504,
        "name_th": "จตุรพักตรพิมาน",
        "name_en": "Chaturaphak Phiman",
        "zip_code": "45180"
      },
      {
        "id": 4517,
        "name_th": "จังหาร",
        "name_en": "Changhan",
        "zip_code": "45000"
      },
      {
        "id": 4520,
        "name_th": "ทุ่งเขาหลวง",
        "name_en": "Thung Khao Luang",
        "zip_code": "45170"
      },
      {
        "id": 4505,
        "name_th": "ธวัชบุรี",
        "name_en": "Thawat Buri",
        "zip_code": "45170"
      },
      {
        "id": 4503,
        "name_th": "ปทุมรัตต์",
        "name_en": "Pathum Rat",
        "zip_code": "45190"
      },
      {
        "id": 4506,
        "name_th": "พนมไพร",
        "name_en": "Phanom Phrai",
        "zip_code": "45140"
      },
      {
        "id": 4516,
        "name_th": "ศรีสมเด็จ",
        "name_en": "Si Somdet",
        "zip_code": "45000"
      },
      {
        "id": 4511,
        "name_th": "สุวรรณภูมิ",
        "name_en": "Suwannaphum",
        "zip_code": "45130"
      },
      {
        "id": 4509,
        "name_th": "หนองพอก",
        "name_en": "Nong Phok",
        "zip_code": "45210"
      },
      {
        "id": 4519,
        "name_th": "หนองฮี",
        "name_en": "Nong Hi",
        "zip_code": "45140"
      },
      {
        "id": 4514,
        "name_th": "อาจสามารถ",
        "name_en": "At Samat",
        "zip_code": "45160"
      },
      {
        "id": 4502,
        "name_th": "เกษตรวิสัย",
        "name_en": "Kaset Wisai",
        "zip_code": "45150"
      },
      {
        "id": 4518,
        "name_th": "เชียงขวัญ",
        "name_en": "Chiang Khwan",
        "zip_code": "45000"
      },
      {
        "id": 4515,
        "name_th": "เมยวดี",
        "name_en": "Moei Wadi",
        "zip_code": "45250"
      },
      {
        "id": 4501,
        "name_th": "เมืองร้อยเอ็ด",
        "name_en": "Mueang Roi Et",
        "zip_code": "45000"
      },
      {
        "id": 4512,
        "name_th": "เมืองสรวง",
        "name_en": "Mueang Suang",
        "zip_code": "45220"
      },
      {
        "id": 4510,
        "name_th": "เสลภูมิ",
        "name_en": "Selaphum",
        "zip_code": "45120"
      },
      {
        "id": 4508,
        "name_th": "โพธิ์ชัย",
        "name_en": "Pho Chai",
        "zip_code": "45230"
      },
      {
        "id": 4513,
        "name_th": "โพนทราย",
        "name_en": "Phon Sai",
        "zip_code": "45240"
      },
      {
        "id": 4507,
        "name_th": "โพนทอง",
        "name_en": "Phon Thong",
        "zip_code": "45110"
      }
    ]
  },
  {
    "id": 7,
    "name_th": "ลพบุรี",
    "name_en": "Lopburi",
    "districts": [
      {
        "id": 1604,
        "name_th": "ชัยบาดาล",
        "name_en": "Chai Badan",
        "zip_code": "15130"
      },
      {
        "id": 1605,
        "name_th": "ท่าวุ้ง",
        "name_en": "Tha Wung",
        "zip_code": "15150"
      },
      {
        "id": 1607,
        "name_th": "ท่าหลวง",
        "name_en": "Tha Luang",
        "zip_code": "15230"
      },
      {
        "id": 1606,
        "name_th": "บ้านหมี่",
        "name_en": "Ban Mi",
        "zip_code": "15110"
      },
      {
        "id": 1602,
        "name_th": "พัฒนานิคม",
        "name_en": "Phatthana Nikhom",
        "zip_code": "15140"
      },
      {
        "id": 1610,
        "name_th": "ลำสนธิ",
        "name_en": "Lam Sonthi",
        "zip_code": "15190"
      },
      {
        "id": 1608,
        "name_th": "สระโบสถ์",
        "name_en": "Sa Bot",
        "zip_code": "15240"
      },
      {
        "id": 1611,
        "name_th": "หนองม่วง",
        "name_en": "Nong Muang",
        "zip_code": "15170"
      },
      {
        "id": 1601,
        "name_th": "เมืองลพบุรี",
        "name_en": "Mueang Lop Buri",
        "zip_code": "15000"
      },
      {
        "id": 1603,
        "name_th": "โคกสำโรง",
        "name_en": "Khok Samrong",
        "zip_code": "15120"
      },
      {
        "id": 1609,
        "name_th": "โคกเจริญ",
        "name_en": "Khok Charoen",
        "zip_code": "15250"
      }
    ]
  },
  {
    "id": 40,
    "name_th": "ลำปาง",
    "name_en": "Lampang",
    "districts": [
      {
        "id": 5205,
        "name_th": "งาว",
        "name_en": "Ngao",
        "zip_code": "52110"
      },
      {
        "id": 5207,
        "name_th": "วังเหนือ",
        "name_en": "Wang Nuea",
        "zip_code": "52140"
      },
      {
        "id": 5211,
        "name_th": "สบปราบ",
        "name_en": "Sop Prap",
        "zip_code": "52170"
      },
      {
        "id": 5212,
        "name_th": "ห้างฉัตร",
        "name_en": "Hang Chat",
        "zip_code": "52190"
      },
      {
        "id": 5203,
        "name_th": "เกาะคา",
        "name_en": "Ko Kha",
        "zip_code": "52130"
      },
      {
        "id": 5208,
        "name_th": "เถิน",
        "name_en": "Thoen",
        "zip_code": "52160"
      },
      {
        "id": 5213,
        "name_th": "เมืองปาน",
        "name_en": "Mueang Pan",
        "zip_code": "52240"
      },
      {
        "id": 5201,
        "name_th": "เมืองลำปาง",
        "name_en": "Mueang Lampang",
        "zip_code": "52000"
      },
      {
        "id": 5204,
        "name_th": "เสริมงาม",
        "name_en": "Soem Ngam",
        "zip_code": "52210"
      },
      {
        "id": 5206,
        "name_th": "แจ้ห่ม",
        "name_en": "Chae Hom",
        "zip_code": "52120"
      },
      {
        "id": 5210,
        "name_th": "แม่ทะ",
        "name_en": "Mae Tha",
        "zip_code": "52150"
      },
      {
        "id": 5209,
        "name_th": "แม่พริก",
        "name_en": "Mae Phrik",
        "zip_code": "52180"
      },
      {
        "id": 5202,
        "name_th": "แม่เมาะ",
        "name_en": "Mae Mo",
        "zip_code": "52220"
      }
    ]
  },
  {
    "id": 39,
    "name_th": "ลำพูน",
    "name_en": "Lamphun",
    "districts": [
      {
        "id": 5105,
        "name_th": "ทุ่งหัวช้าง",
        "name_en": "Thung Hua Chang",
        "zip_code": "51160"
      },
      {
        "id": 5107,
        "name_th": "บ้านธิ",
        "name_en": "Ban Thi",
        "zip_code": "51180"
      },
      {
        "id": 5103,
        "name_th": "บ้านโฮ่ง",
        "name_en": "Ban Hong",
        "zip_code": "51130"
      },
      {
        "id": 5106,
        "name_th": "ป่าซาง",
        "name_en": "Pa Sang",
        "zip_code": "51120"
      },
      {
        "id": 5104,
        "name_th": "ลี้",
        "name_en": "Li",
        "zip_code": "51110"
      },
      {
        "id": 5101,
        "name_th": "เมืองลำพูน",
        "name_en": "Mueang Lamphun",
        "zip_code": "51000"
      },
      {
        "id": 5108,
        "name_th": "เวียงหนองล่อง",
        "name_en": "Wiang Nong Long",
        "zip_code": "51120"
      },
      {
        "id": 5102,
        "name_th": "แม่ทา",
        "name_en": "Mae Tha",
        "zip_code": "51140"
      }
    ]
  },
  {
    "id": 22,
    "name_th": "ศรีสะเกษ",
    "name_en": "Si Sa Ket",
    "districts": [
      {
        "id": 3304,
        "name_th": "กันทรลักษ์",
        "name_en": "Kantharalak",
        "zip_code": "33110"
      },
      {
        "id": 3303,
        "name_th": "กันทรารมย์",
        "name_en": "Kanthararom",
        "zip_code": "33130"
      },
      {
        "id": 3305,
        "name_th": "ขุขันธ์",
        "name_en": "Khukhan",
        "zip_code": "33140"
      },
      {
        "id": 3308,
        "name_th": "ขุนหาญ",
        "name_en": "Khun Han",
        "zip_code": "33150"
      },
      {
        "id": 3315,
        "name_th": "น้ำเกลี้ยง",
        "name_en": "Nam Kliang",
        "zip_code": "33130"
      },
      {
        "id": 3311,
        "name_th": "บึงบูรพ์",
        "name_en": "Bueng Bun",
        "zip_code": "33220"
      },
      {
        "id": 3307,
        "name_th": "ปรางค์กู่",
        "name_en": "Prang Ku",
        "zip_code": "33170"
      },
      {
        "id": 3320,
        "name_th": "พยุห์",
        "name_en": "Phayu",
        "zip_code": "33230"
      },
      {
        "id": 3317,
        "name_th": "ภูสิงห์",
        "name_en": "Phu Sing",
        "zip_code": "33140"
      },
      {
        "id": 3302,
        "name_th": "ยางชุมน้อย",
        "name_en": "Yang Chum Noi",
        "zip_code": "33190"
      },
      {
        "id": 3309,
        "name_th": "ราษีไศล",
        "name_en": "Rasi Salai",
        "zip_code": "33160"
      },
      {
        "id": 3316,
        "name_th": "วังหิน",
        "name_en": "Wang Hin",
        "zip_code": "33270"
      },
      {
        "id": 3314,
        "name_th": "ศรีรัตนะ",
        "name_en": "Si Rattana",
        "zip_code": "33240"
      },
      {
        "id": 3322,
        "name_th": "ศิลาลาด",
        "name_en": "Sila Lat",
        "zip_code": "33160"
      },
      {
        "id": 3312,
        "name_th": "ห้วยทับทัน",
        "name_en": "Huai Thap Than",
        "zip_code": "33210"
      },
      {
        "id": 3310,
        "name_th": "อุทุมพรพิสัย",
        "name_en": "Uthumphon Phisai",
        "zip_code": "33120"
      },
      {
        "id": 3319,
        "name_th": "เบญจลักษ์",
        "name_en": "Benchalak",
        "zip_code": "33110"
      },
      {
        "id": 3318,
        "name_th": "เมืองจันทร์",
        "name_en": "Mueang Chan",
        "zip_code": "33120"
      },
      {
        "id": 3301,
        "name_th": "เมืองศรีสะเกษ",
        "name_en": "Mueang Si Sa Ket",
        "zip_code": "33000"
      },
      {
        "id": 3313,
        "name_th": "โนนคูณ",
        "name_en": "Non Khun",
        "zip_code": "33250"
      },
      {
        "id": 3321,
        "name_th": "โพธิ์ศรีสุวรรณ",
        "name_en": "Pho Si Suwan",
        "zip_code": "33120"
      },
      {
        "id": 3306,
        "name_th": "ไพรบึง",
        "name_en": "Phrai Bueng",
        "zip_code": "33180"
      }
    ]
  },
  {
    "id": 35,
    "name_th": "สกลนคร",
    "name_en": "Sakon Nakhon",
    "districts": [
      {
        "id": 4703,
        "name_th": "กุดบาก",
        "name_en": "Kut Bak",
        "zip_code": "47180"
      },
      {
        "id": 4702,
        "name_th": "กุสุมาลย์",
        "name_en": "Kusuman",
        "zip_code": "47210"
      },
      {
        "id": 4709,
        "name_th": "คำตากล้า",
        "name_en": "Kham Ta Kla",
        "zip_code": "47250"
      },
      {
        "id": 4707,
        "name_th": "นิคมน้ำอูน",
        "name_en": "Nikhom Nam Un",
        "zip_code": "47270"
      },
      {
        "id": 4710,
        "name_th": "บ้านม่วง",
        "name_en": "Ban Muang",
        "zip_code": "47140"
      },
      {
        "id": 4704,
        "name_th": "พรรณานิคม",
        "name_en": "Phanna Nikhom",
        "zip_code": "47130"
      },
      {
        "id": 4705,
        "name_th": "พังโคน",
        "name_en": "Phang Khon",
        "zip_code": "47160"
      },
      {
        "id": 4718,
        "name_th": "ภูพาน",
        "name_en": "Phu Phan",
        "zip_code": "47180"
      },
      {
        "id": 4708,
        "name_th": "วานรนิวาส",
        "name_en": "Wanon Niwat",
        "zip_code": "47120"
      },
      {
        "id": 4706,
        "name_th": "วาริชภูมิ",
        "name_en": "Waritchaphum",
        "zip_code": "47150"
      },
      {
        "id": 4712,
        "name_th": "สว่างแดนดิน",
        "name_en": "Sawang Daen Din",
        "zip_code": "47110"
      },
      {
        "id": 4713,
        "name_th": "ส่องดาว",
        "name_en": "Song Dao",
        "zip_code": "47190"
      },
      {
        "id": 4711,
        "name_th": "อากาศอำนวย",
        "name_en": "Akat Amnuai",
        "zip_code": "47170"
      },
      {
        "id": 4716,
        "name_th": "เจริญศิลป์",
        "name_en": "Charoen Sin",
        "zip_code": "47290"
      },
      {
        "id": 4714,
        "name_th": "เต่างอย",
        "name_en": "Tao Ngoi",
        "zip_code": "47260"
      },
      {
        "id": 4701,
        "name_th": "เมืองสกลนคร",
        "name_en": "Mueang Sakon Nakhon",
        "zip_code": "47000"
      },
      {
        "id": 4715,
        "name_th": "โคกศรีสุพรรณ",
        "name_en": "Khok Si Suphan",
        "zip_code": "47280"
      },
      {
        "id": 4717,
        "name_th": "โพนนาแก้ว",
        "name_en": "Phon Na Kaeo",
        "zip_code": "47230"
      }
    ]
  },
  {
    "id": 70,
    "name_th": "สงขลา",
    "name_en": "Songkhla",
    "districts": [
      {
        "id": 9008,
        "name_th": "กระแสสินธุ์",
        "name_en": "Krasae Sin",
        "zip_code": "90270"
      },
      {
        "id": 9016,
        "name_th": "คลองหอยโข่ง",
        "name_en": "Khlong Hoi Khong",
        "zip_code": "90230"
      },
      {
        "id": 9013,
        "name_th": "ควนเนียง",
        "name_en": "Khuan Niang",
        "zip_code": "90220"
      },
      {
        "id": 9003,
        "name_th": "จะนะ",
        "name_en": "Chana",
        "zip_code": "90130"
      },
      {
        "id": 9077,
        "name_th": "ท้องถิ่นเทศบาลตำบลสำนักขาม",
        "name_en": "Sum Nung Kam",
        "zip_code": ""
      },
      {
        "id": 9004,
        "name_th": "นาทวี",
        "name_en": "Na Thawi",
        "zip_code": "90160"
      },
      {
        "id": 9012,
        "name_th": "นาหม่อม",
        "name_en": "Na Mom",
        "zip_code": "90310"
      },
      {
        "id": 9014,
        "name_th": "บางกล่ำ",
        "name_en": "Bang Klam",
        "zip_code": "90110"
      },
      {
        "id": 9007,
        "name_th": "ระโนด",
        "name_en": "Ranot",
        "zip_code": "90140"
      },
      {
        "id": 9009,
        "name_th": "รัตภูมิ",
        "name_en": "Rattaphum",
        "zip_code": "90180"
      },
      {
        "id": 9002,
        "name_th": "สทิงพระ",
        "name_en": "Sathing Phra",
        "zip_code": "90190"
      },
      {
        "id": 9006,
        "name_th": "สะบ้าย้อย",
        "name_en": "Saba Yoi",
        "zip_code": "90210"
      },
      {
        "id": 9010,
        "name_th": "สะเดา",
        "name_en": "Sadao",
        "zip_code": "90120"
      },
      {
        "id": 9015,
        "name_th": "สิงหนคร",
        "name_en": "Singhanakhon",
        "zip_code": "90280"
      },
      {
        "id": 9011,
        "name_th": "หาดใหญ่",
        "name_en": "Hat Yai",
        "zip_code": "90110"
      },
      {
        "id": 9005,
        "name_th": "เทพา",
        "name_en": "Thepha",
        "zip_code": "90150"
      },
      {
        "id": 9001,
        "name_th": "เมืองสงขลา",
        "name_en": "Mueang Songkhla",
        "zip_code": "90000"
      }
    ]
  },
  {
    "id": 71,
    "name_th": "สตูล",
    "name_en": "Satun",
    "districts": [
      {
        "id": 9103,
        "name_th": "ควนกาหลง",
        "name_en": "Khuan Kalong",
        "zip_code": "91130"
      },
      {
        "id": 9102,
        "name_th": "ควนโดน",
        "name_en": "Khuan Don",
        "zip_code": "91160"
      },
      {
        "id": 9106,
        "name_th": "ทุ่งหว้า",
        "name_en": "Thung Wa",
        "zip_code": "91120"
      },
      {
        "id": 9104,
        "name_th": "ท่าแพ",
        "name_en": "Tha Phae",
        "zip_code": "91150"
      },
      {
        "id": 9107,
        "name_th": "มะนัง",
        "name_en": "Manang",
        "zip_code": "91130"
      },
      {
        "id": 9105,
        "name_th": "ละงู",
        "name_en": "La-ngu",
        "zip_code": "91110"
      },
      {
        "id": 9101,
        "name_th": "เมืองสตูล",
        "name_en": "Mueang Satun",
        "zip_code": "91000"
      }
    ]
  },
  {
    "id": 2,
    "name_th": "สมุทรปราการ",
    "name_en": "Samut Prakan",
    "districts": [
      {
        "id": 1102,
        "name_th": "บางบ่อ",
        "name_en": "Bang Bo",
        "zip_code": "10560"
      },
      {
        "id": 1103,
        "name_th": "บางพลี",
        "name_en": "Bang Phli",
        "zip_code": "10540"
      },
      {
        "id": 1106,
        "name_th": "บางเสาธง",
        "name_en": "Bang Sao Thong",
        "zip_code": "10540"
      },
      {
        "id": 1104,
        "name_th": "พระประแดง",
        "name_en": "Phra Pradaeng",
        "zip_code": "10130"
      },
      {
        "id": 1105,
        "name_th": "พระสมุทรเจดีย์",
        "name_en": "Phra Samut Chedi",
        "zip_code": "10290"
      },
      {
        "id": 1101,
        "name_th": "เมืองสมุทรปราการ",
        "name_en": "Mueang Samut Prakan",
        "zip_code": "10270"
      }
    ]
  },
  {
    "id": 60,
    "name_th": "สมุทรสงคราม",
    "name_en": "Samut Songkhram",
    "districts": [
      {
        "id": 7502,
        "name_th": "บางคนที",
        "name_en": "Bang Khonthi",
        "zip_code": "75120"
      },
      {
        "id": 7503,
        "name_th": "อัมพวา",
        "name_en": "Amphawa",
        "zip_code": "75110"
      },
      {
        "id": 7501,
        "name_th": "เมืองสมุทรสงคราม",
        "name_en": "Mueang Samut Songkhram",
        "zip_code": "75000"
      }
    ]
  },
  {
    "id": 59,
    "name_th": "สมุทรสาคร",
    "name_en": "Samut Sakhon",
    "districts": [
      {
        "id": 7402,
        "name_th": "กระทุ่มแบน",
        "name_en": "Krathum Baen",
        "zip_code": "74110"
      },
      {
        "id": 7403,
        "name_th": "บ้านแพ้ว",
        "name_en": "Ban Phaeo",
        "zip_code": "74120"
      },
      {
        "id": 7401,
        "name_th": "เมืองสมุทรสาคร",
        "name_en": "Mueang Samut Sakhon",
        "zip_code": "74000"
      }
    ]
  },
  {
    "id": 10,
    "name_th": "สระบุรี",
    "name_en": "Saraburi",
    "districts": [
      {
        "id": 1907,
        "name_th": "ดอนพุด",
        "name_en": "Don Phut",
        "zip_code": "18210"
      },
      {
        "id": 1906,
        "name_th": "บ้านหมอ",
        "name_en": "Ban Mo",
        "zip_code": "18130"
      },
      {
        "id": 1909,
        "name_th": "พระพุทธบาท",
        "name_en": "Phra Phutthabat",
        "zip_code": "18120"
      },
      {
        "id": 1911,
        "name_th": "มวกเหล็ก",
        "name_en": "Muak Lek",
        "zip_code": "18180"
      },
      {
        "id": 1912,
        "name_th": "วังม่วง",
        "name_en": "Wang Muang",
        "zip_code": "18220"
      },
      {
        "id": 1904,
        "name_th": "วิหารแดง",
        "name_en": "Wihan Daeng",
        "zip_code": "18150"
      },
      {
        "id": 1903,
        "name_th": "หนองแค",
        "name_en": "Nong Khae",
        "zip_code": "18140"
      },
      {
        "id": 1905,
        "name_th": "หนองแซง",
        "name_en": "Nong Saeng",
        "zip_code": "18170"
      },
      {
        "id": 1908,
        "name_th": "หนองโดน",
        "name_en": "Nong Don",
        "zip_code": "18190"
      },
      {
        "id": 1913,
        "name_th": "เฉลิมพระเกียรติ",
        "name_en": "Chaloem Phra Kiat",
        "zip_code": "18000"
      },
      {
        "id": 1901,
        "name_th": "เมืองสระบุรี",
        "name_en": "Mueang Saraburi",
        "zip_code": "18000"
      },
      {
        "id": 1910,
        "name_th": "เสาไห้",
        "name_en": "Sao Hai",
        "zip_code": "18160"
      },
      {
        "id": 1902,
        "name_th": "แก่งคอย",
        "name_en": "Kaeng Khoi",
        "zip_code": "18110"
      }
    ]
  },
  {
    "id": 18,
    "name_th": "สระแก้ว",
    "name_en": "Sa Kaeo",
    "districts": [
      {
        "id": 2702,
        "name_th": "คลองหาด",
        "name_en": "Khlong Hat",
        "zip_code": "27260"
      },
      {
        "id": 2703,
        "name_th": "ตาพระยา",
        "name_en": "Ta Phraya",
        "zip_code": "27180"
      },
      {
        "id": 2704,
        "name_th": "วังน้ำเย็น",
        "name_en": "Wang Nam Yen",
        "zip_code": "27210"
      },
      {
        "id": 2709,
        "name_th": "วังสมบูรณ์",
        "name_en": "Wang Sombun",
        "zip_code": "27250"
      },
      {
        "id": 2705,
        "name_th": "วัฒนานคร",
        "name_en": "Watthana Nakhon",
        "zip_code": "27160"
      },
      {
        "id": 2706,
        "name_th": "อรัญประเทศ",
        "name_en": "Aranyaprathet",
        "zip_code": "27120"
      },
      {
        "id": 2707,
        "name_th": "เขาฉกรรจ์",
        "name_en": "Khao Chakan",
        "zip_code": "27000"
      },
      {
        "id": 2701,
        "name_th": "เมืองสระแก้ว",
        "name_en": "Mueang Sa Kaeo",
        "zip_code": "27000"
      },
      {
        "id": 2708,
        "name_th": "โคกสูง",
        "name_en": "Khok Sung",
        "zip_code": "27120"
      }
    ]
  },
  {
    "id": 8,
    "name_th": "สิงห์บุรี",
    "name_en": "Sing Buri",
    "districts": [
      {
        "id": 1703,
        "name_th": "ค่ายบางระจัน",
        "name_en": "Khai Bang Rachan",
        "zip_code": "16150"
      },
      {
        "id": 1705,
        "name_th": "ท่าช้าง",
        "name_en": "Tha Chang",
        "zip_code": "16140"
      },
      {
        "id": 1702,
        "name_th": "บางระจัน",
        "name_en": "Bang Rachan",
        "zip_code": "16130"
      },
      {
        "id": 1704,
        "name_th": "พรหมบุรี",
        "name_en": "Phrom Buri",
        "zip_code": "16120"
      },
      {
        "id": 1706,
        "name_th": "อินทร์บุรี",
        "name_en": "In Buri",
        "zip_code": "16110"
      },
      {
        "id": 1701,
        "name_th": "เมืองสิงห์บุรี",
        "name_en": "Mueang Sing Buri",
        "zip_code": "16000"
      }
    ]
  },
  {
    "id": 57,
    "name_th": "สุพรรณบุรี",
    "name_en": "Suphan Buri",
    "districts": [
      {
        "id": 7206,
        "name_th": "ดอนเจดีย์",
        "name_en": "Don Chedi",
        "zip_code": "72170"
      },
      {
        "id": 7203,
        "name_th": "ด่านช้าง",
        "name_en": "Dan Chang",
        "zip_code": "72180"
      },
      {
        "id": 7204,
        "name_th": "บางปลาม้า",
        "name_en": "Bang Pla Ma",
        "zip_code": "72150"
      },
      {
        "id": 7205,
        "name_th": "ศรีประจันต์",
        "name_en": "Si Prachan",
        "zip_code": "72140"
      },
      {
        "id": 7207,
        "name_th": "สองพี่น้อง",
        "name_en": "Song Phi Nong",
        "zip_code": "72110"
      },
      {
        "id": 7208,
        "name_th": "สามชุก",
        "name_en": "Sam Chuk",
        "zip_code": "72130"
      },
      {
        "id": 7210,
        "name_th": "หนองหญ้าไซ",
        "name_en": "Nong Ya Sai",
        "zip_code": "72240"
      },
      {
        "id": 7209,
        "name_th": "อู่ทอง",
        "name_en": "U Thong",
        "zip_code": "72160"
      },
      {
        "id": 7202,
        "name_th": "เดิมบางนางบวช",
        "name_en": "Doem Bang Nang Buat",
        "zip_code": "72120"
      },
      {
        "id": 7201,
        "name_th": "เมืองสุพรรณบุรี",
        "name_en": "Mueang Suphan Buri",
        "zip_code": "72000"
      }
    ]
  },
  {
    "id": 67,
    "name_th": "สุราษฎร์ธานี",
    "name_en": "Surat Thani",
    "districts": [
      {
        "id": 8402,
        "name_th": "กาญจนดิษฐ์",
        "name_en": "Kanchanadit",
        "zip_code": "84290"
      },
      {
        "id": 8408,
        "name_th": "คีรีรัฐนิคม",
        "name_en": "Khiri Rat Nikhom",
        "zip_code": "84180"
      },
      {
        "id": 8418,
        "name_th": "ชัยบุรี",
        "name_en": "Chai Buri",
        "zip_code": "84350"
      },
      {
        "id": 8403,
        "name_th": "ดอนสัก",
        "name_en": "Don Sak",
        "zip_code": "84220"
      },
      {
        "id": 8411,
        "name_th": "ท่าฉาง",
        "name_en": "Tha Chang",
        "zip_code": "84150"
      },
      {
        "id": 8407,
        "name_th": "ท่าชนะ",
        "name_en": "Tha Chana",
        "zip_code": "84170"
      },
      {
        "id": 8409,
        "name_th": "บ้านตาขุน",
        "name_en": "Ban Ta Khun",
        "zip_code": "84230"
      },
      {
        "id": 8412,
        "name_th": "บ้านนาสาร",
        "name_en": "Ban Na San",
        "zip_code": "84120"
      },
      {
        "id": 8413,
        "name_th": "บ้านนาเดิม",
        "name_en": "Ban Na Doem",
        "zip_code": "84240"
      },
      {
        "id": 8410,
        "name_th": "พนม",
        "name_en": "Phanom",
        "zip_code": "84250"
      },
      {
        "id": 8416,
        "name_th": "พระแสง",
        "name_en": "Phrasaeng",
        "zip_code": "84210"
      },
      {
        "id": 8417,
        "name_th": "พุนพิน",
        "name_en": "Phunphin",
        "zip_code": "84130"
      },
      {
        "id": 8419,
        "name_th": "วิภาวดี",
        "name_en": "Vibhavadi",
        "zip_code": "84180"
      },
      {
        "id": 8405,
        "name_th": "เกาะพะงัน",
        "name_en": "Ko Pha-ngan",
        "zip_code": "84280"
      },
      {
        "id": 8404,
        "name_th": "เกาะสมุย",
        "name_en": "Ko Samui",
        "zip_code": "84140"
      },
      {
        "id": 8414,
        "name_th": "เคียนซา",
        "name_en": "Khian Sa",
        "zip_code": "84260"
      },
      {
        "id": 8401,
        "name_th": "เมืองสุราษฎร์ธานี",
        "name_en": "Mueang Surat Thani",
        "zip_code": "84000"
      },
      {
        "id": 8415,
        "name_th": "เวียงสระ",
        "name_en": "Wiang Sa",
        "zip_code": "84190"
      },
      {
        "id": 8406,
        "name_th": "ไชยา",
        "name_en": "Chaiya",
        "zip_code": "84110"
      }
    ]
  },
  {
    "id": 21,
    "name_th": "สุรินทร์",
    "name_en": "Surin",
    "districts": [
      {
        "id": 3206,
        "name_th": "กาบเชิง",
        "name_en": "Kap Choeng",
        "zip_code": "32210"
      },
      {
        "id": 3204,
        "name_th": "จอมพระ",
        "name_en": "Chom Phra",
        "zip_code": "32180"
      },
      {
        "id": 3202,
        "name_th": "ชุมพลบุรี",
        "name_en": "Chumphon Buri",
        "zip_code": "32190"
      },
      {
        "id": 3203,
        "name_th": "ท่าตูม",
        "name_en": "Tha Tum",
        "zip_code": "32120"
      },
      {
        "id": 3213,
        "name_th": "บัวเชด",
        "name_en": "Buachet",
        "zip_code": "32230"
      },
      {
        "id": 3205,
        "name_th": "ปราสาท",
        "name_en": "Prasat",
        "zip_code": "32140"
      },
      {
        "id": 3214,
        "name_th": "พนมดงรัก",
        "name_en": "Phanom Dong Rak",
        "zip_code": "32140"
      },
      {
        "id": 3207,
        "name_th": "รัตนบุรี",
        "name_en": "Rattanaburi",
        "zip_code": "32130"
      },
      {
        "id": 3211,
        "name_th": "ลำดวน",
        "name_en": "Lamduan",
        "zip_code": "32220"
      },
      {
        "id": 3215,
        "name_th": "ศรีณรงค์",
        "name_en": "Si Narong",
        "zip_code": "32150"
      },
      {
        "id": 3209,
        "name_th": "ศีขรภูมิ",
        "name_en": "Sikhoraphum",
        "zip_code": "32110"
      },
      {
        "id": 3208,
        "name_th": "สนม",
        "name_en": "Sanom",
        "zip_code": "32160"
      },
      {
        "id": 3210,
        "name_th": "สังขะ",
        "name_en": "Sangkha",
        "zip_code": "32150"
      },
      {
        "id": 3212,
        "name_th": "สำโรงทาบ",
        "name_en": "Samrong Thap",
        "zip_code": "32170"
      },
      {
        "id": 3216,
        "name_th": "เขวาสินรินทร์",
        "name_en": "Khwao Sinarin",
        "zip_code": "32000"
      },
      {
        "id": 3201,
        "name_th": "เมืองสุรินทร์",
        "name_en": "Mueang Surin",
        "zip_code": "32000"
      },
      {
        "id": 3217,
        "name_th": "โนนนารายณ์",
        "name_en": "Non Narai",
        "zip_code": "32130"
      }
    ]
  },
  {
    "id": 51,
    "name_th": "สุโขทัย",
    "name_en": "Sukhothai",
    "districts": [
      {
        "id": 6404,
        "name_th": "กงไกรลาศ",
        "name_en": "Kong Krailat",
        "zip_code": "64170"
      },
      {
        "id": 6403,
        "name_th": "คีรีมาศ",
        "name_en": "Khiri Mat",
        "zip_code": "64160"
      },
      {
        "id": 6409,
        "name_th": "ทุ่งเสลี่ยม",
        "name_en": "Thung Saliam",
        "zip_code": "64230"
      },
      {
        "id": 6402,
        "name_th": "บ้านด่านลานหอย",
        "name_en": "Ban Dan Lan Hoi",
        "zip_code": "64140"
      },
      {
        "id": 6408,
        "name_th": "ศรีนคร",
        "name_en": "Si Nakhon",
        "zip_code": "64180"
      },
      {
        "id": 6405,
        "name_th": "ศรีสัชนาลัย",
        "name_en": "Si Satchanalai",
        "zip_code": "64130"
      },
      {
        "id": 6406,
        "name_th": "ศรีสำโรง",
        "name_en": "Si Samrong",
        "zip_code": "64120"
      },
      {
        "id": 6407,
        "name_th": "สวรรคโลก",
        "name_en": "Sawankhalok",
        "zip_code": "64110"
      },
      {
        "id": 6401,
        "name_th": "เมืองสุโขทัย",
        "name_en": "Mueang Sukhothai",
        "zip_code": "64000"
      }
    ]
  },
  {
    "id": 31,
    "name_th": "หนองคาย",
    "name_en": "Nong Khai",
    "districts": [
      {
        "id": 4302,
        "name_th": "ท่าบ่อ",
        "name_en": "Tha Bo",
        "zip_code": "43110"
      },
      {
        "id": 4316,
        "name_th": "รัตนวาปี",
        "name_en": "Rattanawapi",
        "zip_code": "43120"
      },
      {
        "id": 4307,
        "name_th": "ศรีเชียงใหม่",
        "name_en": "Si Chiang Mai",
        "zip_code": "43130"
      },
      {
        "id": 4314,
        "name_th": "สระใคร",
        "name_en": "Sakhrai",
        "zip_code": "43100"
      },
      {
        "id": 4308,
        "name_th": "สังคม",
        "name_en": "Sangkhom",
        "zip_code": "43160"
      },
      {
        "id": 4315,
        "name_th": "เฝ้าไร่",
        "name_en": "Fao Rai",
        "zip_code": "43120"
      },
      {
        "id": 4301,
        "name_th": "เมืองหนองคาย",
        "name_en": "Mueang Nong Khai",
        "zip_code": "43000"
      },
      {
        "id": 4317,
        "name_th": "โพธิ์ตาก",
        "name_en": "Pho Tak",
        "zip_code": "43130"
      },
      {
        "id": 4305,
        "name_th": "โพนพิสัย",
        "name_en": "Phon Phisai",
        "zip_code": "43120"
      }
    ]
  },
  {
    "id": 27,
    "name_th": "หนองบัวลำภู",
    "name_en": "Nong Bua Lam Phu",
    "districts": [
      {
        "id": 3902,
        "name_th": "นากลาง",
        "name_en": "Na Klang",
        "zip_code": "39170"
      },
      {
        "id": 3906,
        "name_th": "นาวัง",
        "name_en": "Na Wang",
        "zip_code": "39170"
      },
      {
        "id": 3904,
        "name_th": "ศรีบุญเรือง",
        "name_en": "Si Bun Rueang",
        "zip_code": "39180"
      },
      {
        "id": 3905,
        "name_th": "สุวรรณคูหา",
        "name_en": "Suwannakhuha",
        "zip_code": "39270"
      },
      {
        "id": 3901,
        "name_th": "เมืองหนองบัวลำภู",
        "name_en": "Mueang Nong Bua Lam Phu",
        "zip_code": "39000"
      },
      {
        "id": 3903,
        "name_th": "โนนสัง",
        "name_en": "Non Sang",
        "zip_code": "39140"
      }
    ]
  },
  {
    "id": 26,
    "name_th": "อำนาจเจริญ",
    "name_en": "Amnat Charoen",
    "districts": [
      {
        "id": 3702,
        "name_th": "ชานุมาน",
        "name_en": "Chanuman",
        "zip_code": "37210"
      },
      {
        "id": 3703,
        "name_th": "ปทุมราชวงศา",
        "name_en": "Pathum Ratchawongsa",
        "zip_code": "37110"
      },
      {
        "id": 3704,
        "name_th": "พนา",
        "name_en": "Phana",
        "zip_code": "37180"
      },
      {
        "id": 3707,
        "name_th": "ลืออำนาจ",
        "name_en": "Lue Amnat",
        "zip_code": "37000"
      },
      {
        "id": 3706,
        "name_th": "หัวตะพาน",
        "name_en": "Hua Taphan",
        "zip_code": "37240"
      },
      {
        "id": 3701,
        "name_th": "เมืองอำนาจเจริญ",
        "name_en": "Mueang Amnat Charoen",
        "zip_code": "37000"
      },
      {
        "id": 3705,
        "name_th": "เสนางคนิคม",
        "name_en": "Senangkhanikhom",
        "zip_code": "37290"
      }
    ]
  },
  {
    "id": 29,
    "name_th": "อุดรธานี",
    "name_en": "Udon Thani",
    "districts": [
      {
        "id": 4102,
        "name_th": "กุดจับ",
        "name_en": "Kut Chap",
        "zip_code": "41250"
      },
      {
        "id": 4104,
        "name_th": "กุมภวาปี",
        "name_en": "Kumphawapi",
        "zip_code": "41110"
      },
      {
        "id": 4124,
        "name_th": "กู่แก้ว",
        "name_en": "Ku Kaeo",
        "zip_code": "41130"
      },
      {
        "id": 4107,
        "name_th": "ทุ่งฝน",
        "name_en": "Thung Fon",
        "zip_code": "41310"
      },
      {
        "id": 4122,
        "name_th": "นายูง",
        "name_en": "Na Yung",
        "zip_code": "41380"
      },
      {
        "id": 4118,
        "name_th": "น้ำโสม",
        "name_en": "Nam Som",
        "zip_code": "41210"
      },
      {
        "id": 4111,
        "name_th": "บ้านดุง",
        "name_en": "Ban Dung",
        "zip_code": "41190"
      },
      {
        "id": 4117,
        "name_th": "บ้านผือ",
        "name_en": "Ban Phue",
        "zip_code": "41160"
      },
      {
        "id": 4125,
        "name_th": "ประจักษ์ศิลปาคม",
        "name_en": "Prachaksinlapakhom",
        "zip_code": "41110"
      },
      {
        "id": 4123,
        "name_th": "พิบูลย์รักษ์",
        "name_en": "Phibun Rak",
        "zip_code": "41130"
      },
      {
        "id": 4110,
        "name_th": "วังสามหมอ",
        "name_en": "Wang Sam Mo",
        "zip_code": "41280"
      },
      {
        "id": 4109,
        "name_th": "ศรีธาตุ",
        "name_en": "Si That",
        "zip_code": "41230"
      },
      {
        "id": 4120,
        "name_th": "สร้างคอม",
        "name_en": "Sang Khom",
        "zip_code": "41260"
      },
      {
        "id": 4103,
        "name_th": "หนองวัวซอ",
        "name_en": "Nong Wua So",
        "zip_code": "41360"
      },
      {
        "id": 4106,
        "name_th": "หนองหาน",
        "name_en": "Nong Han",
        "zip_code": "41130"
      },
      {
        "id": 4121,
        "name_th": "หนองแสง",
        "name_en": "Nong Saeng",
        "zip_code": "41340"
      },
      {
        "id": 4119,
        "name_th": "เพ็ญ",
        "name_en": "Phen",
        "zip_code": "41150"
      },
      {
        "id": 4101,
        "name_th": "เมืองอุดรธานี",
        "name_en": "Mueang Udon Thani",
        "zip_code": "41000"
      },
      {
        "id": 4105,
        "name_th": "โนนสะอาด",
        "name_en": "Non Sa-at",
        "zip_code": "41240"
      },
      {
        "id": 4108,
        "name_th": "ไชยวาน",
        "name_en": "Chai Wan",
        "zip_code": "41290"
      }
    ]
  },
  {
    "id": 41,
    "name_th": "อุตรดิตถ์",
    "name_en": "Uttaradit",
    "districts": [
      {
        "id": 5302,
        "name_th": "ตรอน",
        "name_en": "Tron",
        "zip_code": "53140"
      },
      {
        "id": 5309,
        "name_th": "ทองแสนขัน",
        "name_en": "Thong Saen Khan",
        "zip_code": "53230"
      },
      {
        "id": 5303,
        "name_th": "ท่าปลา",
        "name_en": "Tha Pla",
        "zip_code": "53150"
      },
      {
        "id": 5304,
        "name_th": "น้ำปาด",
        "name_en": "Nam Pat",
        "zip_code": "53110"
      },
      {
        "id": 5306,
        "name_th": "บ้านโคก",
        "name_en": "Ban Khok",
        "zip_code": "53180"
      },
      {
        "id": 5307,
        "name_th": "พิชัย",
        "name_en": "Phichai",
        "zip_code": "53120"
      },
      {
        "id": 5305,
        "name_th": "ฟากท่า",
        "name_en": "Fak Tha",
        "zip_code": "53160"
      },
      {
        "id": 5308,
        "name_th": "ลับแล",
        "name_en": "Laplae",
        "zip_code": "53130"
      },
      {
        "id": 5301,
        "name_th": "เมืองอุตรดิตถ์",
        "name_en": "Mueang Uttaradit",
        "zip_code": "53000"
      }
    ]
  },
  {
    "id": 48,
    "name_th": "อุทัยธานี",
    "name_en": "Uthai Thani",
    "districts": [
      {
        "id": 6102,
        "name_th": "ทัพทัน",
        "name_en": "Thap Than",
        "zip_code": "61120"
      },
      {
        "id": 6106,
        "name_th": "บ้านไร่",
        "name_en": "Ban Rai",
        "zip_code": "61140"
      },
      {
        "id": 6107,
        "name_th": "ลานสัก",
        "name_en": "Lan Sak",
        "zip_code": "61160"
      },
      {
        "id": 6103,
        "name_th": "สว่างอารมณ์",
        "name_en": "Sawang Arom",
        "zip_code": "61150"
      },
      {
        "id": 6105,
        "name_th": "หนองขาหย่าง",
        "name_en": "Nong Khayang",
        "zip_code": "61130"
      },
      {
        "id": 6104,
        "name_th": "หนองฉาง",
        "name_en": "Nong Chang",
        "zip_code": "61110"
      },
      {
        "id": 6108,
        "name_th": "ห้วยคต",
        "name_en": "Huai Khot",
        "zip_code": "61170"
      },
      {
        "id": 6101,
        "name_th": "เมืองอุทัยธานี",
        "name_en": "Mueang Uthai Thani",
        "zip_code": "61000"
      }
    ]
  },
  {
    "id": 23,
    "name_th": "อุบลราชธานี",
    "name_en": "Ubon Ratchathani",
    "districts": [
      {
        "id": 3412,
        "name_th": "กุดข้าวปุ้น",
        "name_en": "Kut Khaopun",
        "zip_code": "34270"
      },
      {
        "id": 3424,
        "name_th": "ดอนมดแดง",
        "name_en": "Don Mot Daeng",
        "zip_code": "34000"
      },
      {
        "id": 3411,
        "name_th": "ตระการพืชผล",
        "name_en": "Trakan Phuet Phon",
        "zip_code": "34130"
      },
      {
        "id": 3420,
        "name_th": "ตาลสุม",
        "name_en": "Tan Sum",
        "zip_code": "34330"
      },
      {
        "id": 3426,
        "name_th": "ทุ่งศรีอุดม",
        "name_en": "Thung Si Udom",
        "zip_code": "34160"
      },
      {
        "id": 3408,
        "name_th": "นาจะหลวย",
        "name_en": "Na Chaluai",
        "zip_code": "34280"
      },
      {
        "id": 3430,
        "name_th": "นาตาล",
        "name_en": "Na Tan",
        "zip_code": "34170"
      },
      {
        "id": 3429,
        "name_th": "นาเยีย",
        "name_en": "Na Yia",
        "zip_code": "34160"
      },
      {
        "id": 3433,
        "name_th": "น้ำขุ่น",
        "name_en": "Nam Khun",
        "zip_code": "34260"
      },
      {
        "id": 3409,
        "name_th": "น้ำยืน",
        "name_en": "Nam Yuen",
        "zip_code": "34260"
      },
      {
        "id": 3410,
        "name_th": "บุณฑริก",
        "name_en": "Buntharik",
        "zip_code": "34230"
      },
      {
        "id": 3419,
        "name_th": "พิบูลมังสาหาร",
        "name_en": "Phibun Mangsahan",
        "zip_code": "34110"
      },
      {
        "id": 3414,
        "name_th": "ม่วงสามสิบ",
        "name_en": "Muang Sam Sip",
        "zip_code": "34140"
      },
      {
        "id": 3415,
        "name_th": "วารินชำราบ",
        "name_en": "Warin Chamrap",
        "zip_code": "34190"
      },
      {
        "id": 3402,
        "name_th": "ศรีเมืองใหม่",
        "name_en": "Si Mueang Mai",
        "zip_code": "34250"
      },
      {
        "id": 3432,
        "name_th": "สว่างวีระวงศ์",
        "name_en": "Sawang Wirawong",
        "zip_code": "34190"
      },
      {
        "id": 3422,
        "name_th": "สำโรง",
        "name_en": "Samrong",
        "zip_code": "34360"
      },
      {
        "id": 3425,
        "name_th": "สิรินธร",
        "name_en": "Sirindhorn",
        "zip_code": "34350"
      },
      {
        "id": 3405,
        "name_th": "เขมราฐ",
        "name_en": "Khemarat",
        "zip_code": "34170"
      },
      {
        "id": 3404,
        "name_th": "เขื่องใน",
        "name_en": "Khueang Nai",
        "zip_code": "34150"
      },
      {
        "id": 3407,
        "name_th": "เดชอุดม",
        "name_en": "Det Udom",
        "zip_code": "34160"
      },
      {
        "id": 3401,
        "name_th": "เมืองอุบลราชธานี",
        "name_en": "Mueang Ubon Ratchathani",
        "zip_code": "34000"
      },
      {
        "id": 3431,
        "name_th": "เหล่าเสือโก้ก",
        "name_en": "Lao Suea Kok",
        "zip_code": "34000"
      },
      {
        "id": 3403,
        "name_th": "โขงเจียม",
        "name_en": "Khong Chiam",
        "zip_code": "34220"
      },
      {
        "id": 3421,
        "name_th": "โพธิ์ไทร",
        "name_en": "Pho Sai",
        "zip_code": "34340"
      }
    ]
  },
  {
    "id": 6,
    "name_th": "อ่างทอง",
    "name_en": "Ang Thong",
    "districts": [
      {
        "id": 1503,
        "name_th": "ป่าโมก",
        "name_en": "Pa Mok",
        "zip_code": "14130"
      },
      {
        "id": 1506,
        "name_th": "วิเศษชัยชาญ",
        "name_en": "Wiset Chai Chan",
        "zip_code": "14110"
      },
      {
        "id": 1507,
        "name_th": "สามโก้",
        "name_en": "Samko",
        "zip_code": "14160"
      },
      {
        "id": 1501,
        "name_th": "เมืองอ่างทอง",
        "name_en": "Mueang Ang Thong",
        "zip_code": "14000"
      },
      {
        "id": 1505,
        "name_th": "แสวงหา",
        "name_en": "Sawaeng Ha",
        "zip_code": "14150"
      },
      {
        "id": 1504,
        "name_th": "โพธิ์ทอง",
        "name_en": "Pho Thong",
        "zip_code": "14120"
      },
      {
        "id": 1502,
        "name_th": "ไชโย",
        "name_en": "Chaiyo",
        "zip_code": "14140"
      }
    ]
  },
  {
    "id": 45,
    "name_th": "เชียงราย",
    "name_en": "Chiang Rai",
    "districts": [
      {
        "id": 5714,
        "name_th": "ขุนตาล",
        "name_en": "Khun Tan",
        "zip_code": "57340"
      },
      {
        "id": 5718,
        "name_th": "ดอยหลวง",
        "name_en": "Doi Luang",
        "zip_code": "57110"
      },
      {
        "id": 5706,
        "name_th": "ป่าแดด",
        "name_en": "Pa Daet",
        "zip_code": "57190"
      },
      {
        "id": 5712,
        "name_th": "พญาเม็งราย",
        "name_en": "Phaya Mengrai",
        "zip_code": "57290"
      },
      {
        "id": 5705,
        "name_th": "พาน",
        "name_en": "Phan",
        "zip_code": "57120"
      },
      {
        "id": 5703,
        "name_th": "เชียงของ",
        "name_en": "Chiang Khong",
        "zip_code": "57140"
      },
      {
        "id": 5708,
        "name_th": "เชียงแสน",
        "name_en": "Chiang Saen",
        "zip_code": "57150"
      },
      {
        "id": 5704,
        "name_th": "เทิง",
        "name_en": "Thoeng",
        "zip_code": "57160"
      },
      {
        "id": 5701,
        "name_th": "เมืองเชียงราย",
        "name_en": "Mueang Chiang Rai",
        "zip_code": "57000"
      },
      {
        "id": 5702,
        "name_th": "เวียงชัย",
        "name_en": "Wiang Chai",
        "zip_code": "57210"
      },
      {
        "id": 5711,
        "name_th": "เวียงป่าเป้า",
        "name_en": "Wiang Pa Pao",
        "zip_code": "57170"
      },
      {
        "id": 5717,
        "name_th": "เวียงเชียงรุ้ง",
        "name_en": "Wiang Chiang Rung",
        "zip_code": "57210"
      },
      {
        "id": 5713,
        "name_th": "เวียงแก่น",
        "name_en": "Wiang Kaen",
        "zip_code": "57310"
      },
      {
        "id": 5707,
        "name_th": "แม่จัน",
        "name_en": "Mae Chan",
        "zip_code": "57110"
      },
      {
        "id": 5715,
        "name_th": "แม่ฟ้าหลวง",
        "name_en": "Mae Fa Luang",
        "zip_code": "57240"
      },
      {
        "id": 5716,
        "name_th": "แม่ลาว",
        "name_en": "Mae Lao",
        "zip_code": "57250"
      },
      {
        "id": 5710,
        "name_th": "แม่สรวย",
        "name_en": "Mae Suai",
        "zip_code": "57180"
      },
      {
        "id": 5709,
        "name_th": "แม่สาย",
        "name_en": "Mae Sai",
        "zip_code": "57130"
      }
    ]
  },
  {
    "id": 38,
    "name_th": "เชียงใหม่",
    "name_en": "Chiang Mai",
    "districts": [
      {
        "id": 5025,
        "name_th": "กัลยาณิวัฒนา",
        "name_en": "Galyani Vadhana",
        "zip_code": "58130"
      },
      {
        "id": 5002,
        "name_th": "จอมทอง",
        "name_en": "Chom Thong",
        "zip_code": "50160"
      },
      {
        "id": 5005,
        "name_th": "ดอยสะเก็ด",
        "name_en": "Doi Saket",
        "zip_code": "50220"
      },
      {
        "id": 5024,
        "name_th": "ดอยหล่อ",
        "name_en": "Doi Lo",
        "zip_code": "50160"
      },
      {
        "id": 5017,
        "name_th": "ดอยเต่า",
        "name_en": "Doi Tao",
        "zip_code": "50260"
      },
      {
        "id": 5009,
        "name_th": "ฝาง",
        "name_en": "Fang",
        "zip_code": "50110"
      },
      {
        "id": 5011,
        "name_th": "พร้าว",
        "name_en": "Phrao",
        "zip_code": "50190"
      },
      {
        "id": 5008,
        "name_th": "สะเมิง",
        "name_en": "Samoeng",
        "zip_code": "50250"
      },
      {
        "id": 5013,
        "name_th": "สันกำแพง",
        "name_en": "San Kamphaeng",
        "zip_code": "50130"
      },
      {
        "id": 5014,
        "name_th": "สันทราย",
        "name_en": "San Sai",
        "zip_code": "50210"
      },
      {
        "id": 5012,
        "name_th": "สันป่าตอง",
        "name_en": "San Pa Tong",
        "zip_code": "50120"
      },
      {
        "id": 5019,
        "name_th": "สารภี",
        "name_en": "Saraphi",
        "zip_code": "50140"
      },
      {
        "id": 5015,
        "name_th": "หางดง",
        "name_en": "Hang Dong",
        "zip_code": "50230"
      },
      {
        "id": 5018,
        "name_th": "อมก๋อย",
        "name_en": "Omkoi",
        "zip_code": "50310"
      },
      {
        "id": 5016,
        "name_th": "ฮอด",
        "name_en": "Hot",
        "zip_code": "50240"
      },
      {
        "id": 5004,
        "name_th": "เชียงดาว",
        "name_en": "Chiang Dao",
        "zip_code": "50170"
      },
      {
        "id": 5001,
        "name_th": "เมืองเชียงใหม่",
        "name_en": "Mueang Chiang Mai",
        "zip_code": "50200"
      },
      {
        "id": 5020,
        "name_th": "เวียงแหง",
        "name_en": "Wiang Haeng",
        "zip_code": "50350"
      },
      {
        "id": 5007,
        "name_th": "แม่ริม",
        "name_en": "Mae Rim",
        "zip_code": "50180"
      },
      {
        "id": 5022,
        "name_th": "แม่วาง",
        "name_en": "Mae Wang",
        "zip_code": "50360"
      },
      {
        "id": 5023,
        "name_th": "แม่ออน",
        "name_en": "Mae On",
        "zip_code": "50130"
      },
      {
        "id": 5010,
        "name_th": "แม่อาย",
        "name_en": "Mae Ai",
        "zip_code": "50280"
      },
      {
        "id": 5003,
        "name_th": "แม่แจ่ม",
        "name_en": "Mae Chaem",
        "zip_code": "50270"
      },
      {
        "id": 5006,
        "name_th": "แม่แตง",
        "name_en": "Mae Taeng",
        "zip_code": "50150"
      },
      {
        "id": 5021,
        "name_th": "ไชยปราการ",
        "name_en": "Chai Prakan",
        "zip_code": "50320"
      }
    ]
  },
  {
    "id": 61,
    "name_th": "เพชรบุรี",
    "name_en": "Phetchaburi",
    "districts": [
      {
        "id": 7604,
        "name_th": "ชะอำ",
        "name_en": "Cha-am",
        "zip_code": "76120"
      },
      {
        "id": 7605,
        "name_th": "ท่ายาง",
        "name_en": "Tha Yang",
        "zip_code": "76130"
      },
      {
        "id": 7606,
        "name_th": "บ้านลาด",
        "name_en": "Ban Lat",
        "zip_code": "76150"
      },
      {
        "id": 7607,
        "name_th": "บ้านแหลม",
        "name_en": "Ban Laem",
        "zip_code": "76110"
      },
      {
        "id": 7603,
        "name_th": "หนองหญ้าปล้อง",
        "name_en": "Nong Ya Plong",
        "zip_code": "76160"
      },
      {
        "id": 7602,
        "name_th": "เขาย้อย",
        "name_en": "Khao Yoi",
        "zip_code": "76140"
      },
      {
        "id": 7601,
        "name_th": "เมืองเพชรบุรี",
        "name_en": "Mueang Phetchaburi",
        "zip_code": "76000"
      },
      {
        "id": 7608,
        "name_th": "แก่งกระจาน",
        "name_en": "Kaeng Krachan",
        "zip_code": "76170"
      }
    ]
  },
  {
    "id": 54,
    "name_th": "เพชรบูรณ์",
    "name_en": "Phetchabun",
    "districts": [
      {
        "id": 6702,
        "name_th": "ชนแดน",
        "name_en": "Chon Daen",
        "zip_code": "67150"
      },
      {
        "id": 6709,
        "name_th": "น้ำหนาว",
        "name_en": "Nam Nao",
        "zip_code": "67260"
      },
      {
        "id": 6708,
        "name_th": "บึงสามพัน",
        "name_en": "Bueng Sam Phan",
        "zip_code": "67160"
      },
      {
        "id": 6710,
        "name_th": "วังโป่ง",
        "name_en": "Wang Pong",
        "zip_code": "67240"
      },
      {
        "id": 6705,
        "name_th": "วิเชียรบุรี",
        "name_en": "Wichian Buri",
        "zip_code": "67130"
      },
      {
        "id": 6706,
        "name_th": "ศรีเทพ",
        "name_en": "Si Thep",
        "zip_code": "67170"
      },
      {
        "id": 6707,
        "name_th": "หนองไผ่",
        "name_en": "Nong Phai",
        "zip_code": "67140"
      },
      {
        "id": 6703,
        "name_th": "หล่มสัก",
        "name_en": "Lom Sak",
        "zip_code": "67110"
      },
      {
        "id": 6704,
        "name_th": "หล่มเก่า",
        "name_en": "Lom Kao",
        "zip_code": "67120"
      },
      {
        "id": 6711,
        "name_th": "เขาค้อ",
        "name_en": "Khao Kho",
        "zip_code": "67270"
      },
      {
        "id": 6701,
        "name_th": "เมืองเพชรบูรณ์",
        "name_en": "Mueang Phetchabun",
        "zip_code": "67000"
      }
    ]
  },
  {
    "id": 30,
    "name_th": "เลย",
    "name_en": "Loei",
    "districts": [
      {
        "id": 4205,
        "name_th": "ด่านซ้าย",
        "name_en": "Dan Sai",
        "zip_code": "42120"
      },
      {
        "id": 4208,
        "name_th": "ท่าลี่",
        "name_en": "Tha Li",
        "zip_code": "42140"
      },
      {
        "id": 4202,
        "name_th": "นาด้วง",
        "name_en": "Na Duang",
        "zip_code": "42210"
      },
      {
        "id": 4206,
        "name_th": "นาแห้ว",
        "name_en": "Na Haeo",
        "zip_code": "42170"
      },
      {
        "id": 4204,
        "name_th": "ปากชม",
        "name_en": "Pak Chom",
        "zip_code": "42150"
      },
      {
        "id": 4212,
        "name_th": "ผาขาว",
        "name_en": "Pha Khao",
        "zip_code": "42240"
      },
      {
        "id": 4210,
        "name_th": "ภูกระดึง",
        "name_en": "Phu Kradueng",
        "zip_code": "42180"
      },
      {
        "id": 4211,
        "name_th": "ภูหลวง",
        "name_en": "Phu Luang",
        "zip_code": "42230"
      },
      {
        "id": 4207,
        "name_th": "ภูเรือ",
        "name_en": "Phu Ruea",
        "zip_code": "42160"
      },
      {
        "id": 4209,
        "name_th": "วังสะพุง",
        "name_en": "Wang Saphung",
        "zip_code": "42130"
      },
      {
        "id": 4214,
        "name_th": "หนองหิน",
        "name_en": "Nong Hin",
        "zip_code": "42190"
      },
      {
        "id": 4203,
        "name_th": "เชียงคาน",
        "name_en": "Chiang Khan",
        "zip_code": "42110"
      },
      {
        "id": 4201,
        "name_th": "เมืองเลย",
        "name_en": "Mueang Loei",
        "zip_code": "42000"
      },
      {
        "id": 4213,
        "name_th": "เอราวัณ",
        "name_en": "Erawan",
        "zip_code": "42220"
      }
    ]
  },
  {
    "id": 42,
    "name_th": "แพร่",
    "name_en": "Phrae",
    "districts": [
      {
        "id": 5402,
        "name_th": "ร้องกวาง",
        "name_en": "Rong Kwang",
        "zip_code": "54140"
      },
      {
        "id": 5403,
        "name_th": "ลอง",
        "name_en": "Long",
        "zip_code": "54150"
      },
      {
        "id": 5407,
        "name_th": "วังชิ้น",
        "name_en": "Wang Chin",
        "zip_code": "54160"
      },
      {
        "id": 5406,
        "name_th": "สอง",
        "name_en": "Song",
        "zip_code": "54120"
      },
      {
        "id": 5404,
        "name_th": "สูงเม่น",
        "name_en": "Sung Men",
        "zip_code": "54130"
      },
      {
        "id": 5408,
        "name_th": "หนองม่วงไข่",
        "name_en": "Nong Muang Khai",
        "zip_code": "54170"
      },
      {
        "id": 5405,
        "name_th": "เด่นชัย",
        "name_en": "Den Chai",
        "zip_code": "54110"
      },
      {
        "id": 5401,
        "name_th": "เมืองแพร่",
        "name_en": "Mueang Phrae",
        "zip_code": "54000"
      }
    ]
  },
  {
    "id": 46,
    "name_th": "แม่ฮ่องสอน",
    "name_en": "Mae Hong Son",
    "districts": [
      {
        "id": 5802,
        "name_th": "ขุนยวม",
        "name_en": "Khun Yuam",
        "zip_code": "58140"
      },
      {
        "id": 5807,
        "name_th": "ปางมะผ้า",
        "name_en": "Pang Mapha",
        "zip_code": "58150"
      },
      {
        "id": 5803,
        "name_th": "ปาย",
        "name_en": "Pai",
        "zip_code": "58130"
      },
      {
        "id": 5806,
        "name_th": "สบเมย",
        "name_en": "Sop Moei",
        "zip_code": "58110"
      },
      {
        "id": 5801,
        "name_th": "เมืองแม่ฮ่องสอน",
        "name_en": "Mueang Mae Hong Son",
        "zip_code": "58000"
      },
      {
        "id": 5805,
        "name_th": "แม่ลาน้อย",
        "name_en": "Mae La Noi",
        "zip_code": "58120"
      },
      {
        "id": 5804,
        "name_th": "แม่สะเรียง",
        "name_en": "Mae Sariang",
        "zip_code": "58110"
      }
    ]
  }
];

// บรรทัดที่ 15: ฟังก์ชันดึงรายชื่อจังหวัดทั้งหมด เรียงตามภาษาที่เลือก (กทม. อยู่บนสุดเสมอ)
export function getProvincesList(lang = 'th') {
  // สร้างสำเนาข้อมูลจังหวัด
  const provinces = [...THAI_PROVINCES_DATA];
  // กรุงเทพฯ อยู่ตำแหน่งแรกเสมอ
  const bkk = provinces.find((p) => p.id === 1);
  const others = provinces.filter((p) => p.id !== 1);

  // เรียงลำดับตามตัวอักษรของภาษาที่เลือก
  others.sort((a, b) => {
    const nameA = lang === 'en' ? a.name_en : a.name_th;
    const nameB = lang === 'en' ? b.name_en : b.name_th;
    return nameA.localeCompare(nameB, lang === 'en' ? 'en' : 'th');
  });

  return bkk ? [bkk, ...others] : others;
}

// บรรทัดที่ 34: ฟังก์ชันค้นหาข้อมูลจังหวัดจากชื่อ (รองรับทั้งภาษาไทยและอังกฤษ หรือ ID)
export function findProvince(provinceIdentifier) {
  if (!provinceIdentifier) return null;
  const search = String(provinceIdentifier).trim().toLowerCase();

  return THAI_PROVINCES_DATA.find((p) => {
    return (
      String(p.id) === search ||
      p.name_en.toLowerCase() === search ||
      p.name_th.toLowerCase() === search
    );
  }) || null;
}

// บรรทัดที่ 49: ฟังก์ชันดึงรายชื่ออำเภอ/เขตตามจังหวัดที่เลือก
export function getDistrictsByProvince(provinceIdentifier, lang = 'th') {
  const province = findProvince(provinceIdentifier);
  if (!province || !province.districts) return [];

  const districts = [...province.districts];
  // เรียงลำดับอำเภอตามตัวอักษรของภาษาที่เลือก
  districts.sort((a, b) => {
    const nameA = lang === 'en' ? a.name_en : a.name_th;
    const nameB = lang === 'en' ? b.name_en : b.name_th;
    return nameA.localeCompare(nameB, lang === 'en' ? 'en' : 'th');
  });

  return districts;
}

// บรรทัดที่ 66: ฟังก์ชันค้นหาอำเภอ/เขต และคืนค่ารหัสไปรษณีย์หลัก
export function getPostalCodeForDistrict(provinceIdentifier, districtIdentifier) {
  const districts = getDistrictsByProvince(provinceIdentifier);
  if (!districts.length || !districtIdentifier) return '';

  const search = String(districtIdentifier).trim().toLowerCase();
  const matched = districts.find((d) => {
    return (
      String(d.id) === search ||
      d.name_en.toLowerCase() === search ||
      d.name_th.toLowerCase() === search ||
      // เผื่อกรณีค้นหาแบบตัดคำว่า 'เขต' หรือ 'อำเภอ'
      d.name_th.replace(/^(เขต|อำเภอ)/, '').toLowerCase() === search
    );
  });

  return matched ? matched.zip_code : '';
}
