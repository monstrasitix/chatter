import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import { Landing } from "@/view/landing";
import { ConversationProvider } from "./hooks/conversations";

function App() {
  return (
    <ConversationProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="*" Component={Landing} />
        </Routes>
      </BrowserRouter>
    </ConversationProvider>
  );
}

export function bootstrap(target: HTMLElement) {
  createRoot(target).render(<App />);
}
