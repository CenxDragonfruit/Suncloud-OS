import { useState, useRef, useEffect } from "react";
import { Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ConversationNode {
  id: string;
  text: string;
  suggestions?: { text: string; nextId: string }[];
}

const conversationTree: { [key: string]: ConversationNode } = {
  start: {
    id: "start",
    text: "Olá! Sou a IA integrada do Suncloud OS. Como posso ajudar você hoje?",
    suggestions: [
      { text: "Me fale sobre o Suncloud OS", nextId: "about_system" },
      { text: "Quais aplicativos estão disponíveis?", nextId: "apps" },
      { text: "Me conte uma piada", nextId: "joke" },
      { text: "Como você está?", nextId: "how_are_you" },
    ],
  },
  about_system: {
    id: "about_system",
    text: "O Suncloud OS é um sistema operacional focado em nuvem e produtividade. É moderno, rápido e funciona 100% no navegador! Você gostaria de saber mais sobre os Aplicativos (A) ou sobre a Segurança (B)?",
    suggestions: [
      { text: "Me fale sobre os Aplicativos (A)", nextId: "apps" },
      { text: "Me fale sobre a Segurança (B)", nextId: "security" },
      { text: "Voltar ao início", nextId: "start" },
    ],
  },
  apps: {
    id: "apps",
    text: "Temos vários aplicativos incríveis: Navegador Web, Email, Galeria de Fotos, Editor de Documentos, Player de Música e Vídeo, Terminal e muito mais! Quer detalhes sobre algum deles?",
    suggestions: [
      { text: "Me fale sobre o Navegador", nextId: "browser" },
      { text: "Me fale sobre Email", nextId: "email" },
      { text: "Quais recursos de mídia?", nextId: "media" },
      { text: "Voltar ao início", nextId: "start" },
    ],
  },
  browser: {
    id: "browser",
    text: "O Navegador Web do Suncloud OS é totalmente integrado ao sistema. Você pode navegar por páginas simuladas, usar o SunSearch e acessar conteúdo interno como notícias e sobre o sistema!",
    suggestions: [
      { text: "E quanto ao Email?", nextId: "email" },
      { text: "Voltar aos aplicativos", nextId: "apps" },
      { text: "Voltar ao início", nextId: "start" },
    ],
  },
  email: {
    id: "email",
    text: "O cliente de Email oferece uma interface de 3 painéis clássica: pastas, lista de emails e painel de leitura. Totalmente integrado com o calendário!",
    suggestions: [
      { text: "Me fale sobre o Calendário", nextId: "calendar" },
      { text: "Voltar aos aplicativos", nextId: "apps" },
      { text: "Voltar ao início", nextId: "start" },
    ],
  },
  calendar: {
    id: "calendar",
    text: "O Calendário permite visualizar seus compromissos em modo Mês, Semana ou Dia. Você pode ver todos os seus eventos de forma organizada!",
    suggestions: [
      { text: "Quais recursos de mídia?", nextId: "media" },
      { text: "Voltar aos aplicativos", nextId: "apps" },
      { text: "Voltar ao início", nextId: "start" },
    ],
  },
  media: {
    id: "media",
    text: "Temos uma Galeria de Fotos com visualizador em tela cheia, Player de Música com biblioteca completa e Player de Vídeo com controles avançados!",
    suggestions: [
      { text: "Voltar aos aplicativos", nextId: "apps" },
      { text: "Me fale sobre Segurança", nextId: "security" },
      { text: "Voltar ao início", nextId: "start" },
    ],
  },
  security: {
    id: "security",
    text: "O Suncloud OS possui autenticação segura, gerenciamento de sessão e todas as operações são criptografadas. Seus dados estão seguros na nuvem!",
    suggestions: [
      { text: "Como funciona o login?", nextId: "login" },
      { text: "Voltar ao início", nextId: "start" },
    ],
  },
  login: {
    id: "login",
    text: "O sistema possui uma tela de login completa. Para esta demonstração, use 'user' e senha '1234'. Há também opções de bloquear e fazer logoff!",
    suggestions: [
      { text: "Voltar à Segurança", nextId: "security" },
      { text: "Voltar ao início", nextId: "start" },
    ],
  },
  joke: {
    id: "joke",
    text: "Por que o computador foi ao médico? Porque estava com um vírus! 😄 Quer ouvir outra?",
    suggestions: [
      { text: "Sim, conte outra!", nextId: "joke2" },
      { text: "Voltar ao início", nextId: "start" },
    ],
  },
  joke2: {
    id: "joke2",
    text: "Por que o sistema operacional foi à terapia? Porque tinha muitos processos em segundo plano! 😂",
    suggestions: [
      { text: "Me fale sobre o sistema", nextId: "about_system" },
      { text: "Voltar ao início", nextId: "start" },
    ],
  },
  how_are_you: {
    id: "how_are_you",
    text: "Estou funcionando perfeitamente! Processando na nuvem a 100% de eficiência. Como posso ajudar você?",
    suggestions: [
      { text: "Me fale sobre o sistema", nextId: "about_system" },
      { text: "Quais aplicativos?", nextId: "apps" },
      { text: "Voltar ao início", nextId: "start" },
    ],
  },
};

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: conversationTree.start.text,
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentNode, setCurrentNode] = useState<ConversationNode>(conversationTree.start);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSuggestionClick = async (nextId: string, suggestionText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestionText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const nextNode = conversationTree[nextId] || conversationTree.start;
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: nextNode.text,
      sender: "ai",
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiResponse]);
    setCurrentNode(nextNode);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: "Desculpe, não entendi. Tente usar as sugestões de perguntas para uma melhor experiência!",
      sender: "ai",
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiResponse]);
  };

  return (
    <div className="flex flex-col h-full bg-card/40">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/60 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">IA Suncloud</h3>
            <p className="text-xs text-muted-foreground">Assistente Inteligente</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-card/60 text-foreground border border-border/40"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card/60 border border-border/40 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Dynamic Suggestions */}
      {currentNode.suggestions && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Perguntas sugeridas:</p>
          <div className="flex flex-wrap gap-2">
            {currentNode.suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.nextId, suggestion.text)}
                className="text-xs px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              >
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-border/40 bg-card/60 p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Digite sua mensagem..."
            className="bg-input/50 border-border/50 text-foreground"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
