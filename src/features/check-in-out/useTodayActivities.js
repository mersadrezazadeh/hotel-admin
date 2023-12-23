import { useQuery } from "@tanstack/react-query";
import { getTodayActivities } from "../../services/apiBookings";

export function useTodayActivities() {
  const {
    isPending,
    data: todayActivities,
    error,
  } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getTodayActivities,
  });

  return { isPending, todayActivities, error };
}
