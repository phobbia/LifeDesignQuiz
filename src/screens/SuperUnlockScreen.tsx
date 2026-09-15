import { useEffect, useState } from 'react';

interface Props { onContinue: () => void; prize: string }

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
      background: phase >= 3 ? 'var(--c-coal)' : 'var(--c-ivory)',
      transition: 'background 1.2s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(10px,1.8vw,24px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background lines — Traccia Incandescente */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        {/* Rising lines from bottom */}
        {phase >= 2 && [
          { x1: 400, cx: 600, color: 'var(--c-pink)', delay: 0 },
          { x1: 700, cx: 960, color: 'var(--c-violet)', delay: 150 },
          { x1: 1200, cx: 1100, color: 'var(--c-orange)', delay: 80 },
          { x1: 1600, cx: 1400, color: 'var(--c-pink)', delay: 230 },
        ].map((l, i) => (
          <path
            key={i}
            d={`M ${l.x1} 1200 Q ${l.cx} 800 ${l.cx} 400`}
            fill="none"
            stroke={l.color}
            strokeWidth="1.5"
            opacity={phase >= 3 ? 0.4 : 0.15}
            strokeDasharray="1000"
            strokeDashoffset={phase >= 2 ? 0 : 1000}
            style={{ transition: `stroke-dashoffset 1s ease ${l.delay}ms, opacity 0.8s ease` }}
          />
        ))}

        {/* Center converging lines */}
        {phase >= 3 && [
          "M 0 540 Q 480 400 960 540",
          "M 1920 540 Q 1440 680 960 540",
          "M 960 0 Q 800 270 960 540",
          "M 960 1080 Q 1120 810 960 540",
        ].map((d, i) => (
          <path
            key={`c${i}`}
            d={d}
            fill="none"
            stroke={['var(--c-pink)', 'var(--c-violet)', 'var(--c-orange)', 'var(--c-pink)'][i]}
            strokeWidth="1.2"
            opacity="0.35"
            style={{ animation: 'incandescent 1.8s ease-in-out infinite' }}
          />
        ))}

        {/* Central emblem */}
        {phase >= 4 && (
          <>
            <circle cx="960" cy="540" r="120" fill="none" stroke="var(--c-pink)" strokeWidth="2" opacity="0.5" style={{ animation: 'glow-pulse 2s ease-in-out infinite' }} />
            <circle cx="960" cy="540" r="80" fill="none" stroke="var(--c-violet)" strokeWidth="1.5" opacity="0.4" style={{ animation: 'glow-pulse 2s ease-in-out infinite', animationDelay: '0.3s' }} />
            <circle cx="960" cy="540" r="40" fill="color-mix(in srgb, var(--c-orange) 30%, transparent)" stroke="var(--c-orange)" strokeWidth="1.5" opacity="0.6" style={{ animation: 'glow-pulse 2s ease-in-out infinite', animationDelay: '0.6s' }} />
          </>
        )}

        {/* Small color accents */}
        {phase >= 4 && (
          <>
            <rect x="840" y="536" width="28" height="8" rx="4" fill="var(--c-pink)" opacity="0.8" />
            <rect x="1052" y="536" width="28" height="8" rx="4" fill="var(--c-violet)" opacity="0.8" />
            <rect x="956" y="424" width="8" height="28" rx="4" fill="var(--c-orange)" opacity="0.8" />
          </>
        )}
      </svg>

      {/* Text content */}
      <div style={{
        zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'clamp(8px,1.5vw,20px)',
        textAlign: 'center',
        padding: '0 6%',
      }}>
        {phase >= 2 && (
          <p style={{
            margin: 0,
            fontFamily: 'Automat Grotesk, sans-serif',
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
            fontFamily: 'Aquawax Fx, sans-serif',
            fontSize: 'var(--fs-display)',
            fontWeight: 800,
            color: 'var(--c-ivory)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            animation: phase >= 4 ? 'vibrate-text 0.3s ease' : 'slide-up 0.6s ease',
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
            <p style={{ margin: '0.2em 0 0', fontFamily: 'Aquawax Fx, sans-serif', fontSize: 'var(--fs-answer)', fontWeight: 700, color: 'var(--c-ivory)' }}>
              {prize}
            </p>
          </div>
        )}

        {phase >= 5 && (
          <button
            className="btn-primary"
            style={{
              padding: 'clamp(12px,1.5vw,20px) clamp(36px,4vw,64px)',
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
