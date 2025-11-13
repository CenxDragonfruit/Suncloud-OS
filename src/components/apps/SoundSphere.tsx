import { useState, useEffect } from "react";
import { Volume2, Headphones, Mic, Focus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

type SoundMode = "focus" | "relax" | "meeting";

export const SoundSphere = () => {
  const [volume, setVolume] = useState([65]);
  const [mode, setMode] = useState<SoundMode>("focus");
  const [noiseLevel, setNoiseLevel] = useState(35);

  useEffect(() => {
    const interval = setInterval(() => {
      setNoiseLevel(Math.floor(Math.random() * 60) + 20);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const modes = {
    focus: {
      icon: Focus,
      label: "Modo Foco",
      color: "bg-blue-500/20",
      textColor: "text-blue-400",
      eq: [30, 60, 40, 70, 50]
    },
    relax: {
      icon: Headphones,
      label: "Modo Relaxamento",
      color: "bg-purple-500/20",
      textColor: "text-purple-400",
      eq: [70, 50, 60, 40, 65]
    },
    meeting: {
      icon: Mic,
      label: "Modo Reunião",
      color: "bg-green-500/20",
      textColor: "text-green-400",
      eq: [40, 80, 70, 60, 45]
    }
  };

  const currentMode = modes[mode];

  return (
    <div className="h-full bg-background/40 p-6 overflow-auto">
      <div className="text-center mb-6">
        <Volume2 className="h-16 w-16 mx-auto text-primary mb-3 animate-pulse" />
        <h2 className="text-2xl font-bold text-foreground">SoundSphere</h2>
        <p className="text-sm text-muted-foreground">Gerenciador de Áudio Inteligente</p>
      </div>

      <Card className="p-6 glass-panel mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Volume Principal
        </label>
        <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-muted-foreground">Mudo</span>
          <span className="text-2xl font-bold text-primary">{volume[0]}%</span>
          <span className="text-xs text-muted-foreground">Máximo</span>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {(Object.entries(modes) as [SoundMode, typeof modes.focus][]).map(([key, modeData]) => (
          <Button
            key={key}
            variant={mode === key ? "default" : "outline"}
            onClick={() => setMode(key)}
            className="h-24 flex flex-col gap-2 relative overflow-hidden"
          >
            {mode === key && (
              <div className={`absolute inset-0 ${modeData.color} animate-pulse`} />
            )}
            <modeData.icon className={`h-6 w-6 relative z-10 ${mode === key ? "" : modeData.textColor}`} />
            <span className="text-xs relative z-10">{modeData.label}</span>
          </Button>
        ))}
      </div>

      <Card className={`p-6 glass-panel ${currentMode.color} mb-6`}>
        <h3 className="text-sm font-semibold text-foreground mb-4">Equalizador</h3>
        <div className="flex items-end justify-between gap-3 h-32">
          {currentMode.eq.map((height, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full bg-muted rounded-full overflow-hidden flex-1">
                <div
                  className={`w-full ${currentMode.textColor.replace('text-', 'bg-')} rounded-full transition-all duration-500`}
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{['60', '250', '1k', '4k', '16k'][i]}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 glass-panel">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Ruído Ambiente</h3>
          <span className="text-xs text-muted-foreground">{noiseLevel} dB</span>
        </div>
        <div className="h-16 bg-muted/30 rounded-lg overflow-hidden flex items-end gap-1 px-2">
          {Array.from({ length: 40 }).map((_, i) => {
            const height = Math.random() * noiseLevel;
            return (
              <div
                key={i}
                className="flex-1 bg-primary rounded-t transition-all duration-150"
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
      </Card>
    </div>
  );
};
