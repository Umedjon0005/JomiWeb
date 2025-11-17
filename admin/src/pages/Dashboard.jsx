import { useState, useEffect } from 'react'
import { getDashboardStats } from '../services/api'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats()
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#87CEEB]"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📰</div>
            <div>
              <h3 className="text-sm text-gray-600 mb-1">News Articles</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#87CEEB] to-[#28A745] bg-clip-text text-transparent">
                {stats?.news || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📅</div>
            <div>
              <h3 className="text-sm text-gray-600 mb-1">Events</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#87CEEB] to-[#28A745] bg-clip-text text-transparent">
                {stats?.events || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-sm text-gray-600 mb-1">Teachers</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#87CEEB] to-[#28A745] bg-clip-text text-transparent">
                {stats?.teachers || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Welcome to Admin Panel</h2>
        <p className="text-gray-600 mb-6">Use the navigation menu to manage different sections of the website:</p>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#87CEEB]">•</span>
            <span><strong>News:</strong> Create, edit, and delete news articles</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#87CEEB]">•</span>
            <span><strong>Events:</strong> Manage upcoming and past events</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#87CEEB]">•</span>
            <span><strong>Teachers:</strong> Add and update teacher profiles</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#87CEEB]">•</span>
            <span><strong>About:</strong> Edit about page content</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#87CEEB]">•</span>
            <span><strong>Stats:</strong> Update home page statistics</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
