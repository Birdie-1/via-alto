<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>สมัครรับข่าวสาร — VIA ALTO</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Thai", Helvetica, Arial, sans-serif;
    }
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
    .brand-tag {
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      font-weight: 700;
      color: #183C32;
      opacity: 0.7;
      margin-bottom: 8px;
    }
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
    .subtitle {
      font-size: 13.5px;
      line-height: 1.5;
      color: #3B4B42;
      margin-bottom: 28px;
    }
    .form-group {
      margin-bottom: 16px;
      text-align: left;
    }
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
    .email-input:focus {
      border-color: #183C32;
      box-shadow: 0 0 0 4px rgba(24, 60, 50, 0.15);
    }
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
    .submit-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 25px rgba(241, 90, 54, 0.45);
    }
    .submit-btn:active {
      transform: translateY(0);
    }
    .footer-note {
      font-size: 11px;
      color: #728278;
      margin-top: 18px;
    }
  </style>
</head>
<body>

  <div class="form-card">
    <div class="brand-tag">VIA ALTO • THE PATH TO HIGHER GROUND</div>
    <h1 class="title">สมัครรับข่าวสาร 🏔️</h1>
    <p class="subtitle">
      รับข่าวสาร อุปกรณ์เดินป่ารุ่นใหม่ และโปรโมชั่นพิเศษก่อนใคร<br>
      ส่งตรงไปยังอีเมลของคุณ พร้อมรับส่วนลด 10%
    </p>

    <!-- ส่งข้อมูลแบบ POST ไปยัง sendMail.php ตามที่ใบงานระบุ -->
    <form action="sendMail.php" method="POST">
      <div class="form-group">
        <input 
          type="email" 
          name="email" 
          class="email-input" 
          placeholder="กรอกอีเมลของคุณ เช่น name@example.com" 
          required 
          autocomplete="email"
        />
      </div>
      <button type="submit" class="submit-btn">สมัครเลย</button>
    </form>

    <p class="footer-note">
      🔒 เราเคารพความเป็นส่วนตัวของคุณ และไม่ส่งสแปมเด็ดขาด
    </p>
  </div>

</body>
</html>
