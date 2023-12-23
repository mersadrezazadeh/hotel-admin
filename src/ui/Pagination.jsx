import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useUrl } from "../hooks/useUrl";
import { PAGE_SIZE } from "../utils/constants";
import { toPersianNumber } from "../utils/helpers";

const btnStyles = `flex items-center justify-center gap-1 rounded px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-brand-600 hover:text-brand-50 disabled:bg-gray-50 disabled:text-gray-300 dark:text-gray-200 dark:disabled:bg-gray-900 dark:disabled:text-gray-600`;

function Pagination({ count }) {
  const { readUrl, updateUrl } = useUrl();

  const numPages = Math.ceil(count / PAGE_SIZE);
  const curPage = +readUrl("page") || 1;
  const firstPage = curPage <= 1;
  const lastPage = curPage >= numPages;

  function handleNextPage() {
    if (!lastPage) updateUrl("page", curPage + 1);
  }

  function handlePrevPage() {
    if (!firstPage) updateUrl("page", curPage - 1);
  }

  if (numPages <= 1) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <p className="mr-2 text-sm text-gray-700 dark:text-gray-200 [&>span]:font-medium">
        نمایش <span>{toPersianNumber(PAGE_SIZE * (curPage - 1) + 1)}</span> تا{" "}
        <span>{toPersianNumber(lastPage ? count : curPage * PAGE_SIZE)}</span>{" "}
        از <span>{toPersianNumber(count)}</span> مورد
      </p>
      <div className="flex gap-1.5">
        <button
          onClick={handleNextPage}
          disabled={lastPage}
          className={btnStyles}
        >
          <HiChevronRight className="h-4 w-4 transition-none" />
          <span className="pl-1.5">بعد</span>
        </button>

        <button
          onClick={handlePrevPage}
          disabled={firstPage}
          className={btnStyles}
        >
          <span className="pr-1.5">قبل</span>
          <HiChevronLeft className="h-4 w-4 transition-none" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
