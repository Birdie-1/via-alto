<?php
/**
 * VIA ALTO — Member Registration & Personalized Marketing Email Endpoint
 * Fulfills:
 * - Step 3: Personalized marketing recommending products based on user interests
 * - Step 4: "สร้างไฟล์ .php เพื่อส่งเนื้อหาไปยังอีเมลหลังจากสมัครสมาชิก (สร้างไว้ใช้สัปดาห์หน้า)"
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/mailer.php';
require_once __DIR__ . '/templates/recommendation_email.php';

// Enable CORS
handleCors();

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method Not Allowed. Use POST.'
    ]);
    exit();
}

// Parse input
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$name = trim($input['fullName'] ?? $input['name'] ?? 'Explorer');
$profile = $input['marketingProfile'] ?? [];

if (!$email) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid email address provided.'
    ]);
    exit();
}

$config = require __DIR__ . '/config.php';
$siteUrl = rtrim($config['site_url'], '/');

// 1. Extract Customer Preferences (Step 3 matching logic)
$activities = $profile['primaryActivities'] ?? ['trekking'];
$regionKey = $profile['region'] ?? 'northern';
$level = ucfirst($profile['experienceLevel'] ?? 'intermediate');
$apparelSize = $profile['sizes']['apparel'] ?? 'M';
$footwearSize = $profile['sizes']['footwear'] ?? '42';

$regionLabels = [
    'northern' => 'Northern Thailand (Doi & High Elevation)',
    'central' => 'Central & Bangkok (Weekend Trails)',
    'southern' => 'Southern Coastal (Rain Shells)',
    'northeastern' => 'Northeastern Plateau',
    'international' => 'International Alpine Expeditions'
];
$activityLabels = [
    'day_hiking' => 'Day Hiking',
    'trekking' => 'Alpine Trekking',
    'camping' => 'Mountain Camping',
    'trail_running' => 'Trail Running',
    'travel' => 'Expedition Travel'
];

$activityText = implode(' & ', array_map(fn($a) => $activityLabels[$a] ?? ucfirst($a), $activities)) ?: 'Alpine Trekking';
$regionText = $regionLabels[$regionKey] ?? 'Northern High Elevation';
$sizeText = "Apparel ({$apparelSize}) / Footwear (EU {$footwearSize})";

// 2. Personalized Recommendation Matching Engine (Step 3)
// Dynamically pick the best product based on user's selected activities
if (in_array('trail_running', $activities)) {
    $matchedProduct = [
        'name' => 'Ultralight Hydration Vest',
        'category' => 'Trail Running Pack',
        'price' => '฿2,290',
        'image' => "{$siteUrl}/images/prod_hydration_vest.jpg",
        'specs' => [
            'materials' => 'Breathable Air-Mesh & Ripstop Monofilament',
            'waterproof' => 'Quick-Dry Hydrophobic Coating',
            'weight' => '210 g (Race-Weight Standard)',
            'dimensions' => '10L Capacity with Twin 500ml Flask Sleeves',
            'bestUse' => 'Endurance Mountain Runs & Fast-Packing'
        ]
    ];
} elseif (in_array('camping', $activities) && in_array('trekking', $activities)) {
    $matchedProduct = [
        'name' => 'Alpine 35L Technical Backpack',
        'category' => 'Technical Pack',
        'price' => '฿2,490',
        'image' => "{$siteUrl}/images/prod_alpine_35l.jpg",
        'specs' => [
            'materials' => '210D High-Tenacity Ripstop Nylon / Cordura®',
            'waterproof' => '20,000 mm + Integrated Rain Cover',
            'weight' => '980 g (Ultralight Standard)',
            'dimensions' => '58 x 30 x 22 cm (35 Liters)',
            'bestUse' => 'Multi-Day Treks & Alpine Ridge Routes'
        ]
    ];
} else {
    $matchedProduct = [
        'name' => 'Alpine Shell Technical Jacket',
        'category' => 'Storm Shell',
        'price' => '฿3,690',
        'image' => "{$siteUrl}/images/prod_alpine_shell.jpg",
        'specs' => [
            'materials' => '3-Layer Weatherproof Membrane',
            'waterproof' => '20,000 mm Hydrostatic Head Rating',
            'weight' => '380 g',
            'dimensions' => "Athletic Alpine Cut (Size {$apparelSize})",
            'bestUse' => 'Extreme Weather, Monsoons & High Altitudes'
        ]
    ];
}

// 3. Save Registration & Dispatch Event
$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}
$regFile = $dataDir . '/registrations.json';
$registrations = file_exists($regFile) ? json_decode(file_get_contents($regFile), true) : [];
$registrations[] = [
    'email' => $email,
    'name' => $name,
    'preferences' => [
        'activity' => $activityText,
        'region' => $regionText,
        'level' => $level,
        'sizes' => $sizeText
    ],
    'recommended_product' => $matchedProduct['name'],
    'registered_at' => date('c')
];
file_put_contents($regFile, json_encode($registrations, JSON_PRETTY_PRINT));

// 4. Render Personalized Email Template
$emailData = [
    'name' => $name,
    'email' => $email,
    'site_url' => $siteUrl,
    'preferences' => [
        'activity' => $activityText,
        'region' => $regionText,
        'level' => $level,
        'sizes' => $sizeText
    ],
    'product' => $matchedProduct
];
$htmlBody = renderRecommendationEmail($emailData);
$subject = "🏔️ Curated For Your Next Ascent: {$matchedProduct['name']} — VIA ALTO";

// 5. Send Email via PHPMailer
$result = sendViaAltoEmail($email, $name, $subject, $htmlBody);

// 6. Return JSON response
http_response_code($result['success'] ? 200 : 500);
echo json_encode([
    'success' => $result['success'],
    'message' => $result['message'],
    'driver' => $result['driver'],
    'email' => $email,
    'recommended_product' => $matchedProduct['name'],
    'preview_url' => $result['preview_url'] ?? null
]);
