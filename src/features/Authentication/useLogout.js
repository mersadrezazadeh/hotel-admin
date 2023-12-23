import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isLoggingOut, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Clean all caches
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (err) => console.error(err),
  });

  return { isLoggingOut, logout };
}
