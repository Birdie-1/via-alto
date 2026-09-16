<?php
/**
 * VIA ALTO — Newsletter Subscription Email Endpoint
 * Fulfills Step 2 of the assignment:
 * "สร้างไฟล์ .php เพื่อส่งเนื้อหาไปยังอีเมลหลังจาก subscribe (สร้างไว้ใช้สัปดาห์หน้า)"
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/mailer.php';
require_once __DIR__ . '/rate_limiter.php';
require_once __DIR__ . '/templates/welcome_email.php';

// Enable CORS
handleCors();

// Check IP Rate Limit (Max 10 subscribe requests per 5 minutes per IP)
checkRateLimit('subscribe', 10, 300);

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method Not Allowed. Use POST.'
    ]);
    exit();
}

// Parse JSON input or Form POST
$rawInput = file_get_contents('php://input');
$input = !empty($rawInput) ? json_decode($rawInput, true) : null;
if (!$input) {
    $input = $_POST;
}

$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$name = trim($input['name'] ?? '') ?: 'Explorer';
$source = trim($input['source'] ?? 'homepage_cta');

if (!$email) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid email address provided.'
    ]);
    exit();
}

$config = require __DIR__ . '/config.php';

// 1. Save subscriber locally in JSON storage (for step tracking)
$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}
$subscribersFile = $dataDir . '/subscribers.json';
$subscribers = file_exists($subscribersFile) ? json_decode(file_get_contents($subscribersFile), true) : [];
$subscribers[] = [
    'email' => $email,
    'name' => $name,
    'source' => $source,
    'subscribed_at' => date('c')
];
file_put_contents($subscribersFile, json_encode($subscribers, JSON_PRETTY_PRINT));

// 2. Render Email HTML Template
$emailData = [
    'name' => $name,
    'email' => $email,
    'code' => 'GOBEYOND10',
    'discount' => '10% OFF YOUR FIRST ORDER!',
    'site_url' => $config['site_url']
];
$htmlBody = renderWelcomeEmail($emailData);
$subject = '🏔️ Welcome to VIA ALTO — Your Special Welcome Gift: 10% OFF!';

// 3. Send Email via PHPMailer
$result = sendViaAltoEmail($email, $name, $subject, $htmlBody);

// 4. Return JSON response to frontend
http_response_code($result['success'] ? 200 : 500);
echo json_encode([
    'success' => $result['success'],
    'message' => $result['message'],
    'driver' => $result['driver'],
    'email' => $email,
    'voucher_code' => 'GOBEYOND10',
    'preview_url' => $result['preview_url'] ?? null
]);
