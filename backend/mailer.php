<?php
/**
 * VIA ALTO — Reusable PHPMailer Helper
 * สคริปต์กลางสำหรับส่งอีเมล รองรับทั้ง Driver: SMTP (ส่งจริงผ่าน PHPMailer)
 * และ Driver: log (จำลองการส่งลงไฟล์ HTML สำหรับเทสแบบออฟไลน์)
 */

// บรรทัดที่ 8: โหลดระบบ Autoload ของ Composer สำหรับเรียกใช้งาน PHPMailer Library
require_once __DIR__ . '/vendor/autoload.php';

// บรรทัดที่ 11: นำเข้า Class PHPMailer สำหรับจัดการส่งอีเมล
use PHPMailer\PHPMailer\PHPMailer;
// บรรทัดที่ 13: นำเข้า Class Exception สำหรับดักจับข้อผิดพลาดของ PHPMailer
use PHPMailer\PHPMailer\Exception;

// บรรทัดที่ 16: ประกาศฟังก์ชันกลาง sendViaAltoEmail สำหรับส่งอีเมลของแบรนด์ VIA ALTO
// $toEmail: ที่อยู่อีเมลผู้รับ
// $toName: ชื่อผู้รับ
// $subject: หัวข้ออีเมล
// $htmlBody: เนื้อหาอีเมลในรูปแบบ HTML
// $altBody: ข้อความสำรองกรณีโปรแกรมเปิดอ่านอีเมลไม่รองรับ HTML (Plain Text)
// $embeddedImages: รายการรูปภาพที่ต้องการแนบแบบ CID (Inline Embedded Images)
function sendViaAltoEmail($toEmail, $toName, $subject, $htmlBody, $altBody = '', $embeddedImages = []) {
    // บรรทัดที่ 24: โหลดการตั้งค่าการเชื่อมต่อเมลจาก config.php
    $config = require __DIR__ . '/config.php';

    // บรรทัดที่ 27: ส่วนที่ 1 — ตรวจสอบว่าเปิดโหมด log หรือไม่ได้ตั้งค่า SMTP Username ไว้หรือไม่
    // หากเข้าเงื่อนไข จะทำการจำลองการส่งโดยบันทึกเนื้อหาลงเป็นไฟล์ HTML พรีวิวใน logs/
    if ($config['driver'] === 'log' || empty($config['smtp']['username'])) {
        // บรรทัดที่ 30: ดึงโฟลเดอร์สำหรับเก็บไฟล์ Log
        $logDir = $config['log_dir'];
        // บรรทัดที่ 32: ถ้าโฟลเดอร์ยังไม่มี ให้สร้างขึ้นใหม่ด้วยสิทธิ์ 0777
        if (!is_dir($logDir)) {
            mkdir($logDir, 0777, true);
        }

        // บรรทัดที่ 37: สร้าง Timestamp สำหรับตั้งชื่อไฟล์ เช่น 2026-09-17_09-30-00
        $timestamp = date('Y-m-d_H-i-s');
        // บรรทัดที่ 39: ทำความสะอาดอีเมล ลบอักขระพิเศษเพื่อนำมาเป็นชื่อไฟล์ที่ปลอดภัย
        $safeEmail = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $toEmail);
        // บรรทัดที่ 41: กำหนดชื่อไฟล์พรีวิว HTML
        $previewFile = "{$logDir}/email_{$timestamp}_{$safeEmail}.html";
        // บรรทัดที่ 43: บันทึกเนื้อหา HTML ลงในไฟล์พรีวิว
        file_put_contents($previewFile, $htmlBody);

        // บรรทัดที่ 46: สร้างข้อความสรุปประวัติการส่งลงในไฟล์ emails.log
        $logEntry = sprintf(
            "[%s] SENT (LOG DRIVER) To: %s <%s> | Subject: %s | Preview: %s\n",
            date('c'),
            $toName,
            $toEmail,
            $subject,
            basename($previewFile)
        );
        // บรรทัดที่ 54: ต่อท้ายข้อความลงใน emails.log
        file_put_contents("{$logDir}/emails.log", $logEntry, FILE_APPEND);

        // บรรทัดที่ 57: ส่งผลลัพธ์จำลองสำเร็จกลับไปยังผู้เรียก
        return [
            'success' => true,
            'driver' => 'log',
            'message' => 'Email simulated and saved successfully to logs/ directory.',
            'preview_file' => $previewFile,
            'preview_url' => basename($previewFile)
        ];
    }

    // บรรทัดที่ 67: ส่วนที่ 2 — การส่งอีเมลจริงออกไปยังเซิร์ฟเวอร์ SMTP ผ่าน PHPMailer
    // บรรทัดที่ 68: สร้าง Instance ของ PHPMailer พร้อมเปิดโหมดโยน Exception เมื่อเกิดข้อผิดพลาด
    $mail = new PHPMailer(true);

    try {
        // บรรทัดที่ 72: ตั้งค่าให้ส่งผ่านโพรโทคอล SMTP
        $mail->isSMTP();
        // บรรทัดที่ 74: กำหนดโฮสต์ของ SMTP Server เช่น smtp.gmail.com หรือ Mailtrap
        $mail->Host       = $config['smtp']['host'];
        // บรรทัดที่ 76: เปิดใช้งานระบบยืนยันตัวตน SMTP Authentication
        $mail->SMTPAuth   = $config['smtp']['auth'];
        // บรรทัดที่ 78: กำหนด Username สำหรับล็อกอิน SMTP
        $mail->Username   = $config['smtp']['username'];
        // บรรทัดที่ 80: กำหนด Password หรือ App Password สำหรับล็อกอิน SMTP
        $mail->Password   = $config['smtp']['password'];
        // บรรทัดที่ 82: กำหนดระบบการเข้ารหัสความปลอดภัย: SSL (SMTPS) หรือ TLS (STARTTLS)
        $mail->SMTPSecure = $config['smtp']['secure'] === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
        // บรรทัดที่ 84: กำหนดหมายเลขพอร์ต เช่น 587 (TLS) หรือ 465 (SSL)
        $mail->Port       = $config['smtp']['port'];
        // บรรทัดที่ 86: กำหนดรหัสภาษาของเนื้อหาอีเมลเป็น UTF-8 เพื่อรองรับภาษาไทย
        $mail->CharSet    = 'UTF-8';

        // บรรทัดที่ 89: กำหนดผู้ส่ง (Sender Address & Name)
        $mail->setFrom($config['from_email'], $config['from_name']);
        // บรรทัดที่ 91: เพิ่มผู้รับปลายทาง (Recipient Address & Name)
        $mail->addAddress($toEmail, $toName);
        // บรรทัดที่ 93: กำหนดที่อยู่อีเมลสำหรับกดตอบกลับ (Reply-To)
        $mail->addReplyTo($config['from_email'], $config['from_name']);

        // บรรทัดที่ 96: กำหนดรูปแบบเนื้อหาเป็น HTML
        $mail->isHTML(true);
        // บรรทัดที่ 98: กำหนดหัวข้อจดหมาย
        $mail->Subject = $subject;
        // บรรทัดที่ 100: กำหนดเนื้อหาจดหมาย HTML
        $mail->Body    = $htmlBody;
        // บรรทัดที่ 102: กำหนดข้อความสำรองแบบ Plain Text กรณีเครื่องอ่านไม่รองรับ HTML
        $mail->AltBody = $altBody ?: strip_tags($htmlBody);

        // บรรทัดที่ 105: วนลูปแนบรูปภาพฝังในตัวอีเมลด้วย CID (Content-ID) เพื่อให้แสดงผลได้ทันทีโดยไม่ถูกบล็อก
        if (!empty($embeddedImages)) {
            foreach ($embeddedImages as $img) {
                // บรรทัดที่ 108: ตรวจสอบว่าระบุ Path, มีไฟล์อยู่จริง และมีชื่อ CID ระบุไว้
                if (isset($img['path']) && file_exists($img['path']) && isset($img['cid'])) {
                    // บรรทัดที่ 110: แนบรูปภาพเข้ากับ PHPMailer พร้อมผูก Content-ID
                    $mail->addEmbeddedImage($img['path'], $img['cid'], $img['name'] ?? basename($img['path']));
                }
            }
        }

        // บรรทัดที่ 115: สั่งส่งอีเมลออกไปยัง SMTP Server
        $mail->send();

        // บรรทัดที่ 118: บันทึก Log การส่งสำเร็จลงใน emails.log
        $logDir = $config['log_dir'];
        if (!is_dir($logDir)) {
            mkdir($logDir, 0777, true);
        }
        $logEntry = sprintf(
            "[%s] SENT (SMTP) To: %s <%s> | Subject: %s\n",
            date('c'),
            $toName,
            $toEmail,
            $subject
        );
        file_put_contents("{$logDir}/emails.log", $logEntry, FILE_APPEND);

        // บรรทัดที่ 132: ส่งผลลัพธ์การส่งสำเร็จกลับไป
        return [
            'success' => true,
            'driver' => 'smtp',
            'message' => 'Email sent successfully via SMTP.'
        ];
    } catch (Exception $e) {
        // บรรทัดที่ 139: หากเกิดข้อผิดพลาดในการเชื่อมต่อหรือส่งเมล ให้จับข้อผิดพลาดและส่งกลับไปเป็น JSON
        return [
            'success' => false,
            'driver' => 'smtp',
            'error' => $mail->ErrorInfo,
            'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"
        ];
    }
}
