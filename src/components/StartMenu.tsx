import { App } from "./Desktop";
import { Button } from "./ui/button";
import { Power, User, Settings } from "lucide-react";

interface StartMenuProps {
  apps: App[];
  onAppOpen: (app: App) => void;
  onClose: () => void;
}

export const StartMenu = ({ apps, onAppOpen, onClose }: StartMenuProps) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Start Menu */}
      <div className="absolute bottom-20 left-4 z-50 w-[500px] max-w-[90vw] animate-in slide-in-from-bottom-4 fade-in duration-300">
        <div className="window-chrome rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-primary/20 to-accent/20 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg glow-effect">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground text-glow">Usuário CloudOS</div>
                <div className="text-sm text-muted-foreground">user@cloudos.dev</div>
              </div>
            </div>
          </div>

          {/* Apps Grid */}
          <div className="p-6 bg-card/40 backdrop-blur-xl">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Aplicativos</h3>
              <div className="grid grid-cols-4 gap-4">
                {apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => onAppOpen(app)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-primary/30 transition-all`}>
                      <div className="text-white scale-75">
                        {app.icon}
                      </div>
                    </div>
                    <span className="text-xs text-foreground text-center max-w-full truncate">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-border/30">
              <Button variant="ghost" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                Configurações
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-destructive/20 hover:text-destructive">
                <Power className="w-4 h-4" />
                Desligar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
