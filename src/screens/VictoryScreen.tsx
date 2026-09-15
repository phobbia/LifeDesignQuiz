import { useEffect, useState } from 'react';

interface Props {
  playerName: string;
  prize: string;
  onCelebrate: () => void;
  onEnd: () => void;
}

export default function VictoryScreen({ playerName, prize, onCelebrate, onEnd }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 2400),
      setTimeout(() => setPhase(5), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      width: '100%', height: '100%',
      background: phase >= 3 ? 'var(--c-ivory)' : 'var(--c-coal)',
      transition: 'background 1s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(10px,1.8vw,24px)',
      padding: '4%',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Minimal decoration */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        {phase >= 2 && (
          <path d="M -100 540 Q 960 300 2020 540" fill="none" stroke="var(--c-violet)" strokeWidth="1.5"
            opacity="0.2"
            strokeDasharray="3000"
            strokeDashoffset={0}
            style={{ transition: 'stroke-dashoffset 1.5s ease, opacity 0.8s ease' }}
          />
        )}
        {phase >= 3 && (
          <>
            <rect x="200" y="300" width="40" height="6" rx="3" fill="var(--c-pink)" opacity="0.5" />
            <rect x="1680" y="750" width="40" height="6" rx="3" fill="var(--c-violet)" opacity="0.5" />
          </>
        )}
      </svg>

      {/* Content */}
      <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 32, columnGap: 20 }}>
        {phase >= 1 && (
          <p style={{
            margin: 0,
            fontFamily: 'Automat Grotesk, sans-serif',
            fontSize: 'var(--fs-label)',
            fontWeight: 700,
            color: phase >= 3 ? 'var(--c-violet)' : 'var(--c-pink)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            animation: 'fade-in 0.5s ease',
            transition: 'color 0.8s ease',
          }}>
            Super Hero Designer
          </p>
        )}

        {phase >= 2 && (
          <h1 style={{
            margin: 0,
            fontFamily: 'Aquawax Fx, sans-serif',
            fontSize: 'var(--fs-display)',
            fontWeight: 800,
            color: phase >= 3 ? 'var(--c-coal)' : 'var(--c-ivory)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            transition: 'color 0.8s ease',
            animation: 'slide-up 0.6s ease',
          }}>
            HAI LASCIATO
            <br />
            <span style={{ color: 'var(--c-violet)' }}>UNA TRACCIA</span>
            <br />
            <span style={{ color: 'var(--c-pink)' }}>INDELEBILE</span>
          </h1>
        )}

        {phase >= 3 && playerName && (
          <p style={{
            margin: 0,
            fontFamily: 'Automat Grotesk, sans-serif',
            fontSize: 'var(--fs-answer)',
            fontWeight: 500,
            color: 'var(--c-coal)',
            animation: 'fade-in 0.5s ease',
          }}>
            <strong style={{ color: 'var(--c-violet)' }}>{playerName}</strong> è un SUPER HERO DESIGNER
          </p>
        )}

        {phase >= 4 && (
          <div style={{
            border: '2px solid var(--c-violet)',
            borderRadius: 'var(--radius-card)',
            padding: '1.2em 2.5em',
            animation: 'scale-in 0.5s ease',
            background: 'color-mix(in srgb, var(--c-violet) 8%, var(--c-white))',
          }}>
            <p style={{ margin: '0 0 0.3em', fontSize: 'var(--fs-tiny)', color: 'var(--c-coal)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              HAI VINTO
            </p>
            <p style={{ margin: 0, fontFamily: 'Aquawax Fx, sans-serif', fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--c-coal)', lineHeight: 1 }}>
              {prize}
            </p>
          </div>
        )}

        {phase >= 5 && (
          <div style={{ display: 'flex', gap: '1em', flexWrap: 'wrap', justifyContent: 'center', animation: 'fade-in 0.5s ease' }}>
            <button
              className="btn-primary"
              style={{ padding: 'clamp(12px,1.3vw,18px) clamp(28px,3vw,48px)', fontSize: 'var(--fs-answer)', background: 'var(--c-violet)', color: 'var(--c-ivory)' }}
              onClick={onCelebrate}
            >
              🎉 FESTEGGIA LA VITTORIA
            </button>
            <button
              style={{
                padding: 'clamp(12px,1.3vw,18px) clamp(24px,2.5vw,40px)',
                fontSize: 24,
                fontFamily: 'Automat Grotesk, sans-serif',
                fontWeight: 700,
                color: 'var(--c-ivory)',
                background: 'var(--c-coal)',
                fontSize: 35,
                border: 'none',
                borderRadius: 'var(--radius-btn)',
                cursor: 'pointer',
                letterSpacing: '0.05em',
              }}
              onClick={onEnd}
            >
              VAI AL RIEPILOGO
            </button>
          </div>
        )}
      </div>

      <p style={{
        position: 'absolute', bottom: '3%', left: 0, right: 0, textAlign: 'center',
        margin: 0, fontSize: 'var(--fs-tiny)', color: phase >= 3 ? 'var(--c-coal)' : 'var(--c-ivory)',
        letterSpacing: '0.1em', zIndex: 2,
        transition: 'color 0.8s ease',
      }}>
        Una traccia impossibile da ignorare.
      </p>
    </div>
  );
}
