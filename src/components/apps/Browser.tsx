import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Search, Globe, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Page {
  url: string;
  title: string;
  content: React.ReactNode;
}

const pages: { [key: string]: Page } = {
  "sunsearch.com": {
    url: "sunsearch.com",
    title: "SunSearch - Motor de Busca",
    content: (
      <div className="flex flex-col items-center justify-center min-h-full p-8 relative">
        {/* Holographic background effect */}
        <div className="absolute inset-0 neural-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-8 text-glow-cyan">
            SunSearch
          </h1>
          <div className="w-full max-w-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-xl blur-xl" />
            <div className="relative">
              <Input
                placeholder="Buscar na rede neural..."
                className="h-14 text-lg pr-12 bg-card/60 backdrop-blur-xl border-cyan-500/30 focus:border-cyan-400 rounded-xl"
              />
              <Button
                size="icon"
                className="absolute right-2 top-2 h-10 w-10 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 rounded-lg glow-cyan"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="mt-8 flex gap-6">
            <a href="#news" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Notícias
            </a>
            <a href="#weather" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Tempo
            </a>
            <a href="#about" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Sobre
            </a>
          </div>
        </div>
      </div>
    ),
  },
  "about:suncloud": {
    url: "about:suncloud",
    title: "Sobre o Suncloud OS",
    content: (
      <div className="p-8 max-w-4xl mx-auto relative">
        <div className="absolute inset-0 neural-grid opacity-10" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-6">
            Sobre o Suncloud OS
          </h1>
          <div className="space-y-4 text-foreground">
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-xl">
              <p>
                <strong className="text-cyan-400">Suncloud OS</strong> é um sistema operacional revolucionário
                que funciona 100% na nuvem, permitindo que você acesse seu desktop de qualquer lugar do mundo.
              </p>
            </div>
            <h2 className="text-2xl font-semibold mt-6 mb-3 text-cyan-400">Características Principais:</h2>
            <ul className="space-y-2">
              {["Interface holográfica e intuitiva", "Acesso remoto de qualquer dispositivo", "Sincronização neural em nuvem", "Aplicativos integrados de produtividade", "Segurança de nível quântico"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  "news.suncloud.com": {
    url: "news.suncloud.com",
    title: "Notícias - Suncloud",
    content: (
      <div className="p-8 relative">
        <div className="absolute inset-0 neural-grid opacity-10" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-6">
            Transmissões Neurais
          </h1>
          <div className="space-y-4">
            {[
              { title: "Nova atualização do Suncloud OS disponível", date: "Hoje", priority: "high" },
              { title: "Tecnologia em nuvem avança com IA", date: "Ontem", priority: "medium" },
              { title: "Segurança cibernética: dicas essenciais", date: "2 dias atrás", priority: "low" },
            ].map((news, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-xl backdrop-blur-xl border transition-all hover:scale-[1.02] cursor-pointer ${
                  news.priority === "high" 
                    ? "bg-cyan-500/10 border-cyan-500/30 hover:glow-cyan" 
                    : news.priority === "medium"
                    ? "bg-violet-500/10 border-violet-500/30 hover:glow-violet"
                    : "bg-card/60 border-border/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${news.priority === "high" ? "bg-cyan-400" : news.priority === "medium" ? "bg-violet-400" : "bg-muted-foreground"} animate-pulse`} />
                  <span className="text-xs text-muted-foreground">{news.date}</span>
                </div>
                <h2 className="text-lg font-semibold text-foreground">{news.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
};

export const Browser = () => {
  const [currentUrl, setCurrentUrl] = useState("sunsearch.com");
  const [inputUrl, setInputUrl] = useState("sunsearch.com");
  const [history, setHistory] = useState<string[]>(["sunsearch.com"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigate = (url: string) => {
    const normalizedUrl = url.toLowerCase().trim();
    if (pages[normalizedUrl]) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(normalizedUrl);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setCurrentUrl(normalizedUrl);
      setInputUrl(normalizedUrl);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
    }
  };

  const currentPage = pages[currentUrl] || pages["sunsearch.com"];

  return (
    <div className="h-full flex flex-col bg-background/40 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 neural-grid opacity-20" />
      
      {/* Browser Controls */}
      <div className="relative z-10 flex items-center gap-2 p-3 border-b border-border/40 bg-card/60 backdrop-blur-xl">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
          onClick={goBack}
          disabled={historyIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
          onClick={goForward}
          disabled={historyIndex === history.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
          onClick={() => navigate(currentUrl)}
        >
          <RotateCw className="h-4 w-4" />
        </Button>
        
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-cyan-400" />
          </div>
          <Input
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                navigate(inputUrl);
              }
            }}
            className="h-8 pl-10 bg-background/50 border-cyan-500/30 focus:border-cyan-400 text-sm"
            placeholder="Digite uma URL..."
          />
        </div>
        
        <div className="flex items-center gap-1 text-xs text-cyan-400">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Seguro</span>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-auto bg-background/60 relative">
        {currentPage.content}
      </div>
    </div>
  );
};
