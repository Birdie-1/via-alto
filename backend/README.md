# VIA ALTO — PHP Email Backend Service

This backend fulfills the email service requirements specified in the assignment roadmap:

## 📋 Assignment Requirements Mapping

| Step | Requirement | Implementation |
|---|---|---|
| **Step 1** | แบบฟอร์ม Subscribe ในหน้าแรก | `src/components/home/FinalCTA.jsx` & `src/components/layout/Footer.jsx` |
| **Step 2** | สร้างไฟล์ `.php` เพื่อส่งเนื้อหาไปยังอีเมลหลังจาก subscribe | `backend/subscribe.php` (triggers `welcome_email.php`) |
| **Step 3** | สร้าง Personalized Marketing เพื่อแนะนำสินค้าตามความสนใจ | `backend/templates/recommendation_email.php` (dynamically matched to user's `marketingProfile`) |
| **Step 4** | สร้างไฟล์ `.php` เพื่อส่งเนื้อหาไปยังอีเมลหลังจากสมัครสมาชิก | `backend/register_welcome.php` (receives preferences and sends Step 3 email) |
| **Step 5** | ระบบแนะนำสินค้า (Behavioral Recommender) | Planned for storefront integration |

---

## 🚀 How to Run the PHP Backend

### 1. Start the PHP server
From the project root:
```bash
npm run php:serve
```
Or directly with PHP:
```bash
php -S localhost:8000 -t backend
```

The PHP service is now running at `http://localhost:8000`.

---

## 📬 Testing the Endpoints

### 1. Test Newsletter Subscription (Step 2)
```bash
curl -X POST http://localhost:8000/subscribe.php \
  -H "Content-Type: application/json" \
  -d '{"email": "alex@via-alto.com", "name": "Alex River"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Email simulated and saved successfully to logs/ directory.",
  "driver": "log",
  "email": "alex@via-alto.com",
  "voucher_code": "GOBEYOND10",
  "preview_url": "email_2026-09-10_..._alex_via-alto_com.html"
}
```

### 2. Test Member Registration & Personalized Recommendation (Steps 3 & 4)
```bash
curl -X POST http://localhost:8000/register_welcome.php \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Paweenuch Namdaeng",
    "email": "paweenuch@example.com",
    "marketingProfile": {
      "primaryActivities": ["trekking", "camping"],
      "region": "northern",
      "experienceLevel": "intermediate",
      "sizes": { "apparel": "L", "footwear": "42" }
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Email simulated and saved successfully to logs/ directory.",
  "driver": "log",
  "email": "paweenuch@example.com",
  "recommended_product": "Alpine 35L Technical Backpack",
  "preview_url": "email_2026-09-10_..._paweenuch_example_com.html"
}
```

---

## ⚙️ Configuration & SMTP Mode

By default, the driver is set to `log` mode so it works **out-of-the-box without needing real SMTP credentials**:
- Every sent email generates an exact HTML preview file in `backend/logs/`
- Every send event is logged to `backend/logs/emails.log`
- Persistent records are saved to `backend/data/subscribers.json` and `backend/data/registrations.json`

To switch to real SMTP (e.g. Gmail App Password, Mailtrap, or Brevo), set environment variables in `backend/config.php` or your shell:
```bash
export MAIL_DRIVER=smtp
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_SECURE=tls
export SMTP_USER=your-email@gmail.com
export SMTP_PASS=your-16-char-app-password
```
