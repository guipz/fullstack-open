import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationContextProvider } from "./context/notificationContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./context/userContext";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <UserContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>,
);
