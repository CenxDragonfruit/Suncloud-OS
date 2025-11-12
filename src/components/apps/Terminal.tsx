import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TerminalLine {
  id: string;
  text: string;
  type: "input" | "output";
}

const commands: { [key: string]: string } = {
  help: "Comandos disponíveis:\n  help - Mostra esta ajuda\n  ls - Lista arquivos\n  date - Mostra data e hora\n  clear - Limpa a tela\n  echo - Repete o texto digitado\n  whoami - Mostra o usuário atual",
  ls: "Documentos/  Imagens/  Downloads/  Relatorio_Final.pdf  Notas.txt",
  date: new Date().toLocaleString("pt-BR"),
  whoami: "user@cloudos",
  clear: "__CLEAR__",
};

export const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "1",
      text: "CloudOS Terminal v1.0 - Digite 'help' para ver os comandos disponíveis",
      type: "output",
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = cmd.trim().split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    if (command === "echo") {
      return args || "";
    }

    if (command === "clear") {
      return commands.clear;
    }

    return commands[command] || `Comando não encontrado: ${command}\nDigite 'help' para ver os comandos disponíveis.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const inputLine: TerminalLine = {
      id: Date.now().toString(),
      text: `$ ${input}`,
      type: "input",
    };

    const output = executeCommand(input);

    if (output === "__CLEAR__") {
      setLines([]);
    } else {
      const outputLine: TerminalLine = {
        id: (Date.now() + 1).toString(),
        text: output,
        type: "output",
      };
      setLines((prev) => [...prev, inputLine, outputLine]);
    }

    setInput("");
  };

  return (
    <div className="h-full bg-[#0a0a0a] text-[#00ff00] font-mono flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-1">
          {lines.map((line) => (
            <div
              key={line.id}
              className={line.type === "input" ? "text-[#00ff00]" : "text-[#00cc00]"}
            >
              <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                {line.text}
              </pre>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="border-t border-[#00ff00]/20 p-4">
        <div className="flex items-center gap-2">
          <span className="text-[#00ff00]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[#00ff00] font-mono"
            autoFocus
            spellCheck={false}
          />
        </div>
      </form>
    </div>
  );
};
