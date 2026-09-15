/**
 * ─── Tracciati ───
 *
 * Il linguaggio visivo di lifedesignfestival.it: tratti rettilinei raccordati
 * da archi circolari di raggio ampio — curve nette, quasi semicerchi — con
 * piccoli nodi quadrati colorati agganciati sopra.
 * Tratto nero sottile su avorio, avorio smorzato sul fondo scuro.
 *
 * Sostituisce le decorazioni improvvisate che ogni schermata aveva per conto
 * proprio (archi sfumati, cerchi concentrici, fasci convergenti), che non
 * appartenevano al sistema del festival.
 *
 * I nodi non sono appoggiati a caso: cadono esattamente sulle INTERSEZIONI
 * fra due percorsi, come sul sito. Le coordinate sono i centri degli incroci,
 * calcolati campionando le curve con getPointAtLength, e vivono nello spazio
 * del palco 1920×1080, lo stesso del viewBox.
 */

interface TraceSet {
  paths: string[];
  nodes: { x: number; y: number; color: string }[];
}

/** Lato del quadrato di intersezione, in unità del palco. */
const NODE = 24;

const ORANGE = 'var(--c-orange)';
const VIOLET = 'var(--c-violet)';
const PINK = 'var(--c-pink)';

/**
 * Quattro composizioni diverse, così le schermate non si somigliano tutte.
 * "calm" per le pagine di lettura, "open" per le schermate di gioco (lascia
 * libero il centro), "focus" per i momenti celebrativi, "full" per le home.
 */
const SETS: Record<string, TraceSet> = {
  calm: {
    paths: [
      'M -80 820 L 380 820 A 340 340 0 0 1 1060 820 L 2000 820',
      'M 2000 300 L 1460 300 A 340 340 0 0 0 780 300 L -80 300',
      'M 1300 -60 L 1300 360 A 300 300 0 0 0 1600 660 L 1600 1140',
      'M 620 -60 L 620 520 A 280 280 0 0 1 340 800 L 340 1140',
    ],
    nodes: [
      { x: 1600, y: 820, color: ORANGE },
      { x: 381, y: 797, color: VIOLET },
      { x: 620, y: 300, color: PINK },
    ],
  },
  open: {
    paths: [
      'M -80 200 L 420 200 A 280 280 0 0 1 980 200 L 2000 200',
      'M 2000 920 L 1420 920 A 300 300 0 0 0 820 920 L -80 920',
      'M 1740 -60 L 1740 300 A 280 280 0 0 1 1460 580 L 1460 1140',
      'M 180 -60 L 180 460 A 260 260 0 0 0 440 720 L 440 1140',
    ],
    nodes: [
      { x: 1740, y: 200, color: ORANGE },
      { x: 180, y: 200, color: VIOLET },
      { x: 1460, y: 920, color: PINK },
      { x: 440, y: 920, color: ORANGE },
    ],
  },
  focus: {
    paths: [
      'M -80 880 L 360 880 A 360 360 0 0 1 1080 880 L 2000 880',
      'M -80 360 L 560 360 A 320 320 0 0 0 1200 360 L 2000 360',
      'M 1620 -60 L 1620 420 A 300 300 0 0 0 1920 720 L 1920 1140',
      'M 260 -60 L 260 300 A 280 280 0 0 1 -20 580 L -20 1140',
    ],
    nodes: [
      { x: 613, y: 536, color: PINK },
      { x: 1620, y: 360, color: VIOLET },
      { x: 253, y: 360, color: ORANGE },
    ],
  },
  full: {
    paths: [
      'M -80 840 L 400 840 A 360 360 0 0 1 1120 840 L 2000 840',
      'M 2000 260 L 1480 260 A 340 340 0 0 0 800 260 L -80 260',
      'M 240 -60 L 240 420 A 300 300 0 0 0 540 720 L 540 1140',
      'M 1720 -60 L 1720 380 A 320 320 0 0 1 1400 700 L 1400 1140',
    ],
    nodes: [
      { x: 429, y: 698, color: ORANGE },
      { x: 1400, y: 840, color: VIOLET },
      { x: 240, y: 260, color: PINK },
      { x: 1720, y: 260, color: ORANGE },
    ],
  },
};

interface Props {
  variant?: keyof typeof SETS;
  dark?: boolean;
  /** Mostra o nasconde i nodi quadrati, per le schermate più sobrie. */
  nodes?: boolean;
  /** Opacità complessiva del tracciato. */
  opacity?: number;
}

export default function Traces({ variant = 'calm', dark = false, nodes = true, opacity = 1 }: Props) {
  const set = SETS[variant] ?? SETS.calm;
  const stroke = dark ? 'rgba(244,238,228,0.20)' : 'rgba(0,0,0,0.18)';

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        opacity,
      }}
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {set.paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          style={{
            strokeDasharray: 3200,
            animation: `trace-draw 2.2s var(--ease-soft) ${i * 220}ms both`,
          }}
        />
      ))}
      {nodes &&
        set.nodes.map((n, i) => (
          <rect
            key={`n${i}`}
            x={n.x - NODE / 2}
            y={n.y - NODE / 2}
            width={NODE}
            height={NODE}
            fill={n.color}
            style={{
              transformOrigin: `${n.x}px ${n.y}px`,
              animation: `trace-node 0.55s var(--ease-back) ${900 + i * 110}ms both`,
            }}
          />
        ))}
    </svg>
  );
}
