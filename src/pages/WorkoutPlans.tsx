import { useState } from "react";
import { Sparkles, Clock, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkoutHeader from "@/components/workouts/WorkoutHeader";
import WorkoutGenerator from "@/components/workouts/WorkoutGenerator";
import WorkoutCard from "@/components/workouts/WorkoutCard";
import WorkoutStats from "@/components/workouts/WorkoutStats";
import EmptyWorkoutState from "@/components/workouts/EmptyWorkoutState";

const WorkoutPlans = () => {
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      title: "Treino de Força - Membros Superiores",
      duration: 45,
      exercises: 8,
      difficulty: "Intermediário",
      muscleGroups: ["Peito", "Tríceps", "Ombros"],
      createdAt: new Date().toISOString(),
      exercises_detail: [
        {
          name: "Supino Reto",
          sets: 4,
          reps: "8-12",
          rest: "90s",
          equipment: "Barra",
          muscleGroup: "Peito"
        },
        {
          name: "Desenvolvimento",
          sets: 3,
          reps: "10-15",
          rest: "60s",
          equipment: "Halteres",
          muscleGroup: "Ombros"
        }
      ]
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateWorkout = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newWorkout = {
      id: Date.now(),
      title: "Treino Funcional - Core",
      duration: 35,
      exercises: 6,
      difficulty: "Iniciante",
      muscleGroups: ["Core", "Glúteos"],
      createdAt: new Date().toISOString(),
      exercises_detail: [
        {
          name: "Prancha",
          sets: 3,
          reps: "30-60s",
          rest: "45s",
          equipment: "Peso corporal",
          muscleGroup: "Core"
        }
      ]
    };
    
    setWorkouts([newWorkout, ...workouts]);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <WorkoutHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-poppins font-bold gradient-text mb-2">
              Planos de Treino
            </h1>
            <p className="text-muted-foreground text-lg">
              Treinos personalizados criados pela IA
            </p>
          </div>
          
          <Button 
            onClick={handleGenerateWorkout}
            disabled={isGenerating}
            className="btn-primary w-full md:w-auto"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {isGenerating ? "Gerando..." : "Gerar Treino com IA"}
          </Button>
        </div>

        {/* Workout Generator (Loading State) */}
        {isGenerating && <WorkoutGenerator />}

        {/* Workout Stats */}
        <WorkoutStats workouts={workouts} />

        {/* Workout List */}
        <Tabs defaultValue="all" className="mt-8">
          <TabsList className="glass bg-white/5 border border-white/10">
            <TabsTrigger value="all" className="data-[state=active]:bg-gradient-primary">
              Todos
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-gradient-primary">
              Recentes
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-gradient-primary">
              Favoritos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {workouts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {workouts.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            ) : (
              <EmptyWorkoutState onGenerate={handleGenerateWorkout} />
            )}
          </TabsContent>

          <TabsContent value="recent" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {workouts
                .slice(0, 3)
                .map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <EmptyWorkoutState 
              title="Nenhum treino favoritado ainda"
              description="Marque treinos como favoritos para acessá-los rapidamente"
              onGenerate={handleGenerateWorkout}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default WorkoutPlans;