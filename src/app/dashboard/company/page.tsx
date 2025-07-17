"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function CompanyDashboard() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!isLoading && isAuthenticated && user?.user_type !== 'company') {
      // Redirect to appropriate dashboard if wrong user type
      router.push('/dashboard/student');
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.user_type !== 'company') {
    return null; // Will redirect via useEffect
  }

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
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </a>
            <a href="#candidates" className="text-muted-foreground hover:text-foreground transition-colors">
              Candidates
            </a>
            <a href="#profile" className="text-muted-foreground hover:text-foreground transition-colors">
              Profile
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.company_name}!
            </span>
            <Button variant="ghost" size="sm" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user.company_name}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready to connect with talented students? Let&apos;s find your next great collaboration.
          </p>
        </div>

        {/* Company Profile Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Company Profile
              <Badge variant="secondary">Company</Badge>
              {user.is_verified && <Badge variant="default">Verified</Badge>}
            </CardTitle>
            <CardDescription>
              Complete your company profile to attract the best student talent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Company Information
                  </h3>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Company:</span> {user.company_name}</p>
                    <p><span className="font-medium">Industry:</span> {user.industry}</p>
                    <p><span className="font-medium">Size:</span> {user.company_size}</p>
                    <p><span className="font-medium">Website:</span> {user.website || 'Not added'}</p>
                    <p><span className="font-medium">Headquarters:</span> {user.headquarters || 'Not added'}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Contact Information
                  </h3>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Contact:</span> {user.contact_first_name} {user.contact_last_name}</p>
                    <p><span className="font-medium">Position:</span> {user.contact_position}</p>
                    <p><span className="font-medium">Email:</span> {user.email}</p>
                    <p><span className="font-medium">Verified:</span> {user.is_verified ? 'Yes' : 'Pending'}</p>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Profile Completion: {user.is_profile_complete ? 'Complete' : 'Incomplete'}
                </p>
              </div>
              <Button>
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">➕</span>
              </div>
              <CardTitle className="text-lg">Post New Project</CardTitle>
              <CardDescription>
                Create a new project and find talented students to work on it
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <CardTitle className="text-lg">Browse Students</CardTitle>
              <CardDescription>
                Discover talented students and their portfolios
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <CardTitle className="text-lg">Analytics</CardTitle>
              <CardDescription>
                Track your project performance and student engagement
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No active projects yet</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No applications yet</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No completed projects yet</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">Not enough data</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest interactions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Company Profile Created</p>
                  <p className="text-sm text-muted-foreground">
                    Welcome to StudentConnect! Start by posting your first project.
                  </p>
                </div>
              </div>
              <div className="text-center py-8 text-muted-foreground">
                <p>No recent activity yet. Start by posting a project!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}