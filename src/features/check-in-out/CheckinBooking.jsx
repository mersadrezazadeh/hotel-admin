import { useEffect, useState } from "react";

import { useBooking } from "../bookings/useBooking";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency, toPersianNumber } from "../../utils/helpers";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "../bookings/BookingDataBox";
import Checkbox from "../../ui/Checkbox";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { isPending: isPendingBooking, booking = {} } = useBooking();
  const { isCheckingIn, checkin } = useCheckin();
  const { isPending: isPendingSettings, settings = {} } = useSettings();
  const moveBack = useMoveBack();

  const {
    id: bookingId,
    totalPrice,
    numGuests,
    hasBreakfast,
    isPaid,
    numNights,
  } = booking;

  const { breakfastPrice } = settings;

  const OptionalBreakfastPrice = numGuests * numNights * breakfastPrice;

  useEffect(() => setConfirmPaid(isPaid), [isPaid]);

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast)
      checkin({
        hasBreakfast: true,
        extraPrice: OptionalBreakfastPrice,
        totalPrice: totalPrice + OptionalBreakfastPrice,
      });
    else checkin({});
  }

  function handleAddBreakfast() {
    setAddBreakfast((breakfast) => !breakfast);

    if (isPaid) {
      addBreakfast ? setConfirmPaid(true) : setConfirmPaid(false);
    } else setConfirmPaid(false);
  }

  function handleConfirmPaid() {
    setConfirmPaid((confirm) => !confirm);
  }

  if (isPendingBooking || isPendingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">چک این رزور {toPersianNumber(bookingId)}</Heading>
        <ButtonText onClick={moveBack}>بازگشت &larr;</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <div className="rounded-lg bg-gray-0 px-10 py-6 text-gray-700 dark:bg-gray-850 dark:text-gray-200">
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={handleAddBreakfast}
          >
            اضافه کردن صبحانه به مبلغ {formatCurrency(OptionalBreakfastPrice)}
          </Checkbox>
        </div>
      )}

      <div className="rounded-lg bg-gray-0 px-10 py-6 text-gray-700 dark:bg-gray-850 dark:text-gray-200">
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={handleConfirmPaid}
        >
          تایید نهایی پرداخت به مبلغ{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : formatCurrency(totalPrice + OptionalBreakfastPrice)}
        </Checkbox>
      </div>

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          بازگشت
        </Button>

        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          چک این رزرو {toPersianNumber(bookingId)}
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
