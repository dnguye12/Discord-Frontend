import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { SocketProvider } from "./providers/socket-provider.jsx";
import { QueryProvider } from "./providers/query-provider.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk publishable key to the .env.local file')
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" >
    <Router>
      <SocketProvider>
        <QueryProvider >
          <App />
        </QueryProvider>
      </SocketProvider>
    </Router>
  </ClerkProvider>
);