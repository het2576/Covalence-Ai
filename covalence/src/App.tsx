import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthProvider, useAuth } from './lib/auth'
import { AuthPage } from './components/Auth/AuthPage'
import { Sidebar } from './components/Layout/Sidebar'
import { ChatInterface } from './components/Chat/ChatInterface'
import { AnalyticsDashboard } from './components/Analytics/AnalyticsDashboard'
import { AdminPanel } from './components/Admin/AdminPanel'
import { SettingsPage } from './components/Settings/SettingsPage'

function AppContent() {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('chat')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Covalence AI⚡
          </h2>
          <p className="text-gray-600 mt-2">Loading your workspace...</p>
        </motion.div>
      </div>
    )
  }

  if (!user) {
    return <AuthPage />
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />
      case 'analytics':
        return <AnalyticsDashboard />
      case 'admin':
        return user.role === 'admin' ? <AdminPanel /> : <ChatInterface />
      case 'settings':
        return <SettingsPage />
      default:
        return <ChatInterface />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App