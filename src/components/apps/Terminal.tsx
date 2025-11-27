import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal as TerminalIcon, Cpu, Zap } from "lucide-react";

interface TerminalLine {
  id: string;
  text: string;
  type: "input" | "output" | "system" | "error";
}

const commands: { [key: string]: string | (() => string) } = {
  help: `╔══════════════════════════════════════════════════════════╗
║  NEURAL COMMAND INTERFACE - SUNCLOUD OS v2.0              ║
╠══════════════════════════════════════════════════════════╣
║  help      - Exibir esta interface de ajuda               ║
║  ls        - Listar arquivos do sistema                   ║
║  date      - Exibir data/hora do sistema                  ║
║  clear     - Limpar buffer de terminal                    ║
║  echo      - Transmitir mensagem neural                   ║
║  whoami    - Identificar usuário conectado                ║
║  status    - Status do sistema neural                     ║
║  matrix    - Ativar modo Matrix                           ║
║  scan      - Escanear rede neural                         ║
╚══════════════════════════════════════════════════════════╝`,
  ls: `drwxr-xr-x  Documentos/     [NEURAL-SYNC]
drwxr-xr-x  Imagens/        [NEURAL-SYNC]
drwxr-xr-x  Downloads/      [LOCAL]
-rw-r--r--  Relatorio_Final.pdf    156KB
-rw-r--r--  Notas.txt              2.4KB`,
  date: () => `[TIMESTAMP] ${new Date().toLocaleString("pt-BR")}
[EPOCH] ${Date.now()}
[SYNC] Neural Cloud Synchronized`,
  whoami: `╔═══════════════════════════════════════╗
║  USER: user@suncloud.neural           ║
║  LEVEL: Administrator                 ║
║  SESSION: Active                      ║
║  NEURAL-ID: 0x7F3A2B1C               ║
╚═══════════════════════════════════════╝`,
  clear: "__CLEAR__",
  status: `╔═══════════════════════════════════════════════════════════╗
║            SUNCLOUD NEURAL SYSTEM STATUS                   ║
╠═══════════════════════════════════════════════════════════╣
║  CPU Core    ████████████████░░░░  78%  [OPTIMAL]         ║
║  RAM Usage   ██████████░░░░░░░░░░  52%  [NOMINAL]         ║
║  Neural Net  ████████████████████  100% [CONNECTED]       ║
║  Storage     ████████░░░░░░░░░░░░  42%  [HEALTHY]         ║
╠═══════════════════════════════════════════════════════════╣
║  UPTIME: 14h 32m 18s                                      ║
║  PROCESSES: 127 active neural threads                     ║
║  TEMP: 42°C [WITHIN PARAMETERS]                           ║
╚═══════════════════════════════════════════════════════════╝`,
  matrix: `[MATRIX MODE ACTIVATED]
╔══════════════════════════════════════════════════════════╗
║  01001110 01000101 01010101 01010010 01000001 01001100   ║
║  ░▒▓█ NEURAL MATRIX INTERFACE ONLINE █▓▒░                ║
║  01001111 01010011 00100000 01000001 01000011 01010100   ║
╚══════════════════════════════════════════════════════════╝
Wake up, user... The Suncloud has you...`,
  scan: `[NEURAL SCAN INITIATED]
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%

SCAN RESULTS:
├── Neural Node Alpha    [ACTIVE]   192.168.1.1
├── Neural Node Beta     [ACTIVE]   192.168.1.2
├── Neural Node Gamma    [STANDBY]  192.168.1.3
└── Neural Core          [ACTIVE]   10.0.0.1

Total: 4 nodes detected | 3 active | 1 standby
[SCAN COMPLETE]`,
};

export const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "0",
      text: "╔══════════════════════════════════════════════════════════════════╗",
      type: "system",
    },
    {
      id: "1",
      text: "║     SUNCLOUD OS - NEURAL COMMAND INTERFACE v2.0                  ║",
      type: "system",
    },
    {
      id: "2",
      text: "║     Type 'help' for available commands                           ║",
      type: "system",
    },
    {
      id: "3",
      text: "╚══════════════════════════════════════════════════════════════════╝",
      type: "system",
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

    const result = commands[command];
    if (typeof result === "function") {
      return result();
    }
    if (typeof result === "string") {
      return result;
    }
    
    return `[ERROR] Comando não reconhecido: ${command}\n[INFO] Digite 'help' para ver comandos disponíveis.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const inputLine: TerminalLine = {
      id: Date.now().toString(),
      text: `user@suncloud:~$ ${input}`,
      type: "input",
    };

    const output = executeCommand(input);

    if (output === "__CLEAR__") {
      setLines([]);
    } else {
      const outputText = typeof output === 'function' ? output() : output;
      const outputLine: TerminalLine = {
        id: (Date.now() + 1).toString(),
        text: outputText,
        type: outputText.startsWith("[ERROR]") ? "error" : "output",
      };
      setLines((prev) => [...prev, inputLine, outputLine]);
    }

    setInput("");
  };

  const getLineColor = (type: string) => {
    switch (type) {
      case "input": return "text-cyan-400";
      case "output": return "text-green-400";
      case "system": return "text-violet-400";
      case "error": return "text-red-400";
      default: return "text-green-400";
    }
  };

  return (
    <div className="h-full bg-[#0a0a12] text-green-400 font-mono flex flex-col relative overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute inset-0 scanline" />
      </div>
      
      {/* CRT glow effect */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: 'inset 0 0 100px rgba(0, 255, 200, 0.05), inset 0 0 50px rgba(128, 0, 255, 0.03)'
      }} />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 p-3 border-b border-cyan-500/20 bg-black/50">
        <TerminalIcon className="w-5 h-5 text-cyan-400" />
        <span className="text-cyan-400 text-sm">NEURAL-TERMINAL</span>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-xs">
          <Cpu className="w-3 h-3 text-violet-400 animate-pulse" />
          <span className="text-violet-400">CONNECTED</span>
          <Zap className="w-3 h-3 text-green-400" />
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 relative z-10" ref={scrollRef}>
        <div className="space-y-1">
          {lines.map((line) => (
            <div key={line.id} className={getLineColor(line.type)}>
              <pre className="whitespace-pre-wrap break-words font-mono text-sm" style={{
                textShadow: line.type === "system" 
                  ? '0 0 10px rgba(139, 92, 246, 0.5)' 
                  : line.type === "input"
                  ? '0 0 10px rgba(0, 255, 255, 0.3)'
                  : '0 0 10px rgba(0, 255, 100, 0.3)'
              }}>
                {line.text}
              </pre>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="relative z-10 border-t border-cyan-500/20 p-4 bg-black/50">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>
            user@suncloud:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-cyan-400 font-mono caret-cyan-400"
            style={{ textShadow: '0 0 5px rgba(0, 255, 255, 0.3)' }}
            autoFocus
            spellCheck={false}
          />
          <div className="w-2 h-5 bg-cyan-400 animate-pulse" />
        </div>
      </form>
    </div>
  );
};
