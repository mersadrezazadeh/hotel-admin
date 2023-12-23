import TodayItem from "./TodayItem";

function TodayList({ todayActivities }) {
  return (
    <ul className="hidden-scrollbar overflow-y-scroll [&::-webkit-scrollbar]:w-0">
      {todayActivities.map((activity) => (
        <TodayItem activity={activity} key={activity.id} />
      ))}
    </ul>
  );
}

export default TodayList;
