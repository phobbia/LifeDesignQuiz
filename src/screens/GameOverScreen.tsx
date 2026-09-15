import type { Question, Level } from '../types';
import Traces from '../components/Traces';
import { LEVEL_NAMES } from '../types';

interface Props {
  question: Question;
  selectedAnswer: number;
  level: Level;
  onEnd: () => void;
  onNew: () => void;
}

const LABELS = ['A', 'B', 'C', 'D'];

export default function GameOverScreen({ question, selectedAnswer, level, onEnd, onNew }: Props) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--c-ivory)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(12px,2cqw,28px)',
      padding: 'clamp(20px, 2.5cqw, 48px) clamp(32px, 6.5cqw, 125px)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decoration */}
      <Traces variant="calm" />

      {/* Stop badge */}
      <div style={{
        border: '2px solid var(--c-orange)',
        borderRadius: 'var(--radius-btn)',
        padding: '0.4em 1.4em',
        fontFamily: 'var(--ff-body)',
        fontWeight: 700,
        fontSize: 'var(--fs-label)',
        color: 'var(--c-orange)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        animation: 'fade-in 0.4s ease',
        zIndex: 2,
      }}>
        Livello {level} — {LEVEL_NAMES[level]}
      </div>

      {/* Main title */}
      <h1 style={{
        margin: 0,
        fontFamily: 'var(--ff-display)',
        fontSize: 'var(--fs-display)',
        fontWeight: 800,
        color: 'var(--c-coal)',
        lineHeight: 0.95,
        letterSpacing: '-0.02em',
        animation: 'slide-up 0.5s ease',
        zIndex: 2,
      }}>
        Questa traccia
        <br />
        <span style={{ color: 'var(--c-orange)' }}>si interrompe qui</span>
      </h1>

      {/* Correct answer reveal */}
      <div style={{
        background: 'color-mix(in srgb, var(--c-green) 10%, var(--c-white))',
        border: '2px solid var(--c-green)',
        borderRadius: 'var(--radius-card)',
        padding: '2% 3.5%',
        maxWidth: '60cqw',
        animation: 'scale-in 0.5s ease 0.3s both',
        zIndex: 2,
      }}>
        <p style={{ margin: '0 0 0.4em', fontSize: 'var(--fs-label)', color: 'var(--c-green)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          La risposta corretta era
        </p>
        <p style={{
          margin: '0 0 0.4em',
          fontFamily: 'var(--ff-display)',
          fontSize: 'var(--fs-answer)',
          fontWeight: 700,
          color: 'var(--c-coal)',
        }}>
          {LABELS[question.correctAnswer]}: {question.answers[question.correctAnswer]}
        </p>
        <p style={{ margin: 0, fontSize: 'var(--fs-label)', color: 'var(--c-coal)', lineHeight: 1.4 }}>
          {question.explanation}
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 'clamp(8px,1cqw,16px)', flexWrap: 'wrap', justifyContent: 'center', zIndex: 2 }}>
        <button className="btn-secondary" style={{ padding: '0.7em 1.8em', fontSize: 'var(--fs-label)' }} onClick={onEnd}>
          Chiudi la partita
        </button>
        <button className="btn-primary" style={{ padding: '0.7em 1.8em', fontSize: 'var(--fs-label)' }} onClick={onNew}>
          Nuova partita
        </button>
      </div>

      <p style={{ margin: 0, fontSize: 'var(--fs-tiny)', color: 'var(--c-coal)', zIndex: 2 }}>
        Ogni grande progetto comincia da una prima traccia.
      </p>
    </div>
  );
}
