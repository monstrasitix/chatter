import { clsx } from "clsx";
import { lazy, useState } from "react";
import { Route, Routes } from "react-router";

import { useScreenWidth } from "@/hooks/screen-width";

const Sidebar = lazy(() => import("@/view/sidebar"));
const Welcome = lazy(() => import("@/view/welcome"));
const Conversation = lazy(() => import("@/view/conversation"));

export function Landing() {
  const width = useScreenWidth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen((open) => !open);
  };

  const sidebarClassName = clsx("landing-sidebar", {
    "-open": width >= 1000 && isSidebarOpen,
  });

  return (
    <div className="landing">
      <div className={sidebarClassName}>
        <Sidebar />
      </div>

      <div className="landing-main">
        <div className="landing-navbar">
          <button
            type="button"
            className="button -secondary"
            onClick={handleSidebarToggle}
          >
            <i className="fa fa-bars" />
          </button>
        </div>

        <div className="landing-room">
          <Routes>
            <Route index Component={Welcome} />
            <Route
              path="/conversation/:conversation"
              Component={Conversation}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
