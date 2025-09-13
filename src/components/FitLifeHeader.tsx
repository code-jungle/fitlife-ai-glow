import { Menu, User, Dumbbell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const FitLifeHeader = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <div className="font-orbitron font-bold text-xl gradient-text">
            FitLife AI
          </div>
        </div>

      

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Show logout button only on dashboard */}
              {location.pathname === '/dashboard' && (
                <Button 
                  variant="outline" 
                  className="btn-secondary"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              )}
            </>
          ) : (
            <>
              
            </>
          )}
        </div>
       
      </div>
    </header>
  );
};

export default FitLifeHeader;