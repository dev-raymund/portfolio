import { useEffect } from 'react'
import { prefersReducedMotion } from './motion'

const GLYPHS = '!<>-_/[]{}=+*^?#ABCDEFGHJKLMNPQRSTUVWXYZ'
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

/* Cycles through `words`, decoding each one letter by letter. */
export function useScramble(ref, words, delay = 2800) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    el.textContent = words[0]
    if (prefersReducedMotion() || words.length < 2) return undefined

    let alive = true
    let timer = 0
    let raf = 0
    let index = 0

    const decode = (to) => new Promise((resolve) => {
      const from = el.textContent
      const len = Math.max(from.length, to.length)
      const queue = []
      for (let i = 0; i < len; i += 1) {
        const start = Math.floor(Math.random() * 18)
        queue.push({ from: from[i] || '', to: to[i] || '', start, end: start + Math.floor(Math.random() * 18), ch: '' })
      }
      let frame = 0
      const step = () => {
        if (!alive) return
        let out = ''
        let done = 0
        queue.forEach((q) => {
          if (frame >= q.end) {
            done += 1
            out += esc(q.to)
          } else if (frame >= q.start) {
            if (!q.ch || Math.random() < 0.3) q.ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            out += `<span class="dim">${esc(q.ch)}</span>`
          } else {
            out += esc(q.from)
          }
        })
        el.innerHTML = out
        if (done === queue.length) resolve()
        else {
          frame += 1
          raf = requestAnimationFrame(step)
        }
      }
      step()
    })

    const next = () => {
      timer = setTimeout(() => {
        index = (index + 1) % words.length
        decode(words[index]).then(() => { if (alive) next() })
      }, delay)
    }
    next()

    return () => {
      alive = false
      clearTimeout(timer)
      cancelAnimationFrame(raf)
      el.textContent = words[0]
    }
  }, [ref, words, delay])
}
