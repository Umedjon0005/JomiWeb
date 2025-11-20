import { useState, useEffect } from 'react'
import { getStats, updateStat } from '../services/api'
import { SUPPORTED_LANGS } from '../constants/languages'

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
      const normalized = response.data.map(stat => ({
        ...stat,
        label: stat.label || '',
        label_ru: stat.label_ru || '',
        label_tj: stat.label_tj || ''
      }))
      setStats(normalized)
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
        label: stat.label,
        label_ru: stat.label_ru,
        label_tj: stat.label_tj
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b82f6]"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="border-b border-[#1f2937] pb-4 mb-6">
        <h1 className="text-2xl font-semibold text-white mb-1 tracking-tight">Statistics Management</h1>
        <p className="text-[#6b7280] text-xs font-medium uppercase tracking-wider">Update the statistics displayed on the home page</p>
      </div>

      <div className="bg-[#111827] border border-[#1f2937] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0e1a] border-b border-[#1f2937]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Label</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Value</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Stat Key</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2937]">
              {stats.map((stat, index) => (
                <tr key={stat.id} className="hover:bg-[#0a0e1a] transition-colors">
                  <td className="px-6 py-4">
                    <div className="grid gap-2">
                      {SUPPORTED_LANGS.map((lang) => {
                        const key = lang.key === 'en' ? 'label' : `label_${lang.key}`
                        return (
                          <div key={lang.key}>
                            <label className="block text-[10px] uppercase text-[#6b7280] mb-1">
                              {lang.label}
                            </label>
                            <input
                              type="text"
                              value={stat[key] || ''}
                              onChange={(e) => handleChange(index, key, e.target.value)}
                              className="w-full px-3 py-2 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-[#3b82f6] transition-colors"
                            />
                          </div>
                        )
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={stat.stat_value || ''}
                      onChange={(e) => handleChange(index, 'stat_value', e.target.value)}
                      className="w-full px-3 py-2 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={stat.stat_key}
                      disabled
                      className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-md text-[#6b7280]"
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleUpdate(stat)}
                      disabled={saving[stat.id]}
                      className="px-4 py-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold rounded-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
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
