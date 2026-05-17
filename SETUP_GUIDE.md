# MK Bakers - Quick Start Guide

## 🚀 Getting Started

### Installation
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Main Pages & Features

### 🏠 Home (`/`)
- **What**: Main dashboard showing business overview
- **Features**: 
  - Statistics cards (expenses, orders, pending, completed)
  - Recent orders and expenses preview
  - Service cards for quick navigation
  - Admin login button

### 🔐 Admin Login (`/admin-login`)
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Click &quot;Admin&quot; in navbar or visit the link

### 🎛️ Admin Panel (`/admin`)
**Only accessible after login**
- **Edit Prices**: Click &quot;Edit&quot; on any product to modify price
- **Edit Descriptions**: Change product descriptions inline
- **Add Products**: Click &quot;+ Add New Product&quot; button
  - Fill: Name, Category, Price, Description
  - Supports: Cakes, Cupcakes, Cookies, Pastries
- **Delete Products**: Click &quot;Delete&quot; to remove from catalogue
- **Logout**: Logout button in top right

### 📦 Orders (`/orders`)
- View all orders
- Add new orders with customer details
- Update order status (Pending → In Progress → Completed)
- Filter by status
- Track revenue

### 💰 Expenses (`/expenses`)
- Log all expenses
- Categorize (Ingredients, Supplies, Equipment, Utilities, Other)
- Filter by category
- View totals

### 📊 Inventory (`/inventory`)
- Track ingredient stock levels
- Set reorder levels
- Get low-stock alerts
- Update quantities

### 📝 Recipes (`/recipes`)
- Store recipes with ingredients and instructions
- Track prep time and servings
- Search recipes easily

### 👥 Customers (`/customers`)
- Maintain customer database
- Store contact information
- Track order history

### 📈 Reports (`/reports`)
- View revenue analytics
- Profit calculations
- Monthly trends
- Expense breakdown
- Key metrics

---

## 🎨 Color Scheme

| Component | Color | Usage |
|-----------|-------|-------|
| Primary Nav | Amber → Orange → Red | Navbar, headers |
| Orders | Orange | Order-related features |
| Expenses | Red | Expense tracking |
| Inventory | Yellow | Stock management |
| Recipes | Purple | Recipe storage |
| Customers | Pink | Customer management |
| Reports | Blue | Analytics |

---

## 🔑 Admin Features

### Edit Product Price
1. Go to Admin Panel (`/admin`)
2. Find product in table
3. Click &quot;Edit&quot; button
4. Modify price and description
5. Click &quot;Save&quot;

### Add New Product
1. Click &quot;+ Add New Product&quot; button
2. Fill in product details:
   - Product Name
   - Category (dropdown)
   - Price (₹)
   - Description
3. Click &quot;Add Product&quot;
4. New product appears in table

### Delete Product
1. Find product in table
2. Click &quot;Delete&quot; button
3. Product is removed immediately

---

## 💡 Pro Tips

- **Prices in INR**: All prices are displayed in Indian Rupees (₹)
- **Real-time Updates**: All changes update immediately
- **Responsive Design**: Works on mobile, tablet, and desktop
- **No Data Loss**: Refresh page to see current state (for demo)
- **Color Coding**: Status badges use consistent color scheme

---

## 🔒 Security Notes

**Demo Credentials** (Change in production):
- Username: `admin`
- Password: `admin123`

**For Production**:
- Implement backend authentication
- Use secure password hashing
- Add role-based access control
- Enable HTTPS only
- Implement session management

---

## 📦 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com
# 3. Connect GitHub repository
# 4. Click Deploy
# 5. Your app is live!
```

---

## 🐛 Troubleshooting

### Login not working?
- Check credentials: `admin` / `admin123`
- Clear browser cookies
- Try incognito mode

### Images not loading?
- Ensure images are in `/public/images/` folder
- Check file permissions
- Verify file format (JPEG, PNG, WebP supported)

### Data not persisting?
- Currently using local state (browser memory)
- Refresh page will reset data
- Add database for persistence

---

## 📚 Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Authentication**: React Context API
- **UI Components**: Custom React components

---

## 🎯 Next Steps

1. ✅ Test all features on homepage
2. ✅ Login to admin panel (credentials: admin/admin123)
3. ✅ Try adding, editing, deleting products
4. ✅ Navigate through all pages
5. ✅ Test on mobile devices
6. ✅ Prepare for Vercel deployment

---

## 📞 Support

For issues or questions:
- Check the FEATURES.md file for detailed information
- Review this Quick Start Guide
- Check browser console for errors
- Ensure all dependencies are installed

---

**Application Version**: 2.0 🎂
**Ready for Production**: Yes ✅
**Last Updated**: May 2024