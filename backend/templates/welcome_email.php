<?php
/**
 * VIA ALTO — Welcome Gift & Essential Gear Email Template
 * เทมเพลตอีเมลต้อนรับสำหรับสมาชิกใหม่ พร้อมคูปองส่วนลด 10% และแนะนำ 3 สินค้าหลัก
 * ใช้งานโดย: backend/subscribe.php (Step 2 ในใบงานอาจารย์)
 */

// บรรทัดที่ 8: ประกาศฟังก์ชัน renderWelcomeEmail รับพารามิเตอร์ $data (ข้อมูลผู้รับและคูปอง)
function renderWelcomeEmail($data) {
    // บรรทัดที่ 10: ป้องกัน XSS แปลงชื่อผู้รับให้ปลอดภัยด้วย htmlspecialchars (ค่าเริ่มต้น Explorer)
    $name = htmlspecialchars($data['name'] ?? 'Explorer');
    // บรรทัดที่ 12: ป้องกัน XSS แปลงอีเมลผู้รับให้ปลอดภัย
    $email = htmlspecialchars($data['email'] ?? '');
    // บรรทัดที่ 14: โค้ดส่วนลดต้อนรับ (ค่าเริ่มต้น GOBEYOND10 หรือ WELCOME10)
    $code = htmlspecialchars($data['code'] ?? 'GOBEYOND10');
    // บรรทัดที่ 16: ข้อความสิทธิประโยชน์ส่วนลด
    $discount = htmlspecialchars($data['discount'] ?? '10% OFF YOUR FIRST ORDER!');
    // บรรทัดที่ 18: กำหนด URL หน้าเว็บหลัก โดยตัดเครื่องหมาย slash ท้ายออก และคัดกรองไม่ให้มี localhost (ชี้ไปที่ GitHub Pages)
    $rawSiteUrl = $data['site_url'] ?? getenv('SITE_URL') ?? '';
    $siteUrl = (!empty($rawSiteUrl) && !str_contains($rawSiteUrl, 'localhost') && !str_contains($rawSiteUrl, '127.0.0.1'))
        ? rtrim($rawSiteUrl, '/')
        : 'https://birdie-1.github.io/via-alto';
    // บรรทัดที่ 20: กำหนดตัวแปร $voucherCode สำหรับแนบ Query String ในปุ่มสินค้า
    $voucherCode = $code;

    // บรรทัดที่ 23: สร้างโครงสร้าง HTML อีเมลแบบ Responsive Table-based Layout
    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- ส่วนตั้งค่า Meta ของอีเมล: รหัสอักขระ UTF-8 และ Viewport ให้พอดีหน้าจอมือถือ -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to VIA ALTO</title>
  <style>
    /* สไตล์ CSS สำหรับจัดรูปแบบอีเมล รองรับ Client ยอดนิยม */
    body { margin: 0; padding: 0; background-color: #0E1411; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF; }
    .wrapper { width: 100%; max-width: 600px; margin: 0 auto; background-color: #0E1411; }
    .header { text-align: center; padding: 36px 20px 20px; }
    .brand-title { font-family: Georgia, serif; font-size: 24px; font-weight: 700; letter-spacing: 4px; color: #FFFFFF; margin: 8px 0 4px; }
    .brand-sub { font-size: 9px; letter-spacing: 2.5px; color: #8E9B93; text-transform: uppercase; font-weight: 600; }
    .main-title { font-family: Georgia, serif; font-size: 24px; font-weight: 700; color: #FFFFFF; margin: 24px 0 8px; text-align: center; }
    .greeting { font-size: 14px; color: #CBD5E1; text-align: center; margin-bottom: 24px; }
    
    /* สไตล์กล่อง Voucher ของขวัญต้อนรับ */
    .gift-box { background: linear-gradient(180deg, rgba(24, 60, 50, 0.7) 0%, rgba(13, 26, 21, 0.9) 100%); border: 1.5px solid #2A6E58; border-radius: 12px; padding: 20px; text-align: center; margin: 0 20px 28px; box-shadow: 0 0 20px rgba(42, 110, 88, 0.3); }
    .gift-sub { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #A3E6CD; margin-bottom: 6px; }
    .gift-head { font-family: Georgia, serif; font-size: 20px; font-weight: 700; color: #FFFFFF; margin-bottom: 10px; }
    .gift-badge { display: inline-block; background: #183C32; border: 1px dashed #E8DDCC; border-radius: 6px; padding: 6px 16px; font-family: monospace; font-size: 14px; font-weight: 700; letter-spacing: 2px; color: #E8DDCC; }
    
    /* สไตล์ตารางแสดง 3 สินค้าแนะนำหลัก */
    .products-table { width: 100%; border-collapse: separate; border-spacing: 10px 0; margin-bottom: 24px; }
    .prod-card { background: #161D19; border: 1px solid #232E28; border-radius: 10px; padding: 12px 8px 14px; text-align: center; width: 33.33%; vertical-align: top; }
    .prod-pill { font-size: 9px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: #8FA498; background: #1E2822; padding: 3px 8px; border-radius: 12px; display: inline-block; margin-bottom: 8px; }
    .prod-img-box { background: #F7F5F0; border-radius: 6px; padding: 8px; margin-bottom: 8px; }
    .prod-img { width: 100%; max-width: 130px; height: 100px; object-fit: contain; }
    .prod-title { font-size: 12px; font-weight: 700; color: #FFFFFF; margin-bottom: 4px; min-height: 30px; }
    .prod-specs { font-size: 9.5px; color: #8E9B93; line-height: 1.3; margin-bottom: 10px; min-height: 25px; }
    .prod-btn { display: block; background: #202B24; color: #D4E2D9; border: 1px solid #334439; border-radius: 6px; padding: 6px 0; font-size: 10px; font-weight: 600; text-decoration: none; text-transform: uppercase; }
    
    /* สไตล์ปุ่ม Call to Action หลัก */
    .cta-wrap { text-align: center; margin-bottom: 24px; }
    .cta-btn { display: inline-block; background: #1F5A48; color: #FFFFFF; border: 1px solid #348B70; border-radius: 24px; padding: 13px 40px; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; box-shadow: 0 4px 16px rgba(31, 90, 72, 0.4); }
    .terms { font-size: 10px; color: #6C7D73; text-align: center; font-style: italic; margin-bottom: 24px; }
    
    /* สไตล์ส่วนท้าย Footer และข้อความทางกฎหมาย PDPA */
    .footer { text-align: center; padding: 20px; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 10px; color: #6C7D73; }
    .footer a { color: #8FA498; text-decoration: none; margin: 0 5px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- ส่วนหัวอีเมล: โลโก้และชื่อแบรนด์ VIA ALTO -->
    <div class="header">
      <div class="brand-title">VIA ALTO</div>
      <div class="brand-sub">The Path to Higher Ground • Dolomites Standard</div>
    </div>

    <!-- ข้อความทักทายต้อนรับสมาชิกใหม่ -->
    <div class="main-title">Welcome to VIA ALTO!</div>
    <div class="greeting">Hello <strong>{$name}</strong>, your email <strong>{$email}</strong> has been registered.</div>

    <!-- การ์ดโค้ดของขวัญต้อนรับ (Welcome Voucher) -->
    <div class="gift-box">
      <div class="gift-sub">Your Special Welcome Gift</div>
      <div class="gift-head">{$discount}</div>
      <div class="gift-badge">CODE: {$code}</div>
    </div>

    <!-- ตาราง 3 คอลัมน์ แนะนำสินค้าจำเป็นสำหรับการเริ่มต้นผจญภัย (Essential Products) -->
    <table class="products-table">
      <tr>
        <!-- สินค้าที่ 1: กระเป๋าเป้ Alpine 35L Backpack (ผูก Deep Link ตรงสู่ Modal สินค้า) -->
        <td class="prod-card">
          <span class="prod-pill">Alpine Pack</span>
          <div class="prod-img-box">
            <img class="prod-img" src="{$siteUrl}/images/prod_alpine_35l.jpg" alt="Alpine 35L Backpack">
          </div>
          <div class="prod-title">Alpine 35L Backpack</div>
          <div class="prod-specs">210D Ripstop • 980g<br><strong>฿2,490</strong></div>
          <a href="{$siteUrl}/?product=1&voucher={$voucherCode}&utm_source=email&utm_medium=newsletter" class="prod-btn">View Gear</a>
        </td>
        <!-- สินค้าที่ 2: เสื้อแจ็คเก็ตกันลมกันฝน Alpine Shell Jacket -->
        <td class="prod-card">
          <span class="prod-pill">Storm Shell</span>
          <div class="prod-img-box">
            <img class="prod-img" src="{$siteUrl}/images/prod_alpine_shell.jpg" alt="Alpine Shell Jacket">
          </div>
          <div class="prod-title">Alpine Shell Jacket</div>
          <div class="prod-specs">3-Layer • 20,000mm<br><strong>฿3,690</strong></div>
          <a href="{$siteUrl}/?product=4&voucher={$voucherCode}&utm_source=email&utm_medium=newsletter" class="prod-btn">View Gear</a>
        </td>
        <!-- สินค้าที่ 3: รองเท้าปีนเขา Alto Mountain Boots -->
        <td class="prod-card">
          <span class="prod-pill">Footwear</span>
          <div class="prod-img-box">
            <img class="prod-img" src="{$siteUrl}/images/prod_alto_boots.jpg" alt="Alto Mountain Boots">
          </div>
          <div class="prod-title">Alto Mountain Boots</div>
          <div class="prod-specs">Vibram® Megagrip<br><strong>฿3,890</strong></div>
          <a href="{$siteUrl}/?product=8&voucher={$voucherCode}&utm_source=email&utm_medium=newsletter" class="prod-btn">View Gear</a>
        </td>
      </tr>
    </table>

    <!-- ปุ่ม Call to Action ไปยังหน้าร้านค้า พร้อมแนบ Voucher ให้อัตโนมัติ -->
    <div class="cta-wrap">
      <a href="{$siteUrl}/?page=shop&voucher={$voucherCode}&utm_source=email&utm_medium=newsletter&utm_campaign=welcome_subscriber" class="cta-btn">Shop Now with 10% OFF</a>
    </div>

    <!-- เงื่อนไขการใช้งานคูปอง -->
    <div class="terms">
      *Coupon code valid for 30 days. Free delivery on orders over ฿2,000.
    </div>

    <!-- ส่วนท้ายอีเมล: นโยบายความเป็นส่วนตัวและลิงก์ยกเลิกการติดตาม (Unsubscribe ตามกฎหมาย PDPA) -->
    <div class="footer">
      <p><a href="{$siteUrl}/?unsubscribe=1">Unsubscribe</a> • <a href="{$siteUrl}/?page=account&tab=preferences">Privacy Policy</a> • <a href="{$siteUrl}/?page=shop">Explorer Club</a></p>
      <p style="margin-top: 8px; color: #4D5B53;">VIA ALTO Alpine Co. • Elevation: 3,842M • Dolomites, Italy</p>
    </div>
  </div>
</body>
</html>
HTML;
}
