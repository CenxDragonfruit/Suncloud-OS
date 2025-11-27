import { useState } from "react";
import { Search, LogOut, Lock, User } from "lucide-react";
import { App } from "./Desktop";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useSound } from "@/hooks/useSound";

interface StartMenuProps {
  apps: App[];
  onAppOpen: (app: App) => void;
  onClose: () => void;
  onLogout: () => void;
}

export const StartMenu = ({ apps, onAppOpen, onClose, onLogout }: StartMenuProps) => {
  const { playClick, playHover } = useSound();
  return (
    <>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Start Menu */}
      <div className="absolute bottom-20 left-4 z-50 w-[520px] max-w-[90vw] animate-window-open">
        <div 
          className="window-chrome rounded-2xl shadow-2xl overflow-hidden relative"
          style={{
            boxShadow: '0 0 60px hsl(var(--holo-cyan) / 0.15), 0 25px 50px hsl(var(--background) / 0.8)',
          }}
        >
          {/* Holographic border top */}
          <div 
            className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(var(--holo-cyan) / 0.6), hsl(var(--holo-violet) / 0.6), transparent)',
            }}
          />
          
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-primary/15 to-accent/15 border-b border-border/30 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 neural-grid opacity-20" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div 
                className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg relative overflow-hidden"
                style={{
                  boxShadow: '0 0 30px hsl(var(--primary) / 0.4)',
                }}
              >
                <User className="w-7 h-7 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground text-glow-cyan">Usuário SunCloud</div>
                <div className="text-sm text-muted-foreground">user@suncloud.os</div>
              </div>
            </div>
          </div>

          {/* Apps Grid */}
          <div className="p-6 bg-card/50 backdrop-blur-2xl relative">
            {/* Subtle scanlines */}
            <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
            
            <div className="mb-4 relative z-10">
              <h3 className="text-sm font-medium text-primary/80 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Aplicativos
              </h3>
              
              <ScrollArea className="h-[350px] pr-4">
                <div className="grid grid-cols-4 gap-3">
                  {apps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        playClick();
                        onAppOpen(app);
                      }}
                      onMouseEnter={() => playHover()}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden"
                    >
                      <div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}
                        style={{
                          boxShadow: '0 4px 15px hsl(var(--background) / 0.5)',
                        }}
                      >
                        <div className="text-white scale-75 relative z-10">
                          {app.icon}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-xs text-foreground/80 text-center max-w-full truncate group-hover:text-foreground transition-colors">
                        {app.name}
                      </span>
                      
                      {/* Hover glow */}
                      <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </ScrollArea> 
            </div>

            {/* Footer Actions */}
            <div className="border-t border-border/40 pt-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 hover:bg-white/10"
                onClick={() => {
                  playClick();
                  onClose();
                }}
                onMouseEnter={() => playHover()}
              >
                <Lock className="w-4 h-4" />
                <span className="text-sm">Bloquear</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 hover:bg-destructive/20 text-destructive"
                onClick={() => {
                  playClick();
                  onLogout();
                  onClose();
                }}
                onMouseEnter={() => playHover()}
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};