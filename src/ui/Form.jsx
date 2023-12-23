function Form({ type = "regular", onSubmit, children }) {
  return (
    <form
      onSubmit={onSubmit}
      className={`overflow-hidden text-sm ${
        type === "regular"
          ? "rounded-lg border border-gray-100 bg-gray-0 px-4 py-6 dark:border-gray-800 dark:bg-gray-800 md:px-10"
          : ""
      }
      ${type === "modal" ? "max-w-[800px]" : "shadow-xl"}`}
    >
      {children}
    </form>
  );
}

export default Form;
