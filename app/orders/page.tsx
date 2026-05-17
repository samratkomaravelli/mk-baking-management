'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

interface Order {
  id: number
  customer: string
  item: string
  quantity: number
  date: string
  status: 'Pending' | 'In Progress' | 'Completed'
  price: number
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, customer: 'John Doe', item: 'Chocolate Cake', quantity: 1, date: '2023-05-01', status: 'Completed', price: 500 },
    { id: 2, customer: 'Jane Smith', item: 'Sugar Cookies', quantity: 2, date: '2023-05-03', status: 'Pending', price: 300 },
    { id: 3, customer: 'Mike Johnson', item: 'Cupcakes', quantity: 12, date: '2023-05-05', status: 'In Progress', price: 400 },
  ])
  const [customer, setCustomer] = useState('')
  const [item, setItem] = useState('')
  const [quantity, setQuantity] = useState('')
  const [date, setDate] = useState('')
  const [price, setPrice] = useState('')
  const [filter, setFilter] = useState('All')

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

  const statuses = ['Pending', 'In Progress', 'Completed']

  const addOrder = () => {
    if (customer && item && quantity && date && price) {
      const newOrder: Order = {
        id: Math.max(...orders.map(o => o.id), 0) + 1,
        customer,
        item,
        quantity: parseInt(quantity),
        date,
        status: 'Pending',
        price: parseFloat(price),
      }
      setOrders([...orders, newOrder])
      setCustomer('')
      setItem('')
      setQuantity('')
      setDate('')
      setPrice('')
    }
  }

  const updateStatus = (id: number, newStatus: 'Pending' | 'In Progress' | 'Completed') => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ))
  }

  const deleteOrder = (id: number) => {
    setOrders(orders.filter(o => o.id !== id))
  }

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter)
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.price * order.quantity), 0)

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Order Management</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Order</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
            <input
              type="text"
              placeholder="Customer Name"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <button
              onClick={addOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
            >
              Add Order
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Orders</h2>
            <div className="space-x-2">
              {['All', ...statuses].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1 rounded ${filter === status ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Item</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Total</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{order.date}</td>
                    <td className="p-3 font-semibold">{order.customer}</td>
                    <td className="p-3">{order.item}</td>
                    <td className="p-3 text-center">{order.quantity}</td>
                    <td className="p-3 text-right">${order.price.toFixed(2)}</td>
                    <td className="p-3 text-right font-semibold">${(order.price * order.quantity).toFixed(2)}</td>
                    <td className="p-3 text-center">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value as any)}
                        className={`px-2 py-1 rounded text-sm ${order.status === 'Completed' ? 'bg-green-100' : order.status === 'In Progress' ? 'bg-yellow-100' : 'bg-red-100'}`}
                      >
                        {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                      </select>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => deleteOrder(order.id)}
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
            <p className="text-xl font-bold">Revenue ({filter}): ${totalRevenue.toFixed(2)}</p>
            <p className="text-lg">Total Orders: {filteredOrders.length}</p>
            <p className="text-lg">Completed: {orders.filter(o => o.status === 'Completed').length} | Pending: {orders.filter(o => o.status === 'Pending').length}</p>
          </div>
        </div>
      </div>
    </main>
  )
}