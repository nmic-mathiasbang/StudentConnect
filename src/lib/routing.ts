import { User } from '@/types/auth';

export function getDashboardRoute(user: User | null): string {
  if (!user) return '/';
  
  switch (user.user_type) {
    case 'student':
      return '/dashboard/student';
    case 'company':
      return '/dashboard/company';
    default:
      return '/';
  }
}

export function getWelcomeMessage(user: User | null): string {
  if (!user) return 'Welcome!';
  
  switch (user.user_type) {
    case 'student':
      return `Welcome back, ${user.first_name}!`;
    case 'company':
      return `Welcome back, ${user.company_name}!`;
    default:
      return 'Welcome!';
  }
}

export function isAuthorizedForRoute(user: User | null, route: string): boolean {
  if (!user) return false;
  
  // Check if user is authorized for specific dashboard routes
  if (route.startsWith('/dashboard/student') && user.user_type !== 'student') {
    return false;
  }
  
  if (route.startsWith('/dashboard/company') && user.user_type !== 'company') {
    return false;
  }
  
  return true;
}