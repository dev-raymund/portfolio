import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Project = ({ data }) => {
  const [visibleProjects, setVisibleProjects] = useState(
    data.reduce((acc, item) => {
      acc[item.category] = 3;
      return acc;
    }, {})
  );

  const handleLoadMore = (category) => {
    setVisibleProjects((prev) => ({
      ...prev,
      [category]: prev[category] + 3,
    }));
  };

  return (
    <>
      {data.map((item, index) => (
        <div key={index} className="group py-8">
          <h3 className="text-1xl font-sans font-bold uppercase text-zinc-900 dark:text-white mb-5">
            {item.category}
          </h3>

          {item.project_list.length > 0 ? (
            item.project_list.slice(0, visibleProjects[item.category]).map((project, index) => (
              <div
                key={index}
                className="
                  md:flex rounded-md p-5 mb-5
                  bg-white/70 dark:bg-slate-900/60
                  border border-slate-200 dark:border-slate-700
                  hover:border-sky-500/60
                  hover:bg-white dark:hover:bg-slate-900
                  hover:-translate-y-1
                  hover:ring-1 hover:ring-sky-500/30
                  transition-all duration-300 ease-out
                "
              >
                <div className="w-full md:w-1/4 mr-5 mb-3">
                  <img
                    src={project.featured_image}
                    alt={project.title}
                    className="border border-sky-500 p-2 rounded-md"
                  />
                </div>
                <div className="w-full md:w-3/4">
                  <a
                    href={project.link}
                    target="_blank"
                    className="flex items-center gap-3 mb-3 group"
                  >
                    <h4 className="text-xl text-sky-500 font-bold group-hover:underline">
                      {project.title}
                    </h4>
                    <FontAwesomeIcon
                      className="text-sky-500 text-lg group-hover:scale-110"
                      icon={faArrowUpRightFromSquare}
                    />
                  </a>

                  {project.category && (
                    <div
                      className="
                      text-sky-500 text-xs font-semibold
                      w-fit px-3 py-1 mb-3 rounded-full
                      border border-sky-500/40
                      bg-sky-500/5
                    "
                    >
                      {project.category}
                    </div>
                  )}

                  <p
                    className="
                      text-base text-slate-600 dark:text-slate-300
                      leading-relaxed
                      xl:max-h-16 
                      xl:overflow-hidden
                      xl:relative
                      xl:after:absolute after:bottom-0 after:left-0 after:h-10 after:w-full
                      xl:after:bg-gradient-to-t
                      xl:after:from-white dark:after:from-slate-900
                      xl:after:to-transparent
                      xl:group-hover:after:hidden
                      xl:group-hover:max-h-96
                      xl:transition-all duration-300 ease-in-out
                    "
                  >
                    {project.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg dark:text-white">
              Projects to be added soon.
            </p>
          )}

          {item.project_list.length > 3 && visibleProjects[item.category] < item.project_list.length && (
            <div className="">
              <button 
                onClick={() => handleLoadMore(item.category)}
                className="w-fit font-sans text-white hover:text-sky-500 hover:bg-transparent p-3 rounded-md border-x border-y border-sky-500 bg-sky-500 transition duration-150 ease-in-out"
              >
                Load more {item.category} projects →
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Project;
