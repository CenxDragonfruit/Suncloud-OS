import { useState } from "react";
import { Folder, File, ChevronRight, Home, Image, FileText, Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileItem {
  name: string;
  type: "folder" | "file";
  icon?: React.ReactNode;
}

interface FolderStructure {
  [key: string]: FileItem[];
}

const fileSystem: FolderStructure = {
  "Documentos": [
    { name: "Relatorio_Final.pdf", type: "file" },
    { name: "Apresentacao.pptx", type: "file" },
    { name: "Notas.txt", type: "file" },
  ],
  "Imagens": [
    { name: "Foto_Viagem.png", type: "file" },
    { name: "Screenshot_2024.png", type: "file" },
    { name: "Logo_CloudOS.svg", type: "file" },
  ],
  "Downloads": [
    { name: "Setup_CloudOS.exe", type: "file" },
    { name: "Manual_Usuario.pdf", type: "file" },
  ],
};

export const FileExplorer = () => {
  const [currentPath, setCurrentPath] = useState<string>("Este Computador");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const folders = Object.keys(fileSystem);
  const currentFiles = currentPath !== "Este Computador" ? fileSystem[currentPath] || [] : [];

  return (
    <div className="flex h-full bg-card/40">
      {/* Sidebar */}
      <div className="w-48 border-r border-border/40 bg-card/60 p-3">
        <div className="space-y-1">
          <button
            onClick={() => setCurrentPath("Este Computador")}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentPath === "Este Computador"
                ? "bg-primary/20 text-primary"
                : "hover:bg-secondary text-foreground"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Este Computador</span>
          </button>
          
          <div className="pt-4 pb-2 px-3 text-xs font-medium text-muted-foreground">
            Favoritos
          </div>
          
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setCurrentPath(folder)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                currentPath === folder
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-secondary text-foreground"
              }`}
            >
              {folder === "Documentos" && <FileText className="w-4 h-4" />}
              {folder === "Imagens" && <Image className="w-4 h-4" />}
              {folder === "Downloads" && <Download className="w-4 h-4" />}
              <span>{folder}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Path Bar */}
        <div className="border-b border-border/40 bg-card/60 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Home className="w-4 h-4" />
            {currentPath !== "Este Computador" && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span>{currentPath}</span>
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
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-primary/30 transition-all">
                      <Folder className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{folder}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {currentFiles.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setSelectedItem(item.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedItem === item.name
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-white/10 text-foreground"
                    }`}
                  >
                    <File className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
