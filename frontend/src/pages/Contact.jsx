import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitContact } from '../services/api'
import { useTranslation } from '../hooks/useTranslation'

const Contact = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await submitContact(formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(t('contact.form.error', "There was an error submitting your message. Please try again."))
    } finally {
      setSubmitting(false)
    }
  }

  const heroVideo = "https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4";

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative min-h-[70vh] py-24 text-white overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#030711]/90 via-[#051833]/70 to-[#03121d]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(135,206,235,0.35),_transparent)]" />
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            {t("contact.heroTitle", "Contact Us")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            {t("contact.heroSubtitle", "We'd love to hear from you. Get in touch with us!")}
          </p>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl font-bold mb-6 text-gray-900">
                {t("contact.getInTouch", "Get in Touch")}
              </h2>
              <p className="text-gray-600 mb-10 text-lg">
                {t("contact.description", "Have questions or want to learn more? We're here to help!")}
              </p>

              <div className="space-y-6">
                {[
                  { icon: '📧', title: t("contact.contactInfo.email", "Email"), content: 'info@abdurahmonijomi.com' },
                  { icon: '📞', title: t("contact.contactInfo.phone", "Phone"), content: '+1 (555) 123-4567' },
                  { icon: '📍', title: t("contact.contactInfo.address", "Address"), content: '123 Education Street\nCity, State 12345' },
                  { icon: '🕒', title: t("contact.contactInfo.officeHours", "Office Hours"), content: 'Monday - Friday: 8:00 AM - 5:00 PM' }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-2xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {submitted && (
                <div className="mb-6 p-4 bg-gray-900 text-white rounded-xl text-center font-semibold">
                  {t("contact.form.success", "✓ Thank you! Your message has been sent successfully.")}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">
                    {t("contact.form.name", "Name *")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">
                    {t("contact.form.email", "Email *")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">
                    {t("contact.form.subject", "Subject *")}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900">
                    {t("contact.form.message", "Message *")}
                  </label>
                  <textarea
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? t("contact.form.sending", "Sending...") : t("contact.form.sendMessage", "Send Message")}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
