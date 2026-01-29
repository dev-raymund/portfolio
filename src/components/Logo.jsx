const Logo = ({ className = "" }) => {
  return (
    <a href="#" className={`inline-flex items-center gap-2.5 group ${className}`}>
      <div className="relative flex-shrink-0">
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-110"
        >
          <circle cx="21" cy="21" r="20" fill="url(#logoGradient)" />
          {/* R + H as text for clean, unified look */}
          <text
            x="21"
            y="28"
            textAnchor="middle"
            fill="white"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="18"
            fontWeight="700"
            letterSpacing="-0.5"
          >
            RH
          </text>
          <defs>
            <linearGradient id="logoGradient" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight hidden sm:inline group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
        Raymund Hermoso
      </span>
    </a>
  );
};

export default Logo;
