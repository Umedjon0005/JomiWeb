import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getPhotos, buildMediaUrl } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

const fallbackPhotos = [
  {
    id: "lab",
    title: "Immersive Labs",
    description: "Students ideate prototypes inside the innovation hub.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "studio",
    title: "Creative Studios",
    description: "Evening rehearsals blend theatre, media, and music.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "boarders",
    title: "Boarding Life",
    description: "Cozy lounges and skyline views for late-night study.",
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: "global",
    title: "Global Delegations",
    description: "Olympiad journeys capture cities around the world.",
    image:
      "https://images.unsplash.com/photo-1471049558828-ef855ede5273?auto=format&fit=crop&w=900&q=60",
  },
];

const PhotoShowcase = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    fetchPhotos();
  }, [language]);

  const fetchPhotos = async () => {
    try {
      const response = await getPhotos(language);
      setPhotos(response.data || []);
    } catch (error) {
      console.error("Error fetching photos:", error);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  const displayPhotos = photos.length > 0 ? photos : fallbackPhotos;
  return (
    <section className="py-24 bg-gradient-to-br from-[#0b182f] via-[#0f274a] to-[#04101f] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
          <div>
            <p className="uppercase tracking-[0.4em] text-xs text-white/60 mb-4">
              Visual Stories
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              Spaces That Inspire Bold Ideas
            </h2>
            <p className="mt-4 text-white/70 text-lg max-w-2xl">
              From sunrise sketch sessions to midnight robotics breakthroughs,
              our campus is alive 24/7. Explore the textures, colors, and
              atmospheres students call home.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="w-3 h-3 rounded-full bg-[#87CEEB]" />
            <span className="w-3 h-3 rounded-full bg-white/40" />
            <span className="w-3 h-3 rounded-full bg-white/40" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayPhotos.map((photo, index) => {
              const imageUrl = photo.image_url ? buildMediaUrl(photo.image_url) : photo.image;
              return (
                <motion.div
                  key={photo.id}
                  className="group relative overflow-hidden rounded-3xl shadow-2xl border border-white/10 hover:border-white/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <img
                    src={imageUrl}
                    alt={photo.title}
                    className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="uppercase text-xs tracking-[0.4em] text-white/60 mb-2">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </p>
                    <h3 className="font-display text-2xl font-semibold mb-2">
                      {photo.title}
                    </h3>
                    {photo.description && (
                      <p className="text-white/80 text-sm leading-relaxed">
                        {photo.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoShowcase;
