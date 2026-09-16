<?php
/**
 * VIA ALTO — Lightweight IP Rate Limiter
 * ป้องกันการสแปมยิงอีเมลและรักษา Quota ของ SMTP
 */

function checkRateLimit(string $action = 'email', int $maxRequests = 5, int $decaySeconds = 300): bool {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    // Handle comma-separated proxy IPs
    if (str_contains($ip, ',')) {
        $ip = trim(explode(',', $ip)[0]);
    }

    $rateFile = __DIR__ . '/data/rate_limits.json';
    $rateDir = dirname($rateFile);
    if (!is_dir($rateDir)) {
        @mkdir($rateDir, 0777, true);
    }

    $limits = [];
    if (file_exists($rateFile)) {
        $data = @file_get_contents($rateFile);
        $limits = !empty($data) ? @json_decode($data, true) : [];
        if (!is_array($limits)) {
            $limits = [];
        }
    }

    $key = md5("{$action}_{$ip}");
    $now = time();

    // Clean up expired entries across all records
    foreach ($limits as $k => $record) {
        if (!isset($record['expires']) || $record['expires'] < $now) {
            unset($limits[$k]);
        }
    }

    if (isset($limits[$key])) {
        if ($limits[$key]['count'] >= $maxRequests) {
            $retryAfter = $limits[$key]['expires'] - $now;
            http_response_code(429);
            header("Retry-After: {$retryAfter}");
            echo json_encode([
                'success' => false,
                'error' => 'Too many email requests from your IP. Please try again later.',
                'error_th' => 'คำขอส่งอีเมลถี่เกินกำหนด เพื่อความปลอดภัยกรุณารออีกสักครู่ก่อนลองใหม่',
                'retry_after_seconds' => max(1, $retryAfter)
            ]);
            exit();
        }
        $limits[$key]['count']++;
    } else {
        $limits[$key] = [
            'ip' => $ip,
            'action' => $action,
            'count' => 1,
            'expires' => $now + $decaySeconds
        ];
    }

    @file_put_contents($rateFile, json_encode($limits, JSON_PRETTY_PRINT));
    return true;
}
