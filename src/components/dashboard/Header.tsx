
import React, { useState } from "react";
import { 
  Search, 
  Bell, 
  Wallet, 
  Settings, 
  Moon, 
  Sun, 
  ChevronDown 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Header({ className }: { className?: string }) {
  const [darkMode, setDarkMode] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New transaction", message: "You received 0.05 ETH", time: "5 min ago", read: false },
    { id: 2, title: "Smart contract alert", message: "Contract execution completed", time: "1 hour ago", read: false },
    { id: 3, title: "Network update", message: "Gas prices have decreased by 15%", time: "3 hours ago", read: true },
  ]);
  
  // Toggles notification read status
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? {...notif, read: true} : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real application, this would update the theme state
  };

  return (
    <header className="h-16 border-b border-white/10 bg-web3-background flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search size={18} className="text-web3-text-muted" />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-web3-accent text-web3-text placeholder:text-web3-text-muted transition-default"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 ml-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-lg hover:bg-white/5 transition-default">
              <Bell size={20} className="text-web3-text" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-web3-accent rounded-full flex items-center justify-center text-xs font-semibold">
                  {unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={5} align="end" className="w-72 bg-web3-card border-white/10 text-web3-text">
            <div className="px-4 py-3 border-b border-white/10">
              <h3 className="font-medium">Notifications</h3>
            </div>
            {notifications.length > 0 ? (
              <>
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex flex-col items-start px-4 py-3 hover:bg-white/5 cursor-pointer ${!notification.read ? 'bg-web3-accent/10' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between w-full">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-xs text-web3-text-muted">{notification.time}</span>
                    </div>
                    <span className="text-sm text-web3-text-muted mt-1">{notification.message}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="justify-center text-web3-accent hover:text-web3-accent-hover hover:bg-web3-accent/5">
                  View all notifications
                </DropdownMenuItem>
              </>
            ) : (
              <div className="py-8 text-center text-web3-text-muted">
                <p>No notifications</p>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Wallet Connect */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-web3-accent hover:bg-web3-accent-hover transition-default">
          <Wallet size={18} />
          <span className="font-medium">Connect</span>
        </button>

        {/* Settings */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-white/5 transition-default">
              <Settings size={20} className="text-web3-text" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={5} align="end" className="bg-web3-card border-white/10 text-web3-text">
            <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">Preferences</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">Help & Support</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dark/Darker Mode Toggle */}
        <button 
          onClick={toggleDarkMode} 
          className="p-2 rounded-lg hover:bg-white/5 transition-default"
        >
          {darkMode ? <Moon size={20} className="text-web3-text" /> : <Sun size={20} className="text-web3-text" />}
        </button>
      </div>
    </header>
  );
}

export default Header;
