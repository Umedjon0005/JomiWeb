import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getOlympiadById, buildMediaUrl } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

const OlympiadDetails = () => {
  const { id } = useParams();
  const [olympiad, setOlympiad] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchOlympiad = async () => {
      try {
        const response = await getOlympiadById(id, language);
        setOlympiad(response.data);
      } catch (error) {
        console.error("Error fetching olympiad:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOlympiad();
  }, [id, language]);

  if (loading) {
    return (
      <div className="pt-28 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
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
          className="px-6 py-3 bg-gray-900 text-white rounded-full font-semibold"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const heroVideo = "https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4";

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <section className="relative min-h-[60vh] text-white overflow-hidden">
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
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 text-center">
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
                <span className="text-gray-700">☼</span>
                <span>
                  Date: {new Date(olympiad.olympiad_date).toLocaleDateString()}
                </span>
              </li>
              {olympiad.reference_url && (
                <li className="flex gap-3">
                  <span className="text-gray-700">☼</span>
                  <a
                    href={olympiad.reference_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-900 font-semibold"
                  >
                    Official olympiad page ↗
                  </a>
                </li>
              )}
              {olympiad.winner_name && (
                <li className="flex gap-3">
                  <span className="text-gray-700">☼</span>
                  <span>Winner: {olympiad.winner_name}</span>
                </li>
              )}
              {olympiad.project_name && (
                <li className="flex gap-3">
                  <span className="text-gray-700">☼</span>
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
                    src={buildMediaUrl(olympiad.image_url)}
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
                    src={buildMediaUrl(olympiad.project_image_url)}
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
