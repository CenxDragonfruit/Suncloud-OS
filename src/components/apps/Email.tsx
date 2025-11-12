import { useState } from "react";
import { Inbox, Send, FileText, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EmailItem {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  content: string;
  folder: string;
}

const emails: EmailItem[] = [
  {
    id: 1,
    from: "Equipe Suncloud",
    subject: "Bem-vindo ao Suncloud OS!",
    preview: "Obrigado por escolher o Suncloud OS...",
    date: "10:30",
    content: "Obrigado por escolher o Suncloud OS! Estamos felizes em tê-lo conosco. Explore todos os recursos incríveis que preparamos para você.",
    folder: "inbox"
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
  { id: "inbox", name: "Caixa de Entrada", icon: <Inbox className="h-4 w-4" /> },
  { id: "sent", name: "Enviados", icon: <Send className="h-4 w-4" /> },
  { id: "drafts", name: "Rascunhos", icon: <FileText className="h-4 w-4" /> },
  { id: "trash", name: "Lixo", icon: <Trash2 className="h-4 w-4" /> },
];

export const Email = () => {
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(emails[0]);

  const filteredEmails = emails.filter(email => email.folder === selectedFolder);

  return (
    <div className="h-full flex bg-card/40">
      {/* Folders Panel */}
      <div className="w-48 border-r border-border/40 bg-card/60">
        <ScrollArea className="h-full">
          <div className="p-2">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedFolder === folder.id
                    ? "bg-primary/20 text-primary"
                    : "text-foreground hover:bg-secondary/50"
                }`}
              >
                {folder.icon}
                <span>{folder.name}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Email List Panel */}
      <div className="w-80 border-r border-border/40 bg-card/30">
        <ScrollArea className="h-full">
          <div className="p-2">
            {filteredEmails.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`w-full p-3 mb-2 rounded-lg text-left transition-colors ${
                  selectedEmail?.id === email.id
                    ? "bg-primary/20 border border-primary/30"
                    : "hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate">
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
      <div className="flex-1 flex flex-col">
        {selectedEmail ? (
          <>
            <div className="p-4 border-b border-border/40 bg-card/60">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                {selectedEmail.subject}
              </h2>
              <div className="flex items-center gap-2">
                <p className="text-sm text-foreground">{selectedEmail.from}</p>
                <span className="text-xs text-muted-foreground">•</span>
                <p className="text-xs text-muted-foreground">{selectedEmail.date}</p>
              </div>
            </div>
            <ScrollArea className="flex-1 p-6">
              <p className="text-sm text-foreground leading-relaxed">
                {selectedEmail.content}
              </p>
            </ScrollArea>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Selecione um email para ler</p>
          </div>
        )}
      </div>
    </div>
  );
};
