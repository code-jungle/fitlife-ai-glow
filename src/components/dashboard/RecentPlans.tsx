import { Clock, Target, Utensils, Dumbbell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RecentPlans = () => {
  const recentPlans = [
    {
      id: 1,
      type: "workout",
      title: "Treino de Força - Membros Superiores",
      description: "8 exercícios • 45 min • Intermediário",
      createdAt: "Hoje",
      icon: Dumbbell,
    },
    {
      id: 2,
      type: "nutrition",
      title: "Plano Emagrecimento - 1800 kcal",
      description: "5 refeições • Balanceado • Sem glúten",
      createdAt: "Ontem",
      icon: Utensils,
    },
    {
      id: 3,
      type: "workout",
      title: "Cardio HIIT",
      description: "6 exercícios • 30 min • Iniciante",
      createdAt: "2 dias atrás",
      icon: Target,
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-poppins font-bold text-foreground">
          Histórico de Planos
        </h2>
        <Button variant="outline" className="btn-secondary">
          Ver todos
        </Button>
      </div>
      
      <div className="space-y-4">
        {recentPlans.map((plan) => (
          <Card key={plan.id} className="glass-card border border-white/10 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  plan.type === "workout" 
                    ? "bg-gradient-to-r from-orange-500 to-pink-500" 
                    : "bg-gradient-to-r from-green-500 to-teal-500"
                }`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {plan.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="w-4 h-4 mr-1" />
                    {plan.createdAt}
                  </div>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="btn-secondary"
                  >
                    <Link to={plan.type === "workout" ? "/workouts" : "/nutrition"}>
                      Ver detalhes
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentPlans;