# 🚀 Amazon Listing Optimizer

A full-stack AI-powered application that takes an Amazon ASIN, scrapes the product page, and generates optimized listing content using **Gemini 2.5 Flash**.
The UI displays **original vs. optimized** content side-by-side and stores every optimization for historical review.

This project simulates real internal tools used by Amazon sellers, agencies, and e-commerce automation teams.

---

# ✨ Features

### 🔍 Amazon Scraper

* Fetches **title**, **bullet points**, **description**, and **main product image** directly from the Amazon product page.
* Includes fallback selectors for Amazon layout changes.
* HTML aggressively cached for speed.

### 🤖 AI Optimization (Gemini 2.5 Flash)

Generates:

* Improved, keyword-rich product title
* Clearer, rewritten bullet points
* Persuasive and policy-safe product description
* 3–6 keyword suggestions
* Ultra-low latency via parallelized scraping + AI execution

### 🗄 Persistent History System

* Each optimization run is stored with timestamps.
* History page shows all items and lets you load any past optimization.
* Uses a **dual-mode data layer**:

  * **MySQL (primary)**
  * **Automatic JSON fallback** (`backend/src/db/db.json`)

### 💻 Modern Frontend (React + Vite)

* Tailwind-styled UI
* Skeleton loaders
* LocalStorage result persistence
* Beautiful comparison layout
* Two-page navigation: **Home** + **History**

---

# 🏗 Tech Stack

### **Frontend**

* React + Vite
* Tailwind CSS
* Modern card-based UI components

### **Backend**

* Node.js + Express
* Gemini API client
* Axios + Cheerio scraping engine
* Sequelize ORM
* MySQL / JSON fallback datastore

---

# 🔧 Architecture Overview

### Workflow

1. User enters ASIN (e.g., `B0FWDBH2T2`).
2. Frontend sends request → `POST /api/optimize`.
3. Backend:

   * Scrapes Amazon (title, bullets, description, image).
   * Runs Gemini optimization in parallel.
   * Saves original + optimized data.
4. Frontend displays a **side-by-side comparison**.
5. All prior optimizations appear in `/history`.

### Performance optimizations

* Scraping + AI run in parallel threads.
* HTML caching prevents re-fetching the full page repeatedly.
* DB writes are async for fast API responses.
* Skeleton loading elements produce instant UI feedback.

---

# 🗄 Database Layer

### **Primary Mode — MySQL**

If MySQL credentials in `.env` are valid:

* Sequelize initializes automatically.
* `optimizations` table is created on startup.
* All historical data is stored relationally.

### **Fallback Mode — JSON File**

If MySQL is unavailable:

* Backend uses `backend/src/db/db.json`.
* Structure mirrors real DB models.
* API responses remain identical.

This ensures **zero setup required** for local development.

---

# 📦 Setup Instructions

## 1️⃣ Backend Setup

```sh
cd backend
npm install
cp .env.example .env
```

Fill `.env`:

```env
PORT=3000
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.5-flash

# MySQL (optional — fallback JSON storage if invalid)
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=listing_optimizer
```

Start the backend:

```sh
npm run dev
```

Backend runs at:

```
http://localhost:3000
```

---

## 2️⃣ Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

Vite will start at:

```
http://localhost:5173
```

---

# 🧪 API Summary

### **POST** `/api/optimize`

Input:

```json
{ "asin": "B0FWDBH2T2" }
```

Returns:

* scraped data
* AI-optimized version
* stored history record

---

### **GET** `/api/history`

Returns all optimizations.

---

### **GET** `/api/history/:asin`

Returns optimization history for a single ASIN.

---

# 🎮 How to Use the App

1. Open the frontend in a browser.
2. Enter a valid ASIN.
3. Click **Optimize**.
4. View:

   * Original scraped Amazon data
   * AI-enhanced title, bullets, description, keywords
   * Product image
5. Navigate to **History** to browse all saved optimizations.

---

# 🧠 Engineering Decisions

* **Structured scraper** with fallback selectors to survive Amazon DOM changes.
* **Strict JSON schema** enforced in Gemini prompts for consistent output.
* **LocalStorage caching** so user results persist on refresh.
* **Unified DB interface** allowing transparent switching between MySQL and JSON.
* **High performance** via:

  * Parallel computation
  * Cached requests
  * Async DB writes
  * Optimized React rendering

---

# ⚠️ Limitations

* Amazon’s layout changes frequently—occasional selector updates required.
* Gemini’s rewriting quality varies based on product type.
* Amazon scraping must be used responsibly and may be restricted by Amazon’s terms.

---

# 🎯 Future Enhancements (Optional)

* Multi-language optimization
* Keyword analysis using Amazon autocomplete
* Export optimized listings (CSV / JSON)
* Bulk ASIN processing
* Dark mode UI

---
