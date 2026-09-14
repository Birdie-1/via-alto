<?php
/**
 * VIA ALTO — Personalized Product Recommendation Email Template
 * ออกแบบตามต้นแบบแบรนด์ VIA ALTO (Personalized Recommendation 3 Curated Products)
 * Fulfills Step 3: Personalized marketing based on user interest
 */

function renderRecommendationEmail($data) {
    $name = htmlspecialchars($data['name'] ?? 'John Wick');
    $siteUrl = rtrim($data['site_url'] ?? 'http://localhost:5173', '/');

    // Default to the 3 curated picks from the reference design
    $products = $data['products'] ?? [
        [
            'name' => 'Alpine 35L Backpack',
            'category' => 'BACKPACKS',
            'badge' => 'BEST SELLER',
            'desc' => 'กระเป๋าเป้ขนาดพอดี เหมาะสำหรับทั้งทริปสั้นและทริปหลายวัน',
            'rating' => '128',
            'price' => '฿2,490',
            'cid' => 'recom_prod_1',
            'img_url' => "{$siteUrl}/images/recom_card_img_1.jpg"
        ],
        [
            'name' => 'Alpine Shell Jacket',
            'category' => 'CLOTHING',
            'badge' => 'TRENDING',
            'desc' => 'แจ็คเก็ตกันลม กันน้ำ ระบายอากาศได้ดี เหมาะกับทุกสภาพอากาศ',
            'rating' => '74',
            'price' => '฿2,890',
            'cid' => 'recom_prod_2',
            'img_url' => "{$siteUrl}/images/recom_card_img_2.jpg"
        ],
        [
            'name' => 'Terra Hiking Shoes',
            'category' => 'FOOTWEAR',
            'badge' => 'NEW',
            'desc' => 'รองเท้าเดินป่า น้ำหนักเบา ยึดเกาะดีเยี่ยมทุกเส้นทาง',
            'rating' => '96',
            'price' => '฿3,290',
            'cid' => 'recom_prod_3',
            'img_url' => "{$siteUrl}/images/recom_card_img_3.jpg"
        ]
    ];

    $useCid = $data['use_cid'] ?? true;
    $logoSrc = $useCid ? 'cid:brand_logo' : "{$siteUrl}/images/circular_logo.png";
    $heroSrc = $useCid ? 'cid:recom_hero' : "{$siteUrl}/images/recom_hero_banner.jpg";

    $productCols = '';
    foreach ($products as $i => $p) {
        $pImg = $useCid ? ('cid:' . ($p['cid'] ?? "recom_prod_" . ($i + 1))) : ($p['img_url'] ?? "{$siteUrl}/images/recom_card_img_1.jpg");
        $pad = ($i === 0) ? 'padding: 0 6px 0 0;' : (($i === 1) ? 'padding: 0 4px;' : 'padding: 0 0 0 6px;');

        $productCols .= '
        <td width="33.33%" align="left" style="vertical-align: top; ' . $pad . '">
          <!-- Card Image & Badge -->
          <div style="border-radius: 4px; overflow: hidden; background-color: #141A16; line-height: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <img src="' . $pImg . '" alt="' . htmlspecialchars($p['name']) . '" style="width: 100%; max-width: 190px; height: auto; display: block; border: 0;" />
          </div>

          <!-- Category -->
          <div style="font-size: 8.5px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #7D8D84; margin-top: 10px;">
            ' . htmlspecialchars($p['category']) . '
          </div>

          <!-- Title -->
          <div style="font-size: 13px; font-weight: 700; color: #183C32; line-height: 1.3; margin-top: 4px; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', sans-serif;">
            ' . htmlspecialchars($p['name']) . '
          </div>

          <!-- Thai Description -->
          <div style="font-size: 9.5px; color: #6E7D75; line-height: 1.4; margin-top: 4px; min-height: 28px;">
            ' . htmlspecialchars($p['desc']) . '
          </div>

          <!-- Stars & Review Count -->
          <div style="font-size: 10px; color: #183C32; margin-top: 6px;">
            ★★★★★ <span style="color: #7D8D84; font-size: 9px; font-weight: 500;">(' . htmlspecialchars($p['rating']) . ')</span>
          </div>

          <!-- Price -->
          <div style="font-size: 15px; font-weight: 800; color: #183C32; margin-top: 6px; letter-spacing: 0.2px;">
            ' . htmlspecialchars($p['price']) . '
          </div>

          <!-- Action Buttons (Cart + Wishlist) -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 8px;">
            <tr>
              <td style="vertical-align: middle;">
                <a href="' . $siteUrl . '" style="display: block; background-color: #183C32; color: #FFFFFF; font-size: 9.5px; font-weight: 700; text-decoration: none; padding: 7px 0; border-radius: 16px; text-align: center; letter-spacing: 0.3px;">
                  🛒 เพิ่มใส่ตะกร้า
                </a>
              </td>
              <td width="28" align="right" style="vertical-align: middle; padding-left: 4px;">
                <a href="' . $siteUrl . '" style="display: inline-block; width: 26px; height: 26px; line-height: 24px; border-radius: 50%; border: 1px solid #D5CEBF; text-align: center; color: #183C32; font-size: 11px; text-decoration: none;">
                  ♡
                </a>
              </td>
            </tr>
          </table>
        </td>';
    }

    return '<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Next Adventure Awaits — VIA ALTO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #EDE8E2; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Noto Sans Thai\', sans-serif; -webkit-font-smoothing: antialiased;">
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #EDE8E2; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Email Container (600px Max Width) -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FAF7F2; border-radius: 4px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.08);">
          
          <!-- 1. Header (Cream with Circular Logo + Slogan) -->
          <tr>
            <td style="padding: 20px 28px; background-color: #FAF7F2; border-bottom: 1px solid #E5DFD7;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- Left: Circular Logo & Brand Name -->
                  <td align="left" style="vertical-align: middle;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 12px;">
                          <img src="' . $logoSrc . '" alt="VIA ALTO Logo" style="width: 44px; height: 44px; border-radius: 50%; display: block; object-fit: cover; border: 1px solid rgba(24,60,50,0.15);" />
                        </td>
                        <td style="vertical-align: middle;">
                          <div style="font-family: Georgia, serif; font-size: 20px; font-weight: 700; letter-spacing: 2px; color: #183C32; line-height: 1.1;">VIA ALTO</div>
                          <div style="font-size: 8.5px; letter-spacing: 2.2px; text-transform: uppercase; color: #5C6E63; font-weight: 600; margin-top: 3px;">OUTDOOR EQUIPMENT</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <!-- Right: Slogan GO BEYOND. -->
                  <td align="right" style="vertical-align: middle;">
                    <span style="font-size: 11px; font-weight: 800; letter-spacing: 2.5px; color: #183C32; text-transform: uppercase;">GO BEYOND.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 2. Hero Section & Voucher Banner -->
          <tr>
            <td style="padding: 0; line-height: 0; background-color: #141A16;">
              <img src="' . $heroSrc . '" alt="Your Next Adventure Awaits — VIA ALTO" style="width: 100%; max-width: 600px; height: auto; display: block; border: 0;" />
            </td>
          </tr>

          <!-- 3. Section Title: OUR TOP PICKS FOR YOU -->
          <tr>
            <td style="padding: 34px 24px 22px; background-color: #FAF7F2; text-align: center;">
              <div style="font-size: 12px; font-weight: 800; letter-spacing: 2.5px; color: #183C32; text-transform: uppercase;">
                &mdash;&mdash;&nbsp; OUR TOP PICKS FOR YOU &nbsp;&mdash;&mdash;
              </div>
              <div style="font-size: 12px; color: #6E7D75; margin-top: 6px;">
                สินค้าของดีเยี่ยมที่เหมาะกับสไตล์การเดินทางและการผจญภัยของคุณ
              </div>
            </td>
          </tr>

          <!-- 4. 3 Product Recommendation Columns -->
          <tr>
            <td style="padding: 0 24px 28px; background-color: #FAF7F2;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  ' . $productCols . '
                </tr>
              </table>

              <!-- Action Button: View All Products -->
              <div style="text-align: center; margin-top: 28px;">
                <a href="' . $siteUrl . '" style="display: inline-block; background-color: #183C32; color: #FFFFFF; text-decoration: none; padding: 13px 38px; border-radius: 24px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(24,60,50,0.3);">
                  ดูสินค้าทั้งหมด &rarr;
                </a>
              </div>

              <!-- Trust Subtext -->
              <p style="text-align: center; margin: 18px 0 0; font-size: 11px; color: #6E7D75;">
                ขอบคุณที่ไว้วางใจ VIA ALTO แล้วพบกันในเส้นทางถัดไป
              </p>
            </td>
          </tr>

          <!-- 5. Footer (Deep Forest Alpine Green with Circular Logo & Socials) -->
          <tr>
            <td style="background-color: #11241D; padding: 24px 28px 16px; border-top: 1px solid rgba(255,255,255,0.08);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- Left: Circular Logo & Text -->
                  <td align="left" style="vertical-align: middle;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 12px;">
                          <img src="' . $logoSrc . '" alt="VIA ALTO" style="width: 38px; height: 38px; border-radius: 50%; display: block; border: 1px solid rgba(255,255,255,0.2);" />
                        </td>
                        <td style="vertical-align: middle;">
                          <div style="font-family: Georgia, serif; font-size: 16px; font-weight: 700; letter-spacing: 2px; color: #FFFFFF; line-height: 1.1;">VIA ALTO</div>
                          <div style="font-size: 7.5px; letter-spacing: 1.8px; text-transform: uppercase; color: #9FB3A6; margin-top: 2px;">OUTDOOR EQUIPMENT</div>
                          <div style="font-size: 8px; letter-spacing: 1.5px; color: #E8DDCC; font-weight: 700; margin-top: 4px;">GO BEYOND.</div>
                        </td>
                      </tr>
                    </table>
                  </td>

                  <!-- Middle Divider -->
                  <td width="30" align="center" style="vertical-align: middle;">
                    <div style="width: 1px; height: 34px; background-color: rgba(255,255,255,0.15); margin: 0 auto;"></div>
                  </td>

                  <!-- Right: Social Circle Badges -->
                  <td align="right" style="vertical-align: middle;">
                    <table role="presentation" cellspacing="0" cellpadding="0" style="display: inline-block;">
                      <tr>
                        <td style="padding: 0 4px;">
                          <a href="https://facebook.com" style="display: inline-block; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.35); text-align: center; color: #FFFFFF; font-size: 11px; text-decoration: none; font-weight: bold;">f</a>
                        </td>
                        <td style="padding: 0 4px;">
                          <a href="https://instagram.com" style="display: inline-block; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.35); text-align: center; color: #FFFFFF; font-size: 11px; text-decoration: none;">📸</a>
                        </td>
                        <td style="padding: 0 4px;">
                          <a href="https://youtube.com" style="display: inline-block; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.35); text-align: center; color: #FFFFFF; font-size: 11px; text-decoration: none;">▶</a>
                        </td>
                        <td style="padding: 0 4px;">
                          <a href="' . $siteUrl . '" style="display: inline-block; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.35); text-align: center; color: #FFFFFF; font-size: 11px; text-decoration: none;">🔗</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sub-footer (Copyright & Navigation Links) -->
          <tr>
            <td style="background-color: #11241D; padding: 8px 28px 20px; border-top: 1px solid rgba(255,255,255,0.06);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="font-size: 9.5px; color: #7E9186;">
                    &copy; 2024 VIA ALTO. All rights reserved.
                  </td>
                  <td align="right" style="font-size: 9.5px; color: #9FB3A6;">
                    <a href="' . $siteUrl . '" style="color: #9FB3A6; text-decoration: none;">ร้านค้า</a> &nbsp;|&nbsp; 
                    <a href="' . $siteUrl . '" style="color: #9FB3A6; text-decoration: none;">หมวดหมู่</a> &nbsp;|&nbsp; 
                    <a href="' . $siteUrl . '" style="color: #9FB3A6; text-decoration: none;">เกี่ยวกับเรา</a> &nbsp;|&nbsp; 
                    <a href="' . $siteUrl . '" style="color: #9FB3A6; text-decoration: none;">ติดต่อเรา</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>';
}
