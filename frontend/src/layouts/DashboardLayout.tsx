import { useLocation, Outlet } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";

const pageMap: Record<string, string> = {
  "/": "Dashboard",
  "/loans": "Préstamos",
  "/books": "Libros",
  "/authors": "Autores",
  "/publishers": "Editoriales",
  "/courses": "Cursos",
  "/students": "Estudiantes",
  "/users": "Usuarios",
  "/profile": "Perfil",
};

const DashboardLayout = () => {
  const location = useLocation();
  const page = pageMap[location.pathname] || "Desconocido";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
          <div className="flex h-14 w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <Separator orientation="vertical" />
              <div>{page}</div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <ModeToggle />
            </div>
          </div>
        </header>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
