import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getAboutContent } from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import { useTranslation } from '../hooks/useTranslation'

const About = () => {
  const [aboutContent, setAboutContent] = useState([])
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()
  const { t } = useTranslation()

  useEffect(() => {
    fetchAboutContent()
  }, [language])

  const fetchAboutContent = async () => {
    try {
      const response = await getAboutContent(language)
      setAboutContent(response.data)
    } catch (error) {
      console.error('Error fetching about content:', error)
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

  const mission = aboutContent.find(item => item.section_key === 'mission')
  const vision = aboutContent.find(item => item.section_key === 'vision')
  const history = aboutContent.find(item => item.section_key === 'history')

  const values = [
    { icon: '🎯', title: 'Excellence', desc: 'Striving for the highest standards in everything we do' },
    { icon: '🤝', title: 'Integrity', desc: 'Building trust through honesty and transparency' },
    { icon: '💡', title: 'Innovation', desc: 'Embracing new ideas and creative solutions' },
    { icon: '❤️', title: 'Compassion', desc: 'Caring for each individual in our community' }
  ]

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
            {t("about.heroTitle", "About Us")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            {t(
              "about.heroSubtitle",
              "Discover our story, mission, and commitment to excellence"
            )}
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {mission && (
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-[#87CEEB]">
                {mission.title}
              </h2>
              <div className="text-gray-700 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: mission.content }} />
            </motion.div>
          )}

          {vision && (
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-[#7dd3fc]">
                {vision.title}
              </h2>
              <div className="text-gray-700 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: vision.content }} />
            </motion.div>
          )}

          {history && (
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#7dd3fc] to-[#c084fc] bg-clip-text text-transparent">
                {history.title}
              </h2>
              <div className="text-gray-700 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: history.content }} />
            </motion.div>
          )}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7dd3fc] to-[#c084fc] bg-clip-text text-transparent">
              Our Core Values
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="font-display text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
