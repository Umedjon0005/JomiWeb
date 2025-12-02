import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewsManagement from "./pages/NewsManagement";
import EventsManagement from "./pages/EventsManagement";
import OlympiadsManagement from "./pages/OlympiadsManagement";
import MomentsManagement from "./pages/MomentsManagement";
import PhotosManagement from "./pages/PhotosManagement";
import TeachersManagement from "./pages/TeachersManagement";
import AboutManagement from "./pages/AboutManagement";
import StatsManagement from "./pages/StatsManagement";
import Layout from "./components/Layout";
import { getToken } from "./utils/auth";

// Protected Route Component
const ProtectedRoute = ({ children, setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
      if (!token) {
        setIsAuthenticated(false);
        navigate("/login", { replace: true, state: { from: location } });
        return false;
      }
      setIsAuthenticated(true);
      setLoading(false);
      return true;
    };

    if (!checkAuth()) {
      setLoading(false);
      return;
    }
    
    // Listen for storage changes (token removal)
    const handleStorageChange = (e) => {
      if (e.key === "admin_token" && !e.newValue) {
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [location, navigate, setIsAuthenticated]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0e1a]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#3b82f6] border-t-transparent"></div>
      </div>
    );
  }

  const token = getToken();
  if (!token) {
    return null;
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0e1a]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#3b82f6] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute setIsAuthenticated={setIsAuthenticated}>
              <Layout setIsAuthenticated={setIsAuthenticated} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="news" element={<NewsManagement />} />
          <Route path="events" element={<EventsManagement />} />
          <Route path="olympiads" element={<OlympiadsManagement />} />
          <Route path="moments" element={<MomentsManagement />} />
          <Route path="photos" element={<PhotosManagement />} />
          <Route path="teachers" element={<TeachersManagement />} />
          <Route path="about" element={<AboutManagement />} />
          <Route path="stats" element={<StatsManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
