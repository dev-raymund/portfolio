import { experiences, skills, projects } from "../constants/index";
import Skill from "./Skill";
import Experience from "./Experience";
import Project from "./Project";
import Hero from "./Hero";

const Section = ({ id, title, children, className = "" }) => (
  <section
    id={id}
    className={`py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-700/80 last:border-0 ${className}`}
  >
    <div className="max-w-6xl mx-auto px-6">
      {title && (
        <h2 className="text-sm font-semibold uppercase tracking-wider text-sky-500 dark:text-sky-400 mb-8 md:mb-12 animate-fade-in-up opacity-0 [animation-delay:50ms] [animation-fill-mode:forwards]">
          {title}
        </h2>
      )}
      {children}
    </div>
  </section>
);

const AboutSection = () => (
  <Section id="about-detail" title="">
    <div className="prose prose-slate dark:prose-invert max-w-none animate-fade-in-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
        About me
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
        I’ve been building stuff on the web for over 6 years. I’m not really full-stack—I’m more in WordPress, plus some Shopify and a bit of design when it’s needed.
      </p>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
        My main thing is WordPress and Shopify—sites, themes, customisation. I’ve touched React, Vue, and Laravel on some projects, but my bread and butter is WordPress. I like when things are fast and easy to use.
      </p>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
        I’ve worked with teams at <strong>Thermo Fisher Scientific</strong>, <strong>YEWS</strong>, and <strong>Setup Phils. Inc.</strong>—building and fixing web apps, making things run smoother, and helping projects ship.
      </p>
      <div className="rounded-xl bg-sky-500/10 dark:bg-sky-500/5 border border-sky-500/20 dark:border-sky-500/10 p-5 my-6">
        <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base m-0">
          <span className="font-semibold text-sky-500 dark:text-sky-400">Why work with me?</span> I’m good at turning messy requirements into something that actually works. And I’ll tell you straight if something’s a bad idea.
        </p>
      </div>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed m-0">
        If you’ve got a project in mind, drop me a line.
      </p>
    </div>
  </Section>
);

const Body = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <Section id="skills" title="Skills">
        <Skill data={skills} />
      </Section>
      <Section id="experiences" title="Experience">
        <Experience data={experiences} />
      </Section>
      <Section id="projects" title="Projects">
        <Project data={projects} />
      </Section>
    </>
  );
};

export default Body;
