import {
  BookOpen,
  Bot,

  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Building-U",
    email: "Building-u@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Manage Business",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Add Business",
          url: "#",
        },
        {
          title: "Edit Business",
          url: "#",
        },
        {
          title: "Delete Business",
          url: "#",
        },
      ],
    },
    {
      title: "Manage Students",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Add Student",
          url: "#",
        },
        {
          title: "Ban Student",
          url: "#",
        },
        {
          title: "Kick Student",
          url: "#",
        },
        {
          title: "Manage Dubl-U-nes",
          url: "#",
        },
      ],
    },
    {
      title: "Manage Raffle Partners",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Upload Item",
          url: "#",
        },
        {
          title: "Remove Item",
          url: "#",
        },
        {
          title: "Delete Item",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Edit Account",
          url: "#",
        },
        {
          title: "Change Password",
          url: "#",
        },

      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
