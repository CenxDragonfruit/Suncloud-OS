import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Search, Globe, Shield, Zap, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Page {
  url: string;
  title: string;
  content: React.ReactNode;
}

interface Tab {
  id: string;
  url: string;
  title: string;
  history: string[];
  historyIndex: number;
}

const pages: { [key: string]: Page } = {
  "sunsearch.com": {
    url: "sunsearch.com",
    title: "SunSearch - Motor de Busca",
    content: (
      <div className="flex flex-col items-center justify-center min-h-full p-8 relative">
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
            <span className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer">
              <Zap className="w-4 h-4" />
              Notícias
            </span>
            <span className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer">
              <Globe className="w-4 h-4" />
              Tempo
            </span>
            <span className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer">
              <Shield className="w-4 h-4" />
              Sobre
            </span>
          </div>
        </div>
      </div>
    ),
  },
  "about:suncloud": {
    url: "about:suncloud",
    title: "Sobre o Suncloud OS",
    content: (
      <ScrollArea className="h-full">
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
      </ScrollArea>
    ),
  },
  "news.suncloud.com": {
    url: "news.suncloud.com",
    title: "Notícias - Suncloud",
    content: (
      <ScrollArea className="h-full">
        <div className="p-8 relative">
          <div className="absolute inset-0 neural-grid opacity-10" />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-6">
              Transmissões Neurais
            </h1>
            <div className="space-y-4">
              {[
                { title: "Nova atualização do Suncloud OS disponível", date: "Hoje", priority: "high", desc: "Versão 2.0 traz recursos de IA avançados" },
                { title: "Tecnologia em nuvem avança com IA", date: "Ontem", priority: "medium", desc: "Novos modelos de processamento distribuído" },
                { title: "Segurança cibernética: dicas essenciais", date: "2 dias atrás", priority: "low", desc: "Proteja seus dados na era quântica" },
                { title: "Lançamento do Neural Link 3.0", date: "3 dias atrás", priority: "medium", desc: "Interface cérebro-computador mais avançada" },
                { title: "Energia solar bate recorde de eficiência", date: "1 semana", priority: "low", desc: "Novos painéis atingem 60% de conversão" },
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
                  <p className="text-sm text-muted-foreground mt-1">{news.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    ),
  },
  "apps.suncloud.com": {
    url: "apps.suncloud.com",
    title: "Loja de Apps - Suncloud",
    content: (
      <ScrollArea className="h-full">
        <div className="p-8 relative">
          <div className="absolute inset-0 neural-grid opacity-10" />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-6">
              Loja Neural de Aplicativos
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "NeuroChat", category: "Comunicação", rating: 4.8 },
                { name: "CloudSync Pro", category: "Produtividade", rating: 4.9 },
                { name: "HoloGames", category: "Jogos", rating: 4.7 },
                { name: "MindMap AI", category: "Produtividade", rating: 4.6 },
                { name: "VirtualFit", category: "Saúde", rating: 4.5 },
                { name: "ArtGen 3D", category: "Criatividade", rating: 4.8 },
              ].map((app, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-card/60 border border-border/30 backdrop-blur-xl hover:border-cyan-500/30 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 mb-3 flex items-center justify-center text-white font-bold">
                    {app.name[0]}
                  </div>
                  <h3 className="font-semibold text-foreground">{app.name}</h3>
                  <p className="text-xs text-muted-foreground">{app.category}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-amber-400">★</span>
                    <span className="text-sm text-foreground">{app.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    ),
  },
  "social.suncloud.com": {
    url: "social.suncloud.com",
    title: "Social - Suncloud",
    content: (
      <ScrollArea className="h-full">
        <div className="p-8 relative">
          <div className="absolute inset-0 neural-grid opacity-10" />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-6">
              Rede Neural Social
            </h1>
            <div className="space-y-4">
              {[
                { user: "TechMaster", avatar: "T", content: "Acabei de atualizar para o Suncloud OS 2.0! A velocidade é incrível 🚀", likes: 234, time: "2h" },
                { user: "CloudExplorer", avatar: "C", content: "Alguém mais testou os novos recursos de IA? Estou impressionado!", likes: 189, time: "4h" },
                { user: "NeuralDev", avatar: "N", content: "Desenvolvendo meu primeiro app para a loja Suncloud. Em breve disponível!", likes: 456, time: "6h" },
              ].map((post, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-card/60 border border-border/30 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-bold">
                      {post.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{post.user}</p>
                      <p className="text-xs text-muted-foreground">{post.time} atrás</p>
                    </div>
                  </div>
                  <p className="text-foreground mb-3">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="hover:text-cyan-400 cursor-pointer">❤️ {post.likes}</span>
                    <span className="hover:text-cyan-400 cursor-pointer">💬 Comentar</span>
                    <span className="hover:text-cyan-400 cursor-pointer">🔄 Compartilhar</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    ),
  },
};

const defaultTab = (): Tab => ({
  id: Date.now().toString(),
  url: "sunsearch.com",
  title: "SunSearch",
  history: ["sunsearch.com"],
  historyIndex: 0,
});

export const Browser = () => {
  const [tabs, setTabs] = useState<Tab[]>([defaultTab()]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const [inputUrl, setInputUrl] = useState("sunsearch.com");

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const navigate = (url: string, tabId?: string) => {
    const normalizedUrl = url.toLowerCase().trim();
    const targetTabId = tabId || activeTabId;
    
    if (pages[normalizedUrl]) {
      setTabs(tabs.map(tab => {
        if (tab.id === targetTabId) {
          const newHistory = tab.history.slice(0, tab.historyIndex + 1);
          newHistory.push(normalizedUrl);
          return {
            ...tab,
            url: normalizedUrl,
            title: pages[normalizedUrl].title.split(" - ")[0],
            history: newHistory,
            historyIndex: newHistory.length - 1,
          };
        }
        return tab;
      }));
      setInputUrl(normalizedUrl);
    }
  };

  const goBack = () => {
    if (activeTab.historyIndex > 0) {
      const newIndex = activeTab.historyIndex - 1;
      const newUrl = activeTab.history[newIndex];
      setTabs(tabs.map(tab => {
        if (tab.id === activeTabId) {
          return {
            ...tab,
            url: newUrl,
            title: pages[newUrl]?.title.split(" - ")[0] || "Nova Aba",
            historyIndex: newIndex,
          };
        }
        return tab;
      }));
      setInputUrl(newUrl);
    }
  };

  const goForward = () => {
    if (activeTab.historyIndex < activeTab.history.length - 1) {
      const newIndex = activeTab.historyIndex + 1;
      const newUrl = activeTab.history[newIndex];
      setTabs(tabs.map(tab => {
        if (tab.id === activeTabId) {
          return {
            ...tab,
            url: newUrl,
            title: pages[newUrl]?.title.split(" - ")[0] || "Nova Aba",
            historyIndex: newIndex,
          };
        }
        return tab;
      }));
      setInputUrl(newUrl);
    }
  };

  const addTab = () => {
    const newTab = defaultTab();
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setInputUrl("sunsearch.com");
  };

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) return;
    
    const tabIndex = tabs.findIndex(t => t.id === tabId);
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    
    if (activeTabId === tabId) {
      const newActiveIndex = Math.min(tabIndex, newTabs.length - 1);
      setActiveTabId(newTabs[newActiveIndex].id);
      setInputUrl(newTabs[newActiveIndex].url);
    }
  };

  const switchTab = (tabId: string) => {
    setActiveTabId(tabId);
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      setInputUrl(tab.url);
    }
  };

  const currentPage = pages[activeTab.url] || pages["sunsearch.com"];

  return (
    <div className="h-full flex flex-col bg-background/40 relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-20" />
      
      {/* Tabs Bar */}
      <div className="relative z-10 flex items-center gap-1 px-2 pt-2 bg-card/60 backdrop-blur-xl border-b border-border/40">
        <ScrollArea className="flex-1">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`group flex items-center gap-2 px-3 py-2 rounded-t-lg cursor-pointer transition-all min-w-[120px] max-w-[200px] ${
                  activeTabId === tab.id
                    ? "bg-background/60 border-t border-l border-r border-cyan-500/30 text-cyan-400"
                    : "bg-card/40 hover:bg-card/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Globe className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate flex-1">{tab.title}</span>
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded p-0.5 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400 flex-shrink-0"
          onClick={addTab}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation Bar */}
      <div className="relative z-10 flex items-center gap-2 p-2 border-b border-border/40 bg-card/40 backdrop-blur-xl">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
          onClick={goBack}
          disabled={activeTab.historyIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
          onClick={goForward}
          disabled={activeTab.historyIndex === activeTab.history.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400"
          onClick={() => navigate(activeTab.url)}
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

      {/* Quick Links */}
      <div className="relative z-10 flex items-center gap-2 px-3 py-1.5 border-b border-border/40 bg-card/30 backdrop-blur-xl">
        {Object.keys(pages).slice(0, 5).map((url) => (
          <button
            key={url}
            onClick={() => navigate(url)}
            className={`text-xs px-2 py-1 rounded transition-all ${
              activeTab.url === url
                ? "bg-cyan-500/20 text-cyan-400"
                : "text-muted-foreground hover:text-cyan-400 hover:bg-cyan-500/10"
            }`}
          >
            {pages[url].title.split(" - ")[0]}
          </button>
        ))}
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-auto bg-background/60 relative">
        {currentPage.content}
      </div>
    </div>
  );
};
