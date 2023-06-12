export interface Question {
  id:            number;
  question:      string;
  code:          string;
  answers:       string[];
  correctAnswer: number;
  userSelectedAnswer: number;
  isCorrectUserAnswer: boolean;
}

export interface QuestionsState {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: FetchQuestionsFunc;
  selectAnswer: SelectAnswerFunc;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

export interface useQuestionsHook {
  correct: number;
  incorrect: number;
  unasnwered: number;
}

type FetchQuestionsFunc = (limit?: number) => Promise<void>;
type SelectAnswerFunc = (questionId: number, asnwerIndex: number) => void;
