import { useState, useEffect } from 'react'
import { getAboutContent, updateAboutContent } from '../services/api'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { SUPPORTED_LANGS } from '../constants/languages'

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
      const normalized = response.data.map(section => ({
        ...section,
        title: section.title || '',
        title_ru: section.title_ru || '',
        title_tj: section.title_tj || '',
        content: section.content || '',
        content_ru: section.content_ru || '',
        content_tj: section.content_tj || ''
      }))
      setAboutContent(normalized)
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
        title_ru: section.title_ru || section.title,
        title_tj: section.title_tj || section.title,
        content: section.content,
        content_ru: section.content_ru || section.content,
        content_tj: section.content_tj || section.content
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b82f6]"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="border-b border-[#1f2937] pb-4 mb-6">
        <h1 className="text-2xl font-semibold text-white mb-1 tracking-tight">About Page Management</h1>
        <p className="text-[#6b7280] text-xs font-medium uppercase tracking-wider">Edit the content sections that appear on the About page</p>
      </div>

      <div className="space-y-6">
        {aboutContent.map((section, index) => (
          <div key={section.id} className="bg-[#111827] border border-[#1f2937] rounded-lg p-6">
            <div className="mb-6">
              <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">Section Key</label>
              <input
                type="text"
                value={section.section_key}
                disabled
                className="w-full px-4 py-3 bg-[#0a0e1a] border border-[#1f2937] rounded-md text-[#6b7280]"
              />
            </div>
            
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {SUPPORTED_LANGS.map((lang) => {
                const key = lang.key === 'en' ? 'title' : `title_${lang.key}`
                return (
                  <div key={lang.key}>
                    <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
                      Title ({lang.label})
                    </label>
                    <input
                      type="text"
                      value={section[key] || ''}
                      onChange={(e) => handleChange(index, key, e.target.value)}
                      className="w-full px-4 py-3 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                  </div>
                )
              })}
            </div>
            
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {SUPPORTED_LANGS.map((lang) => {
                const key = lang.key === 'en' ? 'content' : `content_${lang.key}`
                return (
                  <div key={lang.key}>
                    <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">
                      Content ({lang.label})
                    </label>
                    <div className="bg-[#1f2937] border border-[#374151] rounded-md">
                      <ReactQuill
                        value={section[key] || ''}
                        onChange={(value) => handleChange(index, key, value)}
                        theme="snow"
                        style={{ minHeight: '180px' }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            
            <button
              onClick={() => handleUpdate(section)}
              disabled={saving}
              className="px-6 py-3 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold rounded-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
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
