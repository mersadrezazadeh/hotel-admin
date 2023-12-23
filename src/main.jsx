import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import ErrorFallback from "./ui/ErrorFallback.jsx";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
