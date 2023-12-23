import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useUser() {
  const { isPending: isAuthenticating, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    isAuthenticating,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}
