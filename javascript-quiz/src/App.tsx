import './App.css';
import { useQuestionsStore } from './store/questions';
import { Container, Stack, Typography } from '@mui/material';
import { type Question, type QuestionsState } from './types.d';

import JavaScriptLogo from './components/JavaScriptLogo';
import StartButton from './components/StartButton';
import Game from './components/Game';

export default function App() {

  const questions: Question[] = useQuestionsStore((state: QuestionsState) => state.questions);
  
  return (
    <Container maxWidth="sm">
      <Stack direction="row" alignItems="center" justifyContent="center" gap={2} marginBottom={4}>
        <JavaScriptLogo />
        <Typography variant="h2" component="h1">
          Javascript Quiz
        </Typography>
      </Stack>
      {questions && questions.length === 0 &&  <StartButton />}
      {questions && questions.length > 0 && <Game />}
    </Container>
  );
}
