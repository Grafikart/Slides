import { createRoot } from "react-dom/client";
import { Posts } from "./pages/Posts";
import { StrictMode } from "react";
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();
console.log("hello");

const domNode = document.getElementById("root")!;
const root = createRoot(domNode).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <div className="bg-gray-50 my-6">
        <div className="container mx-auto">
          <Posts />
        </div>
      </div>
    </QueryClientProvider>
  </StrictMode>
);
