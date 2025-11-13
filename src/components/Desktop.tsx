import { useState } from "react";
import { AppIcon } from "./AppIcon";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { StartMenu } from "./StartMenu";
import { Search } from "./Search";
import { useSystem } from "@/contexts/SystemContext";
import { FileExplorer } from "./apps/FileExplorer";
import { Settings } from "./apps/Settings";
import { AIChat } from "./apps/AIChat";
import { Terminal } from "./apps/Terminal";
import { Gallery } from "./apps/Gallery";
import { Documents } from "./apps/Documents";
import { Email } from "./apps/Email";
import { CalendarApp } from "./apps/CalendarApp";
import { Music } from "./apps/Music";
import { Video } from "./apps/Video";
import { Browser } from "./apps/Browser";
import { SmartPower } from "./apps/SmartPower";
import { SmartDashboard } from "./apps/SmartDashboard";
import { EcoSense } from "./apps/EcoSense";
import { SkyLink } from "./apps/SkyLink";
import { SynthWork } from "./apps/SynthWork";
import { SoundSphere } from "./apps/SoundSphere";
import { TimeVault } from "./apps/TimeVault";
import { CloudDrive } from "./apps/CloudDrive";
import { 
  Folder, 
  Settings as SettingsIcon, 
  Image, 
  FileText, 
  Terminal as TerminalIcon, 
  Cloud,
  Mail,
  Calendar,
  Music as MusicIcon,
  Video as VideoIcon,
  Bot,
  Globe,
  LayoutDashboard,
  Zap,
  Leaf,
  Wifi,
  Monitor,
  Volume2,
  Clock
} from "lucide-react";

export interface App {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  content?: React.ReactNode;
}

export interface OpenWindow {
  id: string;
  app: App;
  isMinimized: boolean;
  isMaximized?: boolean;
}

interface DesktopProps {
  onLogout: () => void;
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
}

export const Desktop = ({ onLogout, theme, onThemeChange }: DesktopProps) => {
  const { logEvent } = useSystem();
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [maximizedWindows, setMaximizedWindows] = useState<Set<string>>(new Set());

  const apps: App[] = [
    { 
      id: "dashboard", 
      name: "SmartDashboard", 
      icon: <LayoutDashboard className="w-8 h-8" />, 
      color: "from-cyan-500 to-blue-500",
      content: <SmartDashboard />
    },
    { 
      id: "browser", 
      name: "Navegador", 
      icon: <Globe className="w-8 h-8" />, 
      color: "from-blue-500 to-cyan-500",
      content: <Browser />
    },
    { 
      id: "files", 
      name: "Arquivos", 
      icon: <Folder className="w-8 h-8" />, 
      color: "from-cyan-500 to-blue-500",
      content: <FileExplorer />
    },
    { 
      id: "cloud", 
      name: "Cloud Drive", 
      icon: <Cloud className="w-8 h-8" />, 
      color: "from-sky-400 to-cyan-500",
      content: <CloudDrive />
    },
    { 
      id: "settings", 
      name: "Configurações", 
      icon: <SettingsIcon className="w-8 h-8" />, 
      color: "from-purple-500 to-pink-500",
      content: <Settings onThemeChange={onThemeChange} currentTheme={theme} />
    },
    { 
      id: "aichat", 
      name: "IA Chat", 
      icon: <Bot className="w-8 h-8" />, 
      color: "from-blue-500 to-indigo-600",
      content: <AIChat />
    },
    { 
      id: "terminal", 
      name: "Terminal", 
      icon: <TerminalIcon className="w-8 h-8" />, 
      color: "from-gray-600 to-gray-800",
      content: <Terminal />
    },
    { 
      id: "gallery", 
      name: "Galeria", 
      icon: <Image className="w-8 h-8" />, 
      color: "from-green-500 to-emerald-500",
      content: <Gallery />
    },
    { 
      id: "docs", 
      name: "Documentos", 
      icon: <FileText className="w-8 h-8" />, 
      color: "from-orange-500 to-red-500",
      content: <Documents />
    },
    { 
      id: "mail", 
      name: "Email", 
      icon: <Mail className="w-8 h-8" />, 
      color: "from-blue-500 to-indigo-600",
      content: <Email />
    },
    { 
      id: "calendar", 
      name: "Calendário", 
      icon: <Calendar className="w-8 h-8" />, 
      color: "from-rose-500 to-pink-600",
      content: <CalendarApp />
    },
    { 
      id: "music", 
      name: "Música", 
      icon: <MusicIcon className="w-8 h-8" />, 
      color: "from-violet-500 to-purple-600",
      content: <Music />
    },
    { 
      id: "video", 
      name: "Vídeos", 
      icon: <VideoIcon className="w-8 h-8" />, 
      color: "from-red-500 to-orange-500",
      content: <Video />
    },
    { 
      id: "power", 
      name: "SmartPower", 
      icon: <Zap className="w-8 h-8" />, 
      color: "from-yellow-500 to-orange-500",
      content: <SmartPower />
    },
    { 
      id: "eco", 
      name: "EcoSense", 
      icon: <Leaf className="w-8 h-8" />, 
      color: "from-green-500 to-teal-500",
      content: <EcoSense />
    },
    { 
      id: "skylink", 
      name: "SkyLink", 
      icon: <Wifi className="w-8 h-8" />, 
      color: "from-blue-400 to-cyan-400",
      content: <SkyLink />
    },
    { 
      id: "synthwork", 
      name: "SynthWork", 
      icon: <Monitor className="w-8 h-8" />, 
      color: "from-indigo-500 to-purple-500",
      content: <SynthWork />
    },
    { 
      id: "sound", 
      name: "SoundSphere", 
      icon: <Volume2 className="w-8 h-8" />, 
      color: "from-purple-500 to-pink-500",
      content: <SoundSphere />
    },
    { 
      id: "timevault", 
      name: "TimeVault", 
      icon: <Clock className="w-8 h-8" />, 
      color: "from-amber-500 to-orange-500",
      content: <TimeVault />
    }
  ];

  const handleAppOpen = (app: App) => {
    const isAlreadyOpen = openWindows.find(w => w.app.id === app.id);
    if (!isAlreadyOpen) {
      setOpenWindows([...openWindows, { id: Date.now().toString(), app, isMinimized: false, isMaximized: false }]);
      logEvent(app.name, app.icon, "Aplicativo aberto");
    } else {
      // Se já está aberto, apenas restaura se estiver minimizado
      if (isAlreadyOpen.isMinimized) {
        handleWindowMinimize(isAlreadyOpen.id);
      }
    }
    setIsStartMenuOpen(false);
  };

  const handleWindowClose = (windowId: string) => {
    const window = openWindows.find(w => w.id === windowId);
    if (window) {
      logEvent(window.app.name, window.app.icon, "Aplicativo fechado");
    }
    setOpenWindows(openWindows.filter(w => w.id !== windowId));
    setMaximizedWindows(prev => {
      const next = new Set(prev);
      next.delete(windowId);
      return next;
    });
  };

  const handleWindowMinimize = (windowId: string) => {
    const window = openWindows.find(w => w.id === windowId);
    if (window) {
      logEvent(window.app.name, window.app.icon, window.isMinimized ? "Janela restaurada" : "Janela minimizada");
    }
    setOpenWindows(openWindows.map(w => 
      w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

  const handleWindowMaximize = (windowId: string, isMaximized: boolean) => {
    const window = openWindows.find(w => w.id === windowId);
    if (window) {
      logEvent(window.app.name, window.app.icon, isMaximized ? "Janela maximizada" : "Janela restaurada");
    }
    setOpenWindows(openWindows.map(w => 
      w.id === windowId ? { ...w, isMaximized } : w
    ));
    setMaximizedWindows(prev => {
      const next = new Set(prev);
      if (isMaximized) {
        next.add(windowId);
      } else {
        next.delete(windowId);
      }
      return next;
    });
  };

  const organizeWindows = () => {
    const visibleWindows = openWindows.filter(w => !w.isMinimized);
    if (visibleWindows.length === 0) return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight - 100; // Account for taskbar
    
    logEvent("Sistema", <Monitor className="w-8 h-8" />, `Organizando ${visibleWindows.length} janela(s)`);

    if (visibleWindows.length === 1) {
      // Center single window
      setOpenWindows(openWindows.map(w => {
        if (w.id === visibleWindows[0].id) {
          return { ...w, isMaximized: false };
        }
        return w;
      }));
    } else if (visibleWindows.length === 2) {
      // Split screen for two windows
      setOpenWindows(openWindows.map(w => {
        if (w.id === visibleWindows[0].id || w.id === visibleWindows[1].id) {
          return { ...w, isMaximized: false };
        }
        return w;
      }));
    } else {
      // Grid layout for 3+ windows
      const cols = Math.ceil(Math.sqrt(visibleWindows.length));
      const rows = Math.ceil(visibleWindows.length / cols);
      
      setOpenWindows(openWindows.map(w => {
        const index = visibleWindows.findIndex(vw => vw.id === w.id);
        if (index !== -1) {
          return { ...w, isMaximized: false };
        }
        return w;
      }));
    }
  };

  const handleTaskbarClick = (windowId: string) => {
    const window = openWindows.find(w => w.id === windowId);
    if (window?.isMinimized) {
      handleWindowMinimize(windowId);
    }
  };

  const hasMaximizedWindow = maximizedWindows.size > 0;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'slideGrid 20s linear infinite'
        }} />
      </div>

      {/* Desktop Icons Grid */}
      <div className="absolute top-8 left-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4">
        {apps.slice(0, 6).map((app) => (
          <AppIcon
            key={app.id}
            app={app}
            onOpen={handleAppOpen}
          />
        ))}
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <Search onClose={() => setIsSearchOpen(false)} apps={apps} onAppOpen={handleAppOpen} />
      )}

      {/* Windows */}
      <div className="absolute inset-0 pointer-events-none">
        {openWindows.map((window) => (
          !window.isMinimized && (
            <Window
              key={window.id}
              id={window.id}
              app={window.app}
              onClose={handleWindowClose}
              onMinimize={handleWindowMinimize}
              onMaximize={handleWindowMaximize}
            />
          )
        ))}
      </div>

      {/* Start Menu */}
      {isStartMenuOpen && (
        <StartMenu 
          apps={apps} 
          onAppOpen={handleAppOpen}
          onClose={() => setIsStartMenuOpen(false)}
          onLogout={onLogout}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows}
        onStartMenuToggle={() => setIsStartMenuOpen(!isStartMenuOpen)}
        onSearchToggle={() => setIsSearchOpen(!isSearchOpen)}
        onTaskbarClick={handleTaskbarClick}
        isHidden={hasMaximizedWindow}
      />

      <style>{`
        @keyframes slideGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};
