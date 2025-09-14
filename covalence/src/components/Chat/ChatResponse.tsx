import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { FileText, Image, TrendingUp } from 'lucide-react'

interface ChatResponseProps {
  type: 'table' | 'chart' | 'summary' | 'image' | 'text'
  data: any
}

export function ChatResponse({ type, data }: ChatResponseProps) {
  switch (type) {
    case 'table':
      return <TableResponse data={data} />
    case 'chart':
      return <ChartResponse data={data} />
    case 'summary':
      return <SummaryResponse data={data} />
    case 'image':
      return <ImageResponse data={data} />
    default:
      return null
  }
}

function TableResponse({ data }: { data: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Data Analysis Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {data.columns.map((column: string, index: number) => (
                    <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.data.map((row: string[], rowIndex: number) => (
                  <motion.tr
                    key={rowIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: rowIndex * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.map((cell: string, cellIndex: number) => (
                      <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cell}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ChartResponse({ data }: { data: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>Data Visualization</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {data.type === 'line' ? (
                <LineChart data={data.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                  <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} />
                </LineChart>
              ) : (
                <BarChart data={data.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                  <Bar dataKey="value" fill="#8B5CF6" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SummaryResponse({ data }: { data: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-emerald-200 bg-emerald-50/50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <FileText className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{data.title}</h4>
              <p className="text-gray-700 mb-4">{data.summary}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Source: {data.source}</span>
                <span className="flex items-center space-x-1">
                  <span>Confidence:</span>
                  <span className="font-medium text-emerald-600">
                    {Math.round(data.confidence * 100)}%
                  </span>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ImageResponse({ data }: { data: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Image className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{data.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{data.description}</p>
            </div>
          </div>
          <div className="mt-4 rounded-lg overflow-hidden">
            <img src={data.url} alt={data.title} className="w-full h-48 object-cover" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}