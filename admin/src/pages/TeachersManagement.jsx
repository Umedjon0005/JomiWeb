import { useState, useEffect } from 'react'
import { getTeachers, createTeacher, updateTeacher, deleteTeacher } from '../services/api'
import TeacherModal from '../components/TeacherModal'

const buildImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  // Use VITE_MEDIA_URL or default to server IP
  const mediaBase = import.meta.env.VITE_MEDIA_URL || "http://194.187.122.145:5000";
  return `${mediaBase}${path.startsWith("/") ? path : `/${path}`}`;
};

const TeachersManagement = () => {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState(null)

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const response = await getTeachers()
      setTeachers(response.data)
    } catch (error) {
      console.error('Error fetching teachers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingTeacher(null)
    setIsModalOpen(true)
  }

  const handleEdit = (item) => {
    setEditingTeacher(item)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await deleteTeacher(id)
        fetchTeachers()
      } catch (error) {
        console.error('Error deleting teacher:', error)
        alert('Error deleting teacher')
      }
    }
  }

  const handleSave = () => {
    setIsModalOpen(false)
    setEditingTeacher(null)
    fetchTeachers()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#3b82f6] border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b border-[#1f2937] pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1 tracking-tight">Teachers Management</h1>
          <p className="text-[#6b7280] text-xs font-medium uppercase tracking-wider">Content Administration</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2.5 bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-sm font-medium rounded-md transition-colors duration-150 border border-[#3b82f6]/30"
        >
          + Add Teacher
        </button>
      </div>

      <div className="bg-[#111827] border border-[#1f2937] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f172a] border-b border-[#1f2937]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Photo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Subjects</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2937]">
              {teachers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-[#6b7280]">
                    No teachers found. Click "Add Teacher" to create one.
                  </td>
                </tr>
              ) : (
                teachers.map((item) => (
                  <tr key={item.id} className="hover:bg-[#1f2937] transition-colors">
                    <td className="px-6 py-4">
                      {item.photo_url ? (
                        <img
                          src={buildImageUrl(item.photo_url)}
                          alt={item.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-[#374151]"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-16 h-16 rounded-full bg-[#1e293b] border-2 border-[#374151] flex items-center justify-center text-2xl" style={{ display: item.photo_url ? 'none' : 'flex' }}>
                        👤
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-[#9ca3af]">{item.subjects || 'N/A'}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-[#e5e7eb] text-xs font-medium rounded-md transition-colors border border-[#334155]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1.5 bg-[#7f1d1d]/20 hover:bg-[#991b1b]/30 text-[#fca5a5] text-xs font-medium rounded-md transition-colors border border-[#991b1b]/30"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <TeacherModal
          teacher={editingTeacher}
          onClose={() => {
            setIsModalOpen(false)
            setEditingTeacher(null)
          }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

export default TeachersManagement
