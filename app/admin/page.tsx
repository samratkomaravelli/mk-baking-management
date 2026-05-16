'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Expense {
  id: number
  description: string
  amount: number
  date: string
}

interface Order {
  id: number
  customer: string
  item: string
  quantity: number
  date: string
  status: 'Pending' | 'Completed'
}

export default function AdminDashboard() {
  const [expenses] = useState<Expense[]>([
    { id: 1, description: 'Flour', amount: 50, date: '2023-05-01' },
    { id: 2, description: 'Sugar', amount: 30, date: '2023-05-02' },
    { id: 3, description: 'Butter', amount: 45, date: '2023-05-03' },
  ])

  const [orders] = useState<Order[]>([
    { id: 1, customer: 'John Doe', item: 'Chocolate Cake', quantity: 1, date: '2023-05-01', status: 'Completed' },
    { id: 2, customer: 'Jane Smith', item: 'Vanilla Cake', quantity: 2, date: '2023-05-03', status: 'Pending' },
    { id: 3, customer: 'Bob Wilson', item: 'Strawberry Cake', quantity: 1, date: '2023-05-04', status: 'Pending' },
  ])

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.status === 'Pending').length
  const completedOrders = orders.filter(o => o.status === 'Completed').length

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
            <h3 className="text-gray-500 text-sm font-semibold">Total Expenses</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <h3 className="text-gray-500 text-sm font-semibold">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{totalOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600">
            <h3 className="text-gray-500 text-sm font-semibold">Pending Orders</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{pendingOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <h3 className="text-gray-500 text-sm font-semibold">Completed Orders</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{completedOrders}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            <ul className="space-y-2">
              {orders.slice(0, 5).map((order) => (
                <li key={order.id} className="border-b pb-2">
                  <span className="font-semibold">{order.customer}</span> - {order.item} x{order.quantity}
                  <span className={`ml-2 text-xs px-2 py-1 rounded ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.status}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/admin/orders" className="text-blue-600 hover:underline mt-4 block font-semibold">View All Orders →</Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
            <ul className="space-y-2">
              {expenses.slice(0, 5).map((expense) => (
                <li key={expense.id} className="border-b pb-2 flex justify-between">
                  <span className="font-semibold">{expense.description}</span>
                  <span className="text-red-600">${expense.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <Link href="/admin/expenses" className="text-blue-600 hover:underline mt-4 block font-semibold">View All Expenses →</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/orders" className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow p-8 text-center transform hover:scale-105 transition">
            <span className="text-3xl">📦</span>
            <h3 className="text-xl font-bold mt-2">Manage Orders</h3>
            <p className="text-sm mt-1 opacity-90">Add and track orders</p>
          </Link>
          <Link href="/admin/expenses" className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow p-8 text-center transform hover:scale-105 transition">
            <span className="text-3xl">💰</span>
            <h3 className="text-xl font-bold mt-2">Manage Expenses</h3>
            <p className="text-sm mt-1 opacity-90">Track your spending</p>
          </Link>
          <Link href="/admin/inventory" className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow p-8 text-center transform hover:scale-105 transition">
            <span className="text-3xl">📦</span>
            <h3 className="text-xl font-bold mt-2">Inventory</h3>
            <p className="text-sm mt-1 opacity-90">Manage ingredients</p>
          </Link>
          <Link href="/admin/recipes" className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg shadow p-8 text-center transform hover:scale-105 transition">
            <span className="text-3xl">📝</span>
            <h3 className="text-xl font-bold mt-2">Recipes</h3>
            <p className="text-sm mt-1 opacity-90">Store your recipes</p>
          </Link>
          <Link href="/admin/customers" className="bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg shadow p-8 text-center transform hover:scale-105 transition">
            <span className="text-3xl">👥</span>
            <h3 className="text-xl font-bold mt-2">Customers</h3>
            <p className="text-sm mt-1 opacity-90">Customer info</p>
          </Link>
          <Link href="/admin/reports" className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow p-8 text-center transform hover:scale-105 transition">
            <span className="text-3xl">📊</span>
            <h3 className="text-xl font-bold mt-2">Reports</h3>
            <p className="text-sm mt-1 opacity-90">View analytics</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
