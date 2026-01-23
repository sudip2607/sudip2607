import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Simple in-memory rate limiter (per server instance)
const requests = new Map<string, { count: number; resetAt: number }>()
const MAX_REQUESTS = 3
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes

// Validation constraints
const CONSTRAINTS = {
  name: { min: 1, max: 100 },
  email: { min: 5, max: 254 }, // RFC 5321
  subject: { min: 3, max: 200 },
  message: { min: 20, max: 500 },
}

const resend = new Resend(process.env.RESEND_API_KEY)

// Ensure this route runs on the Node.js runtime (Resend SDK is not Edge-ready in all cases)
export const runtime = 'nodejs'

function getClientIp(req: NextRequest) {
  const xf = req.headers.get('x-forwarded-for') || ''
  const ip = xf.split(',')[0]?.trim()
  return ip || 'local'
}

function sanitize(input: string) {
  return (input || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const len = email?.length ?? 0
  return emailRegex.test(email) && len >= CONSTRAINTS.email.min && len <= CONSTRAINTS.email.max
}

function isValidMessage(msg: string): boolean {
  const trimmed = msg?.trim?.() ?? ''
  const len = trimmed.length
  // Check if all spaces or outside length bounds
  return len >= CONSTRAINTS.message.min && len <= CONSTRAINTS.message.max && !/^\s+$/.test(msg)
}

type RecaptchaResult = { success: boolean; score: number }

async function verifyRecaptcha(token: string): Promise<RecaptchaResult> {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    // Skip verification if secret key not configured
    return { success: true, score: 1 }
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })

    const data = await response.json()
    const score = Number(data?.score ?? 0)
    const success = Boolean(data?.success)
    // Return raw result; caller decides whether to block
    return { success, score }
  } catch (err) {
    console.error('reCAPTCHA verification error:', err)
    // Do not block on errors; allow submission but log
    return { success: true, score: 0 }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure email service is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const body = await request?.json?.()
    const { name, email, subject, message, recaptchaToken } = body ?? {}

    // Verify reCAPTCHA first
    if (recaptchaToken) {
      const result = await verifyRecaptcha(recaptchaToken)
      // Only block if verification explicitly failed (invalid token). If score is low, log and continue.
      if (!result.success) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 403 }
        )
      }
      if (result.score < 0.3) {
        console.warn('Low reCAPTCHA score:', result.score)
      }
    }

    // Validate all fields exist
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate name
    const nameTrimmed = name?.trim?.() ?? ''
    if (nameTrimmed.length < CONSTRAINTS.name.min || nameTrimmed.length > CONSTRAINTS.name.max) {
      return NextResponse.json(
        { error: `Name must be between ${CONSTRAINTS.name.min} and ${CONSTRAINTS.name.max} characters` },
        { status: 400 }
      )
    }

    // Validate email format and length
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Validate subject
    const subjectTrimmed = subject?.trim?.() ?? ''
    if (subjectTrimmed.length < CONSTRAINTS.subject.min || subjectTrimmed.length > CONSTRAINTS.subject.max) {
      return NextResponse.json(
        { error: `Subject must be at least ${CONSTRAINTS.subject.min} characters` },
        { status: 400 }
      )
    }

    // Validate message
    if (!isValidMessage(message)) {
      return NextResponse.json(
        { error: `Message must be between ${CONSTRAINTS.message.min} and ${CONSTRAINTS.message.max} characters (no empty spaces)` },
        { status: 400 }
      )
    }

    // Rate limit per client IP
    const ip = getClientIp(request)
    const now = Date.now()
    const entry = requests.get(ip)
    if (entry && entry.resetAt > now && entry.count >= MAX_REQUESTS) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }
    if (!entry || entry.resetAt <= now) {
      requests.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    } else {
      requests.set(ip, { count: entry.count + 1, resetAt: entry.resetAt })
    }

    // Skip database persistence; send emails via Resend
    const toEmail = process.env.CONTACT_TO || 'sudip2607@icloud.com'
    const fromEmail = process.env.CONTACT_FROM || 'onboarding@resend.dev'
    const safeName = sanitize(name?.trim?.() || '')
    const safeSubject = sanitize(subject?.trim?.() || '')
    const safeMessage = sanitize(message?.trim?.() || '').replace(/\n/g, '<br />')

    console.log('[Contact API] Attempting to send emails:', { toEmail, fromEmail, safeName })

    let adminEmailSent = false
    let userEmailSent = false
    let fallbackUsed = false

    // Send email notification to your email
    try {
      console.log('[Contact API] Sending admin email...')
      await resend.emails.send({
        from: `Contact Form <${fromEmail}>`,
        to: toEmail,
        subject: `New Contact Form Submission: ${safeSubject}`,
        html: `
          <h2>New message from ${safeName}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      })
      adminEmailSent = true
      console.log('[Contact API] Admin email sent successfully')
    } catch (e: any) {
      console.error('[Contact API] Resend admin email error:', {
        message: e?.message,
        statusCode: e?.statusCode,
        name: e?.name,
        stack: e?.stack
      })
      // Fallback to Resend onboarding sender if domain not verified
      if (fromEmail !== 'onboarding@resend.dev') {
        try {
          console.log('[Contact API] Retrying admin email with fallback sender...')
          await resend.emails.send({
            from: `Contact Form <onboarding@resend.dev>`,
            to: toEmail,
            subject: `New Contact Form Submission: ${safeSubject}`,
            html: `
              <h2>New message from ${safeName}</h2>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${safeSubject}</p>
              <p><strong>Message:</strong></p>
              <p>${safeMessage}</p>
            `,
          })
          adminEmailSent = true
          fallbackUsed = true
          console.log('[Contact API] Admin email sent with fallback sender')
        } catch (fallbackErr: any) {
          console.error('[Contact API] Resend admin email fallback error:', {
            message: fallbackErr?.message,
            statusCode: fallbackErr?.statusCode,
            name: fallbackErr?.name
          })
        }
      }
    }

    // Send confirmation email to sender
    try {
      console.log('[Contact API] Sending user confirmation email...')
      await resend.emails.send({
        from: `Sudip Sen <${fromEmail}>`,
        to: email,
        subject: 'Thank you for reaching out!',
        html: `
          <h2>Hi ${safeName},</h2>
          <p>Thank you for your message. I've received your submission and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <p>${safeMessage}</p>
          <br />
          <p>Best regards,<br />Sudip Sen</p>
        `,
      })
      userEmailSent = true
      console.log('[Contact API] User confirmation email sent successfully')
    } catch (e: any) {
      console.error('[Contact API] Resend user email error:', {
        message: e?.message,
        statusCode: e?.statusCode,
        name: e?.name,
        stack: e?.stack
      })
      if (fromEmail !== 'onboarding@resend.dev') {
        try {
          console.log('[Contact API] Retrying user email with fallback sender...')
          await resend.emails.send({
            from: `Sudip Sen <onboarding@resend.dev>`,
            to: email,
            subject: 'Thank you for reaching out!',
            html: `
              <h2>Hi ${safeName},</h2>
              <p>Thank you for your message. I've received your submission and will get back to you as soon as possible.</p>
              <p><strong>Your message:</strong></p>
              <p>${safeMessage}</p>
              <br />
              <p>Best regards,<br />Sudip Sen</p>
            `,
          })
          userEmailSent = true
          fallbackUsed = true
          console.log('[Contact API] User email sent with fallback sender')
        } catch (fallbackErr: any) {
          console.error('[Contact API] Resend user email fallback error:', {
            message: fallbackErr?.message,
            statusCode: fallbackErr?.statusCode,
            name: fallbackErr?.name
          })
        }
      }
    }

    if (!adminEmailSent && !userEmailSent) {
      return NextResponse.json(
        { error: 'Email service failed to send messages' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: fallbackUsed ? 'Message sent successfully (using fallback sender)' : 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit message' },
      { status: 500 }
    )
  }
}
