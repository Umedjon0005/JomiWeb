import { useState, useEffect } from 'react'
import { createEvent, updateEvent } from '../services/api'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { SUPPORTED_LANGS } from '../constants/languages'

const EventModal = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    title_ru: '',
    title_tj: '',
    description: '',
    description_ru: '',
    description_tj: '',
    event_date: '',
    location: '',
    location_ru: '',
    location_tj: '',
    image: null
  })
  const [loading, setLoading] = useState(false)
  const [activeLang, setActiveLang] = useState('en')

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        title_ru: event.title_ru || '',
        title_tj: event.title_tj || '',
        description: event.description || '',
        description_ru: event.description_ru || '',
        description_tj: event.description_tj || '',
        event_date: event.event_date || '',
        location: event.location || '',
        location_ru: event.location_ru || '',
        location_tj: event.location_tj || '',
        image: null
      })
    } else {
      setFormData({
        title: '',
        title_ru: '',
        title_tj: '',
        description: '',
        description_ru: '',
        description_tj: '',
        event_date: '',
        location: '',
        location_ru: '',
        location_tj: '',
        image: null
      })
    }
  }, [event])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDescriptionChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
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
      const requiredFields = [
        'title',
        'title_ru',
        'title_tj',
        'description',
        'description_ru',
        'description_tj',
        'location',
        'location_ru',
        'location_tj',
        'event_date'
      ]
      const missing = requiredFields.filter((field) => !formData[field] || formData[field].trim() === '')
      if (missing.length > 0) {
        alert('Please fill all languages for title, description, and location.')
        setLoading(false)
        return
      }

      if (event) {
        await updateEvent(event.id, formData)
      } else {
        await createEvent(formData)
      }
      onSave()
    } catch (error) {
      console.error('Error saving event:', error)
      alert('Error saving event')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[#111827] border border-[#1f2937] rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#1f2937] flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">{event ? 'Edit Event' : 'Create Event'}</h2>
          <button onClick={onClose} className="text-[#9ca3af] hover:text-white text-2xl font-bold transition-colors">×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Title *</label>
              <div className="flex gap-2">
                {SUPPORTED_LANGS.map((lang) => (
                  <button
                    type="button"
                    key={lang.key}
                    onClick={() => setActiveLang(lang.key)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md border ${
                      activeLang === lang.key
                        ? 'bg-[#1e3a8a] text-white border-transparent'
                        : 'text-[#9ca3af] border-[#374151]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              name={activeLang === 'en' ? 'title' : `title_${activeLang}`}
              value={formData[activeLang === 'en' ? 'title' : `title_${activeLang}`]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-[#3b82f6] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">Description *</label>
            <div className="bg-[#1f2937] border border-[#374151] rounded-md">
              <ReactQuill
                value={formData[activeLang === 'en' ? 'description' : `description_${activeLang}`]}
                onChange={(value) =>
                  handleDescriptionChange(
                    activeLang === 'en' ? 'description' : `description_${activeLang}`,
                    value
                  )
                }
                theme="snow"
                style={{ minHeight: '200px' }}
                className="bg-[#1f2937]"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">Event Date *</label>
            <input
              type="date"
              name="event_date"
              value={formData.event_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white focus:outline-none focus:border-[#3b82f6] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">Location</label>
            <input
              type="text"
              name={activeLang === 'en' ? 'location' : `location_${activeLang}`}
              value={formData[activeLang === 'en' ? 'location' : `location_${activeLang}`]}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-[#3b82f6] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-[#9ca3af] focus:outline-none focus:border-[#3b82f6] transition-colors"
            />
            {event?.image_url && !formData.image && (
              <p className="mt-2 text-xs text-[#6b7280]">Current: {event.image_url}</p>
            )}
          </div>
          
          <div className="flex gap-3 justify-end pt-4 border-t border-[#1f2937]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#1e293b] hover:bg-[#334155] text-[#e5e7eb] text-sm font-medium rounded-md transition-colors border border-[#334155]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-sm font-medium rounded-md transition-colors border border-[#3b82f6]/30 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EventModal
