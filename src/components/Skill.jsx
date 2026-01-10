const Skill = ({ data }) => {
  return (
    <ul className="flex flex-wrap gap-3 justify-center lg:justify-start">
      {data.map((item, index) => (
        <li key={index}>
          <a href={item.link} className="group">
            <div
              className="
                w-20 h-20
                flex items-center justify-center
                rounded-md
                dark:bg-slate-300
                bg-slate-100 dark:bg-slate-900/60
                border border-slate-200 dark:border-slate-700
                group-hover:border-sky-500/60
                group-hover:-translate-y-1
                group-hover:ring-1 group-hover:ring-sky-500/30
                transition-all duration-300 ease-out
              "
            >
              <img
                src={item.icon}
                alt={item.title}
                className="
                  w-10 h-10
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
