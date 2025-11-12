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

const qaDatabase: { [key: string]: string } = {
  "sistema": "O CloudOS é um sistema operacional futurista que funciona 100% na nuvem, permitindo acesso de qualquer dispositivo!",
  "tempo": "Desculpe, não tenho acesso a informações meteorológicas em tempo real. Mas posso dizer que o futuro é sempre ensolarado no CloudOS! ☀️",
  "piada": "Por que o computador foi ao médico? Porque estava com um vírus! 😄",
  "ajuda": "Posso responder perguntas sobre o CloudOS, contar piadas, ou apenas conversar! Pergunte-me algo!",
  "quem": "Sou a IA integrada do CloudOS, aqui para ajudar você a navegar pelo sistema operacional do futuro!",
  "como": "Estou funcionando perfeitamente! Processando na nuvem a 100% de eficiência. Como posso ajudar você?",
};

const suggestedQuestions = [
  "O que é este sistema?",
  "Como você está?",
  "Me conte uma piada",
  "Quem é você?",
];

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Sou a IA integrada do CloudOS. Como posso ajudar você hoje?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    for (const [key, response] of Object.entries(qaDatabase)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }
    
    return "Essa é uma pergunta interessante! Ainda estou aprendendo sobre esse assunto. Tente perguntar sobre o sistema, pedir uma piada, ou solicitar ajuda!";
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

    // Simulate AI typing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getAIResponse(input),
      sender: "ai",
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiResponse]);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
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
            <h3 className="font-semibold text-foreground">IA CloudOS</h3>
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

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Perguntas sugeridas:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="text-xs px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              >
                {question}
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
