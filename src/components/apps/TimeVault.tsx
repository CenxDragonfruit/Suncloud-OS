import { useState } from "react";
import { Clock, FileText, Mail, Calendar, Settings, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface TimelineEvent {
  time: string;
  app: string;
  icon: any;
  action: string;
}

export const TimeVault = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const timeline: TimelineEvent[] = [
    { time: "09:00", app: "SmartDashboard", icon: Calendar, action: "Painel aberto" },
    { time: "09:32", app: "EcoSense", icon: Settings, action: "Visualizado métricas" },
    { time: "10:15", app: "Email", icon: Mail, action: "3 emails lidos" },
    { time: "11:20", app: "Documentos", icon: FileText, action: "Arquivo editado: projeto.txt" },
    { time: "12:00", app: "Terminal", icon: Terminal, action: "Comandos executados" },
    { time: "14:30", app: "Calendário", icon: Calendar, action: "Reunião agendada" },
    { time: "15:45", app: "SmartPower", icon: Settings, action: "Modo alterado para Eco" },
    { time: "16:20", app: "Chat IA", icon: FileText, action: "Conversa sobre CloudOS" },
  ];

  return (
    <div className="h-full bg-background/40 flex flex-col">
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-2xl font-bold text-foreground">TimeVault</h2>
            <p className="text-sm text-muted-foreground">Linha do Tempo Digital</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <ScrollArea className="flex-1 p-6">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30" />
            
            <div className="space-y-4">
              {timeline.map((event, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedEvent(event)}
                  className="w-full flex items-start gap-4 text-left hover:bg-secondary/20 p-3 rounded-lg transition-colors relative"
                >
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-full ${
                      selectedEvent === event ? 'bg-primary' : 'bg-card'
                    } flex items-center justify-center border-4 border-background shadow-lg`}>
                      <event.icon className={`h-6 w-6 ${
                        selectedEvent === event ? 'text-primary-foreground' : 'text-primary'
                      }`} />
                    </div>
                  </div>
                  
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-primary">{event.time}</span>
                      <span className="text-sm font-semibold text-foreground">{event.app}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.action}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>

        {selectedEvent && (
          <div className="w-80 border-l border-border/40 p-6 glass-panel">
            <h3 className="text-lg font-bold text-foreground mb-4">Detalhes do Momento</h3>
            
            <Card className="p-4 glass-panel mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <selectedEvent.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{selectedEvent.app}</p>
                  <p className="text-xs text-muted-foreground">{selectedEvent.time}</p>
                </div>
              </div>
              <p className="text-sm text-foreground">{selectedEvent.action}</p>
            </Card>

            <Card className="p-4 glass-panel mb-4 bg-primary/5">
              <h4 className="text-xs font-semibold text-foreground mb-2">Estado do Sistema</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Apps Abertos:</span>
                  <span className="text-foreground">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modo de Energia:</span>
                  <span className="text-foreground">Equilibrado</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Conectividade:</span>
                  <span className="text-foreground">Wi-Fi Ativo</span>
                </div>
              </div>
            </Card>

            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => {/* Simular restauração */}}
            >
              Restaurar este Momento
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-3">
              Simulação de viagem no tempo do sistema
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
