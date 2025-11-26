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
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 500 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Play open sound when window mounts
  useEffect(() => {
    playOpen();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
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
    onMinimize(id);
  };

  const handleClose = () => {
    playClose();
    onClose(id);
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
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
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
  }, [
    isDragging,
    dragOffset,
    isResizing,
    resizeDirection,
    resizeStart
  ]);

  return (
    <div
      ref={windowRef}
      className="absolute pointer-events-auto"
      style={{
        left: isMaximized ? "0" : `${position.x}px`,
        top: isMaximized ? "0" : `${position.y}px`,
        width: isMaximized ? "100%" : `${size.width}px`,
        height: isMaximized ? "100%" : `${size.height}px`,
        maxWidth: "100vw",
        transition: isMaximized ? "all 0.2s ease" : "none",
      }}
    >
      {/* 👇 AQUI ESTÁ A CORREÇÃO: foi adicionado h-full */}
      <div className="window-chrome rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 h-full">
        {/* Window Header */}
        <div
          className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-card to-card/90 border-b border-border/40 cursor-move"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-lg`}>
              {app.icon}
            </div>
            <span className="text-sm font-medium text-foreground max-w-[200px] truncate" title={app.name}>{app.name}</span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-secondary"
              onClick={handleMinimize}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-secondary"
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
              className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
              onClick={handleClose}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Window Content */}
        <div className="bg-card/40 backdrop-blur-xl overflow-hidden" style={{ height: isMaximized ? "calc(100% - 56px)" : `${size.height - 56}px` }}>
          {app.content}
        </div>

        {/* Resize Handles */}
        {!isMaximized && (
          <>
            <div
              className="absolute top-0 left-0 right-0 h-1 cursor-n-resize hover:bg-primary/50"
              onMouseDown={(e) => startResize(e, "n")}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize hover:bg-primary/50"
              onMouseDown={(e) => startResize(e, "s")}
            />
            <div
              className="absolute top-0 bottom-0 left-0 w-1 cursor-w-resize hover:bg-primary/50"
              onMouseDown={(e) => startResize(e, "w")}
            />
            <div
              className="absolute top-0 bottom-0 right-0 w-1 cursor-e-resize hover:bg-primary/50"
              onMouseDown={(e) => startResize(e, "e")}
            />
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize hover:bg-primary/50"
              onMouseDown={(e) => startResize(e, "se")}
            />
          </>
        )}
      </div>
    </div>
  );
};