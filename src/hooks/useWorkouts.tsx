import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export interface Exercise {
  id: string;
  name: string;
  category: 'cardio' | 'strength' | 'flexibility' | 'sports' | 'functional';
  instructions: string;
  sets?: number;
  reps?: number;
  duration_seconds?: number;
  rest_seconds?: number;
  weight_kg?: number;
  distance_meters?: number;
  order_index: number;
  completed: boolean;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  description?: string;
  duration_minutes?: number;
  difficulty_level?: number;
  calories_burned_estimate?: number;
  muscle_groups?: string[];
  equipment_needed?: string[];
  ai_generated: boolean;
  completed_at?: string;
  created_at: string;
  exercises?: Exercise[];
}

export const useWorkouts = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchWorkoutPlans = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('workout_plans')
        .select(`
          *,
          exercises (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setWorkoutPlans(data || []);
    } catch (error) {
      console.error('Error fetching workout plans:', error);
      toast({
        title: "Erro ao carregar treinos",
        description: "Não foi possível carregar seus planos de treino",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createWorkoutPlan = async (workoutData: Partial<WorkoutPlan> & { exercises?: Partial<Exercise>[] }) => {
    if (!user) return { error: 'No user authenticated' };

    try {
      setLoading(true);

      // Create workout plan
      const { data: workoutPlan, error: workoutError } = await supabase
        .from('workout_plans')
        .insert({
          user_id: user.id,
          title: workoutData.title,
          description: workoutData.description,
          duration_minutes: workoutData.duration_minutes,
          difficulty_level: workoutData.difficulty_level,
          calories_burned_estimate: workoutData.calories_burned_estimate,
          muscle_groups: workoutData.muscle_groups,
          equipment_needed: workoutData.equipment_needed,
          ai_generated: workoutData.ai_generated ?? true,
        })
        .select()
        .single();

      if (workoutError) throw workoutError;

      // Create exercises if provided
      if (workoutData.exercises && workoutData.exercises.length > 0) {
        const exercisesToInsert = workoutData.exercises.map((exercise, index) => ({
          workout_plan_id: workoutPlan.id,
          name: exercise.name!,
          category: exercise.category,
          instructions: exercise.instructions,
          sets: exercise.sets,
          reps: exercise.reps,
          duration_seconds: exercise.duration_seconds,
          rest_seconds: exercise.rest_seconds,
          weight_kg: exercise.weight_kg,
          distance_meters: exercise.distance_meters,
          order_index: exercise.order_index ?? index,
          completed: false,
        }));

        const { error: exercisesError } = await supabase
          .from('exercises')
          .insert(exercisesToInsert);

        if (exercisesError) throw exercisesError;
      }

      await fetchWorkoutPlans(); // Refresh the list

      toast({
        title: "Treino criado!",
        description: "Seu novo plano de treino foi gerado com sucesso",
      });

      return { data: workoutPlan, error: null };
    } catch (error) {
      console.error('Error creating workout plan:', error);
      toast({
        title: "Erro ao criar treino",
        description: "Não foi possível gerar o plano de treino",
        variant: "destructive",
      });
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const completeWorkout = async (workoutId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('workout_plans')
        .update({ completed_at: new Date().toISOString() })
        .eq('id', workoutId)
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchWorkoutPlans();
      
      toast({
        title: "Treino concluído!",
        description: "Parabéns por completar seu treino!",
      });
    } catch (error) {
      console.error('Error completing workout:', error);
      toast({
        title: "Erro ao concluir treino",
        description: "Não foi possível marcar o treino como concluído",
        variant: "destructive",
      });
    }
  };

  const updateExerciseCompletion = async (exerciseId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('exercises')
        .update({ completed })
        .eq('id', exerciseId);

      if (error) throw error;

      // Update local state
      setWorkoutPlans(prev => prev.map(workout => ({
        ...workout,
        exercises: workout.exercises?.map(exercise => 
          exercise.id === exerciseId ? { ...exercise, completed } : exercise
        )
      })));
    } catch (error) {
      console.error('Error updating exercise completion:', error);
      toast({
        title: "Erro ao atualizar exercício",
        description: "Não foi possível marcar o exercício",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchWorkoutPlans();
    }
  }, [user]);

  return {
    workoutPlans,
    loading,
    createWorkoutPlan,
    completeWorkout,
    updateExerciseCompletion,
    refetchWorkoutPlans: fetchWorkoutPlans,
  };
};