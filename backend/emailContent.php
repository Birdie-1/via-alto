<?php
/**
 * VIA ALTO — Email Content Template
 * กำหนดตัวแปร $bodyContent สำหรับใช้ใน sendMail.php (บรรทัดที่ 25)
 * ตามข้อกำหนดเพิ่มเติมในใบงาน
 */

$bodyContent = '
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ยินดีต้อนรับสู่ VIA ALTO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0E1411; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Noto Sans Thai\', sans-serif; color: #FFFFFF;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0E1411; padding: 24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #141A16; border: 1px solid #28362F; border-radius: 16px; overflow: hidden; margin: 0 16px;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #183C32; padding: 28px 24px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 26px; letter-spacing: 4px; color: #FFFFFF;">VIA ALTO</h1>
              <p style="margin: 6px 0 0; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #E8DDCC;">The Path to Higher Ground • Alpine Outdoor Standard</p>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding: 28px 24px 16px; text-align: center;">
              <h2 style="margin: 0 0 10px; font-size: 22px; font-weight: 700; color: #FFFFFF;">ยินดีต้อนรับสู่ครอบครัว VIA ALTO 🏔️</h2>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #CBD5E1;">
                ขอบคุณที่ร่วมเป็นส่วนหนึ่งของคอมมูนิตี้นักสำรวจ เราขอมอบของขวัญต้อนรับสมาชิกใหม่เพื่อเป็นก้าวแรกสู่อิสรภาพบนยอดเขาสูง
              </p>
            </td>
          </tr>

          <!-- Gift Voucher Box -->
          <tr>
            <td style="padding: 0 24px 20px;">
              <div style="background: linear-gradient(180deg, rgba(24, 60, 50, 0.8) 0%, rgba(13, 26, 21, 0.95) 100%); border: 1.5px solid #2A6E58; border-radius: 12px; padding: 20px; text-align: center;">
                <span style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #A3E6CD; font-weight: 700;">WELCOME EXPEDITION VOUCHER</span>
                <div style="font-size: 20px; font-weight: 700; color: #FFFFFF; margin: 6px 0 10px;">รับส่วนลด 10% สำหรับคำสั่งซื้อแรก</div>
                <div style="display: inline-block; background-color: #183C32; border: 1.5px dashed #E8DDCC; border-radius: 8px; padding: 8px 20px; font-family: monospace; font-size: 16px; font-weight: 700; letter-spacing: 3px; color: #E8DDCC;">
                  CODE: GOBEYOND10
                </div>
                <p style="margin: 8px 0 0; font-size: 11px; color: #8E9B93;">*ใช้ได้กับสินค้าทุกรายการ ไม่มีขั้นต่ำ</p>
              </div>
            </td>
          </tr>

          <!-- Recommended Product Poster (ข้อกำหนดที่ 2: แนบรูปสินค้าผ่าน CID) -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <div style="background-color: #161D19; border: 1px solid #28362F; border-radius: 12px; padding: 20px; text-align: center;">
                <span style="display: inline-block; background-color: #1E2822; color: #A3E6CD; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px;">
                  🌟 สินค้าแนะนำสำหรับสมาชิกใหม่
                </span>
                
                <!-- เรียกรูปภาพสินค้าแนะนำผ่าน CID (Embedded Image) ตามโจทย์ -->
                <div style="background-color: #F7F5F0; border-radius: 8px; padding: 16px; margin-bottom: 14px; text-align: center;">
                  <img src="cid:product_poster" alt="Alpine 35L Technical Backpack" style="width: 100%; max-width: 280px; height: auto; display: block; margin: 0 auto; object-fit: contain;" />
                </div>

                <h3 style="margin: 0 0 6px; font-size: 18px; color: #FFFFFF; font-weight: 700;">Alpine 35L Technical Backpack</h3>
                <p style="margin: 0 0 12px; font-size: 12.5px; color: #8E9B93; line-height: 1.5;">
                  เป้เดินป่าทางไกลระดับโปร ผลิตจากผ้า 210D High-Tenacity Ripstop ทนต่อแรงเสียดสี พร้อมระบบระบายอากาศหลังและผ้าคลุมกันฝนในตัว น้ำหนักเบาเพียง 980 กรัม
                </p>

                <div style="font-size: 18px; font-weight: 700; color: #E8DDCC; margin-bottom: 16px;">
                  ราคาพิเศษ ฿2,490 <span style="font-size: 13px; color: #6C7D73; text-decoration: line-through;">(ปกติ ฿3,200)</span>
                </div>

                <a href="http://localhost:5173" style="display: block; background-color: #E8DDCC; color: #183C32; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 13px 0; border-radius: 8px;">
                  ช้อปสินค้ารุ่นนี้เลย →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top: 1px solid rgba(255,255,255,0.08); padding: 20px 24px; text-align: center; font-size: 11px; color: #6C7D73;">
              <p style="margin: 0 0 8px;">คุณได้รับอีเมลนี้เนื่องจากได้สมัครรับข่าวสารที่ <a href="http://localhost:5173" style="color: #A3E6CD; text-decoration: none;">via-alto.com</a></p>
              <p style="margin: 0; color: #4D5B53;">© 2026 VIA ALTO Co., Ltd. • Dolomites Elevation 3,842M</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
';
