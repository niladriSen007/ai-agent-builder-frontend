import { router } from "@/routes/router";
import { QueryClientProvider as Wrapper } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./exports";


export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Wrapper client={queryClient}>
      {children}
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </Wrapper>
  );
};
