import { App } from "./Desktop";
import { useSound } from "@/hooks/useSound";

interface AppIconProps {
  app: App;
  onOpen: (app: App) => void;
}

export const AppIcon = ({ app, onOpen }: AppIconProps) => {
  const { playHover, playClick } = useSound();

  return (
    <button
      onClick={() => {
        playClick();
        onOpen(app);
      }}
      onMouseEnter={() => playHover()}
      className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300`}>
        <div className="text-white">
          {app.icon}
        </div>
      </div>
      <span className="text-xs text-foreground font-medium text-center max-w-[80px] truncate">
        {app.name}
      </span>
    </button>
  );
};
