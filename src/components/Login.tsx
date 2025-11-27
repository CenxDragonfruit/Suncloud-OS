import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { useSound } from "@/hooks/useSound";

interface LoginProps {
  onLogin: () => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { playLogin, playError, playClick, playHover } = useSound();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    
    if (username === "user" && password === "1234") {
      setIsLoading(true);
      playLogin();
      
      // Delay login to let user hear the sound
      setTimeout(() => {
        onLogin();
      }, 1800);
    } else {
      playError();
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
      <div className="absolute inset-0 neural-grid opacity-40" />
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl float"
          style={{
            background: 'radial-gradient(circle, hsl(var(--holo-cyan) / 0.15) 0%, transparent 70%)',
            top: '10%',
            left: '10%',
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl float"
          style={{
            background: 'radial-gradient(circle, hsl(var(--holo-violet) / 0.15) 0%, transparent 70%)',
            bottom: '20%',
            right: '15%',
            animationDelay: '-3s',
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full blur-3xl float"
          style={{
            background: 'radial-gradient(circle, hsl(var(--holo-pink) / 0.1) 0%, transparent 70%)',
            top: '50%',
            left: '60%',
            animationDelay: '-1.5s',
          }}
        />
      </div>
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.15) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          animation: 'slideGrid 25s linear infinite'
        }} />
      </div>

      {/* Login Form */}
      <div className="absolute inset-0 flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-md mx-4">
          <div 
            className={`glass-panel rounded-2xl p-8 shadow-2xl backdrop-blur-2xl animate-window-open relative overflow-hidden ${isLoading ? 'pointer-events-none' : ''}`}
            style={{
              boxShadow: '0 0 60px hsl(var(--holo-cyan) / 0.1), 0 25px 50px -12px hsl(var(--background) / 0.8)',
            }}
          >
            {/* Holographic border effect */}
            <div className="absolute inset-0 rounded-2xl opacity-50" style={{
              background: 'linear-gradient(135deg, hsl(var(--holo-cyan) / 0.2), transparent 50%, hsl(var(--holo-violet) / 0.2))',
            }} />
            
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-card/80 backdrop-blur-sm z-20 flex items-center justify-center rounded-2xl">
                <div className="flex flex-col items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin"
                    style={{
                      boxShadow: '0 0 30px hsl(var(--primary) / 0.5)',
                    }}
                  />
                  <span className="text-sm text-primary text-glow-cyan animate-pulse">Inicializando sistema...</span>
                </div>
              </div>
            )}
            
            <div className="relative z-10">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <div 
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-card to-secondary flex items-center justify-center shadow-2xl relative overflow-hidden pulse-glow"
                >
                  <img src="/thumbnails/suncloud.png" className="w-14 h-14 relative z-10" alt="SunCloud Logo" />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-center text-foreground mb-2 text-glow-cyan">
                SunCloud OS
              </h1>
              <p className="text-center text-muted-foreground mb-8 text-sm">
                Sistema Operacional do Futuro
              </p>

              {/* Form Fields */}
              <div className="space-y-5">
                <div>
                  <label htmlFor="username" className="text-sm font-medium text-foreground/80 mb-2 block">
                    Nome de Usuário
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => playHover()}
                    placeholder="Digite seu usuário"
                    className="bg-input/60 border-border/50 text-foreground h-12 rounded-xl focus:border-primary/50 focus:ring-primary/20 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="text-sm font-medium text-foreground/80 mb-2 block">
                    Senha
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => playHover()}
                    placeholder="Digite sua senha"
                    className="bg-input/60 border-border/50 text-foreground h-12 rounded-xl focus:border-primary/50 focus:ring-primary/20 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  onMouseEnter={() => playHover()}
                  className="w-full h-12 bg-gradient-to-r from-primary via-accent to-primary hover:opacity-90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 relative overflow-hidden animate-gradient"
                  style={{
                    backgroundSize: '200% 200%',
                    boxShadow: '0 0 30px hsl(var(--primary) / 0.4)',
                  }}
                >
                  <span className="relative z-10">{isLoading ? 'Carregando...' : 'Entrar'}</span>
                </Button>
              </div>

              {/* Hint */}
              <p className="text-xs text-center text-muted-foreground mt-6 opacity-70">
                Dica: user / 1234
              </p>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes slideGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
      `}</style>
    </div>
  );
};
