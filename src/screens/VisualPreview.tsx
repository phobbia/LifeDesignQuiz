/**
 * ─── Anteprima delle domande visive ───
 *
 * Pagina di servizio, raggiungibile con `?anteprima` nell'indirizzo.
 * Mostra una alla volta le domande che usano campioni tipografici,
 * renderizzate con la schermata di gioco vera (non con una finta):
 * quello che si vede qui è esattamente quello che vedrà la sala.
 *
 * Serve a valutare i contenuti senza dover giocare una partita intera
 * sperando che la domanda esca.
 */

import { useState } from 'react';
import type { Level, Question } from '../types';
import { questions } from '../data/questions';
import QuestionScreen from './QuestionScreen';

const visualQuestions = questions.filter(q => q.visual || q.answerVisuals);

const noop = () => {};

export default function VisualPreview({ stageScale }: { stageScale: number }) {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (visualQuestions.length === 0) {
    return (
      <div className="game-stage" style={{ display: 'grid', placeItems: 'center', color: 'var(--c-ivory)' }}>
        <p>Nessuna domanda con campioni visivi in archivio.</p>
      </div>
    );
  }

  const q: Question = visualQuestions[index];
  const level = Math.min(q.stage, 3) as 1 | 2 | 3;
  const go = (delta: number) => {
    setIndex((index + delta + visualQuestions.length) % visualQuestions.length);
    setShowAnswer(false);
  };

  return (
    <div className="game-stage" style={{ ['--stage-scale' as string]: stageScale }}>
      <div className="game-viewport" key={`${q.id}-${showAnswer}`}>
        <QuestionScreen
          question={q}
          level={level}
          screen={showAnswer ? 'result' : 'question'}
          selectedAnswer={showAnswer ? q.correctAnswer : null}
          eliminatedAnswers={[]}
          helpsUsed={{ fifty: false, audience: false, pug: false }}
          helpsAllowed
          timerMax={0}
          timerSeconds={0}
          timerActive={false}
          timerRunning={false}
          correctCount={0}
          onSelectAnswer={() => setShowAnswer(true)}
          onConfirm={noop}
          onCancel={noop}
          onNext={() => go(1)}
          onStartTimer={noop}
          onToggleTimer={noop}
          onUseHelp={noop}
          onCorrectSound={noop}
          onWrongSound={noop}
        />
      </div>

      {/* Barra di navigazione dell'anteprima (non fa parte del gioco) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 16,
          transform: 'translateX(-50%)',
          zIndex: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 14px',
          borderRadius: 999,
          background: 'rgba(38,38,38,0.92)',
          border: '1px solid rgba(244,239,230,0.25)',
          color: 'var(--c-ivory)',
          fontFamily: 'var(--ff-body)',
          fontSize: 13,
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        }}
      >
        <PreviewButton onClick={() => go(-1)}>‹</PreviewButton>
        <span style={{ minWidth: 190, textAlign: 'center', letterSpacing: '0.04em' }}>
          {index + 1}/{visualQuestions.length} — livello {q.stage} — {q.category}
        </span>
        <PreviewButton onClick={() => go(1)}>›</PreviewButton>
        <PreviewButton onClick={() => setShowAnswer(v => !v)} wide>
          {showAnswer ? 'Nascondi soluzione' : 'Mostra soluzione'}
        </PreviewButton>
        <a
          href="/"
          style={{
            color: 'var(--c-warm-gray)',
            textDecoration: 'none',
            fontSize: 12,
            paddingLeft: 4,
            borderLeft: '1px solid rgba(244,239,230,0.25)',
            marginLeft: 2,
          }}
        >
          esci
        </a>
      </div>
    </div>
  );
}

function PreviewButton({
  children,
  onClick,
  wide = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  wide?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'rgba(244,239,230,0.1)',
        border: '1px solid rgba(244,239,230,0.3)',
        color: 'var(--c-ivory)',
        borderRadius: 999,
        padding: wide ? '6px 14px' : '6px 11px',
        cursor: 'pointer',
        fontFamily: 'var(--ff-body)',
        fontSize: 13,
        lineHeight: 1,
      }}
    >
      {children}
    </button>
  );
}
