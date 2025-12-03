import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { getTeachers, buildMediaUrl } from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import { useTranslation } from '../hooks/useTranslation'

const Teachers = () => {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef(null)
  const { language } = useLanguage()
  const { t } = useTranslation()

  useEffect(() => {
    fetchTeachers()
  }, [language])

  useEffect(() => {
    if (teachers.length === 0 || !scrollContainerRef.current) return

    const container = scrollContainerRef.current
    // Detect mobile devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768
    
    // Disable autoscroll on mobile for better performance
    if (isMobile) {
      return
    }

    let scrollPosition = 0
    let isPaused = false
    let animationFrameId = null
    const scrollSpeed = 0.5 // Slower for clearer, smoother scroll
    const cardWidth = 320 + 32 // w-80 (320px) + gap-8 (32px)
    const singleSetWidth = teachers.length * cardWidth

    const autoScroll = () => {
      if (isPaused) return
      
      scrollPosition += scrollSpeed
      
      if (scrollPosition >= singleSetWidth) {
        scrollPosition = 0
      }
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'auto' // Use instant scroll for smoother performance
      })
      
      animationFrameId = requestAnimationFrame(autoScroll)
    }

    // Pause on hover/touch
    const handleMouseEnter = () => {
      isPaused = true
    }

    const handleMouseLeave = () => {
      isPaused = false
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(autoScroll)
      }
    }

    const handleTouchStart = () => {
      isPaused = true
    }

    const handleTouchEnd = () => {
      // Resume after a short delay
      setTimeout(() => {
        isPaused = false
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(autoScroll)
        }
      }, 2000)
    }

    container.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    // Start auto-scroll after a short delay
    setTimeout(() => {
      animationFrameId = requestAnimationFrame(autoScroll)
    }, 500)

    return () => {
      isPaused = true
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [teachers])

  const fetchTeachers = async () => {
    setLoading(true)
    try {
      const response = await getTeachers(language)
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const heroVideo = "https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4";

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative min-h-[70vh] py-24 text-white overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#030711]/90 via-[#051833]/70 to-[#03121d]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(135,206,235,0.35),_transparent)]" />
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            {t("teachers.heroTitle", "Our Teachers")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            {t(
              "teachers.heroSubtitle",
              "Meet our dedicated and experienced faculty members"
            )}
          </p>
        </motion.div>
      </section>

      {/* Teachers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {teachers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">
                {t("teachers.noTeachers", "No teachers found.")}
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Horizontal scrolling container with infinite scroll */}
              <div 
                ref={scrollContainerRef}
                className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 optimized-scroll"
              >
                {/* First set of teachers */}
                {teachers.map((teacher, index) => (
                  <div
                    key={`teacher-${teacher.id}-1`}
                    className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100"
                  >
                    <div className="w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-900 shadow-xl">
                      {teacher.photo_url ? (
                        <img
                          src={buildMediaUrl(teacher.photo_url)}
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling?.style.display || (e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gray-900 flex items-center justify-center text-6xl">👤</div>');
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center text-6xl">
                          👤
                        </div>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2 text-gray-900">{teacher.name}</h3>
                    {teacher.subjects && (
                      <p className="text-gray-900 font-semibold mb-3">{teacher.subjects}</p>
                    )}
                    {teacher.qualifications && (
                      <p className="text-gray-500 text-sm italic mb-3">{teacher.qualifications}</p>
                    )}
                    {teacher.bio && (
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {teacher.bio.replace(/<[^>]*>/g, '').substring(0, 150)}
                        {teacher.bio.replace(/<[^>]*>/g, '').length > 150 ? '...' : ''}
                      </p>
                    )}
                  </div>
                ))}
                {/* Duplicate set for infinite scroll */}
                {teachers.map((teacher, index) => (
                  <div
                    key={`teacher-${teacher.id}-2`}
                    className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100"
                  >
                    <div className="w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-900 shadow-xl">
                      {teacher.photo_url ? (
                        <img
                          src={buildMediaUrl(teacher.photo_url)}
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling?.style.display || (e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gray-900 flex items-center justify-center text-6xl">👤</div>');
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center text-6xl">
                          👤
                        </div>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2 text-gray-900">{teacher.name}</h3>
                    {teacher.subjects && (
                      <p className="text-gray-900 font-semibold mb-3">{teacher.subjects}</p>
                    )}
                    {teacher.qualifications && (
                      <p className="text-gray-500 text-sm italic mb-3">{teacher.qualifications}</p>
                    )}
                    {teacher.bio && (
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {teacher.bio.replace(/<[^>]*>/g, '').substring(0, 150)}
                        {teacher.bio.replace(/<[^>]*>/g, '').length > 150 ? '...' : ''}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Teachers
