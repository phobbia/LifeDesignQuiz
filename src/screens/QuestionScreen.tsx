import { useEffect, useRef } from 'react';
import Traces from '../components/Traces';
import type { Question, HelpType } from '../types';
import { LEVEL_NAMES, LEVEL_COLORS } from '../types';
import ProgressTrack from '../components/ProgressTrack';
import TimerArc from '../components/TimerArc';
import HelpButtons from '../components/HelpButtons';
import { LogoCompact } from '../components/Logo';
import { renderVisual } from '../data/visuals';
import { ResultModal, SuspenseOverlay, type Outcome } from '../components/Verdict';

const LABELS = ['A', 'B', 'C', 'D'];

const DIFFICULTY_COLORS: Record<string, string> = {
  Accessibile: '#1F9A3C',
  Media: '#C98A12',
  Avanzata: 'var(--c-orange)',
  Suprema: 'var(--c-pink)',
};


interface Props {
  question: Question;
  level: 1 | 2 | 3;
  screen: 'question' | 'confirm' | 'suspense' | 'result';
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
  const isSuspense = screen === 'suspense';
  const outcome: Outcome =
    selectedAnswer === null || selectedAnswer < 0
      ? 'timeout'
      : selectedAnswer === question.correctAnswer
        ? 'correct'
        : 'wrong';
  const difficultyColor = DIFFICULTY_COLORS[question.difficulty] ?? 'var(--c-violet)';
  // Domande con quattro campioni visivi al posto delle risposte testuali:
  // servono card più alte e un'altra impaginazione interna.
  const visualAnswers = question.answerVisuals;
  const questionVisual = renderVisual(question.visual);
  const isResult = screen === 'result';
  const isConfirm = screen === 'confirm';

  const cardClass = (i: number) => {
    let cls = 'answer-card';
    if (eliminatedAnswers.includes(i)) return cls + ' eliminated';
    if (isSuspense) {
      // Durante l'attesa la scelta pulsa, le altre si spengono.
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

  // Level-specific decorative complexity
  const showSecondaryLines = level >= 2;
  const showArcs = level >= 3;

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--c-ivory)',
      display: 'flex',
      flexDirection: 'column',
      padding: 'clamp(24px, 3.3cqw, 64px)',
      rowGap: 'clamp(10px, 1.45cqw, 28px)',
      columnGap: '1.5%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative SVG background - evolves per level */}
      <Traces variant="open" opacity={0.9} />

      {/* TOP BAR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2, flexShrink: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2em' }}>
          <LogoCompact size={65} color="var(--c-coal)" />
          {/* Level badge */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1em' }}>
            <span style={{ fontFamily: 'var(--ff-body)', fontSize: 'var(--fs-tiny)', color: 'var(--c-coal)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
              Livello {level}
            </span>
            <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 800, fontSize: 'var(--fs-answer)', color: accentColor, lineHeight: 1 }}>
              {LEVEL_NAMES[level]}
            </span>
          </div>
        </div>

        {/* Progress + Timer + Helps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.5cqw,20px)' }}>
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
          fontFamily: 'var(--ff-body)',
          fontSize: 'clamp(11px, 0.84cqw, 16px)',
          fontWeight: 700,
          padding: '0.25em 0.8em',
          borderRadius: 'var(--radius-btn)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>{question.category}</span>
        <span style={{
          border: `1px solid ${difficultyColor}`,
          color: difficultyColor,
          fontFamily: 'var(--ff-body)',
          fontSize: 'clamp(11px, 0.84cqw, 16px)',
          fontWeight: 600,
          padding: '0.2em 0.7em',
          borderRadius: 'var(--radius-btn)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>Difficoltà {question.difficulty}</span>
      </div>

      {/* QUESTION */}
      <div style={{ flex: '0 0 auto', zIndex: 2, maxWidth: '78%' }}>
        <p style={{
          margin: 0,
          fontFamily: 'var(--ff-display)',
          fontSize: 'clamp(22px, 2.5cqw, 48px)',
          fontWeight: 900,
          color: 'var(--c-coal)',
          lineHeight: 1.2,
        }}>
          {question.question}
        </p>
      </div>

      {/* Campione visivo a corredo della domanda */}
      {questionVisual && (
        <div style={{ zIndex: 2, flexShrink: 0, display: 'flex', justifyContent: 'flex-start' }}>
          {questionVisual}
        </div>
      )}

      {/* ANSWER GRID 2x2 */}
      <div style={{
        // Altezza contenuta: le card non devono riempire tutto lo spazio
        // residuo. Il margine automatico centra la griglia lasciando aria
        // sopra e sotto.
        flex: '0 1 auto',
        height: visualAnswers
          ? 'clamp(230px, 38cqh, 420px)'
          : questionVisual
            ? 'clamp(150px, 23cqh, 250px)'
            : 'clamp(196px, 30cqh, 330px)',
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
              if (screen !== 'question') return;
              if (eliminatedAnswers.includes(i)) return;
              onSelectAnswer(i);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(10px,1.5cqw,20px)',
              padding: 'clamp(14px,1.4cqw,22px) clamp(16px,2cqw,28px)',
              textAlign: 'left',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Label badge */}
            <div style={{
              flexShrink: 0,
              width: 'clamp(28px,3.5cqw,48px)',
              height: 'clamp(28px,3.5cqw,48px)',
              borderRadius: '50%',
              border: `2px solid ${isResult && i === question.correctAnswer ? 'var(--c-white)' : isResult && i === selectedAnswer ? 'var(--c-white)' : 'var(--c-warm-gray)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--ff-display)',
              fontWeight: 800,
              fontSize: 'var(--fs-label)',
              color: isResult && (i === question.correctAnswer || i === selectedAnswer) ? 'var(--c-white)' : 'var(--c-coal)',
              transition: 'all 0.25s ease',
            }}>
              {LABELS[i]}
            </div>

            {/* Campione visivo, oppure testo della risposta */}
            <div style={{ flex: 1, minWidth: 0, minHeight: 0, height: visualAnswers ? '100%' : undefined, color: 'inherit' }}>
              {visualAnswers ? (
                renderVisual(visualAnswers[i])
              ) : (
                <p style={{
                  margin: 0,
                  fontFamily: 'var(--ff-body)',
                  fontSize: 'var(--fs-answer)',
                  fontWeight: 500,
                  color: 'inherit',
                  lineHeight: 1.3,
                }}>
                  {ans}
                </p>
              )}
            </div>

            {/* Result icon */}
            {isResult && i === question.correctAnswer && (
              <span style={{ fontSize: '1.3em', flexShrink: 0, color: 'var(--c-white)' }}>✓</span>
            )}
            {isResult && i === selectedAnswer && i !== question.correctAnswer && (
              <span style={{ fontSize: '1.3em', flexShrink: 0, color: 'var(--c-white)' }}>✕</span>
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
            maxWidth: '44cqw',
            animation: 'scale-in 0.25s ease',
          }}>
            <p style={{
              margin: '0 0 0.3em',
              fontFamily: 'var(--ff-display)',
              fontSize: 'var(--fs-answer)',
              fontWeight: 700,
              color: 'var(--c-coal)',
            }}>
              È la tua risposta definitiva?
            </p>
            <p style={{
              margin: '0 0 1.5em',
              fontFamily: 'var(--ff-body)',
              fontSize: 'var(--fs-label)',
              color: 'var(--c-coal)',
            }}>
              Hai scelto{' '}
              <strong style={{ color: 'var(--c-violet)' }}>
                {visualAnswers ? `l'opzione ${LABELS[selectedAnswer!]}` : `${LABELS[selectedAnswer!]}: ${question.answers[selectedAnswer!]}`}
              </strong>
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

      {/* ATTESA — i secondi di tensione prima del verdetto */}
      {isSuspense && (
        <SuspenseOverlay
          durationMs={3500}
          label={selectedAnswer !== null && selectedAnswer >= 0 ? LABELS[selectedAnswer] : null}
        />
      )}

      {/* RESPONSO — modale centrale */}
      {isResult && (
        <ResultModal
          outcome={outcome}
          correctLabel={LABELS[question.correctAnswer]}
          correctText={question.answers[question.correctAnswer]}
          explanation={question.explanation}
          buttonLabel={outcome === 'correct' ? 'Avanti →' : 'Continua'}
          onNext={onNext}
        />
      )}

    </div>
  );
}

