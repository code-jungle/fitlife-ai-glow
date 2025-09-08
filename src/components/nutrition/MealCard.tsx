import { Clock, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MealCardProps {
  meal: {
    type: string;
    calories: number;
    items: Array<{
      name: string;
      calories: number;
      category: string;
    }>;
  };
}

const MealCard = ({ meal }: MealCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "proteína":
      case "proteina":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "carboidrato":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "gordura":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "vegetais":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "frutas":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getMealIcon = (mealType: string) => {
    switch (mealType.toLowerCase()) {
      case "café da manhã":
        return "☀️";
      case "lanche da manhã":
        return "🥨";
      case "almoço":
        return "🍽️";
      case "lanche da tarde":
        return "🍎";
      case "jantar":
        return "🌙";
      case "ceia":
        return "🥛";
      default:
        return "🍴";
    }
  };

  return (
    <Card className="glass-card border border-white/10 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-foreground">
          <span className="text-2xl">{getMealIcon(meal.type)}</span>
          {meal.type}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Target className="w-4 h-4" />
          <span className="font-medium text-foreground">{meal.calories} kcal</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {meal.items.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-sm text-foreground font-medium">
                  {item.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.calories} kcal
                </span>
              </div>
              <Badge className={`text-xs ${getCategoryColor(item.category)}`}>
                {item.category}
              </Badge>
            </div>
          ))}
        </div>

        {/* Meal Summary */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-semibold text-foreground">{meal.calories} kcal</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;