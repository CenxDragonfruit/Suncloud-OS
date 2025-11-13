import { useState, useEffect } from "react";
import { Battery, Zap, Monitor, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type PowerMode = "performance" | "balanced" | "eco";

export const SmartPower = () => {
  const [mode, setMode] = useState<PowerMode>("balanced");
  const [brightness, setBrightness] = useState([75]);
  const [idleTime, setIdleTime] = useState(0);
  const [energySaved, setEnergySaved] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdleTime(prev => prev + 1);
      if (idleTime > 15) {
        setMode("eco");
      }
    }, 1000);

    const resetIdle = () => setIdleTime(0);
    window.addEventListener("click", resetIdle);
    window.addEventListener("keypress", resetIdle);

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", resetIdle);
      window.removeEventListener("keypress", resetIdle);
    };
  }, [idleTime]);

  const modes = {
    performance: { icon: Zap, color: "text-red-400", label: "Desempenho" },
    balanced: { icon: Monitor, color: "text-primary", label: "Equilibrado" },
    eco: { icon: Leaf, color: "text-green-400", label: "Econômico" }
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col bg-background/40 p-6 gap-4">
      <div className="text-center mb-4">
        <Battery className="h-16 w-16 mx-auto text-primary mb-2 animate-pulse" />
        <h2 className="text-2xl font-bold text-foreground">SmartPower Manager</h2>
        <p className="text-sm text-muted-foreground">Gerenciamento Inteligente de Energia</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {(Object.entries(modes) as [PowerMode, typeof modes.performance][]).map(([key, { icon: Icon, color, label }]) => (
          <Button
            key={key}
            variant={mode === key ? "default" : "outline"}
            onClick={() => setMode(key)}
            className="h-24 flex flex-col gap-2"
          >
            <Icon className={`h-6 w-6 ${mode === key ? "" : color}`} />
            <span>{label}</span>
          </Button>
        ))}
      </div>

      <Card className="p-4 glass-panel">
        <label className="text-sm font-medium text-foreground mb-2 block">Brilho da Tela</label>
        <Slider value={brightness} onValueChange={setBrightness} max={100} step={1} />
        <span className="text-xs text-muted-foreground mt-1 block">{brightness[0]}%</span>
      </Card>

      <Card className="p-4 glass-panel">
        <h3 className="text-sm font-semibold text-foreground mb-3">Uso Energético (Simulado)</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>CPU</span>
            <span>45%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: "45%" }} />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Display</span>
            <span>{brightness[0]}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${brightness[0]}%` }} />
          </div>
        </div>
      </Card>

      <Card className="p-4 glass-panel bg-green-500/10">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-400" />
          <div>
            <p className="text-sm font-medium text-foreground">Economia Estimada</p>
            <p className="text-xs text-muted-foreground">{energySaved}% nas últimas 2 horas</p>
          </div>
        </div>
      </Card>

      {idleTime > 10 && (
        <div className="text-xs text-center text-muted-foreground animate-pulse">
          Sistema entrando em modo econômico por inatividade...
        </div>
      )}
      </div>
    </ScrollArea>
  );
};
