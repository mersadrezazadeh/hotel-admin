import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import TodayActivities from "../check-in-out/TodayActivities";
import DurationChart from "./DurationChart";
import IncomeChart from "./IncomeChart";

function DashboardLayout() {
  const { isPendingBookings, recentBookings } = useRecentBookings();
  const { isPendingStays, recentStays, numDays } = useRecentStays();
  const { isPending: isPendingCabins, cabins } = useCabins();

  if (isPendingBookings || isPendingStays || isPendingCabins)
    return <Spinner />;

  return (
    <div className="grid grid-cols-4 grid-rows-[auto,auto,340px,340px,450px] gap-3 sm:gap-6 md:grid-rows-[auto,340px,450px]">
      <Stats
        recentBookings={recentBookings}
        recentStays={recentStays}
        numDays={numDays}
        cabinsCount={cabins.length}
      />

      <TodayActivities />

      <DurationChart recentStays={recentStays} />

      <IncomeChart recentBookings={recentBookings} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
