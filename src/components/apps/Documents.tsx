import { useState } from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Sparkles, Wand2, FileText, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const aiTemplates = [
  { id: "email", label: "Email Profissional", prompt: "Escreva um email profissional sobre" },
  { id: "article", label: "Artigo", prompt: "Escreva um artigo sobre" },
  { id: "summary", label: "Resumo", prompt: "Faça um resumo sobre" },
  { id: "creative", label: "Texto Criativo", prompt: "Escreva um texto criativo sobre" },
  { id: "code", label: "Documentação", prompt: "Escreva uma documentação técnica sobre" },
];

const generateAIText = async (type: string, topic: string): Promise<string> => {
  // Simulated AI responses
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const responses: { [key: string]: string } = {
    email: `Prezado(a),

Espero que esta mensagem o(a) encontre bem. Venho por meio desta tratar sobre ${topic}.

Gostaria de destacar os seguintes pontos importantes:

1. Contexto e relevância do assunto
2. Principais considerações a serem feitas
3. Próximos passos recomendados

Agradeço antecipadamente pela atenção e fico à disposição para quaisquer esclarecimentos adicionais.

Atenciosamente,
[Seu Nome]`,
    article: `# ${topic}

## Introdução

O tema "${topic}" tem ganhado cada vez mais relevância nos últimos anos. Neste artigo, exploraremos os principais aspectos e implicações deste assunto.

## Desenvolvimento

### Contexto Histórico
A evolução de ${topic} pode ser traçada através de diversos marcos importantes que moldaram seu desenvolvimento ao longo do tempo.

### Estado Atual
Atualmente, ${topic} representa um campo dinâmico com múltiplas aplicações e perspectivas de crescimento.

### Perspectivas Futuras
Os especialistas apontam que ${topic} continuará evoluindo, com tendências promissoras para os próximos anos.

## Conclusão

Em síntese, ${topic} demonstra ser um tema de grande importância que merece atenção contínua e estudo aprofundado.`,
    summary: `## Resumo: ${topic}

**Pontos Principais:**

• Definição e conceitos fundamentais relacionados a ${topic}
• Principais características e elementos distintivos
• Aplicações práticas e casos de uso relevantes
• Desafios e oportunidades identificadas
• Conclusões e recomendações finais

**Síntese:**
${topic} representa um tema multifacetado que engloba diversos aspectos importantes. A compreensão adequada deste assunto requer análise cuidadosa de seus componentes e implicações.`,
    creative: `Era uma vez, em um mundo onde ${topic} existia de forma extraordinária...

As cores do amanhecer pintavam o horizonte enquanto a história de ${topic} começava a se desenrolar. Ninguém poderia imaginar o que estava por vir.

Os personagens principais entraram em cena, cada um carregando seus próprios sonhos e esperanças relacionados a ${topic}. O destino os reuniu de maneira inesperada.

E assim, entre risos e lágrimas, a jornada de ${topic} continuou, deixando marcas indeléveis em todos que cruzaram seu caminho.

*Continua...*`,
    code: `# Documentação Técnica: ${topic}

## Visão Geral
Este documento descreve a implementação e uso de ${topic}.

## Requisitos
- Ambiente de desenvolvimento configurado
- Conhecimentos prévios necessários
- Dependências do sistema

## Instalação
\`\`\`bash
# Comandos de instalação
npm install ${topic.toLowerCase().replace(/\s+/g, '-')}
\`\`\`

## Uso Básico
\`\`\`javascript
import { ${topic.replace(/\s+/g, '')} } from 'module';

// Exemplo de implementação
const instance = new ${topic.replace(/\s+/g, '')}();
instance.initialize();
\`\`\`

## API Reference
| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| init() | Inicializa o módulo | config: Object |
| start() | Inicia a execução | options: Object |

## Suporte
Para dúvidas ou problemas, consulte a documentação oficial.`,
  };
  
  return responses[type] || `Texto gerado sobre: ${topic}`;
};

export const Documents = () => {
  const [text, setText] = useState("");
  const [documentName, setDocumentName] = useState("Novo Documento");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [showAiInput, setShowAiInput] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleAIGenerate = async (templateId: string) => {
    if (!aiTopic.trim()) return;
    
    setIsGenerating(true);
    try {
      const generatedText = await generateAIText(templateId, aiTopic);
      setText(prev => prev + (prev ? "\n\n" : "") + generatedText);
      setShowAiInput(false);
      setAiTopic("");
      setSelectedTemplate(null);
    } catch (error) {
      console.error("Error generating text:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setShowAiInput(true);
  };

  return (
    <div className="h-full flex flex-col bg-background/40 relative overflow-hidden">
      {/* Neural grid background */}
      <div className="absolute inset-0 neural-grid opacity-20" />

      {/* Toolbar */}
      <div className="relative z-10 flex items-center gap-1 p-2 border-b border-border/40 bg-card/60 backdrop-blur-xl">
        {/* Document name */}
        <div className="flex items-center gap-2 mr-4 px-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <Input
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="h-7 w-40 text-sm bg-transparent border-none focus-visible:ring-0 px-1"
          />
        </div>

        <div className="w-px h-6 bg-border/40" />

        {/* Formatting buttons */}
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400">
          <Underline className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-border/40 mx-1" />
        
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400">
          <AlignRight className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border/40 mx-1" />

        {/* AI Generation Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-2 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 hover:from-cyan-500/30 hover:to-violet-500/30 border border-cyan-500/30"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4 text-cyan-400" />
              )}
              <span className="text-cyan-400">IA Gerar</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-card/95 backdrop-blur-xl border-cyan-500/30">
            {aiTemplates.map((template) => (
              <DropdownMenuItem
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className="gap-2 hover:bg-cyan-500/20 cursor-pointer"
              >
                <Wand2 className="h-4 w-4 text-violet-400" />
                {template.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex-1" />

        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-cyan-500/20 hover:text-cyan-400">
          <Save className="h-4 w-4" />
        </Button>
      </div>

      {/* AI Topic Input */}
      {showAiInput && (
        <div className="relative z-10 flex items-center gap-2 p-3 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 backdrop-blur-xl">
          <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
          <span className="text-sm text-foreground">
            {aiTemplates.find(t => t.id === selectedTemplate)?.prompt}:
          </span>
          <Input
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
            placeholder="Digite o tema..."
            className="flex-1 h-8 bg-background/50 border-cyan-500/30 focus:border-cyan-400"
            onKeyPress={(e) => {
              if (e.key === "Enter" && selectedTemplate) {
                handleAIGenerate(selectedTemplate);
              }
            }}
          />
          <Button
            size="sm"
            onClick={() => selectedTemplate && handleAIGenerate(selectedTemplate)}
            disabled={!aiTopic.trim() || isGenerating}
            className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Gerar"
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setShowAiInput(false);
              setAiTopic("");
              setSelectedTemplate(null);
            }}
          >
            Cancelar
          </Button>
        </div>
      )}

      {/* Document Editor */}
      <div className="relative z-10 flex-1 p-4">
        <div className="h-full rounded-xl bg-card/40 border border-border/30 backdrop-blur-xl overflow-hidden">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comece a digitar ou use a IA para gerar conteúdo..."
            className="h-full w-full resize-none border-0 bg-transparent text-foreground p-6 focus-visible:ring-0 font-mono text-sm leading-relaxed"
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2 border-t border-border/40 bg-card/60 backdrop-blur-xl text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>{text.length} caracteres</span>
          <span>{text.split(/\s+/).filter(Boolean).length} palavras</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Neural Sync</span>
        </div>
      </div>
    </div>
  );
};
