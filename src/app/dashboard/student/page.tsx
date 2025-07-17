"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function StudentDashboard() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!isLoading && isAuthenticated && user?.user_type !== 'student') {
      // Redirect to appropriate dashboard if wrong user type
      router.push('/dashboard/company');
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

  if (!isAuthenticated || user?.user_type !== 'student') {
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
            <a href="#portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
              Portfolio
            </a>
            <a href="#profile" className="text-muted-foreground hover:text-foreground transition-colors">
              Profile
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.first_name}!
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
            Welcome back, {user.first_name}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready to work on some exciting projects? Let&apos;s get started.
          </p>
        </div>

        {/* Profile Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Your Profile
              <Badge variant="secondary">Student</Badge>
            </CardTitle>
            <CardDescription>
              Complete your profile to get matched with better opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Personal Information
                  </h3>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Name:</span> {user.first_name} {user.last_name}</p>
                    <p><span className="font-medium">Email:</span> {user.email}</p>
                    <p><span className="font-medium">University:</span> {user.university}</p>
                    <p><span className="font-medium">Major:</span> {user.major}</p>
                    <p><span className="font-medium">Graduation Year:</span> {user.graduation_year}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Skills & Portfolio
                  </h3>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Skills:</span> {user.skills?.length ? user.skills.join(', ') : 'None added yet'}</p>
                    <p><span className="font-medium">Portfolio:</span> {user.portfolio_url || 'Not added'}</p>
                    <p><span className="font-medium">LinkedIn:</span> {user.linkedin_url || 'Not added'}</p>
                    <p><span className="font-medium">GitHub:</span> {user.github_url || 'Not added'}</p>
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
                <span className="text-2xl">📋</span>
              </div>
              <CardTitle className="text-lg">Browse Projects</CardTitle>
              <CardDescription>
                Find exciting projects from companies looking for student talent
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <CardTitle className="text-lg">My Applications</CardTitle>
              <CardDescription>
                Track your project applications and their status
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <CardTitle className="text-lg">Portfolio</CardTitle>
              <CardDescription>
                Showcase your completed projects and achievements
              </CardDescription>
            </CardHeader>
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
                  <p className="font-medium">Profile Created</p>
                  <p className="text-sm text-muted-foreground">
                    Welcome to StudentConnect! Complete your profile to get started.
                  </p>
                </div>
              </div>
              <div className="text-center py-8 text-muted-foreground">
                <p>No recent activity yet. Start by browsing projects!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}