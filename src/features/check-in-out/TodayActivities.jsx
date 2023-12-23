import { useTodayActivities } from "./useTodayActivities";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import TodayList from "./TodayList";

function TodayActivities() {
  const { isPending, todayActivities } = useTodayActivities();

  return (
    <div className="col-span-4 flex flex-col gap-6 rounded-lg border border-gray-100 bg-gray-0 px-2 pb-8 pt-6 dark:border-gray-800 dark:bg-gray-850 sm:px-4 md:col-span-2">
      <Row type="horizontal">
        <Heading type="h2">گزارش امروز</Heading>
      </Row>

      {isPending ? (
        <Spinner />
      ) : !todayActivities.length ? (
        <p className="mt-2 text-center text-lg font-medium text-gray-700 dark:text-gray-200">
          اطلاعاتی برای امروز وجود ندارد
        </p>
      ) : (
        <TodayList todayActivities={todayActivities} />
      )}
    </div>
  );
}

export default TodayActivities;
