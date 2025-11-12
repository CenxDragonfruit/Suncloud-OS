import { useState } from "react";
import { AppIcon } from "./AppIcon";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { StartMenu } from "./StartMenu";
import { Search } from "./Search";
import { FileExplorer } from "./apps/FileExplorer";
import { Settings } from "./apps/Settings";
import { AIChat } from "./apps/AIChat";
import { Terminal } from "./apps/Terminal";
import { 
  Folder, 
  Settings as SettingsIcon, 
  Image, 
  FileText, 
  Terminal as TerminalIcon, 
  Cloud,
  Mail,
  Calendar,
  Music,
  Video,
  Bot
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
}

interface DesktopProps {
  onLogout: () => void;
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
}

export const Desktop = ({ onLogout, theme, onThemeChange }: DesktopProps) => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const apps: App[] = [
    { 
      id: "files", 
      name: "Arquivos", 
      icon: <Folder className="w-8 h-8" />, 
      color: "from-cyan-500 to-blue-500",
      content: <FileExplorer />
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
      color: "from-green-500 to-emerald-500"
    },
    { 
      id: "docs", 
      name: "Documentos", 
      icon: <FileText className="w-8 h-8" />, 
      color: "from-orange-500 to-red-500"
    },
    { 
      id: "cloud", 
      name: "Cloud Drive", 
      icon: <Cloud className="w-8 h-8" />, 
      color: "from-sky-400 to-cyan-500"
    },
    { 
      id: "mail", 
      name: "Email", 
      icon: <Mail className="w-8 h-8" />, 
      color: "from-blue-500 to-indigo-600"
    },
    { 
      id: "calendar", 
      name: "Calendário", 
      icon: <Calendar className="w-8 h-8" />, 
      color: "from-rose-500 to-pink-600"
    },
    { 
      id: "music", 
      name: "Música", 
      icon: <Music className="w-8 h-8" />, 
      color: "from-violet-500 to-purple-600"
    },
    { 
      id: "video", 
      name: "Vídeos", 
      icon: <Video className="w-8 h-8" />, 
      color: "from-red-500 to-orange-500"
    },
  ];

  const handleAppOpen = (app: App) => {
    const isAlreadyOpen = openWindows.find(w => w.app.id === app.id);
    if (!isAlreadyOpen) {
      setOpenWindows([...openWindows, { id: Date.now().toString(), app, isMinimized: false }]);
    }
    setIsStartMenuOpen(false);
  };

  const handleWindowClose = (windowId: string) => {
    setOpenWindows(openWindows.filter(w => w.id !== windowId));
  };

  const handleWindowMinimize = (windowId: string) => {
    setOpenWindows(openWindows.map(w => 
      w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

  const handleTaskbarClick = (windowId: string) => {
    const window = openWindows.find(w => w.id === windowId);
    if (window?.isMinimized) {
      handleWindowMinimize(windowId);
    }
  };

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
