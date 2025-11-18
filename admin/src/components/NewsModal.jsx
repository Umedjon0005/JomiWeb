import { useState, useEffect } from 'react'
import { createNews, updateNews } from '../services/api'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const NewsModal = ({ news, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    publish_date: '',
    image: null
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title || '',
        content: news.content || '',
        publish_date: news.publish_date || '',
        image: null
      })
    } else {
      setFormData({
        title: '',
        content: '',
        publish_date: new Date().toISOString().split('T')[0],
        image: null
      })
    }
  }, [news])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleContentChange = (value) => {
    setFormData({
      ...formData,
      content: value
    })
  }

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (news) {
        await updateNews(news.id, formData)
      } else {
        await createNews(formData)
      }
      onSave()
    } catch (error) {
      console.error('Error saving news:', error)
      alert('Error saving news article')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{news ? 'Edit News' : 'Create News'}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Content *</label>
            <div className="bg-white">
              <ReactQuill
                value={formData.content}
                onChange={handleContentChange}
                theme="snow"
                style={{ minHeight: '200px' }}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Publish Date *</label>
            <input
              type="date"
              name="publish_date"
              value={formData.publish_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
            />
            {news?.image_url && !formData.image && (
              <p className="mt-2 text-sm text-gray-500">Current: {news.image_url}</p>
            )}
          </div>
          
          <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-[#7dd3fc] to-[#c084fc] text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewsModal
