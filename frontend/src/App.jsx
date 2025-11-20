import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Olympiads from "./pages/Olympiads";
import Teachers from "./pages/Teachers";
import Contact from "./pages/Contact";
import OlympiadDetails from "./pages/OlympiadDetails";

function App() {
  const [showWelcome, setShowWelcome] = useState(true); // Default to true (show welcome)
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if welcome page has been seen in this session
    const welcomeSeen = sessionStorage.getItem("welcomeSeen");
    // Only hide welcome if flag is explicitly set
    setShowWelcome(welcomeSeen !== "true");
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#87CEEB]"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            showWelcome ? (
              <Welcome />
            ) : (
              <Navigate to="/home" replace />
            )
          } 
        />
        <Route
          path="/*"
          element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/olympiads" element={<Olympiads />} />
                  <Route path="/olympiads/:id" element={<OlympiadDetails />} />
                  <Route path="/teachers" element={<Teachers />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
