import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Search } from "lucide-react";
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
      <div className="flex flex-col items-center justify-center min-h-full p-8">
        <h1 className="text-6xl font-bold text-primary mb-8">SunSearch</h1>
        <div className="w-full max-w-2xl relative">
          <Input
            placeholder="Buscar na web simulada..."
            className="h-14 text-lg pr-12 bg-card/60 border-border/40"
          />
          <Button
            size="icon"
            className="absolute right-2 top-2 h-10 w-10 bg-primary"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-8 flex gap-4">
          <a href="#news" className="text-primary hover:underline">Notícias</a>
          <a href="#weather" className="text-primary hover:underline">Tempo</a>
          <a href="#about" className="text-primary hover:underline">Sobre</a>
        </div>
      </div>
    ),
  },
  "about:suncloud": {
    url: "about:suncloud",
    title: "Sobre o Suncloud OS",
    content: (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-6">Sobre o Suncloud OS</h1>
        <div className="space-y-4 text-foreground">
          <p>
            <strong className="text-primary">Suncloud OS</strong> é um sistema operacional revolucionário
            que funciona 100% na nuvem, permitindo que você acesse seu desktop de qualquer lugar do mundo.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-3">Características Principais:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Interface moderna e intuitiva</li>
            <li>Acesso remoto de qualquer dispositivo</li>
            <li>Sincronização automática em nuvem</li>
            <li>Aplicativos integrados de produtividade</li>
            <li>Segurança de nível empresarial</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-3">Aplicativos Inclusos:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Explorador de Arquivos</li>
            <li>Email e Calendário</li>
            <li>Galeria de Fotos e Vídeos</li>
            <li>Editor de Documentos</li>
            <li>Player de Música</li>
            <li>Terminal e Configurações</li>
            <li>Chat IA Integrado</li>
          </ul>
        </div>
      </div>
    ),
  },
  "news.suncloud.com": {
    url: "news.suncloud.com",
    title: "Notícias - Suncloud",
    content: (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Últimas Notícias</h1>
        <div className="space-y-6">
          {[
            { title: "Nova atualização do Suncloud OS disponível", date: "Hoje" },
            { title: "Tecnologia em nuvem avança com IA", date: "Ontem" },
            { title: "Segurança cibernética: dicas essenciais", date: "2 dias atrás" },
          ].map((news, index) => (
            <div key={index} className="border-b border-border/40 pb-4">
              <h2 className="text-xl font-semibold text-foreground mb-2">{news.title}</h2>
              <p className="text-sm text-muted-foreground">{news.date}</p>
            </div>
          ))}
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
    <div className="h-full flex flex-col bg-card/40">
      {/* Browser Controls */}
      <div className="flex items-center gap-2 p-2 border-b border-border/40 bg-card/60">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={goBack}
          disabled={historyIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={goForward}
          disabled={historyIndex === history.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => navigate(currentUrl)}
        >
          <RotateCw className="h-4 w-4" />
        </Button>
        
        <Input
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              navigate(inputUrl);
            }
          }}
          className="flex-1 h-8 bg-input/50 border-border/50"
          placeholder="Digite uma URL..."
        />
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-auto bg-background">
        {currentPage.content}
      </div>
    </div>
  );
};
