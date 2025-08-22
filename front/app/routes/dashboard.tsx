import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "~/contexts/authContext";
import { authService } from "~/services/authService";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import type { Route } from "./+types/dashboard";
import { GlobalSpinner } from "~/components/ui/loading-spinner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kostosian" },
    { name: "description", content: "Manajemen Kos" },
  ];
}

const DashLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate, mounted]);

  const handleLogout = () => {
    authService.logout();
  };

  if (!mounted || !isLoggedIn) {
    return <GlobalSpinner />;
  }

  return (
    <SidebarProvider>
      <AppSidebar onLogout={handleLogout} />
      {/* <Sidebar onLogOut={handleLogout} /> */}
      <main className="flex-1">
        <SidebarTrigger className="sticky top-0" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
export default DashLayout;
