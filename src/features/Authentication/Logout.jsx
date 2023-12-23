import { HiArrowRightOnRectangle } from "react-icons/hi2";

import { useLogout } from "./useLogout";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { isLoggingOut, logout } = useLogout();
  return (
    <ButtonIcon disabled={isLoggingOut} onClick={logout}>
      {isLoggingOut ? (
        <SpinnerMini />
      ) : (
        <HiArrowRightOnRectangle className="[transform:rotateY(180deg)]" />
      )}
    </ButtonIcon>
  );
}

export default Logout;
