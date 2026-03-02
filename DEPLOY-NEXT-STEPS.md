# Next steps: push to GitHub and deploy

The app is in `/Users/moshezrihen/catan-leaderboard`. Follow these steps.

---

## 1. Create a new repo on GitHub

1. Go to [github.com/new](https://github.com/new).
2. **Repository name:** `catan-leaderboard`.
3. **Private** or **Public** — your choice.
4. **Do not** check “Add a README”, “Add .gitignore”, or “Choose a license”.
5. Click **Create repository**.

---

## 2. Push the code from your Mac

Open **Terminal**, then run these commands **one at a time**. Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

```bash
cd /Users/moshezrihen/catan-leaderboard
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/catan-leaderboard.git
git branch -M main
git add .
git status
git commit -m "Initial commit: leaderboard shell and design system"
git push -u origin main
```

- When Git asks for credentials, sign in with your GitHub account (browser or password/token).
- If you use 2FA, you may need a **Personal Access Token** instead of your password: GitHub → Settings → Developer settings → Personal access tokens.

---

## 3. Connect Cloudflare Pages to GitHub

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Choose **GitHub** and authorize Cloudflare (one-time).
3. Select the **catan-leaderboard** repo.
4. **Build settings:**
   - **Framework preset:** Next.js
   - **Build command:** `npm run build`
   - **Build output directory:** `.next`
   - **Root directory:** leave blank
5. Click **Save and Deploy**. Wait for the first build to finish.

---

## 4. Add your domain

1. In your Pages project → **Custom domains** → **Set up a custom domain**.
2. Enter **moshezrihen.com** (and optionally **www.moshezrihen.com**).
3. Cloudflare will configure DNS. After a few minutes, the site will be live at **https://moshezrihen.com**.

---

**Note:** Next.js on Cloudflare Pages may require an adapter (e.g. OpenNext) for full server-side features. The current build is static; if the deploy fails or you need API routes later, we can add the adapter.
