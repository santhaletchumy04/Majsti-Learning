import { useState } from 'react';
import { Home, MessageSquare, Gamepad2, BookOpen, Music, FileText, PenTool, BookMarked, LayoutDashboard, GraduationCap, Mic, LogOut, Globe, Menu, X } from 'lucide-react';
import type { Page, Language, User } from '../App';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  user: User;
  language: Language;
  onLogout: () => void;
  onLanguageChange: (language: Language) => void;
}

const navItems = [
  { id: 'home' as Page, icon: Home, label: 'Home', labelMY: 'Utama', labelTA: 'முகப்பு', labelZH: '主页' },
  { id: 'dictionary' as Page, icon: BookOpen, label: 'Dictionary', labelMY: 'Kamus', labelTA: 'அகராதி', labelZH: '词典' },
  { id: 'music' as Page, icon: Music, label: 'Music', labelMY: 'Muzik', labelTA: 'இசை', labelZH: '音乐' },
  { id: 'games' as Page, icon: Gamepad2, label: 'Games', labelMY: 'Permainan', labelTA: 'விளையாட்டுகள்', labelZH: '游戏' },
  { id: 'tests' as Page, icon: FileText, label: 'Tests', labelMY: 'Ujian', labelTA: 'தேர்வுகள்', labelZH: '测试' },
  { id: 'essay' as Page, icon: PenTool, label: 'Essay', labelMY: 'Esei', labelTA: 'கட்டுரை', labelZH: '作文' },
  { id: 'literature' as Page, icon: BookMarked, label: 'Literature', labelMY: 'Sastera', labelTA: 'இலக்கியம்', labelZH: '文学' },
  { id: 'pronunciation' as Page, icon: Mic, label: 'Speech', labelMY: 'Pertuturan', labelTA: 'பேச்சு', labelZH: '演讲' },
  { id: 'syllabus' as Page, icon: GraduationCap, label: 'Cambridge', labelMY: 'Cambridge', labelTA: 'கேம்பிரிட்ஜ்', labelZH: '剑桥' },
  { id: 'forum' as Page, icon: MessageSquare, label: 'Forum', labelMY: 'Forum', labelTA: 'மன்றம்', labelZH: '论坛' },
];

const languageOptions = [
  { code: 'english' as Language, label: 'EN', flag: '🇬🇧' },
  { code: 'malay' as Language, label: 'MY', flag: '🇲🇾' },
  { code: 'tamil' as Language, label: 'TA', flag: '🇮🇳' },
  { code: 'chinese' as Language, label: 'ZH', flag: '🇨🇳' },
];

export function Navigation({ currentPage, onPageChange, user, language, onLogout, onLanguageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getLabel = (item: typeof navItems[0]) => {
    switch (language) {
      case 'malay': return item.labelMY;
      case 'tamil': return item.labelTA;
      case 'chinese': return item.labelZH;
      default: return item.label;
    }
  };

  // Add teacher dashboard for teachers
  const allNavItems = user.role === 'teacher' 
    ? [...navItems, { id: 'teacher' as Page, icon: LayoutDashboard, label: 'Dashboard', labelMY: 'Papan Pemuka', labelTA: 'டாஷ்போர்டு', labelZH: '仪表板' }]
    : navItems;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">M</span>
            </div>
            <h1 className="text-xl font-bold text-primary hidden sm:block">MAJSTI LEARNING</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {allNavItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                    currentPage === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{getLabel(item)}</span>
                </button>
              );
            })}
            
            {/* More dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-foreground hover:bg-muted text-sm">
                More
                <span className="text-xs">▼</span>
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {allNavItems.slice(6).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onPageChange(item.id)}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted first:rounded-t-lg last:rounded-b-lg ${
                        currentPage === item.id ? 'bg-primary/10 text-primary' : 'text-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {getLabel(item)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">
                  {languageOptions.find(l => l.code === language)?.flag}
                </span>
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-card border border-border rounded-lg shadow-lg">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted first:rounded-t-lg last:rounded-b-lg ${
                        language === lang.code ? 'bg-primary/10 text-primary' : 'text-foreground'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="text-2xl">{user.profilePic}</div>
                <span className="hidden sm:inline text-sm font-semibold">{user.name}</span>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-primary mt-1">{user.role === 'teacher' ? '👨‍🏫 Teacher' : '👨‍🎓 Student'}</p>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-b-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="grid grid-cols-2 gap-2">
              {allNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{getLabel(item)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
