"use client";

import { AppSidebar } from "@/components/AppSidebar";
import ClientAuthWrapper from "@/components/ClientAuthWrapper";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { MoonIcon, SunMediumIcon } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import "../globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Theme changer
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const handleToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="relative ">
      <div className="absolute inset-0 -z-10 h-full w-full  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="absolute -z-10 bottom-0 left-0 right-0 top-0 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] "></div>

      <ClientAuthWrapper>
        <SidebarProvider>
          <AppSidebar />
          <main className="px-6 pt-2 w-full">
            <div className="flex items-center justify-between mb-2">
              <SidebarTrigger />
              <Switch
                id="theme-mode"
                checked={isDarkMode}
                onCheckedChange={handleToggle}
                thumbClassName="h-7 w-7 data-[state=checked]:translate-x-6"
                className="h-8 w-14 ml-auto"
                icon={
                  isDarkMode ? (
                    <MoonIcon className="h-4 w-4" />
                  ) : (
                    <SunMediumIcon className="h-4 w-4" />
                  )
                }
              />
            </div>
            {children}
          </main>
          <Toaster/>
        </SidebarProvider>
      </ClientAuthWrapper>
    </div>
  );
}
