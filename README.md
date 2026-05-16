# MK Baking Management System

A comprehensive web application for managing a home baking business built with Next.js, TypeScript, and Tailwind CSS. This application helps you manage orders, expenses, inventory, recipes, customers, and provides detailed analytics.

## Features

### 📊 Dashboard
- Real-time statistics and metrics
- Quick overview of revenue, expenses, and order status
- Recent orders and expenses at a glance

### 📦 Order Management
- Create and track customer orders
- Update order status (Pending, In Progress, Completed)
- Track order revenue and pricing
- Filter orders by status
- Delete orders

### 💰 Expense Management
- Record and categorize expenses (Ingredients, Supplies, Equipment, Utilities, Other)
- Track spending by category
- View expense totals
- Filter expenses by category
- Delete expense records

### 📦 Inventory Management
- Track ingredient stock levels
- Set reorder levels for automatic low-stock alerts
- Update quantities on the fly
- View inventory status (OK/Low Stock)
- Multiple units support (kg, liters, pieces, etc.)

### 📝 Recipe Management
- Store and organize recipes
- Include ingredients, instructions, servings, and prep time
- Easy-to-use recipe cards
- Quick access to all recipes

### 👥 Customer Management
- Maintain customer database
- Store contact information and addresses
- Track total orders per customer
- Manage customer relationships

### 📊 Reports & Analytics
- Total revenue and profit calculations
- Profit margin analysis
- Orders by month visualization
- Expenses by category breakdown
- Top products tracking
- Key metrics (Average Order Value, Completion Rate, Cost per Order)

## Tech Stack

- **Frontend**: React 18, Next.js 14, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState)
- **Deployment**: Vercel-ready

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Dashboard
│   ├── orders/page.tsx     # Order management
│   ├── expenses/page.tsx   # Expense management
│   ├── inventory/page.tsx  # Inventory management
│   ├── recipes/page.tsx    # Recipe management
│   ├── customers/page.tsx  # Customer management
│   ├── reports/page.tsx    # Reports & analytics
│   └── globals.css         # Global styles
├── components/
│   └── Navbar.tsx          # Navigation component
├── public/                 # Static assets
└── package.json            # Dependencies
```

## Deployment on Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Click "Deploy"
5. Your app will be live at a Vercel URL

No additional configuration needed - Vercel automatically detects Next.js projects!

## Features to Consider Adding

- Database integration (PostgreSQL, MongoDB, Firebase)
- User authentication and authorization
- Email notifications
- Export reports to PDF/Excel
- Multi-user support
- Search and advanced filtering
- Data backup and recovery
- Mobile app version

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

MIT License - feel free to use this project for your own home baking business!