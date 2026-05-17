'use client'

import { useState, useContext, createContext, ReactNode } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  adminName: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [adminName, setAdminName] = useState<string | null>(null)

  const login = (username: string, password: string): boolean => {
    // Simple hardcoded authentication for demo
    // In production, this would validate against a backend
    if (username === 'MounikaKollam' && password === 'I@mMounika') {
      setIsLoggedIn(true)
      setAdminName(username)
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    setAdminName(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, adminName, login, logout }}>
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