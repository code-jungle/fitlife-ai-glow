import { Clock, Dumbbell, Trash2, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkoutPlan } from "@/hooks/useWorkouts";
import { useWorkoutCard } from "@/hooks/useWorkoutCard";
import { useState } from "react";

interface WorkoutCardRefactoredProps {
  workout: WorkoutPlan;
  onDelete: (workoutId: string) => void;
}

const WorkoutCardRefactored = ({ workout, onDelete }: WorkoutCardRefactoredProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { 
    workoutLetter, 
    mainMuscleGroups, 
    difficultyText, 
    durationText, 
    equipmentText 
  } = useWorkoutCard(workout);

  const handleDeleteWorkout = async () => {
    setIsDeleting(true);
    try {
      await onDelete(workout.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="glass-card border border-white/10 hover-lift group">
      <CardHeader className="pb-3">
        {/* Header com letra do treino e tipo */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">{workoutLetter}</span>
            </div>
            <div>
              <CardTitle className="text-lg font-poppins gradient-text">
                {workout.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {mainMuscleGroups}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteWorkout}
            disabled={isDeleting}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Badges de informações */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            <Target className="w-3 h-3 mr-1" />
            {difficultyText}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {durationText}
          </Badge>
          {workout.calories_burned_estimate && (
            <Badge variant="secondary" className="text-xs">
              🔥 {workout.calories_burned_estimate} kcal
            </Badge>
          )}
        </div>

        {/* Descrição */}
        {workout.description && (
          <p className="text-sm text-muted-foreground mb-4">
            {workout.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {/* Equipamentos necessários */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Dumbbell className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Equipamentos:</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {equipmentText}
          </p>
        </div>

        {/* Exercícios */}
        {workout.exercises && workout.exercises.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Exercícios ({workout.exercises.length})
              </span>
            </div>
            <div className="space-y-1">
              {workout.exercises.slice(0, 3).map((exercise, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground truncate">
                    {exercise.name}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {exercise.sets}x{exercise.reps}
                  </span>
                </div>
              ))}
              {workout.exercises.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  +{workout.exercises.length - 3} exercícios
                </p>
              )}
            </div>
          </div>
        )}

        {/* Status */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            {workout.completed_at ? (
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                Concluído
              </Badge>
            ) : workout.started_at ? (
              <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                Em andamento
              </Badge>
            ) : (
              <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">
                Não iniciado
              </Badge>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground">
            {workout.ai_generated && (
              <span className="flex items-center gap-1">
                ✨ IA
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutCardRefactored;

