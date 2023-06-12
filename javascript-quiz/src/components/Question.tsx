import { Card, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useQuestionsStore } from '../store/questions';
import { type Question, type SelectAnswerFunc, type QuestionsState } from "../types";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface QuestionProps {
  info: Question;
}

const getBackgroundColor = (info: Question, answerIndex: number): string => {
  const { userSelectedAnswer, correctAnswer } = info;

  if(userSelectedAnswer === undefined) return 'transparent';
  if(answerIndex !== correctAnswer && answerIndex === userSelectedAnswer) return 'darkred';
  if(answerIndex === correctAnswer) return 'darkgreen';
  if(answerIndex !== correctAnswer) return 'blue';

  return 'transparent';
};

export default function Question({ info }: QuestionProps) {

  const selectAnswer: SelectAnswerFunc = useQuestionsStore((state: QuestionsState) => state.selectAnswer);

  return(
    <Card variant="outlined" sx={{ bgcolor: '#222', p: 2, textAlign: 'left' }}>
      <Typography variant="h5">
        {info.question}
      </Typography>
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code ?? ''}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers?.map((answer: string, index: number) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton 
              disabled={info.userSelectedAnswer !== undefined}
              onClick={() => selectAnswer(info.id, index)}
              sx={{ bgcolor: getBackgroundColor(info, index) }}
            >
              <ListItemText 
                primary={answer} 
                sx={{ textAlign: 'center', p: 1 }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List> 
    </Card>
  );
}