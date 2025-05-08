"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, FilePlus, Sparkles, User } from "lucide-react";

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

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { getUserInBackend } from "@/lib/api/users";
import Image from "next/image";

const links = [
  { href: "/articles", label: "Artículos publicados", icon: FileText },
  { href: "/my-articles", label: "Tus artículos", icon: FilePlus },
  { href: "/generator", label: "Crear artículo", icon: Sparkles },
  { href: "/profile", label: "Tu perfil", icon: User },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<{
    name: string;
    email: string;
    uid: string;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (!firebaseUser) {
        router.replace("/login");
        return;
      }

      try {
        const token = await firebaseUser.getIdToken();
        const profile = await getUserInBackend(token);
        setUserProfile(profile);
      } catch (err) {
        console.error("Error al cargar perfil de backend:", err);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleClick = () => {
    router.push("/");
  };

  return (
    <Sidebar collapsible="icon" className="bg-background z-0" {...props}>
      <SidebarHeader className="bg-background flex-row items-center justify-center">
        <SidebarMenuButton
          onClick={handleClick}
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Image src={'/logo.png'} alt="logo" width={64} height={64}/>
          </div>
          <div className="flex-1 grid text-left text-sm leading-tight">
            <span className="truncate font-semibold">ContenAI</span>
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
            <SidebarMenuButton asChild>
              <NavUser
                user={
                  userProfile ?? {
                    name: "Cargando...",
                    email: "",
                    uid: "",
                  }
                }
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
