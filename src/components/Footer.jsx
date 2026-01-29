import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHeart } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";
import { social } from "../constants";
import { navigation } from "../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand & tagline */}
          <div className="md:col-span-1 animate-fade-in-up opacity-0 [animation-delay:50ms] [animation-fill-mode:forwards]">
            <Logo className="mb-3" />
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-xs">
              Web developer. Mostly WordPress and Shopify—sites and themes.
            </p>
          </div>

          {/* Quick links */}
          <div className="animate-fade-in-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.url}
                    className="text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors text-sm"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & social */}
          <div className="animate-fade-in-up opacity-0 [animation-delay:150ms] [animation-fill-mode:forwards]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Get in touch
            </h4>
            <a
              href="mailto:raymundhermoso.dev@gmail.com"
              className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors text-sm mb-4"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
              raymundhermoso.dev@gmail.com
            </a>
            <ul className="flex gap-4 mt-4">
              {social.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    target={item.target}
                    rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                    className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                    aria-label={item.title}
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {currentYear} Raymund Hermoso. Made with{" "}
            <FontAwesomeIcon icon={faHeart} className="text-rose-500 inline w-3 h-3" /> and React.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
