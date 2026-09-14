<?php
/**
 * VIA ALTO — Email Dispatcher (Dual-mode: Web Fetch API + Standalone Form)
 * Fulfills Step 2 of the Digital Marketing Lab assignment.
 */

// Enable CORS for frontend integration (localhost:5173, etc.)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// โหลดการตั้งค่า .env เพื่อความปลอดภัย (ไม่ให้รหัสผ่านหลุดขึ้น Git)
require_once __DIR__ . '/env_loader.php';

// โหลดไฟล์ class PHPMailer
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ตรวจสอบการส่งข้อมูลผ่าน POST ที่ส่งจากฟอร์มหน้าเว็บ หรือ subscribe_form.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // รองรับทั้ง JSON fetch จากหน้าเว็บ React และ Form POST จาก subscribe_form.php
    $rawInput = file_get_contents('php://input');
    $jsonInput = !empty($rawInput) ? json_decode($rawInput, true) : null;
    $emailInput = $jsonInput['email'] ?? $_POST['email'] ?? '';
    $isJsonRequest = !empty($jsonInput) || (isset($_SERVER['HTTP_ACCEPT']) && str_contains($_SERVER['HTTP_ACCEPT'], 'application/json'));

    $email = filter_var($emailInput, FILTER_VALIDATE_EMAIL);

    if ($email) {
        $mail = new PHPMailer(true);
        try {
            // ดึงค่าบัญชีผู้ส่งและรหัสผ่านจาก .env (หรือแก้ไขที่นี่หากไม่ได้ใช้ .env)
            $gmailUser = getenv('SMTP_USER') ?: 'xxxx@gmail.com'; // ระบุอีเมลล์ผู้ส่ง
            $gmailPass = getenv('SMTP_PASS') ?: 'xxxx xxxx xxxx xxxx'; // ใช้ app password 16 หลัก

            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = $gmailUser;
            $mail->Password   = $gmailPass;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;
            $mail->CharSet    = 'UTF-8';

            // ข้อกำหนดที่ 3: กำหนดชื่อผู้ส่งแสดงใน inbox ผู้รับ เป็นชื่อร้านค้า
            $mail->setFrom($gmailUser, '🏔️ VIA ALTO');

            // อีเมลล์ผู้รับ (รับตัวแปรจากฟอร์ม subscribe)
            $mail->addAddress($email);

            // ข้อกำหนดที่ 2: แนบรูปสินค้าแนะนำสำหรับลูกค้าใหม่ด้วย addEmbeddedImage
            // โดยเรียกใช้ใน HTML ด้วยคำสั่ง <img src="cid:product_poster">
            $posterPath = __DIR__ . '/images/product_poster.jpg';
            if (file_exists($posterPath)) {
                $mail->addEmbeddedImage($posterPath, 'product_poster');
            }

            // ข้อกำหนดที่ 1: ดึงเนื้อหาอีเมลจากไฟล์ emailContent.php ในบรรทัดที่ 25
            include "emailContent.php";

            $mail->isHTML(true);

            // ข้อกำหนดที่ 4: กำหนดหัวข้อหลักแสดงใน inbox ผู้รับ
            $mail->Subject = '🏔️ ยินดีต้อนรับสู่ VIA ALTO — รับส่วนลดพิเศษ 10% สำหรับคำสั่งซื้อแรก!';
            $mail->Body    = $bodyContent;

            $mail->send();

            // บันทึกอีเมลผู้สมัครลงไฟล์ subscribers.txt
            file_put_contents(__DIR__ . "/subscribers.txt", $email . "\n", FILE_APPEND);

            // 1. ถ้าส่งมาจากหน้าเว็บ React ให้ตอบกลับเป็น JSON
            if ($isJsonRequest) {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode([
                    'success' => true,
                    'message' => "Subscription สำเร็จ. คุณจะได้รับข้อเสนอพิเศษทางอีเมลล์: $email",
                    'email' => $email
                ]);
                exit;
            }

            // 2. ถ้าส่งมาจาก subscribe_form.php ให้แสดงผลหน้าจอ HTML ตามเดิม
            header('Content-Type: text/html; charset=utf-8');
            echo "<div style='font-family: sans-serif; padding: 24px; max-width: 500px; margin: 40px auto; border-radius: 12px; background: #e8f5e9; border: 1px solid #c8e6c9; color: #2e7d32;'>";
            echo "<h3>✔️ Subscription สำเร็จ</h3>";
            echo "<p>คุณจะได้รับข้อเสนอพิเศษทางอีเมลล์: <strong>" . htmlspecialchars($email) . "</strong></p>";
            echo "<p style='margin-top: 12px;'><a href='subscribe_form.php' style='color: #1b5e20; text-decoration: underline;'>← กลับสู่หน้าสมัครรับข่าวสาร</a></p>";
            echo "</div>";

        } catch (Exception $e) {
            if ($isJsonRequest) {
                header('Content-Type: application/json; charset=utf-8');
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'error' => "ไม่สามารถส่งอีเมลล์ถึงคุณได้ : {$mail->ErrorInfo}"
                ]);
                exit;
            }

            header('Content-Type: text/html; charset=utf-8');
            echo "<div style='font-family: sans-serif; padding: 24px; max-width: 500px; margin: 40px auto; border-radius: 12px; background: #ffebee; border: 1px solid #ffcdd2; color: #c62828;'>";
            echo "<h3>❌ เกิดข้อผิดพลาด</h3>";
            echo "<p>ไม่สามารถส่งอีเมลล์ถึงคุณได้ : {$mail->ErrorInfo}</p>";
            echo "<hr style='border: none; border-top: 1px solid #ef9a9a; margin: 12px 0;'>";
            echo "<p style='font-size: 13px; color: #555;'>💡 <em>คำแนะนำ: ตรวจสอบการตั้งค่า Gmail App Password ในไฟล์ backend/.env</em></p>";
            echo "<p style='margin-top: 12px;'><a href='subscribe_form.php' style='color: #b71c1c; text-decoration: underline;'>← ลองใหม่อีกครั้ง</a></p>";
            echo "</div>";
        }
    } else {
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
    header('Content-Type: text/html; charset=utf-8');
    echo "<div style='font-family: sans-serif; padding: 20px; text-align: center;'>Access Denied.</div>";
}
?>
