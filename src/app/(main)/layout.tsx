import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { ModeToggle } from "@/components/ui/mode-toggle-button";
import "../globals.css";
import LogoutButton from "@/app/(login)/_components/logout-button";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Report",
  description: "Report handling system",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`w-screen h-screen ${roboto.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="z-10 bg-sidebar-accent w-full justify-end flex items-center pl-4 pr-4 pt-2 pb-2 fixed">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <ModeToggle />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <LogoutButton />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="h-full w-full flex justify-center items-center min-h-[650px]">
            {children}
          </div>
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
