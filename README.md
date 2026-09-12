# BestPicks — Affiliate Marketing Website (MERN Stack)

A full-featured, responsive affiliate marketing website: browse and compare products,
click through to your real affiliate links, and manage everything from a built-in
admin dashboard with click analytics.

**Stack:** MongoDB, Express, React (Vite), Node.js — plus Tailwind CSS on the frontend.

---

## What's included

- **Public site:** homepage (categories, featured/trending/deals), search & category
  filtering, individual SEO-friendly product pages (`/product/your-product-slug`),
  Affiliate Disclosure, Privacy Policy, Terms, and Contact pages.
- **"View Deal" / "Buy Now" buttons:** log a click to the database, then open your
  real affiliate URL in a new tab. There is **no checkout system** — the site never
  processes payments.
- **Admin dashboard** at `/admin`: add/edit/delete products and categories, paste in
  your real affiliate links, toggle Featured/Trending/Deal, and view click analytics
  (totals, a 14-day chart, device breakdown, top products, and a raw click log).
- **Sample data:** 8 demo products across 5 categories with placeholder Amazon-style
  affiliate links (`?tag=your-affiliate-id-20`) so the site works immediately. Replace
  them with your real links via the admin dashboard, or edit `backend/seed/seedData.js`
  and re-run the seed script.

---

## Project structure

```
affiliate-website/
├── backend/            Express API + MongoDB models
│   ├── config/         DB connection
│   ├── controllers/     Route handlers
│   ├── middleware/      Auth (JWT) + error handling
│   ├── models/          Product, Category, Click, Admin
│   ├── routes/
│   ├── seed/            Sample data + admin account creator
│   └── server.js
└── frontend/            React (Vite) + Tailwind CSS
    └── src/
        ├── components/  Navbar, Footer, ProductCard, etc.
        ├── context/      Admin auth context
        ├── pages/        Public pages
        ├── pages/admin/  Admin dashboard pages
        └── services/api.js   Axios client for the backend API
```

---

## 1. Prerequisites

- Node.js 18+ and npm
- MongoDB running locally (`mongodb://127.0.0.1:27017`) **or** a free
  [MongoDB Atlas](https://www.mongodb.com/atlas) cluster connection string

## 2. Backend setup

```bash
cd backend
cp .env.example .env      # then edit .env with your own values
npm install
npm run seed               # creates sample categories/products + your admin login
npm run dev                 # starts the API on http://localhost:5000
```

Edit `.env` before seeding:

```
MONGO_URI=mongodb://127.0.0.1:27017/affiliate_website
PORT=5000
JWT_SECRET=some-long-random-string
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=choose-a-strong-password
CLIENT_URL=http://localhost:5173
```

`ADMIN_EMAIL` / `ADMIN_PASSWORD` become your login for `/admin` the first time you run
`npm run seed`. Change the password afterwards by re-running seed against a fresh
database, or by adding a "change password" endpoint yourself.

## 3. Frontend setup

In a second terminal:

```bash
cd frontend
cp .env.example .env       # points the frontend at your backend API
npm install
npm run dev                 # starts the site on http://localhost:5173
```

Visit **http://localhost:5173** for the public site and **http://localhost:5173/admin**
for the admin dashboard.

## 4. Replacing the demo affiliate links with your real ones

Every seeded product ships with a placeholder link like:

```
https://www.amazon.com/dp/DEMO-HEADPHONES-001?tag=your-affiliate-id-20
```

To use your real links:

1. Log in to `/admin`.
2. Go to **Products**, click **Edit** on a product.
3. Paste your real tracked affiliate URL into the **Affiliate URL** field and save.
4. Repeat for each product, or add brand-new products with **+ Add product**.

You can also bulk-edit the sample data directly in `backend/seed/seedData.js` and
re-run `npm run seed` (note: this wipes and re-creates all products/categories).

## 5. Deployment notes

- **Backend:** deploy to any Node host (Render, Railway, Fly.io, a VPS, etc.). Set the
  same environment variables as your local `.env`, pointing `MONGO_URI` at your
  production database and `CLIENT_URL` at your deployed frontend's domain.
- **Frontend:** run `npm run build` inside `frontend/` to produce a static `dist/`
  folder, deployable to Vercel, Netlify, Cloudflare Pages, or any static host. Set
  `VITE_API_URL` to your deployed backend's URL before building.
- **Images:** the seed data uses hotlinked Unsplash URLs for demo purposes only. For
  production, upload real product photos to your own storage (S3, Cloudinary, etc.)
  and paste those URLs into the product form's image fields.
- **SEO:** each product/category page sets its own `<title>` and meta description via
  `react-helmet-async`, and URLs are slug-based (e.g. `/product/aero-noise-cancelling-wireless-headphones`).
  For best crawlability in production, consider pre-rendering or server-side rendering
  (e.g. migrating to Next.js) since this is a client-rendered SPA by default.

## 6. Security notes before going live

- Change `JWT_SECRET` and the admin password from their defaults.
- Put the backend behind HTTPS in production.
- The `.env` files are already git-ignored — never commit real credentials or API keys.
