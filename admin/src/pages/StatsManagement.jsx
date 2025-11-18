import { useState, useEffect } from 'react'
import { getStats, updateStat } from '../services/api'

const StatsManagement = () => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState({})

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await getStats()
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (stat) => {
    setSaving({ ...saving, [stat.id]: true })
    try {
      await updateStat({
        stat_key: stat.stat_key,
        stat_value: parseInt(stat.stat_value),
        label: stat.label
      })
      alert('Stat updated successfully!')
      fetchStats()
    } catch (error) {
      console.error('Error updating stat:', error)
      alert('Error updating stat')
    } finally {
      setSaving({ ...saving, [stat.id]: false })
    }
  }

  const handleChange = (index, field, value) => {
    const updated = [...stats]
    updated[index] = { ...updated[index], [field]: value }
    setStats(updated)
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
      <h1 className="text-4xl font-bold mb-4 text-gray-900">Statistics Management</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Update the statistics displayed on the home page.
      </p>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Label</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Value</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stat Key</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.map((stat, index) => (
                <tr key={stat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={stat.label || ''}
                      onChange={(e) => handleChange(index, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#87CEEB] transition-colors"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={stat.stat_value || ''}
                      onChange={(e) => handleChange(index, 'stat_value', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#87CEEB] transition-colors"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={stat.stat_key}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleUpdate(stat)}
                      disabled={saving[stat.id]}
                      className="px-4 py-2 bg-gradient-to-r from-[#7dd3fc] to-[#c084fc] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {saving[stat.id] ? 'Saving...' : 'Update'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StatsManagement
