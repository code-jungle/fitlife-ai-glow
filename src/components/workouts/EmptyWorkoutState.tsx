import { Dumbbell, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmptyWorkoutStateProps {
  title?: string;
  description?: string;
  onGenerate: () => void;
}

const EmptyWorkoutState = ({ 
  title = "Nenhum treino encontrado",
  description = "Crie seu primeiro treino personalizado com nossa IA",
  onGenerate 
}: EmptyWorkoutStateProps) => {
  return (
    <Card className="glass-card border border-white/10 text-center py-12">
      <CardHeader>
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-primary flex items-center justify-center mb-6">
          <Dumbbell className="w-12 h-12 text-white" />
        </div>
        <CardTitle className="text-2xl font-poppins text-foreground mb-2">
          {title}
        </CardTitle>
        <p className="text-muted-foreground max-w-md mx-auto">
          {description}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Features List */}
          <div className="grid gap-4 md:grid-cols-3 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground">Personalizado</h3>
              <p className="text-sm text-muted-foreground">
                Baseado no seu perfil e objetivos
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground">Completo</h3>
              <p className="text-sm text-muted-foreground">
                Exercícios, séries e tempo de descanso
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground">Progressivo</h3>
              <p className="text-sm text-muted-foreground">
                Evolui com seu progresso
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={onGenerate}
            size="lg"
            className="btn-primary px-8 py-3 text-lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Gerar Primeiro Treino
          </Button>

          {/* Secondary Text */}
          
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyWorkoutState;