import { useEffect } from "react";
import { Outlet, replace, useNavigate } from "react-router";
import { useAuth } from "~/contexts/authContext";
import { authService } from "~/services/authService";
import type { Route } from "./+types/_dash.layout";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kostosian" },
    { name: "description", content: "Manajemen Kos" },
  ];
}

const DashLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    authService.logout();
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar onLogout={handleLogout} />
      {/* <Sidebar onLogOut={handleLogout} /> */}
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
export default DashLayout;
