import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Sparkles, Trophy } from 'lucide-react';

interface GrammarBuilderGameProps {
  onBack: () => void;
  onScoreUpdate: (score: number) => void;
}

interface Sentence {
  id: number;
  words: string[];
  correctOrder: number[];
  hint: string;
  category: string;
}

const exercises = [
  {
    id: 1,
    level: 'Beginner',
    name: 'Simple Sentences',
    sentences: [
      {
        id: 1,
        words: ['I', 'cat', 'a', 'have'],
        correctOrder: [0, 3, 2, 1],
        hint: 'Subject + Verb + Article + Noun',
        category: 'Present Simple'
      },
      {
        id: 2,
        words: ['is', 'The', 'blue', 'sky'],
        correctOrder: [1, 3, 0, 2],
        hint: 'Article + Noun + Verb + Adjective',
        category: 'Present Simple'
      },
      {
        id: 3,
        words: ['She', 'books', 'reads', 'every day'],
        correctOrder: [0, 2, 1, 3],
        hint: 'Subject + Verb + Object + Time',
        category: 'Present Simple'
      }
    ]
  },
  {
    id: 2,
    level: 'Beginner',
    name: 'Questions',
    sentences: [
      {
        id: 1,
        words: ['Where', 'you', 'do', 'live?'],
        correctOrder: [0, 2, 1, 3],
        hint: 'Question word + Auxiliary + Subject + Verb',
        category: 'Questions'
      },
      {
        id: 2,
        words: ['is', 'What', 'name?', 'your'],
        correctOrder: [1, 0, 3, 2],
        hint: 'Question word + Verb + Possessive + Noun',
        category: 'Questions'
      },
      {
        id: 3,
        words: ['time', 'is', 'What', 'it?'],
        correctOrder: [2, 1, 0, 3],
        hint: 'Question word + Verb + Subject + Pronoun',
        category: 'Questions'
      }
    ]
  },
  {
    id: 3,
    level: 'Intermediate',
    name: 'Past Tense',
    sentences: [
      {
        id: 1,
        words: ['I', 'to', 'went', 'yesterday', 'school'],
        correctOrder: [0, 2, 1, 4, 3],
        hint: 'Subject + Past Verb + Preposition + Place + Time',
        category: 'Past Simple'
      },
      {
        id: 2,
        words: ['was', 'She', 'at', 'home', 'studying'],
        correctOrder: [1, 0, 4, 2, 3],
        hint: 'Subject + Past Be + Verb-ing + Preposition + Place',
        category: 'Past Continuous'
      },
      {
        id: 3,
        words: ['They', 'movie', 'watched', 'a', 'last night'],
        correctOrder: [0, 2, 3, 1, 4],
        hint: 'Subject + Past Verb + Article + Object + Time',
        category: 'Past Simple'
      }
    ]
  },
  {
    id: 4,
    level: 'Intermediate',
    name: 'Future Tense',
    sentences: [
      {
        id: 1,
        words: ['will', 'I', 'tomorrow', 'visit', 'you'],
        correctOrder: [1, 0, 3, 4, 2],
        hint: 'Subject + Will + Verb + Object + Time',
        category: 'Future Simple'
      },
      {
        id: 2,
        words: ['going', 'We', 'to', 'travel', 'are', 'next week'],
        correctOrder: [1, 4, 0, 2, 3, 5],
        hint: 'Subject + Be + Going + To + Verb + Time',
        category: 'Future with Going To'
      },
      {
        id: 3,
        words: ['She', 'arrive', 'soon', 'will'],
        correctOrder: [0, 3, 1, 2],
        hint: 'Subject + Will + Verb + Time',
        category: 'Future Simple'
      }
    ]
  },
  {
    id: 5,
    level: 'Advanced',
    name: 'Complex Sentences',
    sentences: [
      {
        id: 1,
        words: ['Although', 'was', 'it', 'we', 'raining,', 'outside', 'played'],
        correctOrder: [0, 1, 2, 4, 3, 6, 5],
        hint: 'Conjunction + Subject + Verb + Adjective, Subject + Verb + Adverb',
        category: 'Complex'
      },
      {
        id: 2,
        words: ['finished', 'had', 'Before', 'homework,', 'I', 'my', 'out', 'went', 'I'],
        correctOrder: [2, 8, 1, 0, 5, 3, 4, 7, 6],
        hint: 'Before + Subject + Auxiliary + Past Participle + Object, Subject + Past + Adverb',
        category: 'Past Perfect'
      },
      {
        id: 3,
        words: ['been', 'studying', 'have', 'I', 'hours', 'for', 'two'],
        correctOrder: [3, 2, 0, 1, 5, 6, 4],
        hint: 'Subject + Have + Been + Verb-ing + For + Number + Time',
        category: 'Present Perfect Continuous'
      }
    ]
  }
];

export function GrammarBuilderGame({ onBack, onScoreUpdate }: GrammarBuilderGameProps) {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [completed, setCompleted] = useState(false);

  const currentExerciseData = exercises.find(ex => ex.id === selectedExercise);
  const currentSentence = currentExerciseData?.sentences[currentSentenceIndex];

  const startExercise = (exerciseId: number) => {
    setSelectedExercise(exerciseId);
    setCurrentSentenceIndex(0);
    setUserOrder([]);
    setScore(0);
    setShowHint(false);
    setFeedback(null);
    setCompleted(false);
  };

  const handleWordClick = (index: number) => {
    if (feedback) return; // Don't allow changes after submission
    
    if (userOrder.includes(index)) {
      // Remove word from order
      setUserOrder(userOrder.filter(i => i !== index));
    } else {
      // Add word to order
      setUserOrder([...userOrder, index]);
    }
  };

  const checkAnswer = () => {
    if (!currentSentence) return;

    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(currentSentence.correctOrder);
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      const points = showHint ? 50 : 100;
      setScore(prev => prev + points);

      setTimeout(() => {
        if (currentExerciseData && currentSentenceIndex < currentExerciseData.sentences.length - 1) {
          // Move to next sentence
          setCurrentSentenceIndex(prev => prev + 1);
          setUserOrder([]);
          setFeedback(null);
          setShowHint(false);
        } else {
          // Exercise completed
          setCompleted(true);
          onScoreUpdate(score + points);
        }
      }, 1500);
    }
  };

  const resetSentence = () => {
    setUserOrder([]);
    setFeedback(null);
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
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">📝 Grammar Builder</h1>
              <p className="text-muted-foreground">Construct correct sentences by arranging words in the right order!</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => startExercise(exercise.id)}
              className="bg-card rounded-xl border border-border p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105"
            >
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                exercise.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                exercise.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {exercise.level}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{exercise.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Build {exercise.sentences.length} sentences correctly
              </p>
              <div className="text-xs text-muted-foreground">
                {exercise.sentences.length} sentences
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Exercise Completed!</h2>
          <div className="space-y-2 mb-8">
            <p className="text-xl text-foreground">Final Score: <span className="font-bold text-primary">{score}</span></p>
            <p className="text-lg text-muted-foreground">
              You completed {currentExerciseData?.sentences.length} sentences!
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => startExercise(selectedExercise)}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => setSelectedExercise(null)}
              className="px-8 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
            >
              Choose Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => setSelectedExercise(null)}
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Exercises
      </button>

      {/* Progress and Score */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{score}</div>
          <div className="text-xs text-muted-foreground">Score</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">
            {currentSentenceIndex + 1} / {currentExerciseData?.sentences.length}
          </div>
          <div className="text-xs text-muted-foreground">Progress</div>
        </div>
      </div>

      {/* Game Area */}
      <div className="bg-card rounded-2xl border border-border p-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">{currentSentence?.category}</p>
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Arrange the words to make a correct sentence
          </h3>
        </div>

        {/* User's sentence */}
        <div className="min-h-[100px] bg-muted/30 rounded-xl p-6 mb-6 flex flex-wrap gap-3 items-center justify-center">
          {userOrder.length === 0 ? (
            <p className="text-muted-foreground italic">Click words below to build your sentence...</p>
          ) : (
            userOrder.map((wordIndex, position) => (
              <div
                key={position}
                onClick={() => handleWordClick(wordIndex)}
                className="px-4 py-3 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              >
                {currentSentence?.words[wordIndex]}
              </div>
            ))
          )}
        </div>

        {/* Available words */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {currentSentence?.words.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordClick(index)}
              disabled={!!feedback}
              className={`px-4 py-3 rounded-lg transition-all ${
                userOrder.includes(index)
                  ? 'bg-muted/30 text-muted-foreground cursor-not-allowed'
                  : 'bg-card border-2 border-border hover:border-primary cursor-pointer'
              }`}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Hint */}
        {showHint && currentSentence && (
          <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <p className="text-sm text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="font-semibold">Hint:</span> {currentSentence.hint}
            </p>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            feedback === 'correct'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {feedback === 'correct' ? (
              <>
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Correct! Well done!</span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6" />
                <span className="font-semibold">Not quite right. Try again!</span>
              </>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          {!feedback && (
            <>
              <button
                onClick={checkAnswer}
                disabled={userOrder.length !== currentSentence?.words.length}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check Answer
              </button>
              {!showHint && (
                <button
                  onClick={() => setShowHint(true)}
                  className="px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Show Hint (-50 points)
                </button>
              )}
              <button
                onClick={resetSentence}
                className="px-8 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Reset
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
