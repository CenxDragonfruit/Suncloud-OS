import { useState } from "react";
import { Folder, File, ChevronRight, Home, Image, FileText, Download, HardDrive, Database, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileItem {
  name: string;
  type: "folder" | "file";
  size?: string;
  icon?: React.ReactNode;
}

interface FolderStructure {
  [key: string]: FileItem[];
}

const fileSystem: FolderStructure = {
  "Documentos": [
    { name: "Relatorio_Final.pdf", type: "file", size: "2.4 MB" },
    { name: "Apresentacao.pptx", type: "file", size: "15.8 MB" },
    { name: "Notas.txt", type: "file", size: "4 KB" },
  ],
  "Imagens": [
    { name: "Foto_Viagem.png", type: "file", size: "3.2 MB" },
    { name: "Screenshot_2024.png", type: "file", size: "1.1 MB" },
    { name: "Logo_CloudOS.svg", type: "file", size: "24 KB" },
  ],
  "Downloads": [
    { name: "Setup_CloudOS.exe", type: "file", size: "156 MB" },
    { name: "Manual_Usuario.pdf", type: "file", size: "8.5 MB" },
  ],
};

export const FileExplorer = () => {
  const [currentPath, setCurrentPath] = useState<string>("Este Computador");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const folders = Object.keys(fileSystem);
  const currentFiles = currentPath !== "Este Computador" ? fileSystem[currentPath] || [] : [];

  const getFolderIcon = (folder: string) => {
    switch (folder) {
      case "Documentos": return <FileText className="w-6 h-6" />;
      case "Imagens": return <Image className="w-6 h-6" />;
      case "Downloads": return <Download className="w-6 h-6" />;
      default: return <Folder className="w-6 h-6" />;
    }
  };

  const getFolderColor = (folder: string) => {
    switch (folder) {
      case "Documentos": return "from-cyan-500 to-blue-500";
      case "Imagens": return "from-violet-500 to-purple-500";
      case "Downloads": return "from-amber-500 to-orange-500";
      default: return "from-primary to-accent";
    }
  };

  return (
    <div className="flex h-full bg-background/40 relative overflow-hidden">
      {/* Neural grid background */}
      <div className="absolute inset-0 neural-grid opacity-20" />

      {/* Sidebar */}
      <div className="relative z-10 w-52 border-r border-border/40 bg-card/60 backdrop-blur-xl p-3">
        <div className="space-y-1">
          <button
            onClick={() => setCurrentPath("Este Computador")}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              currentPath === "Este Computador"
                ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-400 border border-cyan-500/30 glow-cyan"
                : "hover:bg-secondary/50 text-foreground"
            }`}
          >
            <HardDrive className="w-4 h-4" />
            <span>Este Computador</span>
          </button>
          
          <div className="pt-4 pb-2 px-3 text-xs font-medium text-cyan-400/70 flex items-center gap-2">
            <Database className="w-3 h-3" />
            Neural Storage
          </div>
          
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setCurrentPath(folder)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                currentPath === folder
                  ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-400 border border-cyan-500/30"
                  : "hover:bg-secondary/50 text-foreground hover:text-cyan-400"
              }`}
            >
              {getFolderIcon(folder)}
              <span>{folder}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Area */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Path Bar */}
        <div className="border-b border-border/40 bg-card/60 backdrop-blur-xl px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Home className="w-4 h-4 text-cyan-400" />
            {currentPath !== "Este Computador" && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-cyan-400">{currentPath}</span>
              </>
            )}
          </div>
        </div>

        {/* Content Area */}
        <ScrollArea className="flex-1">
          <div className="p-4">
            {currentPath === "Este Computador" ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {folders.map((folder) => (
                  <button
                    key={folder}
                    onClick={() => setCurrentPath(folder)}
                    className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card/40 border border-border/30 hover:border-cyan-500/30 hover:bg-card/60 transition-all duration-300 group"
                  >
                    <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${getFolderColor(folder)} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}>
                      <div className="absolute inset-0 rounded-xl bg-black/20" />
                      <div className="relative text-white">
                        {getFolderIcon(folder)}
                      </div>
                      <div className="absolute -bottom-1 -right-1">
                        <Sparkles className="w-4 h-4 text-white animate-pulse" />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-cyan-400 transition-colors">{folder}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {currentFiles.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setSelectedItem(item.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedItem === item.name
                        ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-400 border border-cyan-500/30 glow-cyan"
                        : "hover:bg-card/60 text-foreground hover:text-cyan-400 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <File className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.size && (
                      <span className="text-xs text-muted-foreground">{item.size}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Status Bar */}
        <div className="border-t border-border/40 bg-card/60 backdrop-blur-xl px-4 py-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{currentPath === "Este Computador" ? `${folders.length} pastas` : `${currentFiles.length} itens`}</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Neural Sync Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
