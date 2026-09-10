<?php
/**
 * VIA ALTO — Personalized Product Recommendation Email Template
 * Fulfills Step 3: Personalized marketing based on user interest
 * Used by Step 4: register_welcome.php
 */

function renderRecommendationEmail($data) {
    $name = htmlspecialchars($data['name'] ?? 'Explorer');
    $email = htmlspecialchars($data['email'] ?? '');
    $siteUrl = rtrim($data['site_url'] ?? 'http://localhost:5173', '/');

    // Customer preferences (from registration questionnaire)
    $activity = htmlspecialchars($data['preferences']['activity'] ?? 'Alpine Trekking & Camping');
    $region = htmlspecialchars($data['preferences']['region'] ?? 'Northern High Elevation');
    $level = htmlspecialchars($data['preferences']['level'] ?? 'Intermediate Explorer');
    $sizes = htmlspecialchars($data['preferences']['sizes'] ?? 'L (Apparel) / 42 (Footwear)');

    // Recommended Product
    $prodName = htmlspecialchars($data['product']['name'] ?? 'Alpine 35L Backpack');
    $prodCategory = htmlspecialchars($data['product']['category'] ?? 'Technical Pack');
    $prodPrice = htmlspecialchars($data['product']['price'] ?? '฿2,490');
    $prodImg = htmlspecialchars($data['product']['image'] ?? "{$siteUrl}/images/prod_alpine_35l.jpg");
    $materials = htmlspecialchars($data['product']['specs']['materials'] ?? '210D High-Tenacity Ripstop Nylon / Cordura®');
    $waterproof = htmlspecialchars($data['product']['specs']['waterproof'] ?? '20,000 mm + Integrated Rain Cover');
    $weight = htmlspecialchars($data['product']['specs']['weight'] ?? '980 g (Ultralight Standard)');
    $dimensions = htmlspecialchars($data['product']['specs']['dimensions'] ?? '58 x 30 x 22 cm (35 Liters)');
    $bestUse = htmlspecialchars($data['product']['specs']['bestUse'] ?? 'Multi-Day Treks & Ridge Climbs');

    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Curated For Your Next Ascent — VIA ALTO</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0E1411; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF; }
    .wrapper { width: 100%; max-width: 580px; margin: 0 auto; background-color: #0E1411; padding: 24px 16px; }
    .hero-banner { background: #183C32; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, 0.1); }
    .brand-logo-text { font-family: Georgia, serif; font-size: 22px; font-weight: 700; letter-spacing: 3px; color: #FFFFFF; margin: 0; }
    .brand-sub { font-size: 9px; letter-spacing: 2px; color: #E8DDCC; text-transform: uppercase; margin-top: 4px; }
    
    .greeting-box { text-align: center; margin-bottom: 20px; }
    .greeting-title { font-family: Georgia, serif; font-size: 22px; font-weight: 700; color: #FFFFFF; margin: 0 0 6px; }
    .greeting-desc { font-size: 13px; color: #CBD5E1; line-height: 1.4; margin: 0; }
    
    /* User Preference Recap Box (Matching Caffellina reference) */
    .pref-card { background: #161D19; border: 1px solid #28362F; border-radius: 10px; padding: 16px 18px; margin-bottom: 24px; }
    .pref-head { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #E8DDCC; margin-bottom: 12px; }
    .pref-row { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); padding-bottom: 6px; }
    .pref-label { color: #8E9B93; }
    .pref-val { color: #FFFFFF; font-weight: 600; text-align: right; }
    
    /* Spotlight Product Box */
    .prod-box { background: #141A16; border: 1px solid #232E28; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px; }
    .prod-badge { font-size: 9.5px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #A3E6CD; margin-bottom: 4px; display: block; }
    .prod-title { font-family: Georgia, serif; font-size: 20px; font-weight: 700; color: #FFFFFF; margin: 0 0 14px; }
    .prod-img-canvas { background: #F7F5F0; border-radius: 8px; padding: 16px; margin-bottom: 16px; text-align: center; }
    .prod-img-canvas img { max-width: 200px; height: 160px; object-fit: contain; }
    
    /* Technical Specs List (Caffellina specs style) */
    .specs-table { width: 100%; font-size: 11px; text-align: left; margin-bottom: 16px; border-collapse: collapse; }
    .specs-table td { padding: 6px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
    .specs-key { color: #8E9B93; width: 35%; }
    .specs-val { color: #FFFFFF; font-weight: 500; }
    .specs-price { font-family: Georgia, serif; font-size: 16px; color: #E8DDCC; font-weight: 700; }
    
    /* 3 Action Buttons */
    .btn-primary { display: block; background: #E8DDCC; color: #183C32; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; padding: 12px 0; border-radius: 8px; margin-bottom: 8px; text-align: center; }
    .btn-secondary { display: block; background: #202B24; color: #FFFFFF; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; padding: 11px 0; border-radius: 8px; border: 1px solid #334439; margin-bottom: 8px; text-align: center; }
    .btn-tertiary { display: block; background: #2D4A3E; color: #E8DDCC; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; padding: 10px 0; border-radius: 8px; text-align: center; }
    
    .footer { text-align: center; padding: 16px 0; font-size: 10px; color: #6C7D73; border-top: 1px solid rgba(255, 255, 255, 0.08); }
    .footer a { color: #8FA498; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    
    <div class="hero-banner">
      <div class="brand-logo-text">VIA ALTO</div>
      <div class="brand-sub">Alpine Outdoor Standard • The Path to Higher Ground</div>
    </div>

    <div class="greeting-box">
      <h1 class="greeting-title">Welcome, {$name}</h1>
      <p class="greeting-desc">Your membership is confirmed. We analyzed your trail requirements to engineer the optimal kit for your expeditions.</p>
    </div>

    <!-- Your Selected Preferences Card -->
    <div class="pref-card">
      <div class="pref-head">Your Selected Preferences</div>
      <div class="pref-row">
        <span class="pref-label">Primary Activity:</span>
        <span class="pref-val">{$activity}</span>
      </div>
      <div class="pref-row">
        <span class="pref-label">Target Region:</span>
        <span class="pref-val">{$region}</span>
      </div>
      <div class="pref-row">
        <span class="pref-label">Experience Level:</span>
        <span class="pref-val">{$level}</span>
      </div>
      <div class="pref-row" style="border-bottom: none; margin-bottom: 0;">
        <span class="pref-label">Your Sizing:</span>
        <span class="pref-val">{$sizes}</span>
      </div>
    </div>

    <!-- Recommended Product Box -->
    <div class="prod-box">
      <span class="prod-badge">Recommended For Your Next Journey</span>
      <h2 class="prod-title">{$prodName}</h2>

      <div class="prod-img-canvas">
        <img src="{$prodImg}" alt="{$prodName}">
      </div>

      <table class="specs-table">
        <tr>
          <td class="specs-key">Category</td>
          <td class="specs-val">{$prodCategory}</td>
        </tr>
        <tr>
          <td class="specs-key">Materials</td>
          <td class="specs-val">{$materials}</td>
        </tr>
        <tr>
          <td class="specs-key">Weatherproofing</td>
          <td class="specs-val">{$waterproof}</td>
        </tr>
        <tr>
          <td class="specs-key">Weight</td>
          <td class="specs-val">{$weight}</td>
        </tr>
        <tr>
          <td class="specs-key">Dimensions</td>
          <td class="specs-val">{$dimensions}</td>
        </tr>
        <tr>
          <td class="specs-key">Recommended Use</td>
          <td class="specs-val">{$bestUse}</td>
        </tr>
        <tr>
          <td class="specs-key">Member Price</td>
          <td class="specs-val specs-price">{$prodPrice}</td>
        </tr>
      </table>

      <!-- 3 Buttons -->
      <a href="{$siteUrl}" class="btn-primary">View Recommended Gear →</a>
      <a href="{$siteUrl}" class="btn-secondary">Browse All Collections</a>
      <a href="{$siteUrl}" class="btn-tertiary">Return to VIA ALTO Store</a>
    </div>

    <div class="footer">
      <p>This email was automatically generated based on your VIA ALTO explorer preferences.</p>
      <p><a href="{$siteUrl}">Unsubscribe</a> • <a href="{$siteUrl}">Privacy Policy</a> • Dolomites, Italy</p>
    </div>

  </div>
</body>
</html>
HTML;
}
