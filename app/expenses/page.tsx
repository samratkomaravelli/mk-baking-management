'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

interface Expense {
  id: number
  description: string
  amount: number
  date: string
  category: string
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: 'Flour (10kg)', amount: 500, date: '2023-05-01', category: 'Ingredients' },
    { id: 2, description: 'Sugar (5kg)', amount: 300, date: '2023-05-02', category: 'Ingredients' },
    { id: 3, description: 'Packaging boxes', amount: 200, date: '2023-05-03', category: 'Supplies' },
  ])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('Ingredients')
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

  const categories = ['Ingredients', 'Supplies', 'Equipment', 'Utilities', 'Other']

  const addExpense = () => {
    if (description && amount && date) {
      const newExpense: Expense = {
        id: Math.max(...expenses.map(e => e.id), 0) + 1,
        description,
        amount: parseFloat(amount),
        date,
        category,
      }
      setExpenses([...expenses, newExpense])
      setDescription('')
      setAmount('')
      setDate('')
      setCategory('Ingredients')
    }
  }

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id))
  }

  const filteredExpenses = filter === 'All' ? expenses : expenses.filter(e => e.category === filter)
  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Expense Management</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Expense</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <button
              onClick={addExpense}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
            >
              Add Expense
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Expenses List</h2>
            <div className="space-x-2">
              {['All', ...categories].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1 rounded ${filter === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{expense.date}</td>
                    <td className="p-3">{expense.description}</td>
                    <td className="p-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{expense.category}</span></td>
                    <td className="p-3 text-right font-semibold">${expense.amount.toFixed(2)}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => deleteExpense(expense.id)}
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
            <p className="text-xl font-bold">Total ({filter} category): ${totalExpenses.toFixed(2)}</p>
            <p className="text-lg">All Expenses Total: ${expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </main>
  )
}