import { useState } from "react";
import Navigation from "./Navigation";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import ToggleDarkMode from "./ToggleDarkMode";
import pdf from "../assets/files/RaymundHermosoCV.pdf";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-700/80 transition-colors duration-300 animate-fade-in">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Logo className="flex-shrink-0" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Navigation className="flex items-center gap-8" />
          </nav>

          {/* Right: CTA + dark mode (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500 px-4 py-2 rounded-lg transition-colors"
            >
              Download CV <FontAwesomeIcon icon={faDownload} className="ml-1 w-3.5 h-3.5" />
            </a>
            <ToggleDarkMode />
          </div>

          {/* Mobile: menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <ToggleDarkMode />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-sky-500 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-6 space-y-4">
            <Navigation
              className="flex flex-col gap-4"
              onNavigate={closeMobileMenu}
            />
            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="inline-flex items-center gap-2 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 px-4 py-2.5 rounded-lg transition-colors w-fit"
            >
              Download CV <FontAwesomeIcon icon={faDownload} className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
