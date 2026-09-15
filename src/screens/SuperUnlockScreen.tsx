import { useEffect, useState } from 'react';

interface Props { onContinue: () => void; prize: string }

/** Percorsi curvi che attraversano la scena, nello stile del sito del festival. */
const TRACES = [
  { d: 'M -80 820 C 320 820 380 420 760 420 C 1140 420 1180 120 1560 120 C 1760 120 1880 200 2000 260', delay: 0 },
  { d: 'M -80 300 C 260 300 300 640 620 640 C 940 640 1000 900 1340 900 C 1600 900 1760 780 2000 780', delay: 220 },
  { d: 'M 240 -60 C 240 220 520 260 520 520 C 520 780 260 820 260 1140', delay: 420 },
  { d: 'M 1680 -60 C 1680 240 1420 300 1420 560 C 1420 820 1700 860 1700 1140', delay: 560 },
];

/** Nodi quadrati agganciati ai percorsi. */
const NODES = [
  { x: 747, y: 407, color: 'var(--c-orange)' },
  { x: 1547, y: 107, color: 'var(--c-violet)' },
  { x: 607, y: 627, color: 'var(--c-pink)' },
  { x: 1327, y: 887, color: 'var(--c-orange)' },
  { x: 507, y: 507, color: 'var(--c-violet)' },
  { x: 1407, y: 547, color: 'var(--c-pink)' },
];

export default function SuperUnlockScreen({ onContinue, prize }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setPhase(5), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--c-ivory)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(10px,1.8cqw,24px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Il buio entra in dissolvenza sopra l'avorio, senza passare dal grigio. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--c-coal)',
          opacity: phase >= 3 ? 1 : 0,
          transition: 'opacity 1.4s var(--ease-soft)',
          pointerEvents: 'none',
        }}
      />

      {/* Tracciati del festival: percorsi curvi sottili con nodi quadrati.
          Niente più fasci convergenti al centro: erano estranei al linguaggio
          visivo di Life Design Festival e affollavano la composizione. */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        {TRACES.map((t, i) => (
          <path
            key={i}
            d={t.d}
            fill="none"
            stroke={phase >= 3 ? 'rgba(244,238,228,0.35)' : 'rgba(38,38,38,0.35)'}
            strokeWidth="1.5"
            strokeDasharray="2600"
            strokeDashoffset={phase >= 2 ? 0 : 2600}
            style={{
              transition: `stroke-dashoffset 1.6s var(--ease-soft) ${t.delay}ms, stroke 1.2s var(--ease-soft)`,
            }}
          />
        ))}
        {NODES.map((n, i) => (
          <rect
            key={`n${i}`}
            x={n.x}
            y={n.y}
            width="26"
            height="26"
            fill={n.color}
            opacity={phase >= 3 ? 1 : 0}
            style={{
              transition: `opacity 0.5s var(--ease-soft) ${600 + i * 90}ms, transform 0.5s var(--ease-back) ${600 + i * 90}ms`,
              transformOrigin: `${n.x + 13}px ${n.y + 13}px`,
              transform: phase >= 3 ? 'scale(1)' : 'scale(0.4)',
            }}
          />
        ))}
      </svg>

      {/* Text content */}
      <div style={{
        zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'clamp(8px,1.5cqw,20px)',
        textAlign: 'center',
        padding: '0 6%',
      }}>
        {phase >= 2 && (
          <p style={{
            margin: 0,
            fontFamily: 'var(--ff-body)',
            fontSize: 'var(--fs-label)',
            color: phase >= 3 ? 'var(--c-pink)' : 'var(--c-violet)',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            transition: 'color 0.8s ease',
            animation: 'fade-in 0.5s ease',
          }}>
            Sei un Design Master
          </p>
        )}

        {phase >= 3 && (
          <h1 style={{
            margin: 0,
            fontFamily: 'var(--ff-display)',
            fontSize: 'var(--fs-display)',
            fontWeight: 800,
            color: 'var(--c-ivory)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            animation: 'slide-up 0.9s var(--ease-soft) both',
          }}>
            DESIGN
            <br />
            <span style={{
              color: 'var(--c-pink)',
              textShadow: '0 0 40px color-mix(in srgb, var(--c-pink) 50%, transparent)',
            }}>
              SUPER HERO
            </span>
          </h1>
        )}

        {phase >= 4 && (
          <div style={{ animation: 'fade-in 0.5s ease', display: 'flex', flexDirection: 'column', gap: '0.3em', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: 'var(--fs-answer)', color: 'var(--c-ivory)' }}>
              Hai superato la scalata.
            </p>
            <p style={{ margin: 0, fontSize: 'var(--fs-answer)', color: 'var(--c-warm-gray)' }}>
              Ora puoi lasciare una traccia indelebile.
            </p>
          </div>
        )}

        {phase >= 4 && (
          <div style={{
            border: '1.5px solid color-mix(in srgb, var(--c-pink) 50%, transparent)',
            borderRadius: 'var(--radius-card)',
            padding: '0.8em 2em',
            animation: 'fade-in 0.5s ease 0.2s both',
          }}>
            <p style={{ margin: 0, fontSize: 'var(--fs-tiny)', color: 'var(--c-warm-gray)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              IN PALIO
            </p>
            <p style={{ margin: '0.2em 0 0', fontFamily: 'var(--ff-display)', fontSize: 'var(--fs-answer)', fontWeight: 700, color: 'var(--c-ivory)' }}>
              {prize}
            </p>
          </div>
        )}

        {phase >= 5 && (
          <button
            className="btn-primary"
            style={{
              padding: 'clamp(12px,1.5cqw,20px) clamp(36px,4cqw,64px)',
              fontSize: 'var(--fs-answer)',
              animation: 'slide-up 0.5s ease',
              background: 'var(--c-pink)',
              borderColor: 'var(--c-pink)',
              color: 'white',
            }}
            onClick={onContinue}
          >
            Affronta la domanda suprema
          </button>
        )}
      </div>
    </div>
  );
}
