export type Screen =
  | 'home'
  | 'settings'
  | 'extraction'
  | 'rules'
  | 'question'
  | 'confirm'
  | 'suspense'
  | 'result'
  | 'level_up'
  | 'game_over'
  | 'super_unlock'
  | 'super_question'
  | 'super_confirm'
  | 'super_suspense'
  | 'super_result'
  | 'victory'
  | 'celebrate'
  | 'defeat'
  | 'final'
  | 'help_challenge'
  | 'help_audience'
  | 'help_pug';

export type HelpType = 'fifty' | 'audience' | 'pug';
export type Level = 1 | 2 | 3 | 4;

export interface Question {
  id: number;
  stage: Level;
  type: 'standard' | 'superhero';
  category: string;
  difficulty: string;
  question: string;
  image: string | null;
  answers: [string, string, string, string];
  /** Chiave di un campione visivo mostrato INSIEME alla domanda (vedi data/visuals). */
  visual?: string;
  /** Chiavi dei quattro campioni visivi usati AL POSTO delle risposte testuali. */
  answerVisuals?: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3;
  explanation: string;
  /** Indizio mostrato SOLO quando si usa l'aiuto “Chiedi al PUG!”. */
  pugHint?: string;
  reasoningHint?: string;
}

export interface Settings {
  playerName: string;
  participants: string[];
  timerSeconds: 0 | 20 | 30 | 45;
  randomOrder: boolean;
  helpChallenge: boolean;
  allowHelpInFinal: boolean;
  prize: string;
}

export interface AnswerRecord {
  questionId: number;
  level: Level;
  question: string;
  selectedAnswer: number;
  correctAnswer: number;
  correct: boolean;
}

export interface GameState {
  screen: Screen;
  level: Level;
  currentQuestion: Question | null;
  usedQuestionIds: number[];
  /** Domande già uscite nella serata, oltre la singola partita. */
  seenQuestionIds: number[];
  selectedAnswer: number | null;
  eliminatedAnswers: number[];
  helpsUsed: { fifty: boolean; audience: boolean; pug: boolean };
  settings: Settings;
  correctCount: number;
  answerHistory: AnswerRecord[];
  helpChallengeFor: HelpType | null;
  showKeyboardHelp: boolean;
  pendingReset: boolean;
  timerActive: boolean;
  timerRunning: boolean;
  timerSeconds: number;
  resumeGame: boolean;
}

export const LEVEL_NAMES: Record<Level, string> = {
  1: 'Occhio allenato',
  2: 'Mente progettuale',
  3: 'Design Master',
  4: 'Super Hero Designer',
};

export const LEVEL_COLORS: Record<Level, string> = {
  1: 'var(--c-violet)',
  2: 'var(--c-pink)',
  3: 'var(--c-orange)',
  4: 'var(--c-pink)',
};

/**
 * Il premio è fisso: non si configura più dalle Impostazioni, così non può
 * essere modificato per errore mentre la schermata è proiettata in sala.
 */
export const PRIZE =
  'Biglietto aggggratis per il LIFE Design Festival 2027 e PUG! Fest 2027';

export const defaultSettings: Settings = {
  playerName: '',
  participants: [],
  timerSeconds: 30,
  randomOrder: true,
  helpChallenge: false,
  allowHelpInFinal: true,
  prize: PRIZE,
};
