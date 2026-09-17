<?php
/**
 * VIA ALTO — Lightweight IP Rate Limiter
 * ระบบจำกัดอัตราการเรียกใช้งาน (Rate Limiting) ตามหมายเลข IP เพื่อป้องกันการสแปม
 * และรักษาโควตาการส่งอีเมลของระบบ SMTP ไม่ให้ถูกระงับ
 */

// บรรทัดที่ 8: ประกาศฟังก์ชัน checkRateLimit ตรวจสอบจำนวนครั้งการเรียกใช้งาน
// $action: ชื่อการกระทำ เช่น 'email'
// $maxRequests: จำนวนครั้งสูงสุดที่อนุญาตในช่วงเวลา (ค่าเริ่มต้น 5 ครั้ง)
// $decaySeconds: ระยะเวลาคูลดาวน์ก่อนรีเซ็ตนับใหม่ เป็นวินาที (ค่าเริ่มต้น 300 วินาที = 5 นาที)
function checkRateLimit(string $action = 'email', int $maxRequests = 5, int $decaySeconds = 300): bool {
    // บรรทัดที่ 14: ตรวจหา IP Address ของผู้ใช้ โดยดึงจาก X-Forwarded-For (หากอยู่หลัง Reverse Proxy) หรือ REMOTE_ADDR
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    
    // บรรทัดที่ 17: หาก IP มีหลายค่าคั่นด้วยจุลภาค (Proxy Chain) ให้แยกและใช้ตัวแรกสุดที่เป็น Client IP แท้จริง
    if (str_contains($ip, ',')) {
        $ip = trim(explode(',', $ip)[0]);
    }

    // บรรทัดที่ 22: กำหนด Path ของไฟล์บันทึกสถิติ Rate Limit ในรูปแบบ JSON
    $rateFile = __DIR__ . '/data/rate_limits.json';
    // บรรทัดที่ 24: ดึง path ของโฟลเดอร์ data
    $rateDir = dirname($rateFile);
    // บรรทัดที่ 26: ตรวจสอบว่าโฟลเดอร์ data มีอยู่หรือไม่ หากไม่มีให้สร้างขึ้นใหม่ด้วยสิทธิ์ 0777
    if (!is_dir($rateDir)) {
        @mkdir($rateDir, 0777, true);
    }

    // บรรทัดที่ 31: กำหนดตัวแปรเก็บข้อมูลสถิติ Rate Limits เริ่มต้นเป็น Array ว่าง
    $limits = [];
    // บรรทัดที่ 33: หากมีไฟล์ rate_limits.json อยู่แล้ว ให้อ่านข้อมูลมาประมวลผล
    if (file_exists($rateFile)) {
        // บรรทัดที่ 35: อ่านเนื้อหาไฟล์ JSON
        $data = @file_get_contents($rateFile);
        // บรรทัดที่ 37: แปลงข้อความ JSON ให้เป็น PHP Associative Array
        $limits = !empty($data) ? @json_decode($data, true) : [];
        // บรรทัดที่ 39: หากถอดรหัสแล้วไม่ได้ Array ให้รีเซ็ตเป็น Array ว่างเพื่อความปลอดภัย
        if (!is_array($limits)) {
            $limits = [];
        }
    }

    // บรรทัดที่ 45: สร้าง Key อ้างอิงเฉพาะตัวด้วย MD5 แฮชระหว่างชื่อ Action และ IP Address
    $key = md5("{$action}_{$ip}");
    // บรรทัดที่ 47: บันทึกเวลาปัจจุบันในหน่วย Timestamp วินาที
    $now = time();

    // บรรทัดที่ 50: วนลูปตรวจสอบและลบ Record เก่าที่หมดอายุ (Expired) เพื่อประหยัดพื้นที่ไฟล์
    foreach ($limits as $k => $record) {
        // บรรทัดที่ 52: ถ้าไม่มีฟิลด์ expires หรือเวลาหมดอายุเลยเวลาปัจจุบันไปแล้ว ให้ลบรายการนั้นทิ้ง
        if (!isset($record['expires']) || $record['expires'] < $now) {
            unset($limits[$k]);
        }
    }

    // บรรทัดที่ 58: ตรวจสอบว่า IP และ Action นี้มีประวัติการเรียกใช้งานที่ยังไม่หมดอายุอยู่หรือไม่
    if (isset($limits[$key])) {
        // บรรทัดที่ 60: หากจำนวนครั้งที่เรียกถึงหรือเกินเกณฑ์สูงสุดที่กำหนดไว้ ($maxRequests)
        if ($limits[$key]['count'] >= $maxRequests) {
            // บรรทัดที่ 62: คำนวณจำนวนวินาทีที่เหลือที่ต้องรอจนกว่าจะหมดช่วงจำกัด
            $retryAfter = $limits[$key]['expires'] - $now;
            // บรรทัดที่ 64: ส่ง HTTP Status Code 429 Too Many Requests กลับไปยัง Client
            http_response_code(429);
            // บรรทัดที่ 66: ส่ง Header 'Retry-After' แจ้งให้เบราว์เซอร์ทราบว่าควรรอกี่วินาที
            header("Retry-After: {$retryAfter}");
            // บรรทัดที่ 68: ส่งผลลัพธ์เป็น JSON อธิบายข้อผิดพลาดทั้งภาษาอังกฤษและภาษาไทย
            echo json_encode([
                'success' => false,
                'error' => 'Too many email requests from your IP. Please try again later.',
                'error_th' => 'คำขอส่งอีเมลถี่เกินกำหนด เพื่อความปลอดภัยกรุณารออีกสักครู่ก่อนลองใหม่',
                'retry_after_seconds' => max(1, $retryAfter)
            ]);
            // บรรทัดที่ 76: หยุดการทำงานของสคริปต์ทันที ไม่อนุญาตให้ประมวลผลการส่งอีเมลต่อ
            exit();
        }
        // บรรทัดที่ 79: หากยังไม่เกินลิมิต ให้บวกเพิ่มจำนวนครั้งการเรียกใช้งานขึ้น 1
        $limits[$key]['count']++;
    } else {
        // บรรทัดที่ 82: หากเพิ่งเคยเรียกใช้งานครั้งแรก ให้สร้าง Record ใหม่พร้อมตั้งเวลาหมดอายุ
        $limits[$key] = [
            'ip' => $ip,                              // หมายเลข IP ผู้ใช้
            'action' => $action,                      // ประเภท Action ที่เรียก
            'count' => 1,                             // เริ่มต้นนับครั้งที่ 1
            'expires' => $now + $decaySeconds         // กำหนดเวลาหมดอายุ Timestamp
        ];
    }

    // บรรทัดที่ 91: บันทึก Array สถิติล่าสุดกลับลงในไฟล์ rate_limits.json โดยจัดฟอร์แมต JSON ให้อ่านง่าย
    @file_put_contents($rateFile, json_encode($limits, JSON_PRETTY_PRINT));
    // บรรทัดที่ 93: ส่งคืนค่า true แสดงว่าผ่านเกณฑ์การตรวจสอบ Rate Limit อนุญาตให้ดำเนินการต่อได้
    return true;
}
