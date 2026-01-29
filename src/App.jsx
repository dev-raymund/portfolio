import Body from "./components/Body";
import Header from "./components/Header";

import ToggleDarkMode from "./components/ToggleDarkMode";

import Navigation from "./components/Navigation";

import MobileDrawer from "./components/MobileDrawer";
import BurgerNavigation from "./components/BurgerNavigation";

import { Analytics } from "@vercel/analytics/next"

function App() {
  return (
    <>
      <div className="dark:bg-slate-900 bg-slate-50 transition duration-300 ease-in-out">
        <div className="fixed top-20 xl:top-5 right-5 z-10">
          <ToggleDarkMode />
        </div>

        <MobileDrawer />

        <div className="block xl:hidden sticky top-0 bg-white shadow-md z-10 dark:bg-slate-900 transition duration-300 ease-in-out">
          <div className="container px-3 md:px-10 mx-auto">
            <div className="flex pt-3 pb-3 items-center">
              <div className="w-1/2">
                <h2 className="font-sans text-sky-500 text-4xl font-bold">
                  RH
                </h2>
              </div>
              <div className="w-1/2">
                <Navigation className="hidden justify-end gap-5 md:flex" />
                <BurgerNavigation />
              </div>
            </div>
          </div>
        </div>

        <div className="container px-3 md:px-10 mx-auto">
          <div className="flex gap-12">
            <div className="hidden xl:flex xl:justify-center xl:flex-col w-2/5 sticky top-0 max-h-screen">
              <Header />
            </div>

            <div className="xl:w-3/5 pb-10">
              <Body />
            </div>
          </div>
        </div>
      </div>

      <Analytics />
    </>
  );
}

export default App;
