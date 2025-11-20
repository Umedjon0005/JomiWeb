import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/api'
import { setToken } from '../utils/auth'
import logo from '../logo.png'

const Login = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await login(credentials)
      setToken(response.data.token)
      setIsAuthenticated(true)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a] p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#111827] border border-[#1f2937] rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-10 pb-8 border-b border-[#1f2937]">
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 bg-[#1e293b] border border-[#334155] rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="w-full h-full object-contain p-2"
                />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-white text-center mt-4">
              Admin Access
            </h1>
            <p className="text-sm text-[#9ca3af] text-center mt-2">
              Enter your credentials to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            {error && (
              <div className="p-3 bg-[#7f1d1d]/20 border border-[#991b1b] text-[#fca5a5] rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#d1d5db] uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
                className="w-full px-4 py-3 bg-[#1f2937] border border-[#374151] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all placeholder-[#6b7280]"
                placeholder="Enter username"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#d1d5db] uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="w-full px-4 py-3 bg-[#1f2937] border border-[#374151] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all placeholder-[#6b7280]"
                placeholder="Enter password"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-8 border-t border-[#1f2937] pt-6">
            <p className="text-xs text-[#6b7280] text-center">
              Default: <span className="text-[#9ca3af]">admin</span> / <span className="text-[#9ca3af]">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
