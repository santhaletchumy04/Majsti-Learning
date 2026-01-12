import { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume2, Sparkles, Trophy, Heart } from 'lucide-react';
import type { Language } from '../App';

interface Song {
  id: number;
  title: string;
  artist: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  lyrics: string[];
  vocabulary: { word: string; meaning: string }[];
  grammar: string[];
  duration: string;
}

const songs: Song[] = [
  {
    id: 1,
    title: 'Happy Song',
    artist: 'Learning Melodies',
    level: 'beginner',
    category: 'Emotions',
    duration: '2:30',
    lyrics: [
      'I am happy, happy, happy',
      'Dancing in the sun',
      'Smiling at the world',
      'Having lots of fun'
    ],
    vocabulary: [
      { word: 'happy', meaning: 'feeling joy' },
      { word: 'dancing', meaning: 'moving to music' },
      { word: 'smiling', meaning: 'showing happiness with your face' }
    ],
    grammar: ['Present Continuous (dancing, smiling)', 'Simple Present (am)']
  },
  {
    id: 2,
    title: 'Colors of the Rainbow',
    artist: 'English Kids',
    level: 'beginner',
    category: 'Colors',
    duration: '3:00',
    lyrics: [
      'Red and yellow, blue and green',
      'The prettiest colors I have ever seen',
      'Orange, purple, pink so bright',
      'Colors make the world so right'
    ],
    vocabulary: [
      { word: 'rainbow', meaning: 'arc of colors in the sky' },
      { word: 'prettiest', meaning: 'most beautiful' },
      { word: 'bright', meaning: 'giving out light' }
    ],
    grammar: ['Present Perfect (have seen)', 'Adjectives (prettiest, bright)']
  },
  {
    id: 3,
    title: 'My Daily Routine',
    artist: 'Learn & Sing',
    level: 'intermediate',
    category: 'Daily Life',
    duration: '2:45',
    lyrics: [
      'I wake up in the morning',
      'Brush my teeth and comb my hair',
      'Eat my breakfast, pack my bag',
      'Now I\'m ready, off I go'
    ],
    vocabulary: [
      { word: 'routine', meaning: 'regular way of doing things' },
      { word: 'comb', meaning: 'to arrange hair with a comb' },
      { word: 'pack', meaning: 'to put things in a bag' }
    ],
    grammar: ['Simple Present (wake, brush, eat)', 'Imperatives']
  },
  {
    id: 4,
    title: 'Dream Big',
    artist: 'Inspiration Tunes',
    level: 'advanced',
    category: 'Motivation',
    duration: '3:30',
    lyrics: [
      'Reach for the stars, don\'t be afraid',
      'Every challenge is a step you\'ve made',
      'Believe in yourself, you\'ll find your way',
      'Tomorrow brings a brighter day'
    ],
    vocabulary: [
      { word: 'reach', meaning: 'to try to achieve' },
      { word: 'challenge', meaning: 'difficult task' },
      { word: 'believe', meaning: 'to have faith in' }
    ],
    grammar: ['Imperatives (reach, believe)', 'Future Tense (will find)']
  }
];

const categories = ['All', 'Emotions', 'Colors', 'Daily Life', 'Motivation'];

interface MusicLearningProps {
  language: Language;
}

export function MusicLearning({ language }: MusicLearningProps) {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [completedSongs, setCompletedSongs] = useState<Set<number>>(new Set());
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentOscillatorRef = useRef<OscillatorNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  const filteredSongs = songs.filter(song => 
    selectedCategory === 'All' || song.category === selectedCategory
  );

  // Musical note frequencies for each song
  const songMelodies: { [key: number]: number[] } = {
    1: [523.25, 523.25, 587.33, 523.25, 523.25, 587.33, 523.25, 659.25], // Happy Song (C, C, D, C, C, D, C, E)
    2: [523.25, 587.33, 659.25, 698.46, 523.25, 587.33, 659.25, 698.46], // Rainbow (C, D, E, F, C, D, E, F)
    3: [440.00, 493.88, 523.25, 587.33, 440.00, 493.88, 523.25, 587.33], // Daily Routine (A, B, C, D, A, B, C, D)
    4: [523.25, 659.25, 783.99, 659.25, 523.25, 659.25, 783.99, 523.25]  // Dream Big (C, E, G, E, C, E, G, C)
  };

  const playMelody = (songId: number) => {
    // Initialize AudioContext
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    const melody = songMelodies[songId] || songMelodies[1];
    let noteIndex = 0;

    const playNote = () => {
      // Stop previous note
      if (currentOscillatorRef.current) {
        currentOscillatorRef.current.stop();
      }

      // Create oscillator for the current note
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = melody[noteIndex % melody.length];
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
      
      currentOscillatorRef.current = oscillator;
      noteIndex++;
    };

    // Play melody repeatedly
    playNote(); // Play first note immediately
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(playNote, 500);
  };

  const stopMelody = () => {
    if (currentOscillatorRef.current) {
      try {
        currentOscillatorRef.current.stop();
      } catch (e) {
        // Oscillator may already be stopped
      }
      currentOscillatorRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopMelody();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playPause = () => {
    if (!selectedSong) return;

    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);

    if (newIsPlaying) {
      // Start playing melody
      playMelody(selectedSong.id);

      // Simulate lyric progression
      const interval = window.setInterval(() => {
        setCurrentLine(prev => {
          if (prev < selectedSong.lyrics.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            setCompletedSongs(new Set([...completedSongs, selectedSong.id]));
            clearInterval(interval);
            stopMelody();
            return 0;
          }
        });
      }, 3000);
    } else {
      // Stop melody
      stopMelody();
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Music className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">🎵 Learn English Through Music</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI-powered lyrics analysis and vocabulary learning
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">{completedSongs.size}</div>
          <div className="text-sm text-muted-foreground">Songs Completed</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-accent">{favorites.size}</div>
          <div className="text-sm text-muted-foreground">Favorites</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{completedSongs.size * 10}</div>
          <div className="text-sm text-muted-foreground">Points Earned</div>
        </div>
      </div>

      {/* AI Learning Tips */}
      <div className="mb-8 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-semibold text-foreground mb-1">🤖 AI Music Learning Assistant</p>
            <p className="text-sm text-muted-foreground">
              Our AI analyzes lyrics to teach you vocabulary, grammar patterns, and pronunciation. Sing along to improve your speaking skills!
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-card border border-border hover:border-primary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Songs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            onClick={() => {
              setSelectedSong(song);
              setCurrentLine(0);
              setIsPlaying(false);
            }}
            className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            {/* Album Art */}
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
              <Music className="w-20 h-20 text-primary/40" />
              
              {/* Level Badge */}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${
                song.level === 'beginner' ? 'bg-green-100 text-green-800' :
                song.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {song.level}
              </div>

              {/* Completed Badge */}
              {completedSongs.has(song.id) && (
                <div className="absolute top-2 right-2 p-2 bg-green-100 rounded-full">
                  <Trophy className="w-4 h-4 text-green-600" />
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(song.id);
                }}
                className="absolute bottom-2 right-2 p-2 bg-white/90 rounded-full hover:scale-110 transition-transform"
              >
                <Heart className={`w-5 h-5 ${favorites.has(song.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {song.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">{song.artist}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">
                  {song.category}
                </span>
                <span className="text-xs text-muted-foreground">{song.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Song Player */}
      {selectedSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl p-6 z-40">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Player Controls */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <Music className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{selectedSong.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedSong.artist}</p>
                  </div>
                  <button
                    onClick={playPause}
                    className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-primary-foreground" />
                    ) : (
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    )}
                  </button>
                </div>

                {/* Lyrics */}
                <div className="bg-muted/50 rounded-lg p-4 max-h-40 overflow-y-auto">
                  {selectedSong.lyrics.map((line, index) => (
                    <div
                      key={index}
                      className={`mb-2 transition-all ${
                        index === currentLine
                          ? 'text-primary font-bold text-lg'
                          : index < currentLine
                          ? 'text-muted-foreground'
                          : 'text-foreground'
                      }`}
                    >
                      <button
                        onClick={() => speak(line)}
                        className="flex items-center gap-2 hover:underline"
                      >
                        <Volume2 className="w-4 h-4" />
                        {line}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Content */}
              <div>
                {/* Vocabulary */}
                <div className="mb-4">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Key Vocabulary (AI-analyzed)
                  </h4>
                  <div className="space-y-2">
                    {selectedSong.vocabulary.map((item, index) => (
                      <div key={index} className="bg-muted/50 rounded-lg p-2 text-sm">
                        <span className="font-semibold text-primary">{item.word}:</span>
                        <span className="text-foreground ml-2">{item.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grammar Points */}
                <div>
                  <h4 className="font-bold text-foreground mb-2">📝 Grammar Patterns</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSong.grammar.map((point, index) => (
                      <span key={index} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}