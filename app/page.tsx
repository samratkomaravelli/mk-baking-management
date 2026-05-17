'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DEFAULT_PRODUCTS, DEFAULT_TESTIMONIALS } from '@/lib/defaultData'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
}

interface CartItem extends Product {
  quantity: number
}

interface Testimonial {
  id: number
  name: string
  text: string
  rating: number
}

const STORAGE_PRODUCTS_KEY = 'mkbaking_products'
const STORAGE_TESTIMONIALS_KEY = 'mkbaking_testimonials'

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedProducts = localStorage.getItem(STORAGE_PRODUCTS_KEY)
    const storedTestimonials = localStorage.getItem(STORAGE_TESTIMONIALS_KEY)

    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts))
      } catch {
        setProducts(DEFAULT_PRODUCTS)
      }
    }

    if (storedTestimonials) {
      try {
        setTestimonials(JSON.parse(storedTestimonials))
      } catch {
        setTestimonials(DEFAULT_TESTIMONIALS)
      }
    }
  }, [])

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ))
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    if (!customerName || !customerEmail || !customerPhone) {
      alert('Please fill in all details')
      return
    }
    if (cart.length === 0) {
      alert('Cart is empty')
      return
    }
    alert(`Order placed successfully!\n\nName: ${customerName}\nEmail: ${customerEmail}\nPhone: ${customerPhone}\nTotal: ₹${cartTotal}`)
    setCart([])
    setShowCheckout(false)
    setCustomerName('')
    setCustomerEmail('')
    setCustomerPhone('')
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to MK Bakers</h1>
          <p className="text-xl md:text-2xl mb-8">Handcrafted Cakes & Delicious Treats 🎂</p>
          <p className="text-lg">Fresh, Homemade, and Made with Love</p>
        </div>
      </div>

      {/* Cart Summary Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">MK Bakers</h2>
        <button
          onClick={() => setShowCart(!showCart)}
          className="relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2 rounded-lg font-bold transition flex items-center gap-2"
        >
          🛒 Cart ({cartCount})
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)}></div>
          <div className="relative ml-auto bg-white w-full max-w-md h-full overflow-y-auto shadow-lg flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>

            {cart.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p className="mb-4">Your cart is empty</p>
                <button
                  onClick={() => setShowCart(false)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 p-6 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">₹{item.price}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 border border-gray-300 rounded">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded"
                        >
                          +
                        </button>
                        <div className="ml-auto text-right">
                          <p className="font-bold text-gray-800">₹{(item.price * item.quantity).toFixed(0)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 p-6 space-y-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">₹{cartTotal.toFixed(0)}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowCart(false)
                      setShowCheckout(true)
                    }}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-lg font-bold transition"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Checkout</h2>
              <button onClick={() => setShowCheckout(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>

            <div className="p-6 space-y-4">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-bold mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-3 pt-3 font-bold flex justify-between">
                  <span>Total:</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">₹{cartTotal.toFixed(0)}</span>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-3">
                <h3 className="font-bold">Delivery Details</h3>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-lg font-bold transition mt-6"
              >
                Place Order
              </button>
              <button
                onClick={() => setShowCheckout(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-bold transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-2 text-gray-800">Our Delicious Collection</h2>
        <p className="text-gray-600 mb-12">Handcrafted with love. Freshly baked daily.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105">
              <div className="relative h-48 bg-gray-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                  <span className="bg-gradient-to-r from-amber-100 to-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-semibold">
                    {product.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">₹{product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-bold transition transform hover:scale-110"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-2 text-gray-800 text-center">What Our Customers Say</h2>
          <p className="text-gray-600 text-center mb-12">Real reviews from real customers</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">&quot;{testimonial.text}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Link */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">Are you an admin?</p>
          <Link href="/admin-login" className="inline-block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-lg font-bold transition transform hover:scale-105">
            Admin Login
          </Link>
        </div>
      </div>
    </main>
  )
}