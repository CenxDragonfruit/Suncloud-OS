import { useState } from "react";
import { Monitor, Palette, Wifi, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

  return (
    <div className="flex h-full bg-card/40">
      {/* Sidebar */}
      <div className="w-56 border-r border-border/40 bg-card/60 p-3">
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category.id
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-secondary text-foreground"
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {selectedCategory === "personalization" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Personalização</h2>
              <p className="text-sm text-muted-foreground">
                Personalize a aparência do seu CloudOS
              </p>
            </div>

            <div className="glass-panel rounded-xl p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Tema</h3>
                <RadioGroup value={currentTheme} onValueChange={(value) => onThemeChange(value as "light" | "dark")}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="flex-1 cursor-pointer">
                      <div className="font-medium text-foreground">Modo Claro</div>
                      <div className="text-sm text-muted-foreground">Interface clara e limpa</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="flex-1 cursor-pointer">
                      <div className="font-medium text-foreground">Modo Escuro</div>
                      <div className="text-sm text-muted-foreground">Mais confortável para os olhos</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )}

        {selectedCategory === "system" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Sistema</h2>
              <p className="text-sm text-muted-foreground">
                Informações e configurações do sistema
              </p>
            </div>

            <div className="glass-panel rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-border/40">
                  <span className="text-sm text-muted-foreground">Versão do SO</span>
                  <span className="text-sm font-medium text-foreground">CloudOS 1.0</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/40">
                  <span className="text-sm text-muted-foreground">Processador</span>
                  <span className="text-sm font-medium text-foreground">Cloud CPU 8-Core</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-muted-foreground">Memória</span>
                  <span className="text-sm font-medium text-foreground">16 GB</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedCategory !== "personalization" && selectedCategory !== "system" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Configurações em desenvolvimento
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
