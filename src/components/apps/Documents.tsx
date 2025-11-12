import { useState } from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Documents = () => {
  const [text, setText] = useState("Digite seu texto aqui...");

  return (
    <div className="h-full flex flex-col bg-card/40">
      <div className="flex items-center gap-1 p-2 border-b border-border/40 bg-card/60">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Underline className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-border/40 mx-2" />
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 resize-none border-0 bg-transparent text-foreground p-6 focus-visible:ring-0"
      />
    </div>
  );
};
