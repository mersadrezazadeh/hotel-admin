import { useCabins } from "./useCabins";
import { useUrl } from "../../hooks/useUrl";

import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isPending, cabins, error } = useCabins();
  const { readUrl } = useUrl();

  if (isPending) return <Spinner />;
  if (error) return <Empty resourceName="ویلایی" />;

  // FILTER
  const filteredValue = readUrl("discount") || "all";

  let filteredCabins;
  if (filteredValue === "all") filteredCabins = cabins;
  if (filteredValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => !cabin.discount);
  if (filteredValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount);

  // SORT
  const sortBy = readUrl("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins =
    // .localeCompare() just to sort persian values
    field === "name"
      ? filteredCabins.sort(
          (a, b) => a[field].localeCompare(b[field]) * modifier,
        )
      : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns="grid-cols-[25%,10%,20%,15%,10%,10%]">
        <Table.Header>
          <div className="text-gray-700 dark:text-gray-200"></div>
          <div className="text-gray-700 dark:text-gray-200">ویلا</div>
          <div className="text-gray-700 dark:text-gray-200">ظرفیت</div>
          <div className="text-gray-700 dark:text-gray-200">قیمت</div>
          <div className="text-gray-700 dark:text-gray-200">تخفیف</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
