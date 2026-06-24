import { useState } from "react";
import { homepageProjects } from "../constants";

const FILTERS = ["All", "Web design", "E-commerce"];

const Project = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? homepageProjects
      : homepageProjects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900/95 border-b border-slate-200/80 dark:border-slate-700/80"
    >
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-10 md:mb-12 animate-fade-in-up opacity-0 [animation-delay:50ms] [animation-fill-mode:forwards]">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-sky-500 dark:text-sky-400 mb-4">
            Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            A few recent projects from clients I've worked with.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-10 animate-fade-in-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-sky-500 text-white shadow-sm shadow-sky-500/25"
                  : "text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 hover:text-sky-500 dark:hover:text-sky-400"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Card grid — keyed on activeFilter to re-trigger entrance animations on tab change */}
        <div
          key={activeFilter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl overflow-hidden
                bg-white dark:bg-slate-800/50
                border border-slate-200 dark:border-slate-600
                shadow-sm
                hover:border-sky-500/40
                hover:shadow-md hover:shadow-sky-500/10
                hover:-translate-y-0.5
                transition-all duration-200 ease-out
                animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Image — 16:9 */}
              <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-700/30">
                <img
                  src={project.featured_image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-medium bg-slate-100/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 backdrop-blur-sm">
                  {project.stack}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-500 dark:text-sky-400 mb-2">
                  {project.category}
                </span>
                <h3 className="font-display font-bold text-lg leading-snug text-slate-900 dark:text-white mb-2 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1">
                  {project.description}
                </p>
                <div className="mt-4 text-xs font-medium text-sky-500 dark:text-sky-400">
                  View site →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
