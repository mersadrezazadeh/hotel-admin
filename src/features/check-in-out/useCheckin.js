import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { toPersianNumber } from "../../utils/helpers";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const { isPending: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: (breakfast) =>
      updateBooking(bookingId, {
        status: "چک این",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ refetchType: "active" });
      navigate(-1);
      toast.success(`رزور ${toPersianNumber(bookingId)} با موفقیت چک این شد`);
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCheckingIn, checkin };
}
