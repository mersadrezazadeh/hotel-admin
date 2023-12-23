function Select({ type, onChange, options, value }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`rounded border bg-gray-0 px-3 py-2 text-sm font-medium text-gray-700 shadow dark:bg-gray-850 dark:text-gray-200 ${
        type === "white"
          ? "border-gray-100 dark:border-gray-800"
          : "border-gray-300 dark:border-gray-600"
      }`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
