import { useState, cloneElement } from "react"; // 👈 1. Importe cloneElement
import { Clock, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useSystem, SystemEvent } from "@/contexts/SystemContext";

export const TimeVault = () => {
  const system = useSystem();
  const events = system?.events;
  const [selectedEvent, setSelectedEvent] = useState<SystemEvent | null>(null);

  const timeline = [...(events || [])].reverse();

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
              {timeline.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                  <p className="text-muted-foreground">Nenhuma atividade registrada ainda.</p>
                  <p className="text-sm text-muted-foreground mt-2">Comece a usar o sistema para ver o histórico.</p>
                </div>
              ) : (
                timeline.map((event, i) => {
                  if (!event) return null;

                  // 👇 2. Define a classe que queremos aplicar
                  const newClassName = `h-6 w-6 ${
                    selectedEvent === event ? 'text-primary-foreground' : 'text-primary'
                  }`;

                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedEvent(event)}
                      className="w-full flex items-start gap-4 text-left hover:bg-secondary/20 p-3 rounded-lg transition-colors relative"
                    >
                      <div className="relative z-10">
                        <div className={`w-16 h-16 rounded-full ${
                          selectedEvent === event ? 'bg-primary' : 'bg-card'
                        } flex items-center justify-center border-4 border-background shadow-lg`}>
                          
                          {/* 👇 3. Lógica corrigida */}
                          {event.icon ? (
                            cloneElement(event.icon, { className: newClassName })
                          ) : (
                            <AlertCircle className={newClassName} />
                          )}

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
                  );
                })
              )}
            </div>
          </div>
        </ScrollArea>

        {selectedEvent && (
          <div className="w-80 border-l border-border/40 p-6 glass-panel">
            <h3 className="text-lg font-bold text-foreground mb-4">Detalhes do Momento</h3>
      
            <Card className="p-4 glass-panel mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  
                  {/* 👇 4. Correção aplicada aqui também */}
                  {selectedEvent.icon ? (
                    cloneElement(selectedEvent.icon, { className: "h-6 w-6 text-primary" })
                  ) : (
                    <AlertCircle className="h-6 w-6 text-primary" />
                  )}

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