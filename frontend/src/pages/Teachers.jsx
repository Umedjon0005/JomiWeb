import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getTeachers, MEDIA_BASE_URL } from '../services/api'

const Teachers = () => {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#87CEEB]"></div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-[#87CEEB] via-[#28A745] to-[#87CEEB] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">Our Teachers</h1>
          <p className="text-xl md:text-2xl text-white/90">
            Meet our dedicated and experienced faculty members
          </p>
        </motion.div>
      </section>

      {/* Teachers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {teachers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No teachers found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teachers.map((teacher, index) => (
                <motion.div
                  key={teacher.id}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#87CEEB] shadow-xl">
                    {teacher.photo_url ? (
                      <img
                        src={`${MEDIA_BASE_URL}${teacher.photo_url}`}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#87CEEB] to-[#28A745] flex items-center justify-center text-6xl">
                        👤
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2 text-gray-900">{teacher.name}</h3>
                  {teacher.subjects && (
                    <p className="text-[#87CEEB] font-semibold mb-3">{teacher.subjects}</p>
                  )}
                  {teacher.qualifications && (
                    <p className="text-gray-500 text-sm italic mb-3">{teacher.qualifications}</p>
                  )}
                  {teacher.bio && (
                    <p className="text-gray-600 text-sm leading-relaxed">{teacher.bio}</p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Teachers
