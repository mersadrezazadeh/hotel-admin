import { useUrl } from "../hooks/useUrl";

function Filter({ filterField, options }) {
  const { readUrl, updateUrl } = useUrl();

  const currentFilter = readUrl(filterField) || options.at(0).value;

  function handleClick(value) {
    updateUrl(filterField, value);

    // If user paginated, go back to page 1 to not fetch a nonexistent page
    if (readUrl("page")) updateUrl("page", "1");
  }

  return (
    <div className="flex gap-1 rounded border border-gray-100 bg-gray-0 p-1 shadow dark:border-gray-800 dark:bg-gray-850">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={currentFilter === option.value}
          className={`rounded px-2 py-[5px] text-sm font-medium  transition-all duration-300 hover:bg-brand-600 hover:text-brand-50 dark:text-gray-200 dark:hover:bg-brand-600 ${
            currentFilter === option.value
              ? "bg-brand-600 text-brand-50"
              : "bg-gray-0 text-gray-700 dark:bg-gray-850"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
