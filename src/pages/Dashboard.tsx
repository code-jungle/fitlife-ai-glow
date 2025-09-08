import { Activity, Target, TrendingUp, User, Dumbbell, Apple } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentPlans from "@/components/dashboard/RecentPlans";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-poppins font-bold gradient-text mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Acompanhe seu progresso e conquiste seus objetivos
          </p>
        </div>

        {/* Stats Grid */}
        <StatsGrid />
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Recent Plans */}
        <RecentPlans />
      </main>
    </div>
  );
};

export default Dashboard;