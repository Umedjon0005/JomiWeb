import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";

const Layout = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
    navigate("/login");
  };

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/news", label: "News", icon: "📰" },
    { path: "/events", label: "Events", icon: "📅" },
    { path: "/moments", label: "Moments", icon: "🖼️" },
    { path: "/olympiads", label: "Olympiads", icon: "🏆" },
    { path: "/teachers", label: "Teachers", icon: "👨‍🏫" },
    { path: "/about", label: "About", icon: "ℹ️" },
    { path: "/stats", label: "Stats", icon: "📈" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white fixed h-screen">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#7dd3fc] to-[#c084fc] bg-clip-text text-transparent">
            Admin Panel
          </h2>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-[#87CEEB]/20 text-white border-l-4 border-[#87CEEB]"
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
