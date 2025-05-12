
import { useState } from "react";
import { cn } from "@/lib/utils";
import SideBar from "./SideBar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-web3-background text-web3-text">
      <SideBar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        <Header />
        
        <main className={cn(
          "flex-1 overflow-y-auto p-6",
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
