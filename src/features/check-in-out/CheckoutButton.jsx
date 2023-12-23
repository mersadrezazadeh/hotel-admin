import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkout } = useCheckout();

  return (
    <Button
      size="small"
      variation="danger"
      disabled={isCheckingOut}
      onClick={() => checkout(bookingId)}
    >
      چک اوت
    </Button>
  );
}

export default CheckoutButton;
