import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useProceduralAudio, SoundType } from "@/hooks/useProceduralAudio";

interface AudioContextType {
  playSound: (type: SoundType, volume?: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
  setMasterVolume: (volume: number) => void;
  masterVolume: number;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [masterVolume, setMasterVolumeState] = useState(0.5);
  const { playSound: proceduralPlaySound, setVolume, setMuted } = useProceduralAudio();

  const playSound = useCallback((type: SoundType) => {
    if (!isMuted) {
      proceduralPlaySound(type);
    }
  }, [isMuted, proceduralPlaySound]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      setMuted(newMuted);
      return newMuted;
    });
  }, [setMuted]);

  const setMasterVolume = useCallback((volume: number) => {
    setMasterVolumeState(volume);
    setVolume(volume);
  }, [setVolume]);

  return (
    <AudioContext.Provider value={{ 
      playSound, 
      isMuted, 
      toggleMute, 
      setMasterVolume,
      masterVolume 
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
};
