#!/bin/bash

cd "/Users/samratkomaravelli/Desktop/Automation Projects/Teju's projects/MK Baking Management"

# Initialize git if not already done
if [ ! -d .git ]; then
  echo "Initializing git repository..."
  git init
fi

# Configure git
git config user.name "Samrat Komaravelli"
git config user.email "samrat@example.com"

# Add all files
echo "Adding files to git..."
git add .

# Commit
echo "Creating initial commit..."
git commit -m "MK Baking Management - Public storefront with admin dashboard

- Added public homepage with 6 featured cakes
- Added admin dashboard with management system
- Orders, expenses, inventory, recipes, customers, reports pages
- Complete documentation and deployment guides"

# Check status
echo ""
echo "Git status:"
git status

echo ""
echo "✅ Ready to push! Run these commands:"
echo ""
echo "git remote add origin https://github.com/samratkomaravelli/mk-baking-management.git"
echo "git branch -M main"
echo "git push -u origin main"
