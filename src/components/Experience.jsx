import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { skills } from "../constants";

const Experience = ({ data }) => {
  return (
    <div className="relative">
      <div className="space-y-16 md:space-y-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative flex items-start gap-6 md:gap-8 pl-0 ml-0 animate-fade-in-up opacity-0"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: "forwards" }}
          >
            {/* Timeline line segment - only between dots (no line after last dot) */}
            {index < data.length - 1 && (
              <div
                className="absolute left-5 top-10 w-0.5 bg-gradient-to-b from-sky-500 to-sky-400 z-0"
                style={{ height: "calc(100% + 4rem)" }}
                aria-hidden
              />
            )}
            {/* Timeline dot - on LEFT, animated pulse */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-sky-500 border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center ring-4 ring-sky-500/20 animate-pulse-dot">
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              </div>
            </div>

            {/* Content card - to the right of dot, all aligned left */}
            <div
              className="
                flex-1 min-w-0 rounded-2xl px-6 py-6 md:px-8 md:py-7
                bg-white dark:bg-slate-800/50
                border border-slate-200 dark:border-slate-600
                shadow-sm
                hover:border-sky-500/40
                hover:shadow-md hover:shadow-sky-500/5
                hover:-translate-y-0.5
                transition-all duration-200 ease-out
              "
            >
              {/* Date badge */}
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/20 dark:border-sky-500/30">
                <span className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                  {item.date}
                </span>
              </div>

              <a
                href={item.link}
                target="_blank"
                className="flex items-center gap-2 mb-3 group"
              >
                <h4 className="text-xl text-sky-500 font-semibold group-hover:underline">
                  {item.company}
                </h4>
                <FontAwesomeIcon
                  className="text-sky-500 text-base group-hover:scale-110 transition-transform"
                  icon={faArrowUpRightFromSquare}
                />
              </a>

              <h5 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                {item.position}
              </h5>

              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                {item.description}
              </p>

              {/* Technologies */}
              <ul className="flex flex-wrap gap-3">
                {item.technologies.map((technology, techIndex) => {
                  const matchSkill = skills.find(
                    (skill) => skill.title === technology
                  );

                  return (
                    <li
                      key={techIndex}
                      className="
                        bg-slate-100 dark:bg-slate-700/50
                        border border-slate-200 dark:border-slate-600
                        rounded-lg p-2
                        hover:border-sky-500/60
                        transition
                      "
                    >
                      <a href="#">
                        <img
                          src={matchSkill.icon}
                          alt={matchSkill.title}
                          className="w-7 h-7 opacity-80 hover:opacity-100 transition"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
