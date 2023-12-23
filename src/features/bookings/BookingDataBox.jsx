import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { formatCurrency, toPersianNumber } from "../../utils/helpers";
import { format } from "date-fns-jalali";

import DataItem from "../../ui/DataItem";

function BookingDataBox({ booking }) {
  const {
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extraPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, phone, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <section
      className="overflow-hidden rounded-lg border border-gray-100
    bg-gray-0 dark:border-gray-800 dark:bg-gray-850"
    >
      <header className="flex items-center justify-between gap-3 bg-brand-500 px-3 py-5 text-indigo-100 sm:px-10">
        <div className="flex items-center gap-2 font-semibold xs:gap-4">
          <HiOutlineHomeModern className="h-6 w-6 xs:h-8 xs:w-8" />
          <p className="text-sm xs:text-lg">
            {toPersianNumber(numNights)} شب در ویلا
            <span className="mr-1 text-base xs:text-xl">
              {toPersianNumber(cabinName)}
            </span>
          </p>
        </div>

        <p className="text-[10px] font-bold xs:text-sm">
          {toPersianNumber(format(new Date(startDate), "EEEE, d MMMM"))} &mdash;{" "}
          {toPersianNumber(format(new Date(endDate), "EEEE, d MMMM yyyy"))}
        </p>
      </header>

      <section className="space-y-6 px-3 pb-3 pt-8 sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6 text-gray-500 dark:text-gray-400">
          <p className="font-medium text-gray-700 dark:text-gray-200">
            مهمان: {guestName}
            {numGuests > 1 ? ` + ${toPersianNumber(numGuests)} نفر` : ""}
          </p>
          <p>تماس: {toPersianNumber(phone)}</p>

          <p>کد ملی: {toPersianNumber(nationalID)}</p>
        </div>

        {observations && (
          <div className="text-gray-700 dark:text-gray-200">
            <DataItem
              label="توضیحات:"
              icon={<HiOutlineChatBubbleBottomCenterText />}
            >
              {toPersianNumber(observations)}
            </DataItem>
          </div>
        )}

        <div className="text-gray-700 dark:text-gray-200">
          <DataItem
            label="شامل صبحانه می‌باشد؟"
            icon={<HiOutlineCheckCircle />}
          >
            {hasBreakfast ? "بله" : "خیر"}
          </DataItem>
        </div>

        {/* price */}
        <div
          className={`mt-6 flex flex-wrap items-center justify-between gap-3 rounded px-4 py-4 xs:px-8 ${
            isPaid
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          <DataItem
            icon={<HiOutlineCurrencyDollar className="h-6 w-6 text-current" />}
            label="کل مبلغ"
          >
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} ویلا + ${formatCurrency(
                extraPrice,
              )} صبحانه)`}
          </DataItem>
          <p className="text-sm font-semibold">
            {isPaid ? "پرداخت شده" : "در انتظار پرداخت"}
          </p>
        </div>
      </section>
      <footer className="px-10 py-4 text-xs text-gray-500 dark:text-gray-400">
        <p>
          رزرو شده در{" "}
          {toPersianNumber(
            format(new Date(createdAt), "EEEE, dd MMMM yyyy, p"),
          )}
        </p>
      </footer>
    </section>
  );
}

export default BookingDataBox;
