import { useState, useEffect } from 'react'
import { createTeacher, updateTeacher } from '../services/api'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TeacherModal = ({ teacher, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    qualifications: '',
    subjects: '',
    photo: null
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name || '',
        bio: teacher.bio || '',
        qualifications: teacher.qualifications || '',
        subjects: teacher.subjects || '',
        photo: null
      })
    } else {
      setFormData({
        name: '',
        bio: '',
        qualifications: '',
        subjects: '',
        photo: null
      })
    }
  }, [teacher])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleBioChange = (value) => {
    setFormData({
      ...formData,
      bio: value
    })
  }

  const handlePhotoChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (teacher) {
        await updateTeacher(teacher.id, formData)
      } else {
        await createTeacher(formData)
      }
      onSave()
    } catch (error) {
      console.error('Error saving teacher:', error)
      alert('Error saving teacher')
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
          <h2 className="text-2xl font-bold text-gray-900">{teacher ? 'Edit Teacher' : 'Create Teacher'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Bio</label>
            <div className="bg-white">
              <ReactQuill
                value={formData.bio}
                onChange={handleBioChange}
                theme="snow"
                style={{ minHeight: '150px' }}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Qualifications</label>
            <input
              type="text"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              placeholder="e.g., M.A. in Education, Ph.D. in Mathematics"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Subjects</label>
            <input
              type="text"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              placeholder="e.g., Mathematics, Physics"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#87CEEB] transition-colors"
            />
            {teacher?.photo_url && !formData.photo && (
              <p className="mt-2 text-sm text-gray-500">Current: {teacher.photo_url}</p>
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

export default TeacherModal
