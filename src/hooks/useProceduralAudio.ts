import { useRef, useCallback } from 'react';

export type SoundType = 'hover' | 'click' | 'open' | 'close' | 'login' | 'success' | 'error' | 'minimize' | 'maximize' | 'notification';

export const useProceduralAudio = () => {
  const audioCtx = useRef<AudioContext | null>(null);
  const masterGain = useRef<GainNode | null>(null);
  const isMuted = useRef(false);
  const volume = useRef(0.5);

  const initAudio = useCallback(() => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      masterGain.current = audioCtx.current.createGain();
      masterGain.current.connect(audioCtx.current.destination);
      masterGain.current.gain.value = volume.current;
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    volume.current = Math.max(0, Math.min(1, newVolume));
    if (masterGain.current) {
      masterGain.current.gain.value = volume.current;
    }
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    isMuted.current = muted;
    if (masterGain.current) {
      masterGain.current.gain.value = muted ? 0 : volume.current;
    }
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (isMuted.current) return;

    if (!audioCtx.current) initAudio();
    const ctx = audioCtx.current!;
    if (ctx.state === 'suspended') ctx.resume();

    const gainNode = ctx.createGain();
    gainNode.connect(masterGain.current || ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case 'hover': {
        // Ethereal whoosh - glass resonance
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        
        osc.type = 'sine';
        filter.type = 'bandpass';
        filter.frequency.value = 2000;
        filter.Q.value = 10;
        
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.06);
        
        gainNode.gain.setValueAtTime(0.015, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        
        osc.connect(filter);
        filter.connect(gainNode);
        
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }

      case 'click': {
        // Glass tap with resonant ping
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        
        osc.type = 'triangle';
        osc2.type = 'sine';
        filter.type = 'highpass';
        filter.frequency.value = 800;
        
        osc.frequency.setValueAtTime(2400, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
        
        osc2.frequency.setValueAtTime(3600, now);
        osc2.frequency.exponentialRampToValueAtTime(1800, now + 0.06);
        
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        
        osc.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        
        osc.start(now);
        osc2.start(now);
        osc.stop(now + 0.15);
        osc2.stop(now + 0.15);
        break;
      }

      case 'open': {
        // Materialization - energy unfold, uplifting chime
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const osc3 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const reverb = ctx.createConvolver();
        
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc3.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.value = 3000;
        filter.Q.value = 2;
        
        // Ascending chord: C, E, G (major chord)
        osc1.frequency.setValueAtTime(261.63, now);
        osc1.frequency.exponentialRampToValueAtTime(523.25, now + 0.35);
        
        osc2.frequency.setValueAtTime(329.63, now);
        osc2.frequency.exponentialRampToValueAtTime(659.25, now + 0.35);
        
        osc3.frequency.setValueAtTime(392, now);
        osc3.frequency.exponentialRampToValueAtTime(783.99, now + 0.35);
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.06, now + 0.1);
        gainNode.gain.setValueAtTime(0.06, now + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        
        osc1.connect(filter);
        osc2.connect(filter);
        osc3.connect(filter);
        filter.connect(gainNode);
        
        osc1.start(now);
        osc2.start(now);
        osc3.start(now);
        osc1.stop(now + 0.55);
        osc2.stop(now + 0.55);
        osc3.stop(now + 0.55);
        break;
      }

      case 'close': {
        // De-materialization - descending energy fade
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        
        osc1.type = 'sine';
        osc2.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.3);
        
        osc1.frequency.setValueAtTime(800, now);
        osc1.frequency.exponentialRampToValueAtTime(200, now + 0.25);
        
        osc2.frequency.setValueAtTime(1200, now);
        osc2.frequency.exponentialRampToValueAtTime(300, now + 0.25);
        
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.35);
        osc2.stop(now + 0.35);
        break;
      }

      case 'minimize': {
        // Soft descending whoosh
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        
        osc.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.value = 1500;
        
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.2);
        
        gainNode.gain.setValueAtTime(0.04, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        
        osc.connect(filter);
        filter.connect(gainNode);
        
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      }

      case 'maximize': {
        // Energetic ascending expansion
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        
        osc1.type = 'sine';
        osc2.type = 'sine';
        filter.type = 'highpass';
        filter.frequency.value = 400;
        
        osc1.frequency.setValueAtTime(400, now);
        osc1.frequency.exponentialRampToValueAtTime(1000, now + 0.2);
        
        osc2.frequency.setValueAtTime(600, now);
        osc2.frequency.exponentialRampToValueAtTime(1500, now + 0.2);
        
        gainNode.gain.setValueAtTime(0.03, now);
        gainNode.gain.linearRampToValueAtTime(0.05, now + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.35);
        osc2.stop(now + 0.35);
        break;
      }

      case 'login': {
        // Epic power-up: dual oscillator harmony with sub-bass
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const osc3 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        
        osc1.type = 'sawtooth';
        osc2.type = 'sine';
        osc3.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.exponentialRampToValueAtTime(2000, now + 1.5);
        
        // Sub bass foundation
        osc1.frequency.setValueAtTime(55, now);
        osc1.frequency.linearRampToValueAtTime(110, now + 1.5);
        
        // Mid harmonic
        osc2.frequency.setValueAtTime(220, now);
        osc2.frequency.linearRampToValueAtTime(440, now + 1.5);
        
        // High shimmer
        osc3.frequency.setValueAtTime(440, now);
        osc3.frequency.linearRampToValueAtTime(880, now + 1.5);
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.08, now + 0.5);
        gainNode.gain.setValueAtTime(0.08, now + 1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
        
        osc1.connect(filter);
        osc2.connect(filter);
        osc3.connect(filter);
        filter.connect(gainNode);
        
        osc1.start(now);
        osc2.start(now);
        osc3.start(now);
        osc1.stop(now + 2.5);
        osc2.stop(now + 2.5);
        osc3.stop(now + 2.5);
        break;
      }

      case 'success': {
        // Crystalline success chord - harmonic swell
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const osc3 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc3.type = 'sine';
        filter.type = 'highpass';
        filter.frequency.value = 300;
        
        // Major chord ascending: C5, E5, G5
        osc1.frequency.setValueAtTime(523.25, now);
        osc1.frequency.linearRampToValueAtTime(1046.5, now + 0.15);
        
        osc2.frequency.setValueAtTime(659.25, now);
        osc2.frequency.linearRampToValueAtTime(1318.5, now + 0.15);
        
        osc3.frequency.setValueAtTime(783.99, now);
        osc3.frequency.linearRampToValueAtTime(1567.98, now + 0.15);
        
        gainNode.gain.setValueAtTime(0.06, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        
        osc1.connect(filter);
        osc2.connect(filter);
        osc3.connect(filter);
        filter.connect(gainNode);
        
        osc1.start(now);
        osc2.start(now);
        osc3.start(now);
        osc1.stop(now + 0.45);
        osc2.stop(now + 0.45);
        osc3.stop(now + 0.45);
        break;
      }

      case 'error': {
        // Power down tone - low frequency thrum with muted dissonance
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        
        osc1.type = 'sawtooth';
        osc2.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(100, now + 0.4);
        
        // Descending dissonant tones
        osc1.frequency.setValueAtTime(200, now);
        osc1.frequency.exponentialRampToValueAtTime(60, now + 0.4);
        
        osc2.frequency.setValueAtTime(185, now); // Slight dissonance
        osc2.frequency.exponentialRampToValueAtTime(55, now + 0.4);
        
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.55);
        osc2.stop(now + 0.55);
        break;
      }

      case 'notification': {
        // Gentle chime - attention without alarm
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        
        osc1.type = 'sine';
        osc2.type = 'sine';
        filter.type = 'bandpass';
        filter.frequency.value = 1500;
        filter.Q.value = 5;
        
        // Two-note chime
        osc1.frequency.setValueAtTime(880, now);
        osc1.frequency.setValueAtTime(1174.66, now + 0.15); // D6
        
        osc2.frequency.setValueAtTime(1318.51, now); // E6
        osc2.frequency.setValueAtTime(1760, now + 0.15); // A6
        
        gainNode.gain.setValueAtTime(0.04, now);
        gainNode.gain.setValueAtTime(0.04, now + 0.14);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.55);
        osc2.stop(now + 0.55);
        break;
      }
    }
  }, [initAudio]);

  return { 
    playSound, 
    setVolume, 
    setMuted,
    getVolume: () => volume.current,
    getMuted: () => isMuted.current
  };
};
