# 📋 Copy & Paste Deployment Commands

**Save this file and come back when you're ready to deploy!**

---

## Complete Deployment (Copy & Paste Everything Below)

### Step 1: Navigate to Project (Copy & Paste)
```bash
cd "/Users/samratkomaravelli/Desktop/Automation Projects/Teju's projects/MK Baking Management"
```

### Step 2: Initialize Git (Copy & Paste)
```bash
git init
git config user.name "Your Full Name"
git config user.email "your.email@example.com"
git add .
git commit -m "MK Baking Management - Public storefront and admin dashboard"
```

### Step 3: Create GitHub Repository

**Go to:** https://github.com/new

**Fill in:**
- Repository name: `mk-baking-management`
- Description: "Baking management app with public storefront and admin dashboard"
- Choose: **Public** (anyone can see) or **Private** (only you)
- Click: **Create repository**

### Step 4: Connect to GitHub (Copy & Paste)

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/mk-baking-management.git
git branch -M main
git push -u origin main
```

**It will ask for:** GitHub password (use your Personal Access Token if you have one enabled)

### Step 5: Deploy to Vercel

**Option A: Using Web Dashboard (Easier)**

1. Go to: https://vercel.com
2. Click: **Sign Up** → Select **Continue with GitHub**
3. Click: **Authorize Vercel**
4. Click: **New Project**
5. Find and click: **Import** next to `mk-baking-management`
6. Click: **Deploy**

✅ **Done!** Your app is live

**Option B: Using Vercel CLI**

```bash
npm i -g vercel
vercel
```

Follow the prompts (mostly just press Enter)

---

## After Deployment

Your app will be at:
```
https://mk-baking-management.vercel.app
```

### Test Your App:
- Public page: `https://mk-baking-management.vercel.app/`
- Admin page: `https://mk-baking-management.vercel.app/admin`

---

## Making Changes Later

Whenever you make changes and want to update:

```bash
cd "/Users/samratkomaravelli/Desktop/Automation Projects/Teju's projects/MK Baking Management"
git add .
git commit -m "Your update description"
git push
```

Vercel will automatically redeploy within 2 minutes!

---

## Troubleshooting Commands

### If deployment fails:
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install

# Try building locally
npm run build

# Check for errors
npm run lint
```

---

## Local Development (When You Don't Want to Deploy)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit:
# http://localhost:3000 (public)
# http://localhost:3000/admin (admin)
```

---

## Custom Domain (Optional - Add Later)

Once deployed and working:

1. Buy domain from: GoDaddy, Namecheap, Google Domains, etc.
2. Go to Vercel Dashboard
3. Click your project name
4. Go to: **Settings** → **Domains**
5. Add your domain
6. Follow DNS configuration steps

---

## Environment Variables (For Future Use)

If you add database/APIs later, in Vercel Dashboard:

1. Go to: **Settings** → **Environment Variables**
2. Add: 
   - `DATABASE_URL=your_database_url`
   - `API_KEY=your_api_key`
   - etc.

---

## Quick Reference

| Action | Command |
|--------|---------|
| Navigate to project | `cd "/Users/samratkomaravelli/Desktop/Automation Projects/Teju's projects/MK Baking Management"` |
| Check git status | `git status` |
| See commit history | `git log --oneline` |
| Push changes | `git push` |
| Pull latest | `git pull` |
| View deployment logs | Go to Vercel Dashboard → Deployments |

---

## Key URLs

| Purpose | URL |
|---------|-----|
| GitHub | https://github.com/YOUR_USERNAME/mk-baking-management |
| Vercel Dashboard | https://vercel.com/dashboard |
| Your App | https://mk-baking-management.vercel.app |
| App Public Page | https://mk-baking-management.vercel.app/ |
| App Admin | https://mk-baking-management.vercel.app/admin |

---

## Checklist

- [ ] **Step 1**: Navigated to project folder
- [ ] **Step 2**: Initialized git and made first commit
- [ ] **Step 3**: Created GitHub repository
- [ ] **Step 4**: Pushed code to GitHub
- [ ] **Step 5**: Deployed to Vercel
- [ ] **Test**: Visited app URL and saw public page
- [ ] **Test**: Visited admin page and saw dashboard
- [ ] **Done**: Share app URL with users! 🎉

---

## TOTAL TIME: 10-15 Minutes ⏱️

From starting this document to having a live app!

---

**Save this file for reference when you deploy!**

Need more details? See:
- `DEPLOYMENT_QUICK_GUIDE.md` - Step-by-step guide
- `VERCEL_DEPLOYMENT_GUIDE.md` - Detailed guide with troubleshooting
- `INDEX.md` - All documentation index
