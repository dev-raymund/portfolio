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

        <h2 className="font-sans font-bold text-zinc-900 text-3xl xl:text-4xl mt-3 mb-10 dark:text-white">
          Web Developer
        </h2>

        <a
          href={pdf}
          target="_blank"
          className="font-sans text-sky-500 p-3 border-x border-y border-sky-500 hover:text-white hover:border-sky-500 hover:bg-sky-500 transition duration-150 ease-in-out"
        >
          Download CV <FontAwesomeIcon icon={faDownload} />
        </a>

        <Social />
      </div>

      <div className="lg:w-1/2 xl:w-full">
        <h3 className="font-sans text-sky-500 text-2xl font-bold mb-3 text-center lg:text-left">
          About
        </h3>
        <p className="text-zinc-900 mb-3 text-lg dark:text-white text-center lg:text-left">
          I’m a results-driven Web Developer with a strong foundation in both front-end and back-end development. With years of experience building responsive, scalable, and user-centric digital solutions, I bring a deep understanding of modern web technologies such as HTML, CSS, JavaScript, React, Vue.js, PHP, Laravel, WordPress, Shopify, and more.
        </p>
        <p className="text-zinc-900 mb-3 text-lg dark:text-white text-center lg:text-left">
          Throughout my career, I’ve contributed to diverse projects—from marketing websites and e-commerce platforms to custom ERP systems. My roles at companies like Thermo Fisher Scientific, YEWS, and Setup Phils. Inc. have strengthened my skills in agile development, cross-functional collaboration, and technical problem-solving.
        </p>
        <p className="text-zinc-900 mb-3 text-lg dark:text-white text-center lg:text-left">
          I stay current with the latest trends in web development and continuously expand my skill set to deliver elegant and high-performing solutions that meet real-world business needs.
        </p>
        <p className="text-zinc-900 mb-3 text-lg dark:text-white text-center lg:text-left">
          <b>Let’s build something exceptional together.</b>
        </p>
      </div>
    </div>
  );
};

export default Hero;
