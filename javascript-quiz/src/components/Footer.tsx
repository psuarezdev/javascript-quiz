import { Button } from '@mui/material';
import { useQuestionsData } from '../hooks/useQuestionsData';
import { type useQuestionsHook, type QuestionsState } from '../types.d';
import { useQuestionsStore } from '../store/questions';

export default function Footer() {
  
  const { correct, incorrect, unasnwered }: useQuestionsHook = useQuestionsData();

  const reset = useQuestionsStore((state: QuestionsState) => state.reset);

  return (
    <footer style={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
      <strong style={{ marginBottom: '16px' }}>
        {`✅ ${correct} corrects - ❌ ${incorrect} incorrects - ❓ ${unasnwered} unasnwered`}
      </strong>
      <Button variant="contained" onClick={reset}>
        Restart Game
      </Button>
    </footer>
  );
}
