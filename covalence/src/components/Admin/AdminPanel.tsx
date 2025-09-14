import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, BarChart3, Users, Plus, Trash2, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'

const mockDatasets = [
  { id: '1', name: 'Employee_Database.csv', type: 'csv', size: '2.4 MB', uploaded: '2024-01-15', records: 1247 },
  { id: '2', name: 'HR_Policies.pdf', type: 'pdf', size: '8.7 MB', uploaded: '2024-01-14', pages: 45 },
  { id: '3', name: 'Sales_Q4_2023.xlsx', type: 'excel', size: '1.8 MB', uploaded: '2024-01-12', records: 892 },
  { id: '4', name: 'Product_Images.zip', type: 'images', size: '125 MB', uploaded: '2024-01-10', files: 234 }
]

const mockUsers = [
  { id: '1', name: 'Sarah Chen', email: 'sarah.chen@company.com', role: 'analyst', lastActive: '2 min ago', queries: 45 },
  { id: '2', name: 'Mike Johnson', email: 'mike.johnson@company.com', role: 'manager', lastActive: '1 hour ago', queries: 23 },
  { id: '3', name: 'Emma Davis', email: 'emma.davis@company.com', role: 'admin', lastActive: '30 min ago', queries: 12 },
  { id: '4', name: 'Alex Kumar', email: 'alex.kumar@company.com', role: 'analyst', lastActive: '3 hours ago', queries: 67 }
]

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'datasets' | 'users' | 'logs'>('datasets')
  const [dragOver, setDragOver] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      // Handle file upload logic here
      console.log('Files uploaded:', files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    // Handle dropped files
    console.log('Files dropped:', files)
  }

  const tabs = [
    { id: 'datasets', name: 'Datasets', icon: FileText },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'logs', name: 'Activity Logs', icon: BarChart3 }
  ]

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Dataset</span>
        </Button>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      {activeTab === 'datasets' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Upload Area */}
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-8">
              <div
                className={`text-center transition-colors ${dragOver ? 'bg-blue-50' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload datasets</h3>
                <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".csv,.pdf,.xlsx,.jpg,.png,.zip"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Choose Files
                  </Button>
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: CSV, PDF, Excel, Images, ZIP
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Datasets List */}
          <Card>
            <CardHeader>
              <CardTitle>Managed Datasets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 font-medium text-gray-900">Name</th>
                      <th className="text-left py-3 font-medium text-gray-900">Type</th>
                      <th className="text-left py-3 font-medium text-gray-900">Size</th>
                      <th className="text-left py-3 font-medium text-gray-900">Records</th>
                      <th className="text-left py-3 font-medium text-gray-900">Uploaded</th>
                      <th className="text-left py-3 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockDatasets.map((dataset, index) => (
                      <motion.tr
                        key={dataset.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 text-gray-900 font-medium">{dataset.name}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            dataset.type === 'csv' ? 'bg-green-100 text-green-800' :
                            dataset.type === 'pdf' ? 'bg-red-100 text-red-800' :
                            dataset.type === 'excel' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {dataset.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 text-gray-600">{dataset.size}</td>
                        <td className="py-3 text-gray-600">{dataset.records || dataset.pages || dataset.files}</td>
                        <td className="py-3 text-gray-600">{dataset.uploaded}</td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Download className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-3 h-3 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === 'users' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 font-medium text-gray-900">User</th>
                      <th className="text-left py-3 font-medium text-gray-900">Role</th>
                      <th className="text-left py-3 font-medium text-gray-900">Queries</th>
                      <th className="text-left py-3 font-medium text-gray-900">Last Active</th>
                      <th className="text-left py-3 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3">
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.role === 'admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'manager' ? 'bg-purple-100 text-purple-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 text-gray-600">{user.queries}</td>
                        <td className="py-3 text-gray-600">{user.lastActive}</td>
                        <td className="py-3">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === 'logs' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: '2024-01-15 14:32:15', user: 'Sarah Chen', action: 'Generated sales report', query: 'Show me Q4 sales by region', type: 'success' },
                  { time: '2024-01-15 14:28:43', user: 'Mike Johnson', action: 'Document search', query: 'Find remote work policy', type: 'success' },
                  { time: '2024-01-15 14:25:12', user: 'Alex Kumar', action: 'SQL query failed', query: 'SELECT * FROM sensitive_data', type: 'error' },
                  { time: '2024-01-15 14:20:55', user: 'Emma Davis', action: 'Dataset uploaded', query: 'Employee_Database_Updated.csv', type: 'info' },
                  { time: '2024-01-15 14:18:33', user: 'Lisa Wong', action: 'Role permission denied', query: 'Access salary information', type: 'warning' }
                ].map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      log.type === 'success' ? 'bg-green-500' :
                      log.type === 'error' ? 'bg-red-500' :
                      log.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{log.user}</span>
                        <span className="text-xs text-gray-500">{log.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{log.action}</p>
                      <p className="text-xs text-gray-500 mt-1 bg-gray-50 p-2 rounded">
                        Query: {log.query}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}