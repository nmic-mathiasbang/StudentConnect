export type UserType = 'student' | 'company';

export interface BaseUser {
  id: string;
  user_id: string;
  email: string;
  user_type: UserType;
  created_at: string;
  updated_at: string;
}

export interface StudentProfile extends BaseUser {
  user_type: 'student';
  first_name: string;
  last_name: string;
  university: string;
  major: string;
  graduation_year: number;
  skills: string[];
  bio?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
  is_profile_complete: boolean;
}

export interface CompanyProfile extends BaseUser {
  user_type: 'company';
  company_name: string;
  industry: string;
  company_size: string;
  website?: string;
  description?: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_position: string;
  headquarters?: string;
  is_verified: boolean;
  is_profile_complete: boolean;
}

export type User = StudentProfile | CompanyProfile;

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  userType: UserType;
}

export interface StudentSignupData extends SignupCredentials {
  userType: 'student';
  firstName: string;
  lastName: string;
  university: string;
  major: string;
  graduationYear: number;
}

export interface CompanySignupData extends SignupCredentials {
  userType: 'company';
  companyName: string;
  industry: string;
  companySize: string;
  contactPerson: {
    firstName: string;
    lastName: string;
    position: string;
  };
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: StudentSignupData | CompanySignupData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}