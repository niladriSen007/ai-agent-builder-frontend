import { useEffect } from "react";
import { getMyDetails } from "../services/auth.api";
import { useAuthStore } from "../store/auth.store";
import type { MyDetailsResponse } from "../types";
import { useNavigate } from "react-router-dom";

let sessionRestorePromise: Promise<void> | null = null;

// function toUserState(user: LoginResponse): UserState {
// //   const normalizedRole = user.role.toLowerCase();
// //   const role: UserRole[] =
// //     normalizedRole === "admin" || normalizedRole === "customer"
// //       ? [normalizedRole]
// //       : [];

//   // console.log(user)

//   return {
//     // id: String(user.id),
//     name: `${user?.userDetails?.name}`.trim(),
//     email: user?.userDetails?.email,
//     profilePicture: user?.userDetails?.profilePicture,
//     accessToken: user?.userDetails?.accessToken
//   };
// }

export const useRestoreSession = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionRestorePromise) {
      return;
    }

    sessionRestorePromise = (async () => {
      try {
        const currentLoggedInUser: MyDetailsResponse = await getMyDetails();
        useAuthStore.getState().setAccessToken(currentLoggedInUser?.accessToken);
        useAuthStore.getState().setUser(currentLoggedInUser);
        useAuthStore.getState().setIsAuthenticated(true);
        navigate("/");

      } catch {
        useAuthStore.getState().logout();
      } finally {
        sessionRestorePromise = null;
      }
    })();
  }, [navigate]);
};
