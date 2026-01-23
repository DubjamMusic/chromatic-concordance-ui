import { useCallback, useEffect, useRef, useState } from "react";

// Web Audio API based sound generation for game-like sounds
// This approach generates sounds programmatically without needing external audio files

interface SoundOptions {
  volume?: number;
  loop?: boolean;
}

type SoundType = 
  | "heartbeat"
  | "pulse"
  | "logicClick"
  | "logicSuccess"
  | "concordanceChime"
  | "ambientDeep"
  | "dialogOpen"
  | "dialogClose"
  | "phaseComplete"
  | "questComplete";

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const ambientOscillatorRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);

  // Initialize AudioContext on first interaction
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Heartbeat sound - low frequency pulse
  const playHeartbeat = useCallback((options: SoundOptions = {}) => {
    const ctx = initAudioContext();
    if (isMuted) return;

    const { volume = 0.3 } = options;
    const now = ctx.currentTime;

    // First beat (lub)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(60, now);
    osc1.frequency.exponentialRampToValueAtTime(40, now + 0.1);
    gain1.gain.setValueAtTime(volume, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.15);

    // Second beat (dub)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(50, now + 0.2);
    osc2.frequency.exponentialRampToValueAtTime(35, now + 0.3);
    gain2.gain.setValueAtTime(volume * 0.7, now + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.2);
    osc2.stop(now + 0.35);
  }, [initAudioContext, isMuted]);

  // Pulse sound - empathy charge collection
  const playPulse = useCallback((options: SoundOptions = {}) => {
    const ctx = initAudioContext();
    if (isMuted) return;

    const { volume = 0.25 } = options;
    const now = ctx.currentTime;

    // Soft rising tone with green/nature feel
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.2);
    osc.frequency.exponentialRampToValueAtTime(330, now + 0.4);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(2, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  }, [initAudioContext, isMuted]);

  // Logic click sound - digital/mechanical
  const playLogicClick = useCallback((options: SoundOptions = {}) => {
    const ctx = initAudioContext();
    if (isMuted) return;

    const { volume = 0.2 } = options;
    const now = ctx.currentTime;

    // Sharp click with digital overtones
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);

    // Add a secondary click
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(2400, now + 0.02);
    gain2.gain.setValueAtTime(volume * 0.5, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.02);
    osc2.stop(now + 0.06);
  }, [initAudioContext, isMuted]);

  // Logic success sound - golden/triumphant
  const playLogicSuccess = useCallback((options: SoundOptions = {}) => {
    const ctx = initAudioContext();
    if (isMuted) return;

    const { volume = 0.25 } = options;
    const now = ctx.currentTime;

    // Ascending arpeggio
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(volume, now + i * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.3);
    });
  }, [initAudioContext, isMuted]);

  // Concordance chime - ethereal/teal
  const playConcordanceChime = useCallback((options: SoundOptions = {}) => {
    const ctx = initAudioContext();
    if (isMuted) return;

    const { volume = 0.3 } = options;
    const now = ctx.currentTime;

    // Ethereal bell-like sound with harmonics
    const fundamentalFreq = 440;
    const harmonics = [1, 2, 3, 4.5, 6];
    const gains = [1, 0.5, 0.25, 0.15, 0.1];

    harmonics.forEach((harmonic, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(fundamentalFreq * harmonic, now);
      gain.gain.setValueAtTime(volume * gains[i], now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2);
    });
  }, [initAudioContext, isMuted]);

  // Ambient deep sound - underwater/space atmosphere
  const startAmbient = useCallback((options: SoundOptions = {}) => {
    const ctx = initAudioContext();
    if (isMuted || ambientOscillatorRef.current) return;

    const { volume = 0.08 } = options;

    // Create low frequency drone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(55, ctx.currentTime); // Low A

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.Q.setValueAtTime(1, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 2);

    // Add subtle modulation
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
    lfoGain.gain.setValueAtTime(5, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    ambientOscillatorRef.current = osc;
    ambientGainRef.current = gain;
  }, [initAudioContext, isMuted]);

  const stopAmbient = useCallback(() => {
    if (ambientOscillatorRef.current && ambientGainRef.current && audioContextRef.current) {
      const ctx = audioContextRef.current;
      ambientGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      setTimeout(() => {
        ambientOscillatorRef.current?.stop();
        ambientOscillatorRef.current = null;
        ambientGainRef.current = null;
      }, 1000);
    }
  }, []);

  // Dialog sounds
  const playDialogOpen = useCallback((options: SoundOptions = {}) => {
    const ctx = initAudioContext();
    if (isMuted) return;

    const { volume = 0.15 } = options;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }, [initAudioContext, isMuted]);

  const playDialogClose = useCallback((options: SoundOptions = {}) => {
    const ctx = initAudioContext();
    if (isMuted) return;

    const { volume = 0.15 } = options;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }, [initAudioContext, isMuted]);

  // Phase complete fanfare
  const playPhaseComplete = useCallback((options: SoundOptions = {}) => {
    const ctx = initAudioContext();
    if (isMuted) return;

    const { volume = 0.25 } = options;
    const now = ctx.currentTime;

    // Ascending triumphant chord
    const notes = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(volume, now + i * 0.08 + 0.05);
      gain.gain.setValueAtTime(volume, now + i * 0.08 + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + 1);
    });
  }, [initAudioContext, isMuted]);

  // Quest complete celebration
  const playQuestComplete = useCallback((options: SoundOptions = {}) => {
    const ctx = initAudioContext();
    if (isMuted) return;

    const { volume = 0.3 } = options;
    const now = ctx.currentTime;

    // Grand fanfare with multiple layers
    const melody = [
      { freq: 523.25, time: 0 },
      { freq: 659.25, time: 0.15 },
      { freq: 783.99, time: 0.3 },
      { freq: 1046.5, time: 0.5 },
    ];

    melody.forEach(({ freq, time }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + time);
      gain.gain.setValueAtTime(0, now + time);
      gain.gain.linearRampToValueAtTime(volume, now + time + 0.05);
      gain.gain.setValueAtTime(volume * 0.8, now + time + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + time);
      osc.stop(now + 2);
    });

    // Add shimmer effect
    for (let i = 0; i < 5; i++) {
      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmer.type = "sine";
      shimmer.frequency.setValueAtTime(2000 + Math.random() * 2000, now + 0.8 + i * 0.1);
      shimmerGain.gain.setValueAtTime(volume * 0.1, now + 0.8 + i * 0.1);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5 + i * 0.1);
      shimmer.connect(shimmerGain);
      shimmerGain.connect(ctx.destination);
      shimmer.start(now + 0.8 + i * 0.1);
      shimmer.stop(now + 1.5 + i * 0.1);
    }
  }, [initAudioContext, isMuted]);

  // Play sound by type
  const playSound = useCallback((type: SoundType, options?: SoundOptions) => {
    switch (type) {
      case "heartbeat":
        playHeartbeat(options);
        break;
      case "pulse":
        playPulse(options);
        break;
      case "logicClick":
        playLogicClick(options);
        break;
      case "logicSuccess":
        playLogicSuccess(options);
        break;
      case "concordanceChime":
        playConcordanceChime(options);
        break;
      case "ambientDeep":
        startAmbient(options);
        break;
      case "dialogOpen":
        playDialogOpen(options);
        break;
      case "dialogClose":
        playDialogClose(options);
        break;
      case "phaseComplete":
        playPhaseComplete(options);
        break;
      case "questComplete":
        playQuestComplete(options);
        break;
    }
  }, [
    playHeartbeat,
    playPulse,
    playLogicClick,
    playLogicSuccess,
    playConcordanceChime,
    startAmbient,
    playDialogOpen,
    playDialogClose,
    playPhaseComplete,
    playQuestComplete,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAmbient();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopAmbient]);

  return {
    playSound,
    startAmbient,
    stopAmbient,
    isMuted,
    setIsMuted,
    initAudioContext,
  };
}
