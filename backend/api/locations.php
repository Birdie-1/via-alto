<?php
/**
 * =========================================================================
 * VIA ALTO — API ให้บริการข้อมูลจังหวัดและอำเภอ/เขต ทั่วประเทศไทย
 * สำหรับระบบ Checkout Form และการคำนวณปลายทางจัดส่งสินค้า
 * =========================================================================
 * ตัวอย่างการเรียกใช้งาน:
 * 1. ดึงรายชื่อ 77 จังหวัดทั้งหมด:
 *    GET /backend/api/locations.php?action=provinces
 * 2. ดึงรายชื่ออำเภอ/เขตเฉพาะจังหวัดที่เลือก:
 *    GET /backend/api/locations.php?action=districts&province_id=1
 *    หรือ
 *    GET /backend/api/locations.php?action=districts&province=Bangkok
 * 3. ดึงโครงสร้างข้อมูลทั้งหมด:
 *    GET /backend/api/locations.php?action=all
 * =========================================================================
 */

// บรรทัดที่ 18: กำหนด Header ให้ตอบกลับเป็น JSON พร้อมรองรับ CORS ข้ามโดเมน
header('Content-Type: application/json; charset=utf-8');
// บรรทัดที่ 20: อนุญาตให้ Frontend (React) จากทุก Origin สามารถเชื่อมต่อได้
header('Access-Control-Allow-Origin: *');
// บรรทัดที่ 22: อนุญาตเฉพาะ HTTP Method ที่เกี่ยวข้องคือ GET และ OPTIONS (Preflight)
header('Access-Control-Allow-Methods: GET, OPTIONS');
// บรรทัดที่ 24: กำหนด Header ที่อนุญาตให้ส่งมาในคำขอ
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
// บรรทัดที่ 26: ตั้งค่า Cache-Control ให้ Browser แคชข้อมูลได้ 24 ชั่วโมง เพราะข้อมูลจังหวัดไม่เปลี่ยนแปลงบ่อย
header('Cache-Control: public, max-age=86400');

// บรรทัดที่ 29: หากเป็นคำขอ Preflight (OPTIONS) ให้ตอบกลับ HTTP 200 OK ทันที
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// บรรทัดที่ 35: ระบุตำแหน่งไฟล์ฐานข้อมูล JSON (ตรวจสอบโฟลเดอร์ resources ก่อน)
$dataFile = __DIR__ . '/../resources/thai_locations.json';
if (!file_exists($dataFile)) {
    $dataFile = __DIR__ . '/../data/thai_locations.json';
}

// บรรทัดที่ 40: ตรวจสอบว่าไฟล์ฐานข้อมูลมีอยู่จริงหรือไม่
if (!file_exists($dataFile)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'ไม่พบไฟล์ฐานข้อมูลภูมิศาสตร์ไทย (Locations database not found)'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// บรรทัดที่ 48: อ่านเนื้อหาไฟล์ JSON
$rawContent = file_get_contents($dataFile);
// บรรทัดที่ 50: แปลง JSON เป็น PHP Array
$locations = json_decode($rawContent, true);

// บรรทัดที่ 53: ตรวจสอบความถูกต้องของการถอดรหัส JSON
if (!$locations) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'ไม่สามารถอ่านข้อมูลภูมิศาสตร์ไทยได้ (Invalid JSON structure)'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// บรรทัดที่ 63: รับพารามิเตอร์ action จาก Query String (ค่าเริ่มต้นคือ provinces)
$action = $_GET['action'] ?? 'provinces';

// =========================================================================
// กรณีที่ 1: ดึงรายชื่อจังหวัดทั้งหมด 77 จังหวัด (action=provinces)
// =========================================================================
if ($action === 'provinces') {
    // บรรทัดที่ 70: สกัดเฉพาะข้อมูลจังหวัด โดยไม่ดึงรายชื่ออำเภอเพื่อประหยัด Bandwidth
    $provinces = array_map(function ($item) {
        return [
            'id' => $item['id'],
            'name_th' => $item['name_th'],
            'name_en' => $item['name_en']
        ];
    }, $locations);

    // บรรทัดที่ 79: ตอบกลับรายการ 77 จังหวัด
    echo json_encode([
        'success' => true,
        'count' => count($provinces),
        'data' => $provinces
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// =========================================================================
// กรณีที่ 2: ดึงรายชื่ออำเภอ/เขตเฉพาะจังหวัดที่เลือก (action=districts)
// =========================================================================
if ($action === 'districts') {
    // บรรทัดที่ 92: รับรหัสจังหวัด (province_id) หรือชื่อจังหวัด (province)
    $provinceId = isset($_GET['province_id']) ? intval($_GET['province_id']) : null;
    $provinceName = isset($_GET['province']) ? trim($_GET['province']) : null;

    // บรรทัดที่ 96: ค้นหาจังหวัดที่ตรงกับเงื่อนไข
    $matchedProvince = null;
    foreach ($locations as $prov) {
        if ($provinceId && $prov['id'] === $provinceId) {
            $matchedProvince = $prov;
            break;
        }
        if ($provinceName && (
            strcasecmp($prov['name_en'], $provinceName) === 0 ||
            $prov['name_th'] === $provinceName
        )) {
            $matchedProvince = $prov;
            break;
        }
    }

    // บรรทัดที่ 112: หากไม่พบจังหวัดที่ค้นหา
    if (!$matchedProvince) {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'error' => 'ไม่พบข้อมูลจังหวัดที่ระบุ (Province not found)'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    // บรรทัดที่ 122: ส่งคืนรายชื่ออำเภอ/เขตในจังหวัดนั้น พร้อมรหัสไปรษณีย์
    echo json_encode([
        'success' => true,
        'province' => [
            'id' => $matchedProvince['id'],
            'name_th' => $matchedProvince['name_th'],
            'name_en' => $matchedProvince['name_en']
        ],
        'count' => count($matchedProvince['districts']),
        'data' => $matchedProvince['districts']
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// =========================================================================
// กรณีที่ 3: ดึงข้อมูลโครงสร้างเต็มทั้งหมด 77 จังหวัดและอำเภอ (action=all)
// =========================================================================
if ($action === 'all') {
    echo json_encode([
        'success' => true,
        'count' => count($locations),
        'data' => $locations
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// บรรทัดที่ 149: กรณีระบุ action ไม่ถูกต้อง
http_response_code(400);
echo json_encode([
    'success' => false,
    'error' => 'Action ไม่ถูกต้อง รองรับเฉพาะ provinces, districts หรือ all'
], JSON_UNESCAPED_UNICODE);
exit();
