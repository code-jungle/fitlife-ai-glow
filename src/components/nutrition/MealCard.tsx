import { Clock, Target, Utensils, Zap, ChefHat, Lightbulb, Activity, Droplets, Plus, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MealCardProps {
  meal: {
      name: string;
    meal_type?: string;
    suggested_time?: string;
    description?: string;
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
    benefits?: string[];
    instructions?: string[];
    tips?: string[];
    meal_foods?: Array<{
      food_name: string;
      quantity: number;
      unit: string;
      calories_per_unit?: number;
    }>;
  };
}

const MealCard = ({ meal }: MealCardProps) => {
  const getMealSuggestions = (mealType: string | undefined) => {
    switch (mealType?.toLowerCase()) {
      case "breakfast":
        return [
          { name: "Aveia com frutas", quantity: "50g", unit: "aveia + 1 banana" },
          { name: "Pão integral", quantity: "2", unit: "fatias" },
          { name: "Ovos", quantity: "2", unit: "unidades" },
          { name: "Leite desnatado", quantity: "200ml", unit: "ml" }
        ];
      case "lunch":
        return [
          { name: "Arroz integral", quantity: "100g", unit: "cozido" },
          { name: "Frango grelhado", quantity: "150g", unit: "g" },
          { name: "Salada verde", quantity: "1", unit: "prato" },
          { name: "Legumes refogados", quantity: "100g", unit: "g" }
        ];
      case "snack":
        return [
          { name: "Iogurte natural", quantity: "1", unit: "pote" },
          { name: "Frutas", quantity: "1", unit: "unidade" },
          { name: "Castanhas", quantity: "30g", unit: "g" },
          { name: "Chá verde", quantity: "200ml", unit: "ml" }
        ];
      case "dinner":
        return [
          { name: "Salmão grelhado", quantity: "120g", unit: "g" },
          { name: "Batata doce", quantity: "1", unit: "unidade média" },
          { name: "Brócolis", quantity: "100g", unit: "g" },
          { name: "Azeite extra virgem", quantity: "1", unit: "colher de sopa" }
        ];
      default:
        return [
          { name: "Alimento 1", quantity: "100g", unit: "g" },
          { name: "Alimento 2", quantity: "1", unit: "unidade" }
        ];
    }
  };

  const getMealIcon = (mealType: string | undefined) => {
    if (!mealType) return "🍴";
    
    switch (mealType.toLowerCase()) {
      case "breakfast":
        return "☀️";
      case "lunch":
        return "🍽️";
      case "dinner":
        return "🌙";
      case "snack":
        return "🍎";
      default:
        return "🍴";
    }
  };

  const getMealTypeName = (mealType: string | undefined) => {
    switch (mealType?.toLowerCase()) {
      case "breakfast":
        return "Café da Manhã";
      case "lunch":
        return "Almoço";
      case "dinner":
        return "Jantar";
      case "snack":
        return "Lanche";
      default:
        return meal?.name || "Refeição";
    }
  };

  const getSuggestedTime = (mealType: string | undefined) => {
    switch (mealType?.toLowerCase()) {
      case "breakfast":
        return "07:00 - 08:00";
      case "lunch":
        return "12:00 - 13:00";
      case "dinner":
        return "19:00 - 20:00";
      case "snack":
        return "15:00 - 16:00";
      default:
        return meal.suggested_time || "Horário sugerido";
    }
  };

  const getMealColorScheme = (mealType: string | undefined) => {
    switch (mealType?.toLowerCase()) {
      case "breakfast":
        return {
          bg: "from-orange-500/20 to-yellow-500/20",
          border: "border-orange-500/30",
          icon: "bg-orange-500",
          accent: "text-orange-500",
          button: "bg-orange-500 hover:bg-orange-600"
        };
      case "lunch":
        return {
          bg: "from-green-500/20 to-emerald-500/20",
          border: "border-green-500/30",
          icon: "bg-green-500",
          accent: "text-green-500",
          button: "bg-green-500 hover:bg-green-600"
        };
      case "dinner":
        return {
          bg: "from-purple-500/20 to-indigo-500/20",
          border: "border-purple-500/30",
          icon: "bg-purple-500",
          accent: "text-purple-500",
          button: "bg-purple-500 hover:bg-purple-600"
        };
      case "snack":
        return {
          bg: "from-blue-500/20 to-cyan-500/20",
          border: "border-blue-500/30",
          icon: "bg-blue-500",
          accent: "text-blue-500",
          button: "bg-blue-500 hover:bg-blue-600"
        };
      default:
        return {
          bg: "from-gray-500/20 to-slate-500/20",
          border: "border-gray-500/30",
          icon: "bg-gray-500",
          accent: "text-gray-500",
          button: "bg-gray-500 hover:bg-gray-600"
        };
    }
  };

  const getMealBenefit = (mealType: string | undefined) => {
    switch (mealType?.toLowerCase()) {
      case "breakfast":
        return "Energia para começar o dia com força total!";
      case "lunch":
        return "Refeição completa para manter a energia até o final do dia!";
      case "dinner":
        return "Refeição leve e nutritiva para uma boa noite de sono!";
      case "snack":
        return "Lanche saudável para manter o metabolismo ativo!";
      default:
        return "Refeição nutritiva e balanceada para sua saúde!";
    }
  };

  const colorScheme = getMealColorScheme(meal.meal_type);

  return (
    <Card className={`glass-card border ${colorScheme.border} h-full hover-lift group overflow-hidden`}>
      {/* Header com Cabeçalho Colorido */}
      <div className={`bg-gradient-to-r ${colorScheme.bg} p-4 border-b ${colorScheme.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${colorScheme.icon} rounded-xl flex items-center justify-center shadow-lg`}>
              <span className="text-2xl">{getMealIcon(meal.meal_type)}</span>
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                {getMealTypeName(meal.meal_type)}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{getSuggestedTime(meal.meal_type)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Resumo Nutricional Destacado */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Activity className={`w-4 h-4 ${colorScheme.accent}`} />
            Resumo Nutricional
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {meal.calories && (
              <div className="text-center p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="text-lg font-bold text-orange-500">{meal.calories}</div>
                <div className="text-xs text-muted-foreground">kcal</div>
              </div>
            )}
            {meal.protein && (
              <div className="text-center p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="text-lg font-bold text-red-500">{meal.protein}g</div>
                <div className="text-xs text-muted-foreground">proteína</div>
              </div>
            )}
            {meal.carbs && (
              <div className="text-center p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="text-lg font-bold text-blue-500">{meal.carbs}g</div>
                <div className="text-xs text-muted-foreground">carboidratos</div>
              </div>
            )}
            {meal.fat && (
              <div className="text-center p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="text-lg font-bold text-yellow-500">{meal.fat}g</div>
                <div className="text-xs text-muted-foreground">gorduras</div>
              </div>
            )}
          </div>
        </div>

        {/* Lista de Itens (2-4 alimentos) */}
        {(meal.meal_foods && meal.meal_foods.length > 0) && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Utensils className={`w-4 h-4 ${colorScheme.accent}`} />
              Ingredientes
            </h4>
            <div className="space-y-2">
              {meal.meal_foods.slice(0, 4).map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-sm text-foreground font-medium">{item.food_name}</span>
                  <Badge variant="secondary" className="text-xs font-semibold px-2 py-1">
                    {item.quantity} {item.unit}
              </Badge>
            </div>
          ))}
        </div>
          </div>
        )}

        {/* Fallback para dados sem meal_foods - Sugestões de Alimentos */}
        {(!meal.meal_foods || meal.meal_foods.length === 0) && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Utensils className={`w-4 h-4 ${colorScheme.accent}`} />
              Sugestões de Alimentos
            </h4>
            <div className="space-y-2">
              {getMealSuggestions(meal.meal_type).map((suggestion, index) => (
                <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-sm text-foreground font-medium">{suggestion.name}</span>
                  <Badge variant="secondary" className="text-xs font-semibold px-2 py-1">
                    {suggestion.quantity} {suggestion.unit}
                  </Badge>
                </div>
              ))}
            </div>
            {meal.description && (
              <div className="mt-3 p-2 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-muted-foreground">
                  💡 {meal.description}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Benefício do Plano */}
        <div className={`p-3 rounded-lg bg-gradient-to-r ${colorScheme.bg} border ${colorScheme.border}`}>
          <div className="flex items-start gap-2">
            <Zap className={`w-4 h-4 ${colorScheme.accent} mt-0.5`} />
            <p className="text-sm font-medium text-foreground">
              {getMealBenefit(meal.meal_type)}
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            className={`flex-1 ${colorScheme.button} text-white font-semibold text-xs sm:text-sm py-2 px-3 sm:px-4`}
            size="sm"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Adicionar ao Meu Plano</span>
            <span className="xs:hidden">Adicionar</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-white/20 text-foreground hover:bg-white/10 text-xs sm:text-sm py-2 px-3 sm:px-4"
            size="sm"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Ver Receita</span>
            <span className="xs:hidden">Ver</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;