import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { olympiads } from '../data/olympiads'

const OlympiadDetails = () => {
  const { id } = useParams()
  const olympiad = olympiads.find((entry) => entry.id === id)

  if (!olympiad) {
    return (
      <div className="pt-28 min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <p className="text-sm uppercase tracking-[0.4em] text-gray-400 mb-4">Olympiad Journey</p>
        <h1 className="font-display text-4xl font-bold mb-6 text-gray-900">Story not found</h1>
        <p className="text-gray-600 mb-6 max-w-xl">
          The journey you are looking for does not exist or has been archived. Please explore another highlight.
        </p>
        <Link to="/" className="px-6 py-3 bg-gradient-to-r from-[#87CEEB] to-[#28A745] text-white rounded-full font-semibold">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <section className="relative bg-gradient-to-br from-[#0f172a] via-[#133d5c] to-[#0f172a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, idx) => (
            <motion.span
              key={idx}
              className="absolute text-5xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0, 1, 0], y: [0, -20, 0] }}
              transition={{ duration: 8 + idx, repeat: Infinity }}
            >
              {['✈', '🎓', '✨', '⚙️', '📚'][idx % 5]}
            </motion.span>
          ))}
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <p className="uppercase tracking-[0.5em] text-xs text-white/70 mb-4">Olympiad Memoirs</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">{olympiad.title}</h1>
          <p className="text-lg text-white/80">{olympiad.city} · {olympiad.year}</p>
          <div className="mt-8 inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20">
            <span className="text-sm uppercase tracking-[0.4em] text-white/70">Placement</span>
            <span className="text-xl font-bold">{olympiad.placement}</span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-400 mb-4">Mission Summary</p>
            <p className="text-gray-700 leading-loose text-lg">{olympiad.description}</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-400 mb-4">Highlights</p>
            <ul className="space-y-4 text-gray-700">
              {olympiad.achievements.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#28A745]">☼</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="uppercase tracking-[0.4em] text-xs text-gray-400 mb-2">Memories</p>
              <h2 className="font-display text-3xl text-gray-900">Captured Moments</h2>
            </div>
            <Link
              to="/events"
              className="px-5 py-3 bg-gradient-to-r from-[#87CEEB] to-[#28A745] text-white rounded-full font-semibold"
            >
              Upcoming Events
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {olympiad.photos.map((shot) => (
              <div key={shot.url} className="rounded-3xl overflow-hidden shadow-lg group">
                <img src={shot.url} alt={shot.caption} className="h-64 w-full object-cover group-hover:scale-105 transition" />
                <p className="p-4 text-gray-600 bg-white">{shot.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default OlympiadDetails

