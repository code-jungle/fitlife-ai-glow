import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfileValidation } from '@/hooks/useProfileValidation';

interface RedirectIfLoggedInProps {
  children: React.ReactNode;
}

const RedirectIfLoggedIn = ({ children }: RedirectIfLoggedInProps) => {
  const { user, loading: authLoading } = useAuth();
  const { isProfileComplete, loading: profileLoading } = useProfileValidation(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !profileLoading && user) {
      if (isProfileComplete) {
        navigate('/dashboard');
      } else {
        navigate('/profile-setup');
      }
    }
  }, [user, authLoading, profileLoading, isProfileComplete, navigate]);

  // Show loading while checking auth and profile
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Carregando...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, don't render children (will redirect)
  if (user) {
    return null;
  }

  // If user is not logged in, render children (home page)
  return <>{children}</>;
};

export default RedirectIfLoggedIn;
