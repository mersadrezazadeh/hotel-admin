function Heading({ type, children }) {
  if (type === "h1")
    return (
      <h1 className="text-2xl font-semibold leading-normal text-gray-700 dark:text-gray-200 xs:text-3xl">
        {children}
      </h1>
    );

  if (type === "h2")
    return (
      <h2 className="text-lg font-semibold leading-normal text-gray-700 dark:text-gray-200 xs:text-xl">
        {children}
      </h2>
    );

  if (type === "h3")
    return (
      <h3 className="text-lg font-medium leading-normal text-gray-700 dark:text-gray-200 xs:text-xl">
        {children}
      </h3>
    );

  if (type === "h4")
    return (
      <h3 className="text-center text-2xl font-semibold leading-normal text-gray-700 dark:text-gray-200 xs:text-3xl">
        {children}
      </h3>
    );
}

export default Heading;
