import { useSearchParams } from "react-router-dom";

export function useUrl() {
  const [searchParams, setSearchParams] = useSearchParams();

  const readUrl = (name) => searchParams.get(name);

  function updateUrl(name, value) {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  }

  return { readUrl, updateUrl };
}
