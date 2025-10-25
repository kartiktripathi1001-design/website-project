import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Users,
  Target,
  Activity,
  CreditCard,
  Settings,
  BarChart3,
  MessageSquare,
  FileText,
  LogOut,
  Menu,
  X,
  Bell,
  Shield
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Challenges', href: '/admin/challenges', icon: Target },
  { name: 'Monitoring', href: '/admin/monitoring', icon: Activity },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Support', href: '/admin/support', icon: MessageSquare },
  { name: 'Content', href: '/admin/content', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen admin-bg">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 admin-sidebar border-r neon-border-cyan">
          <div className="flex items-center justify-between p-6">
            <h2 className="text-lg font-semibold neon-text-cyan">FST Command Center</h2>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4 neon-text-cyan" />
            </Button>
          </div>
          <nav className="px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 scan-line ${
                    isActive 
                      ? 'neon-text-cyan neon-border-cyan bg-cyan-500/10' 
                      : 'text-muted-foreground hover:neon-text-blue hover:bg-blue-500/10'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:flex lg:flex-col admin-sidebar">
        <div className="flex items-center gap-2 p-6 border-b border-cyan-400/30">
          <Shield className="h-6 w-6 neon-text-cyan animate-pulse" />
          <h2 className="text-lg font-semibold neon-text-cyan">FST Command Center</h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 scan-line hover:scale-105 ${
                  isActive 
                    ? 'neon-text-cyan neon-border-cyan bg-cyan-500/10 pulse-glow' 
                    : 'text-muted-foreground hover:neon-text-blue hover:bg-blue-500/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 border-t border-cyan-400/30">
          <div className="hologram p-2 rounded text-center">
            <span className="text-xs neon-text-green">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-40 admin-card backdrop-blur-lg border-b neon-border-cyan data-stream">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden neon-text-cyan hover:bg-cyan-500/10"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold neon-text-cyan">Command Center</h1>
                <p className="text-sm neon-text-blue">Neural Network Interface</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="pulse-glow neon-text-orange">
                <Bell className="h-4 w-4" />
                <Badge variant="destructive" className="ml-1 h-4 w-4 p-0 text-xs animate-pulse">3</Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full neon-border-cyan">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/admin-avatar.png" alt="Admin" />
                      <AvatarFallback className="neon-text-cyan bg-cyan-500/10">SA</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 admin-card neon-border-cyan" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none neon-text-cyan">System Administrator</p>
                      <p className="text-xs leading-none neon-text-blue">neural@fst.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="border-cyan-400/30" />
                  <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-500/10 neon-text-orange">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 data-stream">
          <Outlet />
        </main>
      </div>
    </div>
  );
}