import { Outlet } from "react-router-dom";
import { useRestoreSession } from "@/features/auth/hooks/useRestoreSession";

export const CommonLayout = () => {
  useRestoreSession();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Outlet />
    </div>
  );
};
