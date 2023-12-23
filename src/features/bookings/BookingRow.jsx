import { useNavigate } from "react-router-dom";
import { format } from "date-fns-jalali";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";

import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import { formatCurrency, toPersianNumber } from "../../utils/helpers";

import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/confirmDelete";

function BookingRow({ booking }) {
  const navigate = useNavigate();
  const { isCheckingOut, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    cabins: { name: cabinName },
    guests: { fullName: guestName, phone },
  } = booking;

  return (
    <Table.Row>
      <div className="justify-self-center text-xs font-medium text-gray-600 dark:text-gray-300 xs:text-base">
        {toPersianNumber(cabinName)}
      </div>

      <div className="flex flex-col gap-0.5 justify-self-center">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-200 xs:text-sm">
          {guestName}
        </span>
        <span className="text-[10px] text-gray-500 dark:text-gray-400 xs:text-xs">
          {toPersianNumber(phone)}
        </span>
      </div>

      <div className="flex flex-col gap-0.5 justify-self-center">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-200 xs:text-sm">
          {toPersianNumber(numNights)} شب
        </span>
        <span className="text-[10px] text-gray-500 dark:text-gray-400 sm:text-xs">
          {toPersianNumber(format(new Date(startDate), "d MMMM "))} &mdash;{" "}
          {toPersianNumber(format(new Date(endDate), "d MMMM yyyy"))}
        </span>
      </div>

      <div className="justify-self-center">
        <Tag type={status}>{status}</Tag>
      </div>

      <div className="justify-self-center text-xs font-medium text-gray-700 dark:text-gray-200 sm:text-sm">
        {formatCurrency(totalPrice)}
      </div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />

          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              جزئیات
            </Menus.Button>

            {status === "تایید نشده" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                چک این
              </Menus.Button>
            )}

            {status === "چک این" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                disabled={isCheckingOut}
                onClick={() => checkout(bookingId)}
              >
                چک اوت
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>حذف</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={`رزرو ${toPersianNumber(bookingId)}`}
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
