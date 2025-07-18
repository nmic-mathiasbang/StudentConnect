"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AuthContextType, User, LoginCredentials, StudentSignupData, CompanySignupData, AuthState } from '@/types/auth';
import { createClientComponentClient } from '@/lib/supabase';
import { AuthError, Session } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  const supabase = createClientComponentClient();

  const fetchUserProfile = useCallback(async (session: Session) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setAuthState({ user: null, isLoading: false, isAuthenticated: false });
        return;
      }

      setAuthState({
        user: profile as User,
        isLoading: false,
        isAuthenticated: true
      });
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      setAuthState({ user: null, isLoading: false, isAuthenticated: false });
    }
  }, [supabase]);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        setAuthState({ user: null, isLoading: false, isAuthenticated: false });
        return;
      }
      
      if (session) {
        await fetchUserProfile(session);
      } else {
        setAuthState({ user: null, isLoading: false, isAuthenticated: false });
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await fetchUserProfile(session);
      } else if (event === 'SIGNED_OUT') {
        setAuthState({ user: null, isLoading: false, isAuthenticated: false });
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, fetchUserProfile]);

  const login = async (credentials: LoginCredentials) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        throw error;
      }

      // Profile will be fetched automatically via onAuthStateChange
    } catch (error) {
      console.error('Login failed:', error);
      // Better error handling with more details
      if (error instanceof AuthError) {
        throw error;
      } else if (error && typeof error === 'object' && 'message' in error) {
        throw new Error(error.message as string);
      } else {
        throw new Error('Login failed: Unknown error occurred');
      }
    }
  };

  const signup = async (data: StudentSignupData | CompanySignupData) => {
    try {
      // First, create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Failed to create user');
      }

      // Update the profile (it was already created by the trigger)
      const profileData = {
        user_type: data.userType,
        is_profile_complete: false,
        ...(data.userType === 'student' ? {
          first_name: data.firstName,
          last_name: data.lastName,
          university: data.university,
          major: data.major,
          graduation_year: data.graduationYear,
          skills: [] as string[],
        } : {
          company_name: data.companyName,
          industry: data.industry,
          company_size: data.companySize,
          contact_first_name: data.contactPerson.firstName,
          contact_last_name: data.contactPerson.lastName,
          contact_position: data.contactPerson.position,
          is_verified: false,
        })
      };

      const { error: profileError } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('user_id', authData.user.id);

      if (profileError) {
        // If profile creation fails, clean up the auth user
        await supabase.auth.signOut();
        throw profileError;
      }

      // Profile will be fetched automatically via onAuthStateChange
    } catch (error) {
      console.error('Signup failed:', error);
      // Better error handling with more details
      if (error instanceof AuthError) {
        throw error;
      } else if (error && typeof error === 'object' && 'message' in error) {
        throw new Error(error.message as string);
      } else {
        throw new Error('Signup failed: Unknown error occurred');
      }
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      // State will be updated automatically via onAuthStateChange
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!authState.user) {
        throw new Error('No authenticated user');
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', authState.user.user_id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setAuthState(prev => ({
        ...prev,
        user: data as User
      }));
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user: authState.user,
    isLoading: authState.isLoading,
    isAuthenticated: authState.isAuthenticated,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}