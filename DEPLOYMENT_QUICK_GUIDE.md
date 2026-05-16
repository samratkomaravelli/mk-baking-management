# VERCEL DEPLOYMENT - STEP BY STEP

## Total Time: ~5-10 minutes

### Step 1: Set Up Git (2 minutes)

Open Terminal and navigate to your project:

```bash
cd "/Users/samratkomaravelli/Desktop/Automation Projects/Teju's projects/MK Baking Management"
```

Initialize git:

```bash
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

Commit all files:

```bash
git add .
git commit -m "MK Baking app - initial commit with public and admin sections"
```

---

### Step 2: Create GitHub Repository (2 minutes)

1. Go to [github.com/new](https://github.com/new)
2. Fill in repository name: `mk-baking-management`
3. Leave description blank or add: "Baking management app with public storefront and admin dashboard"
4. Select **Public** or **Private** (your choice)
5. Click **Create repository**

---

### Step 3: Push Code to GitHub (2 minutes)

Copy the commands shown on GitHub (they look like this):

```bash
git remote add origin https://github.com/YOUR_USERNAME/mk-baking-management.git
git branch -M main
git push -u origin main
```

Paste all three lines into your Terminal and press Enter.

It will ask for your password - use a GitHub Personal Access Token (or your password if using HTTPS).

✅ Your code is now on GitHub!

---

### Step 4: Deploy to Vercel (2-3 minutes)

#### Option A: Using Vercel Web (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** → Choose **GitHub**
3. Authorize Vercel to access your GitHub
4. After login, click **New Project**
5. You'll see your GitHub repositories - click **Import** next to `mk-baking-management`
6. Click **Deploy**

**That's it!** Vercel will automatically detect it's a Next.js project and deploy it.

#### Option B: Using Vercel CLI

In Terminal:

```bash
npm i -g vercel
vercel
```

Follow the prompts (mostly just press Enter to accept defaults).

---

### Step 5: Your App is Live! 🎉

Vercel will show you a URL like:
```
https://mk-baking-management.vercel.app
```

**Test it:**
- Home page: `https://mk-baking-management.vercel.app/`
- Admin: `https://mk-baking-management.vercel.app/admin`

---

## WHAT YOU'LL SEE

### Home Page (`/`)
- Gradient purple-to-pink header
- "Welcome to MK Baking" title
- 6 cake cards with prices
- About section
- Contact section
- Footer with "Admin Portal" link

### Admin Dashboard (`/admin`)
- 4 stat boxes (Total Expenses, Total Orders, Pending, Completed)
- Recent orders table
- Recent expenses list
- 6 quick-access buttons to manage different sections

---

## CUSTOM DOMAIN (OPTIONAL)

To use your own domain instead of vercel.app:

1. Buy a domain from GoDaddy, Namecheap, etc.
2. In Vercel Dashboard:
   - Go to your project
   - Settings → Domains
   - Enter your custom domain
   - Follow DNS configuration instructions

---

## MAKING UPDATES

After initial deployment:

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Vercel automatically redeploys (takes ~1-2 minutes)
4. Your changes go live!

---

## TROUBLESHOOTING

### Deployment Failed?
- Check Vercel Dashboard → Deployments → Latest deployment
- Look for error messages
- Common fixes:
  - Clear npm cache: `npm cache clean --force`
  - Delete node_modules: `rm -rf node_modules`
  - Reinstall: `npm install`

### Routes Not Working?
- Make sure file structure is correct:
  - `app/page.tsx` → `/`
  - `app/admin/page.tsx` → `/admin`
  - `app/admin/orders/page.tsx` → `/admin/orders`

### Old Routes Still Work?
- You have old routes at `/orders`, `/expenses`, etc.
- These still work but point to old pages
- Consider deleting them to clean up

---

## NEXT STEPS

Once deployed and working:

1. **Add a Database**
   - MongoDB Atlas (free tier)
   - Firebase
   - Supabase
   - PlanetScale (MySQL)

2. **Add Authentication**
   - NextAuth.js
   - Auth0
   - Clerk

3. **Add Email**
   - SendGrid
   - Mailgun
   - Nodemailer

4. **Add Payment**
   - Stripe
   - PayPal

---

## QUICK REFERENCE

| Step | Action | Time |
|------|--------|------|
| 1 | Initialize git | 1 min |
| 2 | Create GitHub repo | 2 min |
| 3 | Push code to GitHub | 2 min |
| 4 | Connect to Vercel | 2 min |
| 5 | Vercel deploys | 2-5 min |
| **TOTAL** | | **~10 min** |

---

## URLS AFTER DEPLOYMENT

Replace `mk-baking-management` with your actual project name:

```
🎂 Public:
https://mk-baking-management.vercel.app/

👨‍💼 Admin:
https://mk-baking-management.vercel.app/admin
```

---

**You've got this!** 🚀 The app is ready to launch.
