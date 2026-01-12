import { useState, useEffect } from 'react';
import { ArrowLeft, Lightbulb, Trophy } from 'lucide-react';

const wordList = [
  { word: 'LEARN', meaning: 'To gain knowledge or skill', category: 'Education' },
  { word: 'STUDY', meaning: 'To spend time learning about something', category: 'Education' },
  { word: 'TEACH', meaning: 'To give lessons or instructions', category: 'Education' },
  { word: 'READ', meaning: 'To look at and understand written words', category: 'Education' },
  { word: 'WRITE', meaning: 'To make letters and words with a pen or pencil', category: 'Education' },
  { word: 'THINK', meaning: 'To use your mind to consider something', category: 'Cognition' },
  { word: 'SPEAK', meaning: 'To say words aloud', category: 'Communication' },
  { word: 'LISTEN', meaning: 'To pay attention to sound', category: 'Communication' },
];

interface WordSearchGameProps {
  onBack: () => void;
  onScoreUpdate: (score: number) => void;
}

export function WordSearchGame({ onBack, onScoreUpdate }: WordSearchGameProps) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [currentSelection, setCurrentSelection] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedWordInfo, setSelectedWordInfo] = useState<typeof wordList[0] | null>(null);

  const gridSize = 12;

  useEffect(() => {
    generateGrid();
  }, []);

  const generateGrid = () => {
    const newGrid: string[][] = Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill('')
    );

    // Place words
    wordList.forEach(({ word }) => {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 100) {
        const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);

        if (canPlaceWord(newGrid, word, row, col, direction)) {
          placeWord(newGrid, word, row, col, direction);
          placed = true;
        }
        attempts++;
      }
    });

    // Fill empty cells with random letters
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newGrid[i][j] === '') {
          newGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    setGrid(newGrid);
  };

  const canPlaceWord = (grid: string[][], word: string, row: number, col: number, direction: string): boolean => {
    if (direction === 'horizontal') {
      if (col + word.length > gridSize) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) return false;
      }
    } else {
      if (row + word.length > gridSize) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) return false;
      }
    }
    return true;
  };

  const placeWord = (grid: string[][], word: string, row: number, col: number, direction: string) => {
    if (direction === 'horizontal') {
      for (let i = 0; i < word.length; i++) {
        grid[row][col + i] = word[i];
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        grid[row + i][col] = word[i];
      }
    }
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsDragging(true);
    setCurrentSelection([`${row},${col}`]);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDragging) {
      setCurrentSelection(prev => [...prev, `${row},${col}`]);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    checkWord();
  };

  const checkWord = () => {
    if (currentSelection.length < 2) {
      setCurrentSelection([]);
      return;
    }

    const selectedWord = currentSelection.map(cell => {
      const [row, col] = cell.split(',').map(Number);
      return grid[row][col];
    }).join('');

    const foundWord = wordList.find(w => w.word === selectedWord || w.word === selectedWord.split('').reverse().join(''));
    
    if (foundWord && !foundWords.has(foundWord.word)) {
      setFoundWords(new Set([...foundWords, foundWord.word]));
      setSelectedCells(new Set([...selectedCells, ...currentSelection]));
      const points = foundWord.word.length * 5;
      setScore(prev => prev + points);
      onScoreUpdate(points);
      setSelectedWordInfo(foundWord);
      setTimeout(() => setSelectedWordInfo(null), 3000);
    }
    
    setCurrentSelection([]);
  };

  const isGameComplete = foundWords.size === wordList.length;

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
            <h1 className="text-3xl font-bold text-foreground mb-2">🔍 Word Search with Meanings</h1>
            <p className="text-muted-foreground">Find words and learn their meanings!</p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{score}</div>
            <div className="text-sm text-muted-foreground">Points</div>
          </div>
        </div>
      </div>

      {/* Word Meaning Popup */}
      {selectedWordInfo && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl animate-fade-in">
          <div className="flex items-start gap-3">
            <Trophy className="w-6 h-6 text-green-600 mt-0.5" />
            <div>
              <p className="font-bold text-green-800 text-lg">Found: {selectedWordInfo.word}!</p>
              <p className="text-green-700"><strong>Meaning:</strong> {selectedWordInfo.meaning}</p>
              <p className="text-sm text-green-600">Category: {selectedWordInfo.category} • +{selectedWordInfo.word.length * 5} points</p>
            </div>
          </div>
        </div>
      )}

      {/* Game Complete */}
      {isGameComplete && (
        <div className="mb-6 p-6 bg-primary/10 border border-primary/20 rounded-xl">
          <h2 className="text-2xl font-bold text-primary mb-2">🎉 Excellent Work!</h2>
          <p className="text-foreground mb-4">You found all the words and learned their meanings!</p>
          <div className="text-2xl font-bold text-primary">{score} Points</div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Word Grid */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Find the Words</h3>
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent rounded-lg text-sm hover:bg-accent/30"
              >
                <Lightbulb className="w-4 h-4" />
                Hint
              </button>
            </div>
            
            <div 
              className="inline-block select-none"
              onMouseUp={handleMouseUp}
              onMouseLeave={() => {
                setIsDragging(false);
                setCurrentSelection([]);
              }}
            >
              {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((cell, colIndex) => {
                    const cellKey = `${rowIndex},${colIndex}`;
                    const isSelected = selectedCells.has(cellKey);
                    const isCurrentlySelecting = currentSelection.includes(cellKey);
                    
                    return (
                      <div
                        key={cellKey}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-border font-bold text-sm sm:text-base cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-green-200 text-green-800'
                            : isCurrentlySelecting
                            ? 'bg-primary/30 text-primary'
                            : 'bg-card hover:bg-muted'
                        }`}
                        onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                        onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                      >
                        {cell}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              💡 Click and drag to select words (horizontal or vertical)
            </p>
          </div>
        </div>

        {/* Word List */}
        <div>
          <div className="bg-card rounded-xl border border-border p-4 sticky top-24">
            <h3 className="font-bold text-foreground mb-4">Words to Find ({foundWords.size}/{wordList.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {wordList.map((item) => {
                const isFound = foundWords.has(item.word);
                return (
                  <div
                    key={item.word}
                    className={`p-3 rounded-lg border transition-all ${
                      isFound
                        ? 'bg-green-100 border-green-300'
                        : 'bg-muted border-border'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {isFound && <span className="text-green-600">✓</span>}
                      <span className={`font-bold ${isFound ? 'line-through text-green-700' : 'text-foreground'}`}>
                        {item.word}
                      </span>
                    </div>
                    {(isFound || showHint) && (
                      <p className="text-xs text-muted-foreground">{item.meaning}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
