import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../contexts/DarkModeContext";

const startDataLight = [
  {
    duration: "۱ شب",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "۲ شب",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "۳ شب",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "۴-۵ شب",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "۶-۷ شب",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "۸-۱۴ شب",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "۱۵-۲۱ شب",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "+۲۱ شب",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "۱ شب",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "۲ شب",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "۳ شب",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "۴-۵ شب",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "۶-۷ شب",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "۸-۱۴ شب",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "۱۵-۲۱ شب",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "+۲۱ شب",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  }

  const data = stays
    .reduce((arr, stay) => {
      const num = stay.numNights;
      if (num === 1) return incArrayValue(arr, "۱ شب");
      if (num === 2) return incArrayValue(arr, "۲ شب");
      if (num === 3) return incArrayValue(arr, "۳ شب");
      if ([4, 5].includes(num)) return incArrayValue(arr, "۴-۵ شب");
      if ([6, 7].includes(num)) return incArrayValue(arr, "۶-۷ شب");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "۸-۱۴ شب");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "۱۵-۲۱ شب");
      if (num >= 21) return incArrayValue(arr, "+۲۱ شب");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ recentStays }) {
  const { isDarkMode } = useDarkMode();

  const startData = isDarkMode ? startDataDark : startDataLight;

  const data = prepareData(startData, recentStays);

  return (
    <div className="col-span-4 rounded-lg border border-gray-100 bg-gray-0 px-2 py-6 dark:border-gray-800 dark:bg-gray-850 sm:px-4 md:col-span-2 [&_.recharts-legend-item-text]:mr-1 [&_.recharts-legend-item]:text-right">
      <Heading type="h2">گزارش مدت اقامت</Heading>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={45}
            outerRadius={95}
            paddingAngle={5}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>

          <Legend
            verticalAlign="middle"
            align="left"
            width="30%"
            layout="vertical"
            iconSize={10}
            iconType="circle"
          />

          <Tooltip
            contentStyle={{
              fontSize: "14px",
              borderRadius: "6px",
              fontWeight: 600,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DurationChart;
