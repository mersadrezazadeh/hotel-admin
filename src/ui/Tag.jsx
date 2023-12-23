function Tag({ type, children }) {
  return (
    <span
      className={`w-fit whitespace-nowrap rounded-full px-2 py-1 text-[8px] font-semibold sm:text-xs ${
        type === "تایید نشده"
          ? "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100"
          : ""
      } ${
        type === "چک این"
          ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
          : ""
      } ${
        type === "چک اوت"
          ? "bg-silver-100 text-silver-700 dark:bg-silver-700 dark:text-silver-100"
          : ""
      }`}
    >
      {children}
    </span>
  );
}

export default Tag;
