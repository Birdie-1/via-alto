/**
 * VIA ALTO — Email Backend Client Service
 * เซอร์วิสฝั่ง Frontend (React) สำหรับเชื่อมต่อไปยัง Backend PHP เพื่อส่งอีเมล
 * ครอบคลุมทั้ง Step 2 (Newsletter Subscription) และ Step 4 (Registration Welcome & Personalized Recommendation)
 */

// บรรทัดที่ 8: กำหนด Base Path สำหรับเรียกผ่าน Vite Proxy (ช่วยเลี่ยงปัญหา CORS ในช่วง Development)
const PHP_API_BASE = '/php-api';
// บรรทัดที่ 10: กำหนด Direct URL ไปยังเซิร์ฟเวอร์ PHP พอร์ต 8000 เผื่อกรณีไม่ได้รันผ่าน Vite Proxy
const DIRECT_PHP_URL = 'http://localhost:8000';

/**
 * Step 2: ฟังก์ชันส่งอีเมลต้อนรับเมื่อผู้ใช้กรอกฟอร์ม Newsletter Subscription
 * @param {string} email - อีเมลของผู้สมัคร
 * @param {string} name - ชื่อของผู้สมัคร (ค่าเริ่มต้น 'Explorer')
 * @param {string} source - แหล่งที่มา เช่น 'homepage_cta' หรือ 'footer'
 */
export async function sendSubscribeEmail(email, name = 'Explorer', source = 'homepage_cta') {
  // บรรทัดที่ 20: จัดเตรียมข้อมูล Payload ที่จะส่งไปยัง Backend ในรูปแบบ Object
  const payload = { email, name, source };

  try {
    // บรรทัดที่ 24: พยายามยิงคำขอ POST ผ่าน Vite Proxy ไปที่ sendMail.php เป็นลำดับแรก
    let response = await fetch(`${PHP_API_BASE}/sendMail.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => null);

    // บรรทัดที่ 31: หากผ่าน Proxy ไม่สำเร็จ ให้ลองยิงตรงไปที่ PHP Server พอร์ต 8000
    if (!response || !response.ok) {
      response = await fetch(`${DIRECT_PHP_URL}/sendMail.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);
    }

    // บรรทัดที่ 40: หาก sendMail.php ใช้งานไม่ได้ ให้ Fallback ไปยัง subscribe.php
    if (!response || !response.ok) {
      response = await fetch(`${PHP_API_BASE}/subscribe.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);
    }

    // บรรทัดที่ 49: หากได้รับ Response สำเร็จ (HTTP Status 200 OK)
    if (response && response.ok) {
      // บรรทัดที่ 51: ถอดรหัสผลลัพธ์เป็น JSON Object
      const data = await response.json();
      // บรรทัดที่ 53: พิมพ์ Log ยืนยันผลลัพธ์ลง Console
      console.log('✅ PHP Email Service [sendMail.php]:', data);
      // บรรทัดที่ 55: ส่งคืนค่าความสำเร็จพร้อมข้อมูลกลับไปยัง Component
      return { success: true, data };
    }
  } catch (err) {
    // บรรทัดที่ 59: ดักจับ Error และแจ้งเตือนใน Console หากเซิร์ฟเวอร์ PHP ปิดอยู่
    console.warn('⚠️ PHP Email Service unavailable, using client-side fallback:', err);
  }

  // บรรทัดที่ 63: โหมดจำลองผลลัพธ์ (Offline Simulation) กรณีเซิร์ฟเวอร์ PHP ไม่ได้เปิดอยู่ เพื่อให้ระบบทำงานต่อได้ไม่ค้าง
  return {
    success: true,
    simulated: true,
    message: 'Subscription recorded (offline preview mode)'
  };
}

/**
 * Step 4: ฟังก์ชันส่งอีเมลต้อนรับสมาชิกใหม่และแนะนำสินค้าเฉพาะบุคคล (Personalized Recommendation)
 * @param {Object} user - ข้อมูลผู้ใช้ที่เพิ่งลงทะเบียนเสร็จสมบูรณ์
 */
export async function sendRegisterWelcomeEmail(user) {
  // บรรทัดที่ 75: ตรวจสอบความถูกต้อง หากไม่มีข้อมูลผู้ใช้หรือไม่มีอีเมลให้ข้ามการทำงานทันที
  if (!user || !user.email) return;

  // บรรทัดที่ 78: จัดเตรียม Payload ส่งข้อมูลอีเมล ชื่อ และโปรไฟล์ความสนใจ (marketingProfile)
  const payload = {
    email: user.email,
    fullName: user.fullName || 'Explorer',
    marketingProfile: user.marketingProfile || {}
  };

  try {
    // บรรทัดที่ 86: ส่งคำขอ POST ผ่าน Vite Proxy ไปยัง register_welcome.php
    let response = await fetch(`${PHP_API_BASE}/register_welcome.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => null);

    // บรรทัดที่ 93: หากผ่าน Proxy ไม่ได้ ให้ลองส่งตรงไปยังพอร์ต 8000
    if (!response || !response.ok) {
      response = await fetch(`${DIRECT_PHP_URL}/register_welcome.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);
    }

    // บรรทัดที่ 102: หากส่งคำขอสำเร็จและได้ผลตอบกลับ 200 OK
    if (response && response.ok) {
      // บรรทัดที่ 104: แปลงข้อมูล Response เป็น JSON
      const data = await response.json();
      // บรรทัดที่ 106: พิมพ์ Log ยืนยันการส่งอีเมลต้อนรับพร้อมสินค้าแนะนำลง Console
      console.log('✅ PHP Email Service [register_welcome.php]:', data);
      // บรรทัดที่ 108: ส่งคืนค่าความสำเร็จกลับไปให้หน้า UI
      return { success: true, data };
    }
  } catch (err) {
    // บรรทัดที่ 112: แจ้งเตือนข้อผิดพลาดใน Console
    console.warn('⚠️ PHP Email Service unavailable:', err);
  }

  // บรรทัดที่ 116: กรณีเซิร์ฟเวอร์ PHP ปิดอยู่ ส่งสถานะจำลองสำเร็จเพื่อไม่ให้ขัดขวาง UX การสมัครสมาชิก
  return { success: true, simulated: true };
}
