<?php
/**
 * ==============================================================================================
 * ไฟล์: sendMail.php
 * คำอธิบาย: คลาสและสคริปต์สำหรับประมวลผลการส่งอีเมลต้อนรับ (Welcome Email) เมื่อมีผู้สมัครรับข่าวสาร
 * สอดคล้องกับ: แบบฝึกปฏิบัติวิชาการตลาดดิจิทัล (Digital Marketing LAB) - ขั้นตอนที่ 2
 * ==============================================================================================
 */

// ----------------------------------------------------------------------------------------------
// ส่วนที่ 1: ตั้งค่า CORS Headers เพื่ออนุญาตให้หน้าเว็บ React (localhost:5173) เรียกใช้งาน API ได้
// ----------------------------------------------------------------------------------------------
// ตรวจสอบ Origin ของผู้เรียกใช้งาน หากมีให้ใช้ค่านั้น ถ้าไม่มีให้ใช้อนุญาตทั้งหมด (*)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
// ส่ง Header กำหนด Origin ที่ได้รับอนุญาต
header("Access-Control-Allow-Origin: $origin");
// ส่ง Header กำหนด Method ที่อนุญาต (POST สำหรับส่งข้อมูล, OPTIONS สำหรับ Preflight request)
header("Access-Control-Allow-Methods: POST, OPTIONS");
// ส่ง Header กำหนดชนิดข้อมูลที่อนุญาตให้ส่งมาใน Request (JSON และ Authorization)
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// หากเป็น Preflight Request (OPTIONS) ให้ตอบกลับรหัส 200 OK ทันทีแล้วจบการทำงาน
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ----------------------------------------------------------------------------------------------
// ส่วนที่ 2: โหลดตัวแปรสภาพแวดล้อม (.env) เพื่อเก็บรหัสผ่านอย่างปลอดภัย ไม่ให้หลุดขึ้น GitHub
// ----------------------------------------------------------------------------------------------
// เรียกใช้ไฟล์ env_loader.php เพื่ออ่านค่า SMTP_USER และ SMTP_PASS
require_once __DIR__ . '/env_loader.php';

// ----------------------------------------------------------------------------------------------
// ส่วนที่ 3: นำเข้าคลาส PHPMailer ตามโครงสร้างของใบงาน LAB (บรรทัดที่ 2-7 ในเอกสาร)
// ----------------------------------------------------------------------------------------------
// นำเข้า Namespace ของ PHPMailer เพื่อใช้งานคลาสหลัก
use PHPMailer\PHPMailer\PHPMailer;
// นำเข้า Namespace ของ Exception เพื่อใช้ดักจับข้อผิดพลาด
use PHPMailer\PHPMailer\Exception;

// โหลดไฟล์ซอร์สโค้ดของคลาส PHPMailer
require 'PHPMailer/src/PHPMailer.php';
// โหลดไฟล์ซอร์สโค้ดของคลาส SMTP สำหรับเชื่อมต่อ Mail Server
require 'PHPMailer/src/SMTP.php';
// โหลดไฟล์ซอร์สโค้ดสำหรับจัดการ Exception
require 'PHPMailer/src/Exception.php';

// ----------------------------------------------------------------------------------------------
// ส่วนที่ 4: ตรวจสอบ HTTP Request Method (ต้องเป็น POST เท่านั้น ตามบรรทัดที่ 9 ในใบงาน)
// ----------------------------------------------------------------------------------------------
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // อ่านข้อมูลดิบจาก php://input (กรณีที่หน้าเว็บ React ส่งข้อมูลมาแบบ JSON)
    $rawInput = file_get_contents('php://input');
    // แปลง JSON ให้กลายเป็น PHP Array ถ้าไม่สำเร็จจะได้ค่า null
    $jsonInput = !empty($rawInput) ? json_decode($rawInput, true) : null;

    // ดึงค่า email จาก JSON หรือถ้าไม่มีให้ดึงจาก $_POST (กรณีส่งจากฟอร์ม subscribe_form.php)
    $emailInput = $jsonInput['email'] ?? $_POST['email'] ?? '';

    // ตรวจสอบว่าคำขอส่งมาในรูปแบบ JSON หรือไม่
    $isJsonRequest = !empty($jsonInput) || (isset($_SERVER['HTTP_ACCEPT']) && str_contains($_SERVER['HTTP_ACCEPT'], 'application/json'));

    // ตรวจสอบความถูกต้องของรูปแบบอีเมลด้วยฟังก์ชัน filter_var (บรรทัดที่ 10 ในใบงาน)
    $email = filter_var($emailInput, FILTER_VALIDATE_EMAIL);

    // ถ้าอีเมลมีรูปแบบถูกต้อง (บรรทัดที่ 11 ในใบงาน)
    if ($email) {
        // สร้าง Object ของ PHPMailer โดยใส่ true เพื่อเปิดใช้งาน Exception (บรรทัดที่ 12 ในใบงาน)
        $mail = new PHPMailer(true);

        try {
            // ----------------------------------------------------------------------------------
            // ส่วนที่ 5: ตั้งค่าการเชื่อมต่อ SMTP Server ของ Gmail (บรรทัดที่ 14-21 ในใบงาน)
            // ----------------------------------------------------------------------------------
            // ดึงบัญชี Gmail ผู้ส่งจากไฟล์ .env หรือถ้าไม่มีให้ใช้ค่าเริ่มต้น
            $gmailUser = getenv('SMTP_USER') ?: 'xxxx@gmail.com';
            // ดึงรหัสผ่าน App Password 16 หลักจากไฟล์ .env
            $gmailPass = getenv('SMTP_PASS') ?: 'xxxx xxxx xxxx xxxx';

            // กำหนดให้ส่งอีเมลผ่านระบบ SMTP (บรรทัดที่ 15 ในใบงาน)
            $mail->isSMTP();
            // ระบุ Host ของ Gmail SMTP Server (บรรทัดที่ 16 ในใบงาน)
            $mail->Host       = 'smtp.gmail.com';
            // เปิดใช้งานการยืนยันตัวตนด้วย Username และ Password (บรรทัดที่ 17 ในใบงาน)
            $mail->SMTPAuth   = true;
            // ระบุอีเมลของผู้ส่ง (บรรทัดที่ 18 ในใบงาน)
            $mail->Username   = $gmailUser;
            // ระบุ App Password 16 หลักของผู้ส่ง (บรรทัดที่ 19 ในใบงาน)
            $mail->Password   = $gmailPass;
            // กำหนดการเข้ารหัสความปลอดภัยเป็น TLS (บรรทัดที่ 20 ในใบงาน)
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            // ระบุพอร์ตสำหรับการเชื่อมต่อ TLS คือ 587 (บรรทัดที่ 21 ในใบงาน)
            $mail->Port       = 587;
            // กำหนดชุดรหัสภาษาเป็น UTF-8 เพื่อรองรับภาษาไทยอย่างสมบูรณ์
            $mail->CharSet    = 'UTF-8';

            // ----------------------------------------------------------------------------------
            // ส่วนที่ 6: กำหนดข้อมูลผู้ส่งและผู้รับ (ข้อกำหนดเพิ่มเติมในใบงาน)
            // ----------------------------------------------------------------------------------
            // ข้อกำหนดที่ 3: กำหนดให้ชื่อผู้ส่งใน inbox แสดงเป็นชื่อร้านค้า (บรรทัดที่ 22 ในใบงาน)
            $mail->setFrom($gmailUser, 'VIA ALTO');

            // ข้อกำหนด: กำหนดอีเมลผู้รับ โดยใช้ตัวแปรที่รับมาจากฟอร์ม (บรรทัดที่ 24 ในใบงาน)
            $mail->addAddress($email);

            // ----------------------------------------------------------------------------------
            // ส่วนที่ 7: แนบรูปภาพประกอบผ่าน CID (Content-ID) เพื่อแสดงในเนื้อหาอีเมลโดยตรง
            // ตามข้อกำหนด: $mail->addEmbeddedImage('ชื่อไฟล์และpath', 'ชื่อตัวแทนรูป')
            // ----------------------------------------------------------------------------------
            // แนบโลโก้วงกลมของแบรนด์ โดยใช้ CID 'brand_logo'
            if (file_exists(__DIR__ . '/images/circular_logo.png')) {
                $mail->addEmbeddedImage(__DIR__ . '/images/circular_logo.png', 'brand_logo');
            }
            // แนบภาพแบนเนอร์ยอดเขาแอลป์ โดยใช้ CID 'hero_banner'
            if (file_exists(__DIR__ . '/images/email_hero_banner.jpg')) {
                $mail->addEmbeddedImage(__DIR__ . '/images/email_hero_banner.jpg', 'hero_banner');
            }
            // แนบไอคอนสิทธิประโยชน์ 1: โปรโมชั่น
            if (file_exists(__DIR__ . '/images/icon_promo.png')) {
                $mail->addEmbeddedImage(__DIR__ . '/images/icon_promo.png', 'icon_promo');
            }
            // แนบไอคอนสิทธิประโยชน์ 2: สินค้าใหม่
            if (file_exists(__DIR__ . '/images/icon_new.png')) {
                $mail->addEmbeddedImage(__DIR__ . '/images/icon_new.png', 'icon_new');
            }
            // แนบไอคอนสิทธิประโยชน์ 3: เส้นทางเดินป่า
            if (file_exists(__DIR__ . '/images/icon_mountain.png')) {
                $mail->addEmbeddedImage(__DIR__ . '/images/icon_mountain.png', 'icon_mountain');
            }
            // แนบไอคอนสิทธิประโยชน์ 4: คู่มืออุปกรณ์
            if (file_exists(__DIR__ . '/images/icon_guide.png')) {
                $mail->addEmbeddedImage(__DIR__ . '/images/icon_guide.png', 'icon_guide');
            }

            // ----------------------------------------------------------------------------------
            // ส่วนที่ 8: ดึงเนื้อหาอีเมลจากไฟล์ภายนอก (ข้อกำหนดที่ 1 ในใบงาน - บรรทัดที่ 25)
            // ----------------------------------------------------------------------------------
            // โหลดโค้ด HTML เทมเพลตจากไฟล์ emailContent.php ซึ่งสร้างตัวแปร $bodyContent
            include "emailContent.php";

            // กำหนดรูปแบบอีเมลให้เป็น HTML (บรรทัดที่ 26 ในใบงาน)
            $mail->isHTML(true);

            // ข้อกำหนดที่ 4: กำหนดหัวข้อหลักแสดงใน inbox ผู้รับ (บรรทัดที่ 27 ในใบงาน)
            $mail->Subject = 'ขอบคุณที่สมัครรับข่าวสาร — ยินดีต้อนรับสู่ VIA ALTO | GO BEYOND.';

            // กำหนดเนื้อหาหลักของอีเมลโดยรับค่าจากตัวแปร $bodyContent (บรรทัดที่ 28 ในใบงาน)
            $mail->Body    = $bodyContent;

            // สั่งส่งอีเมลออกไปยัง SMTP Server (บรรทัดที่ 29 ในใบงาน)
            $mail->send();

            // ----------------------------------------------------------------------------------
            // ส่วนที่ 9: บันทึกข้อมูลและตอบกลับผลลัพธ์ (บรรทัดที่ 30-31 ในใบงาน)
            // ----------------------------------------------------------------------------------
            // เขียนบันทึกอีเมลผู้สมัครต่อท้ายไฟล์ subscribers.txt (บรรทัดที่ 30 ในใบงาน)
            file_put_contents(__DIR__ . "/subscribers.txt", $email . "\n", FILE_APPEND);

            // กรณีที่ 1: ถ้าเรียกใช้งานผ่านหน้าเว็บ React (API JSON) ให้ตอบกลับเป็น JSON
            if ($isJsonRequest) {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode([
                    'success' => true,
                    'message' => "Subscription สำเร็จ. คุณจะได้รับข้อเสนอพิเศษทางอีเมลล์: $email",
                    'email' => $email
                ]);
                exit;
            }

            // กรณีที่ 2: ถ้าส่งมาจากฟอร์ม HTML ธรรมดา (subscribe_form.php) ให้แสดงผลหน้าจอ HTML (บรรทัดที่ 31 ในใบงาน)
            header('Content-Type: text/html; charset=utf-8');
            echo "<div style='font-family: sans-serif; padding: 24px; max-width: 500px; margin: 40px auto; border-radius: 12px; background: #e8f5e9; border: 1px solid #c8e6c9; color: #2e7d32;'>";
            echo "<h3>Subscription สำเร็จ</h3>";
            echo "<p>คุณจะได้รับข้อเสนอพิเศษทางอีเมลล์: <strong>" . htmlspecialchars($email) . "</strong></p>";
            echo "<p style='margin-top: 12px;'><a href='subscribe_form.php' style='color: #1b5e20; text-decoration: underline;'>← กลับสู่หน้าสมัครรับข่าวสาร</a></p>";
            echo "</div>";

        } catch (Exception $e) {
            // ----------------------------------------------------------------------------------
            // ส่วนที่ 10: จัดการกรณีเกิดข้อผิดพลาดในการส่งอีเมล (บรรทัดที่ 32-34 ในใบงาน)
            // ----------------------------------------------------------------------------------
            // กรณีเป็น JSON Request ให้ส่ง Error กลับเป็น JSON พร้อม HTTP Status 500
            if ($isJsonRequest) {
                header('Content-Type: application/json; charset=utf-8');
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'error' => "ไม่สามารถส่งอีเมลล์ถึงคุณได้ : {$mail->ErrorInfo}"
                ]);
                exit;
            }

            // กรณีเป็น Form POST ให้แสดงข้อความแจ้งเตือนสีแดงบนหน้าเว็บ (บรรทัดที่ 33 ในใบงาน)
            header('Content-Type: text/html; charset=utf-8');
            echo "<div style='font-family: sans-serif; padding: 24px; max-width: 500px; margin: 40px auto; border-radius: 12px; background: #ffebee; border: 1px solid #ffcdd2; color: #c62828;'>";
            echo "<h3>เกิดข้อผิดพลาด</h3>";
            echo "<p>ไม่สามารถส่งอีเมลล์ถึงคุณได้ : {$mail->ErrorInfo}</p>";
            echo "<hr style='border: none; border-top: 1px solid #ef9a9a; margin: 12px 0;'>";
            echo "<p style='font-size: 13px; color: #555;'>💡 <em>คำแนะนำ: ตรวจสอบการตั้งค่า Gmail App Password ในไฟล์ backend/.env</em></p>";
            echo "<p style='margin-top: 12px;'><a href='subscribe_form.php' style='color: #b71c1c; text-decoration: underline;'>← ลองใหม่อีกครั้ง</a></p>";
            echo "</div>";
        }
    } else {
        // --------------------------------------------------------------------------------------
        // ส่วนที่ 11: กรณีรูปแบบอีเมลไม่ถูกต้องหรือไม่พบอีเมล (บรรทัดที่ 35-37 ในใบงาน)
        // --------------------------------------------------------------------------------------
        if ($isJsonRequest) {
            header('Content-Type: application/json; charset=utf-8');
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'ไม่มีอีเมลล์นี้หรือไม่ถูกต้อง']);
            exit;
        }
        header('Content-Type: text/html; charset=utf-8');
        echo "<div style='font-family: sans-serif; padding: 20px; text-align: center;'>⚠️ ไม่มีอีเมลล์นี้หรือไม่ถูกต้อง</div>";
    }
} else {
    // ------------------------------------------------------------------------------------------
    // ส่วนที่ 12: กรณีมีผู้พยายามเข้าถึงไฟล์โดยตรงโดยไม่ส่งข้อมูลแบบ POST (บรรทัดที่ 38-40 ในใบงาน)
    // ------------------------------------------------------------------------------------------
    header('Content-Type: text/html; charset=utf-8');
    echo "<div style='font-family: sans-serif; padding: 20px; text-align: center;'>Access Denied.</div>";
}
?>
