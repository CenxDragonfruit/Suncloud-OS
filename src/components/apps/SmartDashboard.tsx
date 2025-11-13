import { useState, useEffect } from "react";
import { TrendingUp, Cloud, Calendar, Zap, FileText, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AppUsage {
  name: string;
  icon: any;
  clicks: number;
}

export const SmartDashboard = () => {
  const [time, setTime] = useState(new Date());
  const [appUsage, setAppUsage] = useState<AppUsage[]>([
    { name: "Email", icon: Mail, clicks: 15 },
    { name: "Documentos", icon: FileText, clicks: 12 },
    { name: "Calendário", icon: Calendar, clicks: 8 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const weather = { temp: "24°C", condition: "Ensolarado", icon: "☀️" };
  const tasks = [
    { time: "09:00", title: "Reunião de Equipe" },
    { time: "14:00", title: "Revisão de Projeto" },
    { time: "16:30", title: "Call com Cliente" }
  ];

  return (
    <div className="h-full bg-background/40 p-6 overflow-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-1">
          {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </h1>
        <p className="text-muted-foreground">
          {time.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 glass-panel">
          <div className="flex items-center gap-2 mb-3">
            <Cloud className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Clima</h3>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">{weather.icon}</div>
            <p className="text-2xl font-bold text-foreground">{weather.temp}</p>
            <p className="text-sm text-muted-foreground">{weather.condition}</p>
          </div>
        </Card>

        <Card className="p-4 glass-panel">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Agenda do Dia</h3>
          </div>
          <div className="space-y-2">
            {tasks.map((task, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="text-primary font-medium">{task.time}</span>
                <span className="text-foreground">{task.title}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 glass-panel">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Apps Mais Usados</h3>
          </div>
          <div className="space-y-3">
            {appUsage.sort((a, b) => b.clicks - a.clicks).map((app, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <app.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">{app.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${(app.clicks / 15) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">{app.clicks}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 glass-panel col-span-full">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Atalhos Sugeridos</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {appUsage.map((app, i) => (
              <button key={i} className="p-4 rounded-lg glass-panel hover:bg-primary/10 transition-colors flex flex-col items-center gap-2">
                <app.icon className="h-8 w-8 text-primary" />
                <span className="text-xs text-foreground">{app.name}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
