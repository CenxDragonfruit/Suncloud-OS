import { useState, useRef, useEffect } from "react";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";
import { App } from "./Desktop";
import { Button } from "./ui/button";
import { useSound } from "@/hooks/useSound";

interface WindowProps {
  id: string;
  app: App;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize?: (id: string, isMaximized: boolean) => void;
}

export const Window = ({ id, app, onClose, onMinimize, onMaximize }: WindowProps) => {
  const { playClose, playMinimize, playMaximize, playOpen } = useSound();
  const [position, setPosition] = useState({ x: 100 + Math.random() * 100, y: 50 + Math.random() * 50 });
  const [size, setSize] = useState({ width: 700, height: 550 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isClosing, setIsClosing] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    playOpen();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMaximize = () => {
    const newMaximizedState = !isMaximized;
    setIsMaximized(newMaximizedState);
    onMaximize?.(id, newMaximizedState);
    playMaximize();
  };

  const handleMinimize = () => {
    playMinimize();
    setIsMinimizing(true);
    setTimeout(() => {
      onMinimize(id);
    }, 250);
  };

  const handleClose = () => {
    playClose();
    setIsClosing(true);
    setTimeout(() => {
      onClose(id);
    }, 280);
  };

  const startResize = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: Math.max(0, e.clientX - dragOffset.x),
          y: Math.max(0, e.clientY - dragOffset.y),
        });
      }

      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;

        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;

        if (resizeDirection.includes("e")) {
          newWidth = Math.max(400, resizeStart.width + deltaX);
        }
        if (resizeDirection.includes("s")) {
          newHeight = Math.max(300, resizeStart.height + deltaY);
        }
        if (resizeDirection.includes("w")) {
          newWidth = Math.max(400, resizeStart.width - deltaX);
        }
        if (resizeDirection.includes("n")) {
          newHeight = Math.max(300, resizeStart.height - deltaY);
        }

        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, dragOffset, isResizing, resizeDirection, resizeStart]);

  const windowClasses = `
    absolute pointer-events-auto
    ${isClosing ? 'animate-window-close' : ''}
    ${isMinimizing ? 'animate-window-minimize' : ''}
    ${!isClosing && !isMinimizing ? 'animate-window-open' : ''}
  `;

  return (
    <div
      ref={windowRef}
      className={windowClasses}
      style={{
        left: isMaximized ? "0" : `${position.x}px`,
        top: isMaximized ? "0" : `${position.y}px`,
        width: isMaximized ? "100%" : `${size.width}px`,
        height: isMaximized ? "100%" : `${size.height}px`,
        maxWidth: "100vw",
        transition: isMaximized || isDragging || isResizing ? "none" : "left 0.3s ease, top 0.3s ease",
        zIndex: isMaximized ? 50 : 10,
      }}
    >
      <div 
        className={`window-chrome overflow-hidden h-full ${isMaximized ? 'rounded-none' : 'rounded-xl'}`}
        style={{
          transition: 'border-radius 0.3s ease',
        }}
      >
        {/* Window Header */}
        <div
          className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-card/95 to-card/80 border-b border-border/30 cursor-move relative overflow-hidden"
          onMouseDown={handleMouseDown}
        >
          {/* Holographic shimmer effect */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(var(--holo-cyan) / 0.1), transparent)',
                transform: 'translateX(-100%)',
                animation: 'shimmer 3s infinite',
              }}
            />
          </div>
          
          <div className="flex items-center gap-3 relative z-10">
            <div 
              className={`w-9 h-9 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-lg relative overflow-hidden`}
              style={{
                boxShadow: '0 0 15px hsl(var(--primary) / 0.3)',
              }}
            >
              <div className="relative z-10">{app.icon}</div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
            </div>
            <span className="text-sm font-medium text-foreground max-w-[200px] truncate text-glow" title={app.name}>
              {app.name}
            </span>
          </div>

          <div className="flex items-center gap-1 relative z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-secondary/80 hover:text-primary transition-all duration-200 hover:scale-110"
              onClick={handleMinimize}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-secondary/80 hover:text-primary transition-all duration-200 hover:scale-110"
              onClick={handleMaximize}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {isMaximized ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive transition-all duration-200 hover:scale-110"
              onClick={handleClose}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Window Content */}
        <div 
          className="bg-card/50 backdrop-blur-2xl overflow-hidden relative" 
          style={{ height: isMaximized ? "calc(100% - 52px)" : `${size.height - 52}px` }}
        >
          {/* Subtle neural grid overlay */}
          <div className="absolute inset-0 neural-grid opacity-30 pointer-events-none" />
          <div className="relative z-10 h-full">
            {app.content}
          </div>
        </div>

        {/* Resize Handles */}
        {!isMaximized && (
          <>
            <div
              className="absolute top-0 left-0 right-0 h-1 cursor-n-resize hover:bg-primary/30 transition-colors"
              onMouseDown={(e) => startResize(e, "n")}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize hover:bg-primary/30 transition-colors"
              onMouseDown={(e) => startResize(e, "s")}
            />
            <div
              className="absolute top-0 bottom-0 left-0 w-1 cursor-w-resize hover:bg-primary/30 transition-colors"
              onMouseDown={(e) => startResize(e, "w")}
            />
            <div
              className="absolute top-0 bottom-0 right-0 w-1 cursor-e-resize hover:bg-primary/30 transition-colors"
              onMouseDown={(e) => startResize(e, "e")}
            />
            <div
              className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize hover:bg-primary/30 transition-colors rounded-tl-lg"
              onMouseDown={(e) => startResize(e, "se")}
            />
          </>
        )}
      </div>
    </div>
  );
};
