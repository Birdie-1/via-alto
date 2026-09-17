<?php
/**
 * ==============================================================================================
 * ไฟล์: emailContent.php
 * คำอธิบาย: เทมเพลตเนื้อหาอีเมล HTML สำหรับส่งให้ผู้สมัครรับข่าวสาร (Welcome Newsletter)
 * สอดคล้องกับ: ข้อกำหนดเพิ่มเติมในใบงาน LAB (บรรทัดที่ 25 ของ sendMail.php: include "emailContent.php")
 * ==============================================================================================
 */

// กำหนด URL ของเว็บไซต์สำหรับลิงก์ต่าง ๆ (อ่านจากค่า .env หรือใช้ค่าเริ่มต้น localhost:5173)
$siteUrl = getenv('SITE_URL') ?: 'http://localhost:5173';

// สร้างตัวแปร $bodyContent บรรจุโค้ด HTML เพื่อส่งต่อไปยัง $mail->Body ใน sendMail.php
$bodyContent = '
<!DOCTYPE html>
<!-- กำหนดภาษาของอีเมลเป็นภาษาไทย (th) -->
<html lang="th">
<head>
  <!-- กำหนดชุดรหัสภาษา UTF-8 สำหรับรองรับภาษาไทย -->
  <meta charset="UTF-8">
  <!-- กำหนดให้ปรับขนาดอัตโนมัติตามหน้าจอมือถือและแท็บเล็ต -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- กำหนดชื่อหัวเรื่องเอกสาร -->
  <title>ขอบคุณที่สมัครรับข่าวสาร — VIA ALTO</title>
</head>
<!-- จัดการระยะขอบและพื้นหลังภายนอกของอีเมล ใช้โทนสีครีมอุ่น (#EDE8E2) -->
<body style="margin: 0; padding: 0; background-color: #EDE8E2; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Noto Sans Thai\', sans-serif; -webkit-font-smoothing: antialiased;">
  
  <!-- ตารางครอบเนื้อหาทั้งหมด กำหนด padding ให้มีพื้นที่ว่างรอบด้าน -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #EDE8E2; padding: 30px 10px;">
    <tr>
      <!-- จัดกึ่งกลางสำหรับกล่องอีเมลหลัก -->
      <td align="center">
        <!-- กล่องเนื้อหาอีเมลหลัก (Container): กำหนดความกว้างสูงสุด 600px ตามมาตรฐานอีเมลสากล -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FAF7F2; border-radius: 4px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.08);">
          
          <!-- ================================================================================== -->
          <!-- 1. ส่วนหัว (Header): แสดงโลโก้วงกลม, ชื่อแบรนด์ VIA ALTO, และสโลแกน GO BEYOND. -->
          <!-- ================================================================================== -->
          <tr>
            <td style="padding: 20px 28px; background-color: #FAF7F2; border-bottom: 1px solid #E5DFD7;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- ฝั่งซ้าย: โลโก้วงกลมและชื่อแบรนด์ -->
                  <td align="left" style="vertical-align: middle;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <!-- โลโก้ทรงกลมที่แนบผ่าน CID: cid:brand_logo -->
                        <td style="vertical-align: middle; padding-right: 12px;">
                          <img src="cid:brand_logo" alt="VIA ALTO Logo" style="width: 44px; height: 44px; border-radius: 50%; display: block; object-fit: cover; border: 1px solid rgba(24,60,50,0.15);" />
                        </td>
                        <!-- ชื่อแบรนด์และหมวดหมู่อุปกรณ์ -->
                        <td style="vertical-align: middle;">
                          <div style="font-family: Georgia, serif; font-size: 20px; font-weight: 700; letter-spacing: 2px; color: #183C32; line-height: 1.1;">VIA ALTO</div>
                          <div style="font-size: 8.5px; letter-spacing: 2.2px; text-transform: uppercase; color: #5C6E63; font-weight: 600; margin-top: 3px;">OUTDOOR EQUIPMENT</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <!-- ฝั่งขวา: สโลแกน GO BEYOND. ประจำแบรนด์ -->
                  <td align="right" style="vertical-align: middle;">
                    <span style="font-size: 11px; font-weight: 800; letter-spacing: 2.5px; color: #183C32; text-transform: uppercase;">GO BEYOND.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ================================================================================== -->
          <!-- 2. ภาพแบนเนอร์หลัก (Hero Banner): ภาพเทือกเขาแอลป์แนบผ่าน CID: cid:hero_banner -->
          <!-- ================================================================================== -->
          <tr>
            <td style="padding: 0; line-height: 0; background-color: #141A16;">
              <img src="cid:hero_banner" alt="ขอบคุณที่สมัครรับข่าวสาร — VIA ALTO" style="width: 100%; max-width: 600px; height: auto; display: block; border: 0;" />
            </td>
          </tr>

          <!-- ================================================================================== -->
          <!-- 3. ส่วนสิทธิประโยชน์ (What You Will Receive): 4 คอลัมน์แสดงสิ่งที่ลูกค้าจะได้รับ -->
          <!-- ================================================================================== -->
          <tr>
            <td style="padding: 38px 24px 30px; background-color: #FAF7F2; text-align: center;">
              <!-- หัวข้อหมวดสิทธิประโยชน์ -->
              <h2 style="margin: 0 0 28px; font-size: 22px; font-weight: 800; color: #183C32; letter-spacing: 0.5px;">สิ่งที่จะได้รับจากเรา</h2>
              
              <!-- ตารางแบ่งเป็น 4 คอลัมน์ (คอลัมน์ละ 25%) -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 32px;">
                <tr>
                  
                  <!-- จุดเด่นที่ 1: โปรโมชั่นพิเศษเฉพาะสมาชิก -->
                  <td width="25%" align="center" style="vertical-align: top; padding: 0 6px 0 0; border-right: 1px solid #E5DFD7;">
                    <div style="height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                      <!-- ไอคอนโปรโมชั่นแนบผ่าน CID: cid:icon_promo -->
                      <img src="cid:icon_promo" alt="โปรโมชั่นพิเศษ" style="width: 36px; height: auto; display: block; margin: 0 auto;" />
                    </div>
                    <div style="font-size: 12px; font-weight: 700; color: #183C32; line-height: 1.35; margin-bottom: 6px;">โปรโมชั่นพิเศษ<br>เฉพาะสมาชิก</div>
                    <div style="font-size: 10px; color: #6E7D75; line-height: 1.4;">รับส่วนลดและข้อเสนอ<br>สุดพิเศษก่อนใคร</div>
                  </td>

                  <!-- จุดเด่นที่ 2: อัปเดตสินค้าใหม่และคอลเลกชันล่าสุด -->
                  <td width="25%" align="center" style="vertical-align: top; padding: 0 6px; border-right: 1px solid #E5DFD7;">
                    <div style="height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                      <!-- ไอคอนสินค้าใหม่แนบผ่าน CID: cid:icon_new -->
                      <img src="cid:icon_new" alt="สินค้าใหม่" style="width: 36px; height: auto; display: block; margin: 0 auto;" />
                    </div>
                    <div style="font-size: 12px; font-weight: 700; color: #183C32; line-height: 1.35; margin-bottom: 6px;">สินค้าใหม่<br>และคอลเลกชันล่าสุด</div>
                    <div style="font-size: 10px; color: #6E7D75; line-height: 1.4;">อัปเดตคอลเลกชันใหม่<br>และสินค้าน่าสนใจก่อนใคร</div>
                  </td>

                  <!-- จุดเด่นที่ 3: เรื่องราวและแรงบันดาลใจในการผจญภัย -->
                  <td width="25%" align="center" style="vertical-align: top; padding: 0 6px; border-right: 1px solid #E5DFD7;">
                    <div style="height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                      <!-- ไอคอนแรงบันดาลใจแนบผ่าน CID: cid:icon_mountain -->
                      <img src="cid:icon_mountain" alt="เรื่องราวและแรงบันดาลใจ" style="width: 36px; height: auto; display: block; margin: 0 auto;" />
                    </div>
                    <div style="font-size: 12px; font-weight: 700; color: #183C32; line-height: 1.35; margin-bottom: 6px;">เรื่องราวและแรงบันดาลใจ<br>จากการผจญภัย</div>
                    <div style="font-size: 10px; color: #6E7D75; line-height: 1.4;">บทความ แนะนำเส้นทาง<br>และไลฟ์สไตล์สายเดินป่า</div>
                  </td>

                  <!-- จุดเด่นที่ 4: เคล็ดลับและการดูแลรักษาอุปกรณ์ -->
                  <td width="25%" align="center" style="vertical-align: top; padding: 0 0 0 6px;">
                    <div style="height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                      <!-- ไอคอนคู่มือแนบผ่าน CID: cid:icon_guide -->
                      <img src="cid:icon_guide" alt="เคล็ดลับและคำแนะนำ" style="width: 36px; height: auto; display: block; margin: 0 auto;" />
                    </div>
                    <div style="font-size: 12px; font-weight: 700; color: #183C32; line-height: 1.35; margin-bottom: 6px;">เคล็ดลับและคำแนะนำ<br>การใช้งานสินค้า</div>
                    <div style="font-size: 10px; color: #6E7D75; line-height: 1.4;">ดูแลอุปกรณ์ของคุณ<br>ให้ใช้งานได้ยาวนานยิ่งขึ้น</div>
                  </td>

                </tr>
              </table>

              <!-- ปุ่ม Call To Action: เชื่อมต่อไปยังหน้าร้านค้าออนไลน์ -->
              <div style="text-align: center; margin-top: 10px;">
                <a href="' . htmlspecialchars($siteUrl) . '" style="display: inline-block; background-color: #183C32; color: #FFFFFF; text-decoration: none; padding: 13px 36px; border-radius: 24px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(24,60,50,0.3);">
                  เริ่มต้นสำรวจสินค้า &rarr;
                </a>
              </div>

              <!-- ข้อความแสดงความขอบคุณด้านล่าง -->
              <p style="margin: 18px 0 0; font-size: 11px; color: #6E7D75; font-style: normal;">
                ขอบคุณที่ไว้วางใจ VIA ALTO แล้วพบกันในอีเมลฉบับต่อไป
              </p>
            </td>
          </tr>

          <!-- ================================================================================== -->
          <!-- 4. ส่วนท้าย (Footer): โทนสีเขียวเข้ม Deep Forest พร้อมช่องทางโซเชียลมีเดีย -->
          <!-- ================================================================================== -->
          <tr>
            <td style="background-color: #11241D; padding: 24px 28px; border-top: 1px solid rgba(255,255,255,0.08);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- โลโก้และข้อมูลแบรนด์ขนาดกะทัดรัด -->
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

                  <!-- เส้นคั่นแนวตั้ง -->
                  <td width="30" align="center" style="vertical-align: middle;">
                    <div style="width: 1px; height: 34px; background-color: rgba(255,255,255,0.15); margin: 0 auto;"></div>
                  </td>

                  <!-- ไอคอนโซเชียลมีเดีย (Facebook, Instagram, YouTube, Website Link) -->
                  <td align="right" style="vertical-align: middle;">
                    <table role="presentation" cellspacing="0" cellpadding="0" style="display: inline-block;">
                      <tr>
                        <!-- Facebook -->
                        <td style="padding: 0 4px;">
                          <a href="https://facebook.com" style="display: inline-block; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.35); text-align: center; color: #FFFFFF; font-size: 11px; text-decoration: none; font-weight: bold;">f</a>
                        </td>
                        <!-- Instagram -->
                        <td style="padding: 0 4px;">
                          <a href="https://instagram.com" style="display: inline-block; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.35); text-align: center; color: #FFFFFF; font-size: 11px; text-decoration: none;">📸</a>
                        </td>
                        <!-- YouTube -->
                        <td style="padding: 0 4px;">
                          <a href="https://youtube.com" style="display: inline-block; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.35); text-align: center; color: #FFFFFF; font-size: 11px; text-decoration: none;">▶</a>
                        </td>
                        <!-- เว็บไซต์หลัก -->
                        <td style="padding: 0 4px;">
                          <a href="' . htmlspecialchars($siteUrl) . '" style="display: inline-block; width: 28px; height: 28px; line-height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.35); text-align: center; color: #FFFFFF; font-size: 11px; text-decoration: none;">🔗</a>
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
