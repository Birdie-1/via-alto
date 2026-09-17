# 🏔️ VIA ALTO — Alpine Gear & Expedition Storefront

[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![PHP](https://img.shields.io/badge/PHP-8.1+-777bb4?logo=php&logoColor=white)](https://www.php.net/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2d3748?logo=prisma&logoColor=white)](https://www.prisma.io/)

> **VIA ALTO** is a full-stack outdoor technical equipment e-commerce storefront and personalized recommendation platform featuring an alpine-grade UI, PostgreSQL database, Express API service, behavioral recommendation engine, and dynamic PHP email dispatch system.

---

## 🌐 Language Navigation / เลือกลักษณะภาษา

- 🇹🇭 [**คู่มือภาษาไทย (Thai Documentation)**](#-ภาษาไทย-thai-version)
  - [ภาพรวมสถาปัตยกรรมระบบ](#-สถาปัตยกรรมระบบ-system-architecture)
  - [ข้อกำหนดเบื้องต้น](#-ข้อกำหนดเบื้องต้น-prerequisites)
  - [ขั้นตอนการติดตั้งและเริ่มต้นใช้งาน](#-ขั้นตอนการติดตั้งและเริ่มต้นใช้งาน-quick-start)
  - [การตั้งค่า Environment Variables](#-การตั้งค่า-environment-variables-env)
  - [สรุปตารางคำสั่งทั้งหมดในระบบ](#-สรุปตารางคำสั่งทั้งหมด-available-commands)
  - [รายละเอียดโจทย์การบ้านและฟีเจอร์ Step 1 - 5](#-ฟีเจอร์ตามโจทย์การบ้าน-assignment-steps)
  - [การทดสอบ Endpoints ด้วย cURL](#-การทดสอบ-endpoints-ด้วย-curl)
  - [โครงสร้างโฟลเดอร์](#-โครงสร้างโฟลเดอร์-project-structure)
- 🇬🇧 [**English Documentation**](#-english-version)
  - [System Architecture](#-system-architecture)
  - [Prerequisites](#-prerequisites)
  - [Installation & Quick Start](#-installation--quick-start)
  - [Environment Variables Setup](#-environment-variables-configuration)
  - [Available Commands Reference](#-available-commands-cheat-sheet)
  - [Course Assignment Mapping (Steps 1 to 5)](#-course-assignment-mapping-steps-1--5)
  - [API & Email Endpoint Verification](#-api--endpoint-testing-with-curl)
  - [Directory Structure](#-project-directory-structure)

---

# 🇹🇭 ภาษาไทย (Thai Version)

## 📌 สถาปัตยกรรมระบบ (System Architecture)

ระบบ VIA ALTO ประกอบไปด้วย 4 ส่วนหลักที่ทำงานร่วมกัน:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   1. Frontend Storefront (React 19 + Vite)              │
│       Port: http://localhost:5173  |  Tailwind CSS v4  |  Lucide Icons │
└──────────────────┬─────────────────────────────────┬───────────────────┘
                   │ REST API Calls                  │ Email Triggers
                   ▼                                 ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│  2. Node.js API Server (Express)     │  │ 3. PHP Email Backend Service │
│     Port: http://localhost:5001      │  │    Port: http://localhost:8000│
│  - JWT Authentication & Users        │  │  - PHPMailer / SMTP Engine   │
│  - Cart, Orders & Vouchers Engine    │  │  - PostgreSQL PDO Connection │
│  - Prisma ORM Data Layer             │  │  - Dynamic CID Image Embed   │
└──────────────────┬───────────────────┘  └──────────────┬───────────────┘
                   │                                     │
                   └──────────────────┬──────────────────┘
                                      ▼
             ┌─────────────────────────────────────────────────┐
             │       4. PostgreSQL 16 Relational Database      │
             │           Database Name: via_alto               │
             │  - Categories, Products, Sizes, Colors          │
             │  - Users, Orders, Vouchers, Newsletter Leads    │
             └─────────────────────────────────────────────────┘
```

---

## 🛠️ ข้อกำหนดเบื้องต้น (Prerequisites)

ก่อนเริ่มติดตั้ง ตรวจสอบให้แน่ใจว่าได้ติดตั้งซอฟต์แวร์เหล่านี้ในเครื่องเรียบร้อยแล้ว:

1. **Node.js**: เวอร์ชัน `>= 18.0.0` (แนะนำ LTS ล่าสุด)
2. **PostgreSQL**: เวอร์ชัน 15 หรือ 16 กำลังทำงานอยู่บนเครื่อง (`localhost:5432`)
3. **PHP**: เวอร์ชัน `>= 8.1` พร้อม Extension:
   - `pdo_pgsql` (สำหรับเชื่อมต่อ PostgreSQL)
   - `mbstring`, `curl`, `openssl`

---

## 🚀 ขั้นตอนการติดตั้งและเริ่มต้นใช้งาน (Quick Start)

### 1. โคลนคลังโค้ด (Clone Repository)
```bash
git clone https://github.com/your-username/via-alto.git
cd via-alto
```

### 2. ติดตั้ง Dependencies ทั้งหมด
```bash
# ติดตั้ง Frontend Dependencies
npm install

# ติดตั้ง Node Server Dependencies
cd server && npm install && cd ..
```

### 3. สร้างและกำหนดค่าฐานข้อมูล PostgreSQL
เปิดโปรแกรมจัดการฐานข้อมูล (เช่น `psql` หรือ pgAdmin) แล้วสร้างฐานข้อมูล:
```sql
CREATE DATABASE via_alto;
```

### 4. ซิงค์โครงสร้างตารางและ Seed ข้อมูลสินค้า
รัน Prisma เพื่อสร้างตารางและใส่ข้อมูลสินค้าเริ่มต้น (25 รายการ, หมวดหมู่, สเปก และรูปภาพ):
```bash
# พุช Schema เข้าสู่ PostgreSQL
npm run prisma:push --prefix server

# Seed ข้อมูลสินค้า หมวดหมู่ สี และผู้ใช้ตัวอย่าง
npm run server:seed
```

### 5. ตั้งค่าไฟล์ Environment Variables (`.env`)
ระบบมีตัวอย่างไฟล์ `.env.example` เตรียมไว้ให้ ให้ทำการคัดลอก:

```bash
# คัดลอก Environment สำหรับ Node.js Server
cp server/.env.example server/.env

# คัดลอก Environment สำหรับ PHP Backend
cp backend/.env.example backend/.env
```

*(ดูรายละเอียดค่าในหัวข้อถัดไป)*

### 6. เริ่มต้นรันระบบ (Run All Services)
เปิด Terminal แยก 3 หน้าต่าง หรือรันในแท็บตามคำสั่งนี้:

```bash
# Terminal 1: เริ่มต้น Node.js API Server (Port 5001)
npm run server:dev

# Terminal 2: เริ่มต้น PHP Email Server (Port 8000)
npm run php:serve

# Terminal 3: เริ่มต้น Frontend Storefront (Port 5173)
npm run dev
```

เปิดเว็บเบราว์เซอร์เข้าที่: **`http://localhost:5173`** 🎉

---

## ⚙️ การตั้งค่า Environment Variables (`.env`)

### 1. ไฟล์ `server/.env` (Node.js API)
```env
# URL เชื่อมต่อไปยัง PostgreSQL (ปรับเปลี่ยน username:password ตามเครื่องของคุณ)
DATABASE_URL="postgresql://postgres:password@localhost:5432/via_alto"

# พอร์ตสำหรับ Node API Server
PORT=5001

# คีย์ความปลอดภัยสำหรับสร้าง JWT Tokens
JWT_SECRET="via_alto_alpine_secret_key_2026_super_secure"
JWT_REFRESH_SECRET="via_alto_refresh_secret_key_2026_super_secure"

# URL ของ Frontend เพื่อรองรับ CORS
FRONTEND_URL="http://localhost:5173"
```

### 2. ไฟล์ `backend/.env` (PHP Email Backend)
```env
# ตั้งค่าผู้ส่งอีเมลและโหมดการทำงาน
MAIL_DRIVER=smtp              # 'smtp' (ส่งจริง) หรือ 'log' (จำลองบันทึกไฟล์)
MAIL_FROM_ADDRESS=club@via-alto.com
MAIL_FROM_NAME="🏔️ VIA ALTO"
SITE_URL=https://birdie-1.github.io/via-alto

# การตั้งค่า Gmail SMTP (ใช้ App Password 16 หลัก)
SMTP_USER=your_email@gmail.com
SMTP_PASS="xxxx xxxx xxxx xxxx"
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=tls
```

> 💡 **หมายเหตุโหมดจำลอง (Log Mode):** หากไม่ต้องการใส่รหัสผ่าน Gmail จริง สามารถปล่อยว่างหรือตั้ง `MAIL_DRIVER=log` ระบบจะบันทึกอีเมลตัวเต็มเป็นไฟล์ HTML สวยงามไว้ในโฟลเดอร์ `backend/logs/` และแสดงพรีวิวในเว็บได้ทันที

---

## 💻 สรุปตารางคำสั่งทั้งหมด (Available Commands)

### 🖥️ 1. คำสั่งฝั่ง Frontend (Root Directory)
| คำสั่ง (Command) | คำอธิบายการทำงาน (Description) |
|---|---|
| `npm run dev` | เริ่มต้น Vite Dev Server สำหรับหน้าร้าน (`http://localhost:5173`) |
| `npm run build` | บิลด์ไฟล์ Production Bundle ลงในโฟลเดอร์ `dist/` |
| `npm run preview` | ทดสอบเปิดดู Production Build ในเครื่อง |

### ⚙️ 2. คำสั่งฝั่ง Node.js Server & Database
| คำสั่ง (Command) | คำอธิบายการทำงาน (Description) |
|---|---|
| `npm run server:dev` | รัน Node Express API Server ด้วย Nodemon (Auto-reload บนพอร์ต 5001) |
| `npm run server:start` | รัน Node Express API Server แบบ Production |
| `npm run server:seed` | นำเข้าข้อมูลเริ่มต้น (Categories, Products, Users) สู่ PostgreSQL |
| `npm run prisma:push --prefix server` | ซิงค์ `schema.prisma` เข้าฐานข้อมูลทันทีโดยไม่ต้องทำ Migration |
| `npm run prisma:studio --prefix server` | เปิด Prisma Studio (Web GUI) ส่องดูข้อมูลใน Database ที่ `http://localhost:5555` |

### ✉️ 3. คำสั่งฝั่ง PHP Email Backend
| คำสั่ง (Command) | คำอธิบายการทำงาน (Description) |
|---|---|
| `npm run php:serve` | เริ่มต้น PHP Built-in Server ที่พอร์ต 8000 (`http://localhost:8000`) |
| `php -S localhost:8000 -t backend` | คำสั่งตรงในการรัน PHP Server (ชี้ Document Root ไปที่โฟลเดอร์ backend) |

---

## 📋 ฟีเจอร์ตามโจทย์การบ้าน (Assignment Steps)

| ลำดับโจทย์ | หัวข้อและข้อกำหนด | ไฟล์และส่วนที่พัฒนารองรับ | รายละเอียดการทำงาน |
|---|---|---|---|
| **Step 1** | แบบฟอร์ม Subscribe ในหน้าแรก | [`src/components/home/FinalCTA.jsx`](src/components/home/FinalCTA.jsx)<br>[`src/components/layout/Footer.jsx`](src/components/layout/Footer.jsx) | ฟอร์มรับอีเมลสมาชิกใหม่ พร้อมการตรวจสอบ Regex ความถูกต้อง และบันทึกเข้า DB |
| **Step 2** | ไฟล์ `.php` ส่งเนื้อหาไปยังอีเมลหลัง Subscribe | [`backend/subscribe.php`](backend/subscribe.php)<br>[`backend/templates/welcome_email.php`](backend/templates/welcome_email.php) | ส่ง Welcome Email สไตล์ Outdoor พร้อมรหัสคูปองส่วนลด 10% (`WELCOME10`) |
| **Step 3** | Personalized Marketing แนะนำสินค้าตามความสนใจ | [`backend/db.php`](backend/db.php)<br>[`backend/templates/recommendation_email.php`](backend/templates/recommendation_email.php) | ระบบแนะนำสินค้า 3 ชิ้น **Dynamic จาก PostgreSQL** โดยวิเคราะห์ความชอบ (Trail Running, Camping, Mountaineering, Trekking) พร้อมภาพ Master 1024x1024 |
| **Step 4** | ไฟล์ `.php` ส่งอีเมลหลังการสมัครสมาชิก | [`backend/register_welcome.php`](backend/register_welcome.php)<br>[`src/components/auth/RegisterModal.jsx`](src/components/auth/RegisterModal.jsx) | เมื่อสมาชิกกดสมัครเสร็จสิ้น ระบบจะยิง trigger ส่ง Personalized Email ทักทายด้วย Username ของสมาชิกจริง |
| **Step 5** | ระบบแนะนำสินค้าจากพฤติกรรม (Behavioral Recommender) | [`src/services/behaviorService.js`](src/services/behaviorService.js)<br>[`src/pages/ShopPage.jsx`](src/pages/ShopPage.jsx)<br>[`src/components/shop/ProductDetailModal.jsx`](src/components/shop/ProductDetailModal.jsx)<br>[`src/components/layout/CartDrawer.jsx`](src/components/layout/CartDrawer.jsx) | • **Recently Viewed**: แถบสินค้าที่เพิ่งเปิดชมล่าสุด<br>• **Frequently Paired With**: สินค้าที่คนมักซื้อคู่กันในหน้าสเปกสินค้า<br>• **Cart Cross-sells**: สินค้าแนะนำเพิ่มเติมในตะกร้า |

---

## 🧪 การทดสอบ Endpoints ด้วย cURL

### 1. ทดสอบ Health Check ของ Node Server & PostgreSQL
```bash
curl -X GET http://localhost:5001/api/health
```
**ตัวอย่างการตอบกลับ (Response):**
```json
{
  "status": "ok",
  "service": "VIA ALTO Node API",
  "database": "PostgreSQL 16 (connected)",
  "timestamp": "2026-09-16T17:00:00.000Z"
}
```

### 2. ทดสอบสมัครรับ Newsletter (Step 2)
```bash
curl -X POST http://localhost:8000/subscribe.php \
  -H "Content-Type: application/json" \
  -d '{"email": "adventurer@example.com", "name": "Summit Explorer"}'
```

### 3. ทดสอบส่ง Personalized Recommendation Email (Steps 3 & 4)
```bash
curl -X POST http://localhost:8000/register_welcome.php \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alex_summit",
    "fullName": "Alex River",
    "email": "alex@example.com",
    "marketingProfile": {
      "primaryActivities": ["trail_running"],
      "region": "northern",
      "experienceLevel": "advanced"
    }
  }'
```

---

## 📂 โครงสร้างโฟลเดอร์ (Project Structure)

```text
via-alto/
├── backend/                  # บริการ PHP Email Backend (Step 2, 3, 4)
│   ├── images/               # รูปภาพสินค้าและโลโก้ระดับ Master สำหรับแนบในอีเมล
│   ├── logs/                 # บันทึกประวัติและไฟล์พรีวิว HTML ของอีเมลทั้งหมด
│   ├── templates/            # แม่แบบ HTML Email (welcome_email, recommendation_email)
│   ├── config.php            # ตั้งค่าระบบ CORS และตัวแปร Mailer
│   ├── db.php                # เชื่อมต่อ PostgreSQL PDO และตรรกะคำนวณ Personalized 3 ชิ้น
│   ├── mailer.php            # แกนกลาง PHPMailer / Log driver
│   ├── register_welcome.php  # Endpoint รับสมาชิกใหม่และส่งอีเมล Step 4
│   └── subscribe.php         # Endpoint รับการกด Subscribe และส่งอีเมล Step 2
├── server/                   # บริการ Node.js & Express REST API
│   ├── prisma/
│   │   ├── schema.prisma     # โครงสร้างตาราง PostgreSQL (Products, Users, Orders ฯลฯ)
│   │   └── seed.js           # สคริปต์เติมข้อมูลสินค้าและหมวดหมู่ 25 รายการ
│   └── src/
│       ├── routes/           # เส้นทาง API (auth, products, cart, orders, vouchers)
│       └── index.js          # จุดเริ่มต้น Node Express Server (Port 5001)
├── src/                      # ซอร์สโค้ดฝั่ง Frontend (React 19 + Vite)
│   ├── components/           # UI Components (Navbar, Footer, Modals, Shop, Cart)
│   │   ├── emails/           # EmailPreviewModal ดูตัวอย่างอีเมลสดๆ บนเว็บ
│   │   └── shop/             # ProductCards, RecentlyViewed (Step 5)
│   ├── data/                 # ข้อมูลสินค้าและคำแปลหลายภาษา (TH/EN)
│   ├── pages/                # หน้าเว็บ (HomePage, ShopPage, CheckoutPage, AccountPage)
│   ├── services/             # API client และ behaviorService.js (Step 5)
│   ├── App.jsx               # คอมโพเนนต์หลักและเส้นทางของแอปพลิเคชัน
│   └── main.jsx              # จุดเริ่มต้น React DOM
├── public/images/            # รูปภาพสินค้า Master 1024x1024 สำหรับแสดงบนหน้าร้าน
├── package.json              # สคริปต์และ dependencies รวมของโปรเจกต์
└── README.md                 # เอกสารคู่มือระบบ 2 ภาษา
```

---
---

# 🇬🇧 English Version

## 📌 System Architecture

VIA ALTO operates on a synchronized 4-tier stack:

1. **Frontend Storefront (`http://localhost:5173`)**:
   - Built with **React 19**, **Vite 6**, and **Tailwind CSS v4**.
   - Features full bilingual localization (English / Thai), interactive Gear Finder, live cart, and in-app Email Previews.
2. **REST API Server (`http://localhost:5001`)**:
   - Built with **Node.js** and **Express**.
   - Provides JWT-based user authentication, order processing, catalog filtering, and Prisma ORM integration.
3. **Relational Database (`PostgreSQL 16`)**:
   - Persistent store named `via_alto`.
   - Houses models for categories, products, sizes, color variants, user accounts, orders, discount vouchers, and subscribers.
4. **Email Automation Engine (`http://localhost:8000`)**:
   - Standalone **PHP 8** backend with **PHPMailer** and PostgreSQL PDO.
   - Dispatches dynamic emails with Content-ID (CID) embedded high-res assets, responsive tables, and personalized marketing product picks.

---

## 🛠️ Prerequisites

Ensure your development environment has the following tools installed:

- **Node.js**: `>= 18.0.0`
- **PostgreSQL**: `>= 15.0` or `16.0` running locally on `localhost:5432`
- **PHP**: `>= 8.1` with extensions enabled: `pdo_pgsql`, `mbstring`, `curl`, `openssl`

---

## 🚀 Installation & Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/via-alto.git
cd via-alto
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..
```

### 3. Initialize PostgreSQL Database
Create the database using your preferred PostgreSQL client or command line:
```sql
CREATE DATABASE via_alto;
```

### 4. Push Database Schema & Seed Catalog
```bash
# Push Prisma schema directly to PostgreSQL
npm run prisma:push --prefix server

# Seed initial categories, 25 alpine products, and test accounts
npm run server:seed
```

### 5. Setup Environment Configurations
Copy sample `.env` templates:
```bash
# Setup Node API server environment
cp server/.env.example server/.env

# Setup PHP email backend environment
cp backend/.env.example backend/.env
```

### 6. Launch the Application
Run the services across 3 terminal tabs:

```bash
# Terminal 1: Node.js Express API Server (Port 5001)
npm run server:dev

# Terminal 2: PHP Email Backend Server (Port 8000)
npm run php:serve

# Terminal 3: Vite Frontend Storefront (Port 5173)
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## ⚙️ Environment Variables Configuration

### 1. `server/.env` (Node.js API)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/via_alto"
PORT=5001
JWT_SECRET="via_alto_alpine_secret_key_2026_super_secure"
JWT_REFRESH_SECRET="via_alto_refresh_secret_key_2026_super_secure"
FRONTEND_URL="http://localhost:5173"
```

### 2. `backend/.env` (PHP Email Service)
```env
MAIL_DRIVER=smtp              # 'smtp' for real delivery or 'log' for offline file simulation
MAIL_FROM_ADDRESS=club@via-alto.com
MAIL_FROM_NAME="🏔️ VIA ALTO"
SITE_URL=https://birdie-1.github.io/via-alto

# Gmail SMTP Settings (Requires 16-character App Password)
SMTP_USER=your_email@gmail.com
SMTP_PASS="xxxx xxxx xxxx xxxx"
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=tls
```

> 💡 **Offline Testing (`log` mode):** When `MAIL_DRIVER=log` is configured, outgoing emails are saved as self-contained HTML previews in `backend/logs/`. You can preview them directly in any browser without needing active SMTP credentials.

---

## 💻 Available Commands Cheat Sheet

| Command | Working Directory | Description |
|---|---|---|
| `npm run dev` | Root | Starts the Vite development server on `http://localhost:5173` |
| `npm run build` | Root | Builds optimized production frontend bundle into `dist/` |
| `npm run preview` | Root | Locally serves and previews the production build |
| `npm run server:dev` | Root | Starts the Node.js API server with auto-reloading Nodemon on port `5001` |
| `npm run server:start` | Root | Starts the Node.js API server in standard Node production mode |
| `npm run server:seed` | Root | Populates the database with full catalog items and demo users |
| `npm run php:serve` | Root | Launches the PHP built-in server on `http://localhost:8000` |
| `npm run prisma:push --prefix server` | Server | Synchronizes Prisma schema with PostgreSQL without generating migrations |
| `npm run prisma:studio --prefix server` | Server | Opens Prisma Studio GUI browser at `http://localhost:5555` |

---

## 📋 Course Assignment Mapping (Steps 1 – 5)

| Step | Requirement | Implementation Files | Highlights |
|---|---|---|---|
| **Step 1** | Newsletter Subscription Form | [`FinalCTA.jsx`](src/components/home/FinalCTA.jsx)<br>[`Footer.jsx`](src/components/layout/Footer.jsx) | Instant validation, reactive UI state, and seamless submission. |
| **Step 2** | PHP Dispatcher for Newsletter Welcome | [`backend/subscribe.php`](backend/subscribe.php)<br>[`welcome_email.php`](backend/templates/welcome_email.php) | Issues a 10% discount promo code (`WELCOME10`) with dark alpine design. |
| **Step 3** | Personalized Product Recommendation Engine | [`backend/db.php`](backend/db.php)<br>[`recommendation_email.php`](backend/templates/recommendation_email.php) | Dynamically queries PostgreSQL to curate 3 products according to user interests (Trail Running, Camping, Mountaineering, or Trekking). |
| **Step 4** | PHP Dispatcher for Member Registration | [`backend/register_welcome.php`](backend/register_welcome.php)<br>[`RegisterModal.jsx`](src/components/auth/RegisterModal.jsx) | Greets the newly registered user by their exact registered username (`HEY <USERNAME>,`). |
| **Step 5** | Implicit Behavioral Recommendation System | [`behaviorService.js`](src/services/behaviorService.js)<br>[`ShopPage.jsx`](src/pages/ShopPage.jsx)<br>[`ProductDetailModal.jsx`](src/components/shop/ProductDetailModal.jsx)<br>[`CartDrawer.jsx`](src/components/layout/CartDrawer.jsx) | Tracks user browsing events on the storefront:<br>• **Recently Viewed** carousel<br>• **Frequently Paired With** gear kits<br>• **Cart Cross-Sells** complementary items |

---

## 🧪 API & Endpoint Testing with cURL

### 1. Server Health Check
```bash
curl -X GET http://localhost:5001/api/health
```

### 2. Newsletter Subscription (Step 2)
```bash
curl -X POST http://localhost:8000/subscribe.php \
  -H "Content-Type: application/json" \
  -d '{"email": "explorer@via-alto.com", "name": "Summit Explorer"}'
```

### 3. Personalized Member Recommendation (Steps 3 & 4)
```bash
curl -X POST http://localhost:8000/register_welcome.php \
  -H "Content-Type: application/json" \
  -d '{
    "username": "mountain_ranger",
    "fullName": "Alex River",
    "email": "alex@via-alto.com",
    "marketingProfile": {
      "primaryActivities": ["camping"],
      "region": "northern",
      "experienceLevel": "intermediate"
    }
  }'
```

---

## 📂 Project Directory Structure

```text
via-alto/
├── backend/                  # PHP Email Backend Service (Steps 2, 3, 4)
│   ├── images/               # High-resolution CID embedded master assets
│   ├── logs/                 # Delivery logs and offline HTML email previews
│   ├── templates/            # HTML Email templates with inline CSS
│   ├── config.php            # Environment loader and CORS handling
│   ├── db.php                # PostgreSQL PDO integration and 3-item recommendation logic
│   ├── mailer.php            # PHPMailer engine wrapper (SMTP & Log drivers)
│   ├── register_welcome.php  # Registration trigger endpoint
│   └── subscribe.php         # Newsletter subscribe endpoint
├── server/                   # Node.js Express REST API
│   ├── prisma/
│   │   ├── schema.prisma     # PostgreSQL data models
│   │   └── seed.js           # 25-item catalog seed script
│   └── src/
│       ├── routes/           # REST routes (auth, products, cart, orders, vouchers)
│       └── index.js          # Express app entry point (Port 5001)
├── src/                      # React 19 Frontend Storefront
│   ├── components/           # Reusable components (Navigation, Modals, Shop, Cart)
│   │   ├── emails/           # In-app Email Preview Modal
│   │   └── shop/             # Product Cards, Details, Recently Viewed (Step 5)
│   ├── data/                 # Catalog data & translations (TH/EN)
│   ├── pages/                # Views (HomePage, ShopPage, CheckoutPage, AccountPage)
│   ├── services/             # API client & behavioral recommendation engine (Step 5)
│   ├── App.jsx               # App routes and global state
│   └── main.jsx              # React DOM mounting
├── public/images/            # Master 1024x1024 product imagery
├── package.json              # Unified root scripts and dependencies
└── README.md                 # Bilingual documentation (Thai & English)
```

---

## 📜 License & Acknowledgments

Developed for the **VIA ALTO Alpine Outdoor Technical Gear** project. All product specifications, assets, and design systems are created for academic and demonstration purposes.