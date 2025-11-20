import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getEvents, buildMediaUrl } from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import { useTranslation } from '../hooks/useTranslation'

const Events = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()
  const { t } = useTranslation()

  useEffect(() => {
    fetchEvents()
  }, [language])

  useEffect(() => {
    filterEvents()
  }, [events, filter])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const response = await getEvents(language)
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterEvents = () => {
    const now = new Date()
    let filtered = []

    if (filter === 'upcoming') {
      filtered = events.filter(event => new Date(event.event_date) >= now)
    } else if (filter === 'past') {
      filtered = events.filter(event => new Date(event.event_date) < now)
    } else {
      filtered = events
    }

    filtered.sort((a, b) => new Date(b.event_date) - new Date(a.event_date))
    setFilteredEvents(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#87CEEB]"></div>
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
            {t("events.heroTitle", "Events")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            {t("events.heroSubtitle", "Stay connected with our school community events")}
          </p>
        </motion.div>
      </section>

      {/* Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'upcoming', 'past'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${
                  filter === f
                    ? 'bg-gradient-to-r from-[#7dd3fc] to-[#c084fc] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {t(`events.filters.${f}`, f === 'all' ? 'All Events' : f)}
              </button>
            ))}
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">{t("events.noEvents", "No events found.")}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {event.image_url && (
                    <div className="h-56 overflow-hidden">
                      <img
                        src={buildMediaUrl(event.image_url)}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-bold mb-3 text-gray-900">{event.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{event.description}</p>
                    <div className="space-y-2 text-sm text-gray-500 border-t pt-4">
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>
                          {new Date(event.event_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <span>📍</span>
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Events
