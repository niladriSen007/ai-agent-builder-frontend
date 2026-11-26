import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginMutation } from "../services/auth.api";
import { useAuthStore } from "../store/auth.store";
import type { LoginRequest, LoginResponse } from "../types";
import { toast } from "@/components/ui/toast";

export const useLogin = () => {
  const navigateTo = useNavigate();
  const { setAccessToken, setUser, logout, setIsAuthenticated } =
    useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginRequest) => loginMutation(data),
    onSuccess: (loginResponse: LoginResponse) => {
      const user = loginResponse?.userDetails;
      //   const normalizedRole = user.role.toLowerCase();
      setIsAuthenticated(true);
      setAccessToken(loginResponse?.userDetails?.accessToken);
      setUser({
        name: `${user.name}`.trim(),
        email: user.email,
        profilePicture: user?.profilePicture,
        accessToken: user?.accessToken
        // role:
        //   normalizedRole === "admin" || normalizedRole === "customer"
        //     ? [normalizedRole]
        //     : [],
      });
      navigateTo("/");
      toast.add({
        type: "success",
        description: `${user?.name} logged in successfully`,
      });
    },
    onError: () => {
      setIsAuthenticated(false);
      logout();
    },
  });

  return {
    mutate,
    isPending,
  };
};
