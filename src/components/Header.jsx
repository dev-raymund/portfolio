import Navigation from "./Navigation";
import Social from "./Social";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import pdf from "../assets/files/RaymundHermosoCV.pdf";

const Header = () => {
  return (
    <>
      <h3 className="font-sans text-sky-500 text-xl font-bold mb-3">
        Hi, I am
      </h3>

      <h1 className="font-sans text-sky-500 text-6xl font-bold">
        Raymund Hermoso
      </h1>

      <h2 className="font-sans font-bold text-zinc-900 text-4xl mt-3 mb-2 dark:text-white">
        Full-Stack Web Developer
      </h2>

      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Transforming Ideas into High-Impact Solutions
      </p>

      <div className="pt-12 pb-12">
        <Navigation className="flex flex-col gap-2.5" />
      </div>

      <a
        href={pdf}
        target="_blank"
        className="w-fit font-sans text-white hover:text-sky-500 hover:bg-transparent p-3 rounded-md border border-sky-500 bg-sky-500 transition duration-150 ease-in-out"
      >
        Download CV <FontAwesomeIcon icon={faDownload} />
      </a>

      <Social />
    </>
  );
};

export default Header;
