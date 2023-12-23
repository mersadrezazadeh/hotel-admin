import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";
import { formatCurrency, toPersianNumber } from "../../utils/helpers";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `کپی ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <img
        src={image}
        alt=""
        className="block aspect-video w-16 object-cover object-center xs:translate-x-[-15px] xs:scale-150 md:my-2 md:translate-x-[-35px] md:scale-[2] xl:my-4 xl:translate-x-[-55px] xl:scale-[2.5]"
      />
      <div className="font-medium text-gray-600 dark:text-gray-300 xs:text-base">
        {toPersianNumber(name)}
      </div>
      <div className="text-xs font-medium text-gray-600 dark:text-gray-300 xs:text-sm">
        حداکثر تا {toPersianNumber(maxCapacity)} نفر
      </div>
      <div className="text-xs font-medium text-gray-600 dark:text-gray-300 xs:text-sm">
        {formatCurrency(regularPrice)}
      </div>
      <div className="text-xs font-normal text-green-700 dark:text-green-100 xs:text-sm">
        {discount ? formatCurrency(discount) : <span>&mdash;</span>}
      </div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />

          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              کپی
            </Menus.Button>

            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>ویرایش</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>حذف</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`ویلا ${toPersianNumber(name)}`}
              onConfirm={() => deleteCabin(cabinId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default CabinRow;
