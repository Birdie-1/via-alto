<?php
/**
 * ==============================================================================================
 * ไฟล์: backend/send_receipt.php
 * คำอธิบาย: API Endpoint สำหรับส่งอีเมลใบเสร็จรับเงินอิเล็กทรอนิกส์ (E-Receipt) หลังจากลูกค้าทำการสั่งซื้อสินค้าสำเร็จ
 * ฟังก์ชันหลัก:
 *   1. รับข้อมูลคำสั่งซื้อ (Order Data) และข้อมูลลูกค้า (User Data) ผ่าน JSON POST
 *   2. ตรวจสอบความถูกต้องของข้อมูล (Validation) และระบบป้องกันการส่งถี่เกินกำหนด (Rate Limiting)
 *   3. คัดกรอง URL ของเว็บไซต์ ไม่ให้มี localhost เพื่อให้ลิงก์เปิดได้ทุกที่ (ชี้ไปที่ GitHub Pages)
 *   4. ประกอบเทมเพลตอีเมลสไตล์ "Dolomite Classic" (templates/receipt_email.php)
 *   5. ส่งอีเมลผ่าน sendViaAltoEmail() (รองรับทั้ง SMTP ส่งจริง และ Log Driver จำลองการส่ง)
 * ==============================================================================================
 */

// บรรทัดที่ 16: โหลดการตั้งค่าระบบหลักและฟังก์ชัน CORS จาก config.php
require_once __DIR__ . '/config.php';
// บรรทัดที่ 18: โหลดระบบจัดการส่งอีเมล PHPMailer และ Log Preview จาก mailer.php
require_once __DIR__ . '/mailer.php';
// บรรทัดที่ 20: โหลดระบบป้องกันการส่งสแปม/จำกัดอัตราการส่ง (Rate Limiting)
require_once __DIR__ . '/rate_limiter.php';
// บรรทัดที่ 22: โหลดฟังก์ชันสร้างเทมเพลต E-Receipt Dolomite Classic (renderReceiptEmail)
require_once __DIR__ . '/templates/receipt_email.php';

// บรรทัดที่ 25: เรียกใช้งานฟังก์ชัน CORS Header เพื่ออนุญาตให้ Frontend เรียกใช้งานได้อย่างปลอดภัย
handleCors();

// บรรทัดที่ 28: ตรวจสอบ Rate Limit ป้องกันการยิงสแปม (อนุญาตสูงสุด 15 ครั้งต่อ 5 นาทีต่อ 1 IP)
checkRateLimit('send_receipt', 15, 300);

// บรรทัดที่ 31: ตรวจสอบ HTTP Method ต้องส่งมาด้วยรูปแบบ POST เท่านั้น
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    // บรรทัดที่ 33: กำหนด HTTP Status 405 Method Not Allowed
    http_response_code(405);
    // บรรทัดที่ 35: ตอบกลับข้อความแจ้งเตือนเป็น JSON
    echo json_encode([
        'success' => false,
        'error' => 'Method Not Allowed. กรุณาใช้คำขอประเภท POST'
    ]);
    exit();
}

// บรรทัดที่ 42: อ่านข้อมูล Request Body ที่ส่งมาแบบ JSON จากฝั่ง React Frontend
$rawInput = file_get_contents('php://input');
// บรรทัดที่ 44: ถอดรหัส JSON เป็น Associative Array
$input = json_decode($rawInput, true);

// บรรทัดที่ 47: หากไม่มี JSON หรือข้อมูลผิดพลาด ให้ลองดึงจาก $_POST สำรอง
if (!$input) {
    $input = $_POST;
}

// บรรทัดที่ 52: ดึงข้อมูลคำสั่งซื้อ (Order Object)
$order = $input['order'] ?? $input;
// บรรทัดที่ 54: ดึงข้อมูลลูกค้า (User Object)
$user = $input['user'] ?? [];

// บรรทัดที่ 57: ตรวจสอบและดึงที่อยู่อีเมลของผู้รับ (Customer Email)
// ค้นหาตามลำดับ: order.shippingAddress.email -> user.email -> input.email
$rawEmail = $order['shippingAddress']['email'] 
    ?? $user['email'] 
    ?? $input['email'] 
    ?? '';
// บรรทัดที่ 63: ตรวจสอบรูปแบบอีเมลให้ถูกต้องตามมาตรฐาน
$toEmail = filter_var($rawEmail, FILTER_VALIDATE_EMAIL);

// บรรทัดที่ 66: หากไม่พบอีเมลหรือรูปแบบไม่ถูกต้อง ให้ตอบกลับ Error 400 Bad Request
if (!$toEmail) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'ไม่พบที่อยู่อีเมลที่ถูกต้องสำหรับจัดส่งใบเสร็จ (Invalid or missing email).'
    ]);
    exit();
}

// บรรทัดที่ 76: ดึงชื่อลูกค้าเพื่อแสดงบนหัวอีเมล
$toName = trim(
    $order['shippingAddress']['fullName'] 
    ?? $user['fullName'] 
    ?? $user['name'] 
    ?? $input['name'] 
    ?? 'Explorer'
);

// บรรทัดที่ 84: โหลดการตั้งค่าระบบหลักเพื่อตรวจสอบ Site URL
$config = require __DIR__ . '/config.php';
// บรรทัดที่ 86: คัดกรอง Site URL โดยห้ามใช้ localhost เพื่อให้ลิงก์ในอีเมลชี้ไปที่ GitHub Pages เสมอ
$rawSiteUrl = $input['site_url'] ?? $config['site_url'] ?? '';
$siteUrl = (!empty($rawSiteUrl) && !str_contains($rawSiteUrl, 'localhost') && !str_contains($rawSiteUrl, '127.0.0.1'))
    ? rtrim($rawSiteUrl, '/')
    : 'https://birdie-1.github.io/via-alto';

// บรรทัดที่ 92: ตรวจสอบรูปภาพโลโก้แบรนด์สำหรับแนบแบบ CID (Inline Attachment)
$logoPath = __DIR__ . '/images/circular_logo.png';
$embeddedImages = [];
$useCid = false;

// บรรทัดที่ 97: หากมีไฟล์โลโก้อยู่จริง ให้จัดเตรียมสำหรับการแนบแบบ CID
if (file_exists($logoPath)) {
    $embeddedImages[] = [
        'path' => $logoPath,
        'cid' => 'brand_logo',
        'name' => 'circular_logo.png',
        'mime' => 'image/png'
    ];
    $useCid = true;
}

// บรรทัดที่ 108: สร้างเนื้อหา HTML ของใบเสร็จรับเงินผ่านเทมเพลต Dolomite Classic
$htmlBody = renderReceiptEmail($order, $user, [
    'site_url' => $siteUrl,
    'use_cid' => $useCid
]);

// บรรทัดที่ 114: สร้างข้อความสำรองแบบ Plain Text กรณีอีเมลไคลเอนต์ไม่รองรับ HTML
$orderId = $order['orderId'] ?? 'VA-2026';
$grandTotal = number_format(floatval($order['total'] ?? 0));
$altBody = "VIA ALTO — ใบเสร็จรับเงินอิเล็กทรอนิกส์ (E-Receipt)\n"
    . "หมายเลขคำสั่งซื้อ: #{$orderId}\n"
    . "ผู้รับ: {$toName}\n"
    . "ยอดสุทธิทั้งสิ้น: ฿{$grandTotal}\n"
    . "ตรวจสอบรายละเอียดคำสั่งซื้อได้ที่: {$siteUrl}/?page=account&tab=orders\n"
    . "ขอขอบคุณที่เลือกใช้อุปกรณ์จาก VIA ALTO (GO BEYOND.)";

// บรรทัดที่ 124: กำหนดหัวข้ออีเมล (Email Subject)
$subject = "🧾 ใบเสร็จรับเงินคำสั่งซื้อ #{$orderId} — VIA ALTO";

// บรรทัดที่ 127: ทำการส่งอีเมลผ่านฟังก์ชันกลาง sendViaAltoEmail()
$sendResult = sendViaAltoEmail(
    $toEmail,
    $toName,
    $subject,
    $htmlBody,
    $altBody,
    $embeddedImages
);

// บรรทัดที่ 137: บันทึกประวัติการสร้างใบเสร็จลงใน receipts.json สำหรับตรวจสอบย้อนหลัง
$receiptsLogFile = __DIR__ . '/logs/receipts.json';
$receiptRecord = [
    'orderId' => $orderId,
    'email' => $toEmail,
    'name' => $toName,
    'total' => $order['total'] ?? 0,
    'pointsEarned' => $order['pointsEarned'] ?? 0,
    'sentAt' => date('c'),
    'driver' => $sendResult['driver'] ?? 'unknown',
    'status' => $sendResult['success'] ? 'sent' : 'failed'
];

// บรรทัดที่ 150: อ่านประวัติเดิมแล้วต่อท้ายข้อมูลใหม่เข้าไป
$existingReceipts = file_exists($receiptsLogFile) 
    ? json_decode(file_get_contents($receiptsLogFile), true) ?: []
    : [];
$existingReceipts[] = $receiptRecord;
// บรรทัดที่ 155: บันทึกข้อมูลกลับลงไฟล์แบบ JSON สวยงาม
if (!is_dir(__DIR__ . '/logs')) {
    mkdir(__DIR__ . '/logs', 0777, true);
}
file_put_contents($receiptsLogFile, json_encode($existingReceipts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// บรรทัดที่ 161: ส่งผลลัพธ์การทำงานกลับไปยัง Frontend เป็น JSON
echo json_encode([
    'success' => $sendResult['success'],
    'orderId' => $orderId,
    'recipient' => $toEmail,
    'driver' => $sendResult['driver'] ?? 'log',
    'message' => $sendResult['message'] ?? 'E-Receipt sent successfully.',
    'preview_url' => $sendResult['preview_url'] ?? null
], JSON_UNESCAPED_UNICODE);
