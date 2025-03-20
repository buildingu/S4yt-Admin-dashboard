import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function SuperAdminPanel() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#333] md:w-[1000px] text-center">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
