import { useState } from 'react';

interface Props {
  participants: string[];
  onClose: () => void;
  onSelect: (name: string) => void;
}

export default function ExtractionOverlay({ participants, onClose, onSelect }: Props) {
  const [rolling, setRolling] = useState(false);
  const [current, setCurrent] = useState('');
  const [final, setFinal] = useState('');

  const extract = () => {
    if (participants.length === 0 || rolling) return;
    setRolling(true);
    setFinal('');
    let count = 0;
    const interval = setInterval(() => {
      setCurrent(participants[Math.floor(Math.random() * participants.length)]);
      count++;
      if (count > 20) {
        clearInterval(interval);
        const result = participants[Math.floor(Math.random() * participants.length)];
        setCurrent(result);
        setFinal(result);
        setRolling(false);
      }
    }, 160);
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 80,
      background: 'rgba(38,38,38,0.9)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--c-ivory)',
        borderRadius: 'var(--radius-card)',
        border: '2px solid var(--c-violet)',
        padding: '4% 5%',
        maxWidth: '50cqw',
        minWidth: '40cqw',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.8cqw,24px)',
        animation: 'scale-in 0.3s ease',
      }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--ff-display)', fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--c-coal)' }}>
          Estrazione
        </h2>

        <div style={{
          minHeight: 'clamp(60px,8cqw,100px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `2px solid ${final ? 'var(--c-violet)' : 'var(--c-warm-gray)'}`,
          borderRadius: 'var(--radius-card)',
          padding: '1em',
          transition: 'border-color 0.3s ease',
          background: final ? 'color-mix(in srgb, var(--c-violet) 8%, var(--c-white))' : 'var(--c-white)',
        }}>
          {current ? (
            <p style={{
              margin: 0,
              fontFamily: 'var(--ff-display)',
              fontSize: 'var(--fs-question)',
              fontWeight: 800,
              color: 'var(--c-coal)',
              animation: rolling ? 'roll-flicker 0.16s var(--ease-soft) infinite' : final ? 'verdict-pop 0.45s var(--ease-back)' : 'none',
            }}>
              {current}
            </p>
          ) : (
            <p style={{ margin: 0, fontSize: 'var(--fs-label)', color: 'var(--c-coal)' }}>
              Premi il pulsante per estrarre
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.8em', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn-primary"
            style={{ padding: '0.8em 2.2em', fontSize: 'var(--fs-label)' }}
            onClick={extract}
            disabled={rolling}
          >
            {rolling ? 'Estrazione in corso...' : final ? 'Riestrarre' : 'Estrai'}
          </button>
          {final && (
            <button
              className="btn-primary"
              style={{ padding: '0.8em 2.2em', fontSize: 'var(--fs-label)', background: 'var(--c-violet)', borderColor: 'var(--c-violet)' }}
              onClick={() => onSelect(final)}
            >
              Conferma {final}
            </button>
          )}
          <button className="btn-secondary" style={{ padding: '0.8em 1.6em', fontSize: 'var(--fs-label)' }} onClick={onClose}>
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}
