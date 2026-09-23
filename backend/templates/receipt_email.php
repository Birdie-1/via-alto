<?php
/**
 * ==============================================================================================
 * ไฟล์: backend/templates/receipt_email.php
 * คำอธิบาย: เทมเพลตอีเมลใบเสร็จรับเงินอิเล็กทรอนิกส์ (E-Receipt) สไตล์ "Dolomite Classic" (แบบที่ 4)
 * โครงสร้างดีไซน์:
 *   - ครึ่งบน: ธีมสีครีม (Warm Cream #FAF7F2) ดูสะอาด เรียบหรู แสดงหัวเรื่อง ทักทายผู้ซื้อ และตารางสินค้า
 *   - ครึ่งล่าง: ธีมสีเขียวป่าลึก (Deep Forest #11241D) แสดงที่อยู่จัดส่ง วิธีชำระเงิน คะแนนสะสม และปุ่มดูคำสั่งซื้อ
 *   - ส่วนท้าย: แสดงข้อความเตือน "เว็บไซต์เพื่อการศึกษา" และลิงก์โซเชียลมีเดีย
 * สอดคล้องกับมาตรฐานอีเมล HTML สากล (Table-based layout รองรับทั้ง Gmail, Outlook, Apple Mail)
 * ==============================================================================================
 */

/**
 * บรรทัดที่ 16: ฟังก์ชันสร้างเนื้อหา HTML ของใบเสร็จรับเงิน E-Receipt
 * 
 * @param array $order ข้อมูลคำสั่งซื้อ (orderId, date, items, subtotal, shippingFee, discount, total, ฯลฯ)
 * @param array|null $user ข้อมูลลูกค้า (fullName, email, points)
 * @param array $options การตั้งค่าเพิ่มเติม เช่น site_url, use_cid
 * @return string โค้ด HTML สมบูรณ์ของอีเมลใบเสร็จ
 */
function renderReceiptEmail($order, $user = null, $options = []) {
    // บรรทัดที่ 26: กำหนด Base URL ของเว็บไซต์ โดยตัด localhost ออกเพื่อป้องกันปัญหาลิงก์ไม่ทำงานบนเครื่องอื่น
    $rawSiteUrl = $options['site_url'] ?? $order['site_url'] ?? getenv('SITE_URL') ?? '';
    // บรรทัดที่ 28: ตรวจสอบความถูกต้องและเลือก URL หลัก (ค่าเริ่มต้นคือ GitHub Pages ของผู้ใช้)
    $siteUrl = (!empty($rawSiteUrl) && !str_contains($rawSiteUrl, 'localhost') && !str_contains($rawSiteUrl, '127.0.0.1'))
        ? rtrim($rawSiteUrl, '/')
        : 'https://birdie-1.github.io/via-alto';

    // บรรทัดที่ 33: ดึงรหัสคำสั่งซื้อ (Order ID) เช่น VA-2026-4921
    $orderId = htmlspecialchars($order['orderId'] ?? 'VA-2026-' . rand(1000, 9999));
    // บรรทัดที่ 35: ดึงวันที่ทำการสั่งซื้อ เช่น 2026-09-23
    $orderDate = htmlspecialchars($order['date'] ?? date('Y-m-d'));
    // บรรทัดที่ 37: ดึงสถานะคำสั่งซื้อ (ค่าเริ่มต้นคือ Processing)
    $statusText = 'กำลังเตรียมจัดส่ง (Processing)';
    
    // บรรทัดที่ 40: ดึงชื่อลูกค้าสำหรับการทักทาย โดยให้ความสำคัญกับ shippingAddress หรือ user ตามลำดับ
    $customerName = htmlspecialchars(
        $order['shippingAddress']['fullName'] 
        ?? $user['fullName'] 
        ?? $user['name'] 
        ?? 'Explorer'
    );

    // บรรทัดที่ 48: ตรวจสอบการใช้งานรูปภาพแบบ CID (Content-ID) หรือ URL ตรงจากเว็บไซต์
    $useCid = $options['use_cid'] ?? false;
    // บรรทัดที่ 50: กำหนดพาธของโลโก้แบรนด์ทรงกลม
    $logoSrc = $useCid ? 'cid:brand_logo' : "{$siteUrl}/images/circular_logo.png";

    // บรรทัดที่ 53: ดึงรายการสินค้าทั้งหมดในคำสั่งซื้อ
    $items = $order['items'] ?? [];
    // บรรทัดที่ 55: ตัวแปรสะสมโค้ด HTML แถวสินค้าในตาราง
    $itemsHtml = '';

    // บรรทัดที่ 58: วนลูปสร้างแถวสินค้าแต่ละชิ้นในตาราง
    foreach ($items as $idx => $item) {
        // บรรทัดที่ 60: ดึงชื่อสินค้า
        $itemName = htmlspecialchars($item['name'] ?? 'Alpine Expedition Equipment');
        // บรรทัดที่ 62: ดึงจำนวนสินค้า
        $qty = intval($item['qty'] ?? 1);
        // บรรทัดที่ 64: ดึงราคาต่อหน่วย
        $price = floatval($item['price'] ?? 0);
        // บรรทัดที่ 66: คำนวณราคารวมของแถวนั้น (ราคา x จำนวน)
        $itemTotal = $price * $qty;
        // บรรทัดที่ 68: จัดรูปแบบราคาเป็นเงินบาท เช่น ฿2,490
        $formattedItemTotal = '฿' . number_format($itemTotal);

        // บรรทัดที่ 71: ดึงขนาดของสินค้า (ถ้ามี)
        $size = htmlspecialchars($item['size'] ?? 'Standard');

        // บรรทัดที่ 74: ดึงข้อมูลสีและโค้ดสี Hex (ถ้ามี)
        $colorName = '';
        $colorHex = '#183C32';
        if (!empty($item['color'])) {
            if (is_array($item['color'])) {
                $colorName = htmlspecialchars($item['color']['name_th'] ?? $item['color']['name'] ?? '');
                $colorHex = htmlspecialchars($item['color']['hex'] ?? '#183C32');
            } else {
                $colorName = htmlspecialchars($item['color']);
            }
        }

        // บรรทัดที่ 87: จัดการ URL ของรูปภาพสินค้า
        $itemImg = $item['image'] ?? "{$siteUrl}/images/prod_alpine_35l.jpg";
        if (str_starts_with($itemImg, '/')) {
            $itemImg = $siteUrl . $itemImg;
        }

        // บรรทัดที่ 93: สลับสีพื้นหลังแถวสินค้าเพื่อความสบายตา (Alternating row background)
        $rowBg = ($idx % 2 === 0) ? '#FFFFFF' : '#FAF7F2';

        // บรรทัดที่ 96: ประกอบโค้ด HTML แถวสินค้า
        $itemsHtml .= '
        <tr style="background-color: ' . $rowBg . '; border-bottom: 1px solid #EAE5DE;">
          <!-- คอลัมน์ที่ 1: รูปภาพสินค้าและชื่อสินค้า -->
          <td style="padding: 12px 14px; vertical-align: middle;">
            <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
              <tr>
                <td style="width: 52px; vertical-align: middle; padding-right: 12px;">
                  <img src="' . htmlspecialchars($itemImg) . '" alt="' . $itemName . '" width="50" height="50" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; display: block; border: 1px solid #D5CEBF; background-color: #F7F5F0;" />
                </td>
                <td style="vertical-align: middle;">
                  <div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; font-size: 13px; font-weight: 700; color: #183C32; line-height: 1.3;">
                    ' . $itemName . '
                  </div>
                  <div style="font-size: 11px; color: #7D8D84; margin-top: 3px;">
                    ' . ($colorName ? '<span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ' . $colorHex . '; border: 1px solid rgba(0,0,0,0.15); vertical-align: middle; margin-right: 4px;"></span>' . $colorName . ' &bull; ' : '') . '
                    <span>ขนาด: ' . $size . '</span>
                  </div>
                </td>
              </tr>
            </table>
          </td>
          <!-- คอลัมน์ที่ 2: จำนวนสินค้า -->
          <td align="center" style="padding: 12px 10px; vertical-align: middle; font-family: monospace; font-size: 13px; font-weight: 700; color: #292B28;">
            ' . $qty . '
          </td>
          <!-- คอลัมน์ที่ 3: ราคารวมของแถวนี้ -->
          <td align="right" style="padding: 12px 14px; vertical-align: middle; font-family: monospace; font-size: 13px; font-weight: 700; color: #183C32;">
            ' . $formattedItemTotal . '
          </td>
        </tr>';
    }

    // บรรทัดที่ 127: คำนวณสรุปยอดเงินทั้งหมด
    $subtotal = floatval($order['subtotal'] ?? 0);
    $shippingFee = floatval($order['shippingFee'] ?? 0);
    $discount = floatval($order['discount'] ?? 0);
    $codFee = floatval($order['codFee'] ?? 0);
    $grandTotal = floatval($order['total'] ?? ($subtotal + $shippingFee - $discount + $codFee));
    // บรรทัดที่ 133: คะแนนสะสมที่ได้รับจากยอดสั่งซื้อ
    $pointsEarned = intval($order['pointsEarned'] ?? floor($grandTotal / 100));

    // บรรทัดที่ 136: จัดรูปแบบค่าใช้จ่ายสำหรับแสดงผล
    $formattedSubtotal = '฿' . number_format($subtotal);
    $formattedShipping = ($shippingFee == 0) ? '<span style="color: #059669; font-weight: bold;">ฟรี (Alpine Standard)</span>' : '฿' . number_format($shippingFee);
    $formattedDiscount = ($discount > 0) ? '-฿' . number_format($discount) : null;
    $formattedCod = ($codFee > 0) ? '+฿' . number_format($codFee) : null;
    $formattedGrandTotal = '฿' . number_format($grandTotal);

    // บรรทัดที่ 143: ดึงข้อมูลที่อยู่จัดส่ง
    $addr = $order['shippingAddress'] ?? [];
    $recipientName = htmlspecialchars($addr['fullName'] ?? $customerName);
    $recipientTel = htmlspecialchars($addr['telNo'] ?? '-');
    $addressLine1 = htmlspecialchars($addr['address1'] ?? 'ที่อยู่จัดส่งมาตรฐาน');
    $addressLine2 = !empty($addr['address2']) ? htmlspecialchars($addr['address2']) : '';
    $district = htmlspecialchars($addr['district'] ?? '');
    $province = htmlspecialchars($addr['province'] ?? '');
    $postalCode = htmlspecialchars($addr['postalCode'] ?? '');
    $fullAddressText = trim("{$addressLine1}" . ($addressLine2 ? ", {$addressLine2}" : "") . ", {$district}, {$province} {$postalCode}", ' ,');

    // บรรทัดที่ 154: ดึงช่องทางการชำระเงิน
    $rawPayment = $order['paymentMethod'] ?? 'promptpay';
    $paymentMethodLabel = 'พร้อมเพย์ คิวอาร์โค้ด (PromptPay QR)';
    if ($rawPayment === 'card') {
        $paymentMethodLabel = 'บัตรเครดิต / เดบิต (Credit / Debit Card)';
    } elseif ($rawPayment === 'cod') {
        $paymentMethodLabel = 'เก็บเงินปลายทาง (Cash on Delivery)';
    }

    // บรรทัดที่ 163: สร้างลิงก์ CTA สำหรับเปิดดูประวัติคำสั่งซื้อ
    $ordersLink = htmlspecialchars("{$siteUrl}/?page=account&tab=orders&order={$orderId}&utm_source=email&utm_medium=receipt");

    // บรรทัดที่ 166: ประกอบโค้ด HTML ทั้งฉบับของ Dolomite Classic (Style 4)
    return '<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>ใบเสร็จรับเงินคำสั่งซื้อ #' . $orderId . ' — VIA ALTO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #EDE8E2; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Noto Sans Thai\', sans-serif; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%;">

  <!-- ตารางหลักครอบเนื้อหาทั้งหมด (Outer Wrapper) -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #EDE8E2; padding: 25px 10px;">
    <tr>
      <td align="center">

        <!-- กล่องกระดาษใบเสร็จหลัก ความกว้างสูงสุด 600px -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FAF7F2; border-radius: 6px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border-collapse: collapse;">
          
          <!-- ========================================================================= -->
          <!-- ส่วนที่ 1: แถบแจ้งเตือน "เว็บไซต์เพื่อการศึกษา" ด้านบนสุด -->
          <!-- ========================================================================= -->
          <tr>
            <td style="background-color: #0F2821; color: #FAF7F2; padding: 8px 16px; text-align: center; font-size: 11px; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255,255,255,0.1);">
              🎓 <strong>เว็บไซต์นี้จัดทำขึ้นเพื่อการศึกษาเท่านั้น</strong> (ไม่มีการจำหน่ายหรือเรียกเก็บเงินจริง)
            </td>
          </tr>

          <!-- ========================================================================= -->
          <!-- ส่วนที่ 2: ส่วนหัวใบเสร็จแบรนด์ VIA ALTO (Cream Header) -->
          <!-- ========================================================================= -->
          <tr>
            <td style="padding: 22px 28px; background-color: #FAF7F2; border-bottom: 2px solid #E8DDCC;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- โลโก้และชื่อแบรนด์ด้านซ้าย -->
                  <td align="left" style="vertical-align: middle;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 12px;">
                          <a href="' . htmlspecialchars($siteUrl) . '" style="text-decoration: none;">
                            <img src="' . $logoSrc . '" alt="VIA ALTO" width="44" height="44" style="width: 44px; height: 44px; border-radius: 50%; display: block; border: 1px solid rgba(24,60,50,0.2);" />
                          </a>
                        </td>
                        <td style="vertical-align: middle;">
                          <div style="font-family: Georgia, serif; font-size: 20px; font-weight: 700; letter-spacing: 2px; color: #183C32; line-height: 1;">VIA ALTO</div>
                          <div style="font-size: 8.5px; letter-spacing: 2px; text-transform: uppercase; color: #5C6E63; font-weight: 600; margin-top: 3px;">OUTDOOR EQUIPMENT</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <!-- คำขวัญแบรนด์ด้านขวา -->
                  <td align="right" style="vertical-align: middle;">
                    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 2.5px; color: #183C32; text-transform: uppercase;">
                      GO BEYOND.
                    </div>
                    <div style="font-size: 9px; color: #7D8D84; letter-spacing: 1px; margin-top: 2px;">
                      DOLOMITES STANDARD
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ========================================================================= -->
          <!-- ส่วนที่ 3: ข้อความทักทายและหัวเรื่อง E-Receipt -->
          <!-- ========================================================================= -->
          <tr>
            <td style="padding: 26px 28px 16px; background-color: #FAF7F2;">
              <div style="font-size: 14px; color: #5C6E63; margin-bottom: 4px;">
                สวัสดีครับ คุณ <strong style="color: #183C32;">' . $customerName . '</strong>,
              </div>
              <h1 style="font-family: Georgia, serif; font-size: 26px; font-weight: 700; color: #183C32; margin: 0 0 8px; line-height: 1.2;">
                ใบเสร็จรับเงินอิเล็กทรอนิกส์
              </h1>
              <div style="font-size: 12px; color: #7D8D84; margin-bottom: 20px;">
                ขอบคุณสำหรับการสั่งซื้ออุปกรณ์ผจญภัยกับ VIA ALTO คำสั่งซื้อของคุณได้รับการยืนยันเรียบร้อยแล้ว
              </div>

              <!-- กล่องข้อมูลคำสั่งซื้อ (Order Info Box มีเส้นเขียวด้านซ้าย) -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border-left: 4px solid #183C32; border-top: 1px solid #EAE5DE; border-right: 1px solid #EAE5DE; border-bottom: 1px solid #EAE5DE; border-radius: 4px; padding: 14px 18px; margin-bottom: 24px;">
                <tr>
                  <td style="vertical-align: top; padding-right: 15px;">
                    <div style="font-size: 10px; text-transform: uppercase; font-weight: 700; color: #7D8D84; letter-spacing: 1px;">หมายเลขคำสั่งซื้อ</div>
                    <div style="font-family: monospace; font-size: 15px; font-weight: 700; color: #183C32; margin-top: 2px;">#' . $orderId . '</div>
                  </td>
                  <td style="vertical-align: top; padding-right: 15px;">
                    <div style="font-size: 10px; text-transform: uppercase; font-weight: 700; color: #7D8D84; letter-spacing: 1px;">วันที่สั่งซื้อ</div>
                    <div style="font-family: monospace; font-size: 13px; font-weight: 600; color: #292B28; margin-top: 2px;">' . $orderDate . '</div>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <div style="font-size: 10px; text-transform: uppercase; font-weight: 700; color: #7D8D84; letter-spacing: 1px; margin-bottom: 4px;">สถานะ</div>
                    <span style="display: inline-block; background-color: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px;">
                      ' . $statusText . '
                    </span>
                  </td>
                </tr>
              </table>

              <!-- ===================================================================== -->
              <!-- ตารางรายการสินค้า (Product Table) -->
              <!-- ===================================================================== -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; width: 100%; border: 1px solid #EAE5DE; border-radius: 4px; overflow: hidden; background-color: #FFFFFF;">
                <thead>
                  <tr style="background-color: #183C32; color: #FAF7F2;">
                    <th align="left" style="padding: 10px 14px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">รายการอุปกรณ์</th>
                    <th align="center" style="padding: 10px 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; width: 60px;">จำนวน</th>
                    <th align="right" style="padding: 10px 14px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; width: 90px;">ราคา</th>
                  </tr>
                </thead>
                <tbody>
                  ' . $itemsHtml . '
                </tbody>
              </table>

              <!-- ===================================================================== -->
              <!-- สรุปตัวเลขทางการเงิน (Financial Breakdown) -->
              <!-- ===================================================================== -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 16px;">
                <tr>
                  <td width="40%">&nbsp;</td>
                  <td width="60%">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="left" style="padding: 4px 0; font-size: 12px; color: #5C6E63;">ยอดรวมสินค้า:</td>
                        <td align="right" style="padding: 4px 0; font-family: monospace; font-size: 12px; font-weight: 700; color: #292B28;">' . $formattedSubtotal . '</td>
                      </tr>
                      <tr>
                        <td align="left" style="padding: 4px 0; font-size: 12px; color: #5C6E63;">ค่าจัดส่ง:</td>
                        <td align="right" style="padding: 4px 0; font-family: monospace; font-size: 12px; color: #292B28;">' . $formattedShipping . '</td>
                      </tr>
                      ' . ($formattedDiscount ? '
                      <tr>
                        <td align="left" style="padding: 4px 0; font-size: 12px; color: #059669; font-weight: 600;">ส่วนลดโค้ดคูปอง:</td>
                        <td align="right" style="padding: 4px 0; font-family: monospace; font-size: 12px; font-weight: 700; color: #059669;">' . $formattedDiscount . '</td>
                      </tr>' : '') . '
                      ' . ($formattedCod ? '
                      <tr>
                        <td align="left" style="padding: 4px 0; font-size: 12px; color: #5C6E63;">ค่าบริการ COD:</td>
                        <td align="right" style="padding: 4px 0; font-family: monospace; font-size: 12px; color: #292B28;">' . $formattedCod . '</td>
                      </tr>' : '') . '
                      <tr>
                        <td colspan="2" style="padding-top: 8px; border-bottom: 2px solid #183C32;"></td>
                      </tr>
                      <tr>
                        <td align="left" style="padding: 10px 0 4px; font-family: Georgia, serif; font-size: 15px; font-weight: 700; color: #183C32; text-transform: uppercase;">ยอดสุทธิทั้งสิ้น:</td>
                        <td align="right" style="padding: 10px 0 4px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 22px; font-weight: 800; color: #183C32;">' . $formattedGrandTotal . '</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ========================================================================= -->
          <!-- ส่วนที่ 4: ครึ่งล่างสีเขียวเข้ม (Deep Forest Transition Zone) -->
          <!-- ========================================================================= -->
          <tr>
            <td style="background-color: #11241D; padding: 28px; color: #FAF7F2;">
              
              <!-- กล่องแสดงที่อยู่จัดส่งและช่องทางการชำระเงิน -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- ด้านซ้าย: ที่อยู่จัดส่งพัสดุ -->
                  <td width="55%" align="left" style="vertical-align: top; padding-right: 14px;">
                    <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #E8DDCC; margin-bottom: 6px;">
                      📍 ข้อมูลการจัดส่งพัสดุ
                    </div>
                    <div style="font-size: 13px; font-weight: 700; color: #FFFFFF; line-height: 1.3;">
                      ' . $recipientName . '
                    </div>
                    <div style="font-size: 11px; color: #9FB3A6; margin-top: 2px;">
                      โทร: ' . $recipientTel . '
                    </div>
                    <div style="font-size: 11px; color: #CBD5E1; margin-top: 4px; line-height: 1.4;">
                      ' . $fullAddressText . '
                    </div>
                  </td>

                  <!-- ด้านขวา: วิธีชำระเงิน และ คะแนนสะสม Alpine Points -->
                  <td width="45%" align="left" style="vertical-align: top; padding-left: 14px; border-left: 1px solid rgba(255,255,255,0.15);">
                    <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #E8DDCC; margin-bottom: 6px;">
                      💳 วิธีการชำระเงิน
                    </div>
                    <div style="font-size: 12px; font-weight: 600; color: #FFFFFF; line-height: 1.3;">
                      ' . $paymentMethodLabel . '
                    </div>

                    <!-- แถบแสดงคะแนนสะสม Alpine Points ที่ได้รับ -->
                    <div style="margin-top: 14px; background: linear-gradient(135deg, rgba(24,60,50,0.8) 0%, rgba(13,26,21,0.95) 100%); border: 1px solid #E8DDCC; border-radius: 6px; padding: 10px 12px;">
                      <div style="font-size: 9px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #E8DDCC;">
                        ✨ คะแนนสะสมที่ได้รับ
                      </div>
                      <div style="font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #FAF7F2; margin-top: 2px;">
                        +' . $pointsEarned . ' <span style="font-size: 11px; font-weight: normal; color: #A3E6CD;">Alpine Points</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- ปุ่ม CTA: ดูรายละเอียดคำสั่งซื้อบนเว็บไซต์ -->
              <div style="text-align: center; margin-top: 26px;">
                <a href="' . $ordersLink . '" style="display: inline-block; background-color: #E8DDCC; color: #183C32; text-decoration: none; padding: 12px 34px; border-radius: 24px; font-size: 13px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
                  ดูสถานะคำสั่งซื้อ &rarr;
                </a>
              </div>

            </td>
          </tr>

          <!-- ========================================================================= -->
          <!-- ส่วนที่ 5: ท้ายอีเมล (Footer with Social Icons & Copyright) -->
          <!-- ========================================================================= -->
          <tr>
            <td style="background-color: #0E1A15; padding: 20px 28px; border-top: 1px solid rgba(255,255,255,0.06);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="font-size: 10px; color: #7E9186; vertical-align: middle;">
                    &copy; 2026 VIA ALTO Alpine Equipment. All rights reserved.<br>
                    <span style="color: #5C6E63;">ใบเสร็จอิเล็กทรอนิกส์นี้สร้างโดยระบบอัตโนมัติ</span>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <a href="' . htmlspecialchars($siteUrl) . '" style="font-size: 10px; color: #A3E6CD; text-decoration: none; margin-left: 8px;">หน้าแรก</a>
                    <span style="color: #334439;">&bull;</span>
                    <a href="' . htmlspecialchars($siteUrl . '/?page=shop') . '" style="font-size: 10px; color: #A3E6CD; text-decoration: none; margin-left: 8px;">ร้านค้า</a>
                    <span style="color: #334439;">&bull;</span>
                    <a href="' . htmlspecialchars($siteUrl . '/?page=account') . '" style="font-size: 10px; color: #A3E6CD; text-decoration: none; margin-left: 8px;">บัญชี</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- สิ้นสุดกล่องใบเสร็จ -->

      </td>
    </tr>
  </table>

</body>
</html>';
}
