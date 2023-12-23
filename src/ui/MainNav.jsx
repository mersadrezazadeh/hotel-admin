import { NavLink } from "react-router-dom";
import {
  HiBars3,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const LinkStyles = `group flex items-center gap-3 px-6 py-3 text-gray-600 transition-all duration-300 hover:rounded hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900 [&>svg]:text-gray-400 [&>svg]:hover:text-brand-600 [&>svg]:dark:text-gray-500`;

const activeLinkStyles = `flex items-center gap-3 rounded bg-gray-50 px-6 py-3 text-gray-800 transition-all duration-300 hover:rounded hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-900 [&>svg]:text-brand-600`;

const iconStyles = `h-6 w-6 transition-all duration-300 group-hover:text-brand-600`;

function MainNav({ isToggled, handleToggleNav, handleCloseNav }) {
  return (
    <nav className="relative">
      <button
        className={`absolute left-[-33%] top-[-36%] transition-all duration-700 sm:left-[-38%] lg:hidden ${
          isToggled ? "rotate-90" : "rotate-180"
        }`}
        onClick={handleToggleNav}
      >
        <HiBars3 className="h-6 w-6 text-brand-600" />
      </button>

      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              isActive ? activeLinkStyles : LinkStyles
            }
            onClick={handleCloseNav}
          >
            <HiOutlineHome className={iconStyles} />
            <span>صفحه اصلی</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="bookings"
            className={({ isActive }) =>
              isActive ? activeLinkStyles : LinkStyles
            }
            onClick={handleCloseNav}
          >
            <HiOutlineCalendarDays className={iconStyles} />
            <span>رزرو</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="cabins"
            className={({ isActive }) =>
              isActive ? activeLinkStyles : LinkStyles
            }
            onClick={handleCloseNav}
          >
            <HiOutlineHomeModern className={iconStyles} />
            <span>ویلا</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="users"
            className={({ isActive }) =>
              isActive ? activeLinkStyles : LinkStyles
            }
            onClick={handleCloseNav}
          >
            <HiOutlineUsers className={iconStyles} />
            <span>کاربر</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="settings"
            className={({ isActive }) =>
              isActive ? activeLinkStyles : LinkStyles
            }
            onClick={handleCloseNav}
          >
            <HiOutlineCog6Tooth className={iconStyles} />
            <span>تنظیمات</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
