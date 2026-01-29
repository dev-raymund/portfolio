const GITHUB_USERNAME = "dev-raymund";

const GitHubContributions = () => {
  return (
    <div className="w-full">
      <a
        href={`https://github.com/${GITHUB_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800/50 shadow-sm hover:border-sky-500/40 hover:shadow-md transition-all duration-200"
      >
        <img
          src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
          alt={`GitHub contribution graph for ${GITHUB_USERNAME}`}
          className="w-full h-auto"
        />
        <div className="px-4 py-3 text-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-600">
          GitHub contributions · @{GITHUB_USERNAME}
        </div>
      </a>
    </div>
  );
};

export default GitHubContributions;
