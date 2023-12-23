import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto,1fr] bg-gray-0 dark:bg-gray-850 lg:grid-cols-[260px,1fr]">
      <Sidebar />

      <Header />

      <main
        dir="ltr"
        className="overflow-y-scroll bg-gray-50 px-3 pb-8 pt-5 dark:bg-gray-900 xs:pb-16 xs:pt-10 sm:px-6"
      >
        <div dir="rtl" className="mx-auto flex max-w-7xl flex-col gap-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
