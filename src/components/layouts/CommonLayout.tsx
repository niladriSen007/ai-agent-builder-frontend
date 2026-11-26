import { Outlet } from "react-router-dom";
import { useRestoreSession } from "@/features/auth/hooks/useRestoreSession";

export const CommonLayout = () => {
  useRestoreSession();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
