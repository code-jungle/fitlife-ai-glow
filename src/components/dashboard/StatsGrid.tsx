import { Activity, Target, TrendingUp, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatsGrid = () => {
  const stats = [
    {
      title: "Peso Atual",
      value: "75 kg",
      change: "-2.5 kg",
      changeType: "positive",
      icon: User,
    },
    {
      title: "Altura",
      value: "1.75 m",
      change: null,
      changeType: "neutral",
      icon: Activity,
    },
    {
      title: "IMC",
      value: "24.5",
      change: "Saudável",
      changeType: "positive",
      icon: Target,
    },
    {
      title: "Nível",
      value: "Intermediário",
      change: "+1 nível",
      changeType: "positive",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            {stat.change && (
              <p className={`text-xs ${
                stat.changeType === "positive" 
                  ? "text-green-500" 
                  : stat.changeType === "negative" 
                  ? "text-red-500" 
                  : "text-muted-foreground"
              }`}>
                {stat.change}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;