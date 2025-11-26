import { createContext, useContext, useState, useCallback, ReactNode, useRef } from "react";

type SoundType = 'hover' | 'click' | 'open' | 'close' | 'error' | 'success' | 'minimize' | 'maximize';

interface AudioContextType {
  playSound: (type: SoundType, volume?: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
  setMasterVolume: (volume: number) => void;
  masterVolume: number;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Biblioteca de sons futuristas
const soundLibrary: Record<SoundType, string> = {
  // Sons etéreos e vítreos
  hover: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=', // placeholder
  click: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
  open: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
  close: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
  error: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
  success: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
  minimize: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
  maximize: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.3);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioCache = useRef<Map<SoundType, AudioBuffer>>(new Map());

  // Inicializa o Web Audio API context
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Gera sons proceduralmente usando Web Audio API
  const generateSound = useCallback((type: SoundType): AudioBuffer => {
    const ctx = getAudioContext();
    const sampleRate = ctx.sampleRate;
    
    let duration: number;
    let frequencies: number[];
    let envelope: { attack: number; decay: number; sustain: number; release: number };
    
    switch(type) {
      case 'hover':
        // Som sutil e etéreo
        duration = 0.1;
        frequencies = [800, 1200];
        envelope = { attack: 0.02, decay: 0.03, sustain: 0.7, release: 0.05 };
        break;
      case 'click':
        // Glass tap - ressonante e curto
        duration = 0.15;
        frequencies = [1200, 2400, 3600];
        envelope = { attack: 0.001, decay: 0.05, sustain: 0.3, release: 0.099 };
        break;
      case 'open':
        // Materialização crescente
        duration = 0.4;
        frequencies = [400, 800, 1200, 1600];
        envelope = { attack: 0.1, decay: 0.1, sustain: 0.8, release: 0.2 };
        break;
      case 'close':
        // Desmaterialização descendente
        duration = 0.3;
        frequencies = [1600, 1200, 800, 400];
        envelope = { attack: 0.05, decay: 0.1, sustain: 0.6, release: 0.15 };
        break;
      case 'minimize':
        // Som descendente suave
        duration = 0.25;
        frequencies = [1000, 600, 400];
        envelope = { attack: 0.03, decay: 0.07, sustain: 0.5, release: 0.15 };
        break;
      case 'maximize':
        // Som ascendente energético
        duration = 0.25;
        frequencies = [400, 800, 1200];
        envelope = { attack: 0.03, decay: 0.07, sustain: 0.6, release: 0.15 };
        break;
      case 'error':
        // Queda de energia - grave e abafado
        duration = 0.5;
        frequencies = [200, 150, 100];
        envelope = { attack: 0.05, decay: 0.2, sustain: 0.4, release: 0.25 };
        break;
      case 'success':
        // Acorde cristalino ascendente
        duration = 0.6;
        frequencies = [523.25, 659.25, 783.99, 1046.50]; // Dó, Mi, Sol, Dó (acorde maior)
        envelope = { attack: 0.05, decay: 0.15, sustain: 0.7, release: 0.25 };
        break;
      default:
        duration = 0.1;
        frequencies = [440];
        envelope = { attack: 0.05, decay: 0.1, sustain: 0.5, release: 0.1 };
    }

    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const channelData = buffer.getChannelData(0);

    // Gera forma de onda com múltiplas frequências
    for (let i = 0; i < bufferSize; i++) {
      const t = i / sampleRate;
      let sample = 0;

      // Múltiplas frequências para textura rica
      frequencies.forEach((freq, index) => {
        const freqModulation = type === 'open' ? freq * (1 + t * 0.5) : 
                              type === 'close' ? freq * (1 - t * 0.5) :
                              type === 'minimize' ? freq * (1 - t * 0.3) :
                              type === 'maximize' ? freq * (1 + t * 0.3) :
                              freq;
        
        // Onda senoidal com leve ruído para textura orgânica
        sample += Math.sin(2 * Math.PI * freqModulation * t) / frequencies.length;
        
        // Adiciona harmônicos sutis
        if (type === 'click' || type === 'success') {
          sample += Math.sin(4 * Math.PI * freqModulation * t) * 0.1 / frequencies.length;
        }
      });

      // Envelope ADSR
      let envValue = 1;
      const { attack, decay, sustain, release } = envelope;
      const attackTime = duration * attack;
      const decayTime = duration * decay;
      const sustainTime = duration * sustain;
      const releaseTime = duration * release;

      if (t < attackTime) {
        envValue = t / attackTime;
      } else if (t < attackTime + decayTime) {
        envValue = 1 - ((t - attackTime) / decayTime) * 0.3;
      } else if (t < attackTime + decayTime + sustainTime) {
        envValue = 0.7;
      } else {
        envValue = 0.7 * (1 - (t - attackTime - decayTime - sustainTime) / releaseTime);
      }

      // Aplica reverb simulado com delay
      const reverbDelay = Math.floor(sampleRate * 0.03);
      if (i > reverbDelay) {
        sample += channelData[i - reverbDelay] * 0.15;
      }

      channelData[i] = sample * envValue;
    }

    return buffer;
  }, [getAudioContext]);

  const playSound = useCallback((type: SoundType, volume: number = 1) => {
    if (isMuted) return;

    try {
      const ctx = getAudioContext();
      
      // Resume context se necessário (required for some browsers)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Usa cache ou gera novo som
      let buffer = audioCache.current.get(type);
      if (!buffer) {
        buffer = generateSound(type);
        audioCache.current.set(type, buffer);
      }

      // Cria source e conecta
      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Cria gain node para controle de volume
      const gainNode = ctx.createGain();
      gainNode.gain.value = masterVolume * volume;

      // Adiciona filtro para sons mais suaves
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = type === 'error' ? 800 : 5000;
      filter.Q.value = 1;

      // Conecta tudo
      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Toca o som
      source.start(0);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }, [isMuted, masterVolume, getAudioContext, generateSound]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

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
