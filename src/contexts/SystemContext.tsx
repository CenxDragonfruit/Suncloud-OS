import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface SystemEvent {
  time: string;
  app: string;
  icon: any;
  action: string;
  timestamp: number;
}

interface SystemContextType {
  events: SystemEvent[];
  logEvent: (app: string, icon: any, action: string) => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<SystemEvent[]>([]);

  const logEvent = useCallback((app: string, icon: any, action: string) => {
    const now = new Date();
    const newEvent: SystemEvent = {
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      app,
      icon,
      action,
      timestamp: now.getTime()
    };

    setEvents(prev => [...prev, newEvent].slice(-50)); // Keep last 50 events
  }, []);

  return (
    <SystemContext.Provider value={{ events, logEvent }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error("useSystem must be used within SystemProvider");
  }
  return context;
};
