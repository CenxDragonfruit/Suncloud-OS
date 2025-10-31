import { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { App } from "./Desktop";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchProps {
  apps: App[];
  onAppOpen: (app: App) => void;
  onClose: () => void;
}

export const Search = ({ apps, onAppOpen, onClose }: SearchProps) => {
  const [query, setQuery] = useState("");

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Search Panel */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 w-[600px] max-w-[90vw] animate-in slide-in-from-top-4 fade-in duration-300">
        <div className="window-chrome rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="p-4 bg-card/60 backdrop-blur-xl border-b border-border/40">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Pesquisar aplicativos, arquivos, configurações..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10 h-12 bg-input/50 border-border/50 text-foreground placeholder:text-muted-foreground rounded-xl"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="p-4 bg-card/40 backdrop-blur-xl max-h-[400px] overflow-y-auto">
            {query && (
              <div className="mb-3">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Resultados ({filteredApps.length})
                </h3>
              </div>
            )}
            
            <div className="space-y-2">
              {filteredApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    onAppOpen(app);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-primary/30 transition-all flex-shrink-0`}>
                    <div className="text-white scale-75">
                      {app.icon}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-foreground">{app.name}</div>
                    <div className="text-xs text-muted-foreground">Aplicativo CloudOS</div>
                  </div>
                </button>
              ))}
              
              {query && filteredApps.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <SearchIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Nenhum resultado encontrado</p>
                  <p className="text-xs mt-1">Tente pesquisar com outros termos</p>
                </div>
              )}
              
              {!query && (
                <div className="text-center py-8 text-muted-foreground">
                  <SearchIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Digite para pesquisar</p>
                  <p className="text-xs mt-1">Aplicativos, arquivos e configurações</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
