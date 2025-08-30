import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  userRole?: 'user' | 'staff';
  userName?: string;
}

export function Layout({ children, userRole = 'user', userName = 'Arnav Negi' }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar userRole={userRole} />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center justify-between px-6 border-b bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-primary" />
              <h1 className="text-lg font-semibold text-foreground">
                NSUTcater - {userRole === 'staff' ? 'Kitchen Dashboard' : 'Student Portal'}
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{userName}</span>
                <span className="text-muted-foreground">({userRole})</span>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}