'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">🎂 MK Baking</Link>
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <ul className={`${isOpen ? 'block' : 'hidden'} md:flex gap-6`}>
          <li><Link href="/" className="hover:underline">Dashboard</Link></li>
          <li><Link href="/orders" className="hover:underline">Orders</Link></li>
          <li><Link href="/expenses" className="hover:underline">Expenses</Link></li>
          <li><Link href="/inventory" className="hover:underline">Inventory</Link></li>
          <li><Link href="/recipes" className="hover:underline">Recipes</Link></li>
          <li><Link href="/customers" className="hover:underline">Customers</Link></li>
        </ul>
      </div>
    </nav>
  )
}