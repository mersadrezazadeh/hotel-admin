import { useNavigate } from "react-router-dom";

import { toPersianNumber } from "../../utils/helpers";

import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  const navigate = useNavigate();

  return (
    <li className="grid grid-cols-[40px,1fr,65px,60px] items-center gap-3 border-b border-gray-100 py-2 text-sm first:border-t dark:border-gray-800">
      {status === "تایید نشده" && <Tag type="چک این">ورود</Tag>}
      {status === "چک این" && <Tag type="چک اوت">خروج</Tag>}
      <div className="font-medium text-gray-700 dark:text-gray-200">
        {guests.fullName}
      </div>
      <div className="text-gray-700 dark:text-gray-200">
        {toPersianNumber(numNights)} شب
      </div>

      {status === "تایید نشده" && (
        <Button size="small" onClick={() => navigate(`/checkin/${id}`)}>
          چک این
        </Button>
      )}
      {status === "چک این" && <CheckoutButton bookingId={id} />}
    </li>
  );
}

export default TodayItem;
