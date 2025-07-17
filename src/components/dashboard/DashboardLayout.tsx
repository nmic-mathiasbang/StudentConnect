"use client";

import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  children: ReactNode;
  navigation?: Array<{
    href: string;
    label: string;
  }>;
}

export function DashboardLayout({ children, navigation = [] }: DashboardLayoutProps) {
  const { user, logout } = useAuth();

  const getWelcomeMessage = () => {
    if (!user) return 'Welcome!';
    return user.user_type === 'student' ? user.first_name : user.company_name;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/95 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SC</span>
            </div>
            <span className="font-semibold text-xl">StudentConnect</span>
          </div>
          
          {navigation.length > 0 && (
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">
              Welcome, {getWelcomeMessage()}!
            </span>
            <Button variant="ghost" size="sm" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}