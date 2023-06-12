import { useQuestionsStore } from '../store/questions';
import { type Question, type QuestionsState, type useQuestionsHook } from '../types.d';

export function useQuestionsData(): useQuestionsHook {
  let correct: number = 0;
  let incorrect: number = 0;
  let unasnwered: number = 0;

  const questions: Question[] = useQuestionsStore((state: QuestionsState) => state.questions);

  questions.forEach((question: Question) => {
    const { userSelectedAnswer, correctAnswer } = question;

    if(userSelectedAnswer === undefined) unasnwered++;
    if(userSelectedAnswer === correctAnswer) correct++;
    if(userSelectedAnswer !== undefined && userSelectedAnswer !== correctAnswer) incorrect++;
  });

  return { correct, incorrect, unasnwered };
}