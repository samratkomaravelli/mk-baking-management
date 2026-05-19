'use client'

import { useState } from 'react'

interface Ingredient {
  id: number
  name: string
  quantity: string
  unit: string
  cost: string
}

const UNITS = ['grams', 'kg', 'ml', 'liters', 'cups', 'tbsp', 'tsp', 'pieces', 'packets']

export default function PriceCalculatorPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: 1, name: '', quantity: '', unit: 'grams', cost: '' },
  ])
  const [laborHours, setLaborHours] = useState('')
  const [hourlyRate, setHourlyRate] = useState('50')
  const [electricityUnits, setElectricityUnits] = useState('')
  const [electricityRate, setElectricityRate] = useState('8')
  const [batchSize, setBatchSize] = useState('')
  const [profitMargin, setProfitMargin] = useState('30')
  const [productName, setProductName] = useState('')

  const addIngredient = () => {
    setIngredients([...ingredients, { id: Date.now(), name: '', quantity: '', unit: 'grams', cost: '' }])
  }

  const removeIngredient = (id: number) => {
    if (ingredients.length === 1) return
    setIngredients(ingredients.filter(i => i.id !== id))
  }

  const updateIngredient = (id: number, field: 'name' | 'quantity' | 'unit' | 'cost', value: string) => {
    setIngredients(ingredients.map(i => i.id === id ? { ...i, [field]: value } : i))
  }

  const totalRawMaterial = ingredients.reduce((sum, i) => sum + (parseFloat(i.cost) || 0), 0)
  const totalLabor = (parseFloat(laborHours) || 0) * (parseFloat(hourlyRate) || 0)
  const totalElectricity = (parseFloat(electricityUnits) || 0) * (parseFloat(electricityRate) || 0)
  const totalProductionCost = totalRawMaterial + totalLabor + totalElectricity
  const pieces = parseInt(batchSize) || 0
  const costPerPiece = pieces > 0 ? totalProductionCost / pieces : 0
  const margin = parseFloat(profitMargin) || 0
  const sellingPricePerPiece = costPerPiece * (1 + margin / 100)
  const profitPerPiece = sellingPricePerPiece - costPerPiece
  const totalBatchRevenue = sellingPricePerPiece * pieces
  const totalBatchProfit = profitPerPiece * pieces

  const hasResult = pieces > 0 && totalProductionCost > 0

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">Price Calculator</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Calculate the selling price per piece for any baked product.</p>
        </div>

        {/* Product Name */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name (optional)</label>
          <input
            type="text"
            placeholder="e.g. Chocolate Truffle Cake"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:max-w-sm focus:border-purple-500 focus:outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Raw Materials */}
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl md:text-2xl">🧂</span>
              <h2 className="text-lg md:text-xl font-bold text-gray-800">Raw Materials</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">Enter each ingredient with quantity, unit, and cost for the full batch.</p>

            {/* Column headers — desktop only */}
            <div className="hidden sm:grid sm:grid-cols-[1fr_70px_85px_85px_28px] gap-2 mb-1 px-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Ingredient</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Qty</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Unit</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Cost (₹)</span>
              <span></span>
            </div>

            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="bg-gray-50 sm:bg-transparent rounded-lg p-3 sm:p-0">
                  {/* Mobile: stacked layout */}
                  <div className="flex gap-2 items-center mb-2 sm:hidden">
                    <input
                      type="text"
                      placeholder={`Ingredient ${index + 1}`}
                      value={ingredient.name}
                      onChange={e => updateIngredient(ingredient.id, 'name', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 flex-1 focus:border-purple-500 focus:outline-none text-sm bg-white"
                    />
                    <button
                      onClick={() => removeIngredient(ingredient.id)}
                      disabled={ingredients.length === 1}
                      className="text-red-400 hover:text-red-600 disabled:opacity-30 text-lg leading-none px-1"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:hidden">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Qty</label>
                      <input
                        type="number"
                        placeholder="200"
                        value={ingredient.quantity}
                        onChange={e => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-2 w-full focus:border-purple-500 focus:outline-none text-sm bg-white"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Unit</label>
                      <select
                        value={ingredient.unit}
                        onChange={e => updateIngredient(ingredient.id, 'unit', e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-2 w-full focus:border-purple-500 focus:outline-none text-sm bg-white"
                      >
                        {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Cost (₹)</label>
                      <div className="relative">
                        <span className="absolute left-2 top-2.5 text-gray-400 text-xs">₹</span>
                        <input
                          type="number"
                          placeholder="0"
                          value={ingredient.cost}
                          onChange={e => updateIngredient(ingredient.id, 'cost', e.target.value)}
                          className="border border-gray-300 rounded-lg pl-5 pr-2 py-2 w-full focus:border-purple-500 focus:outline-none text-sm bg-white"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Desktop: single-row layout */}
                  <div className="hidden sm:grid sm:grid-cols-[1fr_70px_85px_85px_28px] gap-2 items-center">
                    <input
                      type="text"
                      placeholder={`Ingredient ${index + 1}`}
                      value={ingredient.name}
                      onChange={e => updateIngredient(ingredient.id, 'name', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 focus:outline-none text-sm"
                    />
                    <input
                      type="number"
                      placeholder="200"
                      value={ingredient.quantity}
                      onChange={e => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                      className="border border-gray-300 rounded-lg px-2 py-2 w-full focus:border-purple-500 focus:outline-none text-sm"
                      min="0"
                    />
                    <select
                      value={ingredient.unit}
                      onChange={e => updateIngredient(ingredient.id, 'unit', e.target.value)}
                      className="border border-gray-300 rounded-lg px-2 py-2 w-full focus:border-purple-500 focus:outline-none text-sm bg-white"
                    >
                      {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                    <div className="relative">
                      <span className="absolute left-2 top-2.5 text-gray-400 text-sm">₹</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={ingredient.cost}
                        onChange={e => updateIngredient(ingredient.id, 'cost', e.target.value)}
                        className="border border-gray-300 rounded-lg pl-6 pr-2 py-2 w-full focus:border-purple-500 focus:outline-none text-sm"
                        min="0"
                      />
                    </div>
                    <button
                      onClick={() => removeIngredient(ingredient.id)}
                      disabled={ingredients.length === 1}
                      className="text-red-400 hover:text-red-600 disabled:opacity-30 text-base leading-none"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addIngredient}
              className="mt-4 text-purple-600 hover:text-purple-800 text-sm font-semibold"
            >
              + Add Ingredient
            </button>

            <div className="mt-4 pt-4 border-t flex justify-between text-sm font-semibold">
              <span className="text-gray-600">Total Raw Material Cost</span>
              <span className="text-gray-800">₹{totalRawMaterial.toFixed(2)}</span>
            </div>
          </div>

          {/* Labor + Electricity */}
          <div className="flex flex-col gap-5">

            {/* Labor */}
            <div className="bg-white rounded-xl shadow p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl md:text-2xl">👩‍🍳</span>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">Labor</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Hours Spent</label>
                  <input
                    type="number"
                    placeholder="e.g. 3"
                    value={laborHours}
                    onChange={e => setLaborHours(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-purple-500 focus:outline-none text-sm"
                    min="0"
                    step="0.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Rate / Hour (₹)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={e => setHourlyRate(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-purple-500 focus:outline-none text-sm"
                    min="0"
                  />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t flex justify-between text-sm font-semibold">
                <span className="text-gray-600">Total Labor Cost</span>
                <span className="text-gray-800">₹{totalLabor.toFixed(2)}</span>
              </div>
            </div>

            {/* Electricity */}
            <div className="bg-white rounded-xl shadow p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl md:text-2xl">⚡</span>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">Electricity</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Units Used (kWh)</label>
                  <input
                    type="number"
                    placeholder="e.g. 2.5"
                    value={electricityUnits}
                    onChange={e => setElectricityUnits(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-purple-500 focus:outline-none text-sm"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Rate / Unit (₹)</label>
                  <input
                    type="number"
                    value={electricityRate}
                    onChange={e => setElectricityRate(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-purple-500 focus:outline-none text-sm"
                    min="0"
                    step="0.5"
                  />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t flex justify-between text-sm font-semibold">
                <span className="text-gray-600">Total Electricity Cost</span>
                <span className="text-gray-800">₹{totalElectricity.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Batch & Profit */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6 mt-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl md:text-2xl">📦</span>
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Batch & Profit</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Number of Pieces in This Batch</label>
              <input
                type="number"
                placeholder="e.g. 12"
                value={batchSize}
                onChange={e => setBatchSize(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-purple-500 focus:outline-none text-sm"
                min="1"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Profit Margin (%)</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={profitMargin}
                  onChange={e => setProfitMargin(e.target.value)}
                  className="flex-1 accent-purple-600"
                />
                <div className="relative w-20">
                  <input
                    type="number"
                    value={profitMargin}
                    onChange={e => setProfitMargin(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-purple-500 focus:outline-none text-sm pr-6"
                    min="0"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400 text-xs">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className={`mt-5 mb-8 rounded-xl shadow p-4 md:p-6 transition-all ${hasResult ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
          <h2 className="text-xl md:text-2xl font-bold mb-1">
            {productName ? `${productName} — Result` : 'Result'}
          </h2>

          {!hasResult && (
            <p className="text-sm mt-2">Fill in the details above to see the price breakdown.</p>
          )}

          {hasResult && (
            <>
              <p className="text-purple-100 mb-4 text-xs md:text-sm">Based on a batch of {pieces} piece{pieces !== 1 ? 's' : ''}</p>

              {/* Per-piece breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <p className="text-xs text-purple-100 mb-1">Raw Material / piece</p>
                  <p className="text-lg md:text-xl font-bold">₹{(totalRawMaterial / pieces).toFixed(2)}</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <p className="text-xs text-purple-100 mb-1">Labor / piece</p>
                  <p className="text-lg md:text-xl font-bold">₹{(totalLabor / pieces).toFixed(2)}</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <p className="text-xs text-purple-100 mb-1">Electricity / piece</p>
                  <p className="text-lg md:text-xl font-bold">₹{(totalElectricity / pieces).toFixed(2)}</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <p className="text-xs text-purple-100 mb-1">Profit / piece</p>
                  <p className="text-lg md:text-xl font-bold">₹{profitPerPiece.toFixed(2)}</p>
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/30 pt-5">
                <div className="text-center py-2">
                  <p className="text-xs text-purple-100 mb-1">Cost Price / piece</p>
                  <p className="text-2xl md:text-3xl font-bold">₹{costPerPiece.toFixed(2)}</p>
                </div>
                <div className="text-center bg-white/20 rounded-lg p-4">
                  <p className="text-xs text-purple-100 mb-1">Selling Price / piece</p>
                  <p className="text-3xl md:text-4xl font-extrabold">₹{sellingPricePerPiece.toFixed(2)}</p>
                </div>
                <div className="text-center py-2">
                  <p className="text-xs text-purple-100 mb-1">Total Batch Profit</p>
                  <p className="text-2xl md:text-3xl font-bold">₹{totalBatchProfit.toFixed(2)}</p>
                  <p className="text-xs text-purple-200 mt-1">Revenue: ₹{totalBatchRevenue.toFixed(2)}</p>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </main>
  )
}
