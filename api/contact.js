/*
  Contact form endpoint (Vercel serverless function). Emails each message to me through Resend.

  Environment variables (Vercel > Settings > Environment Variables):
    RESEND_API_KEY  required. Without it the endpoint answers 503 and the form falls back to the visitor's email app.
    CONTACT_EMAIL   where messages go. Defaults to my Gmail.
    RESEND_FROM     sender. Defaults to Resend's test sender, which can only deliver to the Resend
                    account's own address; use an address on a domain verified in Resend to lift that.
*/
const MAX = { name: 100, email: 200, topic: 40, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
const clean = (v, max) => String(v ?? '').trim().slice(0, max)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }

  const key = process.env.RESEND_API_KEY
  if (!key) return res.status(503).json({ ok: false, error: 'not_configured' })

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}
  if (body.botcheck) return res.status(200).json({ ok: true }) // honeypot: pretend it worked

  const name = clean(body.name, MAX.name)
  const email = clean(body.email, MAX.email)
  const topic = clean(body.topic, MAX.topic) || 'Message'
  const message = clean(body.message, MAX.message)
  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return res.status(400).json({ ok: false, error: 'invalid' })
  }

  const html = `
    <p><strong>Topic:</strong> ${esc(topic)}</p>
    <p><strong>From:</strong> ${esc(name)} &lt;${esc(email)}&gt;</p>
    <p style="white-space:pre-wrap">${esc(message)}</p>
    <hr><p style="color:#888">Sent from the contact form on raymund-hermoso.vercel.app. Reply to answer ${esc(name)} directly.</p>`

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>',
        to: [process.env.CONTACT_EMAIL || 'raymundhermoso.dev@gmail.com'],
        reply_to: email,
        subject: `${topic}: new message from ${name}`.replace(/[\r\n]+/g, ' '),
        html,
        text: `Topic: ${topic}\nFrom: ${name} <${email}>\n\n${message}`,
      }),
    })
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text().catch(() => ''))
      return res.status(502).json({ ok: false, error: 'send_failed' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend request failed', err)
    return res.status(502).json({ ok: false, error: 'send_failed' })
  }
}

function safeParse(s) {
  try { return JSON.parse(s) } catch { return {} }
}
