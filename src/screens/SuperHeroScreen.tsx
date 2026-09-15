import { useEffect, useRef, useState } from 'react';
import type { Question, HelpType } from '../types';
import TimerArc from '../components/TimerArc';
import HelpButtons from '../components/HelpButtons';

const LABELS = ['A', 'B', 'C', 'D'];

interface Props {
  question: Question;
  screen: 'super_question' | 'super_confirm' | 'super_result';
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
  const isConfirm = screen === 'super_confirm';

  useEffect(() => {
    // Answers appear one by one
    [0, 1, 2, 3].forEach(i => {
      setTimeout(() => setAnswersVisible(prev => {
        const next = [...prev];
        next[i] = true;
        return next;
      }), 2000 + i * 280);
    });
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

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--c-coal)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2.5% 3.5%',
      gap: '1.5%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Traccia incandescente background */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        {/* Bottom rising curves */}
        <path d="M 200 1200 Q 400 900 600 600 Q 800 300 1000 200" fill="none" stroke="var(--c-pink)" strokeWidth="1.2" opacity="0.2" style={{ animation: 'incandescent 1.8s ease-in-out infinite' }} />
        <path d="M 1720 1200 Q 1500 850 1400 600 Q 1300 350 1100 200" fill="none" stroke="var(--c-violet)" strokeWidth="1.2" opacity="0.2" style={{ animation: 'incandescent 1.8s ease-in-out infinite', animationDelay: '0.4s' }} />
        <path d="M 960 1200 Q 900 900 960 600" fill="none" stroke="var(--c-orange)" strokeWidth="1" opacity="0.15" style={{ animation: 'incandescent 1.8s ease-in-out infinite', animationDelay: '0.8s' }} />
        {/* Top frame line */}
        <path d="M 0 100 Q 480 60 960 100 Q 1440 140 1920 100" fill="none" stroke="color-mix(in srgb, var(--c-pink) 40%, transparent)" strokeWidth="1" opacity="0.4" />
        {/* Color rects */}
        <rect x="100" y="96" width="20" height="4" rx="2" fill="var(--c-pink)" opacity="0.6" />
        <rect x="1800" y="96" width="20" height="4" rx="2" fill="var(--c-violet)" opacity="0.6" />
      </svg>

      {/* TOP BAR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2, flexShrink: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1em' }}>
          <span style={{ fontSize: 'var(--fs-tiny)', color: 'var(--c-warm-gray)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
            Domanda Suprema
          </span>
          <span style={{
            fontFamily: 'Aquawax Fx, sans-serif',
            fontWeight: 800,
            fontSize: 'var(--fs-answer)',
            color: 'var(--c-pink)',
            lineHeight: 1,
            animation: 'glow-pulse 2s ease-in-out infinite',
          }}>
            DESIGN SUPER HERO
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.5vw,20px)' }}>
          {/* Prize */}
          <div style={{
            border: '1px solid color-mix(in srgb, var(--c-pink) 40%, transparent)',
            borderRadius: 'var(--radius-btn)',
            padding: '0.3em 1em',
            fontSize: 'var(--fs-tiny)',
            color: 'var(--c-warm-gray)',
            whiteSpace: 'nowrap',
            maxWidth: '22vw',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            IN PALIO — {prize}
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
          fontFamily: 'Aquawax Fx, sans-serif',
          fontSize: 'var(--fs-question)',
          fontWeight: 700,
          color: 'var(--c-ivory)',
          lineHeight: 1.25,
        }}>
          {question.question}
        </p>
      </div>

      {/* Reasoning hint */}
      {question.reasoningHint && (
        <p style={{ margin: 0, fontSize: 'var(--fs-tiny)', color: 'var(--c-warm-gray)', fontStyle: 'italic', zIndex: 2, flexShrink: 0 }}>
          Suggerimento: {question.reasoningHint}
        </p>
      )}

      {/* ANSWER GRID 2x2 */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 'clamp(8px,1.2vw,16px)',
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
              display: answersVisible[i] ? 'flex' : 'none',
              alignItems: 'center',
              gap: 'clamp(10px,1.5vw,20px)',
              padding: 'clamp(12px,1.5vw,20px) clamp(16px,2vw,28px)',
              textAlign: 'left',
              width: '100%',
              height: '100%',
              animation: answersVisible[i] ? 'fade-in 0.4s ease' : 'none',
            }}
          >
            <div style={{
              flexShrink: 0,
              width: 'clamp(28px,3.5vw,48px)',
              height: 'clamp(28px,3.5vw,48px)',
              borderRadius: '50%',
              border: `2px solid ${isResult && i === question.correctAnswer ? 'var(--c-pink)' : isResult && i === selectedAnswer ? 'var(--c-orange)' : 'var(--c-warm-gray)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Aquawax Fx, sans-serif',
              fontWeight: 800,
              fontSize: 'var(--fs-label)',
              color: 'var(--c-ivory)',
              transition: 'all 0.25s ease',
            }}>
              {LABELS[i]}
            </div>
            <p style={{ margin: 0, fontFamily: 'Automat Grotesk, sans-serif', fontSize: 'var(--fs-answer)', fontWeight: 500, color: 'var(--c-ivory)', lineHeight: 1.3, flex: 1 }}>
              {ans}
            </p>
            {isResult && i === question.correctAnswer && <span style={{ fontSize: '1.3em', flexShrink: 0, color: 'var(--c-pink)' }}>✓</span>}
            {isResult && i === selectedAnswer && i !== question.correctAnswer && <span style={{ fontSize: '1.3em', flexShrink: 0, color: 'var(--c-orange)' }}>✕</span>}
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
            maxWidth: '44vw',
            animation: 'scale-in 0.25s ease',
          }}>
            <p style={{ margin: '0 0 0.3em', fontFamily: 'Aquawax Fx, sans-serif', fontSize: 'var(--fs-answer)', fontWeight: 700, color: 'var(--c-ivory)' }}>
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

      {/* RESULT OVERLAY */}
      {isResult && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
          background: won
            ? 'color-mix(in srgb, var(--c-pink) 18%, var(--c-coal))'
            : 'color-mix(in srgb, var(--c-orange) 15%, var(--c-coal))',
          borderTop: `3px solid ${won ? 'var(--c-pink)' : 'var(--c-orange)'}`,
          padding: '2% 4%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2em',
          animation: 'slide-up 0.4s ease',
        }}>
          <div style={{ flex: 1 }}>
            <p style={{
              margin: '0 0 0.25em',
              fontFamily: 'Aquawax Fx, sans-serif',
              fontWeight: 800,
              fontSize: 'var(--fs-answer)',
              color: won ? 'var(--c-pink)' : 'var(--c-orange)',
              letterSpacing: '0.08em',
            }}>
              {selectedAnswer === null || selectedAnswer < 0 ? 'TEMPO SCADUTO' : won ? '✓ CORRETTA' : '✕ ERRATA'}
            </p>
            <p style={{ margin: 0, fontSize: 'var(--fs-label)', color: 'var(--c-ivory)', maxWidth: '60vw', lineHeight: 1.4 }}>
              {question.explanation}
            </p>
          </div>
          <button
            className="btn-primary"
            style={{ padding: '0.8em 2.2em', fontSize: 'var(--fs-label)', flexShrink: 0, background: won ? 'var(--c-pink)' : 'var(--c-ivory)', borderColor: won ? 'var(--c-pink)' : 'var(--c-ivory)', color: won ? 'white' : 'var(--c-coal)' }}
            onClick={onNext}
          >
            {won ? '🏆 Vittoria →' : 'Fine partita'}
          </button>
        </div>
      )}
    </div>
  );
}
