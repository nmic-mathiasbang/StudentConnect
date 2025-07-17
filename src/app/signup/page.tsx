"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserType, StudentSignupData, CompanySignupData } from '@/types/auth';
import { getDashboardRoute } from '@/lib/routing';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const { signup, isAuthenticated, isLoading, user } = useAuth();
  const [activeTab, setActiveTab] = useState<UserType>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      const dashboardRoute = getDashboardRoute(user);
      router.push(dashboardRoute);
    }
  }, [isAuthenticated, isLoading, user, router]);

  const [studentData, setStudentData] = useState<Omit<StudentSignupData, 'userType'>>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    university: '',
    major: '',
    graduationYear: new Date().getFullYear() + 1,
  });

  const [companyData, setCompanyData] = useState<Omit<CompanySignupData, 'userType'>>({
    email: '',
    password: '',
    companyName: '',
    industry: '',
    companySize: '',
    contactPerson: {
      firstName: '',
      lastName: '',
      position: '',
    },
  });

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await signup({ ...studentData, userType: 'student' });
      // Redirect will happen automatically via auth state change
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await signup({ ...companyData, userType: 'company' });
      // Redirect will happen automatically via auth state change
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking authentication
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">SC</span>
            </div>
            <span className="font-semibold text-2xl">StudentConnect</span>
          </div>
          <p className="text-muted-foreground">
            Join our community today
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Choose your account type to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UserType)}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student" className="text-base">Student</TabsTrigger>
                <TabsTrigger value="company" className="text-base">Company</TabsTrigger>
              </TabsList>
              
              <TabsContent value="student" className="space-y-4">
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={studentData.firstName}
                        onChange={(e) => setStudentData(prev => ({ ...prev, firstName: e.target.value }))}
                        disabled={isSubmitting}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={studentData.lastName}
                        onChange={(e) => setStudentData(prev => ({ ...prev, lastName: e.target.value }))}
                        disabled={isSubmitting}
                        required
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@university.edu"
                      value={studentData.email}
                      onChange={(e) => setStudentData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={isSubmitting}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a secure password"
                      value={studentData.password}
                      onChange={(e) => setStudentData(prev => ({ ...prev, password: e.target.value }))}
                      disabled={isSubmitting}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="university" className="text-sm font-medium">
                      University
                    </label>
                    <Input
                      id="university"
                      placeholder="University of California, Berkeley"
                      value={studentData.university}
                      onChange={(e) => setStudentData(prev => ({ ...prev, university: e.target.value }))}
                      disabled={isSubmitting}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="major" className="text-sm font-medium">
                      Major
                    </label>
                    <Input
                      id="major"
                      placeholder="Computer Science"
                      value={studentData.major}
                      onChange={(e) => setStudentData(prev => ({ ...prev, major: e.target.value }))}
                      disabled={isSubmitting}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="graduationYear" className="text-sm font-medium">
                      Graduation Year
                    </label>
                    <Input
                      id="graduationYear"
                      type="number"
                      min={new Date().getFullYear()}
                      max={new Date().getFullYear() + 10}
                      value={studentData.graduationYear}
                      onChange={(e) => setStudentData(prev => ({ ...prev, graduationYear: parseInt(e.target.value) }))}
                      disabled={isSubmitting}
                      required
                      className="h-11"
                    />
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full h-11 text-base" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating Account...' : 'Create Student Account'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="company" className="space-y-4">
                <form onSubmit={handleCompanySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="text-sm font-medium">
                      Company Name
                    </label>
                    <Input
                      id="companyName"
                      placeholder="Acme Corp"
                      value={companyData.companyName}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, companyName: e.target.value }))}
                      disabled={isSubmitting}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="companyEmail" className="text-sm font-medium">
                      Company Email
                    </label>
                    <Input
                      id="companyEmail"
                      type="email"
                      placeholder="hr@company.com"
                      value={companyData.email}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={isSubmitting}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="companyPassword" className="text-sm font-medium">
                      Password
                    </label>
                    <Input
                      id="companyPassword"
                      type="password"
                      placeholder="Create a secure password"
                      value={companyData.password}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, password: e.target.value }))}
                      disabled={isSubmitting}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="industry" className="text-sm font-medium">
                      Industry
                    </label>
                    <Input
                      id="industry"
                      placeholder="Technology"
                      value={companyData.industry}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, industry: e.target.value }))}
                      disabled={isSubmitting}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="companySize" className="text-sm font-medium">
                      Company Size
                    </label>
                    <select
                      id="companySize"
                      value={companyData.companySize}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, companySize: e.target.value }))}
                      className="w-full h-11 px-3 py-2 border border-input rounded-md bg-background text-sm"
                      disabled={isSubmitting}
                      required
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Person</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="First Name"
                        value={companyData.contactPerson.firstName}
                        onChange={(e) => setCompanyData(prev => ({ 
                          ...prev, 
                          contactPerson: { ...prev.contactPerson, firstName: e.target.value }
                        }))}
                        disabled={isSubmitting}
                        required
                        className="h-11"
                      />
                      <Input
                        placeholder="Last Name"
                        value={companyData.contactPerson.lastName}
                        onChange={(e) => setCompanyData(prev => ({ 
                          ...prev, 
                          contactPerson: { ...prev.contactPerson, lastName: e.target.value }
                        }))}
                        disabled={isSubmitting}
                        required
                        className="h-11"
                      />
                    </div>
                    <Input
                      placeholder="Position/Title"
                      value={companyData.contactPerson.position}
                      onChange={(e) => setCompanyData(prev => ({ 
                        ...prev, 
                        contactPerson: { ...prev.contactPerson, position: e.target.value }
                      }))}
                      disabled={isSubmitting}
                      required
                      className="h-11"
                    />
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full h-11 text-base" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating Account...' : 'Create Company Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}