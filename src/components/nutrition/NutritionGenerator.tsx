import { Sparkles, Brain, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

const NutritionGenerator = () => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = [
    "Analisando suas necessidades nutricionais...",
    "Calculando suas calorias ideais...",
    "Selecionando alimentos balanceados...",
    "Organizando refeições otimizadas...",
    "Finalizando seu plano alimentar perfeito!"
  ];

  const nutritionTips = [
    "🥗 Uma alimentação equilibrada é 70% do seu sucesso!",
    "💧 Hidrate-se bem durante todo o dia!",
    "⏰ Horários regulares ajudam no metabolismo!",
    "🍎 Alimentos naturais são sempre a melhor escolha!",
    "⚖️ O equilíbrio é mais importante que a perfeição!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const phaseIndex = Math.floor(progress / 20);
    setCurrentPhase(phaseIndex);
  }, [progress]);

  return (
    <Card className="glass-card border border-white/10 mb-8">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-3 text-2xl font-poppins text-foreground mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center animate-pulse">
            <Brain className="w-6 h-6 text-white" />
          </div>
          IA Criando Seu Plano Alimentar
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="text-foreground font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Current Phase */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-lg font-medium text-foreground">
            <Sparkles className="w-5 h-5 text-emerald-500 animate-spin" />
            {phases[currentPhase] || phases[0]}
          </div>
          
          {/* Nutrition Tip */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-emerald-500/20">
            <p className="text-foreground font-medium">
              {nutritionTips[currentPhase] || nutritionTips[0]}
            </p>
          </div>
        </div>

        {/* AI Features */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-muted-foreground">Balanceado</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-muted-foreground">IA Nutricional</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-muted-foreground">Personalizado</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionGenerator;