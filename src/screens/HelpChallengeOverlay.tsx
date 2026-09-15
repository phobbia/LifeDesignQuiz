import { useEffect, useState } from 'react';
import type { HelpType } from '../types';

interface Props {
  helpType: HelpType;
  onComplete: () => void;
  onSkip: () => void;
}

const challenges = [
  'Mima uno swipe, un pinch o un drag e fallo indovinare.',
  'Nomina tre font sans-serif.',
  'Disegna nell\'aria un\'icona riconoscibile.',
  'Descrivi un brand famoso senza dire il suo nome.',
  'Indica tre elementi sul palco dello stesso colore.',
  'Spiega la differenza tra logo e brand in una frase.',
  'Nomina tre principi di buona usabilità.',
  'Trasforma un oggetto sul palco in un pittogramma con le mani.',
];

const helpLabels: Record<HelpType, string> = {
  fifty: '50:50',
  audience: 'Voce dal pubblico',
  pug: 'Chiedi al PUG!',
};

export default function HelpChallengeOverlay({ helpType, onComplete, onSkip }: Props) {
  const [challenge] = useState(() => challenges[Math.floor(Math.random() * challenges.length)]);
  const [countdown, setCountdown] = useState(10);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, started]);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: 'rgba(38,38,38,0.92)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--c-ivory)',
        borderRadius: 'var(--radius-card)',
        border: '2px solid var(--c-violet)',
        padding: '4% 5%',
        maxWidth: '52cqw',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(10px,1.5cqw,20px)',
        animation: 'scale-in 0.3s ease',
      }}>
        {/* Badge */}
        <div style={{
          border: '2px solid var(--c-violet)',
          borderRadius: 'var(--radius-btn)',
          padding: '0.4em 1.2em',
          alignSelf: 'center',
          fontSize: 'var(--fs-tiny)',
          fontWeight: 700,
          color: 'var(--c-violet)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          Prima, lascia il segno
        </div>

        <p style={{ margin: 0, fontFamily: 'var(--ff-body)', fontSize: 'var(--fs-label)', color: 'var(--c-coal)' }}>
          Per sbloccare <strong style={{ color: 'var(--c-violet)' }}>{helpLabels[helpType]}</strong>, completa questa sfida:
        </p>

        {/* Challenge text */}
        <p style={{
          margin: 0,
          fontFamily: 'var(--ff-display)',
          fontSize: 'var(--fs-question)',
          fontWeight: 700,
          color: 'var(--c-coal)',
          lineHeight: 1.2,
        }}>
          {challenge}
        </p>

        {/* Countdown */}
        {started && (
          <div style={{
            width: 'clamp(60px,8cqw,100px)',
            height: 'clamp(60px,8cqw,100px)',
            alignSelf: 'center',
            position: 'relative',
          }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--c-warm-gray)" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="var(--c-violet)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={2 * Math.PI * 42 * (1 - countdown / 10)}
                style={{ transition: 'stroke-dashoffset 0.5s linear' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 800, fontSize: 'clamp(1.2rem,2.5cqw,2.5rem)', color: countdown <= 3 ? 'var(--c-orange)' : 'var(--c-coal)' }}>
                {countdown}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.8em', justifyContent: 'center', flexWrap: 'wrap' }}>
          {!started ? (
            <button
              className="btn-primary"
              style={{ padding: '0.8em 2.2em', fontSize: 'var(--fs-label)' }}
              onClick={() => setStarted(true)}
            >
              Inizia la sfida
            </button>
          ) : (
            <button
              className="btn-primary"
              style={{ padding: '0.8em 2.2em', fontSize: 'var(--fs-label)' }}
              onClick={onComplete}
            >
              Sfida completata
            </button>
          )}
          <button
            className="btn-secondary"
            style={{ padding: '0.8em 1.6em', fontSize: 'var(--fs-label)' }}
            onClick={onSkip}
          >
            Salta
          </button>
        </div>
      </div>
    </div>
  );
}
