import { Stack, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

import { useQuestionsStore } from '../store/questions';
import { type Question as QuestionType, type QuestionsState } from '../types.d';

import Question from './Question';
import Footer from './Footer';

export default function Game() {

  const questions: QuestionType[] = useQuestionsStore((state: QuestionsState) => state.questions);
  const currentQuestion: number = useQuestionsStore((state: QuestionsState) => state.currentQuestion);
  const goNextQuestion: () => void = useQuestionsStore((state: QuestionsState) => state.goNextQuestion);
  const goPreviousQuestion: () => void = useQuestionsStore((state: QuestionsState) => state.goPreviousQuestion);

  const questionInfo: QuestionType = questions[currentQuestion];

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="center" gap={2} marginBottom={2}>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= (questions.length - 1)}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
}
