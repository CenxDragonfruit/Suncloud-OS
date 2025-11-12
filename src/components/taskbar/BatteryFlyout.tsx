import { Battery, BatteryCharging } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface BatteryFlyoutProps {
  onClose: () => void;
}

export const BatteryFlyout = ({ onClose }: BatteryFlyoutProps) => {
  return (
    <div className="absolute bottom-20 right-4 w-80 glass-panel rounded-xl shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-2 duration-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Energia</h3>
          <BatteryCharging className="h-4 w-4 text-primary" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Battery className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">85%</p>
              <p className="text-xs text-muted-foreground">Conectado, carregando</p>
            </div>
          </div>

          <div className="pt-4 border-t border-border/40">
            <p className="text-sm text-foreground mb-3">Modo de Energia</p>
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">Economia</span>
              <span className="text-xs text-muted-foreground">Desempenho</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border/40 text-xs text-muted-foreground">
            <p>Tempo restante: ~4h 30min</p>
          </div>
        </div>
      </div>
    </div>
  );
};
