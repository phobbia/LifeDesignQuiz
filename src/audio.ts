let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function playTone(freq: number, duration: number, gain: number, type: OscillatorType = 'sine', attack = 0.01, decay = 0.1) {
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.connect(g);
    g.connect(ac.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ac.currentTime);
    g.gain.setValueAtTime(0, ac.currentTime);
    g.gain.linearRampToValueAtTime(gain, ac.currentTime + attack);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + duration + decay);
  } catch (_) {}
}

export function playHover() {
  playTone(880, 0.04, 0.05, 'sine', 0.005, 0.04);
}

export function playSelect() {
  playTone(660, 0.08, 0.1, 'sine', 0.01, 0.07);
}

export function playConfirm() {
  playTone(440, 0.12, 0.12, 'sine', 0.01, 0.1);
  setTimeout(() => playTone(550, 0.1, 0.1, 'sine', 0.01, 0.1), 80);
}

export function playCorrect() {
  // Major chord arpeggio
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((f, i) => {
    setTimeout(() => playTone(f, 0.3, 0.12, 'sine', 0.01, 0.25), i * 80);
  });
}

export function playWrong() {
  playTone(220, 0.08, 0.15, 'sawtooth', 0.01, 0.1);
  setTimeout(() => playTone(185, 0.08, 0.12, 'sawtooth', 0.01, 0.1), 100);
  setTimeout(() => playTone(150, 0.15, 0.1, 'square', 0.01, 0.15), 200);
}

export function playTimerTick() {
  playTone(800, 0.03, 0.04, 'square', 0.005, 0.025);
}

export function playTimerWarning() {
  playTone(1000, 0.05, 0.08, 'square', 0.005, 0.04);
}

export function playLevelUp() {
  const notes = [392, 523.25, 659.25, 784];
  notes.forEach((f, i) => {
    setTimeout(() => playTone(f, 0.25, 0.15, 'sine', 0.01, 0.2), i * 100);
  });
}

export function playSuperHeroUnlock() {
  const notes = [261.63, 329.63, 392, 523.25, 659.25, 784, 1046.5];
  notes.forEach((f, i) => {
    setTimeout(() => playTone(f, 0.4, 0.1, 'sine', 0.01, 0.35), i * 120);
  });
}
