<?php
/**
 * VIA ALTO — Email Backend Configuration
 * ไฟล์ตั้งค่าหลักของ Backend สำหรับระบบส่งอีเมลและการจัดการ CORS
 */

// บรรทัดที่ 8: โหลด Environment Variables จากไฟล์ backend/.env
require_once __DIR__ . '/env_loader.php';

// บรรทัดที่ 11: ฟังก์ชัน handleCors จัดการ Cross-Origin Resource Sharing เพื่อให้ Frontend เรียกใช้ API ได้
if (!function_exists('handleCors')) {
    function handleCors() {
        // บรรทัดที่ 14: รายการโดเมนหรือพอร์ตต้นทาง (Origins) ที่อนุญาตให้เรียกใช้งาน
        $allowedOrigins = [
            'http://localhost:5173',  // พอร์ตทดสอบ Vite Dev Server
            'http://127.0.0.1:5173',  // Loopback IP สำหรับ Vite
            'http://localhost:3000',  // พอร์ต React มาตรฐาน
            'http://localhost:8000'   // พอร์ต PHP Built-in Server
        ];
        // บรรทัดที่ 21: อ่านค่า Origin ของ Client หากไม่มีให้เป็น wildcard '*'
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
        // บรรทัดที่ 23: ตรวจสอบว่า Origin อยู่ในรายการที่อนุญาตหรือไม่
        if (in_array($origin, $allowedOrigins) || $origin === '*') {
            // บรรทัดที่ 25: ส่ง Header อนุญาต Origin นั้น
            header("Access-Control-Allow-Origin: $origin");
        }
        // บรรทัดที่ 28: อนุญาต HTTP Methods: GET, POST, OPTIONS
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        // บรรทัดที่ 30: อนุญาต HTTP Headers ที่ Frontend จะส่งมา เช่น Content-Type, Authorization
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        // บรรทัดที่ 32: กำหนดชนิด Response กลับเป็น JSON รหัสอักขระ UTF-8
        header('Content-Type: application/json; charset=utf-8');

        // บรรทัดที่ 35: ตรวจสอบ HTTP Preflight Request (OPTIONS) จากเบราว์เซอร์
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            // บรรทัดที่ 37: ตอบกลับ Status 200 OK ทันทีและหยุดการประมวลผล
            http_response_code(200);
            exit();
        }
    }
}

// บรรทัดที่ 44: ส่งคืน Array การตั้งค่าระบบอีเมล (สามารถ override ผ่าน .env ได้)
return [
    // บรรทัดที่ 46: Driver ในการส่ง: 'smtp' หรือ 'log' (จำลองบันทึกลงไฟล์)
    'driver' => getenv('MAIL_DRIVER') ?: (getenv('SMTP_USER') ? 'smtp' : 'log'),

    // บรรทัดที่ 49: การตั้งค่าเชื่อมต่อเซิร์ฟเวอร์ SMTP (เช่น Gmail, Mailtrap, Brevo)
    'smtp' => [
        // บรรทัดที่ 51: โฮสต์ของ SMTP Server
        'host' => getenv('SMTP_HOST') ?: (str_contains(getenv('SMTP_USER') ?: '', '@gmail.com') ? 'smtp.gmail.com' : 'sandbox.smtp.mailtrap.io'),
        // บรรทัดที่ 53: หมายเลขพอร์ตของ SMTP Server
        'port' => (int)(getenv('SMTP_PORT') ?: (str_contains(getenv('SMTP_USER') ?: '', '@gmail.com') ? 587 : 2525)),
        // บรรทัดที่ 55: ชนิดการเข้ารหัสความปลอดภัย 'tls' หรือ 'ssl'
        'secure' => getenv('SMTP_SECURE') ?: 'tls',
        // บรรทัดที่ 57: บัญชีผู้ใช้ SMTP (Username)
        'username' => getenv('SMTP_USER') ?: '',
        // บรรทัดที่ 59: รหัสผ่าน SMTP หรือ Google App Password (Password)
        'password' => getenv('SMTP_PASS') ?: '',
        // บรรทัดที่ 61: เปิดใช้งานการยืนยันตัวตน SMTP Authentication
        'auth' => true
    ],

    // บรรทัดที่ 65: ข้อมูลอีเมลผู้ส่ง (Sender Details)
    'from_email' => getenv('MAIL_FROM_ADDRESS') ?: 'club@via-alto.com',
    // บรรทัดที่ 67: ชื่อผู้ส่งที่จะปรากฏในกล่องจดหมายผู้รับ
    'from_name' => getenv('MAIL_FROM_NAME') ?: 'VIA ALTO Alpine Club',

    // บรรทัดที่ 70: Base URL ของเว็บไซต์ สำหรับสร้างลิงก์และรูปภาพในอีเมล
    'site_url' => getenv('SITE_URL') ?: 'http://localhost:5173',

    // บรรทัดที่ 73: โฟลเดอร์จัดเก็บ Log ของการส่งอีเมล
    'log_dir' => __DIR__ . '/logs'
];
