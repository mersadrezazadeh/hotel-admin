import Row from "../ui/Row";
import Heading from "../ui/Heading";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">لیست رزرو ها</Heading>

        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
