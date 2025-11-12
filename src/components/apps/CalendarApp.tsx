import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  { id: 1, day: 15, time: "10:00", title: "Reunião de Equipe" },
  { id: 2, day: 15, time: "14:00", title: "Dentista" },
  { id: 3, day: 20, time: "09:00", title: "Apresentação Cliente" },
  { id: 4, day: 25, time: "16:00", title: "Workshop" },
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

  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const today = new Date().getDate();

  return (
    <div className="h-full flex flex-col bg-card/40">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/40 bg-card/60">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold text-foreground capitalize">{monthName}</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          {(["month", "week", "day"] as const).map((v) => (
            <Button
              key={v}
              variant={view === v ? "default" : "ghost"}
              size="sm"
              onClick={() => setView(v)}
              className="capitalize"
            >
              {v === "month" ? "Mês" : v === "week" ? "Semana" : "Dia"}
            </Button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      {view === "month" && (
        <div className="flex-1 p-4">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
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
                  className={`aspect-square border border-border/40 rounded-lg p-2 ${
                    day ? "bg-card/60 hover:bg-card cursor-pointer" : "bg-transparent"
                  } ${isToday ? "ring-2 ring-primary" : ""}`}
                >
                  {day && (
                    <>
                      <p className={`text-sm font-medium ${isToday ? "text-primary" : "text-foreground"}`}>
                        {day}
                      </p>
                      <div className="mt-1 space-y-1">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className="text-xs bg-primary/20 text-primary px-1 py-0.5 rounded truncate"
                          >
                            {event.time} {event.title}
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
    </div>
  );
};
