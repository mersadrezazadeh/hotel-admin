import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: "همه", value: "all" },
          { label: "بدون تخفیف", value: "no-discount" },
          { label: "با تخفیف", value: "with-discount" },
        ]}
      />

      <SortBy
        options={[
          { label: "به ترتیب نام (صعودی)", value: "name-asc" },
          { label: "به ترتیب نام (نزولی)", value: "name-desc" },
          { label: "به ترتیب قیمت (صعودی)", value: "regularPrice-asc" },
          { label: "به ترتیب قیمت (نزولی)", value: "regularPrice-desc" },
          { label: "به ترتیب ظرفیت (صعودی)", value: "maxCapacity-asc" },
          { label: "به ترتیب ظرفیت (نزولی)", value: "maxCapacity-desc" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
