import { Bell, Mail, Calendar, Cloud } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationsFlyoutProps {
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    icon: <Mail className="h-5 w-5" />,
    title: "Novo Email",
    message: "Email de 'Equipe Suncloud'",
    time: "5 min atrás",
  },
  {
    id: 2,
    icon: <Calendar className="h-5 w-5" />,
    title: "Calendário",
    message: "Reunião em 15 min",
    time: "10 min atrás",
  },
  {
    id: 3,
    icon: <Cloud className="h-5 w-5" />,
    title: "Cloud Drive",
    message: "Sincronização concluída",
    time: "1 hora atrás",
  },
  {
    id: 4,
    icon: <Bell className="h-5 w-5" />,
    title: "Sistema",
    message: "Atualização disponível",
    time: "2 horas atrás",
  },
];

export const NotificationsFlyout = ({ onClose }: NotificationsFlyoutProps) => {
  return (
    <div className="absolute bottom-20 right-4 w-96 h-[500px] glass-panel rounded-xl shadow-2xl backdrop-blur-2xl animate-in slide-in-from-right-2 duration-200">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          <h3 className="text-sm font-semibold text-foreground">Central de Notificações</h3>
          <button className="text-xs text-primary hover:underline">
            Limpar tudo
          </button>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                className="w-full p-3 mb-2 rounded-lg hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
