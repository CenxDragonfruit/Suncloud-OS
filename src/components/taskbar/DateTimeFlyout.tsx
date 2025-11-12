import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

interface DateTimeFlyoutProps {
  onClose: () => void;
}

export const DateTimeFlyout = ({ onClose }: DateTimeFlyoutProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const currentTime = new Date().toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="absolute bottom-20 right-4 w-80 glass-panel rounded-xl shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-2 duration-200">
      <div className="p-4">
        <div className="text-center mb-4">
          <p className="text-3xl font-bold text-foreground">{currentTime}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="border-t border-border/40 pt-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
