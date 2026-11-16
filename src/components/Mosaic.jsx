import { useLayoutEffect, useRef } from 'react'

// Relative tile heights per column.
const COLUMNS = [[38, 46], [30, 42, 28], [52, 36]]

/* A photo cut into offset tiles; each tile carries its own slice of the image. */
export default function Mosaic({ src, alt, children }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const mosaic = ref.current
    const tiles = Array.from(mosaic.querySelectorAll('.tile'))
    const layout = () => {
      const W = mosaic.clientWidth
      const H = mosaic.clientHeight
      tiles.forEach((t) => {
        const s = t.firstElementChild
        s.style.width = `${W}px`
        s.style.height = `${H}px`
        s.style.left = `${-t.offsetLeft}px`
        s.style.top = `${-t.offsetTop}px`
      })
    }
    layout()
    const ro = new ResizeObserver(layout)
    ro.observe(mosaic)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="mosaic-wrap">
      <div className="mosaic" ref={ref} role="img" aria-label={alt}>
        {COLUMNS.map((col, ci) => (
          <div className="mcol" key={ci}>
            {col.map((flex, ti) => (
              <div className="tile" style={{ flex }} key={ti}>
                <div className="slice"><img src={src} alt="" decoding="async" /></div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {children}
    </div>
  )
}
