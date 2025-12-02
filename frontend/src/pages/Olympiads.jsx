import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getOlympiads, buildMediaUrl } from "../services/api";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";

const Olympiads = () => {
  const [olympiads, setOlympiads] = useState([]);
  const [filteredOlympiads, setFilteredOlympiads] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    fetchOlympiads();
  }, [language]);

  useEffect(() => {
    filterOlympiads();
  }, [olympiads, filter]);

  const fetchOlympiads = async () => {
    try {
      const response = await getOlympiads(language);
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
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
            {t("olympiads.heroTitle", "Olympiads")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            {t("olympiads.heroSubtitle", "Discover our students' achievements in national and international olympiads")}
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
                    ? "bg-gray-900 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {t(`olympiads.filters.${f}`, f === "all" ? "All Olympiads" : f)}
              </button>
            ))}
          </div>

          {filteredOlympiads.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">{t("olympiads.noOlympiads", "No olympiads found.")}</p>
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
                        src={buildMediaUrl(olympiad.image_url)}
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
                            {t("olympiads.winner", "Winner")}: {olympiad.winner_name || "N/A"}
                          </p>
                          {olympiad.project_name && (
                            <p>{t("olympiads.project", "Project")}: {olympiad.project_name}</p>
                          )}
                        </div>
                      )}
                      {olympiad.reference_url && (
                        <div className="pt-2">
                          <a
                            href={olympiad.reference_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900"
                          >
                            {t("olympiads.officialPage", "Official olympiad page")}
                            <span>↗</span>
                          </a>
                        </div>
                      )}
                    </div>
                    {olympiad.project_image_url && (
                      <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
                        <img
                          src={buildMediaUrl(olympiad.project_image_url)}
                          alt={olympiad.project_name || "Project"}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}
                    <div className="pt-3">
                      <Link
                        to={`/olympiads/${olympiad.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e3a8a]"
                      >
                        {t("olympiads.viewDetails", "View details")}
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
