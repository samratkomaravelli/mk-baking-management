'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-1234', address: '123 Main St', totalOrders: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', address: '456 Oak Ave', totalOrders: 3 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '555-9012', address: '789 Pine Rd', totalOrders: 2 },
  ])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const { isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/admin-login')
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  const addCustomer = () => {
    if (name && email && phone && address) {
      const newCustomer: Customer = {
        id: Math.max(...customers.map(c => c.id), 0) + 1,
        name,
        email,
        phone,
        address,
        totalOrders: 0,
      }
      setCustomers([...customers, newCustomer])
      setName('')
      setEmail('')
      setPhone('')
      setAddress('')
    }
  }

  const deleteCustomer = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id))
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Customer Management</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Customer</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <button
              onClick={addCustomer}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded font-semibold"
            >
              Add Customer
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Customers List</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Address</th>
                  <th className="p-3 text-center">Total Orders</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-semibold">{customer.name}</td>
                    <td className="p-3">{customer.email}</td>
                    <td className="p-3">{customer.phone}</td>
                    <td className="p-3">{customer.address}</td>
                    <td className="p-3 text-center"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{customer.totalOrders}</span></td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => deleteCustomer(customer.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 border-t pt-4">
            <p className="text-lg font-bold">Total Customers: {customers.length}</p>
          </div>
        </div>
      </div>
    </main>
  )
}