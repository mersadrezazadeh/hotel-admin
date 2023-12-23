import HeaderMenu from "./HeaderMenu";
import UserAvatar from "./userAvatar";

function Header() {
  return (
    <header className="container relative z-10 flex max-w-[1350px] items-center justify-end gap-2 border-b border-gray-100 bg-gray-0 px-3 py-3 dark:border-gray-800 dark:bg-gray-850 xs:gap-4 sm:px-6">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
