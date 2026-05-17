'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

interface Item {
  id: number
  name: string
  quantity: number
  unit: string
  reorderLevel: number
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<Item[]>([
    { id: 1, name: 'Flour', quantity: 50, unit: 'kg', reorderLevel: 20 },
    { id: 2, name: 'Sugar', quantity: 30, unit: 'kg', reorderLevel: 15 },
    { id: 3, name: 'Eggs', quantity: 100, unit: 'pieces', reorderLevel: 50 },
    { id: 4, name: 'Butter', quantity: 20, unit: 'kg', reorderLevel: 10 },
  ])
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('kg')
  const [reorderLevel, setReorderLevel] = useState('')

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

  const units = ['kg', 'liter', 'pieces', 'bag', 'box']

  const addItem = () => {
    if (name && quantity && reorderLevel) {
      const newItem: Item = {
        id: Math.max(...inventory.map(i => i.id), 0) + 1,
        name,
        quantity: parseFloat(quantity),
        unit,
        reorderLevel: parseFloat(reorderLevel),
      }
      setInventory([...inventory, newItem])
      setName('')
      setQuantity('')
      setUnit('kg')
      setReorderLevel('')
    }
  }

  const updateQuantity = (id: number, newQty: number) => {
    setInventory(inventory.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    ))
  }

  const deleteItem = (id: number) => {
    setInventory(inventory.filter(i => i.id !== id))
  }

  const lowStockItems = inventory.filter(i => i.quantity <= i.reorderLevel)

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Inventory Management</h1>

        {lowStockItems.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="font-bold text-yellow-800">⚠️ Low Stock Alert</p>
            <p className="text-yellow-700">{lowStockItems.length} item(s) need reordering</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <input
              type="text"
              placeholder="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <input
              type="number"
              placeholder="Reorder Level"
              value={reorderLevel}
              onChange={(e) => setReorderLevel(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <button
              onClick={addItem}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
            >
              Add Item
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Inventory List</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Item Name</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3 text-center">Unit</th>
                  <th className="p-3 text-center">Reorder Level</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-semibold">{item.name}</td>
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseFloat(e.target.value))}
                        className="border border-gray-300 rounded px-2 py-1 w-20 text-center"
                      />
                    </td>
                    <td className="p-3 text-center">{item.unit}</td>
                    <td className="p-3 text-center">{item.reorderLevel}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-sm ${item.quantity <= item.reorderLevel ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {item.quantity <= item.reorderLevel ? 'Low Stock' : 'OK'}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => deleteItem(item.id)}
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
        </div>
      </div>
    </main>
  )
}