import Uploader from "../data/Uploader";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useToggle } from "../hooks/useToggle";

import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  const { isToggled, toggle, close } = useToggle();
  const ref = useOutsideClick(close);

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-10 h-screen w-full backdrop-blur ${
          isToggled ? "block" : "hidden"
        }`}
      ></div>

      <aside
        ref={ref}
        className={`absolute z-20 row-span-2 flex h-screen w-[260px] flex-col gap-8 border-l border-gray-100 bg-gray-0 px-6 py-8 shadow-2xl transition-all duration-300 dark:border-gray-800 dark:bg-gray-850 lg:static lg:translate-x-0 lg:shadow-none ${
          isToggled ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Logo />
        <MainNav
          isToggled={isToggled}
          handleToggleNav={toggle}
          handleCloseNav={close}
        />

        <Uploader />
      </aside>
    </>
  );
}

export default Sidebar;
