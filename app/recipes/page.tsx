'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

interface Recipe {
  id: number
  name: string
  ingredients: string
  instructions: string
  servings: number
  prepTime: number
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([
    { id: 1, name: 'Chocolate Cake', ingredients: 'Flour, Sugar, Eggs, Butter, Cocoa', instructions: 'Mix and bake at 350F for 30 mins', servings: 8, prepTime: 45 },
    { id: 2, name: 'Sugar Cookies', ingredients: 'Flour, Sugar, Butter, Eggs, Vanilla', instructions: 'Mix, cut shapes, bake at 375F for 12 mins', servings: 24, prepTime: 30 },
  ])
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [servings, setServings] = useState('')
  const [prepTime, setPrepTime] = useState('')

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

  const addRecipe = () => {
    if (name && ingredients && instructions && servings && prepTime) {
      const newRecipe: Recipe = {
        id: Math.max(...recipes.map(r => r.id), 0) + 1,
        name,
        ingredients,
        instructions,
        servings: parseInt(servings),
        prepTime: parseInt(prepTime),
      }
      setRecipes([...recipes, newRecipe])
      setName('')
      setIngredients('')
      setInstructions('')
      setServings('')
      setPrepTime('')
    }
  }

  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter(r => r.id !== id))
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Recipe Management</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Recipe</h2>
          <div className="space-y-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Recipe Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 md:col-span-1"
              />
              <input
                type="number"
                placeholder="Servings"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Prep Time (mins)"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <textarea
              placeholder="Ingredients (comma separated)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full h-24"
            />
            <textarea
              placeholder="Instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full h-32"
            />
            <button
              onClick={addRecipe}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold"
            >
              Add Recipe
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-bold mb-2">{recipe.name}</h3>
              <p className="text-gray-600 mb-4">⏱️ {recipe.prepTime} mins | 👥 {recipe.servings} servings</p>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Ingredients:</h4>
                <p className="text-sm text-gray-700">{recipe.ingredients}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Instructions:</h4>
                <p className="text-sm text-gray-700">{recipe.instructions}</p>
              </div>

              <button
                onClick={() => deleteRecipe(recipe.id)}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
              >
                Delete Recipe
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}