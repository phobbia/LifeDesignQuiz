import { useEffect, useRef } from 'react';
import Logo from '../components/Logo';

interface Props {
  playerName: string;
  correctCount: number;
  totalQuestions: number;
  prize: string;
  onEnd: () => void;
}

const CONFETTI_COLORS = ['#BF3A3A', '#6B4FBB', '#E87D3E', '#F4EFE6', '#332421'];
const CONFETTI_COUNT = 80;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export default function CelebrateScreen({ playerName, correctCount, totalQuestions, prize, onEnd }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const pieces = Array.from({ length: CONFETTI_COUNT }, () => ({
      x: randomBetween(0, canvas.width),
      y: randomBetween(-canvas.height * 0.5, -10),
      w: randomBetween(8, 18),
      h: randomBetween(4, 9),
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      vx: randomBetween(-1.5, 1.5),
      vy: randomBetween(2.5, 5),
      angle: randomBetween(0, Math.PI * 2),
      spin: randomBetween(-0.08, 0.08),
      opacity: randomBetween(0.7, 1),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pieces) {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        p.vy += 0.04; // gravity

        if (p.y > canvas.height + 20) {
          p.y = randomBetween(-80, -10);
          p.x = randomBetween(0, canvas.width);
          p.vy = randomBetween(2.5, 5);
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--c-coal)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(20px,2.5vw,36px)',
      padding: '4%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Close button */}
      <button
        onClick={onEnd}
        style={{
          position: 'absolute', top: '3%', right: '3%',
          zIndex: 10,
          width: 44, height: 44,
          borderRadius: '50%',
          border: '2px solid rgba(244,239,230,0.4)',
          background: 'rgba(244,239,230,0.08)',
          color: '#F4EFE6',
          fontSize: 22,
          fontWeight: 300,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          lineHeight: 1,
          fontFamily: 'sans-serif',
          transition: 'background 0.2s',
        }}
        aria-label="Chiudi"
      >
        ×
      </button>

      {/* Share card */}
      <div style={{
        background: 'var(--c-ivory)',
        borderRadius: 'clamp(16px,2vw,28px)',
        paddingTop: 48,
        paddingRight: 64,
        paddingBottom: 48,
        paddingLeft: 64,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 32,
        columnGap: 24,
        textAlign: 'center',
        width: 680,
        height: 'fit-content',
        position: 'relative',
        zIndex: 2,
        boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 32px 80px rgba(0,0,0,0.45)',
      }}>
        {/* Logo */}
        <div style={{ width: 85 }}>
          <Logo color="var(--c-coal)" />
        </div>

        {/* Badge */}
        <div style={{
          background: 'var(--c-pink)',
          color: 'var(--c-pink)',
          borderRadius: 100,
          padding: '0.4em 1.6em',
        }}>
          <span style={{
            fontFamily: 'Automat Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: 32,
            color: 'var(--c-coal)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}>
            Super Hero Designer
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          margin: 0,
          fontFamily: 'Aquawax Fx, sans-serif',
          fontWeight: 800,
          fontSize: 'var(--fs-display)',
          color: 'var(--c-coal)',
          lineHeight: 0.95,
          letterSpacing: '-1.5px',
        }}>
          {playerName || 'Campione'}
        </h1>

        {/* Score + Prize */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 24, columnGap: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15em' }}>
            <span style={{
              fontFamily: 'Aquawax Fx, sans-serif',
              fontWeight: 800,
              fontSize: 120,
              letterSpacing: 1,
              color: 'var(--c-violet)',
              lineHeight: 1,
            }}>
              {correctCount}/{totalQuestions}
            </span>
            <span style={{
              fontFamily: 'Automat Grotesk, sans-serif',
              fontWeight: 600,
              fontSize: 'var(--fs-tiny)',
              color: 'var(--c-coal)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Risposte esatte
            </span>
          </div>

          <div style={{ width: 496, height: 2, background: 'rgba(38,38,38,0.12)', color: 'var(--c-coal)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15em' }}>
            <span style={{
              fontFamily: 'Aquawax Fx, sans-serif',
              fontWeight: 800,
              fontSize: 120,
              letterSpacing: 1,
              color: 'var(--c-pink)',
              lineHeight: 1,
            }}>
              🏆
            </span>
            <span style={{
              fontFamily: 'Automat Grotesk, sans-serif',
              fontWeight: 600,
              fontSize: 'var(--fs-tiny)',
              color: 'var(--c-coal)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {prize || 'Premio'}
            </span>
          </div>
        </div>
      </div>

      {/* Instagram callout — fuori dalla card */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4em',
        textAlign: 'center',
      }}>
        <span style={{
          fontFamily: 'Automat Grotesk, sans-serif',
          fontWeight: 600,
          fontSize: 19,
          color: '#F4EFE6',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          opacity: 1,
        }}>
          Fai una foto e condividi su Instagram
        </span>
        <div style={{ display: 'flex', gap: '1.2em', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['@life.designfestival', '@pugdesignfest'].map(tag => (
            <span key={tag} style={{
              fontFamily: 'Automat Grotesk, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(16px,1.8vw,26px)',
              color: '#F4EFE6',
              letterSpacing: '0.05em',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
