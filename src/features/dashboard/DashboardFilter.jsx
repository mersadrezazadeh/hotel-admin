import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        {
          value: "7",
          label: "۷ روز اخیر",
        },
        {
          value: "30",
          label: "۳۰ روز اخیر",
        },
        {
          value: "90",
          label: "۹۰ روز اخیر",
        },
      ]}
    />
  );
}

export default DashboardFilter;
