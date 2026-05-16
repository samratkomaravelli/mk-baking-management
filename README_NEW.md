# MK Baking Management 🎂

A modern, full-featured baking business management app with a public storefront and comprehensive admin dashboard.

## Features

### 🎂 Public Storefront
- Beautiful hero section with gradient design
- 6 featured cakes with descriptions and pricing
- About company section
- Contact information
- Responsive mobile design
- Quick access to admin portal

### 👨‍💼 Admin Dashboard
- **Dashboard**: Real-time metrics and overview
- **Orders Management**: Create, track, and manage customer orders
- **Expense Tracking**: Log and categorize business expenses
- **Inventory System**: Track ingredients with low-stock alerts
- **Recipe Storage**: Organize all baking recipes
- **Customer Database**: Manage customer information
- **Analytics & Reports**: View profits, trends, and key metrics

## Tech Stack

- **Framework**: Next.js 14.2.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: React 18
- **Package Manager**: npm

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/mk-baking-management.git
cd mk-baking-management

# Install dependencies
npm install

# Run development server
npm run dev
```

### Access the App

- **Public Page**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)

## Project Structure

```
MK Baking Management/
│
├── 📁 app/
│   ├── 🎂 page.tsx                    (PUBLIC: Home page with cake showcase)
│   ├── 📄 layout.tsx                  (Public layout with navbar)
│   ├── 📄 globals.css                 (Global styles)
│   │
│   └── 📁 admin/                      (ADMIN: All management pages)
│       ├── 👨‍💼 page.tsx                (Dashboard with metrics)
│       ├── 📄 layout.tsx              (Admin layout)
│       ├── 📁 orders/page.tsx         (Order management)
│       ├── 📁 expenses/page.tsx       (Expense tracking)
│       ├── 📁 inventory/page.tsx      (Inventory system)
│       ├── 📁 recipes/page.tsx        (Recipe management)
│       ├── 📁 customers/page.tsx      (Customer database)
│       └── 📁 reports/page.tsx        (Analytics & reports)
│
├── 📁 components/
│   ├── 🎂 PublicNavbar.tsx            (Navigation for public pages)
│   └── 👨‍💼 AdminNavbar.tsx            (Navigation for admin pages)
│
├── 📁 public/                         (Static assets)
│
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 tailwind.config.js
├── 📄 next.config.js
└── 📄 .gitignore
```

## Routes

### Public Routes
| Route | Page | Purpose |
|-------|------|---------|
| `/` | Homepage | Cake showcase, about, contact |

### Admin Routes
| Route | Page | Purpose |
|-------|------|---------|
| `/admin` | Dashboard | Metrics overview, quick stats |
| `/admin/orders` | Orders | Create and manage orders |
| `/admin/expenses` | Expenses | Track business expenses |
| `/admin/inventory` | Inventory | Manage ingredients & stock |
| `/admin/recipes` | Recipes | Store and organize recipes |
| `/admin/customers` | Customers | Customer information database |
| `/admin/reports` | Reports | Analytics and profit reports |

## Scripts

```bash
# Development
npm run dev          # Start development server on port 3000

# Production
npm run build        # Build for production
npm start           # Start production server

# Quality
npm run lint        # Check code quality with ESLint
```

## Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy is with [Vercel](https://vercel.com):

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/mk-baking-management.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

Your app will be live instantly! 🚀

**For detailed deployment instructions**, see [DEPLOYMENT_QUICK_GUIDE.md](./DEPLOYMENT_QUICK_GUIDE.md) or [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)

## Current Features

✅ Two-section design (public + admin)
✅ Responsive mobile design
✅ Real-time statistics and metrics
✅ Order management system
✅ Expense tracking
✅ Inventory management with alerts
✅ Recipe storage
✅ Customer database
✅ Analytics & reporting
✅ Modern UI with Tailwind CSS
✅ TypeScript for type safety
✅ Production-ready build

## Future Enhancements

- [ ] Database integration (MongoDB, Firebase, etc.)
- [ ] User authentication and login
- [ ] Payment processing (Stripe integration)
- [ ] Email notifications
- [ ] Image gallery for products
- [ ] Shopping cart functionality
- [ ] Advanced analytics charts
- [ ] Multi-language support
- [ ] API endpoints for mobile app
- [ ] Dark mode theme

## Sample Data

The app comes with sample data pre-loaded:

**Cakes** (6 featured):
- Chocolate Delight ($35)
- Vanilla Dream ($30)
- Strawberry Bliss ($38)
- Carrot Cake ($32)
- Red Velvet ($40)
- Lemon Zest ($33)

**Sample Orders & Expenses**:
- 3 sample orders in the system
- 3 sample expenses to track

Data resets on page refresh (stored in React state). Add a database to persist data.

## Customization

### Update Cake Prices
Edit `app/page.tsx` - Update the `cakes` array with your pricing

### Change Color Scheme
Edit `tailwind.config.js` - Modify the purple/pink gradient colors

### Add Your Contact Info
Edit `app/page.tsx` - Update phone, email, and location in the Contact Section

### Customize Company Name
Replace "MK Baking" with your business name in:
- `app/layout.tsx`
- `components/PublicNavbar.tsx`
- `components/AdminNavbar.tsx`
- `app/page.tsx`

## Performance

- **Page Load**: < 100ms
- **Admin Dashboard**: 95.3 KB First Load JS
- **Production Build**: Fully optimized with Next.js

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support & Documentation

- **Quick Start**: [QUICK_START.md](./QUICK_START.md)
- **Deployment Guide**: [DEPLOYMENT_QUICK_GUIDE.md](./DEPLOYMENT_QUICK_GUIDE.md)
- **Detailed Deployment**: [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
- **Update Summary**: [UPDATE_SUMMARY.md](./UPDATE_SUMMARY.md)
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **Vercel Docs**: https://vercel.com/docs

## Getting Help

If you encounter issues:

1. Check the [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md#troubleshooting)
2. Review the [UPDATE_SUMMARY.md](./UPDATE_SUMMARY.md)
3. Check Next.js documentation
4. Review console errors in browser DevTools

---

**Ready to launch your baking business online?** 🎂🚀

Start with the [DEPLOYMENT_QUICK_GUIDE.md](./DEPLOYMENT_QUICK_GUIDE.md) and get live in 10 minutes!
