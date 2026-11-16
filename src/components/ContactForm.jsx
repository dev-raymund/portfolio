import { useState } from 'react'
import Icon from './Icon'
import { profile, web3formsKey } from '../data/profile'

const TOPICS = [
  { id: 'project', label: 'A project', icon: 'code' },
  { id: 'job', label: 'A job opportunity', icon: 'briefcase' },
  { id: 'other', label: 'Something else', icon: 'message' },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate({ name, email, message }) {
  const errors = {}
  if (!name) errors.name = 'Enter your name.'
  if (!EMAIL_RE.test(email)) errors.email = 'Enter an email address, like name@example.com.'
  if (message.length < 10) errors.message = 'Add a few words about what you need.'
  return errors
}

export default function ContactForm() {
  const [topic, setTopic] = useState('project')
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState({ name: '', email: '' })

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('botcheck')) return
    const values = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      message: String(data.get('message') || '').trim(),
    }
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      form.elements.namedItem(first)?.focus()
      return
    }
    const topicLabel = TOPICS.find((t) => t.id === topic).label

    if (!web3formsKey) {
      const subject = encodeURIComponent(`${topicLabel}: message from ${values.name}`)
      const body = encodeURIComponent(`${values.message}\n\n${values.name}\n${values.email}`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `${topicLabel}: new message from ${values.name}`,
          from_name: 'Portfolio contact form',
          replyto: values.email,
          topic: topicLabel,
          ...values,
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || json.success === false) throw new Error(json.message || 'Request failed')
      setSent({ name: values.name, email: values.email })
      setStatus('sent')
      form.reset()
      setTopic('project')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-card sent" role="status">
        <span className="sent-ico"><Icon name="check" /></span>
        <h3>Message sent</h3>
        <p>Thanks, {sent.name}. I’ll reply to {sent.email} soon.</p>
        <button className="pill ghost-pill" type="button" onClick={() => setStatus('idle')}><Icon name="send" />Send another message</button>
      </div>
    )
  }

  const fieldProps = (name) => ({
    id: `cf-${name}`,
    name,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `cf-${name}-error` : undefined,
    onInput: () => errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined })),
  })

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <fieldset className="topics">
        <legend>What’s this about?</legend>
        <div className="topic-row">
          {TOPICS.map((t) => (
            <label className="topic" key={t.id}>
              <input type="radio" name="topic" value={t.id} checked={topic === t.id} onChange={() => setTopic(t.id)} />
              <span><Icon name={t.icon} />{t.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <div className="input-wrap"><Icon name="user" /><input className="input" type="text" autoComplete="name" {...fieldProps('name')} /></div>
          {errors.name && <p className="field-error" id="cf-name-error"><Icon name="alert" />{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <div className="input-wrap"><Icon name="mail" /><input className="input" type="email" autoComplete="email" inputMode="email" {...fieldProps('email')} /></div>
          {errors.email && <p className="field-error" id="cf-email-error"><Icon name="alert" />{errors.email}</p>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <div className="input-wrap area">
          <Icon name="message" />
          <textarea
            className="input"
            rows="5"
            placeholder={topic === 'job' ? 'The role, the team, and how to reach you' : topic === 'project' ? 'What you need built, and roughly when' : 'How can I help?'}
            {...fieldProps('message')}
          />
        </div>
        {errors.message && <p className="field-error" id="cf-message-error"><Icon name="alert" />{errors.message}</p>}
      </div>

      <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="form-foot">
        <button className="pill btn-send" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? <><Icon name="loader" className="spin" />Sending</> : <><Icon name="send" />Send message</>}
        </button>
        <p className="form-note" aria-live="polite">
          {status === 'mailto' && 'Your email app should have opened with the message ready to send.'}
          {status === 'error' && (<><Icon name="alert" />The message didn’t send. Check your connection and try again, or email {profile.email}.</>)}
          {status === 'idle' && "I'll reply by email."}
        </p>
      </div>
    </form>
  )
}
