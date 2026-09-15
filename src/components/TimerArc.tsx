interface Props {
  max: number;
  current: number;
  running: boolean;
  active: boolean;
  dark?: boolean;
  onStart?: () => void;
  onToggle?: () => void;
}

export default function TimerArc({ max, current, running, active, dark = false, onStart, onToggle }: Props) {
  if (max === 0) return null;

  const size = 'clamp(56px, 4.6cqw, 88px)';
  const r = 38;
  const circumference = 2 * Math.PI * r;
  const ratio = max > 0 ? current / max : 1;
  const dashoffset = circumference * (1 - ratio);

  const isWarning = current <= 5 && active;
  const strokeColor = !active ? 'var(--c-warm-gray)' : isWarning ? 'var(--c-red)' : dark ? 'var(--c-pink)' : 'var(--c-violet)';
  const textColor = dark ? 'var(--c-ivory)' : 'var(--c-coal)';

  return (
    <button
      onClick={active ? onToggle : onStart}
      title={!active ? 'Avvia timer (Spazio)' : running ? 'Pausa timer (Spazio)' : 'Riprendi timer (Spazio)'}
      style={{
        background: 'none',
        border: 'none',
        cursor: max === 0 ? 'default' : 'pointer',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.3em',
        userSelect: 'none',
      }}
    >
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg
          viewBox="0 0 100 100"
          style={{
            width: '100%',
            height: '100%',
            transform: 'rotate(-90deg)',
            animation: isWarning ? 'soft-alarm 0.9s var(--ease-in-out) infinite' : 'none',
          }}
        >
          {/* Track */}
          <circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke={dark ? 'rgba(244,239,230,0.22)' : 'rgba(38,38,38,0.18)'}
            strokeWidth="6"
          />
          {/* Progress arc */}
          <circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={active ? dashoffset : 0}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.45s var(--ease-soft)' }}
          />
        </svg>
        {/* Center content */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1px',
        }}>
          {!active ? (
            <span style={{ fontSize: '1.4em', lineHeight: 1, color: strokeColor, borderStyle: 'none', borderColor: 'rgba(0,0,0,0)' }}>▷</span>
          ) : (
            <>
              <span style={{
                fontFamily: 'var(--ff-mono)',
                fontVariantNumeric: 'tabular-nums',
                fontWeight: 700,
                fontSize: 'clamp(0.9rem, 1.4cqw, 1.6rem)',
                color: isWarning ? 'var(--c-red)' : textColor,
                lineHeight: 1,
                transition: 'color 0.2s',
              }}>
                {current}
              </span>
              {!running && (
                <span style={{ fontSize: '0.55em', color: strokeColor, lineHeight: 1 }}>▷</span>
              )}
            </>
          )}
        </div>
      </div>
    </button>
  );
}
