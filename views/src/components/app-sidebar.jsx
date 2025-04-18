import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";


const data = {
  user: {
    name: "Super Admin",
  },

  navMain: [
    {
      title: "Manage Business",
      url: `/admin-db/manage-businesses`,
      icon: Bot,
      items: [
        {
          title: "View Businesses",
          url: `/admin-db/manage-businesses`,
        },
      ],
    },
    {
      title: "Manage Students",
      url: `/admin-db/manage-users`,
      icon: BookOpen,
      items: [
        {
          title: "Manage Students",
          url: `/admin-db/manage-users`,
        },
      ],
    },
    {
      title: "Manage Raffle",
      url: `/admin-db/manage-raffle`,
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Add Raffle Partner",
          url: `/admin-db/manage-raffle/add-partner`,
        },
        {
          title: "Manage Raffle Partners",
          url: `/admin-db/manage-raffle/manage-partners`,
        },
        {
          title: "Add Raffle Items",
          url: `/admin-db/manage-raffle/add-item`,
        },
        {
          title: "Manage Raffle Items",
          url: `/admin-db/manage-raffle/manage-items`,
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
