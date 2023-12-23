import { useNavigate } from "react-router-dom";

import { useBooking } from "./useBooking";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { toPersianNumber } from "../../utils/helpers";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/confirmDelete";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

function BookingDetail() {
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { isPending, booking } = useBooking();
  const { isCheckingOut, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  if (isPending) return <Spinner />;

  if (!booking) return <Empty resourceName="رزرو مورد نظر" />;

  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type="horizontal">
        <div className="flex items-center gap-6">
          <Heading type="h1">رزرو {toPersianNumber(bookingId)}</Heading>
          <Tag type={status}>{status}</Tag>
        </div>
        <ButtonText onClick={moveBack}>بازگشت &larr;</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <div className="flex items-center justify-end gap-6">
        <Button variation="secondary" onClick={moveBack}>
          بازگشت
        </Button>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">حذف</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`رزرو ${toPersianNumber(bookingId)}`}
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(bookingId, { onSettled: () => navigate(-1) });
              }}
            />
          </Modal.Window>
        </Modal>

        {status === "تایید نشده" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            چک این
          </Button>
        )}

        {status === "چک این" && (
          <Button disabled={isCheckingOut} onClick={() => checkout(bookingId)}>
            چک اوت
          </Button>
        )}
      </div>
    </>
  );
}

export default BookingDetail;
