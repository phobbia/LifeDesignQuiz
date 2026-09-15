import { useEffect, useState } from 'react';
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
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Animated crossing line */}
        <path
          d="M -200 900 Q 400 200 960 540 Q 1520 880 2120 200"
          fill="none"
          stroke="var(--c-coal)"
          strokeWidth="1.2"
          opacity="0.18"
          strokeDasharray="3000"
          strokeDashoffset={animPhase >= 1 ? 0 : 3000}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <path
          d="M 300 -100 Q 500 400 300 700 Q 100 1000 400 1200"
          fill="none"
          stroke="var(--c-violet)"
          strokeWidth="1"
          opacity={animPhase >= 2 ? 0.22 : 0}
          strokeDasharray="1800"
          strokeDashoffset={animPhase >= 2 ? 0 : 1800}
          style={{ transition: 'stroke-dashoffset 0.8s ease 0.3s, opacity 0.4s ease' }}
        />
        {/* Partial circle */}
        <path
          d="M 1700 540 m -180 0 a 180 180 0 0 1 180 -180"
          fill="none"
          stroke="var(--c-pink)"
          strokeWidth="1.5"
          opacity={animPhase >= 2 ? 0.25 : 0}
          style={{ transition: 'opacity 0.6s ease 0.5s' }}
        />
        {/* Small color block */}
        <rect x="920" y="420" width="36" height="4" rx="2" fill="var(--c-violet)" opacity={animPhase >= 3 ? 0.7 : 0} style={{ transition: 'opacity 0.3s ease' }} />
        <rect x="960" y="635" width="24" height="4" rx="2" fill="var(--c-pink)" opacity={animPhase >= 3 ? 0.6 : 0} style={{ transition: 'opacity 0.3s ease 0.1s' }} />
      </svg>

      {/* Logo top-left */}
      <div style={{
        position: 'absolute',
        top: '4%',
        left: '4%',
        width: 85,
        overflow: 'hidden',
        opacity: animPhase >= 3 ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}>
        <Logo size={6.42} color="var(--c-coal)" />
      </div>

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(12px, 2vw, 24px)',
        width: 'fit-content',
        opacity: animPhase >= 3 ? 1 : 0,
        transform: animPhase >= 3 ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        {/* Title — Quiz Logo SVG */}
        <img
          src={nomeQuizLogoSrc}
          alt="Lascia il segno"
          style={{
            width: 1400,
            height: 'auto',
            display: 'block',
          }}
        />

        {/* Subtitle */}
        <p style={{
          margin: 0,
          fontFamily: '"Aquawax Fx"',
          fontSize: '48px',
          fontWeight: 900,
          color: 'var(--c-coal)',
          opacity: 1,
          letterSpacing: '0.1px',
        }}>
          Il Quiz che nessuno voleva. Tranne i ragazzi del PUG!
        </p>

        {/* Tagline */}
        <p style={{
          margin: 0,
          padding: 0,
          fontFamily: '"Automat Grotesk", sans-serif',
          fontSize: '30px',
          fontWeight: 600,
          color: 'var(--c-coal)',
          opacity: 1,
          width: 'fit-content',
        }}>
          Quattro livelli. Tre aiuti. Una domanda suprema.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '24px 36px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            className="btn-primary"
            style={{ padding: 'clamp(12px,1.2vw,18px) clamp(28px,3vw,48px)', fontSize: '32px', fontFamily: '"Automat Grotesk", sans-serif', fontWeight: 400, letterSpacing: '0.1px', borderRadius: 0 }}
            onClick={onStart}
          >
            INIZIA STO QUIZ!
          </button>
          <button
            className="btn-secondary"
            style={{ padding: 'clamp(12px,1.2vw,18px) clamp(24px,2.5vw,40px)', fontSize: '32px', fontFamily: '"Automat Grotesk", sans-serif', fontWeight: 400, letterSpacing: '0.1px', borderRadius: 0, borderWidth: '2px' }}
            onClick={onRules}
          >
            REGOLAMENTO
          </button>
        </div>

        {/* Bottom text — moved into main content as last child */}
        <p style={{
          margin: 0,
          fontFamily: '"Automat Grotesk", sans-serif',
          fontSize: '20px',
          color: 'var(--c-coal)',
          opacity: 1,
          letterSpacing: '0.1px',
          textAlign: 'center',
        }}>
          Quanto ne sai davvero di design, comunicazione visiva e cultura digitale?
        </p>
      </div>
    </div>
  );
}
