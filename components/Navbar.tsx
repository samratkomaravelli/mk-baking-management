'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">🎂 MK Bakers</Link>
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <ul className={`${isOpen ? 'block' : 'hidden'} md:flex gap-6`}>
          <li><Link href="/" className="hover:text-amber-100 transition">Home</Link></li>
          <li><Link href="/admin-login" className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition">Admin</Link></li>
        </ul>
      </div>
    </nav>
  )
}