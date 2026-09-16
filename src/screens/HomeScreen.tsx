import { useEffect, useState } from 'react';
import Traces from '../components/Traces';
import Logo from '../components/Logo';
import nomeQuizLogoSrc from '../imports/Quiz-Logo-1-v3.svg';

interface Props { onStart: () => void; onRules: () => void }

export default function HomeScreen({ onStart, onRules }: Props) {
  const [animPhase, setAnimPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimPhase(1), 400);
    const t2 = setTimeout(() => setAnimPhase(2), 1000);
    const t3 = setTimeout(() => setAnimPhase(3), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'var(--c-ivory)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Animated line decoration */}
      <Traces variant="full" />

      {/* Logo top-left */}
      <div style={{
        position: 'absolute',
        top: '4%',
        left: '4%',
        width: 'clamp(56px, 4.4cqw, 85px)',
        opacity: animPhase >= 3 ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}>
        <Logo color="var(--c-coal)" />
      </div>

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(12px, 1.4cqw, 26px)',
        width: '100%',
        maxWidth: '84cqw',
        padding: '0 4cqw',
        opacity: animPhase >= 3 ? 1 : 0,
        transform: animPhase >= 3 ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        {/* Title — Quiz Logo SVG */}
        <img
          src={nomeQuizLogoSrc}
          alt="Quiz pensato male! Venuto peggio! Ma per questo ci piace un sacco!"
          style={{
            width: '100%',
            maxWidth: 1400,
            height: 'auto',
            display: 'block',
          }}
        />

        {/* Subtitle */}
        <p style={{
          margin: 0,
          fontFamily: 'var(--ff-display)',
          fontSize: 'clamp(20px, 2.5cqw, 48px)',
          fontWeight: 900,
          color: 'var(--c-coal)',
          letterSpacing: '-0.01em',
          lineHeight: 1.1,
        }}>
          Il Quiz che nessuno voleva. Tranne i ragazzi del PUG!
        </p>

        {/* Tagline */}
        <p style={{
          margin: 0,
          padding: 0,
          fontFamily: 'var(--ff-body)',
          fontSize: 'clamp(15px, 1.56cqw, 30px)',
          fontWeight: 600,
          color: 'var(--c-coal)',
          letterSpacing: '0.01em',
        }}>
          Quattro livelli. Tre aiuti. Una domanda suprema.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 'clamp(12px,1.9cqw,36px)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            className="btn-primary"
            style={{ padding: 'clamp(12px,1.2cqw,18px) clamp(28px,3cqw,48px)', fontSize: 'clamp(16px,1.67cqw,32px)', fontWeight: 600, letterSpacing: '0.04em', borderRadius: 0 }}
            onClick={onStart}
          >
            INIZIA STO QUIZ!
          </button>
          <button
            className="btn-secondary"
            style={{ padding: 'clamp(12px,1.2cqw,18px) clamp(24px,2.5cqw,40px)', fontSize: 'clamp(16px,1.67cqw,32px)', fontWeight: 600, letterSpacing: '0.04em', borderRadius: 0, borderWidth: '2px' }}
            onClick={onRules}
          >
            REGOLAMENTO
          </button>
        </div>

        {/* Bottom text — moved into main content as last child */}
        <p style={{
          margin: 0,
          fontFamily: 'var(--ff-body)',
          fontSize: 'clamp(12px, 1.05cqw, 20px)',
          fontWeight: 400,
          color: 'var(--c-coal)',
          letterSpacing: '0.02em',
          textAlign: 'center',
        }}>
          Quanto ne sai davvero di design, comunicazione visiva e cultura digitale?
        </p>
      </div>
    </div>
  );
}
