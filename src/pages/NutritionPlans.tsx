import { useState } from "react";
import { Sparkles, Clock, Target, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NutritionHeader from "@/components/nutrition/NutritionHeader";
import NutritionGenerator from "@/components/nutrition/NutritionGenerator";
import MealCard from "@/components/nutrition/MealCard";
import NutritionSummary from "@/components/nutrition/NutritionSummary";
import EmptyNutritionState from "@/components/nutrition/EmptyNutritionState";

const NutritionPlans = () => {
  const [nutritionPlans, setNutritionPlans] = useState([
    {
      id: 1,
      title: "Plano Emagrecimento - 1800 kcal",
      totalCalories: 1800,
      createdAt: new Date().toISOString(),
      meals: [
        {
          type: "Café da Manhã",
          calories: 450,
          items: [
            { name: "Aveia com frutas", calories: 280, category: "carboidrato" },
            { name: "Iogurte grego", calories: 120, category: "proteína" },
            { name: "Amêndoas", calories: 50, category: "gordura" }
          ]
        },
        {
          type: "Almoço", 
          calories: 600,
          items: [
            { name: "Peito de frango grelhado", calories: 250, category: "proteína" },
            { name: "Arroz integral", calories: 200, category: "carboidrato" },
            { name: "Salada mista", calories: 80, category: "vegetais" },
            { name: "Azeite", calories: 70, category: "gordura" }
          ]
        }
      ]
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newPlan = {
      id: Date.now(),
      title: "Plano Ganho de Massa - 2200 kcal",
      totalCalories: 2200,
      createdAt: new Date().toISOString(),
      meals: [
        {
          type: "Café da Manhã",
          calories: 500,
          items: [
            { name: "Panqueca de banana", calories: 350, category: "carboidrato" },
            { name: "Whey protein", calories: 150, category: "proteína" }
          ]
        }
      ]
    };
    
    setNutritionPlans([newPlan, ...nutritionPlans]);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <NutritionHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-poppins font-bold gradient-text mb-2">
              Planos Alimentares
            </h1>
            <p className="text-muted-foreground text-lg">
              Nutrição personalizada criada pela IA
            </p>
          </div>
          
          <Button 
            onClick={handleGeneratePlan}
            disabled={isGenerating}
            className="btn-primary w-full md:w-auto"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {isGenerating ? "Gerando..." : "Gerar Plano com IA"}
          </Button>
        </div>

        {/* Nutrition Generator (Loading State) */}
        {isGenerating && <NutritionGenerator />}

        {/* Nutrition Summary */}
        <NutritionSummary plans={nutritionPlans} />

        {/* Nutrition Plans List */}
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
            {nutritionPlans.length > 0 ? (
              <div className="space-y-6">
                {nutritionPlans.map((plan) => (
                  <Card key={plan.id} className="glass-card border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-xl font-poppins text-foreground">
                        {plan.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {plan.totalCalories} kcal
                        </span>
                        <span className="flex items-center gap-1">
                          <Utensils className="w-4 h-4" />
                          {plan.meals.length} refeições
                        </span>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {plan.meals.map((meal, index) => (
                          <MealCard key={index} meal={meal} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyNutritionState onGenerate={handleGeneratePlan} />
            )}
          </TabsContent>

          <TabsContent value="recent" className="mt-6">
            <div className="space-y-6">
              {nutritionPlans
                .slice(0, 2)
                .map((plan) => (
                  <Card key={plan.id} className="glass-card border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-xl font-poppins text-foreground">
                        {plan.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {plan.meals.map((meal, index) => (
                          <MealCard key={index} meal={meal} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <EmptyNutritionState 
              title="Nenhum plano favoritado ainda"
              description="Marque planos como favoritos para acessá-los rapidamente"
              onGenerate={handleGeneratePlan}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default NutritionPlans;