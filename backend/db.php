<?php
/**
 * VIA ALTO — Database Service (PostgreSQL via PDO)
 * ดึงข้อมูลสินค้าและรูปภาพจาก Database จริงมาแสดงในอีเมลแบบไดนามิก
 * รองรับทั้งโหมด Personalized ตามความสนใจ และโหมดระบุ Product IDs โดยตรง
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
 * คำนวณรหัสสินค้า 3 ชิ้นตาม Personalized Profile ของลูกค้า
 */
function getPersonalizedProductIds(array $profile = []): array {
    $activities = $profile['primaryActivities'] ?? [];
    if (empty($activities) && isset($profile['activity'])) {
        $activities = is_array($profile['activity']) ? $profile['activity'] : [$profile['activity']];
    }

    // 1. ผู้ใช้สนใจวิ่งเทรล (Trail Running)
    if (in_array('trail_running', $activities)) {
        return [25, 17, 24]; // Hydration Vest 8L, Trail Runners, Sun Shield Cap
    }

    // 2. ผู้ใช้สนใจแคมป์ปิ้งพักแรม (Camping)
    if (in_array('camping', $activities) && !in_array('trekking', $activities)) {
        return [9, 10, 19]; // Alpine Shelter Tent, Trail Sleeping Bag, Titanium Stove
    }

    // 3. ผู้ใช้สนใจทริปภูเขาสูง / สภาพอากาศหนาวจัด (High Elevation / International)
    $region = $profile['region'] ?? '';
    if ($region === 'international' || in_array('mountaineering', $activities)) {
        return [21, 4, 8]; // Down Jacket 800-Fill, Alpine Shell, Alto Trek Boots
    }

    // 4. ค่าเริ่มต้น: ทริปเดินป่าอัลไพน์ (Trekking / Day Hiking) ตรงตามแบบ Reference Mockup
    return [1, 4, 7]; // Alpine 35L Backpack, Alpine Shell Jacket, Terra Hiking Shoes
}

/**
 * ดึงข้อมูลสินค้าแนะนำจาก Database สำหรับ Personalized Email
 * @param array $productIds หรือ array $profile
 * @return array รายการสินค้าที่พร้อมใช้ในอีเมล
 */
function getRecommendedProductsFromDatabase($target = [1, 4, 7]) {
    // ถ้าส่งมาเป็น profile array ให้คำนวณ product IDs ตาม personalized
    if (is_array($target) && isset($target['primaryActivities']) || isset($target['activity']) || isset($target['region'])) {
        $productIds = getPersonalizedProductIds($target);
    } elseif (is_array($target) && !empty($target) && is_numeric($target[0])) {
        $productIds = $target;
    } else {
        $productIds = [1, 4, 7];
    }

    $pdo = getDbConnection();

    // Mapping ข้อมูลประกอบภาษาไทยสำหรับสินค้า
    $thaiDescs = [
        1 => 'กระเป๋าเป้ขนาดพอดี เหมาะสำหรับทั้งทริปสั้นและทริปหลายวัน',
        4 => 'แจ็คเก็ตกันลม กันน้ำ ระบายอากาศได้ดี เหมาะกับทุกสภาพอากาศ',
        7 => 'รองเท้าเดินป่า น้ำหนักเบา ยึดเกาะดีเยี่ยมทุกเส้นทาง',
        25 => 'เสื้อกั๊กวิ่งเทรลน้ำหนักเบาพิเศษ พร้อมช่องใส่ขวดน้ำคู่ 500ml',
        17 => 'รองเท้าวิ่งเทรลยึดเกาะทุกสภาพพื้นผิว ตอบสนองทุกก้าววิ่ง',
        24 => 'หมวกกันแดดสะท้อนรังสี UV แห้งไว ระบายอากาศรอบทิศทาง',
        9 => 'เต็นท์อัลไพน์น้ำหนักเบา กันลมกันฝนระดับพายุ 3 ฤดู',
        10 => 'ถุงนอนขนเป็ดกะทัดรัด ทนอุณหภูมิ 0°C พกพาสะดวก',
        19 => 'เตาแก๊สไทเทเนียมพร้อมหม้อ น้ำหนักเบาพิเศษ ต้มน้ำเดือดไว',
        21 => 'เสื้อขนเป็ดแท้ 800-Fill ให้ความอบอุ่นสูงสุดบนยอดดอย',
        8 => 'รองเท้าบูตเดินป่าระดับโปร กันน้ำ 100% ซัพพอร์ตข้อเท้าเยี่ยม',
    ];
    $badges = [
        1 => 'BEST SELLER',
        4 => 'TRENDING',
        7 => 'NEW',
        25 => 'BEST SELLER',
        17 => 'NEW',
        24 => 'ESSENTIAL',
        9 => 'FEATURED',
        10 => 'RECOMMENDED',
        19 => 'ULTRALIGHT',
        21 => 'TOP RATED',
        8 => 'ALPINE PRO',
    ];
    $reviews = [
        1 => '128',
        4 => '74',
        7 => '96',
        25 => '89',
        17 => '62',
        24 => '45',
        9 => '115',
        10 => '78',
        19 => '54',
        21 => '93',
        8 => '67',
    ];

    if (!$pdo) {
        // Fallback static array if DB down
        $fallback = [];
        foreach ($productIds as $idx => $pid) {
            $fallback[] = [
                'id' => $pid,
                'name' => ($pid === 1 ? 'Alpine 35L Backpack' : ($pid === 4 ? 'Alpine Shell Jacket' : 'Terra Hiking Shoes')),
                'category' => ($pid === 1 ? 'BACKPACKS' : ($pid === 4 ? 'CLOTHING' : 'FOOTWEAR')),
                'badge' => $badges[$pid] ?? 'FEATURED',
                'desc' => $thaiDescs[$pid] ?? 'อุปกรณ์คุณภาพสูงสำหรับการผจญภัย',
                'rating' => $reviews[$pid] ?? '100',
                'price' => ($pid === 1 ? '฿2,490' : ($pid === 4 ? '฿2,890' : '฿3,290')),
                'image_file' => ($pid === 1 ? 'prod_alpine_35l.jpg' : ($pid === 4 ? 'prod_alpine_shell.jpg' : 'prod_terra_shoes.jpg')),
                'cid' => "recom_prod_" . ($idx + 1)
            ];
        }
        return $fallback;
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

        $formatted = [];
        foreach ($dbRows as $i => $row) {
            $pid = (int)$row['id'];
            $cardIdx = $i + 1;
            $dbImg = basename($row['image_url']);

            $formatted[] = [
                'id' => $pid,
                'name' => $row['name_en'],
                'category' => $row['category_name'] ?: 'ALPINE GEAR',
                'badge' => $badges[$pid] ?? ($row['badge_en'] ?: 'RECOMMENDED'),
                'desc' => $thaiDescs[$pid] ?? ($row['name_th'] ?: 'อุปกรณ์คุณภาพสูงสำหรับการผจญภัย'),
                'rating' => $reviews[$pid] ?? ($row['review_count'] ?: '99'),
                'price' => '฿' . number_format($row['price_thb']),
                'image_file' => $dbImg,
                'cid' => "recom_prod_{$cardIdx}"
            ];
        }

        return $formatted;
    } catch (Exception $e) {
        error_log("Failed to query recommended products: " . $e->getMessage());
        return [];
    }
}
