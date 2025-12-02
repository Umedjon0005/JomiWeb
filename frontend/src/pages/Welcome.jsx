import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import welcomeVideo from "../welcome.mp4";
import { useTranslation } from "../hooks/useTranslation";

const Welcome = () => {
  const [showContent, setShowContent] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [videoSrc, setVideoSrc] = useState(welcomeVideo);
  const [videoError, setVideoError] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const hasScrolled = useRef(false);
  const { t } = useTranslation();
  
  // Fallback video URL
  const fallbackVideo = "https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4";

  useEffect(() => {
    // Show content after video loads
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let scrollTimeout;
    
    const handleWheel = (e) => {
      if (hasScrolled.current) return;
      
      // Check if scrolling down
      if (e.deltaY > 0) {
        hasScrolled.current = true;
        setIsExiting(true);
        
        // Mark welcome page as seen in sessionStorage when user scrolls
        sessionStorage.setItem("welcomeSeen", "true");
        
        // Wait for fade animation, then navigate
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 800);
      }
    };

    const handleTouchStart = (e) => {
      if (hasScrolled.current) return;
      const touchStartY = e.touches[0].clientY;
      
      const handleTouchMove = (e) => {
        if (hasScrolled.current) return;
        const touchCurrentY = e.touches[0].clientY;
        const deltaY = touchStartY - touchCurrentY;
        
        // If swiping up (scrolling down)
        if (deltaY < -30) {
          hasScrolled.current = true;
          setIsExiting(true);
          
          // Mark welcome page as seen in sessionStorage when user scrolls
          sessionStorage.setItem("welcomeSeen", "true");
          
          setTimeout(() => {
            navigate("/home", { replace: true });
          }, 800);
          
          document.removeEventListener("touchmove", handleTouchMove);
        }
      };
      
      document.addEventListener("touchmove", handleTouchMove, { passive: true });
      
      return () => {
        document.removeEventListener("touchmove", handleTouchMove);
      };
    };

    const handleKeyDown = (e) => {
      if (hasScrolled.current) return;
      
      // Arrow down, Page down, or Space
      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        e.preventDefault();
        hasScrolled.current = true;
        setIsExiting(true);
        
        // Mark welcome page as seen in sessionStorage when user scrolls
        sessionStorage.setItem("welcomeSeen", "true");
        
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 800);
      }
    };

    // Add scrollable area to enable scroll detection
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("keydown", handleKeyDown);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [navigate]);

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          ref={containerRef}
          key="welcome"
          className="fixed inset-0 w-full h-screen z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          {/* Scrollable spacer to enable scroll detection */}
          <div className="h-[200vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
              {/* Video Background */}
              <motion.video
                className="absolute inset-0 w-full h-full object-cover"
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onError={(e) => {
                  console.error("Video failed to load from:", videoSrc);
                  if (!videoError && videoSrc === welcomeVideo) {
                    // Try fallback video
                    console.log("Trying fallback video...");
                    setVideoError(true);
                    setVideoSrc(fallbackVideo);
                  } else {
                    // Hide video if both fail
                    console.error("All video sources failed to load");
                    e.target.style.display = 'none';
                  }
                }}
                onLoadedData={() => {
                  console.log("Video loaded successfully from:", videoSrc);
                }}
                initial={{ scale: 1 }}
                animate={{ scale: isExiting ? 1.2 : 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              
              {/* Dark Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[#030711]/80 via-[#051833]/70 to-[#03121d]/80"
                animate={{ opacity: isExiting ? 0.3 : 0.8 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(135,206,235,0.2),_transparent)]" />
              
              {/* Content */}
              <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <motion.div
                  className="text-center max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: showContent && !isExiting ? 1 : 0, 
                    y: showContent && !isExiting ? 0 : 30,
                    scale: isExiting ? 0.9 : 1
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <motion.h1
                    className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: showContent && !isExiting ? 1 : 0, 
                      scale: showContent && !isExiting ? 1 : 0.9
                    }}
                    transition={{ duration: 1, delay: 0.7 }}
                  >
                    {t("welcome.titlePrefix", "Welcome to")}
                    <span className="block text-gray-900 mt-2">
                      {t("school.name", "Abdurahmoni Jomi Private School")}
                    </span>
                  </motion.h1>
                  
                  <motion.p
                    className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showContent && !isExiting ? 1 : 0 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    Where curiosity fuels victories and creativity never sleeps
                  </motion.p>
                </motion.div>
                
                {/* Scroll Indicator */}
                <motion.div
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: showContent && !isExiting ? 1 : 0,
                    y: isExiting ? -20 : 0
                  }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  <motion.div
                    animate={{ y: isExiting ? 0 : [0, 10, 0] }}
                    transition={{ duration: 2, repeat: isExiting ? 0 : Infinity }}
                    className="text-white/70"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Welcome;

