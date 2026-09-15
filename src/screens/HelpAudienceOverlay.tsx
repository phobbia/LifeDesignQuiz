import { useEffect, useState } from 'react';

interface Props { onClose: () => void }

export default function HelpAudienceOverlay({ onClose }: Props) {
  const [countdown, setCountdown] = useState(20);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!started || done) return;
    if (countdown <= 0) { setDone(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, started, done]);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: 'rgba(38,38,38,0.9)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--c-ivory)',
        borderRadius: 'var(--radius-card)',
        border: '2px solid var(--c-pink)',
        padding: '4% 5%',
        maxWidth: '48vw',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.5vw,20px)',
        animation: 'scale-in 0.3s ease',
      }}>
        <div style={{ border: '2px solid var(--c-pink)', borderRadius: 'var(--radius-btn)', padding: '0.4em 1.2em', alignSelf: 'center', fontSize: 'var(--fs-tiny)', fontWeight: 700, color: 'var(--c-pink)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Voce dal pubblico
        </div>

        <p style={{ margin: 0, fontFamily: 'Aquawax Fx, sans-serif', fontSize: 'var(--fs-question)', fontWeight: 700, color: 'var(--c-coal)', lineHeight: 1.2 }}>
          {done ? 'Torna alla domanda' : 'Scegli una voce dal pubblico'}
        </p>

        {!done && (
          <p style={{ margin: 0, fontSize: 'var(--fs-label)', color: 'var(--c-coal)' }}>
            Il presentatore sceglie fisicamente una persona dal pubblico.
          </p>
        )}

        {started && !done && (
          <div style={{ width: 'clamp(60px,9vw,110px)', height: 'clamp(60px,9vw,110px)', alignSelf: 'center', position: 'relative' }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--c-warm-gray)" strokeWidth="6" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--c-pink)" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={2 * Math.PI * 42 * (1 - countdown / 20)}
                style={{ transition: 'stroke-dashoffset 0.5s linear' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Aquawax Fx, sans-serif', fontWeight: 800, fontSize: 'clamp(1.2rem,2.5vw,2.5rem)', color: countdown <= 5 ? 'var(--c-orange)' : 'var(--c-coal)' }}>
                {countdown}
              </span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.8em', justifyContent: 'center' }}>
          {!started && !done && (
            <button className="btn-primary" style={{ padding: '0.8em 2.2em', fontSize: 'var(--fs-label)', background: 'var(--c-pink)', borderColor: 'var(--c-pink)' }} onClick={() => setStarted(true)}>
              Avvia il countdown
            </button>
          )}
          {(done || started) && (
            <button className="btn-primary" style={{ padding: '0.8em 2.2em', fontSize: 'var(--fs-label)' }} onClick={onClose}>
              Torna alla domanda
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
