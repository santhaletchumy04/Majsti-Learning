import { Globe, Check } from 'lucide-react';
import type { Language } from '../App';

interface LanguageSelectorProps {
  onLanguageSelect: (language: Language) => void;
}

const languages = [
  {
    code: 'english' as Language,
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    description: 'Learn in English'
  },
  {
    code: 'malay' as Language,
    name: 'Malay',
    nativeName: 'Bahasa Melayu',
    flag: '🇲🇾',
    description: 'Belajar dalam Bahasa Melayu'
  },
  {
    code: 'tamil' as Language,
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    description: 'தமிழில் கற்றுக்கொள்ளுங்கள்'
  },
  {
    code: 'chinese' as Language,
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    description: '用中文学习'
  }
];

export function LanguageSelector({ onLanguageSelect }: LanguageSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6">
            <Globe className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Welcome to <span className="text-primary">MAJSTI LEARNING</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred language to start your learning journey
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Pilih bahasa pilihan anda | உங்கள் விருப்ப மொழியைத் தேர்வு செய்யவும் | 选择您的首选语言
          </p>
        </div>

        {/* Language Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageSelect(lang.code)}
              className="group bg-card rounded-2xl border-2 border-border hover:border-primary p-8 transition-all hover:shadow-xl hover:scale-105 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{lang.flag}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {lang.name}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-2">{lang.nativeName}</p>
                  <p className="text-sm text-muted-foreground">{lang.description}</p>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-border group-hover:border-primary group-hover:bg-primary flex items-center justify-center transition-all">
                  <Check className="w-5 h-5 text-transparent group-hover:text-primary-foreground transition-colors" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Features Preview */}
        <div className="mt-12 bg-card rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4 text-center">What You'll Get</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl mb-2">🤖</div>
              <p className="text-sm text-muted-foreground">AI-Powered Learning</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎮</div>
              <p className="text-sm text-muted-foreground">Interactive Games</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📚</div>
              <p className="text-sm text-muted-foreground">Cambridge Syllabus</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎤</div>
              <p className="text-sm text-muted-foreground">Speech Practice</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
