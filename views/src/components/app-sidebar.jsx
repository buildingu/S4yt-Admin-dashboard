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
      url: `${baseUrl}/admin-db/manage-businesses`,
      icon: Bot,
      items: [
        {
          title: "View Businesses",
          url: `${baseUrl}/admin-db/manage-businesses`,
        },
      ],
    },
    {
      title: "Manage Students",
      url: `${baseUrl}/admin-db/manage-users`,
      icon: BookOpen,
      items: [
        {
          title: "Manage Students",
          url: `${baseUrl}/admin-db/manage-users`,
        },
      ],
    },
    {
      title: "Manage Raffle",
      url: `${baseUrl}/admin-db/manage-raffle`,
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Add Raffle Partner",
          url: `${baseUrl}/admin-db/manage-raffle/add-partner`,
        },
        {
          title: "Manage Raffle Partners",
          url: `${baseUrl}/admin-db/manage-raffle/manage-partners`,
        },
        {
          title: "Add Raffle Items",
          url: `${baseUrl}/admin-db/manage-raffle/add-item`,
        },
        {
          title: "Manage Raffle Items",
          url: `${baseUrl}/admin-db/manage-raffle/manage-items`,
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
