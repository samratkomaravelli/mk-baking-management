'use client'

import Link from 'next/link'

export default function PublicNavbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:opacity-90">
          🎂 MK Baking
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/" className="hover:opacity-90">Home</Link>
          <Link href="/#about" className="hover:opacity-90">About</Link>
          <Link href="/#contact" className="hover:opacity-90">Contact</Link>
          <Link href="/admin" className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}
