import { Button } from '@mui/material';
import { useQuestionsStore } from '../store/questions';
import { type QuestionsState, type FetchQuestionsFunc } from '../types';

const LIMIT_QUESTIONS = 10;

export default function Start() {

  const fetchQuestions: FetchQuestionsFunc = useQuestionsStore((state: QuestionsState) => state.fetchQuestions);

  return (
    <Button 
      variant="contained" 
      onClick={() => fetchQuestions(LIMIT_QUESTIONS)}
    >
      Start! 
    </Button>
  );
}
