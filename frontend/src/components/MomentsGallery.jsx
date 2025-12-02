import { motion } from "framer-motion";
import { buildMediaUrl } from "../services/api";
import { useTranslation } from "../hooks/useTranslation";

const fallbackMoments = [
  {
    title: "Sunrise Studio",
    caption: "Architecture students sketch concepts over chai at 6 a.m.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Innovation Deck",
    caption:
      "Robotics teams fine-tune bots for the Berlin Olympiad qualifiers.",
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Boarding Rooftop",
    caption: "Midnight astronomy clubs trace constellations above the dorms.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Gallery Reveal",
    caption: "Performing arts majors rehearse for the immersive spring gala.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Wellness Atrium",
    caption: "Boarders reset with guided yoga after hackathon weekends.",
    image:
      "https://images.unsplash.com/photo-1497302347632-904729bc24aa?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Gallery Reveal",
    caption: "Performing arts majors rehearse immersive spring showcases.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=60",
  },
  {
    title: "Culinary Commons",
    caption: "Global cuisine pop-ups during International Week evenings.",
    image:
      "https://images.unsplash.com/photo-1500534654417-86f4b130bde8?auto=format&fit=crop&w=1200&q=60",
  },
];

const normalizeImage = (image, index) => {
  if (image) {
    return buildMediaUrl(image);
  }
  return fallbackMoments[index % fallbackMoments.length].image;
};

const MomentsGallery = ({ moments = [] }) => {
  const { t } = useTranslation();
  const copy = {
    liveScrollLabel: t("home.moments.liveScrollLabel", "Live Scroll"),
    scrollKicker: t("home.moments.scrollKicker", "Scroll Moments"),
    scrollTitle: t("home.moments.scrollTitle", "Scenes From Every Corridor"),
    scrollDescription: t(
      "home.moments.scrollDescription",
      "Drag sideways or use your trackpad to glide through candid campus snapshots. Each panel opens up a different corner of our school."
    ),
    scrollTipPrefix: t("home.moments.scrollTipPrefix", "Tip:"),
    scrollTipText: t(
      "home.moments.scrollTipText",
      "Horizontal scroll reveals more moments."
    ),
  };
  // Always show all moments from database, fallback only if empty
  const galleryItems =
    moments.length > 0
      ? moments.map((item, index) => ({
          id: item.id,
          title: item.title,
          caption: item.caption,
          image: normalizeImage(item.image_url, index),
        }))
      : fallbackMoments;
  
  // Ensure we show all items, not limiting
  const displayItems = galleryItems;

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#fdf2f8] via-white to-[#ecfeff] overflow-hidden">
      <div className="absolute inset-y-10 -right-20 w-64 h-64 bg-gray-900/10 blur-[120px]" />
      <div className="absolute inset-y-0 -left-20 w-72 h-72 bg-gray-800/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <p className="uppercase tracking-[0.35em] text-xs text-gray-400">
              {copy.liveScrollLabel}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-gray-900" />
              <span className="w-2 h-2 rounded-full bg-gray-700" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-lg">
            <motion.div
              className="flex gap-4 py-6 px-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
              {[...displayItems, ...displayItems].map((moment, index) => (
                <div
                  key={`${moment.title}-${index}`}
                  className="flex items-center gap-3 bg-white rounded-2xl shadow-md p-3 min-w-[220px]"
                >
                  <div className="w-16 h-16 rounded-2xl overflow-hidden">
                    <img
                      src={moment.image}
                      alt={moment.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-[140px]">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {moment.title}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {moment.caption}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="uppercase tracking-[0.4em] text-xs text-gray-400 mb-3">
              {copy.scrollKicker}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
              {copy.scrollTitle}
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl">
              {copy.scrollDescription}
            </p>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">
              {copy.scrollTipPrefix}
            </span>{" "}
            {copy.scrollTipText}
          </div>
        </div>

        <div className="overflow-x-auto pb-6">
          <div className="flex gap-6 min-w-[600px] snap-x snap-mandatory">
            {displayItems.map((moment, index) => (
              <motion.div
                key={moment.title}
                className="snap-start flex-shrink-0 w-[320px] md:w-[360px] bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="h-60 overflow-hidden">
                  <img
                    src={moment.image}
                    alt={moment.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-gray-700 mb-2">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-gray-900">
                    {moment.title}
                  </h3>
                  <p className="text-gray-600 mt-3 leading-relaxed">
                    {moment.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MomentsGallery;
