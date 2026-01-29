import { navigation } from "../constants";
import { useLocation } from "react-router-dom";

const Navigation = ({ className, onNavigate }) => {
  const location = useLocation();

  const handleClick = () => {
    if (typeof onNavigate === "function") onNavigate();
  };

  return (
    <ul className={className}>
      {navigation.map((item) => (
        <li key={item.id}>
          <a
            href={item.url}
            onClick={handleClick}
            className={`${
              item.url === location.hash
                ? "font-semibold text-sky-500 dark:text-sky-400"
                : "text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400"
            } text-sm font-medium transition-colors`}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
