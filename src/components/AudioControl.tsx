import { Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useAudio } from "@/contexts/AudioContext";

export const AudioControl = () => {
  const { isMuted, toggleMute, masterVolume, setMasterVolume } = useAudio();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl hover:bg-secondary"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Volume2 className="h-4 w-4 text-foreground" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-64 glass-panel">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Volume do Sistema</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-8 w-8"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="space-y-2">
            <Slider
              value={[masterVolume * 100]}
              onValueChange={(value) => setMasterVolume(value[0] / 100)}
              max={100}
              step={1}
              disabled={isMuted}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span className="font-mono">{Math.round(masterVolume * 100)}%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            Sons futuristas do Suncloud OS
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
