import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns-jalali";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useUrl } from "../../hooks/useUrl";

export function useRecentStays() {
  const { readUrl } = useUrl();

  const numDays = +readUrl("last") || 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isPending: isPendingStays,
    data,
    error,
  } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  // get only checked-in and checked-out stays
  const recentStays = data?.filter((stay) => stay.status !== "تایید نشده");

  return { isPendingStays, recentStays, error, numDays };
}
