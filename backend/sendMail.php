<?php
header('Content-Type: text/html; charset=utf-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// โหลดไฟล์ class
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

// ตรวจสอบการส่งข้อมูลผ่าน POST ที่ส่งจากฟอร์ม subscribe
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    if ($email) {
        $mail = new PHPMailer(true);
        try {
            // ตั้งค่า SMTP (สามารถแก้ไขหรือใส่รหัสผ่าน Gmail App Password ของคุณที่นี่)
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
            file_put_contents("subscribers.txt", $email . "\n", FILE_APPEND);

            // แจ้งข้อความสำเร็จตามตัวอย่างของอาจารย์
            echo "<div style='font-family: sans-serif; padding: 24px; max-width: 500px; margin: 40px auto; border-radius: 12px; background: #e8f5e9; border: 1px solid #c8e6c9; color: #2e7d32;'>";
            echo "<h3>✔️ Subscription สำเร็จ</h3>";
            echo "<p>คุณจะได้รับข้อเสนอพิเศษทางอีเมลล์: <strong>" . htmlspecialchars($email) . "</strong></p>";
            echo "<p style='margin-top: 12px;'><a href='subscribe_form.php' style='color: #1b5e20; text-decoration: underline;'>← กลับสู่หน้าสมัครรับข่าวสาร</a></p>";
            echo "</div>";

        } catch (Exception $e) {
            echo "<div style='font-family: sans-serif; padding: 24px; max-width: 500px; margin: 40px auto; border-radius: 12px; background: #ffebee; border: 1px solid #ffcdd2; color: #c62828;'>";
            echo "<h3>❌ เกิดข้อผิดพลาด</h3>";
            echo "<p>ไม่สามารถส่งอีเมลล์ถึงคุณได้ : {$mail->ErrorInfo}</p>";
            echo "<hr style='border: none; border-top: 1px solid #ef9a9a; margin: 12px 0;'>";
            echo "<p style='font-size: 13px; color: #555;'>💡 <em>คำแนะนำสำหรับส่งงาน: หากยังไม่ได้ใส่ Gmail App Password จริง ให้ใส่ App Password 16 ตัวอักษรในไฟล์ sendMail.php บรรทัดที่ 21-22</em></p>";
            echo "<p style='margin-top: 12px;'><a href='subscribe_form.php' style='color: #b71c1c; text-decoration: underline;'>← ลองใหม่อีกครั้ง</a></p>";
            echo "</div>";
        }
    } else {
        echo "<div style='font-family: sans-serif; padding: 20px; text-align: center;'>⚠️ ไม่มีอีเมลล์นี้หรือไม่ถูกต้อง</div>";
    }
} else {
    echo "<div style='font-family: sans-serif; padding: 20px; text-align: center;'>Access Denied.</div>";
}
?>
