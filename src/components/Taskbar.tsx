import { useState } from "react";
import { Button } from "./ui/button";
import { Cpu, Search, Bell, Wifi, Battery } from "lucide-react";
import { OpenWindow } from "./Desktop";
import { WiFiFlyout } from "./taskbar/WiFiFlyout";
import { BatteryFlyout } from "./taskbar/BatteryFlyout";
import { NotificationsFlyout } from "./taskbar/NotificationsFlyout";
import { DateTimeFlyout } from "./taskbar/DateTimeFlyout";
import { AudioControl } from "./AudioControl";
import { useSound } from "@/hooks/useSound";

interface TaskbarProps {
  openWindows: OpenWindow[];
  onStartMenuToggle: () => void;
  onSearchToggle: () => void;
  onTaskbarClick: (windowId: string) => void;
  isHidden?: boolean;
}

export const Taskbar = ({ openWindows, onStartMenuToggle, onSearchToggle, onTaskbarClick, isHidden = false }: TaskbarProps) => {
  const { playClick, playHover } = useSound();
  const [activeFlyout, setActiveFlyout] = useState<string | null>(null);
  
  const currentTime = new Date().toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const currentDate = new Date().toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'short' 
  });

  const toggleFlyout = (flyout: string) => {
    setActiveFlyout(activeFlyout === flyout ? null : flyout);
  };

  return (
    <div className={`absolute bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${isHidden ? 'translate-y-full' : 'translate-y-0'}`}>
      <div className="mx-4 mb-4 glass-panel rounded-2xl px-4 py-2 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-4">
          {/* Start Button */}
          <Button
            onClick={() => {
              playClick();
              onStartMenuToggle();
            }}
            onMouseEnter={() => playHover()}
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-xl hover:bg-primary/20 glow-effect"
          >
            <Cpu className="h-6 w-6 text-primary" />
          </Button>

          {/* Search Button */}
          <Button
            onClick={() => {
              playClick();
              onSearchToggle();
            }}
            onMouseEnter={() => playHover()}
            variant="ghost"
            className="h-12 px-6 rounded-xl hover:bg-secondary flex-1 max-w-md justify-start gap-2"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">Pesquisar aplicativos...</span>
          </Button>

          {/* Open Windows */}
          <div className="flex items-center gap-2">
            {openWindows.map((window) => (
              <Button
                key={window.id}
                onClick={() => {
                  playClick();
                  onTaskbarClick(window.id);
                }}
                onMouseEnter={() => playHover()}
                variant="ghost"
                size="icon"
                className={`h-12 w-12 rounded-xl ${
                  !window.isMinimized 
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'hover:bg-secondary'
                }`}
              >
                <div className={`text-primary ${!window.isMinimized ? 'scale-110' : ''} transition-transform`}>
                  {window.app.icon}
                </div>
              </Button>
            ))}
          </div>

          {/* System Tray */}
          <div className="flex items-center gap-2 ml-auto relative">
            <AudioControl />
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-lg"
              onClick={() => {
                playClick();
                toggleFlyout("wifi");
              }}
              onMouseEnter={() => playHover()}
            >
              <Wifi className="h-4 w-4 text-primary" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-lg"
              onClick={() => {
                playClick();
                toggleFlyout("battery");
              }}
              onMouseEnter={() => playHover()}
            >
              <Battery className="h-4 w-4 text-primary" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-lg"
              onClick={() => {
                playClick();
                toggleFlyout("notifications");
              }}
              onMouseEnter={() => playHover()}
            >
              <Bell className="h-4 w-4 text-muted-foreground" />
            </Button>
            <button 
              className="px-3 py-2 text-right rounded-lg hover:bg-secondary/50 transition-colors"
              onClick={() => {
                playClick();
                toggleFlyout("datetime");
              }}
              onMouseEnter={() => playHover()}
            >
              <div className="text-sm font-medium text-foreground">{currentTime}</div>
              <div className="text-xs text-muted-foreground">{currentDate}</div>
            </button>
          </div>
        </div>
      </div>

      {/* Flyouts */}
      {activeFlyout === "wifi" && <WiFiFlyout onClose={() => setActiveFlyout(null)} />}
      {activeFlyout === "battery" && <BatteryFlyout onClose={() => setActiveFlyout(null)} />}
      {activeFlyout === "notifications" && <NotificationsFlyout onClose={() => setActiveFlyout(null)} />}
      {activeFlyout === "datetime" && <DateTimeFlyout onClose={() => setActiveFlyout(null)} />}
    </div>
  );
};
