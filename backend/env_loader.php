<?php
/**
 * VIA ALTO — Lightweight .env File Loader
 * ระบบโหลดค่า Configuration จากไฟล์ backend/.env โดยไม่ต้องติดตั้ง Package ภายนอก
 */

// บรรทัดที่ 8: ตรวจสอบว่าฟังก์ชัน loadEnv ถูกประกาศไว้ก่อนหน้าหรือยัง ป้องกัน redeclare error
if (!function_exists('loadEnv')) {
    // บรรทัดที่ 10: ประกาศฟังก์ชัน loadEnv กำหนดค่า default path ไปยัง .env ในโฟลเดอร์เดียวกัน
    function loadEnv($envPath = __DIR__ . '/.env') {
        // บรรทัดที่ 12: ตรวจสอบว่ามีไฟล์ .env อยู่จริงหรือไม่ ถ้าไม่มีให้ return ออกไป
        if (!file_exists($envPath)) {
            return;
        }

        // บรรทัดที่ 17: อ่านบรรทัดทั้งหมดในไฟล์ .env โดยข้ามบรรทัดว่างและตัด newline ออก
        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        // บรรทัดที่ 19: วนลูปประมวลผลทีละบรรทัด
        foreach ($lines as $line) {
            // บรรทัดที่ 21: ตัด whitespace ส่วนเกินหัวท้ายของบรรทัด
            $line = trim($line);
            // บรรทัดที่ 23: ข้ามบรรทัดว่าง หรือบรรทัดคอมเมนต์ที่ขึ้นต้นด้วยเครื่องหมาย #
            if (empty($line) || str_starts_with($line, '#')) {
                continue;
            }

            // บรรทัดที่ 28: ตรวจสอบว่าบรรทัดมีเครื่องหมาย = สำหรับแยก Key กับ Value หรือไม่
            if (strpos($line, '=') !== false) {
                // บรรทัดที่ 30: แยกชื่อตัวแปร ($key) และค่า ($value) ด้วยเครื่องหมาย = โดยแยกเพียง 2 ส่วน
                list($key, $value) = explode('=', $line, 2);
                // บรรทัดที่ 32: ตัดช่องว่างหัวท้ายของ Key
                $key = trim($key);
                // บรรทัดที่ 34: ตัดช่องว่างและเครื่องหมายคำพูดเดี่ยว/คู่ (Quotes) ออกจาก Value
                $value = trim($value, " \t\n\r\0\x0B\"'");

                // บรรทัดที่ 37: ตรวจสอบว่าตัวแปรนี้ยังไม่มีการตั้งค่าไว้ในระดับ System Environment
                if (!getenv($key)) {
                    // บรรทัดที่ 39: บันทึกค่าลงใน System Environment ด้วย putenv()
                    putenv("{$key}={$value}");
                    // บรรทัดที่ 41: บันทึกค่าลงในตัวแปร Superglobal $_ENV
                    $_ENV[$key] = $value;
                    // บรรทัดที่ 43: บันทึกค่าลงในตัวแปร Superglobal $_SERVER เพื่อความสะดวกในการเรียกใช้
                    $_SERVER[$key] = $value;
                }
            }
        }
    }
}

// บรรทัดที่ 52: ทำการเรียกฟังก์ชัน loadEnv() อัตโนมัติทันทีที่มีการ include ไฟล์นี้
loadEnv(__DIR__ . '/.env');
