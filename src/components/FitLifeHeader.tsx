import { Menu, User, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

const FitLifeHeader = () => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <div className="font-orbitron font-bold text-xl gradient-text">
            FitLife AI
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="btn-ghost">
            Recursos
          </a>
          <a href="#workouts" className="btn-ghost">
            Treinos
          </a>
          <a href="#nutrition" className="btn-ghost">
            Nutrição
          </a>
          <a href="#ai" className="btn-ghost">
            IA Personal
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex btn-ghost">
            <User className="w-4 h-4 mr-2" />
            Entrar
          </Button>
          <Button className="btn-primary">
            Começar Grátis
          </Button>
          
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default FitLifeHeader;