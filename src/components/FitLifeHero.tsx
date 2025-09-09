import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-fitness-ai.jpg";

const FitLifeHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="FitLife AI - Treinos personalizados com inteligência artificial" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-white/90">Powered by Artificial Intelligence</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="font-poppins font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
              Transforme seu corpo com{" "}
              <span className="gradient-text">
                IA Personalizada
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-inter">
              Treinos e planos nutricionais únicos, criados especialmente para você por inteligência artificial avançada
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              className="btn-primary text-lg px-8 py-4 h-auto"
              onClick={() => navigate('/register')}
            >
              <span>Começar Jornada Grátis</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              className="btn-secondary text-lg px-8 py-4 h-auto"
              onClick={() => navigate('/login')}
            >
              <Play className="w-5 h-5 mr-2" />
              Já sou usuário
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-3xl font-bold gradient-text mb-2">50K+</div>
              <div className="text-white/70 text-sm">Usuários Ativos</div>
            </div>
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-3xl font-bold gradient-text mb-2">1M+</div>
              <div className="text-white/70 text-sm">Treinos Gerados</div>
            </div>
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-3xl font-bold gradient-text mb-2">98%</div>
              <div className="text-white/70 text-sm">Satisfação</div>
            </div>
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-white/70 text-sm">IA Disponível</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default FitLifeHero;