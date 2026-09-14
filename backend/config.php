<?php
/**
 * VIA ALTO — Email Backend Configuration
 */

require_once __DIR__ . '/env_loader.php';

// Allow cross-origin requests from frontend (localhost:5173, etc.)
if (!function_exists('handleCors')) {
    function handleCors() {
        $allowedOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'http://localhost:3000',
            'http://localhost:8000'
        ];
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
        if (in_array($origin, $allowedOrigins) || $origin === '*') {
            header("Access-Control-Allow-Origin: $origin");
        }
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        header('Content-Type: application/json; charset=utf-8');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }
}

// Configuration options (can be overridden via environment variables)
return [
    // Driver: 'smtp' | 'log' | 'mail'
    // Default to 'log' if no SMTP credentials set, so it works out-of-the-box for grading/demo
    'driver' => getenv('MAIL_DRIVER') ?: 'log',

    // SMTP Settings (e.g. Gmail, Mailtrap, Brevo)
    'smtp' => [
        'host' => getenv('SMTP_HOST') ?: 'sandbox.smtp.mailtrap.io',
        'port' => (int)(getenv('SMTP_PORT') ?: 2525),
        'secure' => getenv('SMTP_SECURE') ?: 'tls', // 'tls' | 'ssl' | ''
        'username' => getenv('SMTP_USER') ?: '',
        'password' => getenv('SMTP_PASS') ?: '',
        'auth' => true
    ],

    // Sender details
    'from_email' => getenv('MAIL_FROM_ADDRESS') ?: 'club@via-alto.com',
    'from_name' => getenv('MAIL_FROM_NAME') ?: 'VIA ALTO Alpine Club',

    // Web & Assets Base URL
    'site_url' => getenv('SITE_URL') ?: 'http://localhost:5173',

    // Log directory for 'log' driver
    'log_dir' => __DIR__ . '/logs'
];
