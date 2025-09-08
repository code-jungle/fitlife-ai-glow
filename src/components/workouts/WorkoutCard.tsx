import { Clock, Target, Dumbbell, Play, Heart, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WorkoutCardProps {
  workout: {
    id: number;
    title: string;
    duration: number;
    exercises: number;
    difficulty: string;
    muscleGroups: string[];
    createdAt: string;
    exercises_detail?: Array<{
      name: string;
      sets: number;
      reps: string;
      rest: string;
      equipment: string;
      muscleGroup: string;
    }>;
  };
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "iniciante":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediário":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "avançado":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  const getMuscleGroupColor = (group: string) => {
    const colors = [
      "bg-orange-500/20 text-orange-400",
      "bg-pink-500/20 text-pink-400", 
      "bg-purple-500/20 text-purple-400",
      "bg-blue-500/20 text-blue-400",
      "bg-green-500/20 text-green-400",
    ];
    return colors[group.length % colors.length];
  };

  return (
    <Card className="glass-card border border-white/10 hover-lift group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-poppins text-foreground mb-2 group-hover:gradient-text transition-all">
              {workout.title}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {workout.duration} min
              </span>
              <span className="flex items-center gap-1">
                <Dumbbell className="w-4 h-4" />
                {workout.exercises} exercícios
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className={`text-xs ${getDifficultyColor(workout.difficulty)}`}>
            {workout.difficulty}
          </Badge>
          {workout.muscleGroups.map((group, index) => (
            <Badge key={index} className={`text-xs ${getMuscleGroupColor(group)}`}>
              {group}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {/* Exercise Preview */}
        {workout.exercises_detail && workout.exercises_detail.length > 0 && (
          <div className="mb-4 space-y-2">
            <h4 className="text-sm font-medium text-foreground">Exercícios:</h4>
            <div className="space-y-1">
              {workout.exercises_detail.slice(0, 2).map((exercise, index) => (
                <div key={index} className="text-sm text-muted-foreground flex justify-between">
                  <span>{exercise.name}</span>
                  <span>{exercise.sets}x{exercise.reps}</span>
                </div>
              ))}
              {workout.exercises_detail.length > 2 && (
                <p className="text-xs text-muted-foreground">
                  +{workout.exercises_detail.length - 2} mais exercícios
                </p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button className="flex-1 btn-primary">
            <Play className="w-4 h-4 mr-2" />
            Iniciar Treino
          </Button>
          <Button variant="outline" size="sm" className="btn-secondary">
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Created Date */}
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Criado {new Date(workout.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;