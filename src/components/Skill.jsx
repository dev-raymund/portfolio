const Skill = ({ data }) => {
  return (
    <ul className="flex flex-wrap gap-4 justify-start">
      {data.map((item, index) => (
        <li
          key={index}
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: `${Math.min(index * 30, 600)}ms`, animationFillMode: "forwards" }}
        >
          <a href={item.link} className="group block">
            <div
              className="
                w-16 h-16 sm:w-20 sm:h-20
                flex items-center justify-center
                rounded-xl
                bg-white dark:bg-slate-800/60
                border border-slate-200 dark:border-slate-600
                shadow-sm
                group-hover:border-sky-500/50
                group-hover:shadow-md group-hover:shadow-sky-500/10
                group-hover:-translate-y-0.5
                transition-all duration-200 ease-out
              "
            >
              <img
                src={item.icon}
                alt={item.title}
                className="
                  w-8 h-8 sm:w-10 sm:h-10
                  opacity-80
                  group-hover:opacity-100
                  transition
                "
              />
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Skill;
