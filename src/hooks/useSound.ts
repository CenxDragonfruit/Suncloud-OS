import { useCallback } from 'react';
import { useAudio } from '@/contexts/AudioContext';

type SoundType = 'hover' | 'click' | 'open' | 'close' | 'error' | 'success' | 'minimize' | 'maximize';

export const useSound = () => {
  const { playSound } = useAudio();

  const play = useCallback((type: SoundType, volume?: number) => {
    playSound(type, volume);
  }, [playSound]);

  return {
    playHover: () => play('hover', 0.3),
    playClick: () => play('click', 0.5),
    playOpen: () => play('open', 0.6),
    playClose: () => play('close', 0.5),
    playError: () => play('error', 0.7),
    playSuccess: () => play('success', 0.6),
    playMinimize: () => play('minimize', 0.5),
    playMaximize: () => play('maximize', 0.5),
  };
};
