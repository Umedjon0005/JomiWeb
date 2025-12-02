import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getNews,
  getEvents,
  getTeachers,
  getStats,
  getOlympiads,
  getMoments,
  buildMediaUrl,
} from "../services/api";
import PhotoShowcase from "../components/PhotoShowcase";
import MomentsGallery from "../components/MomentsGallery";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";

// Helper function to strip HTML tags and get plain text
const stripHtml = (html) => {
  if (!html) return "";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const defaultHeroStats = [
  {
    label: "Global Delegations",
    value: "18+",
    detail: "Olympiad teams / yr",
  },
  { label: "Boarding Studios", value: "12", detail: "creative + STEM labs" },
  { label: "Scholar Projects", value: "140", detail: "mentored annually" },
];

const defaultJourneyTimeline = [
  {
    title: "Ignite Phase",
    time: "September",
    detail:
      "Hackathons, studio residencies, and design sprints kick off the academic year.",
  },
  {
    title: "Explore Phase",
    time: "January",
    detail:
      "Delegations travel to Berlin, Warsaw, Dubai, and beyond for Olympiads and exchanges.",
  },
  {
    title: "Impact Phase",
    time: "May",
    detail:
      "Finale showcases combine research, installations, and community changemaker labs.",
  },
];

const defaultBoardingHighlights = [
  {
    title: "Modern Dormitory",
    description:
      "Panoramic study lounges, wellness pods, and calming biophilic interiors for boarders.",
    icon: "🏛️",
    accent: "from-gray-900/20 via-white to-transparent",
  },
  {
    title: "Clubs & Activities",
    description:
      "70+ student-led clubs, midnight astronomy, culinary labs, creative media studio.",
    icon: "🎨",
    accent: "from-gray-900/20 via-white to-transparent",
  },
  {
    title: "Weekend Adventures",
    description:
      "Eco-hikes, cultural immersions, and leadership retreats around the region.",
    icon: "🧭",
    accent: "from-gray-800/20 via-white to-transparent",
  },
];

const Home = () => {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [stats, setStats] = useState([]);
  const [olympiads, setOlympiads] = useState([]);
  const [moments, setMoments] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const teachersScrollRef = useRef(null);
  const teachersScrollCleanupRef = useRef(null);
  const teachersScrollTimeoutRef = useRef(null);
  const { language } = useLanguage();
  const { t } = useTranslation();
  const heroStats = t("home.liveDashboard.stats", defaultHeroStats);
  const liveDashboardTitle = t("home.liveDashboard.title", "Live Dashboard");
  const featuredTitle = t(
    "home.liveDashboard.featuredTitle",
    "Geneva Science Olympiad Team"
  );
  const featuredDetail = t(
    "home.liveDashboard.featuredDetail",
    "Gold Medal • Greenhouse Automation"
  );
  const journeyCopy = {
    kicker: t("home.journey.kicker", "Year in Motion"),
    title: t(
      "home.journey.title",
      "A curated journey for residents & delegates"
    ),
    button: t("home.journey.button", "Upcoming experiences"),
  };
  const journeyMoments = t("home.journey.timeline", defaultJourneyTimeline);
  const newsCopy = {
    title: t("home.news.title", "Latest News"),
    subtitle: t(
      "home.news.subtitle",
      "Stay updated with our latest announcements and achievements"
    ),
  };
  const eventsCopy = {
    title: t("home.events.title", "Upcoming Events"),
    subtitle: t(
      "home.events.subtitle",
      "Join us for these exciting upcoming events"
    ),
    button: t("home.events.button", "View All Events"),
  };
  const boardingCopy = {
    kicker: t("home.boarding.kicker", "Dormitory & Residential Life"),
    title: t(
      "home.boarding.title",
      "A Calm, Connected sanctuary that feels like home"
    ),
    description: t(
      "home.boarding.description",
      "Our dormitory integrates wellness pods, panoramic study decks, and quiet ateliers. Evening fireside forums, global cuisine nights, and mentorship suites make boarding unforgettable."
    ),
    cards: {
      spacesTitle: t("home.boarding.cards.spacesTitle", "Spaces"),
      spacesDescription: t(
        "home.boarding.cards.spacesDescription",
        "Meditation loft • Recording lab • Sky court"
      ),
      communityTitle: t("home.boarding.cards.communityTitle", "Community"),
      communityDescription: t(
        "home.boarding.cards.communityDescription",
        "House competitions, late-night tutoring, global roommates"
      ),
    },
  };
  const boardingHighlights = t(
    "home.boarding.highlights",
    defaultBoardingHighlights
  );
  const globalHighlightsCopy = {
    kicker: t("home.globalHighlights.kicker", "Olympiad Journeys"),
    title: t(
      "home.globalHighlights.title",
      "Global Footprints & Victories"
    ),
    subtitle: t(
      "home.globalHighlights.subtitle",
      "Teams from our school travel across continents for Olympiads, cultural forums, and innovation labs."
    ),
    button: t(
      "home.globalHighlights.button",
      "Explore upcoming delegations"
    ),
    viewJourney: t("home.globalHighlights.viewJourney", "View journey"),
    defaultDestination: t(
      "home.globalHighlights.defaultDestination",
      "Olympiad"
    ),
  };
  const teachersCopy = {
    title: t("home.teachers.title", "Our Expert Teachers"),
    subtitle: t(
      "home.teachers.subtitle",
      "Meet our dedicated and experienced faculty members"
    ),
    button: t("home.teachers.button", "Meet All Teachers"),
  };
  const ctaCopy = {
    title: t("home.cta.title", "Ready to Begin Your Journey?"),
    subtitle: t(
      "home.cta.subtitle",
      "Join our community of learners and discover your potential"
    ),
    primaryButton: t("home.cta.primaryButton", "Get Started"),
    secondaryButton: t("home.cta.secondaryButton", "Learn More"),
  };

  const heroVideo =
    "https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4";

  const eventCoverPool = [
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=60",
    "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1200&q=60",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60",
    "https://images.unsplash.com/photo-1455885666463-1c1ecaf495ad?auto=format&fit=crop&w=1200&q=60",
  ];

  const globalHighlights = olympiads.slice(0, 3).map((entry) => ({
    id: entry.id,
    destination: entry.location || globalHighlightsCopy.defaultDestination,
    highlight: entry.title,
    detail: new Date(entry.olympiad_date).toLocaleDateString(),
  }));

  const cleanupTeacherScroll = useCallback(() => {
    if (teachersScrollTimeoutRef.current) {
      clearTimeout(teachersScrollTimeoutRef.current);
      teachersScrollTimeoutRef.current = null;
    }
    if (teachersScrollCleanupRef.current) {
      teachersScrollCleanupRef.current();
      teachersScrollCleanupRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % news.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [news]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [
        newsRes,
        eventsRes,
        teachersRes,
        statsRes,
        olympiadsRes,
        momentsRes,
      ] = await Promise.all([
        getNews(language),
        getEvents(language),
        getTeachers(language),
        getStats(language),
        getOlympiads(language),
        getMoments(language),
      ]);
      setNews(newsRes.data);
      setEvents(eventsRes.data.slice(0, 3));
      setTeachers(teachersRes.data.slice(0, 4));

      cleanupTeacherScroll();

      teachersScrollTimeoutRef.current = setTimeout(() => {
        if (teachersScrollRef.current && teachersRes.data.length > 0) {
          const container = teachersScrollRef.current;
          // Detect mobile devices
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
          
          // Disable autoscroll on mobile for better performance
          if (isMobile) {
            teachersScrollCleanupRef.current = () => {};
            return;
          }

          let scrollPosition = 0;
          const scrollSpeed = 0.8; // Reduced for smoother performance
          let animationFrameId;
          let lastTime = performance.now();
          const targetFPS = 60;
          const frameInterval = 1000 / targetFPS;
          
          const cardWidth = 320 + 32; // w-80 (320px) + gap-8 (32px)
          const singleSetWidth = teachersRes.data.slice(0, 4).length * cardWidth;

          const autoScroll = (currentTime) => {
            const deltaTime = currentTime - lastTime;
            
            // Throttle to target FPS for smoother performance
            if (deltaTime >= frameInterval) {
              scrollPosition += scrollSpeed * (deltaTime / frameInterval);

              if (scrollPosition >= singleSetWidth) {
                scrollPosition = scrollPosition - singleSetWidth;
              }

              container.scrollLeft = scrollPosition;
              lastTime = currentTime - (deltaTime % frameInterval);
            }

            animationFrameId = requestAnimationFrame(autoScroll);
          };

          const handleMouseEnter = () => {
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
            }
          };

          const handleMouseLeave = () => {
            lastTime = performance.now();
            animationFrameId = requestAnimationFrame(autoScroll);
          };

          const handleTouchStart = () => {
            // Pause on touch (mobile interaction)
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
            }
          };

          container.addEventListener("mouseenter", handleMouseEnter);
          container.addEventListener("mouseleave", handleMouseLeave);
          container.addEventListener("touchstart", handleTouchStart, { passive: true });

          animationFrameId = requestAnimationFrame(autoScroll);

          teachersScrollCleanupRef.current = () => {
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
            }
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
            container.removeEventListener("touchstart", handleTouchStart);
          };
        }
        teachersScrollTimeoutRef.current = null;
      }, 1000);

      setStats(statsRes.data);
      setOlympiads(olympiadsRes.data);
      setMoments(momentsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [cleanupTeacherScroll, language]);

  useEffect(() => {
    fetchData();
    return () => cleanupTeacherScroll();
  }, [fetchData, cleanupTeacherScroll]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] pt-20 text-white overflow-hidden">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p
              className="uppercase tracking-[0.5em] text-xs text-white/70 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t("hero.kicker", "Boarding • Olympiad • Studio")}
            </motion.p>
            <motion.h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              {t(
                "hero.title",
                "Where curiosity fuels victories and creativity never sleeps."
              )}
            </motion.h1>
            <motion.p
              className="text-lg text-white/85 mb-10 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              {t(
                "hero.subtitle",
                "Explore a campus that feels like a boutique city—neon-lit labs, panoramic dormitories, and teams gearing up for voyages from Berlin to Batumi."
              )}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <a
                className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full shadow-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                href="#experience"
              >
                {t("hero.primaryCta", "Plan a Visit")}
              </a>
              <Link
                to="/olympiads"
                className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
              >
                {t("hero.secondaryCta", "Olympiad Stories")}
                <span>↗</span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="bg-white/10 rounded-3xl p-8 backdrop-blur-2xl border border-white/20 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="text-sm uppercase tracking-[0.35em] text-white/70 mb-6">
              {liveDashboardTitle}
            </div>
            <div className="space-y-6">
              {heroStats.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-b border-white/10 pb-4 last:border-none last:pb-0"
                >
                  <div>
                    <p className="text-sm text-white/60">{item.label}</p>
                    <p className="text-white/60 text-xs">{item.detail}</p>
                  </div>
                  <p className="text-3xl font-bold text-white">{item.value}</p>
                </div>
              ))}
              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-full bg-gray-900/30 flex items-center justify-center text-2xl">
                  🌍
                </div>
                <div>
                  <p className="text-white font-semibold">
                    {featuredTitle}
                  </p>
                  <p className="text-white/70 text-sm">
                    {featuredDetail}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute -bottom-16 -right-10 w-72 h-72 bg-gray-900/30 blur-[80px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </section>

      {/* Experience Timeline */}
      <section
        id="experience"
        className="relative z-20 -mt-12 bg-white rounded-[32px] shadow-2xl mx-4 sm:mx-8 lg:mx-auto max-w-6xl px-6 py-12"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="uppercase tracking-[0.4em] text-xs text-gray-400">
                {journeyCopy.kicker}
              </p>
              <h2 className="font-display text-3xl font-bold text-gray-900">
                {journeyCopy.title}
              </h2>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              {journeyCopy.button}
              <span>↗</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {journeyMoments.map((moment, index) => (
              <motion.div
                key={moment.title}
                className="rounded-2xl border border-gray-100 p-6 shadow-lg bg-white/80"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-gray-700">
                  {moment.time}
                </p>
                <h3 className="font-display text-2xl font-semibold text-gray-900 mt-2 mb-3">
                  {moment.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{moment.detail}</p>
              </motion.div>
            ))}
          </div>
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
                <div className="text-5xl font-bold text-gray-900 mb-2">
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
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                {newsCopy.title}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {newsCopy.subtitle}
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                {news.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={`absolute inset-0 ${
                      index === currentNewsIndex ? "z-10" : "z-0"
                    }`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                      opacity: index === currentNewsIndex ? 1 : 0,
                      x: index === currentNewsIndex ? 0 : 100,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex h-full">
                      {item.image_url && (
                        <div className="w-1/2 hidden md:block">
                          <img
                            src={buildMediaUrl(item.image_url)}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div
                        className={`${
                          item.image_url ? "w-full md:w-1/2" : "w-full"
                        } bg-white p-8 md:p-12 flex flex-col justify-center`}
                      >
                        <h3 className="font-display text-3xl font-bold mb-4 text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-4">
                          {stripHtml(item.content).substring(0, 200)}
                          {stripHtml(item.content).length > 200 ? "..." : ""}
                        </p>
                        <span className="text-gray-700 font-semibold">
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
                        ? "w-8 bg-gray-900"
                        : "w-2 bg-gray-300"
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
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                {eventsCopy.title}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {eventsCopy.subtitle}
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
                  <div className="h-48 overflow-hidden">
                    <img
                      src={
                        event.image_url
                          ? buildMediaUrl(event.image_url)
                          : eventCoverPool[index % eventCoverPool.length]
                      }
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold mb-3 text-gray-900">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {stripHtml(event.description).substring(0, 100)}
                      {stripHtml(event.description).length > 100 ? "..." : ""}
                    </p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>
                          {new Date(event.event_date).toLocaleDateString()}
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

            <div className="text-center">
              <a
                href="/events"
                className="inline-block px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {eventsCopy.button}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Boarding & Activities */}
      <section
        id="dormitory"
        className="py-20 bg-gradient-to-br from-[#f0fdfa] to-[#f5f3ff] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="w-64 h-64 bg-gray-900/20 blur-3xl absolute -top-10 -left-10"></div>
          <div className="w-72 h-72 bg-gray-800/20 blur-3xl absolute bottom-0 right-0"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="uppercase tracking-[0.4em] text-xs text-gray-500 mb-4">
                {boardingCopy.kicker}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                {boardingCopy.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {boardingCopy.description}
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                <div className="p-5 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-2">
                    {boardingCopy.cards.spacesTitle}
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {boardingCopy.cards.spacesDescription}
                  </p>
                </div>
                <div className="p-5 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-2">
                    {boardingCopy.cards.communityTitle}
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {boardingCopy.cards.communityDescription}
                  </p>
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
                <div
                  key={index}
                  className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                >
                  <div
                    className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${highlight.accent} flex items-center justify-center text-4xl mb-4`}
                  >
                    {highlight.icon}
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3 text-gray-900">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {highlight.description}
                  </p>
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
            <p className="uppercase tracking-[0.3em] text-xs text-gray-400 mb-4">
              {globalHighlightsCopy.kicker}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {globalHighlightsCopy.title}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {globalHighlightsCopy.subtitle}
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
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">
                  {trip.highlight}
                </h3>
                <p className="text-gray-600 mb-6">{trip.detail}</p>
                <Link
                  to={`/olympiads/${trip.id}`}
                  className="inline-flex items-center gap-2 font-semibold text-gray-900"
                >
                  {globalHighlightsCopy.viewJourney}
                    <span className="h-6 w-6 rounded-full bg-gray-900/10 flex items-center justify-center group-hover:translate-x-1 transition-all duration-300">
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
              {globalHighlightsCopy.button}
              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>

      <PhotoShowcase />
      <MomentsGallery moments={moments} />

      {/* Featured Teachers */}
      {teachers.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                {teachersCopy.title}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {teachersCopy.subtitle}
              </p>
            </div>

            <div className="relative">
              <div 
                ref={teachersScrollRef}
                className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {/* First set of teachers */}
                {teachers.map((teacher, index) => (
                  <motion.div
                    key={`teacher-${teacher.id}-1`}
                    className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-900 shadow-lg">
                      {teacher.photo_url ? (
                        <img
                          src={buildMediaUrl(teacher.photo_url)}
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center text-5xl">
                          👤
                        </div>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2 text-gray-900">
                      {teacher.name}
                    </h3>
                    {teacher.subjects && (
                      <p className="text-gray-900 font-semibold mb-2">
                        {teacher.subjects}
                      </p>
                    )}
                    {teacher.bio && (
                      <div className="text-gray-600 text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: teacher.bio.substring(0, 100) + '...' }} />
                    )}
                  </motion.div>
                ))}
                {/* Duplicate set for infinite scroll */}
                {teachers.map((teacher, index) => (
                  <motion.div
                    key={`teacher-${teacher.id}-2`}
                    className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-900 shadow-lg">
                      {teacher.photo_url ? (
                        <img
                          src={buildMediaUrl(teacher.photo_url)}
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center text-5xl">
                          👤
                        </div>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2 text-gray-900">
                      {teacher.name}
                    </h3>
                    {teacher.subjects && (
                      <p className="text-gray-900 font-semibold mb-2">
                        {teacher.subjects}
                      </p>
                    )}
                    {teacher.bio && (
                      <div className="text-gray-600 text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: teacher.bio.substring(0, 100) + '...' }} />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <a
                href="/teachers"
                className="inline-block px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {teachersCopy.button}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              {ctaCopy.title}
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              {ctaCopy.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {ctaCopy.primaryButton}
              </a>
              <a
                href="/about"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                {ctaCopy.secondaryButton}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
