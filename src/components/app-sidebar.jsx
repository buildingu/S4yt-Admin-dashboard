import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { baseUrl } from "@/API";

const data = {
  user: {
    name: "Super Admin",
    email: "Building-u@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Manage Business",
      url: `${baseUrl}/admin-db/manage-business`,
      icon: Bot,
      items: [
        {
          title: "Add Business",
          url: `${baseUrl}/admin-db/manage-business/add-business`,
        },
        {
          title: "View Businesses",
          url: `${baseUrl}/admin-db/manage-business/view-businesses`,
        },
        {
          title: "Delete Business",
          url: `${baseUrl}/admin-db/manage-business/delete-business`,
        },
      ],
    },
    {
      title: "Manage Students",
      url: `${baseUrl}/admin-db/manage-users`,
      icon: BookOpen,
      items: [
        {
          title: "Ban Student",
          url: `${baseUrl}/admin-db/manage-users/ban-user`,
        },
        {
          title: "Kick Student",
          url: `${baseUrl}/admin-db/manage-users/kick-user`,
        },
        {
          title: "Manage Dubl-U-nes",
          url: `${baseUrl}/admin-db/manage-users/manage-tokens`,
        },
      ],
    },
    {
      title: "Manage Raffle Partners",
      url: `${baseUrl}/admin-db/manage-raffle`,
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Upload Item",
          url: `${baseUrl}/admin-db/manage-raffle/add-item`,
        },
        {
          title: "Remove Item",
          url: `${baseUrl}/admin-db/manage-raffle/remove-item`,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
