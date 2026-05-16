'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/admin" className="text-2xl font-bold">🎂 MK Admin</Link>
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <ul className={`${isOpen ? 'block' : 'hidden'} md:flex gap-6 absolute md:relative top-16 md:top-0 left-0 md:left-auto right-0 md:right-auto bg-purple-700 md:bg-transparent p-4 md:p-0 w-full md:w-auto`}>
          <li><Link href="/admin" className="hover:opacity-90 block md:inline">Dashboard</Link></li>
          <li><Link href="/admin/orders" className="hover:opacity-90 block md:inline">Orders</Link></li>
          <li><Link href="/admin/expenses" className="hover:opacity-90 block md:inline">Expenses</Link></li>
          <li><Link href="/admin/inventory" className="hover:opacity-90 block md:inline">Inventory</Link></li>
          <li><Link href="/admin/recipes" className="hover:opacity-90 block md:inline">Recipes</Link></li>
          <li><Link href="/admin/customers" className="hover:opacity-90 block md:inline">Customers</Link></li>
          <li><Link href="/" className="hover:opacity-90 block md:inline">← Back to Shop</Link></li>
        </ul>
      </div>
    </nav>
  )
}
