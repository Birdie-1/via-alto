<?php
/**
 * ==============================================================================================
 * ไฟล์: register_welcome.php
 * คำอธิบาย: REST API Endpoint สำหรับรับข้อมูลการสมัครสมาชิกใหม่ และจัดส่ง Personalized Recommendation Email
 * สอดคล้องกับ:
 *   - Step 3: Personalized Marketing เพื่อแนะนำสินค้า 3 ชิ้นตามความสนใจของผู้ใช้
 *   - Step 4: สคริปต์ .php เพื่อส่งเนื้อหาไปยังอีเมลหลังจากสมัครสมาชิก
 * ==============================================================================================
 */

// โหลดการตั้งค่าระบบหลักและฟังก์ชัน CORS
require_once __DIR__ . '/config.php';
// โหลดฟังก์ชันส่งอีเมล sendViaAltoEmail ผ่าน PHPMailer / Driver
require_once __DIR__ . '/mailer.php';
// โหลดระบบตรวจสอบและจำกัดอัตราการส่งอีเมล (Rate Limiting)
require_once __DIR__ . '/rate_limiter.php';
// โหลดเทมเพลตอีเมลแนะนำสินค้าเฉพาะบุคคล renderRecommendationEmail
require_once __DIR__ . '/templates/recommendation_email.php';

// เรียกฟังก์ชันจัดการ CORS เพื่ออนุญาตให้ Frontend (localhost:5173) เรียกใช้งาน API ได้
handleCors();

// ตรวจสอบ IP Rate Limit: ป้องกันการส่งสแปม กำหนดไม่เกิน 5 ครั้งต่อ 5 นาทีต่อ 1 IP
checkRateLimit('register_email', 5, 300);

// ตรวจสอบ HTTP Method: ต้องส่งมาด้วยเมธอด POST เท่านั้น
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    // กำหนด HTTP Status 405 Method Not Allowed
    http_response_code(405);
    // ส่งข้อความแจ้งเตือนกลับเป็น JSON
    echo json_encode([
        'success' => false,
        'error' => 'Method Not Allowed. Use POST.'
    ]);
    exit();
}

// อ่านข้อมูล Request Body ที่ส่งมาแบบ JSON จากหน้าเว็บ React
$input = json_decode(file_get_contents('php://input'), true);
// หากไม่ใช่ JSON ให้รองรับ Form POST ธรรมดา
if (!$input) {
    $input = $_POST;
}

// ตรวจสอบและกรองความถูกต้องของอีเมลผู้สมัคร
$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
// ดึงชื่อเต็มของผู้สมัคร หากไม่มีให้ใช้ค่าเริ่มต้น 'Explorer'
$name = trim($input['fullName'] ?? $input['name'] ?? 'Explorer');
// ดึงข้อมูลโปรไฟล์ความสนใจด้านกิจกรรม Outdoor จากแบบสอบถามหน้าเว็บ
$profile = $input['marketingProfile'] ?? [];

// หากอีเมลไม่ถูกต้อง ให้ตอบกลับ Error 400 Bad Request
if (!$email) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid email address provided.'
    ]);
    exit();
}

// โหลดค่าคอนฟิกูเรชันของระบบ
$config = require __DIR__ . '/config.php';
// กำหนด URL ของเว็บไซต์ โดยให้ความสำคัญกับค่าจาก input ก่อน และคัดกรองไม่ให้มี localhost เพื่อชี้ไปที่ GitHub Pages เสมอ
$rawSiteUrl = $input['site_url'] ?? $config['site_url'] ?? '';
$siteUrl = (!empty($rawSiteUrl) && !str_contains($rawSiteUrl, 'localhost') && !str_contains($rawSiteUrl, '127.0.0.1'))
    ? rtrim($rawSiteUrl, '/')
    : 'https://birdie-1.github.io/via-alto';

// ----------------------------------------------------------------------------------------------
// ขั้นตอนที่ 1: ดึงและแปลงข้อมูลความสนใจของลูกค้า (Step 3: Preference Extraction)
// ----------------------------------------------------------------------------------------------
// กิจกรรมหลักที่สนใจ (เช่น trekking, camping, trail_running)
$activities = $profile['primaryActivities'] ?? ['trekking'];
// ภูมิภาคหรือลักษณะภูมิประเทศที่มักเดินทาง (เช่น northern, international)
$regionKey = $profile['region'] ?? 'northern';
// ระดับประสบการณ์การเดินป่า (beginner, intermediate, advanced)
$level = ucfirst($profile['experienceLevel'] ?? 'intermediate');
// ไซส์เสื้อผ้าที่สวมใส่
$apparelSize = $profile['sizes']['apparel'] ?? 'M';
// ไซส์รองเท้าเดินป่าที่สวมใส่ (EU)
$footwearSize = $profile['sizes']['footwear'] ?? '42';

// กำหนดคำอธิบายภูมิภาคภาษาอังกฤษ/ไทย
$regionLabels = [
    'northern' => 'Northern Thailand (Doi & High Elevation)',
    'central' => 'Central & Bangkok (Weekend Trails)',
    'southern' => 'Southern Coastal (Rain Shells)',
    'northeastern' => 'Northeastern Plateau',
    'international' => 'International Alpine Expeditions'
];
// กำหนดคำอธิบายกิจกรรมกลางแจ้ง
$activityLabels = [
    'day_hiking' => 'Day Hiking',
    'trekking' => 'Alpine Trekking',
    'camping' => 'Mountain Camping',
    'trail_running' => 'Trail Running',
    'travel' => 'Expedition Travel'
];

// รวมชื่อกิจกรรมที่เลือกด้วยเครื่องหมาย &
$activityText = implode(' & ', array_map(fn($a) => $activityLabels[$a] ?? ucfirst($a), $activities)) ?: 'Alpine Trekking';
// แปลงรหัสภูมิภาคเป็นข้อความเต็ม
$regionText = $regionLabels[$regionKey] ?? 'Northern High Elevation';
// จัดรูปแบบข้อความแสดงขนาดเสื้อผ้าและรองเท้า
$sizeText = "Apparel ({$apparelSize}) / Footwear (EU {$footwearSize})";

// ----------------------------------------------------------------------------------------------
// ขั้นตอนที่ 2: บันทึกข้อมูลการสมัครสมาชิกลงในไฟล์ registrations.json
// ----------------------------------------------------------------------------------------------
$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}
$regFile = $dataDir . '/registrations.json';
$registrations = file_exists($regFile) ? json_decode(file_get_contents($regFile), true) : [];
$registrations[] = [
    'email' => $email,
    'name' => $name,
    'preferences' => [
        'activity' => $activityText,
        'region' => $regionText,
        'level' => $level,
        'sizes' => $sizeText
    ],
    'registered_at' => date('c')
];
file_put_contents($regFile, json_encode($registrations, JSON_PRETTY_PRINT));

// ----------------------------------------------------------------------------------------------
// ขั้นตอนที่ 3: ดึงสินค้าแนะนำ 3 ชิ้นแบบ Personalized จาก Database จริง (Step 3 & PostgreSQL)
// ----------------------------------------------------------------------------------------------
// ดึง Username ของผู้ใช้ที่สมัครจริงมาเตรียมแสดงในส่วนหัวของอีเมล
$username = trim($input['username'] ?? $input['fullName'] ?? $input['name'] ?? 'Explorer');

// เรียกใช้ฟังก์ชัน getRecommendedProductsFromDatabase ใน db.php เพื่อคำนวณและดึงข้อมูล 3 สินค้า
$matchedProducts = getRecommendedProductsFromDatabase($profile);

// จัดเตรียมข้อมูลสำหรับส่งเข้าฟังก์ชันเรนเดอร์อีเมล
$emailData = [
    'username' => $username, // ชื่อผู้ใช้จริง (เช่น NARUEBORDE)
    'name' => $name,         // ชื่อเต็ม
    'email' => $email,       // อีเมลผู้รับ
    'site_url' => $siteUrl,   // URL หน้าร้าน
    'preferences' => [
        'activity' => $activityText,
        'region' => $regionText,
        'level' => $level,
        'sizes' => $sizeText
    ],
    'products' => $matchedProducts, // สินค้า 3 ชิ้นที่คัดสรรจาก PostgreSQL
    'use_cid' => true        // เปิดใช้งานการฝังรูปภาพด้วย CID Inline
];

// เรนเดอร์โครงสร้าง HTML ของอีเมลแนะนำสินค้า
$htmlBody = renderRecommendationEmail($emailData);
// กำหนดหัวข้ออีเมลสำหรับแสดงใน Inbox ผู้รับ
$subject = "🏔️ Your Next Adventure Awaits — สินค้าแนะนำพิเศษสำหรับคุณ | VIA ALTO";

// ----------------------------------------------------------------------------------------------
// ขั้นตอนที่ 4: เตรียมรูปภาพระดับ Master เพื่อแนบเป็น CID Inline เข้าไปในตัวอีเมล
// ----------------------------------------------------------------------------------------------
$imagesDir = __DIR__ . '/images';
// เริ่มต้นด้วยโลโก้วงกลม และภาพแบ็คกราวนด์ภูเขาแอลป์ของ Hero Section
$embeddedImages = [
    ['path' => $imagesDir . '/circular_logo.png', 'cid' => 'brand_logo', 'name' => 'circular_logo.png'],
    ['path' => $imagesDir . '/recom_hero_backdrop.jpg', 'cid' => 'recom_hero_bg', 'name' => 'recom_hero_backdrop.jpg'],
];

// วนลูปแนบรูปภาพสินค้า 3 ชิ้นที่คำนวณได้จาก Database
foreach ($matchedProducts as $i => $p) {
    $cidName = $p['cid'] ?? ("recom_prod_" . ($i + 1));
    $imgFile = $p['image_file'] ?? "prod_alpine_35l.jpg";
    // ตรวจสอบไฟล์ใน backend/images/ ก่อน
    $imgPath = $imagesDir . '/' . $imgFile;
    // หากไม่พบ ให้ค้นหาในโฟลเดอร์ public/images/ ของโปรเจกต์
    if (!file_exists($imgPath)) {
        $imgPath = __DIR__ . '/../public/images/' . $imgFile;
    }
    // หากมีไฟล์อยู่จริง ให้เพิ่มเข้าสู่รายการแนบแบบ CID
    if (file_exists($imgPath)) {
        $embeddedImages[] = ['path' => $imgPath, 'cid' => $cidName, 'name' => $imgFile];
    }
}

// ----------------------------------------------------------------------------------------------
// ขั้นตอนที่ 5: ส่งอีเมลไปยังลูกค้าผ่าน PHPMailer
// ----------------------------------------------------------------------------------------------
$result = sendViaAltoEmail($email, $name, $subject, $htmlBody, '', $embeddedImages);

// ----------------------------------------------------------------------------------------------
// ขั้นตอนที่ 6: ส่งการตอบกลับแบบ JSON กลับไปยังหน้าเว็บ React
// ----------------------------------------------------------------------------------------------
http_response_code($result['success'] ? 200 : 500);
echo json_encode([
    'success' => $result['success'],
    'message' => $result['message'],
    'driver' => $result['driver'],
    'email' => $email,
    'recommended_products_count' => count($matchedProducts),
    'preview_url' => $result['preview_url'] ?? null
]);
