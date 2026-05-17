'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { DEFAULT_PRODUCTS, DEFAULT_TESTIMONIALS, DEFAULT_PRODUCT_IMAGES } from '@/lib/defaultData'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface Testimonial {
  id: number
  name: string
  text: string
  rating: number
}

const STORAGE_PRODUCTS_KEY = 'mkbaking_products'
const STORAGE_TESTIMONIALS_KEY = 'mkbaking_testimonials'

export default function AdminPanel() {
  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Cakes',
    image: DEFAULT_PRODUCT_IMAGES[0],
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTestimonialId, setEditingTestimonialId] = useState<number | null>(null)
  const [editTestimonial, setEditTestimonial] = useState<Testimonial | null>(null)
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    text: '',
    rating: 5,
  })

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/admin-login')
    }
  }, [isLoggedIn, router])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedProducts = localStorage.getItem(STORAGE_PRODUCTS_KEY)
    const savedTestimonials = localStorage.getItem(STORAGE_TESTIMONIALS_KEY)

    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts))
      } catch {
        setProducts(DEFAULT_PRODUCTS)
      }
    }

    if (savedTestimonials) {
      try {
        setTestimonials(JSON.parse(savedTestimonials))
      } catch {
        setTestimonials(DEFAULT_TESTIMONIALS)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(products))
  }, [products])

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_TESTIMONIALS_KEY, JSON.stringify(testimonials))
  }, [testimonials])

  const handleEditProduct = (product: Product) => {
    setEditingId(product.id)
    setEditProduct({ ...product })
  }

  const handleSaveProduct = (id: number) => {
    if (!editProduct) return
    setProducts(products.map(p => p.id === id ? editProduct : p))
    setEditingId(null)
    setEditProduct(null)
  }

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.description) {
      const newProd: Product = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        image: `/images/cakes/${newProduct.image}`,
        category: newProduct.category,
      }
      setProducts([...products, newProd])
      setNewProduct({ name: '', description: '', price: '', category: 'Cakes', image: DEFAULT_PRODUCT_IMAGES[0] })
      setShowAddForm(false)
    }
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const handleAddTestimonial = () => {
    if (newTestimonial.name && newTestimonial.text) {
      const newItem: Testimonial = {
        id: Math.max(...testimonials.map(t => t.id), 0) + 1,
        ...newTestimonial,
      }
      setTestimonials([...testimonials, newItem])
      setNewTestimonial({ name: '', text: '', rating: 5 })
    }
  }

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonialId(testimonial.id)
    setEditTestimonial({ ...testimonial })
  }

  const handleSaveTestimonial = (id: number) => {
    if (!editTestimonial) return
    setTestimonials(testimonials.map(t => t.id === id ? editTestimonial : t))
    setEditingTestimonialId(null)
    setEditTestimonial(null)
  }

  const handleDeleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id))
  }

  const handleLogout = () => {
    logout()
    router.push('/admin-login')
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Update the customer catalogue and testimonials.</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded font-semibold"
          >
            Logout
          </button>
        </div>

        <section className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Catalogue Management</h2>
              <p className="text-gray-600 mt-1">Products shown to customers on the public homepage.</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold"
            >
              {showAddForm ? '✕ Cancel' : '+ Add New Product'}
            </button>
          </div>

          {showAddForm && (
            <div className="bg-white rounded-lg shadow p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2"
                />
                <select
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2"
                >
                  {DEFAULT_PRODUCT_IMAGES.map((filename) => (
                    <option key={filename} value={filename}>{filename}</option>
                  ))}
                </select>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2"
                >
                  <option value="Cakes">Cakes</option>
                  <option value="Cupcakes">Cupcakes</option>
                  <option value="Cookies">Cookies</option>
                  <option value="Pastries">Pastries</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <textarea
                placeholder="Product Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="border border-gray-300 rounded px-4 py-3 w-full h-28"
              />
              <button
                onClick={handleAddProduct}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold"
              >
                Save Product
              </button>
            </div>
          )}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-amber-600 to-orange-500 text-white">
                <tr>
                  <th className="p-4 text-left">Product</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-center">Price</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold">{product.name}</td>
                    <td className="p-4"><span className="bg-amber-100 text-amber-800 px-3 py-1 rounded text-sm">{product.category}</span></td>
                    <td className="p-4">
                      {editingId === product.id ? (
                        <textarea
                          value={editProduct?.description || ''}
                          onChange={(e) => setEditProduct(prev => prev ? { ...prev, description: e.target.value } : prev)}
                          className="border border-gray-300 rounded px-2 py-1 w-full h-24"
                        />
                      ) : (
                        product.description
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          value={editProduct?.price ?? product.price}
                          onChange={(e) => setEditProduct(prev => prev ? { ...prev, price: parseFloat(e.target.value) } : prev)}
                          className="border border-gray-300 rounded px-2 py-1 w-24 text-center"
                        />
                      ) : (
                        <span className="font-bold text-lg text-orange-600">₹{product.price}</span>
                      )}
                    </td>
                    <td className="p-4 text-center space-x-2">
                      {editingId === product.id ? (
                        <>
                          <button
                            onClick={() => handleSaveProduct(product.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null)
                              setEditProduct(null)
                            }}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Testimonials Management</h2>
              <p className="text-gray-600 mt-1">These testimonials appear at the bottom of the public homepage.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Customer Name"
                value={newTestimonial.name}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                className="border border-gray-300 rounded px-4 py-2"
              />
              <select
                value={newTestimonial.rating}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value, 10) })}
                className="border border-gray-300 rounded px-4 py-2"
              >
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>{rating} Stars</option>
                ))}
              </select>
              <button
                onClick={handleAddTestimonial}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
              >
                Add Testimonial
              </button>
            </div>
            <textarea
              placeholder="Testimonial Text"
              value={newTestimonial.text}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
              className="border border-gray-300 rounded px-4 py-3 w-full h-24"
            />
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Testimonial</th>
                  <th className="p-4 text-center">Rating</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold">{testimonial.name}</td>
                    <td className="p-4">
                      {editingTestimonialId === testimonial.id ? (
                        <textarea
                          value={editTestimonial?.text || ''}
                          onChange={(e) => setEditTestimonial(prev => prev ? { ...prev, text: e.target.value } : prev)}
                          className="border border-gray-300 rounded px-2 py-1 w-full h-24"
                        />
                      ) : (
                        testimonial.text
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {editingTestimonialId === testimonial.id ? (
                        <select
                          value={editTestimonial?.rating ?? testimonial.rating}
                          onChange={(e) => setEditTestimonial(prev => prev ? { ...prev, rating: parseInt(e.target.value, 10) } : prev)}
                          className="border border-gray-300 rounded px-2 py-1"
                        >
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <option key={rating} value={rating}>{rating}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-yellow-500">{Array.from({ length: testimonial.rating }).map((_, index) => (<span key={index}>★</span>))}</span>
                      )}
                    </td>
                    <td className="p-4 text-center space-x-2">
                      {editingTestimonialId === testimonial.id ? (
                        <>
                          <button
                            onClick={() => handleSaveTestimonial(testimonial.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingTestimonialId(null)
                              setEditTestimonial(null)
                            }}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditTestimonial(testimonial)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-8 bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
          <h3 className="font-bold text-blue-900 mb-2">📝 Note:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Catalog and testimonial changes are saved to browser local storage.</li>
            <li>• Public customers see the latest product catalogue and testimonials after refresh.</li>
            <li>• Product images are served from the public images folder.</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
