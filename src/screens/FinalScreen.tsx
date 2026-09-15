import type { AnswerRecord, Level } from '../types';
import Traces from '../components/Traces';
import { LEVEL_NAMES } from '../types';
import Logo from '../components/Logo';

const LABELS = ['A', 'B', 'C', 'D'];

interface Props {
  playerName: string;
  level: Level;
  correctCount: number;
  answerHistory: AnswerRecord[];
  helpsUsed: { fifty: boolean; audience: boolean; pug: boolean };
  prize: string;
  won: boolean;
  onNew: () => void;
  onHome: () => void;
}

export default function FinalScreen({ playerName, level, correctCount, answerHistory, helpsUsed, prize, won, onNew, onHome }: Props) {
  const totalQuestions = answerHistory.length;
  const reachedFinal = level === 4;
  const helpsCount = Object.values(helpsUsed).filter(Boolean).length;

  const tagline = won
    ? 'Una traccia impossibile da ignorare.'
    : reachedFinal
    ? 'La traccia c\'è. Il prossimo segno sarà quello decisivo.'
    : 'Ogni grande progetto comincia da una prima traccia.';

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--c-ivory)',
      display: 'flex',
      flexDirection: 'column',
      padding: 'clamp(16px, 1.9cqw, 36px) clamp(24px, 3.2cqw, 62px)',
      gap: 'clamp(10px, 1.3cqw, 26px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decoration */}
      <Traces variant="calm" nodes={false} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3em' }}>
          <div style={{ width: 'clamp(56px, 4.4cqw, 85px)', flexShrink: 0 }}>
            <Logo color="var(--c-coal)" />
          </div>
          <h1 style={{ margin: 0, marginTop: 'clamp(12px, 1.6cqw, 32px)', fontFamily: 'var(--ff-display)', fontSize: 'var(--fs-title)', fontWeight: 800, color: 'var(--c-coal)', lineHeight: 1 }}>
            Riepilogo
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.8em' }}>
          <button className="btn-secondary" style={{ padding: '0.5em 1.4em', fontSize: 'var(--fs-label)' }} onClick={onHome}>
            Home
          </button>
          <button className="btn-primary" style={{ padding: '0.5em 1.4em', fontSize: 'var(--fs-label)' }} onClick={onNew}>
            Nuova partita
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(8px,1.2cqw,16px)', flexShrink: 0 }}>
        {[
          { label: 'Partecipante', value: playerName || '—', color: 'var(--c-coal)' },
          { label: 'Livello raggiunto', value: `${level} — ${LEVEL_NAMES[level]}`, color: 'var(--c-violet)' },
          { label: 'Risposte corrette', value: `${correctCount} / ${totalQuestions}`, color: correctCount === totalQuestions ? 'var(--c-green)' : 'var(--c-coal)' },
          { label: 'Premio', value: won ? prize : reachedFinal ? 'Premio sfiorato' : '—', color: won ? 'var(--c-pink)' : 'var(--c-coal)' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--c-white)',
            border: '1.5px solid var(--c-warm-gray)',
            borderRadius: 'var(--radius-card)',
            padding: '1.2em',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3em',
          }}>
            <p style={{ margin: 0, fontSize: 'var(--fs-tiny)', color: 'var(--c-coal)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
              {s.label}
            </p>
            <p style={{ margin: 0, fontFamily: 'var(--ff-display)', fontSize: 'clamp(13px, 1.2cqw, 23px)', fontWeight: 800, color: s.color, lineHeight: 1.2 }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Answer history */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
        <p style={{ margin: '0 0 0.8em', fontSize: 'var(--fs-label)', fontWeight: 600, color: 'var(--c-coal)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Risposte
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,0.8cqw,10px)' }}>
          {answerHistory.map((record, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(10px,1.5cqw,20px)',
              background: 'var(--c-white)',
              border: `1.5px solid ${record.correct ? 'var(--c-green)' : 'var(--c-red)'}`,
              borderRadius: 'calc(var(--radius-card) * 0.7)',
              padding: '0.8em 1.2em',
            }}>
              <span style={{
                width: 'clamp(20px,2.5cqw,32px)',
                height: 'clamp(20px,2.5cqw,32px)',
                borderRadius: '50%',
                background: record.correct ? 'var(--c-green)' : 'var(--c-red)',
                color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'var(--fs-tiny)', fontWeight: 800, flexShrink: 0,
              }}>
                {record.correct ? '✓' : '✕'}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 'var(--fs-label)', fontWeight: 600, color: 'var(--c-coal)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {record.question}
                </p>
                <p style={{ margin: '0.1em 0 0', fontSize: 'var(--fs-tiny)', color: 'var(--c-coal)' }}>
                  Livello {record.level} — {!record.correct && record.selectedAnswer >= 0 ? `Risposta ${LABELS[record.selectedAnswer]} (errata)` : record.selectedAnswer < 0 ? 'Tempo scaduto' : `Risposta ${LABELS[record.selectedAnswer]} ✓`}
                </p>
              </div>
              <span style={{
                fontSize: 'var(--fs-tiny)',
                color: record.correct ? 'var(--c-green)' : 'var(--c-red)',
                fontWeight: 700,
                flexShrink: 0,
              }}>
                {LEVEL_NAMES[record.level as Level]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tagline + helps */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <p style={{ margin: 0, fontFamily: 'var(--ff-display)', fontSize: 'var(--fs-answer)', fontWeight: 600, color: 'var(--c-coal)', fontStyle: 'italic' }}>
          "{tagline}"
        </p>
        <p style={{ margin: 0, fontSize: 'var(--fs-tiny)', color: 'var(--c-coal)' }}>
          {helpsCount === 0 ? 'Nessun aiuto utilizzato' : helpsCount === 1 ? '1 aiuto utilizzato' : `${helpsCount} aiuti utilizzati`}
        </p>
      </div>
    </div>
  );
}
