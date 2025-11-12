import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginProps {
  onLogin: () => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "user" && password === "1234") {
      onLogin();
    } else {
      toast({
        title: "Erro de autenticação",
        description: "Nome de usuário ou senha incorretos",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'slideGrid 20s linear infinite'
        }} />
      </div>

      {/* Login Form */}
      <div className="absolute inset-0 flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-md mx-4">
          <div className="glass-panel rounded-2xl p-8 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-effect">
                <Cpu className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-center text-foreground mb-2 text-glow">
              CloudOS
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              Sistema Operacional do Futuro
            </p>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="text-sm font-medium text-foreground mb-2 block">
                  Nome de Usuário
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite seu usuário"
                  className="bg-input/50 border-border/50 text-foreground"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-foreground mb-2 block">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="bg-input/50 border-border/50 text-foreground"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-medium rounded-xl glow-effect"
              >
                Entrar
              </Button>
            </div>

            {/* Hint */}
            <p className="text-xs text-center text-muted-foreground mt-6">
              Dica: user / 1234
            </p>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes slideGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};
