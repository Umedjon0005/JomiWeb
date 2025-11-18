import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getOlympiadById, MEDIA_BASE_URL } from "../services/api";

const OlympiadDetails = () => {
  const { id } = useParams();
  const [olympiad, setOlympiad] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOlympiad = async () => {
      try {
        const response = await getOlympiadById(id);
        setOlympiad(response.data);
      } catch (error) {
        console.error("Error fetching olympiad:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOlympiad();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-28 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#87CEEB]"></div>
      </div>
    );
  }

  if (!olympiad) {
    return (
      <div className="pt-28 min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <p className="text-sm uppercase tracking-[0.4em] text-gray-400 mb-4">
          Olympiad Journey
        </p>
        <h1 className="font-display text-4xl font-bold mb-6 text-gray-900">
          Olympiad not found
        </h1>
        <p className="text-gray-600 mb-6 max-w-xl">
          The journey you are looking for does not exist or has been archived.
          Please explore another highlight.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-gradient-to-r from-[#7dd3fc] to-[#c084fc] text-white rounded-full font-semibold"
        >
          Back to Home
        </Link>
      </div>
    );
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
              {["✈", "🎓", "✨", "⚙️", "📚"][idx % 5]}
            </motion.span>
          ))}
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <p className="uppercase tracking-[0.5em] text-xs text-white/70 mb-4">
            Olympiad Memoirs
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            {olympiad.title}
          </h1>
          <p className="text-lg text-white/80">
            {olympiad.location && <span>{olympiad.location} · </span>}
            {new Date(olympiad.olympiad_date).toLocaleDateString()}
          </p>
          {(olympiad.winner_name || olympiad.project_name) && (
            <div className="mt-8 inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20">
              <span className="text-sm uppercase tracking-[0.4em] text-white/70">
                Winner
              </span>
              <span className="text-base sm:text-lg font-semibold">
                {olympiad.winner_name || "N/A"}
                {olympiad.project_name && ` • ${olympiad.project_name}`}
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-400 mb-4">
              Overview
            </p>
            <div
              className="text-gray-700 leading-loose text-lg prose max-w-none"
              dangerouslySetInnerHTML={{ __html: olympiad.description }}
            />
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-400 mb-4">
              Details
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-[#7dd3fc]">☼</span>
                <span>
                  Date: {new Date(olympiad.olympiad_date).toLocaleDateString()}
                </span>
              </li>
              {olympiad.reference_url && (
                <li className="flex gap-3">
                  <span className="text-[#7dd3fc]">☼</span>
                  <a
                    href={olympiad.reference_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#7dd3fc] font-semibold"
                  >
                    Official olympiad page ↗
                  </a>
                </li>
              )}
              {olympiad.winner_name && (
                <li className="flex gap-3">
                  <span className="text-[#7dd3fc]">☼</span>
                  <span>Winner: {olympiad.winner_name}</span>
                </li>
              )}
              {olympiad.project_name && (
                <li className="flex gap-3">
                  <span className="text-[#7dd3fc]">☼</span>
                  <span>Project: {olympiad.project_name}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {(olympiad.image_url || olympiad.project_image_url) && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="uppercase tracking-[0.4em] text-xs text-gray-400 mb-2">
                  Gallery
                </p>
                <h2 className="font-display text-3xl text-gray-900">
                  Captured Moments
                </h2>
              </div>
              <Link
                to="/olympiads"
                className="px-5 py-3 bg-gradient-to-r from-[#7dd3fc] to-[#c084fc] text-white rounded-full font-semibold"
              >
                Back to olympiads
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {olympiad.image_url && (
                <div className="rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src={`${MEDIA_BASE_URL}${olympiad.image_url}`}
                    alt={olympiad.title}
                    className="h-72 w-full object-cover"
                  />
                  <p className="p-4 text-gray-600 bg-white">
                    Olympiad highlight
                  </p>
                </div>
              )}
              {olympiad.project_image_url && (
                <div className="rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src={`${MEDIA_BASE_URL}${olympiad.project_image_url}`}
                    alt={olympiad.project_name || "Project"}
                    className="h-72 w-full object-cover"
                  />
                  <p className="p-4 text-gray-600 bg-white">Winning project</p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default OlympiadDetails;
