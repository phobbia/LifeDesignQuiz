import { useEffect, useState } from 'react';

/**
 * ─── Attesa e responso ───
 *
 * Due sovrapposizioni modali condivise fra la schermata standard e quella
 * della domanda suprema, così il comportamento è identico in tutti i livelli.
 *
 * `SuspenseOverlay` copre i secondi fra la conferma e il verdetto: le card
 * restano visibili sotto, la scelta pulsa, il resto si spegne.
 *
 * `ResultModal` mostra l'esito al centro dello schermo. È una modale e non
 * un pannello in basso perché il pannello, comparendo, comprimeva la griglia
 * delle risposte e ne tagliava il testo.
 */

interface SuspenseProps {
  /** Durata dell'attesa in millisecondi, per sincronizzare l'anello. */
  durationMs: number;
  /** Lettera della risposta scelta (A/B/C/D), se presente. */
  label?: string | null;
  dark?: boolean;
}

export function SuspenseOverlay({ durationMs, label, dark = false }: SuspenseProps) {
  const r = 46;
  const circumference = 2 * Math.PI * r;
  const accent = dark ? 'var(--c-pink)' : 'var(--c-violet)';
  const text = dark ? 'var(--c-ivory)' : 'var(--c-coal)';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(10px, 1.2cqw, 24px)',
        background: dark ? 'rgba(38,38,38,0.72)' : 'rgba(244,239,230,0.72)',
        backdropFilter: 'blur(2px)',
        animation: 'fade-in 0.25s ease',
      }}
    >
      <div style={{ position: 'relative', width: 'clamp(90px, 9cqw, 170px)', height: 'clamp(90px, 9cqw, 170px)' }}>
        <svg viewBox="0 0 110 110" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
          <circle
            cx="55"
            cy="55"
            r={r}
            fill="none"
            stroke={dark ? 'rgba(244,239,230,0.2)' : 'rgba(38,38,38,0.15)'}
            strokeWidth="5"
          />
          <circle
            cx="55"
            cy="55"
            r={r}
            fill="none"
            stroke={accent}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{
              animation: `verdict-ring ${durationMs}ms linear forwards`,
              ['--verdict-circumference' as string]: `${circumference}`,
            }}
          />
        </svg>
        {label && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--ff-display)',
              fontWeight: 900,
              fontSize: 'clamp(26px, 3cqw, 58px)',
              color: accent,
              lineHeight: 1,
            }}
          >
            {label}
          </div>
        )}
      </div>

      <p
        style={{
          margin: 0,
          fontFamily: 'var(--ff-display)',
          fontWeight: 800,
          fontSize: 'clamp(20px, 2.2cqw, 44px)',
          color: text,
          letterSpacing: '0.02em',
          animation: 'glow-pulse 1.1s ease-in-out infinite',
        }}
      >
        Vediamo…
      </p>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--ff-body)',
          fontSize: 'clamp(12px, 1.05cqw, 20px)',
          color: dark ? 'var(--c-warm-gray)' : 'var(--c-coal)',
          opacity: 0.75,
        }}
      >
        Risposta registrata
      </p>
    </div>
  );
}

export type Outcome = 'correct' | 'wrong' | 'timeout';

interface ResultProps {
  outcome: Outcome;
  /** Testo della risposta corretta, mostrato quando si è sbagliato. */
  correctLabel: string;
  correctText: string;
  explanation: string;
  buttonLabel: string;
  onNext: () => void;
  dark?: boolean;
}

export function ResultModal({
  outcome,
  correctLabel,
  correctText,
  explanation,
  buttonLabel,
  onNext,
  dark = false,
}: ResultProps) {
  // Breve periodo di grazia: un clic o un Invio partiti un istante prima
  // non devono chiudere il verdetto appena comparso.
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setArmed(true), 700);
    return () => clearTimeout(t);
  }, []);
  const isCorrect = outcome === 'correct';
  const accent = isCorrect ? 'var(--c-green)' : outcome === 'timeout' ? 'var(--c-orange)' : 'var(--c-red)';
  const panelBg = dark ? 'color-mix(in srgb, var(--c-coal) 88%, var(--c-white))' : 'var(--c-white)';
  const textColor = dark ? 'var(--c-ivory)' : 'var(--c-coal)';
  const mutedColor = dark ? 'var(--c-warm-gray)' : 'var(--c-coal)';

  const title = outcome === 'timeout' ? 'TEMPO SCADUTO' : isCorrect ? 'CORRETTA' : 'ERRATA';
  const glyph = outcome === 'timeout' ? '⏱' : isCorrect ? '✓' : '✕';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 3cqw, 58px)',
        background: dark ? 'rgba(38,38,38,0.78)' : 'rgba(38,38,38,0.45)',
        backdropFilter: 'blur(4px)',
        animation: 'fade-in 0.25s ease',
      }}
    >
      <div
        style={{
          background: panelBg,
          border: `3px solid ${accent}`,
          borderRadius: 'var(--radius-card)',
          boxShadow: `0 0 0 8px color-mix(in srgb, ${accent} 18%, transparent), 0 30px 70px rgba(0,0,0,0.35)`,
          padding: 'clamp(20px, 2.6cqw, 50px) clamp(24px, 3.2cqw, 62px)',
          maxWidth: 'min(1080px, 62cqw)',
          width: '100%',
          maxHeight: '86cqh',
          overflowY: 'auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(10px, 1.1cqw, 22px)',
          animation: isCorrect ? 'verdict-pop 0.45s ease' : 'verdict-shake 0.45s ease',
        }}
      >
        {/* Emblema dell'esito */}
        <div
          style={{
            width: 'clamp(54px, 5cqw, 96px)',
            height: 'clamp(54px, 5cqw, 96px)',
            borderRadius: '50%',
            background: accent,
            color: 'var(--c-white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(28px, 2.7cqw, 52px)',
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          {glyph}
        </div>

        <p
          style={{
            margin: 0,
            fontFamily: 'var(--ff-display)',
            fontWeight: 900,
            fontSize: 'clamp(26px, 3.1cqw, 60px)',
            color: accent,
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}
        >
          {title}
        </p>

        {!isCorrect && (
          <div
            style={{
              borderRadius: 'calc(var(--radius-card) * 0.7)',
              border: '2px solid var(--c-green)',
              background: 'color-mix(in srgb, var(--c-green) 12%, transparent)',
              padding: 'clamp(10px, 1cqw, 20px) clamp(14px, 1.5cqw, 30px)',
              width: '100%',
            }}
          >
            <p
              style={{
                margin: '0 0 0.3em',
                fontFamily: 'var(--ff-body)',
                fontSize: 'var(--fs-tiny)',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--c-green)',
              }}
            >
              La risposta corretta era
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--ff-display)',
                fontWeight: 700,
                fontSize: 'clamp(15px, 1.5cqw, 30px)',
                color: textColor,
                lineHeight: 1.2,
              }}
            >
              {correctLabel}: {correctText}
            </p>
          </div>
        )}

        <p
          style={{
            margin: 0,
            fontFamily: 'var(--ff-body)',
            fontSize: 'clamp(13px, 1.2cqw, 23px)',
            color: mutedColor,
            lineHeight: 1.45,
            maxWidth: '52ch',
          }}
        >
          {explanation}
        </p>

        <button
          className="btn-primary"
          style={{
            marginTop: 'clamp(4px, 0.5cqw, 10px)',
            padding: 'clamp(10px, 0.9cqw, 18px) clamp(28px, 2.8cqw, 54px)',
            fontSize: 'clamp(14px, 1.2cqw, 24px)',
            fontWeight: 700,
            background: accent,
            borderColor: accent,
            color: 'var(--c-white)',
            // Niente aspetto disabilitato: il pulsante resta pieno, ma non
            // reagisce finché il verdetto non è rimasto a schermo abbastanza.
            pointerEvents: armed ? 'auto' : 'none',
          }}
          onClick={onNext}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
