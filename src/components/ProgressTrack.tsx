import { LEVEL_NAMES } from '../types';
import type { Level } from '../types';

interface Props {
  level: Level;
  correctCount: number;
  dark?: boolean;
}

export default function ProgressTrack({ level, correctCount, dark = false }: Props) {
  const steps = [
    { num: '01', label: 'OCCHIO ALLENATO', l: 1 },
    { num: '02', label: 'MENTEP PROGETTUALE', l: 2 },
    { num: '03', label: 'DESIGN MASTER', l: 3 },
    { num: '04', label: 'SUPER HERO DESIGNER', l: 4 },
  ];

  const textColor = dark ? 'var(--c-ivory)' : 'var(--c-coal)';
  const mutedColor = dark ? 'rgba(244,239,230,0.3)' : 'rgba(38,38,38,0.25)';
  const accentColors: Record<number, string> = {
    1: 'var(--c-violet)',
    2: 'var(--c-pink)',
    3: 'var(--c-orange)',
    4: 'var(--c-pink)',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0', width: '100%', position: 'relative' }}>
      {steps.map((step, i) => {
        const done = step.l < level || (step.l === level && correctCount >= step.l);
        const active = step.l === level;
        const color = done || active ? accentColors[step.l] : mutedColor;

        return (
          <div key={step.l} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none', paddingTop: 0, paddingBottom: 0 }}>
            {/* Step dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3em' }}>
              <div style={{
                width: 'clamp(20px, 2.2vw, 28px)',
                height: 'clamp(20px, 2.2vw, 28px)',
                borderRadius: '50%',
                background: done ? color : 'transparent',
                border: `2px solid ${color}`,
                transition: 'all 0.4s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {done && <span style={{ color: 'white', fontSize: '0.6em', fontWeight: 700 }}>✓</span>}
                {active && !done && <div style={{ width: '40%', height: '40%', borderRadius: '50%', background: color }} />}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px 5px' }}>
                <span style={{ fontSize: '32px', fontFamily: 'Aquawax Fx, sans-serif', color, fontWeight: 900, lineHeight: 1 }}>{step.num}</span>
                <span style={{
                  fontSize: 'calc(var(--fs-tiny) * 0.85)',
                  color: active ? textColor : mutedColor,
                  fontWeight: active ? 600 : 400,
                  whiteSpace: 'nowrap',
                  lineHeight: 1.2,
                }}>
                  {step.label}
                </span>
              </div>
            </div>

            {/* Connecting arc */}
            {i < steps.length - 1 && (
              <svg
                style={{ flex: 1, minWidth: 0, height: 'clamp(20px, 3vw, 36px)', overflow: 'visible' }}
                viewBox="0 0 100 30"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0 15 Q 50 0 100 15"
                  fill="none"
                  stroke={mutedColor}
                  strokeWidth="1.5"
                />
                {(done) && (
                  <path
                    d="M 0 15 Q 50 0 100 15"
                    fill="none"
                    stroke={accentColors[step.l]}
                    strokeWidth="2"
                    strokeDasharray="120"
                    strokeDashoffset="0"
                    style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                  />
                )}
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
