import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { ChatResponse } from './ChatResponse'
import { useAuth } from '../../lib/auth'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  responseType?: 'table' | 'chart' | 'summary' | 'image' | 'text'
  responseData?: any
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI assistant. I can help you analyze data, search documents, and answer questions based on your role and permissions. What would you like to know?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateMockResponse(input, user?.role || 'intern')
      setMessages(prev => [...prev, botResponse])
      setLoading(false)
    }, 1500)
  }

  const generateMockResponse = (query: string, role: string): Message => {
    const lowerQuery = query.toLowerCase()
    
    // Table response for data queries
    if (lowerQuery.includes('sales') || lowerQuery.includes('revenue') || lowerQuery.includes('employees')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Here\'s the data analysis based on your query:',
        timestamp: new Date(),
        responseType: 'table',
        responseData: {
          columns: ['Month', 'Revenue', 'Growth'],
          data: [
            ['January', '$125,000', '+12%'],
            ['February', '$140,000', '+15%'],
            ['March', '$158,000', '+18%'],
            ['April', '$165,000', '+8%']
          ]
        }
      }
    }
    
    // Chart response for analytics
    if (lowerQuery.includes('chart') || lowerQuery.includes('graph') || lowerQuery.includes('trend')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Here\'s a visual representation of the data:',
        timestamp: new Date(),
        responseType: 'chart',
        responseData: {
          type: 'line',
          data: [
            { name: 'Jan', value: 125000 },
            { name: 'Feb', value: 140000 },
            { name: 'Mar', value: 158000 },
            { name: 'Apr', value: 165000 },
            { name: 'May', value: 172000 }
          ]
        }
      }
    }
    
    // Summary response for document queries
    if (lowerQuery.includes('policy') || lowerQuery.includes('document') || lowerQuery.includes('guide')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: 'I found relevant information in the company documents:',
        timestamp: new Date(),
        responseType: 'summary',
        responseData: {
          title: 'Company Policy Summary',
          summary: 'Based on the HR handbook, remote work is allowed up to 3 days per week with manager approval. All employees must maintain core hours between 9 AM - 3 PM EST.',
          source: 'HR Handbook 2024, Section 3.2',
          confidence: 0.92
        }
      }
    }

    // Role-based filtering
    const roleMessage = role === 'intern' 
      ? ' (Note: Some sensitive data is filtered based on your access level)'
      : ''

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: `I understand you're asking about "${query}". I'll help you find the information you need.${roleMessage} Could you be more specific about what data you'd like to see?`,
      timestamp: new Date(),
      responseType: 'text'
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                    : 'bg-gradient-to-br from-emerald-500 to-teal-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message Content */}
                <Card className={`p-4 ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200' 
                    : 'bg-white'
                }`}>
                  <p className="text-gray-900 mb-2">{message.content}</p>
                  <p className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                  
                  {message.responseType && message.responseType !== 'text' && (
                    <div className="mt-4">
                      <ChatResponse 
                        type={message.responseType}
                        data={message.responseData}
                      />
                    </div>
                  )}
                </Card>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex space-x-3 max-w-3xl">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <Card className="p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about your data..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}