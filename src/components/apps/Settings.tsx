import { useState } from "react";
import { Monitor, Palette, Wifi, Shield, Bell, Sun, Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SettingsProps {
  onThemeChange: (theme: "light" | "dark") => void;
  currentTheme: "light" | "dark";
}

export const Settings = ({ onThemeChange, currentTheme }: SettingsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("personalization");

  const categories = [
    { id: "system", name: "Sistema", icon: <Monitor className="w-4 h-4" /> },
    { id: "personalization", name: "Personalização", icon: <Palette className="w-4 h-4" /> },
    { id: "network", name: "Rede", icon: <Wifi className="w-4 h-4" /> },
    { id: "privacy", name: "Privacidade", icon: <Shield className="w-4 h-4" /> },
    { id: "notifications", name: "Notificações", icon: <Bell className="w-4 h-4" /> },
  ];

  const handleThemeToggle = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    onThemeChange(newTheme);
  };

  return (
    <div className="flex h-full bg-background/40 relative overflow-hidden">
      {/* Neural grid background */}
      <div className="absolute inset-0 neural-grid opacity-20" />

      {/* Sidebar */}
      <div className="relative z-10 w-56 border-r border-border/40 bg-card/60 backdrop-blur-xl p-3">
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-400 border border-cyan-500/30"
                  : "hover:bg-secondary/50 text-foreground hover:text-cyan-400"
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <ScrollArea className="relative z-10 flex-1 p-6">
        {selectedCategory === "personalization" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2 text-glow-cyan">Personalização</h2>
              <p className="text-sm text-muted-foreground">
                Personalize a aparência do seu Suncloud OS
              </p>
            </div>

            {/* Theme Toggle Card */}
            <div className="rounded-xl p-6 bg-card/60 backdrop-blur-xl border border-border/40 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  Tema do Sistema
                </h3>
              </div>
              
              {/* Theme Preview Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Light Theme Card */}
                <button
                  onClick={() => onThemeChange("light")}
                  className={`relative p-4 rounded-xl transition-all ${
                    currentTheme === "light"
                      ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-background"
                      : "hover:ring-1 hover:ring-border"
                  }`}
                >
                  <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 mb-3 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full p-2">
                      <div className="w-full h-2 bg-slate-300 rounded mb-1" />
                      <div className="flex gap-1 h-[calc(100%-12px)]">
                        <div className="w-1/4 bg-slate-300 rounded" />
                        <div className="flex-1 bg-white rounded shadow-sm" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Sun className={`w-5 h-5 ${currentTheme === "light" ? "text-amber-500" : "text-muted-foreground"}`} />
                    <span className={`font-medium ${currentTheme === "light" ? "text-foreground" : "text-muted-foreground"}`}>
                      Modo Claro
                    </span>
                  </div>
                  {currentTheme === "light" && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>

                {/* Dark Theme Card */}
                <button
                  onClick={() => onThemeChange("dark")}
                  className={`relative p-4 rounded-xl transition-all ${
                    currentTheme === "dark"
                      ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-background"
                      : "hover:ring-1 hover:ring-border"
                  }`}
                >
                  <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 mb-3 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full p-2">
                      <div className="w-full h-2 bg-slate-700 rounded mb-1" />
                      <div className="flex gap-1 h-[calc(100%-12px)]">
                        <div className="w-1/4 bg-slate-700 rounded" />
                        <div className="flex-1 bg-slate-800 rounded border border-cyan-500/20" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Moon className={`w-5 h-5 ${currentTheme === "dark" ? "text-violet-400" : "text-muted-foreground"}`} />
                    <span className={`font-medium ${currentTheme === "dark" ? "text-foreground" : "text-muted-foreground"}`}>
                      Modo Escuro
                    </span>
                  </div>
                  {currentTheme === "dark" && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Quick Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/40">
                <div className="flex items-center gap-3">
                  {currentTheme === "dark" ? (
                    <Moon className="w-5 h-5 text-violet-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-amber-500" />
                  )}
                  <div>
                    <Label className="text-foreground font-medium">
                      Alternar Tema Rapidamente
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Atualmente: {currentTheme === "dark" ? "Modo Escuro" : "Modo Claro"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={currentTheme === "dark"}
                  onCheckedChange={handleThemeToggle}
                  className="data-[state=checked]:bg-violet-500"
                />
              </div>
            </div>

            {/* Accent Color (Future) */}
            <div className="rounded-xl p-6 bg-card/60 backdrop-blur-xl border border-border/40">
              <h3 className="text-lg font-semibold text-foreground mb-4">Cor de Destaque</h3>
              <div className="flex gap-3">
                {[
                  { color: "bg-cyan-500", name: "Ciano" },
                  { color: "bg-violet-500", name: "Violeta" },
                  { color: "bg-emerald-500", name: "Esmeralda" },
                  { color: "bg-rose-500", name: "Rosa" },
                  { color: "bg-amber-500", name: "Âmbar" },
                ].map((accent, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 rounded-full ${accent.color} ${
                      index === 0 ? "ring-2 ring-offset-2 ring-offset-background ring-cyan-400" : ""
                    } hover:scale-110 transition-transform`}
                    title={accent.name}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Mais opções de personalização em breve
              </p>
            </div>
          </div>
        )}

        {selectedCategory === "system" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2 text-glow-cyan">Sistema</h2>
              <p className="text-sm text-muted-foreground">
                Informações e configurações do sistema
              </p>
            </div>

            <div className="rounded-xl p-6 bg-card/60 backdrop-blur-xl border border-border/40">
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-border/40">
                  <span className="text-sm text-muted-foreground">Versão do SO</span>
                  <span className="text-sm font-medium text-cyan-400">Suncloud OS 2.0</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border/40">
                  <span className="text-sm text-muted-foreground">Processador</span>
                  <span className="text-sm font-medium text-foreground">Neural CPU 16-Core</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border/40">
                  <span className="text-sm text-muted-foreground">Memória</span>
                  <span className="text-sm font-medium text-foreground">32 GB Neural RAM</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border/40">
                  <span className="text-sm text-muted-foreground">Armazenamento</span>
                  <span className="text-sm font-medium text-foreground">1 TB Cloud Storage</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-sm font-medium text-emerald-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-6 bg-card/60 backdrop-blur-xl border border-border/40">
              <h3 className="text-lg font-semibold text-foreground mb-4">Atualizações</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground">Sistema atualizado</p>
                  <p className="text-xs text-muted-foreground">Última verificação: hoje às 10:00</p>
                </div>
                <Button variant="outline" className="border-cyan-500/30 hover:bg-cyan-500/20">
                  Verificar atualizações
                </Button>
              </div>
            </div>
          </div>
        )}

        {selectedCategory === "network" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2 text-glow-cyan">Rede</h2>
              <p className="text-sm text-muted-foreground">
                Configurações de conexão de rede
              </p>
            </div>

            <div className="rounded-xl p-6 bg-card/60 backdrop-blur-xl border border-border/40">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="font-medium text-foreground">Neural Network</p>
                    <p className="text-xs text-muted-foreground">Conectado • Excelente</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-3 bg-cyan-400 rounded" />
                  <div className="w-1 h-4 bg-cyan-400 rounded" />
                  <div className="w-1 h-5 bg-cyan-400 rounded" />
                  <div className="w-1 h-6 bg-cyan-400 rounded" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-background/50">
                  <p className="text-muted-foreground">Download</p>
                  <p className="font-medium text-foreground">1.2 Gbps</p>
                </div>
                <div className="p-3 rounded-lg bg-background/50">
                  <p className="text-muted-foreground">Upload</p>
                  <p className="font-medium text-foreground">800 Mbps</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedCategory === "privacy" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2 text-glow-cyan">Privacidade</h2>
              <p className="text-sm text-muted-foreground">
                Configurações de privacidade e segurança
              </p>
            </div>

            <div className="rounded-xl p-6 bg-card/60 backdrop-blur-xl border border-border/40 space-y-4">
              {[
                { label: "Criptografia de dados", desc: "Proteger todos os dados com criptografia quântica", enabled: true },
                { label: "Autenticação biométrica", desc: "Usar reconhecimento facial ou digital", enabled: true },
                { label: "Histórico de atividades", desc: "Manter registro de ações do sistema", enabled: false },
                { label: "Compartilhar diagnósticos", desc: "Ajudar a melhorar o Suncloud OS", enabled: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-background/50 transition-colors">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.enabled} />
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCategory === "notifications" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2 text-glow-cyan">Notificações</h2>
              <p className="text-sm text-muted-foreground">
                Gerencie suas preferências de notificações
              </p>
            </div>

            <div className="rounded-xl p-6 bg-card/60 backdrop-blur-xl border border-border/40 space-y-4">
              {[
                { label: "Notificações do sistema", desc: "Atualizações e alertas importantes", enabled: true },
                { label: "Sons de notificação", desc: "Reproduzir sons ao receber notificações", enabled: true },
                { label: "Notificações de apps", desc: "Permitir que apps enviem notificações", enabled: true },
                { label: "Modo não perturbe", desc: "Silenciar todas as notificações", enabled: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-background/50 transition-colors">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.enabled} />
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
