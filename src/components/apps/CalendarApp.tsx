import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const events = [
  { id: 1, day: 15, time: "10:00", title: "Reunião de Equipe", type: "work" },
  { id: 2, day: 15, time: "14:00", title: "Dentista", type: "personal" },
  { id: 3, day: 20, time: "09:00", title: "Apresentação Cliente", type: "work" },
  { id: 4, day: 25, time: "16:00", title: "Workshop", type: "study" },
];

export const CalendarApp = () => {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDay = (day: number | null) => {
    if (!day) return [];
    return events.filter(event => event.day === day);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "work": return "from-cyan-500/20 to-cyan-500/10 border-cyan-500/30";
      case "personal": return "from-violet-500/20 to-violet-500/10 border-violet-500/30";
      case "study": return "from-amber-500/20 to-amber-500/10 border-amber-500/30";
      default: return "from-primary/20 to-primary/10 border-primary/30";
    }
  };

  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const today = new Date().getDate();

  return (
    <ScrollArea className="h-full">
      <div className="bg-background/40 relative overflow-hidden">
        {/* Neural grid background */}
        <div className="absolute inset-0 neural-grid opacity-20" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-4 border-b border-border/40 bg-card/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-foreground capitalize text-glow-cyan">{monthName}</h2>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-1 p-1 rounded-lg bg-card/60 border border-border/40">
            {(["month", "week", "day"] as const).map((v) => (
              <Button
                key={v}
                variant={view === v ? "default" : "ghost"}
                size="sm"
                onClick={() => setView(v)}
                className={`capitalize text-xs ${view === v ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white" : "hover:bg-cyan-500/20"}`}
              >
                {v === "month" ? "Mês" : v === "week" ? "Semana" : "Dia"}
              </Button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        {view === "month" && (
          <div className="relative z-10 p-4">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-cyan-400/70 p-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {getDaysInMonth().map((day, index) => {
                const dayEvents = getEventsForDay(day);
                const isToday = day === today;
                
                return (
                  <div
                    key={index}
                    className={`min-h-[80px] border rounded-lg p-2 backdrop-blur-xl transition-all cursor-pointer ${
                      day 
                        ? "bg-card/40 border-border/30 hover:bg-card/60 hover:border-cyan-500/30" 
                        : "bg-transparent border-transparent"
                    } ${isToday ? "ring-2 ring-cyan-500 glow-cyan" : ""}`}
                  >
                    {day && (
                      <>
                        <div className="flex items-center justify-between mb-1">
                          <p className={`text-sm font-medium ${isToday ? "text-cyan-400 text-glow-cyan" : "text-foreground"}`}>
                            {day}
                          </p>
                          {dayEvents.length > 0 && (
                            <Sparkles className="w-3 h-3 text-violet-400 animate-pulse" />
                          )}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs px-1.5 py-0.5 rounded bg-gradient-to-r border truncate ${getEventColor(event.type)}`}
                            >
                              <div className="flex items-center gap-1">
                                <Clock className="w-2 h-2" />
                                <span className="truncate">{event.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Upcoming Events Panel */}
        <div className="relative z-10 p-4 border-t border-border/40">
          <h3 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Próximos Eventos
          </h3>
          <div className="space-y-2">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-lg bg-gradient-to-r border backdrop-blur-xl ${getEventColor(event.type)}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{event.title}</span>
                  <span className="text-xs text-muted-foreground">Dia {event.day} às {event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
