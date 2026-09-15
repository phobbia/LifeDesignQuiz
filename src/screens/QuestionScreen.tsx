import { useEffect, useRef } from 'react';
import type { Question, Level, HelpType } from '../types';
import { LEVEL_NAMES, LEVEL_COLORS } from '../types';
import ProgressTrack from '../components/ProgressTrack';
import TimerArc from '../components/TimerArc';
import HelpButtons from '../components/HelpButtons';
import { LogoCompact } from '../components/Logo';

const LABELS = ['A', 'B', 'C', 'D'];

interface Props {
  question: Question;
  level: 1 | 2 | 3;
  screen: 'question' | 'confirm' | 'result';
  selectedAnswer: number | null;
  eliminatedAnswers: number[];
  helpsUsed: { fifty: boolean; audience: boolean; pug: boolean };
  helpsAllowed: boolean;
  timerMax: number;
  timerSeconds: number;
  timerActive: boolean;
  timerRunning: boolean;
  correctCount: number;
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

export default function QuestionScreen({
  question, level, screen, selectedAnswer, eliminatedAnswers,
  helpsUsed, helpsAllowed, timerMax, timerSeconds, timerActive, timerRunning,
  correctCount, onSelectAnswer, onConfirm, onCancel, onNext,
  onStartTimer, onToggleTimer, onUseHelp, onCorrectSound, onWrongSound,
}: Props) {
  const resultPlayed = useRef(false);

  useEffect(() => {
    if (screen === 'result' && !resultPlayed.current) {
      resultPlayed.current = true;
      const last = selectedAnswer;
      if (last === null || last < 0) { onWrongSound(); return; }
      if (last === question.correctAnswer) onCorrectSound();
      else onWrongSound();
    }
    if (screen !== 'result') resultPlayed.current = false;
  }, [screen]);

  const accentColor = LEVEL_COLORS[level];
  const isResult = screen === 'result';
  const isConfirm = screen === 'confirm';

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

  // Level-specific decorative complexity
  const showSecondaryLines = level >= 2;
  const showArcs = level >= 3;

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--c-ivory)',
      display: 'flex',
      flexDirection: 'column',
      padding: '64px',
      rowGap: '28px',
      columnGap: '1.5%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative SVG background - evolves per level */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <path d="M -50 900 Q 300 600 600 700 Q 900 800 1200 500 Q 1500 200 1970 400" fill="none" stroke="var(--c-warm-gray)" strokeWidth="1" opacity="0.25" />
        {showSecondaryLines && (
          <>
            <path d="M 0 300 Q 400 500 800 200 Q 1200 -100 1920 300" fill="none" stroke="var(--c-pink)" strokeWidth="0.8" opacity="0.15" />
            <rect x="820" y="52" width="20" height="3" rx="1.5" fill="var(--c-pink)" opacity="0.5" />
          </>
        )}
        {showArcs && (
          <>
            <path d="M 1700 1080 Q 1900 700 1700 300 Q 1500 -100 1900 100" fill="none" stroke="var(--c-violet)" strokeWidth="1" opacity="0.15" />
            <path d="M 50 0 Q -50 300 100 600" fill="none" stroke="var(--c-orange)" strokeWidth="1" opacity="0.12" />
            <rect x="1120" y="48" width="14" height="3" rx="1.5" fill="var(--c-violet)" opacity="0.6" />
          </>
        )}
      </svg>

      {/* TOP BAR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2, flexShrink: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2em' }}>
          <div style={{ width: 85, overflow: 'hidden', flexShrink: 0 }}>
            <LogoCompact size={65} color="var(--c-coal)" />
          </div>
          {/* Level badge */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '0.1em',
            fontFamily: 'Aquawax Fx, sans-serif',
          }}>
            <span style={{ fontSize: 'var(--fs-tiny)', color: 'var(--c-coal)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
              Livello {level}
            </span>
            <span style={{ fontFamily: 'Aquawax Fx, sans-serif', fontWeight: 800, fontSize: 'var(--fs-answer)', color: accentColor, lineHeight: 1 }}>
              {LEVEL_NAMES[level]}
            </span>
          </div>
        </div>

        {/* Progress + Timer + Helps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.5vw,20px)' }}>
          <HelpButtons helpsUsed={helpsUsed} allowed={helpsAllowed} onUse={onUseHelp} />
          {timerMax > 0 && (
            <TimerArc
              max={timerMax}
              current={timerSeconds}
              running={timerRunning}
              active={timerActive}
              onStart={onStartTimer}
              onToggle={onToggleTimer}
            />
          )}
        </div>
      </div>

      {/* Progress track */}
      <div style={{ zIndex: 2, flexShrink: 0, paddingBottom: '0.5%' }}>
        <ProgressTrack level={level} correctCount={correctCount} />
      </div>

      {/* Meta: category + difficulty */}
      <div style={{ display: 'flex', gap: '0.8em', alignItems: 'center', zIndex: 2, flexShrink: 0 }}>
        <span style={{
          background: accentColor,
          color: 'white',
          fontSize: '16px',
          fontWeight: 700,
          padding: '0.25em 0.8em',
          borderRadius: 'var(--radius-btn)',
          letterSpacing: '0.1px',
          textTransform: 'uppercase',
        }}>{question.category}</span>
        <span style={{
          border: '1px solid rgb(25, 159, 47)',
          color: 'rgb(25, 159, 47)',
          fontSize: '16px',
          fontWeight: 600,
          padding: '0.2em 0.7em',
          borderRadius: 'var(--radius-btn)',
          letterSpacing: '0.1px',
        }}>LIVELLO FACILE</span>
      </div>

      {/* QUESTION */}
      <div style={{ flex: '0 0 auto', zIndex: 2, maxWidth: '78%' }}>
        <p style={{
          margin: 0,
          fontFamily: 'Aquawax Fx, sans-serif',
          fontSize: '48px',
          fontWeight: 900,
          color: 'var(--c-coal)',
          lineHeight: 1.25,
        }}>
          {question.question}
        </p>
      </div>

      {/* ANSWER GRID 2x2 */}
      <div style={{
        flexGrow: 0,
        flexBasis: 'auto',
        height: 'fit-content',
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
              if (screen !== 'question') return;
              if (eliminatedAnswers.includes(i)) return;
              onSelectAnswer(i);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(10px,1.5vw,20px)',
              padding: 'clamp(14px,1.4vw,22px) clamp(16px,2vw,28px)',
              textAlign: 'left',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Label badge */}
            <div style={{
              flexShrink: 0,
              width: 'clamp(28px,3.5vw,48px)',
              height: 'clamp(28px,3.5vw,48px)',
              borderRadius: '50%',
              border: `2px solid ${isResult && i === question.correctAnswer ? 'var(--c-violet)' : isResult && i === selectedAnswer ? 'var(--c-orange)' : 'var(--c-warm-gray)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Aquawax Fx, sans-serif',
              fontWeight: 800,
              fontSize: 'var(--fs-label)',
              color: isResult && i === question.correctAnswer ? 'var(--c-violet)' : isResult && i === selectedAnswer ? 'var(--c-orange)' : 'var(--c-coal)',
              transition: 'all 0.25s ease',
            }}>
              {LABELS[i]}
            </div>

            {/* Answer text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                margin: 0,
                fontFamily: 'Automat Grotesk, sans-serif',
                fontSize: 'var(--fs-answer)',
                fontWeight: 500,
                color: 'var(--c-coal)',
                lineHeight: 1.3,
              }}>
                {ans}
              </p>
            </div>

            {/* Result icon */}
            {isResult && i === question.correctAnswer && (
              <span style={{ fontSize: '1.3em', flexShrink: 0, color: 'var(--c-violet)' }}>✓</span>
            )}
            {isResult && i === selectedAnswer && i !== question.correctAnswer && (
              <span style={{ fontSize: '1.3em', flexShrink: 0, color: 'var(--c-orange)' }}>✕</span>
            )}
          </button>
        ))}
      </div>

      {/* CONFIRM DIALOG */}
      {isConfirm && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          background: 'rgba(244,239,230,0.92)', backdropFilter: 'blur(3px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: 'var(--c-white)',
            borderRadius: 'var(--radius-card)',
            border: '2px solid var(--c-coal)',
            padding: '4% 5%',
            textAlign: 'center',
            maxWidth: '44vw',
            animation: 'scale-in 0.25s ease',
          }}>
            <p style={{
              margin: '0 0 0.3em',
              fontFamily: 'Aquawax Fx, sans-serif',
              fontSize: 'var(--fs-answer)',
              fontWeight: 700,
              color: 'var(--c-coal)',
            }}>
              È la tua risposta definitiva?
            </p>
            <p style={{
              margin: '0 0 1.5em',
              fontFamily: 'Automat Grotesk, sans-serif',
              fontSize: 'var(--fs-label)',
              color: 'var(--c-coal)',
            }}>
              Hai scelto <strong style={{ color: 'var(--c-violet)' }}>{LABELS[selectedAnswer!]}: {question.answers[selectedAnswer!]}</strong>
            </p>
            <div style={{ display: 'flex', gap: '1em', justifyContent: 'center' }}>
              <button className="btn-secondary" style={{ padding: '0.7em 1.8em', fontSize: 'var(--fs-label)' }} onClick={onCancel}>
                Ci ripenso
              </button>
              <button className="btn-primary" style={{ padding: '0.7em 2.2em', fontSize: 'var(--fs-label)' }} onClick={onConfirm}>
                Conferma
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESULT OVERLAY */}
      {isResult && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          background: selectedAnswer === question.correctAnswer
            ? 'color-mix(in srgb, var(--c-violet) 15%, var(--c-ivory))'
            : 'color-mix(in srgb, var(--c-orange) 12%, var(--c-ivory))',
          borderTop: `3px solid ${selectedAnswer === question.correctAnswer ? 'var(--c-violet)' : 'var(--c-orange)'}`,
          padding: '2% 4%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2em',
          animation: 'slide-up 0.4s ease',
        }}>
          <div style={{ flex: 1 }}>
            <p style={{
              margin: '0 0 0.25em',
              fontFamily: 'Aquawax Fx, sans-serif',
              fontWeight: 800,
              fontSize: 'var(--fs-answer)',
              color: selectedAnswer === question.correctAnswer ? 'var(--c-violet)' : 'var(--c-orange)',
              letterSpacing: '0.08em',
            }}>
              {selectedAnswer === null || selectedAnswer < 0
                ? 'TEMPO SCADUTO'
                : selectedAnswer === question.correctAnswer ? '✓ CORRETTA' : '✕ ERRATA'}
            </p>
            <p style={{
              margin: 0,
              fontFamily: 'Automat Grotesk, sans-serif',
              fontSize: 'var(--fs-label)',
              color: 'var(--c-coal)',
              maxWidth: '60vw',
              lineHeight: 1.4,
            }}>
              {question.explanation}
            </p>
          </div>
          <button
            className="btn-primary"
            style={{ padding: '0.8em 2.2em', fontSize: 'var(--fs-label)', flexShrink: 0 }}
            onClick={onNext}
          >
            {selectedAnswer === question.correctAnswer ? 'Avanti →' : 'Fine'}
          </button>
        </div>
      )}
    </div>
  );
}

function clamp(min: number, vw: number, max: number) {
  return `clamp(${min}px, ${vw}vw, ${max}px)` as unknown as number;
}
