import { useState, useEffect } from 'react'
import { createEvent, updateEvent } from '../services/api'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const EventModal = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    image: null
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        event_date: event.event_date || '',
        location: event.location || '',
        image: null
      })
    } else {
      setFormData({
        title: '',
        description: '',
        event_date: '',
        location: '',
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

  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{event ? 'Edit Event' : 'Create Event'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button>
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
            <label className="block text-sm font-semibold mb-2 text-gray-900">Description *</label>
            <div className="bg-white">
              <ReactQuill
                value={formData.description}
                onChange={handleDescriptionChange}
                theme="snow"
                style={{ minHeight: '200px' }}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Event Date *</label>
            <input
              type="date"
              name="event_date"
              value={formData.event_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
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
            {event?.image_url && !formData.image && (
              <p className="mt-2 text-sm text-gray-500">Current: {event.image_url}</p>
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

export default EventModal
