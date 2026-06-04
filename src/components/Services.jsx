const services = [
  {
    title: "Website design & development",
    description:
      "WordPress, Shopify, or whatever the project calls for. From a clean 5-page brochure site to a 30-product Shopify store with custom checkout.",
    price: "Starting at $1,500",
  },
  {
    title: "Complete website package",
    description:
      "Website + branding + copy + SEO setup. Everything you need to launch a site that works, in one engagement. It's usually less expensive than buying each piece separately, and saves you the work of coordinating multiple freelancers.",
    price: "Starting at $2,500",
    featured: true,
  },
  {
    title: "Branding",
    description:
      "Logo, color system, and a visual identity that holds together — across your site, social, and anything you print.",
    price: "Starting at $500",
  },
  {
    title: "Copywriting",
    description:
      "Homepage and core-page copy that explains what you do in plain language. Less about clever wordplay, more about making sure visitors understand what you offer and what to do next.",
    price: "Starting at $400",
  },
  {
    title: "SEO setup",
    description:
      "On-page SEO, meta tags, site structure, and the technical basics that get you found. This isn't ongoing SEO consulting — it's making sure your site is properly set up from the start.",
    price: "Starting at $300",
  },
  {
    title: "Maintenance",
    description:
      "Updates, backups, security, and small content changes (text edits, image swaps, product updates). Month-to-month retainer, cancel anytime.",
    price: "Starting at $100/month",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-900/95 dark:to-slate-900 border-b border-slate-200/80 dark:border-slate-700/80"
    >
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-10 md:mb-14 animate-fade-in-up opacity-0 [animation-delay:50ms] [animation-fill-mode:forwards]">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-sky-500 dark:text-sky-400 mb-4">
            Services
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Most clients hire me for the full package — it's usually what a
            small business actually needs to launch a working site. Each piece
            is also available on its own.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`rounded-2xl transition-all duration-200 ease-out animate-fade-in-up opacity-0 [animation-fill-mode:forwards] ${
                service.featured
                  ? "p-7 md:p-8 bg-sky-50/60 dark:bg-sky-500/5 border border-sky-500 dark:border-sky-500/50 shadow-md shadow-sky-500/10 hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-0.5"
                  : "p-6 md:p-7 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-600 shadow-sm hover:border-sky-500/40 hover:shadow-md hover:shadow-sky-500/5 hover:-translate-y-0.5"
              }`}
              style={{ animationDelay: `${100 + index * 80}ms` }}
            >
              <h3
                className={`font-display font-bold text-slate-900 dark:text-white tracking-tight mb-3 ${
                  service.featured ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                }`}
              >
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                {service.description}
              </p>
              <p
                className={`font-semibold ${
                  service.featured
                    ? "text-sky-500 dark:text-sky-400 text-base"
                    : "text-sm text-slate-700 dark:text-slate-300"
                }`}
              >
                {service.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
