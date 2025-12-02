import { Link } from "react-router-dom";
import logo from "../logo.png";
import { useTranslation } from "../hooks/useTranslation";

const Footer = () => {
  const { t } = useTranslation();
  const footer = t("footer", {});

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="School Logo"
                className="h-20 w-20 object-contain"
              />
              <h3 className="font-display text-2xl font-bold text-white">
                {t("school.name", "Abdurahmoni Jomi Private School")}
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {t(
                "footer.tagline",
                "Empowering minds, shaping futures. Excellence in education since our founding."
              )}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">
              {t("footer.quickLinksTitle", "Quick Links")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.links.home", "Home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.links.about", "About Us")}
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.links.events", "Events")}
                </Link>
              </li>
              <li>
                <Link
                  to="/teachers"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.links.teachers", "Teachers")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.links.contact", "Contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">
              {t("footer.contactTitle", "Contact Info")}
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-2">
                <span>📧</span>
                <span>{t("footer.contact.email", "info@abdurahmonijomi.com")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📞</span>
                <span>{t("footer.contact.phone", "+1 (555) 123-4567")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📍</span>
                <span>
                  {t(
                    "footer.contact.address",
                    "123 Education Street, City, State 12345"
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>
            {t(
              "footer.copyright",
              "© 2024 Abdurahmoni Jomi Private School. All rights reserved."
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
