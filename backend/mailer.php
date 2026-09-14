<?php
/**
 * VIA ALTO — Reusable PHPMailer Helper
 */

require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendViaAltoEmail($toEmail, $toName, $subject, $htmlBody, $altBody = '', $embeddedImages = []) {
    $config = require __DIR__ . '/config.php';

    // 1. If driver is 'log' or SMTP is unconfigured, record email into logs and generate preview HTML file
    if ($config['driver'] === 'log' || empty($config['smtp']['username'])) {
        $logDir = $config['log_dir'];
        if (!is_dir($logDir)) {
            mkdir($logDir, 0777, true);
        }

        $timestamp = date('Y-m-d_H-i-s');
        $safeEmail = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $toEmail);
        $previewFile = "{$logDir}/email_{$timestamp}_{$safeEmail}.html";
        file_put_contents($previewFile, $htmlBody);

        $logEntry = sprintf(
            "[%s] SENT (LOG DRIVER) To: %s <%s> | Subject: %s | Preview: %s\n",
            date('c'),
            $toName,
            $toEmail,
            $subject,
            basename($previewFile)
        );
        file_put_contents("{$logDir}/emails.log", $logEntry, FILE_APPEND);

        return [
            'success' => true,
            'driver' => 'log',
            'message' => 'Email simulated and saved successfully to logs/ directory.',
            'preview_file' => $previewFile,
            'preview_url' => basename($previewFile)
        ];
    }

    // 2. Real SMTP via PHPMailer
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = $config['smtp']['host'];
        $mail->SMTPAuth   = $config['smtp']['auth'];
        $mail->Username   = $config['smtp']['username'];
        $mail->Password   = $config['smtp']['password'];
        $mail->SMTPSecure = $config['smtp']['secure'] === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $config['smtp']['port'];
        $mail->CharSet    = 'UTF-8';

        // Recipients
        $mail->setFrom($config['from_email'], $config['from_name']);
        $mail->addAddress($toEmail, $toName);
        $mail->addReplyTo($config['from_email'], $config['from_name']);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $htmlBody;
        $mail->AltBody = $altBody ?: strip_tags($htmlBody);

        // Embedded Images (CID)
        if (!empty($embeddedImages)) {
            foreach ($embeddedImages as $img) {
                if (isset($img['path']) && file_exists($img['path']) && isset($img['cid'])) {
                    $mail->addEmbeddedImage($img['path'], $img['cid'], $img['name'] ?? basename($img['path']));
                }
            }
        }

        $mail->send();

        // Also log successful SMTP send
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

        return [
            'success' => true,
            'driver' => 'smtp',
            'message' => 'Email sent successfully via SMTP.'
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'driver' => 'smtp',
            'error' => $mail->ErrorInfo,
            'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"
        ];
    }
}
