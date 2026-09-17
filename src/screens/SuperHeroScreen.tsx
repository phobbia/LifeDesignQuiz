import { useEffect, useRef, useState } from 'react';
import Traces from '../components/Traces';
import type { Question, HelpType } from '../types';
import TimerArc from '../components/TimerArc';
import HelpButtons from '../components/HelpButtons';
import { ResultModal, SuspenseOverlay, type Outcome } from '../components/Verdict';

const LABELS = ['A', 'B', 'C', 'D'];

interface Props {
  question: Question;
  screen: 'super_question' | 'super_confirm' | 'super_suspense' | 'super_result';
  selectedAnswer: number | null;
  eliminatedAnswers: number[];
  helpsUsed: { fifty: boolean; audience: boolean; pug: boolean };
  helpsAllowed: boolean;
  timerMax: number;
  timerSeconds: number;
  timerActive: boolean;
  timerRunning: boolean;
  prize: string;
  playerName: string;
  onSelectAnswer: (i: number) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onNext: () => void;
  onStartTimer: () => void;
  onToggleTimer: () => void;
  onUseHelp: (h: HelpType) => void;
  onCorrectSound: () => void;
  onWrongSound: () => void;
}

export default function SuperHeroScreen({
  question, screen, selectedAnswer, eliminatedAnswers, helpsUsed, helpsAllowed,
  timerMax, timerSeconds, timerActive, timerRunning, prize, playerName,
  onSelectAnswer, onConfirm, onCancel, onNext, onStartTimer, onToggleTimer,
  onUseHelp, onCorrectSound, onWrongSound,
}: Props) {
  const [answersVisible, setAnswersVisible] = useState<boolean[]>([false, false, false, false]);
  const resultPlayed = useRef(false);
  const isResult = screen === 'super_result';
  const isSuspense = screen === 'super_suspense';
  const isConfirm = screen === 'super_confirm';

  useEffect(() => {
    // Le risposte compaiono una alla volta
    const timers = [0, 1, 2, 3].map(i =>
      setTimeout(() => setAnswersVisible(prev => {
        const next = [...prev];
        next[i] = true;
        return next;
      }), 1200 + i * 280),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (screen === 'super_result' && !resultPlayed.current) {
      resultPlayed.current = true;
      if (selectedAnswer !== null && selectedAnswer >= 0 && selectedAnswer === question.correctAnswer) {
        onCorrectSound();
      } else {
        onWrongSound();
      }
    }
  }, [screen]);

  const cardClass = (i: number) => {
    let cls = 'answer-card';
    if (eliminatedAnswers.includes(i)) return cls + ' eliminated';
    if (isSuspense) {
      return cls + (i === selectedAnswer ? ' pending' : ' dimmed');
    }
    if (isResult) {
      if (i === question.correctAnswer) return cls + ' correct';
      if (i === selectedAnswer && i !== question.correctAnswer) return cls + ' wrong';
      return cls + ' disabled';
    }
    if (isConfirm) {
      if (i === selectedAnswer) return cls + ' selected';
      return cls + ' disabled';
    }
    if (selectedAnswer === i) return cls + ' selected';
    return cls;
  };

  const won = isResult && selectedAnswer === question.correctAnswer;
  const outcome: Outcome =
    selectedAnswer === null || selectedAnswer < 0
      ? 'timeout'
      : selectedAnswer === question.correctAnswer
        ? 'correct'
        : 'wrong';

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--c-coal)',
      display: 'flex',
      flexDirection: 'column',
      padding: 'clamp(16px, 2.3cqw, 44px) clamp(20px, 3.3cqw, 64px)',
      gap: 'clamp(8px, 1cqw, 20px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Tracciati del festival */}
      <Traces variant="open" dark opacity={0.85} />

      {/* TOP BAR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2, flexShrink: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1em' }}>
          <span style={{ fontSize: 'var(--fs-tiny)', color: 'var(--c-warm-gray)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
            Domanda Suprema
          </span>
          <span style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 800,
            fontSize: 'var(--fs-answer)',
            color: 'var(--c-pink)',
            lineHeight: 1,
            animation: 'glow-pulse 2s ease-in-out infinite',
          }}>
            DESIGN SUPER HERO
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.5cqw,20px)' }}>
          {/* Prize */}
          <div style={{
            border: '1px solid color-mix(in srgb, var(--c-pink) 40%, transparent)',
            borderRadius: 'var(--radius-btn)',
            padding: '0.35em 1em',
            fontSize: 'var(--fs-tiny)',
            color: 'var(--c-warm-gray)',
            // Il premio va a capo invece di essere troncato con i puntini:
            // e' l'informazione che tiene incollato il pubblico.
            maxWidth: '30cqw',
            lineHeight: 1.3,
            textAlign: 'right',
          }}>
            <span style={{ opacity: 0.7, letterSpacing: '0.12em' }}>IN PALIO</span>
            <br />
            {prize}
          </div>
          {helpsAllowed && (
            <HelpButtons helpsUsed={helpsUsed} allowed={helpsAllowed} dark onUse={onUseHelp} />
          )}
          {timerMax > 0 && (
            <TimerArc max={timerMax} current={timerSeconds} running={timerRunning} active={timerActive} dark onStart={onStartTimer} onToggle={onToggleTimer} />
          )}
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', gap: '0.8em', alignItems: 'center', zIndex: 2, flexShrink: 0 }}>
        <span style={{ background: 'var(--c-pink)', color: 'white', fontSize: 'var(--fs-tiny)', fontWeight: 700, padding: '0.25em 0.8em', borderRadius: 'var(--radius-btn)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {question.category}
        </span>
        <span style={{ border: '1.5px solid var(--c-pink)', color: 'var(--c-pink)', fontSize: 'var(--fs-tiny)', fontWeight: 600, padding: '0.2em 0.7em', borderRadius: 'var(--radius-btn)' }}>
          {question.difficulty}
        </span>
      </div>

      {/* QUESTION */}
      <div style={{ flex: '0 0 auto', zIndex: 2, maxWidth: '80%' }}>
        <p style={{
          margin: 0,
          fontFamily: 'var(--ff-display)',
          fontSize: 'var(--fs-question)',
          fontWeight: 700,
          color: 'var(--c-ivory)',
          lineHeight: 1.25,
        }}>
          {question.question}
        </p>
      </div>


      {/* ANSWER GRID 2x2 */}
      <div style={{
        // Altezza contenuta: le card non devono riempire tutto lo spazio
        // residuo. Il margine automatico centra la griglia lasciando aria
        // sopra e sotto.
        flex: '0 1 auto',
        height: 'clamp(196px, 30cqh, 330px)',
        maxHeight: '100%',
        margin: 'auto 0',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 'clamp(8px,1.2cqw,16px)',
        zIndex: 2,
        minHeight: 0,
      }}>
        {question.answers.map((ans, i) => (
          <button
            key={i}
            className={cardClass(i)}
            onClick={() => {
              if (screen !== 'super_question') return;
              if (eliminatedAnswers.includes(i)) return;
              onSelectAnswer(i);
            }}
            style={{
              display: 'flex',
              visibility: answersVisible[i] ? 'visible' : 'hidden',
              opacity: answersVisible[i] ? 1 : 0,
              transition: 'opacity 0.4s ease',
              alignItems: 'center',
              gap: 'clamp(10px,1.5cqw,20px)',
              padding: 'clamp(12px,1.5cqw,20px) clamp(16px,2cqw,28px)',
              textAlign: 'left',
              width: '100%',
              height: '100%',
            }}
          >
            <div style={{
              flexShrink: 0,
              width: 'clamp(28px,3.5cqw,48px)',
              height: 'clamp(28px,3.5cqw,48px)',
              borderRadius: '50%',
              border: `2px solid ${isResult && (i === question.correctAnswer || i === selectedAnswer) ? 'var(--c-white)' : 'var(--c-warm-gray)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--ff-display)',
              fontWeight: 800,
              fontSize: 'var(--fs-label)',
              color: 'var(--c-ivory)',
              transition: 'all 0.25s ease',
            }}>
              {LABELS[i]}
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--ff-body)', fontSize: 'var(--fs-answer)', fontWeight: 500, color: 'inherit', lineHeight: 1.3, flex: 1 }}>
              {ans}
            </p>
            {isResult && i === question.correctAnswer && <span style={{ fontSize: '1.3em', flexShrink: 0, color: 'var(--c-white)' }}>✓</span>}
            {isResult && i === selectedAnswer && i !== question.correctAnswer && <span style={{ fontSize: '1.3em', flexShrink: 0, color: 'var(--c-white)' }}>✕</span>}
          </button>
        ))}
      </div>

      {/* CONFIRM */}
      {isConfirm && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          background: 'rgba(38,38,38,0.92)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: 'color-mix(in srgb, var(--c-coal) 80%, var(--c-violet))',
            border: '2px solid var(--c-pink)',
            borderRadius: 'var(--radius-card)',
            padding: '4% 5%',
            textAlign: 'center',
            maxWidth: '44cqw',
            animation: 'scale-in 0.25s ease',
          }}>
            <p style={{ margin: '0 0 0.3em', fontFamily: 'var(--ff-display)', fontSize: 'var(--fs-answer)', fontWeight: 700, color: 'var(--c-ivory)' }}>
              È la tua risposta definitiva?
            </p>
            <p style={{ margin: '0 0 1.5em', fontSize: 'var(--fs-label)', color: 'var(--c-warm-gray)' }}>
              Hai scelto <strong style={{ color: 'var(--c-pink)' }}>{LABELS[selectedAnswer!]}: {question.answers[selectedAnswer!]}</strong>
            </p>
            <div style={{ display: 'flex', gap: '1em', justifyContent: 'center' }}>
              <button className="btn-secondary" style={{ padding: '0.7em 1.8em', fontSize: 'var(--fs-label)', color: 'var(--c-ivory)', borderColor: 'var(--c-warm-gray)' }} onClick={onCancel}>
                Ci ripenso
              </button>
              <button className="btn-primary" style={{ padding: '0.7em 2.2em', fontSize: 'var(--fs-label)', background: 'var(--c-pink)', borderColor: 'var(--c-pink)' }} onClick={onConfirm}>
                Conferma
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ATTESA — i secondi di tensione prima del verdetto */}
      {isSuspense && (
        <SuspenseOverlay
          durationMs={3500}
          label={selectedAnswer !== null && selectedAnswer >= 0 ? LABELS[selectedAnswer] : null}
          dark
        />
      )}

      {/* RESPONSO — modale centrale */}
      {isResult && (
        <ResultModal
          outcome={outcome}
          correctLabel={LABELS[question.correctAnswer]}
          correctText={question.answers[question.correctAnswer]}
          explanation={question.explanation}
          buttonLabel={won ? '🏆 Vittoria →' : 'Fine partita'}
          onNext={onNext}
          dark
        />
      )}

    </div>
  );
}
