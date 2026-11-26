import { toast } from "@/components/ui/toast";
import { logoutMutation } from "@/features/auth/services/auth.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import type { LogoutResponse } from "@/features/auth/types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigateTo = useNavigate();
  const { setAccessToken, setUser, logout, setIsAuthenticated } =
    useAuthStore();
  const { mutate: logoutMutationFn, isPending } = useMutation({
    mutationFn: () => logoutMutation(),
    onSuccess: () => {
      //   const user = loginResponse?.userDetails;
      //   const normalizedRole = user.role.toLowerCase();
      setIsAuthenticated(false);
      setAccessToken("");
      setUser(null);
      navigateTo("/login");
      toast.add({
        type: "success",
        description: `Logged out successfully`,
      });
    },
    onError: () => {
      setIsAuthenticated(false);
      logout();
    },
  });

  return {
    logoutMutationFn,
    isPending,
  };
};
