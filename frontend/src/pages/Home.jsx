import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getNews, getEvents, getTeachers, getStats, MEDIA_BASE_URL } from '../services/api'
import { olympiads } from '../data/olympiads'

const Home = () => {
  const [news, setNews] = useState([])
  const [events, setEvents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [stats, setStats] = useState([])
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const featuredOlympiads = olympiads.slice(0, 3)

  const boardingHighlights = [
    {
      title: 'Modern Dormitory',
      description: 'Panoramic study lounges, wellness pods, and calming biophilic interiors for boarders.',
      icon: '🏛️',
      accent: 'from-[#87CEEB]/30 via-white to-transparent'
    },
    {
      title: 'Clubs & Activities',
      description: '70+ student-led clubs, midnight astronomy, culinary labs, creative media studio.',
      icon: '🎨',
      accent: 'from-[#28A745]/30 via-white to-transparent'
    },
    {
      title: 'Weekend Adventures',
      description: 'Eco-hikes, cultural immersions, and leadership retreats around the region.',
      icon: '🧭',
      accent: 'from-[#a5b4fc]/30 via-white to-transparent'
    },
  ]

  const globalHighlights = featuredOlympiads.map((entry) => ({
    id: entry.id,
    destination: entry.city,
    highlight: entry.title,
    detail: `${entry.year} • ${entry.placement}`,
  }))
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (news.length > 0) {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % news.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [news])

  const fetchData = async () => {
    try {
      const [newsRes, eventsRes, teachersRes, statsRes] = await Promise.all([
        getNews(),
        getEvents(),
        getTeachers(),
        getStats()
      ])
      setNews(newsRes.data)
      setEvents(eventsRes.data.slice(0, 3))
      setTeachers(teachersRes.data.slice(0, 4))
      setStats(statsRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#87CEEB]"></div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#133d5c] to-[#0f172a] text-white">
        <div className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, idx) => (
            <motion.span
              key={idx}
              className="absolute text-6xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0, 1, 0], y: [0, -10, 0] }}
              transition={{ duration: 6 + idx, repeat: Infinity }}
            >
              {['✨', '📘', '🌿', '🌍', '🎓'][idx % 5]}
            </motion.span>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="uppercase tracking-[0.4em] text-xs text-white/70 mb-6">Beyond Classrooms</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              Inspiring Scholars, Olympians & Global Citizens
            </h1>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              A boarding community where academic brilliance, dormitory comfort, and international competitions converge. From science Olympiads abroad to midnight design studios, we handcraft future-ready journeys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a className="px-8 py-4 bg-gradient-to-r from-[#87CEEB] to-[#28A745] text-white font-semibold rounded-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" href="#dormitory">
                Explore Campus Life
              </a>
              <a className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white hover:text-[#0f172a] transition-all duration-300" href="/about">
                Discover our Story
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">Signature Snapshot</div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-white/60">Olympiad Delegations</p>
                  <p className="text-3xl font-bold">+18</p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Dormitory Wings</p>
                  <p className="text-3xl font-bold">4</p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Boarding Students</p>
                  <p className="text-3xl font-bold">{stats.find(s => s.stat_key === 'students')?.stat_value || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Global Cities</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">🌍</div>
                <div>
                  <p className="text-white font-semibold">Geneva Science Olympiad Team</p>
                  <p className="text-white/70 text-sm">Gold medalists • Robotics & AI</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-[#87CEEB] to-[#28A745] bg-clip-text text-transparent mb-2">
                  {stat.stat_value}+
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Carousel */}
      {news.length > 0 && (
        <section className="py-20 bg-gray-50" id="explore">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#87CEEB] to-[#28A745] bg-clip-text text-transparent">
                Latest News
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Stay updated with our latest announcements and achievements
              </p>
            </div>
            
            <div className="relative max-w-5xl mx-auto">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                {news.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={`absolute inset-0 ${index === currentNewsIndex ? 'z-10' : 'z-0'}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                      opacity: index === currentNewsIndex ? 1 : 0,
                      x: index === currentNewsIndex ? 0 : 100
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex h-full">
                      {item.image_url && (
                        <div className="w-1/2 hidden md:block">
                          <img
                            src={`${MEDIA_BASE_URL}${item.image_url}`}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className={`${item.image_url ? 'w-full md:w-1/2' : 'w-full'} bg-white p-8 md:p-12 flex flex-col justify-center`}>
                        <h3 className="font-display text-3xl font-bold mb-4 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-4">
                          {item.content.substring(0, 200)}...
                        </p>
                        <span className="text-[#87CEEB] font-semibold">
                          {new Date(item.publish_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center gap-2 mt-6">
                {news.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentNewsIndex
                        ? 'w-8 bg-gradient-to-r from-[#87CEEB] to-[#28A745]'
                        : 'w-2 bg-gray-300'
                    }`}
                    onClick={() => setCurrentNewsIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Events */}
      {events.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#87CEEB] to-[#28A745] bg-clip-text text-transparent">
                Upcoming Events
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Join us for these exciting upcoming events
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {event.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={`${MEDIA_BASE_URL}${event.image_url}`}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold mb-3 text-gray-900">{event.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{event.description.substring(0, 100)}...</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>{new Date(event.event_date).toLocaleDateString()}</span>
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
            
            <div className="text-center">
              <a
                href="/events"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#87CEEB] to-[#28A745] text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                View All Events
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Boarding & Activities */}
      <section id="dormitory" className="py-20 bg-gradient-to-br from-[#f0fdfa] to-[#f5f3ff] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-64 h-64 bg-[#87CEEB]/40 blur-3xl absolute -top-10 -left-10"></div>
          <div className="w-72 h-72 bg-[#28A745]/40 blur-3xl absolute bottom-0 right-0"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="uppercase tracking-[0.4em] text-xs text-gray-500 mb-4">Dormitory & Residential Life</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                A Calm, Connected sanctuary that feels like home
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our dormitory integrates wellness pods, panoramic study decks, and quiet ateliers. Evening fireside forums, global cuisine nights, and mentorship suites make boarding unforgettable.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                <div className="p-5 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-2">Spaces</p>
                  <p className="text-xl font-semibold text-gray-900">Meditation loft • Recording lab • Sky court</p>
                </div>
                <div className="p-5 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-2">Community</p>
                  <p className="text-xl font-semibold text-gray-900">House competitions, late-night tutoring, global roommates</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="flex-1 grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {boardingHighlights.map((highlight, index) => (
                <div key={index} className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                  <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${highlight.accent} flex items-center justify-center text-4xl mb-4`}>
                    {highlight.icon}
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3 text-gray-900">{highlight.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Achievements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-gray-400 mb-4">Olympiad Journeys</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#87CEEB] to-[#28A745] bg-clip-text text-transparent">
              Global Footprints & Victories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Teams from our school travel across continents for Olympiads, cultural forums, and innovation labs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {globalHighlights.map((trip, index) => (
              <motion.div
                key={trip.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-gray-400 mb-4">
                  <span className="text-xl">✈</span>
                  <span>{trip.destination}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">{trip.highlight}</h3>
                <p className="text-gray-600 mb-6">{trip.detail}</p>
                <Link
                  to={`/olympiads/${trip.id}`}
                  className="inline-flex items-center gap-2 font-semibold text-[#28A745]"
                >
                  View journey
                  <span className="h-6 w-6 rounded-full bg-[#28A745]/10 flex items-center justify-center group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/events"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-gray-200 hover:shadow-lg transition"
            >
              Explore upcoming delegations
              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Teachers */}
      {teachers.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#87CEEB] to-[#28A745] bg-clip-text text-transparent">
                Our Expert Teachers
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Meet our dedicated and experienced faculty members
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {teachers.map((teacher, index) => (
                <motion.div
                  key={teacher.id}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#87CEEB] shadow-lg">
                    {teacher.photo_url ? (
                      <img
                        src={`${MEDIA_BASE_URL}${teacher.photo_url}`}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#87CEEB] to-[#28A745] flex items-center justify-center text-5xl">
                        👤
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2 text-gray-900">{teacher.name}</h3>
                  {teacher.subjects && (
                    <p className="text-[#87CEEB] font-semibold mb-2">{teacher.subjects}</p>
                  )}
                  {teacher.bio && (
                    <p className="text-gray-600 text-sm line-clamp-3">{teacher.bio.substring(0, 100)}...</p>
                  )}
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <a
                href="/teachers"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#87CEEB] to-[#28A745] text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Meet All Teachers
              </a>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#87CEEB] to-[#28A745]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join our community of learners and discover your potential
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-[#87CEEB] font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Get Started
              </a>
              <a
                href="/about"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#87CEEB] transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
