import { Fragment } from 'react'

/*
  Text split for animation. Screen readers get the plain sentence from the
  hidden copy; the animated pieces are hidden from them.
  mask: letters slide up from behind a mask (.w > .c)
  plain: letters fade in place (.sc)
*/
export function SplitChars({ text, mask = true }) {
  const words = text.split(' ')
  return (
    <>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className={mask ? 'w' : 'wn'} aria-hidden="true">
            {Array.from(word).map((ch, j) => (
              <span key={j} className={mask ? 'c' : 'sc'}>{ch}</span>
            ))}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  )
}

export function SplitWords({ text }) {
  const words = text.split(' ')
  return (
    <>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="sw" aria-hidden="true">{word}</span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  )
}
