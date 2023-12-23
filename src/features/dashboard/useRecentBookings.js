import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns-jalali";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useUrl } from "../../hooks/useUrl";

export function useRecentBookings() {
  const { readUrl } = useUrl();

  const numDays = +readUrl("last") || 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isPending: isPendingBookings,
    data: recentBookings,
    error,
  } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { isPendingBookings, recentBookings, error };
}
