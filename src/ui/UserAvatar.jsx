import { useUser } from "../features/Authentication/useUser";
import { toPersianNumber } from "../utils/helpers";

function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
      <img
        src={avatar || "../public/default-user.jpg"}
        alt={`تصویر ${fullName}`}
        className="block aspect-square w-9 rounded-full object-cover object-center outline-2 outline-gray-100 dark:outline-gray-800"
      />
      <span className="text-xs xs:text-sm">{toPersianNumber(fullName)}</span>
    </div>
  );
}

export default UserAvatar;
