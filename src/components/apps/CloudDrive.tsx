import { useState, useEffect } from "react";
import { Cloud, Upload, Download, FolderOpen, FileText, Image, Video, File, Search, Grid3x3, List, Trash2, Share2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CloudFile {
  id: string;
  name: string;
  type: "folder" | "text" | "image" | "video" | "file";
  size?: string;
  modified: string;
}

export const CloudDrive = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState<CloudFile[]>([
    { id: "1", name: "Documentos", type: "folder", modified: "Hoje" },
    { id: "2", name: "Imagens", type: "folder", modified: "Ontem" },
    { id: "3", name: "Vídeos", type: "folder", modified: "2 dias atrás" },
    { id: "4", name: "relatorio_final.txt", type: "text", size: "45 KB", modified: "Hoje" },
    { id: "5", name: "foto_viagem.jpg", type: "image", size: "2.3 MB", modified: "Ontem" },
    { id: "6", name: "apresentacao.mp4", type: "video", size: "156 MB", modified: "3 dias atrás" },
    { id: "7", name: "projeto.zip", type: "file", size: "89 MB", modified: "Semana passada" },
  ]);

  const storageUsed = 45;
  const storageTotal = 100;

  const getFileIcon = (type: CloudFile['type']) => {
    switch (type) {
      case "folder": return <FolderOpen className="h-8 w-8 text-primary" />;
      case "text": return <FileText className="h-8 w-8 text-blue-400" />;
      case "image": return <Image className="h-8 w-8 text-green-400" />;
      case "video": return <Video className="h-8 w-8 text-purple-400" />;
      default: return <File className="h-8 w-8 text-muted-foreground" />;
    }
  };

  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-background/40">
      {/* Header */}
      <div className="p-4 border-b border-border/40 glass-panel">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Cloud className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-xl font-bold text-foreground">Suncloud Drive</h2>
              <p className="text-xs text-muted-foreground">Sincronizado</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={simulateUpload} size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setView(view === "grid" ? "list" : "grid")}
            >
              {view === "grid" ? <List className="h-4 w-4" /> : <Grid3x3 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar arquivos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="p-4 border-b border-border/40 bg-primary/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-foreground">Enviando arquivo...</span>
            <span className="text-sm text-primary">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} />
        </div>
      )}

      {/* Files Area */}
      <ScrollArea className="flex-1 p-4">
        {view === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="p-4 glass-panel hover:bg-secondary/20 cursor-pointer group">
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    {getFileIcon(file.type)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" /> Compartilhar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-foreground text-center truncate w-full">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size || file.modified}</p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="p-3 glass-panel hover:bg-secondary/20 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <div>
                      <p className="text-sm font-medium text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.modified}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.size && (
                      <span className="text-xs text-muted-foreground">{file.size}</span>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" /> Compartilhar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Storage Info */}
      <div className="p-4 border-t border-border/40 glass-panel">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-foreground">Armazenamento</span>
          <span className="text-sm text-muted-foreground">
            {storageUsed} GB de {storageTotal} GB
          </span>
        </div>
        <Progress value={(storageUsed / storageTotal) * 100} />
        <div className="grid grid-cols-4 gap-2 mt-3 text-xs">
          <div className="text-center">
            <div className="w-3 h-3 rounded-full bg-blue-400 mx-auto mb-1" />
            <span className="text-muted-foreground">Docs</span>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 rounded-full bg-green-400 mx-auto mb-1" />
            <span className="text-muted-foreground">Fotos</span>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 rounded-full bg-purple-400 mx-auto mb-1" />
            <span className="text-muted-foreground">Vídeos</span>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 rounded-full bg-muted mx-auto mb-1" />
            <span className="text-muted-foreground">Outros</span>
          </div>
        </div>
      </div>
    </div>
  );
};
