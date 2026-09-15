import type { Question } from '../types';
import Traces from '../components/Traces';

interface Props {
  question: Question;
  selectedAnswer: number;
  onEnd: () => void;
  onNew: () => void;
}

const LABELS = ['A', 'B', 'C', 'D'];

export default function DefeatScreen({ question, selectedAnswer, onEnd, onNew }: Props) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--c-coal)',
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
      <Traces variant="focus" dark />

      {/* Badge */}
      <div style={{
        border: '2px solid var(--c-pink)',
        borderRadius: 'var(--radius-btn)',
        padding: '0.4em 1.4em',
        fontFamily: 'var(--ff-body)',
        fontWeight: 700,
        fontSize: 'var(--fs-label)',
        color: 'var(--c-pink)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        animation: 'fade-in 0.4s ease',
        zIndex: 2,
      }}>
        Super Hero Designer
      </div>

      {/* Main title */}
      <h1 style={{
        margin: 0,
        fontFamily: 'var(--ff-display)',
        fontSize: 'var(--fs-display)',
        fontWeight: 800,
        color: 'var(--c-ivory)',
        lineHeight: 0.9,
        letterSpacing: '-0.02em',
        animation: 'slide-up 0.5s ease',
        zIndex: 2,
      }}>
        ANCHE GLI HERO
        <br />
        <span style={{ color: 'var(--c-pink)' }}>RIDISEGNANO</span>
        <br />
        LA ROTTA
      </h1>

      <p style={{ margin: 0, fontSize: 'var(--fs-answer)', color: 'var(--c-warm-gray)', opacity: 0.75, animation: 'fade-in 0.5s ease 0.2s both', zIndex: 2 }}>
        Sei arrivato fino alla domanda suprema.
      </p>

      {/* Correct answer reveal */}
      <div style={{
        background: 'color-mix(in srgb, var(--c-green) 18%, var(--c-coal))',
        border: '2px solid var(--c-green)',
        borderRadius: 'var(--radius-card)',
        padding: '2% 3.5%',
        maxWidth: '60cqw',
        animation: 'scale-in 0.5s ease 0.4s both',
        zIndex: 2,
      }}>
        <p style={{ margin: '0 0 0.4em', fontSize: 'var(--fs-label)', color: 'var(--c-green)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          La risposta corretta era
        </p>
        <p style={{ margin: '0 0 0.4em', fontFamily: 'var(--ff-display)', fontSize: 'var(--fs-answer)', fontWeight: 700, color: 'var(--c-ivory)' }}>
          {LABELS[question.correctAnswer]}: {question.answers[question.correctAnswer]}
        </p>
        <p style={{ margin: 0, fontSize: 'var(--fs-label)', color: 'var(--c-warm-gray)', lineHeight: 1.4 }}>
          {question.explanation}
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1em', flexWrap: 'wrap', justifyContent: 'center', zIndex: 2 }}>
        <button className="btn-secondary" style={{ padding: '0.7em 1.8em', fontSize: 'var(--fs-label)', color: 'var(--c-ivory)', borderColor: 'var(--c-warm-gray)' }} onClick={onEnd}>
          Riepilogo
        </button>
        <button className="btn-primary" style={{ padding: '0.7em 1.8em', fontSize: 'var(--fs-label)', background: 'var(--c-pink)', borderColor: 'var(--c-pink)' }} onClick={onNew}>
          Nuova partita
        </button>
      </div>

      <p style={{ margin: 0, fontSize: 'var(--fs-tiny)', color: 'var(--c-warm-gray)', zIndex: 2 }}>
        La traccia c'è. Il prossimo segno sarà quello decisivo.
      </p>
    </div>
  );
}
