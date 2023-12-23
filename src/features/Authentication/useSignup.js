import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { isPending: isSigningUp, mutate: signup } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success("کاربر جدید با موفقیت ایجاد شد");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isSigningUp, signup };
}
