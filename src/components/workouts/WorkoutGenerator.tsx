import { Sparkles, Brain, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

const WorkoutGenerator = () => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = [
    "Analisando seu perfil e objetivos...",
    "Selecionando exercícios personalizados...",
    "Calculando séries, repetições e descanso...",
    "Organizando sequência otimizada...",
    "Finalizando seu treino perfeito!"
  ];

  const motivationalQuotes = [
    "💪 Cada exercício te aproxima do seu objetivo!",
    "🔥 A consistência é a chave do sucesso!",
    "⚡ Seus músculos estão crescendo enquanto você treina!",
    "🎯 Foco no processo, não apenas no resultado!",
    "🚀 Você é mais forte do que imagina!"
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
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center animate-pulse">
            <Brain className="w-6 h-6 text-white" />
          </div>
          IA Criando Seu Treino
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
            <Sparkles className="w-5 h-5 text-pink-500 animate-spin" />
            {phases[currentPhase] || phases[0]}
          </div>
          
          {/* Motivational Quote */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-pink-500/20">
            <p className="text-foreground font-medium">
              {motivationalQuotes[currentPhase] || motivationalQuotes[0]}
            </p>
          </div>
        </div>

        {/* AI Features */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-muted-foreground">Personalizado</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-muted-foreground">IA Avançada</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-muted-foreground">Otimizado</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutGenerator;