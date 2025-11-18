import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getOlympiads, MEDIA_BASE_URL } from "../services/api";
import { Link } from "react-router-dom";

const Olympiads = () => {
  const [olympiads, setOlympiads] = useState([]);
  const [filteredOlympiads, setFilteredOlympiads] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOlympiads();
  }, []);

  useEffect(() => {
    filterOlympiads();
  }, [olympiads, filter]);

  const fetchOlympiads = async () => {
    try {
      const response = await getOlympiads();
      setOlympiads(response.data);
    } catch (error) {
      console.error("Error fetching olympiads:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterOlympiads = () => {
    const now = new Date();
    let filtered = [];

    if (filter === "upcoming") {
      filtered = olympiads.filter((o) => new Date(o.olympiad_date) >= now);
    } else if (filter === "past") {
      filtered = olympiads.filter((o) => new Date(o.olympiad_date) < now);
    } else {
      filtered = olympiads;
    }

    filtered.sort(
      (a, b) => new Date(b.olympiad_date) - new Date(a.olympiad_date)
    );
    setFilteredOlympiads(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#87CEEB]"></div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-[#050b16] via-[#111c34] to-[#050b16] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            Olympiads
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Discover our students&apos; achievements in national and
            international olympiads
          </p>
        </motion.div>
      </section>

      {/* Olympiads */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["all", "upcoming", "past"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${
                  filter === f
                    ? "bg-gradient-to-r from-[#7dd3fc] to-[#c084fc] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {f === "all" ? "All Olympiads" : f}
              </button>
            ))}
          </div>

          {filteredOlympiads.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No olympiads found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredOlympiads.map((olympiad, index) => (
                <motion.div
                  key={olympiad.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {olympiad.image_url && (
                    <div className="h-56 overflow-hidden">
                      <img
                        src={`${MEDIA_BASE_URL}${olympiad.image_url}`}
                        alt={olympiad.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-3">
                    <h3 className="font-display text-2xl font-bold text-gray-900">
                      {olympiad.title}
                    </h3>
                    <p
                      className="text-gray-600 line-clamp-3 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: olympiad.description }}
                    />
                    <div className="space-y-1 text-sm text-gray-500 border-t pt-3">
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>
                          {new Date(olympiad.olympiad_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      {olympiad.location && (
                        <div className="flex items-center gap-2">
                          <span>📍</span>
                          <span>{olympiad.location}</span>
                        </div>
                      )}
                      {(olympiad.winner_name || olympiad.project_name) && (
                        <div className="pt-2 text-sm text-gray-600">
                          <p className="font-semibold text-gray-800">
                            Winner: {olympiad.winner_name || "N/A"}
                          </p>
                          {olympiad.project_name && (
                            <p>Project: {olympiad.project_name}</p>
                          )}
                        </div>
                      )}
                      {olympiad.reference_url && (
                        <div className="pt-2">
                          <a
                            href={olympiad.reference_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#7dd3fc]"
                          >
                            Official olympiad page
                            <span>↗</span>
                          </a>
                        </div>
                      )}
                    </div>
                    {olympiad.project_image_url && (
                      <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
                        <img
                          src={`${MEDIA_BASE_URL}${olympiad.project_image_url}`}
                          alt={olympiad.project_name || "Project"}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}
                    <div className="pt-3">
                      <Link
                        to={`/olympiads/${olympiad.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#87CEEB]"
                      >
                        View details
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Olympiads;
