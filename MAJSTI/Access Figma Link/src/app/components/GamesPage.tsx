import { useState } from 'react';
import { WordMatchingGame } from './games/WordMatchingGame';
import { QuizGame } from './games/QuizGame';
import { MemoryCardGame } from './games/MemoryCardGame';
import { WordSearchGame } from './games/WordSearchGame';
import { Gamepad2, Trophy, Star } from 'lucide-react';
import type { Language } from '../App';

type GameType = 'menu' | 'wordMatch' | 'quiz' | 'memory' | 'wordSearch';

interface GamesPageProps {
  language: Language;
}

export function GamesPage({ language }: GamesPageProps) {
  const [currentGame, setCurrentGame] = useState<GameType>('menu');
  const [totalScore, setTotalScore] = useState(0);

  if (currentGame === 'wordMatch') {
    return <WordMatchingGame onBack={() => setCurrentGame('menu')} onScoreUpdate={(score) => setTotalScore(prev => prev + score)} />;
  }

  if (currentGame === 'quiz') {
    return <QuizGame onBack={() => setCurrentGame('menu')} onScoreUpdate={(score) => setTotalScore(prev => prev + score)} />;
  }

  if (currentGame === 'memory') {
    return <MemoryCardGame onBack={() => setCurrentGame('menu')} onScoreUpdate={(score) => setTotalScore(prev => prev + score)} />;
  }

  if (currentGame === 'wordSearch') {
    return <WordSearchGame onBack={() => setCurrentGame('menu')} onScoreUpdate={(score) => setTotalScore(prev => prev + score)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <Gamepad2 className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Learning Games</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Make learning fun with our interactive games. Challenge yourself and earn points!
        </p>
        
        <div className="flex items-center justify-center gap-8 mt-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            <div>
              <div className="text-2xl font-bold text-primary">{totalScore}</div>
              <div className="text-sm text-muted-foreground">Total Score</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-accent" />
            <div>
              <div className="text-2xl font-bold text-accent">Level 5</div>
              <div className="text-sm text-muted-foreground">Your Level</div>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GameCard
          title="Word Matching"
          description="Match words with their correct definitions. Test your vocabulary skills!"
          icon="🎯"
          difficulty="Easy"
          points="10-50"
          color="from-primary/20 to-primary/5"
          onClick={() => setCurrentGame('wordMatch')}
        />
        
        <GameCard
          title="Quiz Challenge"
          description="Answer multiple-choice questions and test your knowledge across various topics."
          icon="❓"
          difficulty="Medium"
          points="20-100"
          color="from-accent/20 to-accent/5"
          onClick={() => setCurrentGame('quiz')}
        />
        
        <GameCard
          title="Memory Cards"
          description="Flip cards to find matching pairs. Improve your memory and concentration!"
          icon="🧠"
          difficulty="Medium"
          points="15-75"
          color="from-secondary/30 to-secondary/10"
          onClick={() => setCurrentGame('memory')}
        />
        
        <GameCard
          title="Word Search"
          description="Find hidden words in a grid of letters. Test your word recognition skills!"
          icon="🔍"
          difficulty="Easy"
          points="10-50"
          color="from-primary/20 to-primary/5"
          onClick={() => setCurrentGame('wordSearch')}
        />
        
        <GameCard
          title="Speed Typing"
          description="Type words as fast as you can. Improve your typing speed and accuracy!"
          icon="⚡"
          difficulty="Hard"
          points="30-150"
          color="from-primary/20 to-primary/5"
          comingSoon
        />
        
        <GameCard
          title="Grammar Builder"
          description="Construct correct sentences by arranging words in the right order."
          icon="📝"
          difficulty="Medium"
          points="25-125"
          color="from-accent/20 to-accent/5"
          comingSoon
        />
        
        <GameCard
          title="Story Creator"
          description="Create your own stories by choosing words and watching your tale unfold!"
          icon="📖"
          difficulty="Easy"
          points="20-100"
          color="from-secondary/30 to-secondary/10"
          comingSoon
        />
      </div>

      {/* Leaderboard Section */}
      <div className="mt-16 bg-card rounded-xl border border-border p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <Trophy className="w-7 h-7 text-primary" />
          Top Learners This Week
        </h2>
        <div className="space-y-4">
          {[
            { name: 'Alex Johnson', score: 2450, badge: '🥇' },
            { name: 'Maria Garcia', score: 2180, badge: '🥈' },
            { name: 'James Chen', score: 1920, badge: '🥉' },
            { name: 'Emma Davis', score: 1750, badge: '⭐' },
            { name: 'You', score: totalScore, badge: '🎮' }
          ].map((player, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg ${
                player.name === 'You' ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{player.badge}</span>
                <div>
                  <div className={`font-semibold ${player.name === 'You' ? 'text-primary' : 'text-foreground'}`}>
                    {player.name}
                  </div>
                  <div className="text-sm text-muted-foreground">Rank #{index + 1}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">{player.score}</div>
                <div className="text-sm text-muted-foreground">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  points: string;
  color: string;
  comingSoon?: boolean;
  onClick?: () => void;
}

function GameCard({ title, description, icon, difficulty, points, color, comingSoon, onClick }: GameCardProps) {
  return (
    <div
      onClick={comingSoon ? undefined : onClick}
      className={`relative bg-card rounded-xl border border-border p-6 hover:shadow-xl transition-all ${
        comingSoon ? 'opacity-60' : 'cursor-pointer hover:scale-105'
      }`}
    >
      {comingSoon && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-semibold">
          Coming Soon
        </div>
      )}
      
      <div className={`w-20 h-20 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-md`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <div className="text-xs text-muted-foreground">Difficulty</div>
          <div className={`text-sm font-semibold ${
            difficulty === 'Easy' ? 'text-green-600' :
            difficulty === 'Medium' ? 'text-accent' :
            'text-destructive'
          }`}>
            {difficulty}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Points</div>
          <div className="text-sm font-semibold text-primary">{points}</div>
        </div>
      </div>
    </div>
  );
}