import { CommonLayout } from "@/components/layouts/CommonLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import PublicOnlyLayout from "@/layouts/PublicLayout";
import Login from "@/pages/auth/Login";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <>Hi</>,
          },
        ],
      },
      {
        element: <PublicOnlyLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);
