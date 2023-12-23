function Stat({ icon, title, value, color }) {
  return (
    <div className="col-span-2 grid grid-cols-[48px,1fr] grid-rows-2 items-center gap-x-2 gap-y-1 rounded-lg border border-gray-100 bg-gray-0 p-2 dark:border-gray-800 dark:bg-gray-850 xs:gap-x-4 xs:p-4 sm:p-4 md:col-span-1">
      <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        {title}
      </h5>

      <p className="text-lg font-medium leading-3 text-gray-700 dark:text-gray-200 xs:text-2xl md:text-lg xl:text-2xl">
        {value}
      </p>

      <div
        className={`row-span-full flex aspect-square items-center justify-center rounded-full [&>svg]:h-8 [&>svg]:w-8 ${
          color === "blue" ? "bg-blue-100 [&>svg]:text-blue-700" : ""
        } ${color === "green" ? "bg-green-100 [&>svg]:text-green-700" : ""} ${
          color === "indigo" ? "bg-indigo-100 [&>svg]:text-indigo-700" : ""
        } ${color === "yellow" ? "bg-yellow-100 [&>svg]:text-yellow-700" : ""}`}
      >
        {icon}
      </div>
    </div>
  );
}

export default Stat;
