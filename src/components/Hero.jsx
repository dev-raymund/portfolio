import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Social from "./Social";
import pdf from "../assets/files/RaymundHermosoCV.pdf";
import profile from "../assets/raymund-hermoso-photo.png";

const Hero = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900/95 border-b border-slate-200/80 dark:border-slate-700/80"
    >
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content on LEFT */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <p className="text-sm font-medium text-sky-500 dark:text-sky-400 uppercase tracking-wider mb-4 animate-fade-in opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
              Hi, I'm
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 animate-fade-in-up opacity-0 [animation-delay:150ms] [animation-fill-mode:forwards]">
              Raymund Hermoso
            </h1>
            <h2 className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-6 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
              Web Developer
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mb-8 leading-relaxed animate-fade-in-up opacity-0 [animation-delay:250ms] [animation-fill-mode:forwards]">
              Mostly WordPress and Shopify sites, themes, and the odd custom build. Here’s what I’ve been up to.
            </p>
            <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
              <a
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-white bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors shadow-lg shadow-sky-500/25"
              >
                Download CV <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:border-sky-500 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
              >
                See my work <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </a>
            </div>
            <div className="animate-fade-in-up opacity-0 [animation-delay:350ms] [animation-fill-mode:forwards]">
              <Social />
            </div>
          </div>
          {/* Image on RIGHT - bigger, object-top */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem] animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400/20 to-sky-600/20 dark:from-sky-500/10 dark:to-sky-700/10 blur-2xl" />
              <img
                src={profile}
                alt="Raymund Hermoso"
                className="relative w-full h-full object-cover object-top rounded-2xl border-2 border-slate-200/80 dark:border-slate-600/80 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
