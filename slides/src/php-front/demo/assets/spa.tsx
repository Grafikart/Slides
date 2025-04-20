import { createRoot } from "react-dom/client";
import { Posts } from "./pages/Posts";
import { StrictMode } from "react";
import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();
console.log("hello");

const domNode = document.getElementById("root")!;
const root = createRoot(domNode).render(
  <StrictMode>
    <QueryClientProvider client={client}>
        <div className="my-6 container mx-auto">
          <Posts />
        </div>
    </QueryClientProvider>
  </StrictMode>
);
