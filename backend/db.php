<?php
/**
 * ==============================================================================================
 * ไฟล์: db.php
 * คำอธิบาย: คลาสเชื่อมต่อฐานข้อมูล PostgreSQL ผ่าน PDO และอัลกอริทึมคำนวณสินค้าแนะนำเฉพาะบุคคล (Personalized)
 * สอดคล้องกับ: โจทย์การบ้านขั้นตอนที่ 3 (Personalized Marketing แนะนำสินค้า 3 ชิ้นตามความสนใจ)
 * ==============================================================================================
 */

/**
 * ฟังก์ชันสร้างและส่งคืนการเชื่อมต่อฐานข้อมูล PostgreSQL แบบ Singleton (PDO)
 * @return PDO|null ออบเจกต์การเชื่อมต่อ PDO หรือ null หากเชื่อมต่อไม่สำเร็จ
 */
function getDbConnection() {
    // ใช้ตัวแปร static เพื่อป้องกันการสร้างการเชื่อมต่อซ้ำซ้อนใน Request เดียวกัน
    static $pdo = null;
    // หากเคยเชื่อมต่อแล้ว ให้ส่งคืนออบเจกต์เดิมได้ทันที
    if ($pdo !== null) {
        return $pdo;
    }

    // กำหนดค่าพื้นฐานของ PostgreSQL จาก Environment หรือใช้ค่าเริ่มต้น
    $host = getenv('DB_HOST') ?: 'localhost';
    $port = getenv('DB_PORT') ?: '5432';
    $dbname = getenv('DB_NAME') ?: 'via_alto';
    $user = getenv('DB_USER') ?: 'get_wrecked';
    $pass = getenv('DB_PASS') ?: '';

    // ตรวจสอบว่ามีการกำหนด DATABASE_URL ใน server/.env หรือไม่
    $dbUrl = getenv('DATABASE_URL');
    if (!$dbUrl && file_exists(__DIR__ . '/../server/.env')) {
        // อ่านไฟล์ server/.env ทีละบรรทัด
        $envLines = file(__DIR__ . '/../server/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($envLines as $line) {
            $trimmed = trim($line);
            // ค้นหาบรรทัดที่ขึ้นต้นด้วย DATABASE_URL=
            if (str_starts_with($trimmed, 'DATABASE_URL=')) {
                $dbUrl = trim(substr($trimmed, strlen('DATABASE_URL=')), "\"'");
                break;
            }
        }
    }

    // หากพบ DATABASE_URL ให้ถอดรหัส URL เพื่อแยก Host, Port, User, Password, DB Name
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
        // กำหนด DSN สำหรับไดรเวอร์ pgsql ของ PDO
        $dsn = "pgsql:host={$host};port={$port};dbname={$dbname}";
        // สร้างการเชื่อมต่อ PDO
        $pdo = new PDO($dsn, $user, $pass, [
            // กำหนดให้โยน Exception เมื่อเกิดข้อผิดพลาดในการคิวรี
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            // ดึงผลลัพธ์ในรูปแบบ Associative Array เสมอ
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            // กำหนด Timeout ในการเชื่อมต่อที่ 3 วินาที
            PDO::ATTR_TIMEOUT => 3
        ]);
        return $pdo;
    } catch (Exception $e) {
        // บันทึกข้อผิดพลาดลง System Log หากเชื่อมต่อฐานข้อมูลไม่สำเร็จ
        error_log("Database connection failed: " . $e->getMessage());
        return null;
    }
}

/**
 * ฟังก์ชันคำนวณรหัสสินค้า 3 ชิ้นให้ตรงกับโปรไฟล์ความสนใจของลูกค้า (Personalized Logic - Step 3)
 * @param array $profile ข้อมูลโปรไฟล์ของผู้ใช้ที่ได้จากแบบสอบถามลงทะเบียน
 * @return array รายการรหัสสินค้า 3 ตัว เช่น [1, 4, 7]
 */
function getPersonalizedProductIds(array $profile = []): array {
    // ดึงกิจกรรมที่สนใจจาก primaryActivities หรือ activity
    $activities = $profile['primaryActivities'] ?? [];
    if (empty($activities) && isset($profile['activity'])) {
        $activities = is_array($profile['activity']) ? $profile['activity'] : [$profile['activity']];
    }

    // ------------------------------------------------------------------------------------------
    // กฎข้อที่ 1: กลุ่มลูกค้าที่สนใจการวิ่งเทรล (Trail Running)
    // ------------------------------------------------------------------------------------------
    if (in_array('trail_running', $activities)) {
        // #25: Hydration Vest 8L (เสื้อกั๊กวิ่งเทรล), #17: Trail Runners (รองเท้าวิ่งเทรล), #24: Sun Shield Cap (หมวกกันแดด)
        return [25, 17, 24];
    }

    // ------------------------------------------------------------------------------------------
    // กฎข้อที่ 2: กลุ่มลูกค้าที่สนใจการตั้งแคมป์พักแรม (Camping)
    // ------------------------------------------------------------------------------------------
    if (in_array('camping', $activities) && !in_array('trekking', $activities)) {
        // #9: Alpine Shelter Tent (เต็นท์อัลไพน์), #10: Trail Sleeping Bag (ถุงนอนขนเป็ด), #19: Titanium Stove (เตาไทเทเนียม)
        return [9, 10, 19];
    }

    // ------------------------------------------------------------------------------------------
    // กฎข้อที่ 3: กลุ่มลูกค้าทริปยอดเขาสูง / สภาพอากาศหนาวจัด / ทริปต่างประเทศ (High Elevation)
    // ------------------------------------------------------------------------------------------
    $region = $profile['region'] ?? '';
    if ($region === 'international' || in_array('mountaineering', $activities)) {
        // #21: Down Jacket 800-Fill (เสื้อขนเป็ดกันหนาวจัด), #4: Alpine Shell (เสื้อแจ็คเก็ตกันลมฝน), #8: Alto Trek Boots (รองเท้าบูตลุยหิมะ)
        return [21, 4, 8];
    }

    // ------------------------------------------------------------------------------------------
    // กฎข้อที่ 4: ค่าเริ่มต้น หรือกลุ่มเดินป่าอัลไพน์ (Trekking / Day Hiking) ตรงตามแบบ Reference Mockup
    // ------------------------------------------------------------------------------------------
    // #1: Alpine 35L Backpack (กระเป๋าเป้ 35 ลิตร), #4: Alpine Shell Jacket (แจ็คเก็ตกันลมฝน), #7: Terra Hiking Shoes (รองเท้าเดินป่า)
    return [1, 4, 7];
}

/**
 * ฟังก์ชันดึงข้อมูลสินค้าแนะนำจากตาราง products ใน PostgreSQL และจัดรูปแบบสำหรับอีเมล
 * @param array $target รับเป็น array ของ profile หรือ array ของ product IDs
 * @return array รายการข้อมูลสินค้าที่พร้อมเรนเดอร์ในอีเมล
 */
function getRecommendedProductsFromDatabase($target = [1, 4, 7]) {
    // ตรวจสอบว่าส่งเข้ามาเป็น Profile หรือ Array ของ ID
    if (is_array($target) && (isset($target['primaryActivities']) || isset($target['activity']) || isset($target['region']))) {
        // คำนวณหา Product IDs 3 ชิ้นตาม Personalized Logic
        $productIds = getPersonalizedProductIds($target);
    } elseif (is_array($target) && !empty($target) && is_numeric($target[0])) {
        // หากส่ง Product IDs มาโดยตรง ให้ใช้ค่านั้น
        $productIds = $target;
    } else {
        // ค่าเริ่มต้น
        $productIds = [1, 4, 7];
    }

    // สร้างการเชื่อมต่อฐานข้อมูล
    $pdo = getDbConnection();

    // ข้อความอธิบายภาษาไทยสำหรับแสดงใต้ชื่อสินค้าในอีเมล
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

    // ป้ายสถานะสินค้า (Badges)
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

    // จำนวนรีวิวสินค้าสำหรับแสดงความน่าเชื่อถือ
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

    // กรณีที่เชื่อมต่อฐานข้อมูลไม่ได้ (Fallback Offline Mode)
    if (!$pdo) {
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
        // แปลง Array ของ ID ให้เป็นตัวเลขจำนวนเต็มเพื่อความปลอดภัย
        $inQuery = implode(',', array_map('intval', $productIds));
        
        // คิวรีดึงข้อมูลจากตาราง products โดยเรียงลำดับผลลัพธ์ตามลำดับ ID ที่ส่งเข้าไป
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
        // วนลูปแปลงข้อมูลจากฐานข้อมูลให้เป็นรูปแบบที่พร้อมใช้ในอีเมล
        foreach ($dbRows as $i => $row) {
            $pid = (int)$row['id'];
            $cardIdx = $i + 1;
            // ดึงชื่อไฟล์รูปภาพจาก image_url ในฐานข้อมูล (เช่น prod_alpine_35l.jpg)
            $dbImg = basename($row['image_url']);

            $formatted[] = [
                'id' => $pid,
                'name' => $row['name_en'],
                'category' => $row['category_name'] ?: 'ALPINE GEAR',
                'badge' => $badges[$pid] ?? ($row['badge_en'] ?: 'RECOMMENDED'),
                'desc' => $thaiDescs[$pid] ?? ($row['name_th'] ?: 'อุปกรณ์คุณภาพสูงสำหรับการผจญภัย'),
                'rating' => $reviews[$pid] ?? ($row['review_count'] ?: '99'),
                'price' => '฿' . number_format($row['price_thb']), // จัดรูปแบบราคา เช่น ฿2,490
                'image_file' => $dbImg,
                'cid' => "recom_prod_{$cardIdx}" // กำหนดชื่อตัวแทนรูปสำหรับ CID
            ];
        }

        return $formatted;
    } catch (Exception $e) {
        error_log("Failed to query recommended products: " . $e->getMessage());
        return [];
    }
}
