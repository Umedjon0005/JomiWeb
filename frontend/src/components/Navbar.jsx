import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../logo.png";
import { useLanguage, SUPPORTED_LANGS } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: t("nav.home", "Home") },
    { path: "/about", label: t("nav.about", "About") },
    { path: "/events", label: t("nav.events", "Events") },
    { path: "/teachers", label: t("nav.teachers", "Teachers") },
    { path: "/olympiads", label: t("nav.olympiads", "Olympiads") },
    { path: "/contact", label: t("nav.contact", "Contact") },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/80 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src={logo} 
              alt="School Logo" 
              className="h-16 w-16 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-display text-xl font-bold text-gray-900">
              {t("school.name", "Abdurahmoni Jomi Private School")}
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <ul className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? "text-gray-900"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                      layoutId="underline"
                    />
                  )}
                </Link>
              </li>
            ))}
            </ul>
            <div className="flex items-center gap-1 bg-gray-100 rounded-full px-1 py-1">
              {SUPPORTED_LANGS.map((lang) => (
                <button
                  key={lang.key}
                  onClick={() => setLanguage(lang.key)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                    language === lang.key
                      ? "bg-white text-gray-900 shadow"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <button
            className="md:hidden flex flex-col space-y-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 px-4 pt-2">
              {SUPPORTED_LANGS.map((lang) => (
                <button
                  key={lang.key}
                  onClick={() => {
                    setLanguage(lang.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex-1 px-3 py-2 text-xs font-semibold rounded-md border ${
                    language === lang.key
                      ? "bg-gray-900 text-white border-transparent"
                      : "text-gray-700 border-gray-200"
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
