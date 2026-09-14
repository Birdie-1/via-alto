<?php
/**
 * VIA ALTO — Newsletter Welcome Email Template
 * ออกแบบตามต้นแบบแบรนด์ VIA ALTO (พร้อมโลโก้ทรงกลมและ 4 จุดเด่น)
 */

$bodyContent = '
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ขอบคุณที่สมัครรับข่าวสาร — VIA ALTO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #EDE8E2; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Noto Sans Thai\', sans-serif; -webkit-font-smoothing: antialiased;">
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #EDE8E2; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Email Container (600px Max Width) -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FAF7F2; border-radius: 4px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.08);">
          
          <!-- 1. Header (Off-white / Cream with Circular Logo + Slogan) -->
          <tr>
            <td style="padding: 20px 28px; background-color: #FAF7F2; border-bottom: 1px solid #E5DFD7;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- Left: Circular Logo & Brand Name -->
                  <td align="left" style="vertical-align: middle;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 12px;">
                          <img src="cid:brand_logo" alt="VIA ALTO Logo" style="width: 44px; height: 44px; border-radius: 50%; display: block; object-fit: cover; border: 1px solid rgba(24,60,50,0.15);" />
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

          <!-- 2. Hero Section (Mountain Landscape with Typography) -->
          <tr>
            <td style="padding: 0; line-height: 0; background-color: #141A16;">
              <img src="cid:hero_banner" alt="ขอบคุณที่สมัครรับข่าวสาร — VIA ALTO" style="width: 100%; max-width: 600px; height: auto; display: block; border: 0;" />
            </td>
          </tr>

          <!-- 3. What You Will Receive (สิ่งที่จะได้รับจากเรา) -->
          <tr>
            <td style="padding: 38px 24px 30px; background-color: #FAF7F2; text-align: center;">
              <h2 style="margin: 0 0 28px; font-size: 22px; font-weight: 800; color: #183C32; letter-spacing: 0.5px;">สิ่งที่จะได้รับจากเรา</h2>
              
              <!-- 4 Feature Columns -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 32px;">
                <tr>
                  
                  <!-- Feature 1: Member Promotion -->
                  <td width="25%" align="center" style="vertical-align: top; padding: 0 6px 0 0; border-right: 1px solid #E5DFD7;">
                    <div style="height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                      <img src="cid:icon_promo" alt="โปรโมชั่นพิเศษ" style="width: 36px; height: auto; display: block; margin: 0 auto;" />
                    </div>
                    <div style="font-size: 12px; font-weight: 700; color: #183C32; line-height: 1.35; margin-bottom: 6px;">โปรโมชั่นพิเศษ<br>เฉพาะสมาชิก</div>
                    <div style="font-size: 10px; color: #6E7D75; line-height: 1.4;">รับส่วนลดและข้อเสนอ<br>สุดพิเศษก่อนใคร</div>
                  </td>

                  <!-- Feature 2: New Arrivals -->
                  <td width="25%" align="center" style="vertical-align: top; padding: 0 6px; border-right: 1px solid #E5DFD7;">
                    <div style="height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                      <img src="cid:icon_new" alt="สินค้าใหม่" style="width: 36px; height: auto; display: block; margin: 0 auto;" />
                    </div>
                    <div style="font-size: 12px; font-weight: 700; color: #183C32; line-height: 1.35; margin-bottom: 6px;">สินค้าใหม่<br>และคอลเลกชันล่าสุด</div>
                    <div style="font-size: 10px; color: #6E7D75; line-height: 1.4;">อัปเดตคอลเลกชันใหม่<br>และสินค้าน่าสนใจก่อนใคร</div>
                  </td>

                  <!-- Feature 3: Inspiration & Stories -->
                  <td width="25%" align="center" style="vertical-align: top; padding: 0 6px; border-right: 1px solid #E5DFD7;">
                    <div style="height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                      <img src="cid:icon_mountain" alt="เรื่องราวและแรงบันดาลใจ" style="width: 36px; height: auto; display: block; margin: 0 auto;" />
                    </div>
                    <div style="font-size: 12px; font-weight: 700; color: #183C32; line-height: 1.35; margin-bottom: 6px;">เรื่องราวและแรงบันดาลใจ<br>จากการผจญภัย</div>
                    <div style="font-size: 10px; color: #6E7D75; line-height: 1.4;">บทความ แนะนำเส้นทาง<br>และไลฟ์สไตล์สายเดินป่า</div>
                  </td>

                  <!-- Feature 4: Tips & Product Care -->
                  <td width="25%" align="center" style="vertical-align: top; padding: 0 0 0 6px;">
                    <div style="height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                      <img src="cid:icon_guide" alt="เคล็ดลับและคำแนะนำ" style="width: 36px; height: auto; display: block; margin: 0 auto;" />
                    </div>
                    <div style="font-size: 12px; font-weight: 700; color: #183C32; line-height: 1.35; margin-bottom: 6px;">เคล็ดลับและคำแนะนำ<br>การใช้งานสินค้า</div>
                    <div style="font-size: 10px; color: #6E7D75; line-height: 1.4;">ดูแลอุปกรณ์ของคุณ<br>ให้ใช้งานได้ยาวนานยิ่งขึ้น</div>
                  </td>

                </tr>
              </table>

              <!-- Action Button: Start Exploring -->
              <div style="text-align: center; margin-top: 10px;">
                <a href="http://localhost:5173" style="display: inline-block; background-color: #183C32; color: #FFFFFF; text-decoration: none; padding: 13px 36px; border-radius: 24px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(24,60,50,0.3);">
                  เริ่มต้นสำรวจสินค้า &rarr;
                </a>
              </div>

              <!-- Trust Subtext -->
              <p style="margin: 18px 0 0; font-size: 11px; color: #6E7D75; font-style: normal;">
                ขอบคุณที่ไว้วางใจ VIA ALTO แล้วพบกันในอีเมลฉบับต่อไป
              </p>
            </td>
          </tr>

          <!-- 4. Footer (Deep Forest Alpine Green with Circular Logo & Socials) -->
          <tr>
            <td style="background-color: #11241D; padding: 24px 28px; border-top: 1px solid rgba(255,255,255,0.08);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- Left: Circular Logo & Text -->
                  <td align="left" style="vertical-align: middle;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 12px;">
                          <img src="cid:brand_logo" alt="VIA ALTO" style="width: 38px; height: 38px; border-radius: 50%; display: block; border: 1px solid rgba(255,255,255,0.2);" />
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
                          <a href="http://localhost:5173" style="display: inline-block; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.35); text-align: center; color: #FFFFFF; font-size: 11px; text-decoration: none;">🔗</a>
                        </td>
                      </tr>
                    </table>
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
</html>
';
