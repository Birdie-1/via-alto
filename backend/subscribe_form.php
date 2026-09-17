<!DOCTYPE html>
<!-- กำหนดภาษาของเอกสารเป็นภาษาไทย (th) -->
<html lang="th">
<head>
  <!-- กำหนดการเข้ารหัสตัวอักษรเป็น UTF-8 เพื่อรองรับภาษาไทย -->
  <meta charset="UTF-8">
  <!-- กำหนด Viewport ให้หน้าเว็บรองรับการแสดงผลบนหน้าจอมือถือ (Responsive) -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- กำหนดชื่อหัวข้อหน้าต่างเว็บเบราว์เซอร์ -->
  <title>สมัครรับข่าวสาร — VIA ALTO</title>

  <style>
    /* กำหนด Reset พื้นฐานสำหรับทุกองค์ประกอบ: กล่องคำนวณแบบ border-box และลบระยะขอบเริ่มต้น */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Thai", Helvetica, Arial, sans-serif;
    }

    /* ตกแต่งพื้นหลังของทั้งหน้าเว็บ: โทนสีเขียวเข้มอัลไพน์ (Dark Forest) พร้อมการไล่เฉดสี */
    body {
      background-color: #0E1411;
      background-image: radial-gradient(circle at 50% 30%, rgba(24, 60, 50, 0.4) 0%, rgba(14, 20, 17, 0.95) 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      color: #FFFFFF;
    }

    /* ตกแต่งการ์ดแบบฟอร์ม: ใช้โทนสีครีม (Warm Cream #E8DDCC) ตัดกับข้อความสีเขียวเข้ม */
    .form-card {
      background: #E8DDCC;
      color: #183C32;
      width: 100%;
      max-width: 440px;
      padding: 40px 32px;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(232, 221, 204, 0.2);
      text-align: center;
    }

    /* ป้ายชื่อแบรนด์ด้านบน: ตัวอักษรพิมพ์ใหญ่ขนาดเล็กเว้นระยะห่าง */
    .brand-tag {
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      font-weight: 700;
      color: #183C32;
      opacity: 0.7;
      margin-bottom: 8px;
    }

    /* หัวข้อหลัก: สมัครรับข่าวสาร ตัวหนาพิเศษ */
    .title {
      font-size: 24px;
      font-weight: 800;
      color: #183C32;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    /* คำอธิบายสิทธิประโยชน์: รับข่าวสารและส่วนลด 10% */
    .subtitle {
      font-size: 13.5px;
      line-height: 1.5;
      color: #3B4B42;
      margin-bottom: 28px;
    }

    /* จัดกลุ่มช่องกรอกข้อมูล */
    .form-group {
      margin-bottom: 16px;
      text-align: left;
    }

    /* ช่อง Input สำหรับพิมพ์อีเมล */
    .email-input {
      width: 100%;
      padding: 14px 18px;
      font-size: 15px;
      border: 1.5px solid #C8B9A6;
      border-radius: 12px;
      background: #FFFFFF;
      color: #183C32;
      outline: none;
      transition: all 0.2s ease;
    }

    /* สไตล์เมื่อช่องพิมพ์กำลังถูก Focus (คลิกใช้งาน) */
    .email-input:focus {
      border-color: #183C32;
      box-shadow: 0 0 0 4px rgba(24, 60, 50, 0.15);
    }

    /* ปุ่มกดส่งข้อมูล: โทนสีส้มโทนพระอาทิตย์ขึ้น (Sunrise Orange) ดึงดูดสายตา */
    .submit-btn {
      width: 100%;
      padding: 14px;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #FFFFFF;
      background: linear-gradient(135deg, #FF6B4A 0%, #F15A36 100%);
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(241, 90, 54, 0.35);
      transition: all 0.2s ease;
    }

    /* แอนิเมชันเมื่อนำเมาส์ไปชี้ปุ่ม (Hover) */
    .submit-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 25px rgba(241, 90, 54, 0.45);
    }

    /* สไตล์เมื่อคลิกปุ่ม (Active) */
    .submit-btn:active {
      transform: translateY(0);
    }

    /* ข้อความแจ้งนโยบายความเป็นส่วนตัวด้านล่าง */
    .footer-note {
      font-size: 11px;
      color: #728278;
      margin-top: 18px;
    }
  </style>
</head>
<body>

  <!-- กล่องการ์ดแบบฟอร์มหลัก -->
  <div class="form-card">
    <!-- ป้ายชื่อแบรนด์และสโลแกน -->
    <div class="brand-tag">VIA ALTO • THE PATH TO HIGHER GROUND</div>
    
    <!-- หัวข้อฟอร์ม -->
    <h1 class="title">สมัครรับข่าวสาร 🏔️</h1>
    
    <!-- คำอธิบายและข้อเสนอโปรโมชั่น -->
    <p class="subtitle">
      รับข่าวสาร อุปกรณ์เดินป่ารุ่นใหม่ และโปรโมชั่นพิเศษก่อนใคร<br>
      ส่งตรงไปยังอีเมลของคุณ พร้อมรับส่วนลด 10%
    </p>

    <!-- 
      แบบฟอร์มรับข้อมูล:
      - action="sendMail.php" : กำหนดให้ส่งข้อมูลไปยังไฟล์ประมวลผล sendMail.php ตามขั้นตอนที่ 1 ในใบงาน
      - method="POST" : กำหนดรูปแบบการส่งข้อมูลแบบปลอดภัยผ่าน HTTP POST
    -->
    <form action="sendMail.php" method="POST">
      <div class="form-group">
        <!-- 
          ช่องกรอกอีเมล:
          - type="email" : บังคับให้เบราว์เซอร์ตรวจสอบโครงสร้างอีเมล (เช่น ต้องมี @ และโดเมน)
          - name="email" : กำหนดชื่อตัวแปรเพื่อนำไปรับค่าใน PHP ผ่าน $_POST['email']
          - required : บังคับว่าต้องกรอกข้อมูล ห้ามปล่อยว่าง
        -->
        <input 
          type="email" 
          name="email" 
          class="email-input" 
          placeholder="กรอกอีเมลของคุณ เช่น name@example.com" 
          required 
          autocomplete="email"
        />
      </div>

      <!-- 
        ช่องยินยอมรับข้อมูลข่าวสารตามกฎหมาย PDPA (Consent Checkbox):
        - name="consent" : ส่งค่าความยินยอมไปยัง sendMail.php
        - required : บังคับให้ต้องติ๊กยินยอมก่อนกดปุ่ม Submit เพื่อความสอดคล้องตามมาตรฐานคุ้มครองข้อมูลส่วนบุคคล
      -->
      <div style="margin: 14px 0 18px; text-align: left;">
        <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 11.5px; color: #5C6E63; cursor: pointer; line-height: 1.4; user-select: none;">
          <input 
            type="checkbox" 
            name="consent" 
            value="1" 
            required 
            checked 
            style="margin-top: 2px; accent-color: #183C32; width: 16px; height: 16px; shrink-0: 0; cursor: pointer;" 
          />
          <span>ฉันยินยอมรับข้อมูลข่าวสาร โปรโมชั่น และสิทธิพิเศษจาก VIA ALTO ตามนโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)</span>
        </label>
      </div>

      <!-- ปุ่ม Submit สำหรับกดส่งข้อมูลไปยัง sendMail.php -->
      <button type="submit" class="submit-btn">สมัครเลย</button>
    </form>

    <!-- ข้อความรับรองความปลอดภัยตามนโยบายความเป็นส่วนตัว -->
    <p class="footer-note">
      🔒 เราเคารพความเป็นส่วนตัวของคุณ และไม่ส่งสแปมเด็ดขาด
    </p>
  </div>

</body>
</html>
