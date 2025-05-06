"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  FilePlus,
  Sparkles,
  User,
  Feather,
} from "lucide-react";


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./navUser";


const links = [
  { href: "/articles", label: "Artículos publicados", icon: FileText },
  { href: "/my-articles", label: "Tus artículos", icon: FilePlus },
  { href: "/generator", label: "Generador de IA", icon: Sparkles },
  { href: "/profile", label: "Tu perfil", icon: User },
];

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com"
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const handleClick = () => {
      router.push("/");

  };
  return (
    <Sidebar collapsible="icon" className="bg-background" {...props}>
      <SidebarHeader className="bg-background items-center flex-row justify-center">
        
        <SidebarMenuButton
          onClick={handleClick}
          size="lg"
          className=" data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-7 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Feather  className="size-5" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">ContentAI</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent className="px-2 bg-background">
        <SidebarMenu>
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={href}>
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-2 bg-background">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className=" ">
              <NavUser user={data.user} />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
