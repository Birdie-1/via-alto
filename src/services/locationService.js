/**
 * =========================================================================
 * VIA ALTO — บริการจัดการข้อมูลที่อยู่และภูมิศาสตร์ (Location Service)
 * สำหรับหน้า Checkout Form ในการดึงรายชื่อจังหวัด อำเภอ/เขต และรหัสไปรษณีย์
 * ทำงานได้ทั้งแบบ Local Instant (0ms) และรองรับการเชื่อมต่อ API ของระบบ
 * =========================================================================
 */

import {
  THAI_PROVINCES_DATA,
  getProvincesList,
  getDistrictsByProvince,
  findProvince,
  getPostalCodeForDistrict
} from '../data/thaiLocations.js';

// บรรทัดที่ 18: กำหนด Base URL สำหรับ API ฝั่ง PHP (ถ้ามี)
const API_BASE_URL = typeof window !== 'undefined' && window.location.origin
  ? window.location.origin
  : '';

/**
 * บรรทัดที่ 25: ดึงรายชื่อ 77 จังหวัดทั้งหมด
 * @param {string} lang - 'th' หรือ 'en' สำหรับการจัดเรียงลำดับ
 * @returns {Promise<Array>} รายการจังหวัด { id, name_th, name_en }
 */
export async function fetchProvinces(lang = 'th') {
  // บรรทัดที่ 30: ลองดึงจาก Local Dataset ทันทีเพื่อความเร็วระดับ 0ms และความเสถียร 100%
  try {
    const list = getProvincesList(lang);
    if (list && list.length > 0) {
      return list;
    }
  } catch (err) {
    console.warn('⚠️ Local provinces data fallback triggered:', err);
  }

  // บรรทัดที่ 40: หากจำเป็นต้องยิงผ่าน API ให้เรียกไปยัง Endpoint ของเรา
  try {
    const res = await fetch(API_BASE_URL + '/backend/api/locations.php?action=provinces');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }
    }
  } catch (apiErr) {
    console.warn('⚠️ Locations API unreachable, using local dataset:', apiErr);
  }

  return getProvincesList(lang);
}

/**
 * บรรทัดที่ 57: ดึงรายชื่ออำเภอ/เขตเฉพาะจังหวัดที่เลือก
 * @param {string|number} provinceIdentifier - ชื่อจังหวัด (ไทย/อังกฤษ) หรือ ID
 * @param {string} lang - 'th' หรือ 'en' สำหรับการจัดเรียงลำดับ
 * @returns {Promise<Array>} รายการอำเภอ { id, name_th, name_en, zip_code }
 */
export async function fetchDistricts(provinceIdentifier, lang = 'th') {
  if (!provinceIdentifier) return [];

  // บรรทัดที่ 66: ดึงจาก Local Dataset ทันที (0ms Latency)
  try {
    const districts = getDistrictsByProvince(provinceIdentifier, lang);
    if (districts && districts.length > 0) {
      return districts;
    }
  } catch (err) {
    console.warn('⚠️ Local districts data fallback triggered:', err);
  }

  // บรรทัดที่ 76: สำรองกรณีดึงผ่าน Backend API
  try {
    const url = `${API_BASE_URL}/backend/api/locations.php?action=districts&province=${encodeURIComponent(provinceIdentifier)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }
    }
  } catch (apiErr) {
    console.warn('⚠️ Districts API unreachable:', apiErr);
  }

  return getDistrictsByProvince(provinceIdentifier, lang);
}

/**
 * บรรทัดที่ 95: ดึงรหัสไปรษณีย์อัตโนมัติสำหรับอำเภอและจังหวัดที่ระบุ
 * @param {string} province - ชื่อจังหวัด
 * @param {string} district - ชื่ออำเภอ/เขต
 * @returns {string} รหัสไปรษณีย์ 5 หลัก (เช่น '10110')
 */
export function fetchPostalCode(province, district) {
  if (!province || !district) return '';
  return getPostalCodeForDistrict(province, district) || '';
}

// บรรทัดที่ 106: ส่งออกฟังก์ชันค้นหาข้อมูลจังหวัด
export { findProvince };
