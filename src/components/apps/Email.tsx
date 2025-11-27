import { useState } from "react";
import { Inbox, Send, FileText, Trash2, Mail, Star, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EmailItem {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  content: string;
  folder: string;
  starred?: boolean;
}

const emails: EmailItem[] = [
  {
    id: 1,
    from: "Equipe Suncloud",
    subject: "Bem-vindo ao Suncloud OS!",
    preview: "Obrigado por escolher o Suncloud OS...",
    date: "10:30",
    content: "Obrigado por escolher o Suncloud OS! Estamos felizes em tê-lo conosco. Explore todos os recursos incríveis que preparamos para você.",
    folder: "inbox",
    starred: true,
  },
  {
    id: 2,
    from: "Notícias Diárias",
    subject: "Seu resumo matinal",
    preview: "Principais notícias de hoje...",
    date: "08:15",
    content: "Principais notícias de hoje: Tecnologia avança, novos recursos em nuvem, e muito mais!",
    folder: "inbox"
  },
  {
    id: 3,
    from: "Você",
    subject: "Re: Reunião de equipe",
    preview: "Confirmando presença...",
    date: "Ontem",
    content: "Confirmando minha presença na reunião de equipe. Obrigado!",
    folder: "sent"
  },
];

const folders = [
  { id: "inbox", name: "Caixa de Entrada", icon: Inbox, count: 2 },
  { id: "sent", name: "Enviados", icon: Send, count: 1 },
  { id: "drafts", name: "Rascunhos", icon: FileText, count: 0 },
  { id: "trash", name: "Lixo", icon: Trash2, count: 0 },
];

export const Email = () => {
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(emails[0]);

  const filteredEmails = emails.filter(email => email.folder === selectedFolder);

  return (
    <div className="h-full flex bg-background/40 relative overflow-hidden">
      {/* Neural grid background */}
      <div className="absolute inset-0 neural-grid opacity-20" />

      {/* Folders Panel */}
      <div className="relative z-10 w-52 border-r border-border/40 bg-card/60 backdrop-blur-xl">
        <div className="p-4 border-b border-border/40">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span className="font-semibold text-foreground text-glow-cyan">Neural Mail</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100%-60px)]">
          <div className="p-2">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                  selectedFolder === folder.id
                    ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-foreground hover:bg-secondary/50 hover:text-cyan-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <folder.icon className="w-4 h-4" />
                  <span>{folder.name}</span>
                </div>
                {folder.count > 0 && (
                  <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">
                    {folder.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Email List Panel */}
      <div className="relative z-10 w-80 border-r border-border/40 bg-card/40 backdrop-blur-xl">
        <div className="p-3 border-b border-border/40">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{selectedFolder === "inbox" ? "Caixa de Entrada" : "Enviados"}</span>
            <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
          </div>
        </div>
        <ScrollArea className="h-[calc(100%-48px)]">
          <div className="p-2">
            {filteredEmails.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`w-full p-3 mb-2 rounded-lg text-left transition-all ${
                  selectedEmail?.id === email.id
                    ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 glow-cyan"
                    : "hover:bg-card/60 border border-transparent hover:border-border/40"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate flex items-center gap-2">
                    {email.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                    {email.from}
                  </p>
                  <p className="text-xs text-muted-foreground">{email.date}</p>
                </div>
                <p className="text-sm font-medium text-foreground mb-1 truncate">
                  {email.subject}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {email.preview}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Reading Panel */}
      <div className="relative z-10 flex-1 flex flex-col bg-card/30 backdrop-blur-xl">
        {selectedEmail ? (
          <>
            <div className="p-4 border-b border-border/40 bg-card/60">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-foreground text-glow-cyan">
                  {selectedEmail.subject}
                </h2>
                {selectedEmail.starred && (
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                  {selectedEmail.from[0]}
                </div>
                <div>
                  <p className="text-sm text-foreground">{selectedEmail.from}</p>
                  <p className="text-xs text-muted-foreground">{selectedEmail.date}</p>
                </div>
              </div>
            </div>
            <ScrollArea className="flex-1 p-6">
              <div className="p-4 rounded-xl bg-card/40 border border-border/30">
                <p className="text-sm text-foreground leading-relaxed">
                  {selectedEmail.content}
                </p>
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <Mail className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">Selecione um email para ler</p>
          </div>
        )}
      </div>
    </div>
  );
};
