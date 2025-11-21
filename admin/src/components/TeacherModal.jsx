import { useState, useEffect } from 'react'
import { createTeacher, updateTeacher } from '../services/api'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { SUPPORTED_LANGS } from '../constants/languages'
import { normalizeLanguageFields, buildImageUrl } from '../utils/formHelpers'

const TeacherModal = ({ teacher, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    name_ru: '',
    name_tj: '',
    bio: '',
    bio_ru: '',
    bio_tj: '',
    qualifications: '',
    qualifications_ru: '',
    qualifications_tj: '',
    subjects: '',
    subjects_ru: '',
    subjects_tj: '',
    photo: null
  })
  const [loading, setLoading] = useState(false)
  const [activeLang, setActiveLang] = useState('en')

  useEffect(() => {
    if (teacher) {
      // Normalize all language fields
      const normalized = normalizeLanguageFields(teacher, ['name', 'bio', 'qualifications', 'subjects']);
      
      setFormData({
        name: normalized.name || '',
        name_ru: normalized.name_ru || '',
        name_tj: normalized.name_tj || '',
        bio: normalized.bio || '',
        bio_ru: normalized.bio_ru || '',
        bio_tj: normalized.bio_tj || '',
        qualifications: normalized.qualifications || '',
        qualifications_ru: normalized.qualifications_ru || '',
        qualifications_tj: normalized.qualifications_tj || '',
        subjects: normalized.subjects || '',
        subjects_ru: normalized.subjects_ru || '',
        subjects_tj: normalized.subjects_tj || '',
        photo: null
      })
    } else {
      setFormData({
        name: '',
        name_ru: '',
        name_tj: '',
        bio: '',
        bio_ru: '',
        bio_tj: '',
        qualifications: '',
        qualifications_ru: '',
        qualifications_tj: '',
        subjects: '',
        subjects_ru: '',
        subjects_tj: '',
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

  const handleBioChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
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
      const langKeys = ['en', 'ru', 'tj']
      const fields = ['name', 'bio', 'qualifications', 'subjects']
      const isRichTextEmpty = (value) => {
        if (!value) return true
        const stripped = value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim()
        return stripped === ''
      }
      for (const lang of langKeys) {
        for (const field of fields) {
          const key = lang === 'en' ? field : `${field}_${lang}`
          const value = formData[key]
          const empty = field === 'bio' ? isRichTextEmpty(value) : !value || value.trim() === ''
          if (empty) {
            alert('Please fill all language fields for name, bio, qualifications, and subjects.')
            setLoading(false)
            return
          }
        }
      }

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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[#111827] border border-[#1f2937] rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#1f2937] flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">{teacher ? 'Edit Teacher' : 'Create Teacher'}</h2>
          <button onClick={onClose} className="text-[#9ca3af] hover:text-white text-2xl font-bold transition-colors">×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex gap-2 justify-end">
            {SUPPORTED_LANGS.map((lang) => (
              <button
                key={lang.key}
                type="button"
                onClick={() => setActiveLang(lang.key)}
                className={`px-3 py-1 text-xs font-semibold rounded-md border ${
                  activeLang === lang.key
                    ? 'bg-[#1e3a8a] text-white border-transparent'
                    : 'text-[#9ca3af] border-[#374151]'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
          <div>
            <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">Name *</label>
            <input
              type="text"
              name={activeLang === 'en' ? 'name' : `name_${activeLang}`}
              value={formData[activeLang === 'en' ? 'name' : `name_${activeLang}`]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-[#3b82f6] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">Bio</label>
            <div className="bg-[#1f2937] border border-[#374151] rounded-md">
              <ReactQuill
                value={formData[activeLang === 'en' ? 'bio' : `bio_${activeLang}`]}
                onChange={(value) =>
                  handleBioChange(activeLang === 'en' ? 'bio' : `bio_${activeLang}`, value)
                }
                theme="snow"
                style={{ minHeight: '150px' }}
                className="bg-[#1f2937]"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">Qualifications</label>
            <input
              type="text"
              name={activeLang === 'en' ? 'qualifications' : `qualifications_${activeLang}`}
              value={formData[activeLang === 'en' ? 'qualifications' : `qualifications_${activeLang}`]}
              onChange={handleChange}
              placeholder="e.g., M.A. in Education, Ph.D. in Mathematics"
              className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-[#3b82f6] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">Subjects</label>
            <input
              type="text"
              name={activeLang === 'en' ? 'subjects' : `subjects_${activeLang}`}
              value={formData[activeLang === 'en' ? 'subjects' : `subjects_${activeLang}`]}
              onChange={handleChange}
              placeholder="e.g., Mathematics, Physics"
              className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder-[#6b7280] focus:outline-none focus:border-[#3b82f6] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-2 text-[#9ca3af] uppercase tracking-wider">Photo</label>
            <input
              type="file"
              accept="image/*,.png,.jpg,.jpeg,.gif,.webp,.svg"
              onChange={handlePhotoChange}
              className="w-full px-4 py-2.5 bg-[#1f2937] border border-[#374151] rounded-md text-[#9ca3af] focus:outline-none focus:border-[#3b82f6] transition-colors"
            />
            {teacher?.photo_url && !formData.photo && (
              <div className="mt-3">
                <p className="text-xs text-[#6b7280] mb-2">Current Photo:</p>
                <img
                  src={buildImageUrl(teacher.photo_url)}
                  alt={teacher.name}
                  className="w-32 h-32 rounded-lg object-cover border-2 border-[#374151]"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            {formData.photo && (
              <div className="mt-3">
                <p className="text-xs text-[#6b7280] mb-2">New Photo Preview:</p>
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Preview"
                  className="w-32 h-32 rounded-lg object-cover border-2 border-[#374151]"
                />
              </div>
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

export default TeacherModal
