import { useCallback } from 'react';
import { useAudio } from '@/contexts/AudioContext';

export type SoundType = 'hover' | 'click' | 'open' | 'close' | 'error' | 'success' | 'minimize' | 'maximize' | 'login' | 'notification';

export const useSound = () => {
  const { playSound } = useAudio();

  const play = useCallback((type: SoundType) => {
    playSound(type);
  }, [playSound]);

  return {
    playHover: () => play('hover'),
    playClick: () => play('click'),
    playOpen: () => play('open'),
    playClose: () => play('close'),
    playError: () => play('error'),
    playSuccess: () => play('success'),
    playMinimize: () => play('minimize'),
    playMaximize: () => play('maximize'),
    playLogin: () => play('login'),
    playNotification: () => play('notification'),
  };
};
