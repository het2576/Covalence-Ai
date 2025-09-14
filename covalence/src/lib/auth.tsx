import { createContext, useContext, useEffect, useState } from 'react'
import { type User } from './supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string, role: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for testing
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'admin@demo.com',
    role: 'admin',
    full_name: 'Admin User',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    email: 'manager@demo.com',
    role: 'manager',
    full_name: 'Manager User',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    email: 'analyst@demo.com',
    role: 'analyst',
    full_name: 'Analyst User',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    email: 'intern@demo.com',
    role: 'intern',
    full_name: 'Intern User',
    created_at: new Date().toISOString()
  }
]

const DEMO_PASSWORD = 'demo123'
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('demo_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  async function signIn(email: string, password: string) {
    // Check demo credentials
    if (password !== DEMO_PASSWORD) {
      throw new Error('Invalid password. Use "demo123" for demo accounts.')
    }

    const demoUser = DEMO_USERS.find(u => u.email === email)
    if (!demoUser) {
      throw new Error('Invalid email. Use admin@demo.com, manager@demo.com, analyst@demo.com, or intern@demo.com')
    }

    // Store user session
    localStorage.setItem('demo_user', JSON.stringify(demoUser))
    setUser(demoUser)
  }

  async function signUp(email: string, password: string, fullName: string, role: string) {
    // For demo, create a new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      role: role as any,
      full_name: fullName,
      created_at: new Date().toISOString()
    }

    localStorage.setItem('demo_user', JSON.stringify(newUser))
    setUser(newUser)
  }

  async function signOut() {
    localStorage.removeItem('demo_user')
    setUser(null)
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}