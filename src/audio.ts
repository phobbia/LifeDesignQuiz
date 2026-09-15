let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) {
    const Ctor: typeof AudioContext =
      window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
  }
  return ctx;
}

/**
 * I browser creano l'AudioContext in stato "suspended" finché non c'è
 * un gesto dell'utente. Va richiamata al primo click o tasto premuto.
 */
export function unlock() {
  try {
    const ac = getCtx();
    if (ac.state === 'suspended') void ac.resume();
  } catch (_) {}
}


// ─────────────────────────────────────────────────────────────
// Catena di uscita comune: un filtro che smussa le armoniche dure
// e un riverbero corto che toglie l'effetto "sveglia digitale".
// ─────────────────────────────────────────────────────────────
let busDry: GainNode | null = null;
let busWet: GainNode | null = null;

function getBus(ac: AudioContext): { dry: GainNode; wet: GainNode } {
  if (!busDry || !busWet) {
    const master = ac.createGain();
    master.gain.value = 0.9;

    // Taglia le frequenze più aggressive, dove vive la durezza metallica.
    const tone = ac.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 5200;
    tone.Q.value = 0.4;

    // Riverbero generato a runtime: nessun file da caricare.
    const convolver = ac.createConvolver();
    const seconds = 1.1;
    const len = Math.floor(ac.sampleRate * seconds);
    const impulse = ac.createBuffer(2, len, ac.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
      }
    }
    convolver.buffer = impulse;

    const wetGain = ac.createGain();
    wetGain.gain.value = 0.3;

    tone.connect(master);
    convolver.connect(wetGain);
    wetGain.connect(master);
    master.connect(ac.destination);

    busDry = tone;
    busWet = convolver as unknown as GainNode;
  }
  return { dry: busDry, wet: busWet };
}

function playTone(freq: number, duration: number, gain: number, type: OscillatorType = 'sine', attack = 0.02, decay = 0.25) {
  try {
    const ac = getCtx();
    if (ac.state === 'suspended') void ac.resume();
    const { dry, wet } = getBus(ac);
    const now = ac.currentTime;

    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // Attacco e rilascio morbidi: è la coda che rende un suono "vero".
    const release = Math.max(0.18, decay);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), now + Math.max(0.012, attack));
    g.gain.setValueAtTime(Math.max(0.0002, gain), now + duration * 0.55);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration + release);

    osc.connect(g);
    g.connect(dry);
    g.connect(wet);
    osc.start(now);
    osc.stop(now + duration + release + 0.05);
  } catch (_) {}
}

/** Nota con una lieve seconda voce: due oscillatori appena scordati suonano
 *  più organici di uno solo, che risulta sempre sintetico. */
function playNote(freq: number, duration: number, gain: number, type: OscillatorType = 'triangle') {
  playTone(freq, duration, gain, type, 0.02, 0.3);
  playTone(freq * 1.005, duration, gain * 0.45, 'sine', 0.03, 0.34);
}

export function playHover() {
  playTone(760, 0.05, 0.028, 'sine', 0.012, 0.16);
}

export function playSelect() {
  playNote(587.33, 0.1, 0.07, 'triangle');
}

export function playConfirm() {
  playNote(392, 0.16, 0.085, 'triangle');
  setTimeout(() => playNote(523.25, 0.24, 0.075, 'triangle'), 110);
}

export function playCorrect() {
  // Arpeggio maggiore, voci morbide e code lunghe.
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((f, i) => {
    setTimeout(() => playNote(f, 0.38, 0.075, 'triangle'), i * 95);
  });
}

export function playWrong() {
  // Discesa cromatica smorzata, senza onde quadre.
  playNote(246.94, 0.2, 0.08, 'triangle');
  setTimeout(() => playNote(207.65, 0.24, 0.075, 'triangle'), 130);
  setTimeout(() => playNote(174.61, 0.42, 0.07, 'sine'), 270);
}

export function playTimerTick() {
  playTone(620, 0.04, 0.03, 'sine', 0.008, 0.12);
}

export function playTimerWarning() {
  playTone(784, 0.07, 0.05, 'triangle', 0.01, 0.18);
}

export function playLevelUp() {
  const notes = [392, 523.25, 659.25, 784];
  notes.forEach((f, i) => {
    setTimeout(() => playNote(f, 0.34, 0.085, 'triangle'), i * 115);
  });
}

export function playSuperHeroUnlock() {
  const notes = [261.63, 329.63, 392, 523.25, 659.25, 784, 1046.5];
  notes.forEach((f, i) => {
    setTimeout(() => playNote(f, 0.5, 0.07, 'triangle'), i * 135);
  });
}


// ─────────────────────────────────────────────────────────────
// Suoni di scena: tensione, applauso, disapprovazione.
// Tutto sintetizzato, nessun file audio da distribuire.
// ─────────────────────────────────────────────────────────────

/** Genera un buffer di rumore bianco riutilizzabile. */
let noiseBuffer: AudioBuffer | null = null;
function getNoise(ac: AudioContext): AudioBuffer {
  if (!noiseBuffer || noiseBuffer.sampleRate !== ac.sampleRate) {
    const len = ac.sampleRate * 2;
    noiseBuffer = ac.createBuffer(1, len, ac.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

/**
 * Battito di tensione durante l'attesa del responso.
 * Restituisce una funzione per interromperlo in anticipo.
 */
export function playSuspense(durationMs: number): () => void {
  let stopped = false;
  const timers: ReturnType<typeof setTimeout>[] = [];
  try {
    const ac = getCtx();
    if (ac.state === 'suspended') void ac.resume();

    const beats = Math.max(2, Math.floor(durationMs / 420));
    for (let i = 0; i < beats; i++) {
      const t = setTimeout(() => {
        if (stopped) return;
        // Il battito accelera e sale di tono verso la fine.
        const progress = i / Math.max(1, beats - 1);
        // Due colpi ravvicinati: il secondo più debole, come un battito.
        playTone(58 + progress * 26, 0.2, 0.13, 'sine', 0.014, 0.3);
        setTimeout(() => playTone(52 + progress * 22, 0.17, 0.075, 'sine', 0.014, 0.28), 150);
      }, i * (420 - (i / beats) * 140));
      timers.push(t);
    }
  } catch (_) {}

  return () => {
    stopped = true;
    timers.forEach(clearTimeout);
  };
}

/** Applauso: raffiche di rumore filtrato, come un battito di mani collettivo. */
export function playApplause() {
  try {
    const ac = getCtx();
    if (ac.state === 'suspended') void ac.resume();
    const now = ac.currentTime;

    // Corpo dell'applauso: rumore con inviluppo lungo.
    const src = ac.createBufferSource();
    src.buffer = getNoise(ac);
    src.loop = true;

    const band = ac.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.setValueAtTime(1800, now);
    band.Q.value = 0.7;

    const gain = ac.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.12);
    gain.gain.setValueAtTime(0.16, now + 1.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    src.connect(band);
    band.connect(gain);
    gain.connect(ac.destination);
    src.start(now);
    src.stop(now + 2.3);

    // Singoli battiti sparsi, per dare grana all'insieme.
    for (let i = 0; i < 26; i++) {
      const at = now + 0.05 + Math.random() * 1.5;
      const clap = ac.createBufferSource();
      clap.buffer = getNoise(ac);
      const hp = ac.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 900 + Math.random() * 1200;
      const g = ac.createGain();
      g.gain.setValueAtTime(0.10 + Math.random() * 0.07, at);
      g.gain.exponentialRampToValueAtTime(0.001, at + 0.06);
      clap.connect(hp);
      hp.connect(g);
      g.connect(ac.destination);
      clap.start(at);
      clap.stop(at + 0.08);
    }

    // Accordo maggiore di accompagnamento.
    [523.25, 659.25, 783.99].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.5, 0.08, 'sine', 0.02, 0.4), i * 70);
    });
  } catch (_) {}
}

/** Disapprovazione: il classico "buuu" del pubblico. */
export function playBoo() {
  try {
    const ac = getCtx();
    if (ac.state === 'suspended') void ac.resume();
    const now = ac.currentTime;

    // Più voci leggermente scordate che scendono di tono.
    [104, 98, 91, 112].forEach((base, i) => {
      const osc = ac.createOscillator();
      const g = ac.createGain();
      const lp = ac.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(700, now);
      lp.frequency.exponentialRampToValueAtTime(260, now + 1.4);

      osc.type = 'sawtooth';
      const start = now + i * 0.05;
      osc.frequency.setValueAtTime(base, start);
      osc.frequency.exponentialRampToValueAtTime(base * 0.62, start + 1.3);

      g.gain.setValueAtTime(0, start);
      g.gain.linearRampToValueAtTime(0.085, start + 0.12);
      g.gain.setValueAtTime(0.085, start + 0.75);
      g.gain.exponentialRampToValueAtTime(0.001, start + 1.45);

      osc.connect(lp);
      lp.connect(g);
      g.connect(ac.destination);
      osc.start(start);
      osc.stop(start + 1.5);
    });

    // Soffio di fondo, per dare corpo al coro.
    const src = ac.createBufferSource();
    src.buffer = getNoise(ac);
    const bp = ac.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 320;
    bp.Q.value = 1.2;
    const g = ac.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.05, now + 0.2);
    g.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
    src.connect(bp);
    bp.connect(g);
    g.connect(ac.destination);
    src.start(now);
    src.stop(now + 1.5);
  } catch (_) {}
}
