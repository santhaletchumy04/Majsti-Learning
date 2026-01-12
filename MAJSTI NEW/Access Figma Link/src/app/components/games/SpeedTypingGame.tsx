import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Timer, Zap, Trophy } from 'lucide-react';

interface SpeedTypingGameProps {
  onBack: () => void;
  onScoreUpdate: (score: number) => void;
}

const exercises = [
  {
    id: 1,
    level: 'Beginner',
    words: ['cat', 'dog', 'sun', 'moon', 'tree', 'bird', 'fish', 'book', 'pen', 'car']
  },
  {
    id: 2,
    level: 'Beginner',
    words: ['happy', 'smile', 'laugh', 'play', 'jump', 'run', 'walk', 'sleep', 'eat', 'drink']
  },
  {
    id: 3,
    level: 'Intermediate',
    words: ['computer', 'keyboard', 'monitor', 'internet', 'website', 'software', 'hardware', 'database', 'network', 'system']
  },
  {
    id: 4,
    level: 'Intermediate',
    words: ['beautiful', 'wonderful', 'amazing', 'fantastic', 'excellent', 'perfect', 'brilliant', 'outstanding', 'magnificent', 'extraordinary']
  },
  {
    id: 5,
    level: 'Advanced',
    words: ['The quick brown fox jumps', 'Practice makes perfect every', 'Learning is a lifelong', 'Knowledge is power and', 'Education opens many doors']
  },
  {
    id: 6,
    level: 'Advanced',
    words: ['The early bird catches', 'Actions speak louder than', 'Better late than never', 'Every cloud has a', 'Honesty is the best']
  }
];

export function SpeedTypingGame({ onBack, onScoreUpdate }: SpeedTypingGameProps) {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [correctWords, setCorrectWords] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [wpm, setWpm] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number>(0);

  const currentExercise = exercises.find(ex => ex.id === selectedExercise);
  const currentWord = currentExercise?.words[currentWordIndex];

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [isPlaying, timeLeft]);

  const startGame = (exerciseId: number) => {
    setSelectedExercise(exerciseId);
    setCurrentWordIndex(0);
    setInputValue('');
    setScore(0);
    setTimeLeft(60);
    setCorrectWords(0);
    setTotalWords(0);
    setWpm(0);
    setIsPlaying(true);
    startTimeRef.current = Date.now();
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const endGame = () => {
    setIsPlaying(false);
    if (correctWords > 0) {
      const finalScore = Math.round(score + (wpm * 10));
      onScoreUpdate(finalScore);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying) return;
    const value = e.target.value;
    setInputValue(value);

    // Check if the current word/phrase is typed correctly
    // For phrases, we need to check the complete match
    if (value.trim() === currentWord?.trim()) {
      // Correct word typed
      const newCorrectWords = correctWords + 1;
      const newTotalWords = totalWords + 1;
      const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
      const newWpm = Math.round(newCorrectWords / (elapsedMinutes || 0.01)); // Prevent division by zero
      
      setCorrectWords(newCorrectWords);
      setTotalWords(newTotalWords);
      setWpm(newWpm);
      setScore(prev => prev + (currentWord?.length || 0) * 10);
      setInputValue('');
      
      if (currentExercise && currentWordIndex < currentExercise.words.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
      } else {
        // Exercise completed, move to next word set
        setCurrentWordIndex(0);
      }
    }
  };

  if (!selectedExercise) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Games
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">⚡ Speed Typing</h1>
              <p className="text-muted-foreground">Type as fast as you can to improve your speed and accuracy!</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => startGame(exercise.id)}
              className="bg-card rounded-xl border border-border p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105"
            >
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                exercise.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                exercise.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {exercise.level}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Exercise {exercise.id}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {exercise.level === 'Beginner' && 'Simple words to get you started'}
                {exercise.level === 'Intermediate' && 'More challenging vocabulary'}
                {exercise.level === 'Advanced' && 'Full phrases and expressions'}
              </p>
              <div className="text-xs text-muted-foreground">
                {exercise.words.length} words/phrases
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => {
          setSelectedExercise(null);
          setIsPlaying(false);
        }}
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Exercises
      </button>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <Timer className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{timeLeft}s</div>
          <div className="text-xs text-muted-foreground">Time Left</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{score}</div>
          <div className="text-xs text-muted-foreground">Score</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{wpm}</div>
          <div className="text-xs text-muted-foreground">WPM</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{correctWords}</div>
          <div className="text-xs text-muted-foreground">Correct</div>
        </div>
      </div>

      {/* Game Area */}
      {isPlaying ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-4">Type this word:</p>
            <p className="text-5xl font-bold text-foreground mb-8 tracking-wide">{currentWord}</p>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full max-w-md mx-auto text-3xl text-center p-4 bg-muted border-2 border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Start typing..."
            autoComplete="off"
            spellCheck="false"
          />

          <div className="mt-8 text-sm text-muted-foreground">
            Word {currentWordIndex + 1} of {currentExercise?.words.length}
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Game Over!</h2>
          <div className="space-y-2 mb-8">
            <p className="text-xl text-foreground">Final Score: <span className="font-bold text-primary">{score}</span></p>
            <p className="text-lg text-muted-foreground">Words Per Minute: <span className="font-semibold">{wpm}</span></p>
            <p className="text-lg text-muted-foreground">Correct Words: <span className="font-semibold">{correctWords}</span></p>
            <p className="text-lg text-muted-foreground">
              Accuracy: <span className="font-semibold">{totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0}%</span>
            </p>
          </div>
          <button
            onClick={() => startGame(selectedExercise)}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}