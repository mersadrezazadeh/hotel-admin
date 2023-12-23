import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");

  const open = setOpenId;
  const close = () => setOpenId("");

  return (
    <MenusContext.Provider value={{ openId, open, close }}>
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return (
    <div className="relative flex items-center justify-end">{children}</div>
  );
}

function Toggle({ id }) {
  const { openId, open, close } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      className="translate-x-2 rounded p-1 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <HiEllipsisVertical className="h-4 w-4 text-gray-700 dark:text-gray-200 xs:h-6 xs:w-6" />
    </button>
  );
}

function List({ id, children }) {
  const { openId, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return (
    <ul
      ref={ref}
      className="absolute -right-28 top-8 z-10 overflow-hidden rounded-lg bg-gray-0 text-gray-700 shadow-3xl dark:bg-gray-850 dark:text-gray-200 xs:-right-24 xs:top-10 sm:-right-20 md:-right-16 lg:-right-14 xl:-right-4"
    >
      {children}
    </ul>
  );
}

function Button({ icon, disabled, onClick, children }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        disabled={disabled}
        onClick={handleClick}
        className="flex w-full items-center gap-4 whitespace-nowrap px-6 py-3 text-left text-sm transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-900 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 [&>svg]:transition-all [&>svg]:duration-300 [&>svg]:dark:text-gray-500"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
