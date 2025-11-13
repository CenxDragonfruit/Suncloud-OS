import { useState } from "react";
import { Wifi, Bluetooth, Smartphone, Watch, Headphones, Signal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SkyLink = () => {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);

  const networks = [
    { name: "Suncloud-Home", signal: 5, connected: true },
    { name: "Cafe-Guest", signal: 3, connected: false },
    { name: "Rede-5G-Escritorio", signal: 4, connected: false },
  ];

  const devices = [
    { name: "SmartWatch Pro", icon: Watch, status: "Conectado", battery: 85 },
    { name: "AirPods Max", icon: Headphones, status: "Conectado", battery: 72 },
    { name: "iPhone 15", icon: Smartphone, status: "Disponível", battery: null },
  ];

  const latency = 12; // ms

  return (
    <ScrollArea className="h-full">
      <div className="bg-background/40 p-6">
      <div className="text-center mb-6">
        <Signal className="h-16 w-16 mx-auto text-primary mb-3 animate-pulse" />
        <h2 className="text-2xl font-bold text-foreground">SkyLink</h2>
        <p className="text-sm text-muted-foreground">Hub de Conectividade Universal</p>
      </div>

      <div className="grid gap-4 mb-6">
        <Card className="p-4 glass-panel">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Wifi className={`h-6 w-6 ${wifiEnabled ? 'text-primary' : 'text-muted'}`} />
              <div>
                <h3 className="font-semibold text-foreground">Wi-Fi</h3>
                <p className="text-xs text-muted-foreground">
                  {wifiEnabled ? "Suncloud-Home" : "Desconectado"}
                </p>
              </div>
            </div>
            <Switch checked={wifiEnabled} onCheckedChange={setWifiEnabled} />
          </div>
          
          {wifiEnabled && (
            <div className="space-y-2 pt-2 border-t border-border/40">
              {networks.map((net, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-2 rounded hover:bg-secondary/50 transition-colors"
                >
                  <span className="text-sm text-foreground">{net.name}</span>
                  <div className="flex items-center gap-2">
                    {net.connected && (
                      <span className="text-xs text-primary">●</span>
                    )}
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div
                          key={j}
                          className={`w-1 rounded-full ${
                            j < net.signal ? "bg-primary" : "bg-muted"
                          }`}
                          style={{ height: `${(j + 1) * 3}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-4 glass-panel">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bluetooth className={`h-6 w-6 ${bluetoothEnabled ? 'text-primary' : 'text-muted'}`} />
              <div>
                <h3 className="font-semibold text-foreground">Bluetooth</h3>
                <p className="text-xs text-muted-foreground">
                  {bluetoothEnabled ? `${devices.filter(d => d.status === "Conectado").length} dispositivos` : "Desativado"}
                </p>
              </div>
            </div>
            <Switch checked={bluetoothEnabled} onCheckedChange={setBluetoothEnabled} />
          </div>
        </Card>
      </div>

      {bluetoothEnabled && (
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-semibold text-foreground">Dispositivos</h3>
          {devices.map((device, i) => (
            <Card key={i} className="p-3 glass-panel">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <device.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{device.name}</p>
                    <p className="text-xs text-muted-foreground">{device.status}</p>
                  </div>
                </div>
                {device.battery && (
                  <div className="text-xs text-muted-foreground">{device.battery}%</div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="p-4 glass-panel bg-primary/5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Status da Rede</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">{latency}ms</p>
            <p className="text-xs text-muted-foreground">Latência</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">98%</p>
            <p className="text-xs text-muted-foreground">Qualidade</p>
          </div>
        </div>
      </Card>
      </div>
    </ScrollArea>
  );
};
