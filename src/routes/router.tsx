import { CommonLayout } from "@/components/layouts/CommonLayout";
import AgentCreatePage from "@/features/agents/components/AgentCreatePage";
import AgentEditPage from "@/features/agents/components/AgentEditPage";
import AgentsPage from "@/features/agents/components/AgentsPage";
import ChatPage from "@/features/chat/components/ChatPage";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import PublicOnlyLayout from "@/layouts/PublicLayout";
import Login from "@/pages/auth/Login";
import Homepage from "@/pages/home/Homepage";
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
            element: <Homepage />,
          },
          {
            path: "chat",
            element: <ChatPage />,
          },
          {
            path: "agents",
            element: <AgentsPage />,
          },
          {
            path: "agents/new",
            element: <AgentCreatePage />,
          },
          {
            path: "agents/:agentId",
            element: <AgentEditPage />,
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
