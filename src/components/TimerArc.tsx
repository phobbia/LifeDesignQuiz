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

  const size = 'clamp(56px, 7vw, 88px)';
  const r = 38;
  const circumference = 2 * Math.PI * r;
  const ratio = max > 0 ? current / max : 1;
  const dashoffset = circumference * (1 - ratio);

  const isWarning = current <= 5 && active;
  const strokeColor = !active ? 'var(--c-warm-gray)' : isWarning ? 'var(--c-orange)' : dark ? 'var(--c-pink)' : 'var(--c-violet)';
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
            animation: isWarning ? 'incandescent 0.5s ease-in-out infinite' : 'none',
          }}
        >
          {/* Track */}
          <circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke="rgb(38, 38, 38)"
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
            style={{ transition: 'stroke-dashoffset 0.5s linear, stroke 0.3s ease' }}
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
                fontFamily: 'Aquawax Fx, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(0.9rem, 1.6vw, 1.6rem)',
                color: isWarning ? 'var(--c-orange)' : textColor,
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
      {false && null}
    </button>
  );
}
