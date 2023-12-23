import { useUrl } from "../hooks/useUrl";

import Select from "./Select";

function SortBy({ options }) {
  const { readUrl, updateUrl } = useUrl();

  const sortBy = readUrl("sortBy") || "";

  function handleChange(e) {
    updateUrl("sortBy", e.target.value);
  }

  return (
    <Select
      type="white"
      onChange={handleChange}
      options={options}
      value={sortBy}
    />
  );
}

export default SortBy;
