# VIMAL Kitchen Equipment - Corporate Web Platform

Premium Industrial Engineering & Commercial Kitchen Solutions Website.

Built with **HTML5**, **Tailwind CSS**, **Vanilla JavaScript**, and custom **CSS** animations. Engineered for maximum speed, SEO indexing, high conversion rates, and zero external framework lock-in.

---

## Table of Contents
1. [How to Run the Website](#1-how-to-run-the-website)
2. [How to Replace the Logo](#2-how-to-replace-the-logo)
3. [How to Replace Product Images](#3-how-to-replace-product-images)
4. [How to Update Phone Number](#4-how-to-update-phone-number)
5. [How to Update WhatsApp Number](#5-how-to-update-whatsapp-number)
6. [How to Update Email](#6-how-to-update-email)
7. [How to Update Address](#7-how-to-update-address)
8. [How to Add Products](#8-how-to-add-products)
9. [How to Add Projects](#9-how-to-add-projects)
10. [How to Add Gallery Images](#10-how-to-add-gallery-images)

---

### 1. How to Run the Website

Because this is a modern, static HTML/CSS/JS website, it does not require a complex build step or heavy node server to view.

#### Option A: Run with Any Local HTTP Server (Recommended)
You can use Python, Node, or VS Code Live Server:

```bash
# Using Python 3:
python3 -m http.server 3000

# Using Node npx serve:
npx serve .

# Or using PHP:
php -S localhost:3000
```
Then open `http://localhost:3000` in your web browser.

#### Option B: Direct Double-Click
You can also open `index.html` directly in Google Chrome, Safari, Firefox, or Edge.

---

### 2. How to Replace the Logo

The official brand identity assets are located in `assets/images/logo/`:
- `vimal-logo.png` (Transparent high-resolution 3D logo with black descriptor for light headers)
- `vimal-logo-white.png` (Transparent high-resolution 3D logo with white descriptor for dark navy footers)
- `vimal-brand-badge.png` (Full brand identity infographic emblem with products & sectors)
- `favicon.ico` / `favicon.png` (Official flame favicon)

To replace or update:
1. Save your image file into `assets/images/logo/`.
2. Keep the names `vimal-logo.png` and `vimal-logo-white.png` for automatic replacement, or update the `<img>` tags in the `<header>` and `<footer>` sections of each HTML page.

---

### 3. How to Replace Product Images

Product imagery is stored in `assets/images/products/`:
- `commercial-cooking.jpg`
- `exhaust-ventilation.jpg`
- `food-processing.jpg`
- `induction-kitchen.jpg`
- `bulk-cooking.jpg`
- `lpg-steam-pipeline.jpg`

To update an image, replace the file with a high-resolution, well-lit photo of the actual equipment (recommended aspect ratio: 4:3 or 16:9, compressed WebP or JPG).

---

### 4. How to Update Phone Number

All phone numbers are centralized in `js/config.js`:

```javascript
const SITE_CONFIG = {
  PHONE_NUMBER: "+91 98765 43210", // Formatted display number
  PHONE_RAW: "+919876543210",       // Raw number for tel: links
  // ...
};
```
When you edit `SITE_CONFIG.PHONE_NUMBER` in `js/config.js`, every phone link across all 8 pages will automatically update.

---

### 5. How to Update WhatsApp Number

The WhatsApp floating button, top bar buttons, and inquiry links are configured in `js/config.js`:

```javascript
const SITE_CONFIG = {
  // Enter digits only including country code (e.g. 91 for India):
  WHATSAPP_NUMBER: "919876543210",
  
  // Custom default pre-filled inquiry message:
  WHATSAPP_MESSAGE: "Hello VIMAL Kitchen Equipment, I would like to enquire about your commercial kitchen solutions.",
};
```
Saving this file instantly updates all WhatsApp click-to-chat links site-wide.

---

### 6. How to Update Email

Update the email addresses in `js/config.js`:

```javascript
const SITE_CONFIG = {
  EMAIL: "contact@vimalkitchen.com",
  SALES_EMAIL: "sales@vimalkitchen.com",
};
```
All `mailto:` links with `data-config="email"` will reflect the new address automatically.

---

### 7. How to Update Address

Update the physical location in `js/config.js`:

```javascript
const SITE_CONFIG = {
  ADDRESS: "Industrial Estate, Guindy, Chennai, Tamil Nadu - 600032, India",
  WORKING_HOURS: "Monday - Saturday: 9:00 AM - 6:30 PM",
};
```
Any element tagged with `data-config="address"` updates automatically.

---

### 8. How to Add Products

To add a new product to `products.html`:
1. Place the product photo in `assets/images/products/`.
2. Open `products.html` and locate the `#products-container` element.
3. Duplicate one of the `<div class="product-card product-item" data-category="YOUR_CATEGORY">` cards:
   - Valid categories for filtering: `cooking`, `ventilation`, `food-processing`, `induction`, `bulk-cooking`, `lpg-steam`.
4. Update the title, description, specifications, and inquiry button link:
   ```html
   <a href="contact.html?product=New+Product+Name" class="btn-primary btn-sm w-full text-center">
     ENQUIRE SPECIFICATIONS
   </a>
   ```

---

### 9. How to Add Projects

To add an installation to `projects.html`:
1. Save the on-site photo in `assets/images/projects/`.
2. Open `projects.html` and add a new card inside the projects grid:
   ```html
   <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
     <div class="h-64 overflow-hidden relative bg-slate-100">
       <img src="assets/images/projects/your-project.jpg" alt="Project Name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
       <div class="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded text-[11px] font-ui font-bold uppercase tracking-wider text-brand-navy shadow-sm">
         SECTOR
       </div>
     </div>
     <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
       <div>
         <div class="flex items-center gap-1.5 text-xs font-ui font-bold text-slate-500 uppercase tracking-widest mb-1">
           <i data-lucide="map-pin" class="w-3.5 h-3.5 text-brand-red"></i>
           <span>City, State</span>
         </div>
         <h3 class="text-2xl font-display font-extrabold text-brand-navy group-hover:text-brand-red transition-colors">
           PROJECT TITLE
         </h3>
         <p class="text-sm text-slate-600 font-body mt-2">
           Description of installation, equipment supplied, and pipeline network.
         </p>
       </div>
     </div>
   </div>
   ```

---

### 10. How to Add Gallery Images

To add a photo to the filterable masonry gallery in `gallery.html`:
1. Save your photograph in `assets/images/gallery/`.
2. Open `gallery.html` and add an item inside `#gallery-container`:
   ```html
   <div class="gallery-item" data-category="kitchen-equipment" data-title="Cooking Range Installation" data-category-label="Kitchen Equipment">
     <img src="assets/images/gallery/your-new-image.jpg" alt="Cooking Range Installation">
     <div class="gallery-overlay">
       <div class="text-center p-4 text-white">
         <i data-lucide="zoom-in" class="w-8 h-8 mx-auto mb-2 text-brand-flame-orange"></i>
         <h4 class="text-lg font-ui font-extrabold uppercase">Cooking Range Installation</h4>
         <p class="text-xs text-slate-300">Commercial Kitchens</p>
       </div>
     </div>
   </div>
   ```
   - Valid categories: `kitchen-equipment`, `installations`, `ventilation`, `pipeline`, `projects`.
3. The image is immediately integrated into the category filters and interactive modal lightbox.

---

### Project Structure Overview

```
vimal/
├── index.html          # Homepage with Hero, Products, LPG Highlight, Services
├── about.html          # Technical engineering capabilities & story
├── products.html       # Categorized catalog with live filtering
├── services.html       # Turnkey design, LPG pipelines, AMC, and repairs
├── industries.html     # Dedicated sectors: Hotels, Restaurants, Canteens, etc.
├── projects.html       # Structured installation records & client cards
├── gallery.html        # Masonry visual portfolio with modal lightbox
├── contact.html        # Verified inquiry form with client-side validation
│
├── assets/
│   ├── images/
│   │   ├── logo/       # SVG brand marks (light & white variants)
│   │   ├── hero/       # High-resolution kitchen engineering photography
│   │   ├── products/   # 6 core product category visuals
│   │   ├── services/   # Infrastructure & manifold visuals
│   │   ├── industries/ # Sector photos (Hotels, Canteens, etc.)
│   │   ├── projects/   # Real on-site installation visuals
│   │   └── gallery/    # Full portfolio imagery
│   │
│   └── icons/
│
├── css/
│   └── style.css       # Master stylesheet, CSS variables, pipeline animation
│
├── js/
│   ├── main.js         # Header scroll, mobile menu, back-to-top, active links
│   ├── animation.js    # IntersectionObserver reveals, pipeline flow trigger
│   ├── gallery.js      # Masonry category filter & lightbox controller
│   ├── contact.js      # Form validation & submission state
│   └── config.js       # Centralized business phone, WhatsApp & email config
│
├── robots.txt          # Search engine crawl rules
├── sitemap.xml         # Search index sitemap
└── README.md           # Documentation guide
```
