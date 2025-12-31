import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto close sidebar on mobile & tablet
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex overflow-x-hidden relative"
      style={{ "--sidebar-space": sidebarOpen ? "300px" : "60px" }}
    >
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gray-100 transition-all duration-300 z-40
        ${sidebarOpen ? "w-[260px]" : "w-0"} overflow-hidden`}
      >
        <AppSidebar sidebarOpen={sidebarOpen} />
      </div>

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* Main Content */}
      <div
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarOpen && window.innerWidth >= 1024 ? 260 : 0 }}
      >
        <AppHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-2 sm:p-4 md:p-6">
          <div className="mx-auto max-w-screen-2xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
