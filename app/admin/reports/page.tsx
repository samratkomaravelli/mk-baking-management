'use client'

import { useState } from 'react'

export default function ReportsPage() {
  const [orders] = useState([
    { id: 1, customer: 'John Doe', item: 'Chocolate Cake', quantity: 1, date: '2023-05-01', status: 'Completed', price: 500 },
    { id: 2, customer: 'Jane Smith', item: 'Sugar Cookies', quantity: 2, date: '2023-05-03', status: 'Pending', price: 300 },
    { id: 3, customer: 'Mike Johnson', item: 'Cupcakes', quantity: 12, date: '2023-05-05', status: 'In Progress', price: 400 },
  ])

  const [expenses] = useState([
    { id: 1, description: 'Flour (10kg)', amount: 500, date: '2023-05-01', category: 'Ingredients' },
    { id: 2, description: 'Sugar (5kg)', amount: 300, date: '2023-05-02', category: 'Ingredients' },
    { id: 3, description: 'Packaging boxes', amount: 200, date: '2023-05-03', category: 'Supplies' },
  ])

  const totalRevenue = orders
    .filter(o => o.status === 'Completed')
    .reduce((sum, order) => sum + (order.price * order.quantity), 0)

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const profit = totalRevenue - totalExpenses

  const ordersByMonth = {
    'May': orders.length,
    'April': 2,
    'March': 3,
  }

  const expensesByCategory = {
    'Ingredients': 800,
    'Supplies': 200,
    'Equipment': 150,
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Reports & Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <h3 className="text-gray-500 text-sm font-semibold">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
            <h3 className="text-gray-500 text-sm font-semibold">Total Expenses</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <h3 className="text-gray-500 text-sm font-semibold">Profit</h3>
            <p className={`text-3xl font-bold mt-2 ${profit > 0 ? 'text-green-600' : 'text-red-600'}`}>${profit.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
            <h3 className="text-gray-500 text-sm font-semibold">Profit Margin</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">{totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) : '0'}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Orders by Month</h2>
            <div className="space-y-4">
              {Object.entries(ordersByMonth).map(([month, count]) => (
                <div key={month}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{month}</span>
                    <span>{count} orders</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-6">
                    <div
                      className="bg-blue-600 rounded h-6"
                      style={{ width: `${(count / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Expenses by Category</h2>
            <div className="space-y-4">
              {Object.entries(expensesByCategory).map(([category, amount]) => (
                <div key={category}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{category}</span>
                    <span>${amount.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-6">
                    <div
                      className="bg-red-600 rounded h-6"
                      style={{ width: `${(amount / 1200) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Top Products</h2>
            <div className="space-y-3">
              {orders.map((order, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-3">
                  <span className="font-semibold">{order.item}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{order.quantity} sold</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Key Metrics</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Average Order Value</p>
                <p className="text-2xl font-bold text-green-600">${(totalRevenue / orders.filter(o => o.status === 'Completed').length).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-600">Order Completion Rate</p>
                <p className="text-2xl font-bold text-blue-600">{orders.length > 0 ? ((orders.filter(o => o.status === 'Completed').length / orders.length) * 100).toFixed(0) : '0'}%</p>
              </div>
              <div>
                <p className="text-gray-600">Cost per Order</p>
                <p className="text-2xl font-bold text-red-600">${(totalExpenses / orders.length).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
