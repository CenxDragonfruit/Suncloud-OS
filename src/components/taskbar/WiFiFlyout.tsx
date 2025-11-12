import { Wifi, Check } from "lucide-react";

interface WiFiFlyoutProps {
  onClose: () => void;
}

const networks = [
  { name: "Suncloud-Home", signal: 5, connected: true },
  { name: "Cafe-Guest", signal: 3, connected: false },
  { name: "Rede-5G-Escritorio", signal: 4, connected: false },
  { name: "Network-Neighbor", signal: 2, connected: false },
];

export const WiFiFlyout = ({ onClose }: WiFiFlyoutProps) => {
  return (
    <div className="absolute bottom-20 right-4 w-80 glass-panel rounded-xl shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-2 duration-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Redes Wi-Fi</h3>
          <Wifi className="h-4 w-4 text-primary" />
        </div>
        <div className="space-y-2">
          {networks.map((network) => (
            <button
              key={network.name}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Wifi className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">{network.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {network.connected && (
                  <Check className="h-4 w-4 text-primary" />
                )}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-3 rounded-full ${
                        i < network.signal ? "bg-primary" : "bg-muted"
                      }`}
                      style={{ height: `${(i + 1) * 3}px` }}
                    />
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
        {networks.find((n) => n.connected) && (
          <div className="mt-4 pt-4 border-t border-border/40">
            <p className="text-xs text-muted-foreground">
              Conectado: {networks.find((n) => n.connected)?.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
