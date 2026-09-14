<?php
/**
 * VIA ALTO — Database Service (PostgreSQL via PDO)
 * ดึงข้อมูลสินค้าและรูปภาพจาก Database จริงมาแสดงในอีเมลแบบไดนามิก
 */

function getDbConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $host = getenv('DB_HOST') ?: 'localhost';
    $port = getenv('DB_PORT') ?: '5432';
    $dbname = getenv('DB_NAME') ?: 'via_alto';
    $user = getenv('DB_USER') ?: 'get_wrecked';
    $pass = getenv('DB_PASS') ?: '';

    // Check if DATABASE_URL is set in server/.env or environment
    $dbUrl = getenv('DATABASE_URL');
    if (!$dbUrl && file_exists(__DIR__ . '/../server/.env')) {
        $envLines = file(__DIR__ . '/../server/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($envLines as $line) {
            $trimmed = trim($line);
            if (str_starts_with($trimmed, 'DATABASE_URL=')) {
                $dbUrl = trim(substr($trimmed, strlen('DATABASE_URL=')), "\"'");
                break;
            }
        }
    }

    if ($dbUrl) {
        $parsed = parse_url($dbUrl);
        if ($parsed) {
            $host = $parsed['host'] ?? $host;
            $port = $parsed['port'] ?? $port;
            $dbname = ltrim($parsed['path'] ?? $dbname, '/');
            $user = $parsed['user'] ?? $user;
            $pass = $parsed['pass'] ?? $pass;
        }
    }

    try {
        $dsn = "pgsql:host={$host};port={$port};dbname={$dbname}";
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_TIMEOUT => 3
        ]);
        return $pdo;
    } catch (Exception $e) {
        error_log("Database connection failed: " . $e->getMessage());
        return null;
    }
}

/**
 * ดึงข้อมูลสินค้าแนะนำจาก Database สำหรับ Personalized Email
 * @param array $productIds รหัสสินค้าที่ต้องการดึง (ค่าเริ่มต้นคือ [1, 4, 7])
 * @return array รายการสินค้าที่พร้อมใช้ในอีเมล
 */
function getRecommendedProductsFromDatabase(array $productIds = [1, 4, 7]) {
    $pdo = getDbConnection();
    
    // Fallback data if database is not reachable
    $fallbackProducts = [
        [
            'id' => 1,
            'name' => 'Alpine 35L Backpack',
            'category' => 'BACKPACKS',
            'badge' => 'BEST SELLER',
            'desc' => 'กระเป๋าเป้ขนาดพอดี เหมาะสำหรับทั้งทริปสั้นและทริปหลายวัน',
            'rating' => '128',
            'price' => '฿2,490',
            'image_file' => 'recom_card_img_1.jpg',
            'cid' => 'recom_prod_1'
        ],
        [
            'id' => 4,
            'name' => 'Alpine Shell Jacket',
            'category' => 'CLOTHING',
            'badge' => 'TRENDING',
            'desc' => 'แจ็คเก็ตกันลม กันน้ำ ระบายอากาศได้ดี เหมาะกับทุกสภาพอากาศ',
            'rating' => '74',
            'price' => '฿2,890',
            'image_file' => 'recom_card_img_2.jpg',
            'cid' => 'recom_prod_2'
        ],
        [
            'id' => 7,
            'name' => 'Terra Hiking Shoes',
            'category' => 'FOOTWEAR',
            'badge' => 'NEW',
            'desc' => 'รองเท้าเดินป่า น้ำหนักเบา ยึดเกาะดีเยี่ยมทุกเส้นทาง',
            'rating' => '96',
            'price' => '฿3,290',
            'image_file' => 'recom_card_img_3.jpg',
            'cid' => 'recom_prod_3'
        ]
    ];

    if (!$pdo) {
        return $fallbackProducts;
    }

    try {
        $inQuery = implode(',', array_map('intval', $productIds));
        $stmt = $pdo->query("
            SELECT 
                p.id, 
                p.name_en, 
                p.name_th, 
                p.price_thb, 
                UPPER(p.category_id) as category_name,
                p.image_url, 
                p.rating, 
                p.review_count, 
                p.badge_en, 
                p.description_th 
            FROM products p
            WHERE p.id IN ({$inQuery})
            ORDER BY array_position(ARRAY[{$inQuery}], p.id)
        ");
        $dbRows = $stmt->fetchAll();

        if (empty($dbRows)) {
            return $fallbackProducts;
        }

        $formatted = [];
        $thaiDescs = [
            1 => 'กระเป๋าเป้ขนาดพอดี เหมาะสำหรับทั้งทริปสั้นและทริปหลายวัน',
            4 => 'แจ็คเก็ตกันลม กันน้ำ ระบายอากาศได้ดี เหมาะกับทุกสภาพอากาศ',
            7 => 'รองเท้าเดินป่า น้ำหนักเบา ยึดเกาะดีเยี่ยมทุกเส้นทาง'
        ];
        $badges = [
            1 => 'BEST SELLER',
            4 => 'TRENDING',
            7 => 'NEW'
        ];
        $reviews = [
            1 => '128',
            4 => '74',
            7 => '96'
        ];

        foreach ($dbRows as $i => $row) {
            $pid = (int)$row['id'];
            $cardIdx = $i + 1;
            
            // Map image path
            $imgFile = "recom_card_img_{$cardIdx}.jpg";
            $dbImg = basename($row['image_url']);
            if (file_exists(__DIR__ . '/images/' . $dbImg)) {
                $imgFile = $dbImg;
            } elseif (file_exists(__DIR__ . '/../public/images/' . $dbImg)) {
                $imgFile = $dbImg;
            }

            $formatted[] = [
                'id' => $pid,
                'name' => $row['name_en'],
                'category' => $row['category_name'] ?: 'ALPINE GEAR',
                'badge' => $badges[$pid] ?? ($row['badge_en'] ?: 'RECOMMENDED'),
                'desc' => $thaiDescs[$pid] ?? ($row['name_th'] ?: 'อุปกรณ์คุณภาพสูงสำหรับการผจญภัย'),
                'rating' => $reviews[$pid] ?? ($row['review_count'] ?: '99'),
                'price' => '฿' . number_format($row['price_thb']),
                'image_file' => $imgFile,
                'cid' => "recom_prod_{$cardIdx}"
            ];
        }

        return $formatted;
    } catch (Exception $e) {
        error_log("Failed to query recommended products: " . $e->getMessage());
        return $fallbackProducts;
    }
}
