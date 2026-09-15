import { useEffect, useState } from 'react';
import type { Level } from '../types';
import { LEVEL_NAMES, LEVEL_COLORS } from '../types';

interface Props {
  level: 1 | 2 | 3;
  onContinue: () => void;
}

const nextLevelNames: Record<number, string> = {
  1: LEVEL_NAMES[2],
  2: LEVEL_NAMES[3],
  3: LEVEL_NAMES[4],
};

export default function LevelUpScreen({ level, onContinue }: Props) {
  const [phase, setPhase] = useState(0);
  const color = LEVEL_COLORS[level];
  const levelLabel = level === 1 ? 'OCCHIO ALLENATO' : level === 2 ? 'MENTE PROGETTUALE' : 'DESIGN HERO';

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--c-ivory)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(12px,2vw,28px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated arcs */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <path
          d="M 960 1200 Q 400 800 960 540 Q 1520 280 960 -120"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity={phase >= 1 ? 0.25 : 0}
          strokeDasharray="2000"
          strokeDashoffset={phase >= 1 ? 0 : 2000}
          style={{ transition: 'stroke-dashoffset 1s ease, opacity 0.4s ease' }}
        />
        <path
          d="M 0 540 Q 480 300 960 540 Q 1440 780 1920 540"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity={phase >= 2 ? 0.2 : 0}
          style={{ transition: 'opacity 0.5s ease' }}
        />
        <rect x="920" y="528" width="40" height="4" rx="2" fill={color} opacity={phase >= 2 ? 0.7 : 0} style={{ transition: 'opacity 0.3s ease' }} />
      </svg>

      {/* Level badge */}
      <div style={{
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.5s ease',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4em',
        zIndex: 2,
      }}>
        <div style={{
          border: `2px solid ${color}`,
          borderRadius: 'var(--radius-btn)',
          padding: '0.4em 1.4em',
          fontFamily: 'Automat Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: 'var(--fs-label)',
          color,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          {levelLabel}
        </div>
      </div>

      {/* Main text */}
      <div style={{
        opacity: phase >= 2 ? 1 : 0,
        transform: phase >= 2 ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.5s ease',
        textAlign: 'center',
        zIndex: 2,
      }}>
        <h1 style={{
          margin: 0,
          fontFamily: 'Aquawax Fx, sans-serif',
          fontSize: 'var(--fs-display)',
          fontWeight: 800,
          color: 'var(--c-coal)',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
        }}>
          Livello
          <br />
          <span style={{ color }}>superato</span>
        </h1>
      </div>

      {/* Next level preview */}
      {phase >= 3 && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5em',
          zIndex: 2,
          animation: 'fade-in 0.5s ease',
        }}>
          <p style={{ margin: 0, fontSize: 'var(--fs-label)', color: 'var(--c-coal)', letterSpacing: '0.1em' }}>
            Prossimo livello
          </p>
          <p style={{
            margin: 0,
            fontFamily: 'Automat Grotesk, sans-serif',
            fontSize: 'var(--fs-answer)',
            fontWeight: 700,
            color: 'var(--c-coal)',
          }}>
            {nextLevelNames[level]}
          </p>
        </div>
      )}

      {/* CTA */}
      <button
        className="btn-primary"
        style={{
          padding: 'clamp(12px,1.5vw,20px) clamp(36px,4vw,64px)',
          fontSize: 'var(--fs-answer)',
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.5s ease',
          zIndex: 2,
        }}
        onClick={onContinue}
      >
        Continua →
      </button>
    </div>
  );
}
