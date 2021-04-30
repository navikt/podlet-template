import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { worker } from "./mocks/browser";
import queryClient from "./query";
import { QueryClientProvider } from "react-query";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("podlet-template")
);
