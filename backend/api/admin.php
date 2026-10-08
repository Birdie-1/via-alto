<?php
/**
 * =========================================================================
 * VIA ALTO — Admin Backend Management API
 * ให้บริการ Endpoint สำหรับระบบหลังบ้าน (Admin Dashboard)
 * สำหรับจัดการ Subscribers, Registrations, และคำสั่ง Clear ข้อมูล
 * =========================================================================
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Cache-Control: no-cache, no-store, must-revalidate');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$action = $_GET['action'] ?? '';
$dataDir = __DIR__ . '/../data';
$subscribersJson = $dataDir . '/subscribers.json';
$subscribersTxt = __DIR__ . '/../subscribers.txt';
$registrationsJson = $dataDir . '/registrations.json';
$rateLimitsJson = $dataDir . '/rate_limits.json';

// Helper: Ensure data dir exists
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}

// Read raw body if JSON
$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true) ?: $_POST;

switch ($action) {
    // -------------------------------------------------------------------------
    // 1. GET Subscribers List
    // -------------------------------------------------------------------------
    case 'subscribers':
        $subscribers = [];
        $emailSet = [];

        // Read from subscribers.json
        if (file_exists($subscribersJson)) {
            $raw = json_decode(file_get_contents($subscribersJson), true);
            if (is_array($raw)) {
                foreach ($raw as $item) {
                    $email = strtolower(trim(is_array($item) ? ($item['email'] ?? '') : $item));
                    if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
                        $emailSet[$email] = true;
                        $subscribers[] = [
                            'email' => $email,
                            'name' => is_array($item) ? ($item['name'] ?? 'Explorer') : 'Explorer',
                            'date' => is_array($item) ? ($item['date'] ?? $item['subscribed_at'] ?? date('Y-m-d')) : date('Y-m-d'),
                            'status' => 'Active',
                            'source' => is_array($item) ? ($item['source'] ?? 'Newsletter Form') : 'Newsletter Form'
                        ];
                    }
                }
            }
        }

        // Merge from subscribers.txt if any missing
        if (file_exists($subscribersTxt)) {
            $lines = file($subscribersTxt, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            if (is_array($lines)) {
                foreach ($lines as $line) {
                    $email = strtolower(trim($line));
                    if ($email && filter_var($email, FILTER_VALIDATE_EMAIL) && !isset($emailSet[$email])) {
                        $emailSet[$email] = true;
                        $subscribers[] = [
                            'email' => $email,
                            'name' => 'Explorer',
                            'date' => date('Y-m-d'),
                            'status' => 'Active',
                            'source' => 'Text Store'
                        ];
                    }
                }
            }
        }

        echo json_encode([
            'success' => true,
            'total' => count($subscribers),
            'subscribers' => $subscribers
        ]);
        break;

    // -------------------------------------------------------------------------
    // 2. DELETE Single Subscriber
    // -------------------------------------------------------------------------
    case 'delete_subscriber':
        $targetEmail = strtolower(trim($body['email'] ?? $_GET['email'] ?? ''));
        if (!$targetEmail) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Email is required.']);
            exit();
        }

        // Update subscribers.json
        if (file_exists($subscribersJson)) {
            $raw = json_decode(file_get_contents($subscribersJson), true) ?: [];
            $filtered = array_values(array_filter($raw, function ($item) use ($targetEmail) {
                $email = strtolower(trim(is_array($item) ? ($item['email'] ?? '') : $item));
                return $email !== $targetEmail;
            }));
            file_put_contents($subscribersJson, json_encode($filtered, JSON_PRETTY_PRINT));
        }

        // Update subscribers.txt
        if (file_exists($subscribersTxt)) {
            $lines = file($subscribersTxt, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
            $filteredLines = array_filter($lines, function ($line) use ($targetEmail) {
                return strtolower(trim($line)) !== $targetEmail;
            });
            file_put_contents($subscribersTxt, implode("\n", $filteredLines) . (count($filteredLines) > 0 ? "\n" : ''));
        }

        echo json_encode([
            'success' => true,
            'message' => "Removed subscriber {$targetEmail} successfully."
        ]);
        break;

    // -------------------------------------------------------------------------
    // 3. CLEAR All Subscribers
    // -------------------------------------------------------------------------
    case 'clear_subscribers':
        file_put_contents($subscribersJson, '[]');
        file_put_contents($subscribersTxt, '');
        echo json_encode([
            'success' => true,
            'message' => 'All subscribers cleared successfully.'
        ]);
        break;

    // -------------------------------------------------------------------------
    // 4. GET Backend Registrations
    // -------------------------------------------------------------------------
    case 'registrations':
        $registrations = [];
        if (file_exists($registrationsJson)) {
            $registrations = json_decode(file_get_contents($registrationsJson), true) ?: [];
        }
        echo json_encode([
            'success' => true,
            'total' => count($registrations),
            'registrations' => $registrations
        ]);
        break;

    // -------------------------------------------------------------------------
    // 5. CLEAN Backend Members & Subscribers (Simulates `npm run clean:members`)
    // -------------------------------------------------------------------------
    case 'clean_members':
        file_put_contents($registrationsJson, '[]');
        file_put_contents($subscribersJson, '[]');
        file_put_contents($subscribersTxt, '');
        file_put_contents($rateLimitsJson, '{}');

        echo json_encode([
            'success' => true,
            'message' => 'Cleared all backend registrations, subscribers, and rate limits successfully!'
        ]);
        break;

    // -------------------------------------------------------------------------
    // 6. Quick Dashboard Stats
    // -------------------------------------------------------------------------
    case 'stats':
    default:
        $subCount = 0;
        if (file_exists($subscribersJson)) {
            $raw = json_decode(file_get_contents($subscribersJson), true) ?: [];
            $subCount = count($raw);
        }
        $regCount = 0;
        if (file_exists($registrationsJson)) {
            $raw = json_decode(file_get_contents($registrationsJson), true) ?: [];
            $regCount = count($raw);
        }

        echo json_encode([
            'success' => true,
            'stats' => [
                'subscribersCount' => $subCount,
                'registrationsCount' => $regCount,
                'serverTime' => date('c')
            ]
        ]);
        break;
}
