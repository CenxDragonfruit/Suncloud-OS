import { useState } from "react";
import { Briefcase, GraduationCap, Gamepad2, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type WorkMode = "work" | "study" | "leisure";

export const SynthWork = () => {
  const [currentMode, setCurrentMode] = useState<WorkMode>("work");

  const modes = {
    work: {
      icon: Briefcase,
      label: "Trabalho",
      color: "bg-blue-500/20",
      textColor: "text-blue-400",
      apps: ["Email", "Calendário", "Documentos", "Terminal"],
      theme: "Profissional e Focado"
    },
    study: {
      icon: GraduationCap,
      label: "Estudo",
      color: "bg-purple-500/20",
      textColor: "text-purple-400",
      apps: ["Documentos", "Navegador", "Terminal", "Chat IA"],
      theme: "Organizado e Produtivo"
    },
    leisure: {
      icon: Gamepad2,
      label: "Lazer",
      color: "bg-green-500/20",
      textColor: "text-green-400",
      apps: ["Música", "Vídeo", "Galeria", "Navegador"],
      theme: "Relaxante e Criativo"
    }
  };

  const currentModeData = modes[currentMode];

  return (
    <ScrollArea className="h-full">
      <div className="bg-background/40 p-6">
      <div className="text-center mb-6">
        <Monitor className="h-16 w-16 mx-auto text-primary mb-3" />
        <h2 className="text-2xl font-bold text-foreground">SynthWork</h2>
        <p className="text-sm text-muted-foreground">Ambientes de Trabalho Virtuais</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {(Object.entries(modes) as [WorkMode, typeof modes.work][]).map(([key, mode]) => (
          <Button
            key={key}
            variant={currentMode === key ? "default" : "outline"}
            onClick={() => setCurrentMode(key)}
            className="h-32 flex flex-col gap-3 relative overflow-hidden"
          >
            {currentMode === key && (
              <div className={`absolute inset-0 ${mode.color} animate-pulse`} />
            )}
            <mode.icon className={`h-8 w-8 relative z-10 ${currentMode === key ? "" : mode.textColor}`} />
            <span className="relative z-10">{mode.label}</span>
          </Button>
        ))}
      </div>

      <Card className={`p-6 glass-panel ${currentModeData.color} mb-6`}>
        <div className="flex items-center gap-3 mb-4">
          <currentModeData.icon className={`h-8 w-8 ${currentModeData.textColor}`} />
          <div>
            <h3 className="text-lg font-bold text-foreground">{currentModeData.label}</h3>
            <p className="text-sm text-muted-foreground">{currentModeData.theme}</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Apps Sugeridos:</p>
          <div className="grid grid-cols-2 gap-2">
            {currentModeData.apps.map((app, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-card/60 text-sm text-foreground text-center"
              >
                {app}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-4 glass-panel">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Configuração do Ambiente
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Layout de Janelas:</span>
            <span className="text-foreground">Otimizado para {currentModeData.label}</span>
          </div>
          <div className="flex justify-between">
            <span>Tema Visual:</span>
            <span className="text-foreground">{currentModeData.theme}</span>
          </div>
          <div className="flex justify-between">
            <span>Apps Abertos:</span>
            <span className="text-foreground">{currentModeData.apps.length}</span>
          </div>
        </div>
      </Card>

      <div className="mt-6 text-center">
        <Button variant="outline" className="w-full">
          Salvar Layout Atual
        </Button>
      </div>
      </div>
    </ScrollArea>
  );
};
