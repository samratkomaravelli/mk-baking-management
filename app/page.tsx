'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Cake {
  id: number
  name: string
  description: string
  price: number
  image: string
  servings: string
}

export default function Home() {
  const [cakes] = useState<Cake[]>([
    {
      id: 1,
      name: 'Chocolate Delight',
      description: 'Rich, moist chocolate cake with creamy frosting',
      price: 35,
      image: '🍫',
      servings: '8-10 people'
    },
    {
      id: 2,
      name: 'Vanilla Dream',
      description: 'Classic vanilla cake with buttercream icing',
      price: 30,
      image: '🍰',
      servings: '6-8 people'
    },
    {
      id: 3,
      name: 'Strawberry Bliss',
      description: 'Fresh strawberry cake with whipped cream topping',
      price: 38,
      image: '🍓',
      servings: '8-10 people'
    },
    {
      id: 4,
      name: 'Carrot Cake',
      description: 'Spiced carrot cake with cream cheese frosting',
      price: 32,
      image: '🥕',
      servings: '8 people'
    },
    {
      id: 5,
      name: 'Red Velvet',
      description: 'Elegant red velvet cake with white chocolate frosting',
      price: 40,
      image: '❤️',
      servings: '10 people'
    },
    {
      id: 6,
      name: 'Lemon Zest',
      description: 'Tangy lemon cake with light glaze',
      price: 33,
      image: '🍋',
      servings: '8 people'
    },
  ])

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to MK Baking</h1>
          <p className="text-xl mb-8 opacity-90">Delicious homemade cakes baked with love and care</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Order Now
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Featured Cakes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Our Specialty Cakes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cakes.map((cake) => (
              <div key={cake.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-6xl">
                  {cake.image}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{cake.name}</h3>
                  <p className="text-gray-600 mb-4">{cake.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">Serves: {cake.servings}</span>
                    <span className="text-2xl font-bold text-purple-600">${cake.price}</span>
                  </div>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">About MK Baking</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Story</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                MK Baking was founded with a passion for creating delicious, freshly baked cakes. 
                Every cake is handmade with premium ingredients and baked fresh to order.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe in quality over quantity, and our customers can taste the difference in every bite.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span className="text-gray-600">Fresh ingredients & premium quality</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span className="text-gray-600">Custom designs available</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span className="text-gray-600">Fast & reliable delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span className="text-gray-600">Competitive pricing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Get In Touch</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-600 mb-6 text-lg">
              Have a special request? Want to place a bulk order? Contact us today!
            </p>
            <div className="space-y-2 mb-8">
              <p className="text-gray-700"><strong>📞 Phone:</strong> (555) 123-4567</p>
              <p className="text-gray-700"><strong>📧 Email:</strong> hello@mkbaking.com</p>
              <p className="text-gray-700"><strong>📍 Location:</strong> Your City, State</p>
            </div>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center flex-wrap gap-4">
          <p>&copy; 2024 MK Baking. All rights reserved.</p>
          <Link href="/admin" className="text-purple-300 hover:text-purple-200">
            Admin Portal
          </Link>
        </div>
      </footer>
    </main>
  )
}