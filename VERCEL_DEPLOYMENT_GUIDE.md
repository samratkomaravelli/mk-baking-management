# MK Baking Management - Vercel Deployment Guide

## Overview
Your Next.js baking management app has been updated with:
- **Public Front Page**: Showcase with 6 cake samples, about section, and contact info
- **Admin Dashboard**: Complete management system for orders, expenses, inventory, recipes, customers, and reports

## Step-by-Step Deployment Instructions

### Step 1: Prepare Your Local Repository

1. Open Terminal in your project directory:
```bash
cd "/Users/samratkomaravelli/Desktop/Automation Projects/Teju's projects/MK Baking Management"
```

2. Initialize git (if not already done):
```bash
git init
```

3. Add all files to git:
```bash
git add .
```

4. Create your first commit:
```bash
git commit -m "Initial commit: MK Baking app with public and admin sections"
```

### Step 2: Push to GitHub

1. Create a new repository on GitHub:
   - Go to [github.com/new](https://github.com/new)
   - Name it: `mk-baking-management`
   - Click "Create repository"

2. Connect your local repo to GitHub (replace `YOUR_USERNAME` with your GitHub username):
```bash
git remote add origin https://github.com/YOUR_USERNAME/mk-baking-management.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI globally (if not already installed):
```bash
npm i -g vercel
```

2. Deploy from your project directory:
```bash
vercel
```

3. Answer the prompts:
   - Link to an existing project? → **No**
   - Set up and deploy? → **Yes**
   - Which scope? → Select your account
   - Project name → `mk-baking-management`
   - Framework → **Next.js**
   - Root directory → **./** (default)
   - Build command → Leave default
   - Output directory → Leave default
   - Development settings → Accept defaults

4. Your app will deploy! You'll get a production URL like: `https://mk-baking-management.vercel.app`

#### Option B: Using Vercel Web Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub account
3. Click "New Project"
4. Import your `mk-baking-management` repository from GitHub
5. Configure project settings:
   - Framework: **Next.js**
   - Root Directory: **./** 
   - Build Command: (leave default)
6. Click "Deploy"

### Step 4: After Deployment

Your app will be live at: `https://your-project-name.vercel.app`

**Public Front Page**: `https://your-project-name.vercel.app/`
- Displays 6 cake samples with prices
- About section
- Contact information
- Link to admin portal

**Admin Dashboard**: `https://your-project-name.vercel.app/admin`
- Dashboard with key metrics
- Orders management
- Expenses tracking
- Inventory management
- Recipe storage
- Customer database
- Reports & analytics

### Step 5: Custom Domain (Optional)

To use your own domain:

1. In Vercel Dashboard, go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records with your domain provider
4. Vercel will provide instructions for your specific registrar

### Step 6: Environment Variables (Future Use)

When you add database or API functionality:

1. In Vercel Dashboard → Project Settings → Environment Variables
2. Add your secrets:
   - Database URLs
   - API keys
   - Secret tokens

## Project Structure

```
app/
├── page.tsx              # Public home page with cake showcase
├── layout.tsx            # Public layout with PublicNavbar
├── admin/
│   ├── page.tsx          # Admin dashboard
│   ├── layout.tsx        # Admin layout with AdminNavbar
│   ├── orders/page.tsx   # Orders management
│   ├── expenses/page.tsx # Expenses tracking
│   ├── inventory/page.tsx # Inventory management
│   ├── recipes/page.tsx   # Recipe storage
│   ├── customers/page.tsx # Customer management
│   └── reports/page.tsx   # Analytics & reports
├── globals.css           # Global styles
components/
├── PublicNavbar.tsx      # Navigation for public pages
└── AdminNavbar.tsx       # Navigation for admin pages
public/                   # Static assets
```

## Features

### Public Section
- Beautiful landing page
- 6 featured cakes with prices
- About company section
- Contact information
- "Add to Cart" buttons (ready for e-commerce)

### Admin Section
- **Dashboard**: Overview of all key metrics
- **Orders**: Create, track, and manage orders with status updates
- **Expenses**: Log and categorize business expenses
- **Inventory**: Track ingredients with low-stock alerts
- **Recipes**: Store and manage baking recipes
- **Customers**: Maintain customer database with contact info
- **Reports**: View analytics, revenue, profit margins, and trends

## Troubleshooting

### Build Fails
- Check Node version: `node --version` (should be 16+)
- Clear cache: `npm run build`
- Check for TypeScript errors: `npm run lint`

### App Not Updating After Push
- Vercel auto-deploys on push to main branch
- Check deployment status in Vercel dashboard
- Force rebuild: Vercel Dashboard → Project → Deployments → Redeploy

### 404 Errors on Admin Routes
- Ensure your routes are under `/app/admin/` directory
- Check folder naming (no spaces or special characters)
- Restart dev server: `npm run dev`

## Next Steps

1. **Database Integration**: Connect MongoDB, Supabase, or Firebase for persistent data
2. **Authentication**: Add user login/registration system
3. **Payment Processing**: Integrate Stripe for online orders
4. **Email Notifications**: Add nodemailer or SendGrid for order updates
5. **Image Gallery**: Add photo gallery for cakes
6. **Advanced Analytics**: Integrate chart libraries like Chart.js

## Development Commands

```bash
# Run locally
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for linting issues
npm run lint
```

## Support

For issues with Vercel deployment, visit: https://vercel.com/docs

---

**Your app is ready for production!** 🎂🚀
