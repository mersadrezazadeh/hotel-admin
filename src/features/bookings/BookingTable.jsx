import { useBookings } from "./useBookings";

import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import Menus from "../../ui/Menus";

function BookingTable() {
  const { isPending, bookings, error, count } = useBookings();

  if (isPending) return <Spinner />;

  if (error) return <Empty resourceName="رزروی" />;

  return (
    <Menus>
      <Table columns="grid-cols-[5%,25%,25%,15%,15%,10%]">
        <Table.Header>
          <div className="justify-self-center text-gray-700 dark:text-gray-200">
            ویلا
          </div>
          <div className="justify-self-center text-gray-700 dark:text-gray-200">
            مهمان
          </div>
          <div className="justify-self-center text-gray-700 dark:text-gray-200">
            تاریخ
          </div>
          <div className="justify-self-center text-gray-700 dark:text-gray-200">
            وضعیت
          </div>
          <div className="justify-self-center text-gray-700 dark:text-gray-200">
            مبلغ
          </div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
