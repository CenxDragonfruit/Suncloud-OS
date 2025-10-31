import { useState } from "react";
import { X, Minus, Maximize2 } from "lucide-react";
import { App } from "./Desktop";
import { Button } from "./ui/button";

interface WindowProps {
  id: string;
  app: App;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
}

export const Window = ({ id, app, onClose, onMinimize }: WindowProps) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "600px",
        maxWidth: "90vw",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="window-chrome rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Window Header */}
        <div
          className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-card to-card/90 border-b border-border/40 cursor-move"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-lg`}>
              {app.icon}
            </div>
            <span className="text-sm font-medium text-foreground">{app.name}</span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-secondary"
              onClick={() => onMinimize(id)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-secondary"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
              onClick={() => onClose(id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-6 bg-card/40 backdrop-blur-xl min-h-[400px]">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground text-glow">
              {app.name}
            </h2>
            <p className="text-muted-foreground">
              Esta é uma simulação do aplicativo {app.name} no CloudOS.
            </p>
            <div className="mt-6 space-y-3">
              <div className="glass-panel rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm text-foreground">Status: Online</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Conectado à nuvem CloudOS
                </div>
              </div>
              
              <div className="glass-panel rounded-lg p-4 space-y-2">
                <div className="text-sm font-medium text-foreground">Recursos Futuros:</div>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Sincronização automática em tempo real</li>
                  <li>IA integrada para assistência</li>
                  <li>Interface adaptativa multi-dispositivo</li>
                  <li>Processamento 100% na nuvem</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
