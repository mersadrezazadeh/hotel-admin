import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { toPersianNumber } from "../../utils/helpers";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { isPending: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) => updateBooking(bookingId, { status: "چک اوت" }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ refetchType: "active" });
      toast.success(`رزور ${toPersianNumber(data.id)} با موفقیت چک اوت شد`);
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCheckingOut, checkout };
}
