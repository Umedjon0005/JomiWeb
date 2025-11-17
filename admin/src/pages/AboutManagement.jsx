import { useState, useEffect } from 'react'
import { getAboutContent, updateAboutContent } from '../services/api'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const AboutManagement = () => {
  const [aboutContent, setAboutContent] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchAboutContent()
  }, [])

  const fetchAboutContent = async () => {
    try {
      const response = await getAboutContent()
      setAboutContent(response.data)
    } catch (error) {
      console.error('Error fetching about content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (section) => {
    setSaving(true)
    try {
      await updateAboutContent({
        section_key: section.section_key,
        title: section.title,
        content: section.content
      })
      alert('Content updated successfully!')
    } catch (error) {
      console.error('Error updating about content:', error)
      alert('Error updating content')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (index, field, value) => {
    const updated = [...aboutContent]
    updated[index] = { ...updated[index], [field]: value }
    setAboutContent(updated)
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
      <h1 className="text-4xl font-bold mb-4 text-gray-900">About Page Management</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Edit the content sections that appear on the About page.
      </p>

      <div className="space-y-6">
        {aboutContent.map((section, index) => (
          <div key={section.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-900">Section Key</label>
              <input
                type="text"
                value={section.section_key}
                disabled
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-900">Title</label>
              <input
                type="text"
                value={section.title || ''}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-900">Content</label>
              <div className="bg-white">
                <ReactQuill
                  value={section.content || ''}
                  onChange={(value) => handleChange(index, 'content', value)}
                  theme="snow"
                  style={{ minHeight: '200px' }}
                />
              </div>
            </div>
            
            <button
              onClick={() => handleUpdate(section)}
              disabled={saving}
              className="px-6 py-3 bg-gradient-to-r from-[#87CEEB] to-[#28A745] text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Update Section'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AboutManagement
