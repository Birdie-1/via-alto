<?php
/**
 * VIA ALTO — Lightweight .env File Loader
 * Reads backend/.env securely without requiring external packages.
 */

if (!function_exists('loadEnv')) {
    function loadEnv($envPath = __DIR__ . '/.env') {
        if (!file_exists($envPath)) {
            return;
        }

        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            // Skip comments and empty lines
            if (empty($line) || str_starts_with($line, '#')) {
                continue;
            }

            if (strpos($line, '=') !== false) {
                list($key, $value) = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value, " \t\n\r\0\x0B\"'");

                // Set in environment if not already set by system
                if (!getenv($key)) {
                    putenv("{$key}={$value}");
                    $_ENV[$key] = $value;
                    $_SERVER[$key] = $value;
                }
            }
        }
    }
}

// Auto-load .env on include
loadEnv(__DIR__ . '/.env');
