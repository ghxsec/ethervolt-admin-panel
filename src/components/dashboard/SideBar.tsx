
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Home, 
  LayoutDashboard, 
  Activity, 
  Wallet, 
  Settings, 
  Users, 
  Network, 
  ChartBar, 
  LogOut 
} from "lucide-react";
import { Link } from "react-router-dom";

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
};

const navItems: NavItem[] = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: Activity, label: "Activity", href: "/activity" },
  { icon: Wallet, label: "Wallet", href: "/wallet" },
  { icon: ChartBar, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: Network, label: "Network", href: "/network" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function SideBar({ className, collapsed = false, onToggle }: { 
  className?: string,
  collapsed?: boolean,
  onToggle?: () => void 
}) {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connected');

  return (
    <aside className={cn(
      "flex flex-col h-screen transition-all duration-300 ease-in-out bg-web3-background border-r border-white/10",
      collapsed ? "w-20" : "w-64",
      className
    )}>
      {/* Brand Logo */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-gradient-accent flex items-center justify-center">
              <span className="font-bold text-white">W3</span>
            </div>
            <h1 className="ml-2 text-lg font-bold text-white">Web3 Admin</h1>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 mx-auto rounded-md bg-gradient-accent flex items-center justify-center">
            <span className="font-bold text-white">W3</span>
          </div>
        )}
        <button onClick={onToggle} className="text-web3-text-muted hover:text-white transition-colors duration-200">
          {/* Toggle button visuals */}
          <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
            <div className="h-0.5 w-3 bg-current rounded-full"></div>
            <div className="h-0.5 w-5 bg-current rounded-full"></div>
            <div className="h-0.5 w-3 bg-current rounded-full"></div>
          </div>
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto scrollbar-hidden">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex items-center gap-x-3 px-3 py-3 rounded-lg transition-default",
              item.active 
                ? "bg-web3-accent text-white" 
                : "text-web3-text-muted hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
      
      {/* User Profile & Connection Status */}
      <div className="p-4 border-t border-white/10 space-y-4">
        <div className={cn(
          "flex items-center gap-x-3 p-2 rounded-lg",
          collapsed ? "justify-center" : ""
        )}>
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-web3-card flex items-center justify-center text-white">
              <Users size={18} />
            </div>
            <div className={cn(
              "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-web3-background",
              connectionStatus === 'connected' ? "bg-web3-success" : 
              connectionStatus === 'connecting' ? "bg-web3-warning" : 
              "bg-web3-error"
            )}></div>
          </div>
          
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">Alex Doe</span>
              <span className="text-xs text-web3-text-muted">
                {connectionStatus === 'connected' ? 'Connected' : 
                 connectionStatus === 'connecting' ? 'Connecting...' : 
                 'Disconnected'}
              </span>
            </div>
          )}
        </div>
        
        <button className={cn(
          "flex items-center gap-x-2 w-full px-3 py-2 rounded-lg text-web3-text-muted hover:text-white hover:bg-white/5 transition-default",
          collapsed ? "justify-center" : ""
        )}>
          <LogOut size={18} />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
