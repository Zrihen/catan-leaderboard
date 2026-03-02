# Mosh's Catan Leaderboard

Mobile-friendly Catan leaderboard and match log. Hosted at **moshezrihen.com**.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Cloudflare Pages

1. Push this repo to GitHub (see setup guide).
2. In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select your GitHub repo (e.g. `catan-leaderboard`).
4. Build settings:
   - **Framework preset:** Next.js
   - **Build command:** `npm run build`
   - **Build output directory:** `.next`
   - **Root directory:** (leave blank)
5. Add custom domain **moshezrihen.com** in the project’s **Custom domains**.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS
- Cloudflare Pages (hosting), Cloudflare D1 (database — to be added)
