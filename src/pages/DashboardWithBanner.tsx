import { Activity, Target, TrendingUp, User, Dumbbell, Apple } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import QuickActions from "@/components/dashboard/QuickActions";
import ProfileIncompleteBanner from "@/components/ProfileIncompleteBanner";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useWorkouts } from "@/hooks/useWorkouts";
import { useNutrition } from "@/hooks/useNutrition";
import { useProfileValidation } from "@/hooks/useProfileValidation";

const DashboardWithBanner = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { workoutPlans } = useWorkouts();
  const { nutritionPlans } = useNutrition();
  const { isProfileComplete, loading: profileLoading } = useProfileValidation({ redirectOnIncomplete: false });

  // Show loading while checking profile
  if (profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Verificando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-poppins font-bold gradient-text mb-2">
            Olá, {profile?.full_name || user?.email?.split('@')[0] || 'Usuário'}! 
          </h1>
          <p className="text-muted-foreground text-lg">
            Acompanhe seu progresso e conquiste seus objetivos
          </p>
        </div>

        {/* Show banner if profile is incomplete */}
        {!isProfileComplete && <ProfileIncompleteBanner />}

        {/* Stats Grid */}
        <StatsGrid />
        
        {/* Quick Actions */}
        <QuickActions />
        
      </main>
    </div>
  );
};

export default DashboardWithBanner;
