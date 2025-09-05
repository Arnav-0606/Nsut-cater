import { Home, ShoppingCart, Wallet, History, Clock, Users, ChefHat } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const userItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Order Food", url: "/order", icon: ShoppingCart },
  { title: "Order History", url: "/history", icon: History },
];

const staffItems = [
  { title: "Kitchen Display", url: "/kitchen", icon: ChefHat },
  { title: "Orders", url: "/staff/orders", icon: Clock },
  { title: "Menu Management", url: "/staff/menu", icon: Users },
];

interface AppSidebarProps {
  userRole?: 'user' | 'staff';
}

export function AppSidebar({ userRole = 'user' }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const items = userRole === 'staff' ? staffItems : userItems;
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "" 
      : "hover:bg-muted/50 transition-all duration-200";

  return (
    <Sidebar
      className={state === "collapsed" ? "w-14" : "w-60"}
      collapsible="icon"
    >
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ChefHat className="h-5 w-5 text-primary-foreground" />
            </div>
            {state !== "collapsed" && (
              <div>
                <h2 className="font-bold text-primary">CaterTrack</h2>
                <p className="text-xs text-muted-foreground capitalize">{userRole} Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>
            {userRole === 'staff' ? 'Kitchen Management' : 'Food & Orders'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}