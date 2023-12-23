import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency, toPersianNumber } from "../../utils/helpers";
import Stat from "./Stat";

function Stats({ recentBookings, recentStays, numDays, cabinsCount }) {
  const numBookings = recentBookings.length;

  const income = recentBookings.reduce(
    (acc, booking) => (acc += booking.totalPrice),
    0,
  );

  const checkins = recentStays.length;

  const occupancy = Math.round(
    (recentStays.reduce((acc, stay) => (acc += stay.numNights), 0) /
      (numDays * cabinsCount)) *
      100,
  );

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="رزور"
        value={toPersianNumber(numBookings)}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="درآمد"
        value={formatCurrency(income)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="چک این"
        value={toPersianNumber(checkins)}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="اسکان"
        value={`% ${toPersianNumber(occupancy)}`}
        color="yellow"
      />
    </>
  );
}

export default Stats;
