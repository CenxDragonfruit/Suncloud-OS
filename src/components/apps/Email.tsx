import { useState } from "react";
import { Inbox, Send, FileText, Trash2, Mail, Star, Sparkles, Reply, Wand2, Loader2, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface EmailItem {
  id: number;
  from: string;
  to?: string;
  subject: string;
  preview: string;
  date: string;
  content: string;
  folder: string;
  starred?: boolean;
}

const initialEmails: EmailItem[] = [
  {
    id: 1,
    from: "Equipe Suncloud",
    subject: "Bem-vindo ao Suncloud OS!",
    preview: "Obrigado por escolher o Suncloud OS...",
    date: "10:30",
    content: "Obrigado por escolher o Suncloud OS! Estamos felizes em tê-lo conosco. Explore todos os recursos incríveis que preparamos para você. Nossa equipe trabalhou arduamente para criar uma experiência única e futurística.",
    folder: "inbox",
    starred: true,
  },
  {
    id: 2,
    from: "Notícias Diárias",
    subject: "Seu resumo matinal",
    preview: "Principais notícias de hoje...",
    date: "08:15",
    content: "Principais notícias de hoje:\n\n• Tecnologia avança com novos modelos de IA\n• Recursos em nuvem mais acessíveis\n• Segurança cibernética em foco\n• Novidades em automação residencial",
    folder: "inbox"
  },
  {
    id: 3,
    from: "Recursos Humanos",
    subject: "Reunião de equipe amanhã",
    preview: "Lembrando sobre a reunião...",
    date: "Ontem",
    content: "Olá,\n\nLembramos que amanhã teremos nossa reunião semanal de equipe às 14h. Por favor, prepare seus relatórios de progresso.\n\nAtenciosamente,\nEquipe RH",
    folder: "inbox"
  },
  {
    id: 4,
    from: "Você",
    to: "cliente@empresa.com",
    subject: "Re: Proposta comercial",
    preview: "Confirmando o recebimento...",
    date: "Ontem",
    content: "Prezado cliente,\n\nConfirmando o recebimento da proposta. Analisaremos e retornaremos em breve.\n\nAtenciosamente",
    folder: "sent"
  },
];

const folders = [
  { id: "inbox", name: "Caixa de Entrada", icon: Inbox, count: 3 },
  { id: "sent", name: "Enviados", icon: Send, count: 1 },
  { id: "drafts", name: "Rascunhos", icon: FileText, count: 0 },
  { id: "trash", name: "Lixo", icon: Trash2, count: 0 },
];

const generateAIReply = async (originalEmail: EmailItem): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const replies: { [key: string]: string } = {
    "Bem-vindo ao Suncloud OS!": `Prezada Equipe Suncloud,

Muito obrigado pela calorosa recepção! Estou impressionado com a qualidade e inovação do sistema operacional.

Já comecei a explorar os recursos e estou particularmente interessado nas funcionalidades de IA integradas. O design futurístico e a interface intuitiva tornam a experiência muito agradável.

Agradeço o excelente trabalho da equipe!

Atenciosamente,
Usuário`,
    "Seu resumo matinal": `Olá,

Obrigado pelo resumo das notícias! As atualizações sobre tecnologia e IA são particularmente interessantes para mim.

Gostaria de receber mais informações sobre:
- Novos modelos de IA disponíveis
- Tendências em computação em nuvem
- Dicas de segurança cibernética

Continuem com o excelente trabalho!

Abraços`,
    "Reunião de equipe amanhã": `Prezado RH,

Confirmo minha presença na reunião de amanhã às 14h.

Já preparei meu relatório de progresso com os seguintes pontos:
- Status dos projetos em andamento
- Metas alcançadas no período
- Planejamento para a próxima semana

Até amanhã!

Atenciosamente`,
  };
  
  return replies[originalEmail.subject] || `Prezado(a) ${originalEmail.from},

Obrigado pelo seu email sobre "${originalEmail.subject}".

Analisei cuidadosamente o conteúdo e gostaria de responder:

1. Agradeço as informações compartilhadas
2. Estou de acordo com os pontos apresentados
3. Fico à disposição para quaisquer esclarecimentos adicionais

Atenciosamente,
[Seu Nome]`;
};

export const Email = () => {
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(initialEmails[0]);
  const [emails, setEmails] = useState(initialEmails);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);

  const filteredEmails = emails.filter(email => email.folder === selectedFolder);

  const handleAIGenerateReply = async () => {
    if (!selectedEmail) return;
    
    setIsGeneratingReply(true);
    try {
      const aiReply = await generateAIReply(selectedEmail);
      setReplyText(aiReply);
      setIsReplying(true);
    } catch (error) {
      console.error("Error generating reply:", error);
    } finally {
      setIsGeneratingReply(false);
    }
  };

  const handleSendReply = () => {
    if (!selectedEmail || !replyText.trim()) return;

    const newEmail: EmailItem = {
      id: Date.now(),
      from: "Você",
      to: selectedEmail.from,
      subject: `Re: ${selectedEmail.subject}`,
      preview: replyText.slice(0, 50) + "...",
      date: "Agora",
      content: replyText,
      folder: "sent"
    };

    setEmails([newEmail, ...emails]);
    setIsReplying(false);
    setReplyText("");
    
    // Update folder count
    folders.find(f => f.id === "sent")!.count++;
  };

  const toggleStar = (emailId: number) => {
    setEmails(emails.map(e => 
      e.id === emailId ? { ...e, starred: !e.starred } : e
    ));
    if (selectedEmail?.id === emailId) {
      setSelectedEmail({ ...selectedEmail, starred: !selectedEmail.starred });
    }
  };

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
            <span className="text-sm font-medium text-foreground">
              {folders.find(f => f.id === selectedFolder)?.name}
            </span>
            <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
          </div>
        </div>
        <ScrollArea className="h-[calc(100%-48px)]">
          <div className="p-2">
            {filteredEmails.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhum email nesta pasta</p>
              </div>
            ) : (
              filteredEmails.map((email) => (
                <button
                  key={email.id}
                  onClick={() => {
                    setSelectedEmail(email);
                    setIsReplying(false);
                    setReplyText("");
                  }}
                  className={`w-full p-3 mb-2 rounded-lg text-left transition-all ${
                    selectedEmail?.id === email.id
                      ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 glow-cyan"
                      : "hover:bg-card/60 border border-transparent hover:border-border/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground truncate flex items-center gap-2">
                      {email.starred && (
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      )}
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
              ))
            )}
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
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-cyan-500/20"
                    onClick={() => toggleStar(selectedEmail.id)}
                  >
                    <Star className={`w-4 h-4 ${selectedEmail.starred ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                  {selectedEmail.from[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{selectedEmail.from}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedEmail.to ? `Para: ${selectedEmail.to}` : selectedEmail.date}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Content */}
            <ScrollArea className="flex-1 p-6">
              <div className="p-4 rounded-xl bg-card/40 border border-border/30">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedEmail.content}
                </p>
              </div>

              {/* Action Buttons */}
              {selectedEmail.folder === "inbox" && !isReplying && (
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="gap-2 border-cyan-500/30 hover:bg-cyan-500/20 hover:text-cyan-400"
                    onClick={() => setIsReplying(true)}
                  >
                    <Reply className="w-4 h-4" />
                    Responder
                  </Button>
                  <Button
                    className="gap-2 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400"
                    onClick={handleAIGenerateReply}
                    disabled={isGeneratingReply}
                  >
                    {isGeneratingReply ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Wand2 className="w-4 h-4" />
                    )}
                    IA Responder
                  </Button>
                </div>
              )}

              {/* Reply Box */}
              {isReplying && (
                <div className="mt-4 p-4 rounded-xl bg-card/60 border border-cyan-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Reply className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-medium text-foreground">
                        Responder para {selectedEmail.from}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => {
                        setIsReplying(false);
                        setReplyText("");
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Escreva sua resposta..."
                    className="min-h-[150px] bg-background/50 border-border/40 focus:border-cyan-400"
                  />
                  <div className="flex justify-between mt-3">
                    <Button
                      variant="outline"
                      className="gap-2 border-violet-500/30 hover:bg-violet-500/20"
                      onClick={handleAIGenerateReply}
                      disabled={isGeneratingReply}
                    >
                      {isGeneratingReply ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-violet-400" />
                      )}
                      Sugestão IA
                    </Button>
                    <Button
                      className="gap-2 bg-gradient-to-r from-cyan-500 to-violet-500"
                      onClick={handleSendReply}
                      disabled={!replyText.trim()}
                    >
                      <Send className="w-4 h-4" />
                      Enviar
                    </Button>
                  </div>
                </div>
              )}
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
