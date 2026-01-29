import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Project = ({ data }) => {
  const [visibleProjects, setVisibleProjects] = useState(
    data.reduce((acc, item) => {
      acc[item.category] = 6;
      return acc;
    }, {})
  );

  const handleLoadMore = (category) => {
    setVisibleProjects((prev) => ({
      ...prev,
      [category]: prev[category] + 6,
    }));
  };

  return (
    <>
      {data.map((categoryItem, categoryIndex) => (
        <div key={categoryIndex} className="mb-16 last:mb-0 animate-fade-in-up opacity-0" style={{ animationDelay: `${categoryIndex * 100}ms`, animationFillMode: "forwards" }}>
          {/* Category header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-wide">
              {categoryItem.category}
            </h3>
            {categoryItem.project_list.length > 6 && (
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {Math.min(visibleProjects[categoryItem.category], categoryItem.project_list.length)} / {categoryItem.project_list.length}
              </span>
            )}
          </div>

          {/* Projects grid */}
          {categoryItem.project_list.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryItem.project_list
                  .slice(0, visibleProjects[categoryItem.category])
                  .map((project, index) => (
                    <div
                      key={index}
                      className="group relative flex flex-col rounded-xl overflow-hidden animate-fade-in-up opacity-0
                        bg-white dark:bg-slate-800/50
                        border border-slate-200 dark:border-slate-600
                        shadow-sm
                        hover:border-sky-500/40
                        hover:shadow-lg hover:shadow-sky-500/10
                        hover:-translate-y-1
                        transition-all duration-300 ease-out"
                      style={{ animationDelay: `${categoryIndex * 100 + index * 50}ms`, animationFillMode: "forwards" }}
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-700/30">
                        <img
                          src={project.featured_image}
                          alt={project.title}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm flex items-center justify-center text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-sky-500 hover:text-white"
                        >
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-5">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/title"
                        >
                          <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover/title:text-sky-500 transition-colors line-clamp-1">
                            {project.title}
                          </h4>
                        </a>

                        {project.category && (
                          <div className="mb-3">
                            <span className="inline-block text-xs font-medium text-sky-600 dark:text-sky-400 px-2.5 py-1 rounded-full bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/20 dark:border-sky-500/30">
                              {project.category}
                            </span>
                          </div>
                        )}

                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 flex-1">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Load more button */}
              {categoryItem.project_list.length > 6 && 
               visibleProjects[categoryItem.category] < categoryItem.project_list.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => handleLoadMore(categoryItem.category)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors shadow-lg shadow-sky-500/25"
                  >
                    Load more {categoryItem.category} projects
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-lg text-slate-500 dark:text-slate-400 text-center py-8">
              Projects to be added soon.
            </p>
          )}
        </div>
      ))}
    </>
  );
};

export default Project;
