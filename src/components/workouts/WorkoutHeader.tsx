import { Bell, Settings, User, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const WorkoutHeader = () => {
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: null },
    { name: "Treinos", href: "/workouts", icon: null },
    { name: "Alimentação", href: "/nutrition", icon: null },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <div className="font-orbitron font-bold text-xl gradient-text">
            FitLife AI
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`btn-ghost ${
                location.pathname === item.href ? "text-white" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="btn-ghost">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="btn-ghost">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="btn-ghost">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default WorkoutHeader;