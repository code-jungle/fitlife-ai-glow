import { useProfile } from './useProfile';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface UseProfileValidationOptions {
  redirectOnIncomplete?: boolean;
  skipValidation?: boolean;
}

export const useProfileValidation = (options: UseProfileValidationOptions = {}) => {
  const { profile, loading } = useProfile();
  const navigate = useNavigate();
  const { redirectOnIncomplete = true, skipValidation = false } = options;

  const isProfileComplete = (profile: any) => {
    if (!profile) return false;
    
    return !!(
      profile.age &&
      profile.weight &&
      profile.height &&
      profile.activity_level &&
      profile.fitness_goal &&
      profile.gender
    );
  };

  const checkProfileAndRedirect = () => {
    if (!loading && profile && !isProfileComplete(profile) && redirectOnIncomplete && !skipValidation) {
      navigate('/profile-setup');
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (redirectOnIncomplete && !skipValidation) {
      checkProfileAndRedirect();
    }
  }, [profile, loading, redirectOnIncomplete, skipValidation]);

  return {
    isProfileComplete: isProfileComplete(profile),
    profile,
    loading,
    checkProfileAndRedirect
  };
};
