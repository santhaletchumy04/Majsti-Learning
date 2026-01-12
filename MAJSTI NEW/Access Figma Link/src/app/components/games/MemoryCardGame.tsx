import { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const cardContents = ['🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎺', '🎻'];

interface MemoryCardGameProps {
  onBack: () => void;
  onScoreUpdate: (score: number) => void;
}

export function MemoryCardGame({ onBack, onScoreUpdate }: MemoryCardGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards = [...cardContents, ...cardContents]
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false
      }));
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      const [firstId, secondId] = flippedCards;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      setTimeout(() => {
        if (firstCard.content === secondCard.content) {
          // Match found
          setCards(prev =>
            prev.map(card =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatchedPairs(prev => prev + 1);
          const points = 15;
          setScore(prev => prev + points);
          onScoreUpdate(points);
        } else {
          // No match - flip back
          setCards(prev =>
            prev.map(card =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  }, [flippedCards, cards, onScoreUpdate]);

  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.length === 2 || cards[id].isMatched || cards[id].isFlipped) {
      return;
    }

    setCards(prev =>
      prev.map(card =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards(prev => [...prev, id]);
    
    if (flippedCards.length === 0) {
      setMoves(prev => prev + 1);
    }
  };

  const handleReset = () => {
    initializeGame();
    setScore(0);
  };

  const isGameComplete = matchedPairs === cardContents.length;
  const accuracy = moves > 0 ? Math.round((matchedPairs / moves) * 100) : 0;

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
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Memory Card Game</h1>
            <p className="text-muted-foreground">Find all matching pairs of cards</p>
          </div>
          
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">{score}</div>
          <div className="text-sm text-muted-foreground">Score</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{moves}</div>
          <div className="text-sm text-muted-foreground">Moves</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-accent">{matchedPairs}</div>
          <div className="text-sm text-muted-foreground">Pairs Found</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-secondary">{accuracy}%</div>
          <div className="text-sm text-muted-foreground">Accuracy</div>
        </div>
      </div>

      {/* Game Complete */}
      {isGameComplete && (
        <div className="mb-8 p-6 bg-primary/10 border border-primary/20 rounded-xl">
          <h2 className="text-2xl font-bold text-primary mb-2">🎉 Perfect Memory!</h2>
          <p className="text-foreground mb-4">You found all the matching pairs!</p>
          <div className="flex gap-6">
            <div>
              <div className="text-2xl font-bold text-primary">{score}</div>
              <div className="text-sm text-muted-foreground">Final Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{moves}</div>
              <div className="text-sm text-muted-foreground">Total Moves</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Game Board */}
      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 transform ${
              card.isFlipped || card.isMatched
                ? 'rotate-0'
                : 'hover:scale-105'
            }`}
            style={{
              perspective: '1000px'
            }}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 ${
                card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Card Back */}
              <div
                className={`absolute w-full h-full rounded-xl flex items-center justify-center ${
                  card.isMatched
                    ? 'bg-green-200 border-2 border-green-400'
                    : 'bg-gradient-to-br from-primary to-accent border-2 border-primary/20'
                } shadow-lg`}
                style={{
                  backfaceVisibility: 'hidden'
                }}
              >
                {!card.isFlipped && !card.isMatched && (
                  <div className="text-4xl text-primary-foreground">?</div>
                )}
              </div>

              {/* Card Front */}
              <div
                className={`absolute w-full h-full rounded-xl flex items-center justify-center ${
                  card.isMatched
                    ? 'bg-green-100'
                    : 'bg-card'
                } border-2 border-border shadow-lg`}
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="text-5xl">{card.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-muted/50 rounded-lg p-4 text-center">
        <p className="text-muted-foreground text-sm">
          💡 <strong>How to play:</strong> Click on cards to flip them over. Find matching pairs to score points. 
          Try to complete the game in as few moves as possible!
        </p>
      </div>
    </div>
  );
}
