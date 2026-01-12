import { GrammarQuiz } from './GrammarQuiz';

interface QuizGameProps {
  onBack: () => void;
  onScoreUpdate: (score: number) => void;
}

export function QuizGame({ onBack, onScoreUpdate }: QuizGameProps) {
  return <GrammarQuiz onBack={onBack} onScoreUpdate={onScoreUpdate} />;
}
