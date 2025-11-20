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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#3b82f6] border-t-transparent"></div>
      </div>
    )
  }

  const statCards = [
    {
      label: 'News Articles',
      value: stats?.news || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Events',
      value: stats?.events || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Teachers',
      value: stats?.teachers || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Olympiads',
      value: stats?.olympiads || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: 'from-amber-500 to-amber-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#1f2937] pb-4">
        <h1 className="text-2xl font-semibold text-white mb-1 tracking-tight">Dashboard</h1>
        <p className="text-[#6b7280] text-xs font-medium uppercase tracking-wider">System Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-[#111827] border border-[#1f2937] rounded-lg p-5 hover:border-[#374151] transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 bg-[#1e293b] border border-[#334155] rounded-md`}>
                <div className={`text-[#60a5fa]`}>
                  {stat.icon}
                </div>
              </div>
            </div>
            <div>
              <p className="text-[#6b7280] text-xs font-medium mb-1 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#111827] border border-[#1f2937] rounded-lg p-5">
        <h2 className="text-lg font-semibold text-white mb-4 tracking-tight">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-4 bg-[#0a0e1a] border border-[#1f2937] rounded-md">
            <h3 className="text-xs font-medium text-[#e5e7eb] mb-1.5 uppercase tracking-wider">Content Management</h3>
            <p className="text-xs text-[#6b7280]">Manage news, events, and announcements</p>
          </div>
          <div className="p-4 bg-[#0a0e1a] border border-[#1f2937] rounded-md">
            <h3 className="text-xs font-medium text-[#e5e7eb] mb-1.5 uppercase tracking-wider">Media Library</h3>
            <p className="text-xs text-[#6b7280]">Upload and organize photos and moments</p>
          </div>
          <div className="p-4 bg-[#0a0e1a] border border-[#1f2937] rounded-md">
            <h3 className="text-xs font-medium text-[#e5e7eb] mb-1.5 uppercase tracking-wider">Academic Content</h3>
            <p className="text-xs text-[#6b7280]">Manage teachers and olympiad information</p>
          </div>
          <div className="p-4 bg-[#0a0e1a] border border-[#1f2937] rounded-md">
            <h3 className="text-xs font-medium text-[#e5e7eb] mb-1.5 uppercase tracking-wider">Settings</h3>
            <p className="text-xs text-[#6b7280]">Update stats and about page content</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
