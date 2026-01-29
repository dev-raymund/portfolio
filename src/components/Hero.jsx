import Social from "./Social";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import pdf from "../assets/files/RaymundHermosoCV.pdf";

import profile from "../assets/profile.png";

const Hero = () => {
  return (
    <div id="about" className="flex gap-5 pt-24 flex-col lg:flex-row">
      <div className="text-center lg:text-left lg:w-1/2 xl:hidden">
        <h3 className="font-sans text-sky-500 text-xl font-bold mb-3">
          Hi, I am
        </h3>

        <h1 className="font-sans text-sky-500 text-5xl xl:text-6xl font-bold">
          Raymund Hermoso
        </h1>

        <h2 className="font-sans font-bold text-zinc-900 text-3xl xl:text-4xl mt-3 mb-2 dark:text-white">
          Full-Stack Web Developer
        </h2>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Transforming Ideas into High-Impact Digital Solutions
        </p>

        <div className="flex gap-2 flex-col sm:flex-row justify-center lg:justify-start mb-6">
          <a
            href={pdf}
            target="_blank"
            className="font-sans text-white hover:text-sky-500 hover:bg-transparent p-3 rounded-md border border-sky-500 bg-sky-500 transition duration-150 ease-in-out"
          >
            Download CV <FontAwesomeIcon icon={faDownload} />
          </a>
        </div>

        <Social />
      </div>

      <div className="lg:w-1/2 xl:w-full">
        <h3 className="font-sans text-sky-500 text-2xl font-bold mb-5 text-center lg:text-left">
          About
        </h3>
        
        <p className="text-zinc-900 mb-4 text-lg dark:text-white text-center lg:text-left font-semibold">
          Full-Stack Developer & Problem Solver | 6+ Years Building Digital Solutions
        </p>
        <p className="text-zinc-900 mb-4 text-base dark:text-white text-center lg:text-left">
          I specialize in crafting high-performance web applications and e-commerce platforms that drive business growth. My expertise spans modern frameworks (React, Vue.js, Laravel), e-commerce platforms (Shopify, WordPress), and custom backend solutions that scale.
        </p>
        
        <p className="text-zinc-900 mb-4 text-base dark:text-white text-center lg:text-left">
          At <b>Thermo Fisher Scientific</b>, <b>YEWS</b>, and <b>Setup Phils. Inc.</b>, I've partnered with ambitious teams to deliver projects that increased revenue, improved user experience, and optimized business processes. I thrive at the intersection of design and functionality.
        </p>
        
        <div className="bg-sky-500/10 dark:bg-sky-500/5 border border-sky-500/30 rounded-lg p-4 mb-4">
          <p className="text-sm text-zinc-700 dark:text-slate-300">
            <span className="font-bold text-sky-500">Why work with me?</span> I combine technical excellence with business acumen—ensuring every solution delivers measurable ROI and exceeds expectations.
          </p>
        </div>
        
        <p className="text-zinc-900 mb-4 text-base dark:text-white text-center lg:text-left">
          <b>Ready to turn your vision into reality?</b> Let's collaborate on your next project.
        </p>
      </div>
    </div>
  );
};

export default Hero;
