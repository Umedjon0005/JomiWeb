import { Link } from 'react-router-dom'
import logo from '../logo.png'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="School Logo" 
                className="h-12 w-12 object-contain"
              />
              <h3 className="font-display text-2xl font-bold bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] bg-clip-text text-transparent">
                Abdurahmoni Jomi
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering minds, shaping futures. Excellence in education since our founding.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#1e3a8a]">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-[#1e3a8a] transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[#1e3a8a] transition-colors">About Us</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-[#1e3a8a] transition-colors">Events</Link></li>
              <li><Link to="/teachers" className="text-gray-400 hover:text-[#1e3a8a] transition-colors">Teachers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#1e3a8a] transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#1e3a8a]">Contact Info</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-2">
                <span>📧</span>
                <span>info@abdurahmonijomi.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📞</span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📍</span>
                <span>123 Education Street, City, State 12345</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 Abdurahmoni Jomi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
