<?php
/**
 * ==============================================================================================
 * ไฟล์: subscribe.php
 * คำอธิบาย: REST API Endpoint สำหรับรับข้อมูลการสมัครรับข่าวสารจากหน้าเว็บ React (Storefront)
 * สอดคล้องกับ: โจทย์การบ้านขั้นตอนที่ 2 (Step 2: ส่ง Welcome Email พร้อมรหัสส่วนลดหลัง Subscribe)
 * ==============================================================================================
 */

// โหลดไฟล์คอนฟิกการตั้งค่าระบบ (CORS, Driver, ข้อมูลผู้ส่ง)
require_once __DIR__ . '/config.php';
// โหลดฟังก์ชันส่งอีเมลกลาง sendViaAltoEmail
require_once __DIR__ . '/mailer.php';
// โหลดระบบตรวจสอบและจำกัดอัตราการส่งอีเมล (Rate Limiting)
require_once __DIR__ . '/rate_limiter.php';
// โหลดเทมเพลตอีเมลต้อนรับ renderWelcomeEmail
require_once __DIR__ . '/templates/welcome_email.php';

// เรียกฟังก์ชันจัดการ CORS เพื่ออนุญาตให้ Frontend (localhost:5173) เรียกใช้งาน API ได้
handleCors();

// ตรวจสอบ IP Rate Limit: ป้องกันการส่งสแปม กำหนดไม่เกิน 10 ครั้งต่อ 5 นาทีต่อ 1 IP
checkRateLimit('subscribe', 10, 300);

// ตรวจสอบ HTTP Method: ต้องส่งมาด้วยเมธอด POST เท่านั้น
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    // กำหนด HTTP Status 405 Method Not Allowed
    http_response_code(405);
    // ส่งข้อความแจ้งเตือนความผิดพลาดกลับเป็น JSON
    echo json_encode([
        'success' => false,
        'error' => 'Method Not Allowed. Use POST.'
    ]);
    // จบการทำงานของสคริปต์
    exit();
}

// อ่านข้อมูล Request Body แบบ Raw Input (สำหรับคำขอที่ส่งมาจาก Fetch API แบบ JSON)
$rawInput = file_get_contents('php://input');
// แปลงข้อความ JSON ให้กลายเป็น Associative Array
$input = !empty($rawInput) ? json_decode($rawInput, true) : null;
// หากไม่ได้ส่งมาแบบ JSON ให้รองรับการส่งผ่าน Form POST ($_POST)
if (!$input) {
    $input = $_POST;
}

// ตรวจสอบและกรองอีเมลด้วย FILTER_VALIDATE_EMAIL (หากผิดรูปแบบจะได้ค่า false)
$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
// ตัดช่องว่างหน้าหลังของชื่อผู้สมัคร หากไม่ได้ระบุให้ใช้ชื่อเริ่มต้นว่า 'Explorer'
$name = trim($input['name'] ?? '') ?: 'Explorer';
// บันทึกแหล่งที่มาของการสมัคร (เช่น homepage_cta หรือ footer)
$source = trim($input['source'] ?? 'homepage_cta');

// ถ้าอีเมลไม่ถูกต้องหรือไม่ระบุ ให้ตอบกลับเป็น Error 400 Bad Request
if (!$email) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid email address provided.'
    ]);
    exit();
}

// โหลดค่าคอนฟิกูเรชันทั้งหมด
$config = require __DIR__ . '/config.php';

// ----------------------------------------------------------------------------------------------
// ขั้นตอนที่ 1: บันทึกข้อมูลผู้สมัครลงในไฟล์ JSON Storage เพื่อเก็บประวัติการสมัคร
// ----------------------------------------------------------------------------------------------
// กำหนดโฟลเดอร์สำหรับเก็บข้อมูล
$dataDir = __DIR__ . '/data';
// หากโฟลเดอร์ยังไม่มีอยู่ ให้สร้างโฟลเดอร์ขึ้นมาใหม่พร้อมสิทธิ์ 0777
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}
// กำหนดพาธของไฟล์ subscribers.json
$subscribersFile = $dataDir . '/subscribers.json';
// โหลดข้อมูลผู้สมัครเดิมจากไฟล์ ถ้ายังไม่มีไฟล์ให้เริ่มจาก Array ว่าง
$subscribers = file_exists($subscribersFile) ? json_decode(file_get_contents($subscribersFile), true) : [];
// เพิ่มข้อมูลผู้สมัครใหม่ลงใน Array
$subscribers[] = [
    'email' => $email,
    'name' => $name,
    'source' => $source,
    'subscribed_at' => date('c') // บันทึกวันเวลาตามมาตรฐาน ISO 8601
];
// เขียนข้อมูลกลับลงไฟล์ subscribers.json ในรูปแบบ Pretty Print ให้อ่านง่าย
file_put_contents($subscribersFile, json_encode($subscribers, JSON_PRETTY_PRINT));

// ----------------------------------------------------------------------------------------------
// ขั้นตอนที่ 2: สร้างเนื้อหาอีเมล HTML จากเทมเพลต (Template Rendering)
// ----------------------------------------------------------------------------------------------
// เตรียมข้อมูลสำหรับส่งเข้าเทมเพลตอีเมล
$emailData = [
    'name' => $name,
    'email' => $email,
    'code' => 'GOBEYOND10', // รหัสคูปองต้อนรับลด 10%
    'discount' => '10% OFF YOUR FIRST ORDER!',
    'site_url' => $config['site_url']
];
// เรียกใช้ฟังก์ชัน renderWelcomeEmail เพื่อเรนเดอร์โครงสร้าง HTML ของอีเมล
$htmlBody = renderWelcomeEmail($emailData);
// กำหนดหัวข้อของอีเมล (Subject)
$subject = '🏔️ Welcome to VIA ALTO — Your Special Welcome Gift: 10% OFF!';

// ----------------------------------------------------------------------------------------------
// ขั้นตอนที่ 3: ส่งอีเมลไปยังลูกค้าผ่าน PHPMailer / Mail Driver
// ----------------------------------------------------------------------------------------------
// เรียกใช้ฟังก์ชันส่งอีเมลกลาง ซึ่งรองรับทั้งโหมด SMTP ส่งจริง หรือโหมด Log จำลองบันทึกไฟล์
$result = sendViaAltoEmail($email, $name, $subject, $htmlBody);

// ----------------------------------------------------------------------------------------------
// ขั้นตอนที่ 4: ส่งผลลัพธ์กลับไปยังหน้าเว็บ React ในรูปแบบ JSON
// ----------------------------------------------------------------------------------------------
// กำหนด HTTP Status Code: ถ้าส่งสำเร็จเป็น 200 OK, ถ้าล้มเหลวเป็น 500 Internal Server Error
http_response_code($result['success'] ? 200 : 500);
// แปลงผลลัพธ์เป็น JSON และส่งกลับไปยังผู้เรียกใช้งาน
echo json_encode([
    'success' => $result['success'],
    'message' => $result['message'],
    'driver' => $result['driver'],
    'email' => $email,
    'voucher_code' => 'GOBEYOND10',
    'preview_url' => $result['preview_url'] ?? null
]);
