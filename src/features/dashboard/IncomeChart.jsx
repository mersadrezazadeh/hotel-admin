import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns-jalali";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useDarkMode } from "../../contexts/DarkModeContext";
import { toPersianNumber } from "../../utils/helpers";

import Heading from "../../ui/Heading";

function IncomeChart({ recentBookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const colors = isDarkMode
    ? {
        totalIncome: { stroke: "#4f46e5", fill: "#4f46e5" },
        extraIncome: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalIncome: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extraIncome: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#ffffff",
      };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: toPersianNumber(format(date, "d MMMM")),

      totalIncome: recentBookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, booking) => (acc += booking.totalPrice), 0),

      extraIncome: recentBookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, booking) => (acc += booking.extraPrice), 0),
    };
  });

  return (
    <div
      className="col-span-full flex flex-col gap-6 rounded-lg border border-gray-100 bg-gray-0 px-2 py-8
dark:border-gray-800 dark:bg-gray-850 sm:px-4 [&_line]:stroke-gray-300 dark:[&_line]:stroke-gray-600"
    >
      <Heading type="h2">
        گزارش درآمد از تاریخ{" "}
        {toPersianNumber(format(subDays(new Date(), numDays - 1), "d MMMM"))} تا{" "}
        {toPersianNumber(format(new Date(), "d MMMM"))}
      </Heading>

      <ResponsiveContainer height="100%" width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text, fontSize: "14px" }}
            tickLine={{ stroke: colors.text }}
          />

          <YAxis
            dx={55}
            tick={{ fill: colors.text, fontSize: "12px" }}
            tickLine={{ stroke: colors.text }}
            orientation="right"
          />

          <CartesianGrid strokeDasharray="3" />

          <Tooltip
            contentStyle={{
              background: colors.background,
              color: colors.text,
              borderColor: colors.text,
              fontSize: "14px",
              borderRadius: "6px",
            }}
          />

          <Area
            dataKey="totalIncome"
            type="monotone"
            stroke={colors.totalIncome.stroke}
            fill={colors.totalIncome.fill}
            strokeWidth={2}
            name="کل درآمد"
            unit=" تومان"
          />

          <Area
            dataKey="extraIncome"
            type="monotone"
            stroke={colors.extraIncome.stroke}
            fill={colors.extraIncome.fill}
            strokeWidth={2}
            name="سایر درآمد ها"
            unit=" تومان"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeChart;
