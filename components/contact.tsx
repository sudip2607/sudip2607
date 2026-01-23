'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sudip2607@icloud.com',
    href: 'mailto:sudip2607@icloud.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(732) 273-3347',
    href: 'tel:+17322733347',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'New Jersey, USA',
    href: null,
  },
]

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/sudip2607',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/sudip-sen-ctrl-o',
  },
]

const CONSTRAINTS = {
  name: { min: 1, max: 100 },
  email: { min: 5, max: 254 },
  subject: { min: 3, max: 200 },
  message: { min: 20, max: 500 },
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  // Temporarily disabled reCAPTCHA for debugging
  // useEffect(() => {
  //   if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
  //     const script = document.createElement('script')
  //     script.src = 'https://www.google.com/recaptcha/api.js'
  //     script.async = true
  //     script.defer = true
  //     document.head.appendChild(script)
  //   }
  // }, [])

  const validateField = (fieldName: string, value: string): string | null => {
    switch (fieldName) {
      case 'name':
        if (value.trim().length < CONSTRAINTS.name.min) return 'Name is required'
        if (value.trim().length > CONSTRAINTS.name.max) return `Name must not exceed ${CONSTRAINTS.name.max} characters`
        break
      case 'email':
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please provide a valid email address'
        break
      case 'subject':
        if (value.trim().length < CONSTRAINTS.subject.min) return `Subject must be at least ${CONSTRAINTS.subject.min} characters`
        if (value.trim().length > CONSTRAINTS.subject.max) return `Subject must not exceed ${CONSTRAINTS.subject.max} characters`
        break
      case 'message':
        if (value.trim().length < CONSTRAINTS.message.min) return `Message must be at least ${CONSTRAINTS.message.min} characters`
        if (value.trim().length > CONSTRAINTS.message.max) return `Message must not exceed ${CONSTRAINTS.message.max} characters`
        if (/^\s+$/.test(value)) return 'Message cannot contain only spaces'
        break
    }
    return null
  }

  const getValidationErrors = (): string | null => {
    if (formData.name.trim().length < CONSTRAINTS.name.min) {
      return 'Name is required'
    }
    if (formData.name.trim().length > CONSTRAINTS.name.max) {
      return `Name must not exceed ${CONSTRAINTS.name.max} characters`
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Please provide a valid email address'
    }
    if (formData.subject.trim().length < CONSTRAINTS.subject.min) {
      return `Subject must be at least ${CONSTRAINTS.subject.min} characters`
    }
    if (formData.subject.trim().length > CONSTRAINTS.subject.max) {
      return `Subject must not exceed ${CONSTRAINTS.subject.max} characters`
    }
    if (formData.message.trim().length < CONSTRAINTS.message.min) {
      return `Message must be at least ${CONSTRAINTS.message.min} characters`
    }
    if (formData.message.trim().length > CONSTRAINTS.message.max) {
      return `Message must not exceed ${CONSTRAINTS.message.max} characters`
    }
    if (/^\s+$/.test(formData.message)) {
      return 'Message cannot contain only spaces'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    setErrorMessage('')
    setSuccessMessage('')

    // Validate form
    const validationError = getValidationErrors()
    if (validationError) {
      setStatus('error')
      setErrorMessage(validationError)
      return
    }

    setStatus('loading')

    try {
      // Temporarily skip reCAPTCHA for debugging
      // let recaptchaToken = ''
      // if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (window as any).grecaptcha) {
      //   recaptchaToken = await (window as any).grecaptcha.execute(
      //     process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      //     { action: 'submit' }
      //   )
      // }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const responseData = await response.json()

      if (response?.ok) {
        setStatus('success')
        setSuccessMessage('Message sent successfully! I\'ll get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMessage(responseData?.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('An error occurred. Please try again later.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e?.target ?? {}
    setFormData((prev) => ({ ...prev, [name ?? '']: value ?? '' }))
    
    // Validate field if it's been touched
    if (touchedFields[name ?? '']) {
      const error = validateField(name ?? '', value ?? '')
      setFieldErrors(prev => ({ ...prev, [name ?? '']: error || '' }))
    }
    
    // Clear error message when user starts typing
    if (status === 'error') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e?.target ?? {}
    setTouchedFields(prev => ({ ...prev, [name ?? '']: true }))
    
    const error = validateField(name ?? '', value ?? '')
    setFieldErrors(prev => ({ ...prev, [name ?? '']: error || '' }))
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interested in collaboration or have a project in mind? Let&apos;s connect!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-4 mb-8">
              {contactInfo?.map?.((item, index) => {
                const Icon = item?.icon ?? Mail
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#E35336]/20 to-[#A0522D]/20">
                      <Icon className="w-5 h-5 text-[#E35336]" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item?.label ?? ''}</p>
                      {item?.href ? (
                        <a
                          href={item?.href}
                          className="font-medium hover:text-[#E35336] transition-colors"
                        >
                          {item?.value ?? ''}
                        </a>
                      ) : (
                        <p className="font-medium">{item?.value ?? ''}</p>
                      )}
                    </div>
                  </div>
                )
              }) ?? []}
            </div>

            <h4 className="text-lg font-semibold mb-4">Connect with me</h4>
            <div className="flex items-center gap-3">
              {socialLinks?.map?.((link, index) => {
                const Icon = link?.icon ?? Github
                return (
                  <a
                    key={index}
                    href={link?.href ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass rounded-xl hover:bg-secondary hover:scale-110 transition-all duration-300"
                    aria-label={link?.label ?? ''}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                )
              }) ?? []}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8">
              {/* Status messages */}
              {status === 'success' && successMessage && (
                <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-green-500 text-sm">{successMessage}</p>
                </div>
              )}
              {status === 'error' && errorMessage && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData?.name ?? ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={CONSTRAINTS.name.max}
                    required
                    className={`w-full px-4 py-3 bg-secondary/50 rounded-xl border ${
                      touchedFields.name && fieldErrors.name ? 'border-red-500' : 'border-border'
                    } focus:border-[#E35336] focus:ring-1 focus:ring-[#E35336] outline-none transition-all`}
                    placeholder="Your name"
                  />
                  {touchedFields.name && fieldErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{fieldErrors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData?.email ?? ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={CONSTRAINTS.email.max}
                    required
                    className={`w-full px-4 py-3 bg-secondary/50 rounded-xl border ${
                      touchedFields.email && fieldErrors.email ? 'border-red-500' : 'border-border'
                    } focus:border-[#E35336] focus:ring-1 focus:ring-[#E35336] outline-none transition-all`}
                    placeholder="your.email@example.com"
                  />
                  {touchedFields.email && fieldErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject (min. {CONSTRAINTS.subject.min} characters)
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData?.subject ?? ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={CONSTRAINTS.subject.max}
                  required
                  className={`w-full px-4 py-3 bg-secondary/50 rounded-xl border ${
                    touchedFields.subject && fieldErrors.subject ? 'border-red-500' : 'border-border'
                  } focus:border-[#E35336] focus:ring-1 focus:ring-[#E35336] outline-none transition-all`}
                  placeholder="Subject"
                />
                {touchedFields.subject && fieldErrors.subject && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.subject}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.subject.length}/{CONSTRAINTS.subject.max}
                </p>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message ({CONSTRAINTS.message.min}-{CONSTRAINTS.message.max} characters)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData?.message ?? ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={CONSTRAINTS.message.max}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 bg-secondary/50 rounded-xl border ${
                    touchedFields.message && fieldErrors.message ? 'border-red-500' : 'border-border'
                  } focus:border-[#E35336] focus:ring-1 focus:ring-[#E35336] outline-none transition-all resize-none`}
                  placeholder="Your message... (minimum 20 characters)"
                />
                {touchedFields.message && fieldErrors.message && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.message}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.message.length}/{CONSTRAINTS.message.max}
                </p>
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || !!getValidationErrors()}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E35336] to-[#A0522D] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#E35336]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Your information will be stored securely and used only to respond to your inquiry.
              </p>
              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  This site is protected by reCAPTCHA and the Google
                  <a href="https://policies.google.com/privacy" className="text-[#E35336] hover:underline" target="_blank" rel="noopener noreferrer"> Privacy Policy</a> and
                  <a href="https://policies.google.com/terms" className="text-[#E35336] hover:underline" target="_blank" rel="noopener noreferrer"> Terms of Service</a> apply.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
