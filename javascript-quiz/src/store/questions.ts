import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Question, type QuestionsState } from '../types.d';

import confetti from 'canvas-confetti';

export const useQuestionsStore = create<QuestionsState>()(persist((set, get) => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestions: async(limit: number = 0): Promise<void> => {
    try {
      const request: Response = await fetch('http://localhost:5173/data.json');
      const initialQuestions: Question[]  = await request.json();

      let questions: Question[] = initialQuestions.sort(() => Math.random() - 0.5);
      if(limit > 0) questions = questions.slice(0, limit);

      set({ questions })
    } catch (err) {
      console.log(err);
    }
  },
  selectAnswer: (questionId: number, asnwerIndex: number): void => {
    const { questions }: { questions: Question[] } = get();
    const newQuestions: Question[] = structuredClone(questions);

    const questionIndex: number = newQuestions.findIndex((question: Question) => question.id === questionId);
    const questionInfo: Question = newQuestions[questionIndex];

    const isCorrectUserAnswer: boolean = questionInfo.correctAnswer === asnwerIndex;

    if(isCorrectUserAnswer) confetti();

    newQuestions[questionIndex] = {
      ...questionInfo,
      isCorrectUserAnswer,
      userSelectedAnswer: asnwerIndex
    };

    set({ questions: newQuestions });
  },
  goNextQuestion: (): void => {
    const { currentQuestion, questions }: QuestionsState = get();
    const nextQuestion: number = currentQuestion + 1;

    if(nextQuestion < questions.length) {
      set({ currentQuestion: nextQuestion });
    }
  },
  goPreviousQuestion: (): void => {
    const { currentQuestion, questions }: QuestionsState = get();
    const previousQuestion: number = currentQuestion - 1;

    if(previousQuestion <= questions.length) {
      set({ currentQuestion: previousQuestion });
    }
  },
  reset: (): void => set({ currentQuestion: 0, questions: [] })
}), { 
  name: 'questions'
}));