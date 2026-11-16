/* RH monogram. Colours follow the theme: ink tile, background-coloured letters. */
export default function Logo({ className = '' }) {
  return (
    <svg className={`logo ${className}`.trim()} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="18" className="logo-tile" />
      <path
        className="logo-mark"
        d="M14 46V18h10a7 7 0 0 1 0 14H14M24 32l7 14M38 18v28M50 18v28M38 32h12"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
