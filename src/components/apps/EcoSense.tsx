import { Leaf, Droplet, Wind, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

export const EcoSense = () => {
  const metrics = [
    { label: "Energia Economizada", value: 34, unit: "kWh", icon: Zap, color: "text-yellow-400" },
    { label: "CO² Evitado", value: 12.5, unit: "kg", icon: Wind, color: "text-blue-400" },
    { label: "Água Virtual Poupada", value: 230, unit: "L", icon: Droplet, color: "text-cyan-400" },
  ];

  const carbonFootprint = 67; // percentage

  return (
    <ScrollArea className="h-full">
      <div className="bg-background/40 p-6">
      <div className="text-center mb-6">
        <Leaf className="h-16 w-16 mx-auto text-green-400 mb-3" />
        <h2 className="text-2xl font-bold text-foreground">EcoSense</h2>
        <p className="text-sm text-muted-foreground">Monitor Ambiental Pessoal</p>
      </div>

      <Card className="p-6 glass-panel mb-6 bg-green-500/5">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Pegada Digital Estimada
        </h3>
        <div className="relative w-40 h-40 mx-auto mb-4">
          <svg className="transform -rotate-90 w-40 h-40">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - carbonFootprint / 100)}`}
              className="text-green-400"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{carbonFootprint}%</div>
              <div className="text-xs text-muted-foreground">Eficiência</div>
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-green-400 font-medium">
          Parabéns! Você está 33% acima da média.
        </p>
      </Card>

      <div className="grid gap-4">
        {metrics.map((metric, i) => (
          <Card key={i} className="p-4 glass-panel">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                <span className="font-medium text-foreground">{metric.label}</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
              </div>
            </div>
            <Progress value={metric.value} className="h-2" />
          </Card>
        ))}
      </div>

      <Card className="p-4 glass-panel mt-6 bg-primary/5">
        <div className="flex items-start gap-3">
          <Leaf className="h-6 w-6 text-green-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Impacto Positivo de Hoje
            </p>
            <p className="text-xs text-muted-foreground">
              Você economizou energia suficiente para carregar <strong>2 celulares</strong> e 
              evitou a emissão equivalente a <strong>5km de carro</strong>.
            </p>
          </div>
        </div>
      </Card>
      </div>
    </ScrollArea>
  );
};
