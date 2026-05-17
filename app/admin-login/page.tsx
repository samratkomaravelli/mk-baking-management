'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (login(username, password)) {
        window.location.href = '/admin'
      } else {
        setError('Invalid username or password')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-500 via-orange-400 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-2 text-amber-900">🎂 MK Bakers</h1>
        <p className="text-center text-gray-600 mb-8">Admin Login</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-amber-500 focus:outline-none"
              placeholder="Enter username"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-amber-500 focus:outline-none"
              placeholder="Enter password"
              disabled={loading}
            />
          </div>

          {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Demo credentials: admin / admin123
        </p>

        <Link href="/" className="block text-center mt-4 text-amber-600 hover:text-amber-700 font-semibold">
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}