import { useReducer, useEffect, useCallback, useRef, useState } from 'react';
import type { GameState, Screen, HelpType, Level, Settings } from './types';
import { defaultSettings, LEVEL_NAMES } from './types';
import { getRandomQuestion } from './data/questions';
import * as Audio from './audio';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import RulesScreen from './screens/RulesScreen';
import QuestionScreen from './screens/QuestionScreen';
import LevelUpScreen from './screens/LevelUpScreen';
import GameOverScreen from './screens/GameOverScreen';
import SuperUnlockScreen from './screens/SuperUnlockScreen';
import SuperHeroScreen from './screens/SuperHeroScreen';
import VictoryScreen from './screens/VictoryScreen';
import CelebrateScreen from './screens/CelebrateScreen';
import DefeatScreen from './screens/DefeatScreen';
import FinalScreen from './screens/FinalScreen';
import HelpChallengeOverlay from './screens/HelpChallengeOverlay';
import HelpAudienceOverlay from './screens/HelpAudienceOverlay';
import HelpPugOverlay from './screens/HelpPugOverlay';
import KeyboardHelp from './components/KeyboardHelp';
import ResetConfirm from './components/ResetConfirm';
import ExtractionOverlay from './screens/ExtractionOverlay';

const STORAGE_KEY = 'lascia-il-segno-v1';

const initialState: GameState = {
  screen: 'home',
  level: 1,
  currentQuestion: null,
  usedQuestionIds: [],
  selectedAnswer: null,
  eliminatedAnswers: [],
  helpsUsed: { fifty: false, audience: false, pug: false },
  settings: defaultSettings,
  correctCount: 0,
  answerHistory: [],
  secondChanceGiven: false,
  helpChallengeFor: null,
  showKeyboardHelp: false,
  pendingReset: false,
  timerActive: false,
  timerRunning: false,
  timerSeconds: 0,
  resumeGame: false,
};

type Action =
  | { type: 'GOTO'; screen: Screen }
  | { type: 'START_GAME' }
  | { type: 'LOAD_QUESTION'; level: Level }
  | { type: 'SELECT_ANSWER'; index: number }
  | { type: 'CONFIRM_ANSWER' }
  | { type: 'CANCEL_CONFIRM' }
  | { type: 'REVEAL_RESULT' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'USE_HELP'; help: HelpType }
  | { type: 'HELP_CHALLENGE_COMPLETE' }
  | { type: 'HELP_CHALLENGE_SKIP' }
  | { type: 'CLOSE_HELP_OVERLAY' }
  | { type: 'APPLY_FIFTY' }
  | { type: 'START_TIMER' }
  | { type: 'STOP_TIMER' }
  | { type: 'TICK' }
  | { type: 'TIMER_EXPIRED' }
  | { type: 'SECOND_CHANCE' }
  | { type: 'END_GAME' }
  | { type: 'NEW_GAME' }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<Settings> }
  | { type: 'TOGGLE_KEYBOARD_HELP' }
  | { type: 'REQUEST_RESET' }
  | { type: 'CANCEL_RESET' }
  | { type: 'CONFIRM_RESET' }
  | { type: 'LOAD_SAVED'; state: GameState };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'GOTO':
      return { ...state, screen: action.screen };

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.settings } };

    case 'START_GAME': {
      const q = getRandomQuestion(1, []);
      return {
        ...initialState,
        settings: state.settings,
        screen: 'question',
        level: 1,
        currentQuestion: q,
        usedQuestionIds: q ? [q.id] : [],
        timerSeconds: state.settings.timerSeconds,
        timerActive: false,
        timerRunning: false,
      };
    }

    case 'LOAD_QUESTION': {
      const q = getRandomQuestion(action.level, state.usedQuestionIds);
      if (!q) return state;
      const isSuperHero = action.level === 4;
      return {
        ...state,
        screen: isSuperHero ? 'super_question' : 'question',
        level: action.level,
        currentQuestion: q,
        usedQuestionIds: [...state.usedQuestionIds, q.id],
        selectedAnswer: null,
        eliminatedAnswers: [],
        timerSeconds: state.settings.timerSeconds,
        timerActive: false,
        timerRunning: false,
      };
    }

    case 'SELECT_ANSWER':
      if (state.selectedAnswer !== null || state.eliminatedAnswers.includes(action.index)) return state;
      return {
        ...state,
        selectedAnswer: action.index,
        screen: state.screen === 'super_question' ? 'super_confirm' : 'confirm',
        timerRunning: false,
      };

    case 'CANCEL_CONFIRM':
      return {
        ...state,
        selectedAnswer: null,
        screen: state.screen === 'super_confirm' ? 'super_question' : 'question',
        timerRunning: state.timerActive,
      };

    case 'CONFIRM_ANSWER': {
      const q = state.currentQuestion!;
      const correct = state.selectedAnswer === q.correctAnswer;
      const record = {
        questionId: q.id,
        level: state.level,
        question: q.question,
        selectedAnswer: state.selectedAnswer!,
        correctAnswer: q.correctAnswer,
        correct,
      };
      return {
        ...state,
        screen: state.level === 4 ? 'super_result' : 'result',
        correctCount: correct ? state.correctCount + 1 : state.correctCount,
        answerHistory: [...state.answerHistory, record],
        timerRunning: false,
      };
    }

    case 'REVEAL_RESULT':
      return state;

    case 'NEXT_LEVEL': {
      const lastRecord = state.answerHistory[state.answerHistory.length - 1];
      if (!lastRecord?.correct) {
        return { ...state, screen: 'game_over' };
      }
      if (state.level === 3) {
        return { ...state, screen: 'super_unlock' };
      }
      return { ...state, screen: 'level_up' };
    }

    case 'USE_HELP': {
      if (state.helpsUsed[action.help]) return state;
      if (action.help === 'fifty') {
        if (state.settings.helpChallenge) {
          return { ...state, screen: 'help_challenge', helpChallengeFor: 'fifty', timerRunning: false };
        }
        return applyFifty(state);
      }
      if (action.help === 'audience') {
        if (state.settings.helpChallenge) {
          return { ...state, screen: 'help_challenge', helpChallengeFor: 'audience', timerRunning: false };
        }
        return { ...state, screen: 'help_audience', helpsUsed: { ...state.helpsUsed, audience: true }, timerRunning: false };
      }
      if (action.help === 'pug') {
        if (state.settings.helpChallenge) {
          return { ...state, screen: 'help_challenge', helpChallengeFor: 'pug', timerRunning: false };
        }
        return { ...state, screen: 'help_pug', helpsUsed: { ...state.helpsUsed, pug: true }, timerRunning: false };
      }
      return state;
    }

    case 'HELP_CHALLENGE_COMPLETE': {
      const help = state.helpChallengeFor!;
      if (help === 'fifty') return applyFifty({ ...state, helpChallengeFor: null });
      if (help === 'audience') return { ...state, screen: 'help_audience', helpsUsed: { ...state.helpsUsed, audience: true }, helpChallengeFor: null };
      if (help === 'pug') return { ...state, screen: 'help_pug', helpsUsed: { ...state.helpsUsed, pug: true }, helpChallengeFor: null };
      return state;
    }

    case 'HELP_CHALLENGE_SKIP': {
      const help = state.helpChallengeFor!;
      if (help === 'fifty') return applyFifty({ ...state, helpChallengeFor: null });
      if (help === 'audience') return { ...state, screen: 'help_audience', helpsUsed: { ...state.helpsUsed, audience: true }, helpChallengeFor: null };
      if (help === 'pug') return { ...state, screen: 'help_pug', helpsUsed: { ...state.helpsUsed, pug: true }, helpChallengeFor: null };
      return state;
    }

    case 'CLOSE_HELP_OVERLAY': {
      const prev = state.level === 4 ? 'super_question' : 'question';
      return { ...state, screen: prev, timerRunning: state.timerActive };
    }

    case 'APPLY_FIFTY':
      return applyFifty(state);

    case 'START_TIMER':
      return { ...state, timerActive: true, timerRunning: true };

    case 'STOP_TIMER':
      return { ...state, timerRunning: false };

    case 'TICK':
      if (!state.timerRunning || state.timerSeconds <= 0) return state;
      return { ...state, timerSeconds: state.timerSeconds - 1 };

    case 'TIMER_EXPIRED': {
      const q = state.currentQuestion!;
      const record = {
        questionId: q.id,
        level: state.level,
        question: q.question,
        selectedAnswer: -1,
        correctAnswer: q.correctAnswer,
        correct: false,
      };
      return {
        ...state,
        selectedAnswer: -1,
        screen: state.level === 4 ? 'super_result' : 'result',
        timerRunning: false,
        answerHistory: [...state.answerHistory, record],
      };
    }

    case 'SECOND_CHANCE':
      return { ...state, screen: 'question', secondChanceGiven: true, selectedAnswer: null, timerSeconds: state.settings.timerSeconds };

    case 'END_GAME':
      return { ...state, screen: 'final' };

    case 'NEW_GAME': {
      const newState = { ...initialState, settings: state.settings };
      localStorage.removeItem(STORAGE_KEY);
      return newState;
    }

    case 'TOGGLE_KEYBOARD_HELP':
      return { ...state, showKeyboardHelp: !state.showKeyboardHelp };

    case 'REQUEST_RESET':
      return { ...state, pendingReset: true };

    case 'CANCEL_RESET':
      return { ...state, pendingReset: false };

    case 'CONFIRM_RESET': {
      localStorage.removeItem(STORAGE_KEY);
      return { ...initialState };
    }

    case 'LOAD_SAVED':
      return { ...action.state, resumeGame: false };

    default:
      return state;
  }
}

function applyFifty(state: GameState): GameState {
  const q = state.currentQuestion!;
  const wrong = [0, 1, 2, 3].filter(i => i !== q.correctAnswer);
  const shuffled = wrong.sort(() => Math.random() - 0.5);
  const toEliminate = shuffled.slice(0, 2);
  const prev = state.level === 4 ? 'super_question' : 'question';
  return {
    ...state,
    screen: prev,
    eliminatedAnswers: toEliminate,
    helpsUsed: { ...state.helpsUsed, fifty: true },
    timerRunning: state.timerActive,
  };
}

function saveState(state: GameState) {
  try {
    if (['home', 'settings', 'rules', 'final'].includes(state.screen)) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch (_) {}
}

function loadState(): GameState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as GameState;
  } catch (_) {
    return null;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showResume, setShowResume] = useState(false);
  const [savedState, setSavedState] = useState<GameState | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check for saved game on mount
  useEffect(() => {
    const saved = loadState();
    if (saved && !['home', 'settings', 'rules', 'final'].includes(saved.screen)) {
      setSavedState(saved);
      setShowResume(true);
    }
  }, []);

  // Save state on changes
  useEffect(() => {
    if (!showResume) saveState(state);
  }, [state, showResume]);

  // Timer
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!state.timerRunning) return;

    timerRef.current = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state.timerRunning]);

  // Timer expiry
  useEffect(() => {
    if (state.timerRunning && state.timerSeconds === 0 && state.settings.timerSeconds > 0) {
      Audio.playWrong();
      dispatch({ type: 'TIMER_EXPIRED' });
    }
    if (state.timerRunning && state.timerSeconds > 0 && state.timerSeconds <= 5) {
      Audio.playTimerWarning();
    }
  }, [state.timerSeconds, state.timerRunning, state.settings.timerSeconds]);

  // Keyboard shortcuts
  const handleKey = useCallback((e: KeyboardEvent) => {
    const s = state.screen;
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (e.key === 'h' || e.key === 'H') { dispatch({ type: 'TOGGLE_KEYBOARD_HELP' }); return; }
    if (e.key === 'r' || e.key === 'R') { dispatch({ type: 'REQUEST_RESET' }); return; }

    if (state.pendingReset) {
      if (e.key === 'Enter') dispatch({ type: 'CONFIRM_RESET' });
      if (e.key === 'Escape') dispatch({ type: 'CANCEL_RESET' });
      return;
    }

    if (state.showKeyboardHelp) {
      if (e.key === 'Escape') dispatch({ type: 'TOGGLE_KEYBOARD_HELP' });
      return;
    }

    if (s === 'question' || s === 'super_question') {
      if (e.key === '1') dispatch({ type: 'SELECT_ANSWER', index: 0 });
      if (e.key === '2') dispatch({ type: 'SELECT_ANSWER', index: 1 });
      if (e.key === '3') dispatch({ type: 'SELECT_ANSWER', index: 2 });
      if (e.key === '4') dispatch({ type: 'SELECT_ANSWER', index: 3 });
      if (e.key === 'f' || e.key === 'F') dispatch({ type: 'USE_HELP', help: 'fifty' });
      if (e.key === 'a' || e.key === 'A') dispatch({ type: 'USE_HELP', help: 'audience' });
      if (e.key === 'p' || e.key === 'P') dispatch({ type: 'USE_HELP', help: 'pug' });
      if (e.key === ' ') {
        e.preventDefault();
        if (!state.timerActive && state.settings.timerSeconds > 0) dispatch({ type: 'START_TIMER' });
        else if (state.timerActive) dispatch({ type: state.timerRunning ? 'STOP_TIMER' : 'START_TIMER' });
      }
    }

    if (s === 'confirm' || s === 'super_confirm') {
      if (e.key === 'Enter') dispatch({ type: 'CONFIRM_ANSWER' });
      if (e.key === 'Escape') dispatch({ type: 'CANCEL_CONFIRM' });
    }

    if (s === 'result' || s === 'super_result') {
      if (e.key === 'Enter' || e.key === 'ArrowRight') dispatch({ type: 'NEXT_LEVEL' });
    }

    if (e.key === 'Escape') {
      if (s === 'confirm') dispatch({ type: 'CANCEL_CONFIRM' });
      if (s === 'super_confirm') dispatch({ type: 'CANCEL_CONFIRM' });
    }
  }, [state]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const isSuperHero = state.level === 4 || state.screen === 'super_question' || state.screen === 'super_result' || state.screen === 'super_confirm' || state.screen === 'super_unlock' || state.screen === 'victory' || state.screen === 'defeat';

  if (showResume && savedState) {
    return (
      <div className="game-viewport flex flex-col items-center justify-center gap-8">
        <DecorativeCurves level={1} />
        <div className="z-10 flex flex-col items-center gap-6 text-center px-8">
          <p className="type-display" style={{ fontSize: 'var(--fs-title)', color: 'var(--c-coal)', fontWeight: 700 }}>
            C'è una partita in corso
          </p>
          <p style={{ fontSize: 'var(--fs-label)', color: 'var(--c-coal)' }}>
            {savedState.settings.playerName || 'Giocatore'} — Livello {savedState.level}
          </p>
          <div className="flex gap-4 mt-4">
            <button
              className="btn-primary"
              style={{ padding: '0.8em 2em', fontSize: 'var(--fs-label)' }}
              onClick={() => { dispatch({ type: 'LOAD_SAVED', state: savedState }); setShowResume(false); }}
            >
              Riprendi
            </button>
            <button
              className="btn-secondary"
              style={{ padding: '0.8em 2em', fontSize: 'var(--fs-label)' }}
              onClick={() => { localStorage.removeItem(STORAGE_KEY); setShowResume(false); }}
            >
              Ricomincia
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`game-viewport${isSuperHero && !['home','settings','rules','level_up','game_over','final'].includes(state.screen) ? ' dark' : ''}`}>
      {state.screen === 'home' && <HomeScreen onStart={() => dispatch({ type: 'GOTO', screen: 'settings' })} onRules={() => dispatch({ type: 'GOTO', screen: 'rules' })} />}

      {state.screen === 'settings' && (
        <SettingsScreen
          settings={state.settings}
          onChange={s => dispatch({ type: 'UPDATE_SETTINGS', settings: s })}
          onBack={() => dispatch({ type: 'GOTO', screen: 'home' })}
          onStart={() => dispatch({ type: 'GOTO', screen: 'rules' })}
        />
      )}

      {state.screen === 'extraction' && (
        <ExtractionOverlay
          participants={state.settings.participants}
          onClose={() => dispatch({ type: 'GOTO', screen: 'settings' })}
          onSelect={(name) => {
            dispatch({ type: 'UPDATE_SETTINGS', settings: { playerName: name } });
            dispatch({ type: 'GOTO', screen: 'settings' });
          }}
        />
      )}

      {state.screen === 'rules' && (
        <RulesScreen
          onBack={() => dispatch({ type: 'GOTO', screen: 'settings' })}
          onPlay={() => dispatch({ type: 'START_GAME' })}
        />
      )}

      {(state.screen === 'question' || state.screen === 'confirm' || state.screen === 'result') && state.currentQuestion && (
        <QuestionScreen
          question={state.currentQuestion}
          level={state.level as 1 | 2 | 3}
          screen={state.screen as 'question' | 'confirm' | 'result'}
          selectedAnswer={state.selectedAnswer}
          eliminatedAnswers={state.eliminatedAnswers}
          helpsUsed={state.helpsUsed}
          helpsAllowed={!state.settings.allowHelpInFinal || state.level < 4}
          timerMax={state.settings.timerSeconds}
          timerSeconds={state.timerSeconds}
          timerActive={state.timerActive}
          timerRunning={state.timerRunning}
          correctCount={state.correctCount}
          onSelectAnswer={i => { Audio.playSelect(); dispatch({ type: 'SELECT_ANSWER', index: i }); }}
          onConfirm={() => { Audio.playConfirm(); dispatch({ type: 'CONFIRM_ANSWER' }); }}
          onCancel={() => dispatch({ type: 'CANCEL_CONFIRM' })}
          onNext={() => dispatch({ type: 'NEXT_LEVEL' })}
          onStartTimer={() => dispatch({ type: 'START_TIMER' })}
          onToggleTimer={() => dispatch({ type: state.timerRunning ? 'STOP_TIMER' : 'START_TIMER' })}
          onUseHelp={h => dispatch({ type: 'USE_HELP', help: h })}
          onCorrectSound={Audio.playCorrect}
          onWrongSound={Audio.playWrong}
        />
      )}

      {state.screen === 'level_up' && (
        <LevelUpScreen
          level={state.level as 1 | 2 | 3}
          onContinue={() => { Audio.playLevelUp(); dispatch({ type: 'LOAD_QUESTION', level: (state.level + 1) as Level }); }}
        />
      )}

      {state.screen === 'game_over' && state.currentQuestion && (
        <GameOverScreen
          question={state.currentQuestion}
          selectedAnswer={state.answerHistory[state.answerHistory.length - 1]?.selectedAnswer ?? -1}
          level={state.level as 1 | 2 | 3}
          secondChanceGiven={state.secondChanceGiven}
          onSecondChance={() => dispatch({ type: 'SECOND_CHANCE' })}
          onEnd={() => dispatch({ type: 'END_GAME' })}
          onNew={() => dispatch({ type: 'NEW_GAME' })}
        />
      )}

      {state.screen === 'super_unlock' && (
        <SuperUnlockScreen
          onContinue={() => { Audio.playSuperHeroUnlock(); dispatch({ type: 'LOAD_QUESTION', level: 4 }); }}
          prize={state.settings.prize}
        />
      )}

      {(state.screen === 'super_question' || state.screen === 'super_confirm' || state.screen === 'super_result') && state.currentQuestion && (
        <SuperHeroScreen
          question={state.currentQuestion}
          screen={state.screen as 'super_question' | 'super_confirm' | 'super_result'}
          selectedAnswer={state.selectedAnswer}
          eliminatedAnswers={state.eliminatedAnswers}
          helpsUsed={state.helpsUsed}
          helpsAllowed={state.settings.allowHelpInFinal}
          timerMax={state.settings.timerSeconds}
          timerSeconds={state.timerSeconds}
          timerActive={state.timerActive}
          timerRunning={state.timerRunning}
          prize={state.settings.prize}
          playerName={state.settings.playerName}
          onSelectAnswer={i => { Audio.playSelect(); dispatch({ type: 'SELECT_ANSWER', index: i }); }}
          onConfirm={() => { Audio.playConfirm(); dispatch({ type: 'CONFIRM_ANSWER' }); }}
          onCancel={() => dispatch({ type: 'CANCEL_CONFIRM' })}
          onNext={() => {
            const last = state.answerHistory[state.answerHistory.length - 1];
            if (last?.correct) {
              Audio.playCorrect();
              dispatch({ type: 'GOTO', screen: 'victory' });
            } else {
              dispatch({ type: 'GOTO', screen: 'defeat' });
            }
          }}
          onStartTimer={() => dispatch({ type: 'START_TIMER' })}
          onToggleTimer={() => dispatch({ type: state.timerRunning ? 'STOP_TIMER' : 'START_TIMER' })}
          onUseHelp={h => dispatch({ type: 'USE_HELP', help: h })}
          onCorrectSound={Audio.playCorrect}
          onWrongSound={Audio.playWrong}
        />
      )}

      {state.screen === 'victory' && (
        <VictoryScreen
          playerName={state.settings.playerName}
          prize={state.settings.prize}
          onCelebrate={() => dispatch({ type: 'GOTO', screen: 'celebrate' })}
          onEnd={() => dispatch({ type: 'END_GAME' })}
        />
      )}

      {state.screen === 'celebrate' && (
        <CelebrateScreen
          playerName={state.settings.playerName}
          correctCount={state.correctCount}
          totalQuestions={state.answerHistory.length}
          prize={state.settings.prize}
          onEnd={() => dispatch({ type: 'END_GAME' })}
        />
      )}

      {state.screen === 'defeat' && state.currentQuestion && (
        <DefeatScreen
          question={state.currentQuestion}
          selectedAnswer={state.answerHistory[state.answerHistory.length - 1]?.selectedAnswer ?? -1}
          onEnd={() => dispatch({ type: 'END_GAME' })}
          onNew={() => dispatch({ type: 'NEW_GAME' })}
        />
      )}

      {state.screen === 'final' && (
        <FinalScreen
          playerName={state.settings.playerName}
          level={state.level}
          correctCount={state.correctCount}
          answerHistory={state.answerHistory}
          helpsUsed={state.helpsUsed}
          prize={state.settings.prize}
          won={state.screen === 'final' && state.answerHistory.some(a => a.level === 4 && a.correct)}
          onNew={() => dispatch({ type: 'NEW_GAME' })}
          onHome={() => dispatch({ type: 'GOTO', screen: 'home' })}
        />
      )}

      {state.screen === 'help_challenge' && state.helpChallengeFor && (
        <HelpChallengeOverlay
          helpType={state.helpChallengeFor}
          onComplete={() => dispatch({ type: 'HELP_CHALLENGE_COMPLETE' })}
          onSkip={() => dispatch({ type: 'HELP_CHALLENGE_SKIP' })}
        />
      )}

      {state.screen === 'help_audience' && (
        <HelpAudienceOverlay onClose={() => dispatch({ type: 'CLOSE_HELP_OVERLAY' })} />
      )}

      {state.screen === 'help_pug' && (
        <HelpPugOverlay onClose={() => dispatch({ type: 'CLOSE_HELP_OVERLAY' })} />
      )}

      {state.showKeyboardHelp && (
        <KeyboardHelp onClose={() => dispatch({ type: 'TOGGLE_KEYBOARD_HELP' })} />
      )}

      {state.pendingReset && (
        <ResetConfirm
          onConfirm={() => dispatch({ type: 'CONFIRM_RESET' })}
          onCancel={() => dispatch({ type: 'CANCEL_RESET' })}
        />
      )}

      {/* Keyboard help hint */}
      {['question', 'super_question'].includes(state.screen) && (
        <button
          onClick={() => dispatch({ type: 'TOGGLE_KEYBOARD_HELP' })}
          style={{
            position: 'absolute',
            bottom: '1.5%',
            right: '1%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px',
            color: 'var(--c-coal)',
            fontFamily: 'Automat Grotesk, sans-serif',
            letterSpacing: '0.1px',
            opacity: 1,
          }}
        >
          [H] scorciatoie
        </button>
      )}
    </div>
  );
}

// Decorative curves for home/resume screens
function DecorativeCurves({ level }: { level: number }) {
  const colors = level === 1 ? ['var(--c-warm-gray)', 'var(--c-violet)'] : ['var(--c-violet)', 'var(--c-pink)'];
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <path d="M -100 540 Q 400 200 960 540 Q 1520 880 2020 540" fill="none" stroke={colors[0]} strokeWidth="1.5" opacity="0.3" />
      <path d="M -100 340 Q 600 600 1200 300 Q 1600 100 2020 400" fill="none" stroke={colors[1]} strokeWidth="1" opacity="0.2" />
      <circle cx="200" cy="200" r="80" fill="none" stroke={colors[0]} strokeWidth="1" opacity="0.15" />
    </svg>
  );
}
