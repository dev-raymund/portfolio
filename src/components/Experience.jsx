import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { skills } from "../constants";

const Experience = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <div
          key={index}
          className="
            flex flex-col mb-10 rounded-md px-7 py-6
            bg-white/70 dark:bg-slate-900/60
            border border-slate-200 dark:border-slate-700
            hover:border-sky-500/60
            hover:-translate-y-1
            hover:ring-1 hover:ring-sky-500/30
            transition-all duration-300 ease-out
          "
        >
          <div className="w-full">
            <a
              href={item.link}
              target="_blank"
              className="flex items-center gap-2 mb-1 group"
            >
              <h4 className="text-lg text-sky-500 font-semibold group-hover:underline">
                {item.company}
              </h4>
              <FontAwesomeIcon
                className="text-sky-500 text-lg group-hover:scale-110"
                icon={faArrowUpRightFromSquare}
              />
            </a>

            <h5 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-1">
              {item.position}
            </h5>

            <h4 className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              {item.date}
            </h4>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.description}
            </p>

            <ul className="flex flex-wrap gap-3 mt-5">
              {item.technologies.map((technology, index) => {
                const matchSkill = skills.find(
                  (skill) => skill.title === technology
                );

                return (
                  <li
                    key={index}
                    className="
                      bg-slate-100 dark:bg-slate-300
                      border border-slate-200 dark:border-slate-700
                      rounded-lg p-2
                      hover:border-sky-500/60
                      transition
                    "
                  >
                    <a href="#">
                      <img
                        src={matchSkill.icon}
                        alt={matchSkill.title}
                        className="w-8 h-8 opacity-80 hover:opacity-100 transition"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default Experience;
