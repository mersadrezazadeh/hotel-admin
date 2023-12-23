import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { label: "همه", value: "all" },
          { label: "چک این", value: "checked-in" },
          { label: "چک اوت", value: "checked-out" },
          { label: "تایید نشده", value: "unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { label: "به ترتیب تاریخ (جدید ترین)", value: "startDate-desc" },
          { label: "به ترتیب تاریخ (قدیمی ترین)", value: "startDate-asc" },
          { label: "به ترتیب مبلغ (صعودی)", value: "totalPrice-asc" },
          { label: "به ترتیب مبلغ (نزولی)", value: "totalPrice-desc" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
