import { useState, useEffect } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';

interface WordPair {
  word: string;
  definition: string;
}

const wordPairs: WordPair[] = [
  { word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing' },
  { word: 'Benevolent', definition: 'Well-meaning and kindly' },
  { word: 'Diligent', definition: 'Having or showing care in one\'s work' },
  { word: 'Gregarious', definition: 'Fond of company; sociable' },
  { word: 'Meticulous', definition: 'Showing great attention to detail' },
  { word: 'Resilient', definition: 'Able to withstand or recover from difficulties' },
];

interface WordMatchingGameProps {
  onBack: () => void;
  onScoreUpdate: (score: number) => void;
}

export function WordMatchingGame({ onBack, onScoreUpdate }: WordMatchingGameProps) {
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [shuffledDefinitions, setShuffledDefinitions] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong' | null; message: string }>({
    type: null,
    message: ''
  });

  useEffect(() => {
    const words = [...wordPairs].sort(() => Math.random() - 0.5).map(p => p.word);
    const definitions = [...wordPairs].sort(() => Math.random() - 0.5).map(p => p.definition);
    setShuffledWords(words);
    setShuffledDefinitions(definitions);
  }, []);

  useEffect(() => {
    if (selectedWord && selectedDefinition) {
      setAttempts(prev => prev + 1);
      
      const wordPair = wordPairs.find(p => p.word === selectedWord);
      if (wordPair && wordPair.definition === selectedDefinition) {
        // Correct match
        setMatched(prev => new Set([...prev, selectedWord, selectedDefinition]));
        const points = 10;
        setScore(prev => prev + points);
        onScoreUpdate(points);
        setFeedback({ type: 'correct', message: 'Perfect match! +10 points' });
        
        setTimeout(() => {
          setFeedback({ type: null, message: '' });
        }, 1500);
      } else {
        // Wrong match
        setFeedback({ type: 'wrong', message: 'Not quite right. Try again!' });
        setTimeout(() => {
          setFeedback({ type: null, message: '' });
        }, 1500);
      }
      
      setSelectedWord(null);
      setSelectedDefinition(null);
    }
  }, [selectedWord, selectedDefinition, onScoreUpdate]);

  const handleWordClick = (word: string) => {
    if (matched.has(word)) return;
    setSelectedWord(word);
  };

  const handleDefinitionClick = (definition: string) => {
    if (matched.has(definition)) return;
    setSelectedDefinition(definition);
  };

  const isGameComplete = matched.size === wordPairs.length * 2;
  const accuracy = attempts > 0 ? Math.round((matched.size / 2 / attempts) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Games
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Word Matching Game</h1>
            <p className="text-muted-foreground">Match each word with its correct definition</p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{score}</div>
            <div className="text-sm text-muted-foreground">Points</div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      {feedback.type && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          feedback.type === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {feedback.type === 'correct' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          <span className="font-semibold">{feedback.message}</span>
        </div>
      )}

      {/* Game Complete */}
      {isGameComplete && (
        <div className="mb-6 p-6 bg-primary/10 border border-primary/20 rounded-xl">
          <h2 className="text-2xl font-bold text-primary mb-2">🎉 Congratulations!</h2>
          <p className="text-foreground">You matched all the words!</p>
          <div className="mt-4 flex gap-6">
            <div>
              <div className="text-2xl font-bold text-primary">{score}</div>
              <div className="text-sm text-muted-foreground">Final Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{attempts}</div>
              <div className="text-sm text-muted-foreground">Attempts</div>
            </div>
          </div>
        </div>
      )}

      {/* Game Board */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Words Column */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Words</h2>
          <div className="space-y-3">
            {shuffledWords.map((word) => (
              <button
                key={word}
                onClick={() => handleWordClick(word)}
                disabled={matched.has(word)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  matched.has(word)
                    ? 'bg-green-100 text-green-800 border-2 border-green-300'
                    : selectedWord === word
                    ? 'bg-primary text-primary-foreground border-2 border-primary'
                    : 'bg-card border-2 border-border hover:border-primary hover:bg-primary/5'
                }`}
              >
                <span className="font-semibold">{word}</span>
                {matched.has(word) && <Check className="inline ml-2 w-5 h-5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Definitions Column */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Definitions</h2>
          <div className="space-y-3">
            {shuffledDefinitions.map((definition) => (
              <button
                key={definition}
                onClick={() => handleDefinitionClick(definition)}
                disabled={matched.has(definition)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  matched.has(definition)
                    ? 'bg-green-100 text-green-800 border-2 border-green-300'
                    : selectedDefinition === definition
                    ? 'bg-primary text-primary-foreground border-2 border-primary'
                    : 'bg-card border-2 border-border hover:border-primary hover:bg-primary/5'
                }`}
              >
                <span>{definition}</span>
                {matched.has(definition) && <Check className="inline ml-2 w-5 h-5" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">{matched.size / 2}</div>
          <div className="text-sm text-muted-foreground">Matched</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{attempts}</div>
          <div className="text-sm text-muted-foreground">Attempts</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-accent">{accuracy}%</div>
          <div className="text-sm text-muted-foreground">Accuracy</div>
        </div>
      </div>
    </div>
  );
}
