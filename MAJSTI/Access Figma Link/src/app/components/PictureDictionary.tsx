import { useState } from 'react';
import { Search, Volume2, Sparkles, BookOpen, Star } from 'lucide-react';
import type { Language } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DictionaryEntry {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  imageQuery: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const dictionaryData: DictionaryEntry[] = [
  {
    word: 'Apple',
    pronunciation: '/ˈæp.əl/',
    partOfSpeech: 'noun',
    definition: 'A round fruit with red, green, or yellow skin and white flesh',
    example: 'I eat an apple every day for breakfast.',
    imageQuery: 'red apple fruit',
    category: 'Food',
    difficulty: 'beginner'
  },
  {
    word: 'Book',
    pronunciation: '/bʊk/',
    partOfSpeech: 'noun',
    definition: 'A written or printed work consisting of pages glued or sewn together',
    example: 'She is reading an interesting book about history.',
    imageQuery: 'stack books reading',
    category: 'Education',
    difficulty: 'beginner'
  },
  {
    word: 'Butterfly',
    pronunciation: '/ˈbʌt.ə.flaɪ/',
    partOfSpeech: 'noun',
    definition: 'An insect with large colorful wings',
    example: 'A beautiful butterfly landed on the flower.',
    imageQuery: 'colorful butterfly nature',
    category: 'Animals',
    difficulty: 'beginner'
  },
  {
    word: 'Computer',
    pronunciation: '/kəmˈpjuː.tər/',
    partOfSpeech: 'noun',
    definition: 'An electronic device for storing and processing data',
    example: 'I use my computer for work and study.',
    imageQuery: 'laptop computer desk',
    category: 'Technology',
    difficulty: 'intermediate'
  },
  {
    word: 'Mountain',
    pronunciation: '/ˈmaʊn.tɪn/',
    partOfSpeech: 'noun',
    definition: 'A very high hill, often with rocks and snow',
    example: 'We climbed the mountain to see the sunrise.',
    imageQuery: 'mountain peak nature',
    category: 'Nature',
    difficulty: 'beginner'
  },
  {
    word: 'Ocean',
    pronunciation: '/ˈəʊ.ʃən/',
    partOfSpeech: 'noun',
    definition: 'A very large area of sea',
    example: 'The ocean is home to many sea creatures.',
    imageQuery: 'ocean waves blue water',
    category: 'Nature',
    difficulty: 'beginner'
  },
  {
    word: 'Telescope',
    pronunciation: '/ˈtel.ɪ.skəʊp/',
    partOfSpeech: 'noun',
    definition: 'An instrument used to see distant objects clearly',
    example: 'Astronomers use telescopes to study stars.',
    imageQuery: 'telescope astronomy stars',
    category: 'Science',
    difficulty: 'advanced'
  },
  {
    word: 'Garden',
    pronunciation: '/ˈɡɑː.dən/',
    partOfSpeech: 'noun',
    definition: 'A piece of ground for growing flowers, fruits, or vegetables',
    example: 'My grandmother grows roses in her garden.',
    imageQuery: 'beautiful garden flowers',
    category: 'Nature',
    difficulty: 'beginner'
  }
];

const categories = ['All', 'Food', 'Animals', 'Nature', 'Technology', 'Education', 'Science'];

interface PictureDictionaryProps {
  language: Language;
}

export function PictureDictionary({ language }: PictureDictionaryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredEntries = dictionaryData.filter(entry => {
    const matchesSearch = entry.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const speak = (text: string) => {
    // AI-powered text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleFavorite = (word: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(word)) {
      newFavorites.delete(word);
    } else {
      newFavorites.add(word);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">📸 Picture Dictionary</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI-powered visual learning with pronunciations
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for any word... (AI will help find it)"
            className="w-full pl-12 pr-4 py-4 bg-card border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
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

      {/* AI Assistant Note */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-semibold text-foreground mb-1">🤖 AI Dictionary Assistant</p>
            <p className="text-sm text-muted-foreground">
              Can't find a word? Our AI will generate the definition, example, and suggest similar words based on your search!
            </p>
          </div>
        </div>
      </div>

      {/* Dictionary Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEntries.map((entry) => (
          <div
            key={entry.word}
            onClick={() => setSelectedEntry(entry)}
            className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            {/* Image */}
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
              <div className="text-6xl">{entry.category === 'Food' ? '🍎' : entry.category === 'Animals' ? '🦋' : entry.category === 'Nature' ? '🏔️' : entry.category === 'Technology' ? '💻' : entry.category === 'Science' ? '🔭' : '📚'}</div>
              
              {/* Difficulty Badge */}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${
                entry.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                entry.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {entry.difficulty}
              </div>

              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(entry.word);
                }}
                className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:scale-110 transition-transform"
              >
                <Star className={`w-4 h-4 ${favorites.has(entry.word) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {entry.word}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(entry.word);
                  }}
                  className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                >
                  <Volume2 className="w-5 h-5 text-primary" />
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{entry.pronunciation}</p>
              <span className="inline-block px-2 py-1 bg-accent/20 text-accent text-xs rounded-full mb-2">
                {entry.partOfSpeech}
              </span>
              <p className="text-sm text-foreground line-clamp-2">{entry.definition}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedEntry(null)}>
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              {/* Close Button */}
              <button
                onClick={() => setSelectedEntry(null)}
                className="float-right p-2 hover:bg-muted rounded-full"
              >
                ✕
              </button>

              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mb-6">
                <div className="text-8xl">{selectedEntry.category === 'Food' ? '🍎' : selectedEntry.category === 'Animals' ? '🦋' : selectedEntry.category === 'Nature' ? '🏔️' : selectedEntry.category === 'Technology' ? '💻' : selectedEntry.category === 'Science' ? '🔭' : '📚'}</div>
              </div>

              {/* Word and Pronunciation */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-4xl font-bold text-foreground mb-2">{selectedEntry.word}</h2>
                  <p className="text-xl text-muted-foreground">{selectedEntry.pronunciation}</p>
                </div>
                <button
                  onClick={() => speak(selectedEntry.word)}
                  className="p-4 bg-primary rounded-full hover:bg-primary/90 transition-colors"
                >
                  <Volume2 className="w-6 h-6 text-primary-foreground" />
                </button>
              </div>

              {/* Part of Speech */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full">
                  {selectedEntry.partOfSpeech}
                </span>
                <span className="inline-block ml-2 px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {selectedEntry.category}
                </span>
              </div>

              {/* Definition */}
              <div className="mb-6">
                <h3 className="font-bold text-foreground mb-2">Definition:</h3>
                <p className="text-foreground">{selectedEntry.definition}</p>
              </div>

              {/* Example */}
              <div className="mb-6">
                <h3 className="font-bold text-foreground mb-2">Example:</h3>
                <p className="text-foreground italic bg-muted p-4 rounded-lg">"{selectedEntry.example}"</p>
                <button
                  onClick={() => speak(selectedEntry.example)}
                  className="mt-2 flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Volume2 className="w-4 h-4" />
                  Listen to example
                </button>
              </div>

              {/* AI Insights */}
              <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">🤖 AI Learning Tips:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Try using this word in 3 different sentences today</li>
                      <li>Related words you might want to learn: {selectedEntry.category.toLowerCase()}-related vocabulary</li>
                      <li>Difficulty: {selectedEntry.difficulty} - perfect for your level!</li>
                    </ul>
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
