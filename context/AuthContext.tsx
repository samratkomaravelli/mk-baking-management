'use client'

import { useState, useEffect, useContext, createContext, ReactNode } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  authLoading: boolean
  adminName: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_KEY = 'mkbaking_auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [adminName, setAdminName] = useState<string | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY)
      if (saved) {
        const { isLoggedIn: savedLogin, adminName: savedName } = JSON.parse(saved)
        setIsLoggedIn(savedLogin)
        setAdminName(savedName)
      }
    } catch {}
    setAuthLoading(false)
  }, [])

  const login = (username: string, password: string): boolean => {
    if (username === 'MounikaKollam' && password === 'I@mMounika') {
      setIsLoggedIn(true)
      setAdminName(username)
      localStorage.setItem(AUTH_KEY, JSON.stringify({ isLoggedIn: true, adminName: username }))
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    setAdminName(null)
    localStorage.removeItem(AUTH_KEY)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, authLoading, adminName, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}