import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useUrl } from "../../hooks/useUrl";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const { readUrl } = useUrl();

  // FILTER
  const filteredValue = readUrl("status") || "all";
  const filter =
    filteredValue === "all"
      ? null
      : {
          field: "status",
          value:
            filteredValue === "checked-in"
              ? "چک این"
              : filteredValue === "checked-out"
                ? "چک اوت"
                : "تایید نشده",
        };

  // SORT
  const sortByRaw = readUrl("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = +readUrl("page") || 1;

  // QUERY
  const {
    isPending,
    // Giving data the initial value of {} to not get undefined error
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  // Calculate numPages to not fetch a non-existent page;
  const numPages = Math.ceil(count / PAGE_SIZE);

  // Pre-fetch next page
  if (page < numPages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  // Pre-fetch previous page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isPending, bookings, error, count };
}
