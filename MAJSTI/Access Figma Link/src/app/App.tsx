import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { ForumPage } from './components/ForumPage';
import { GamesPage } from './components/GamesPage';
import { Navigation } from './components/Navigation';
import { LanguageSelector } from './components/LanguageSelector';
import { LoginPage } from './components/LoginPage';
import { PictureDictionary } from './components/PictureDictionary';
import { MusicLearning } from './components/MusicLearning';
import { TestPapers } from './components/TestPapers';
import { EssayWriter } from './components/EssayWriter';
import { LiteratureHub } from './components/LiteratureHub';
import { TeacherDashboard } from './components/TeacherDashboard';
import { CambridgeSyllabus } from './components/CambridgeSyllabus';
import { AIDebate } from './components/AIDebate';
import { PronunciationPractice } from './components/PronunciationPractice';

export type Page = 'home' | 'forum' | 'games' | 'dictionary' | 'music' | 'tests' | 'essay' | 'literature' | 'teacher' | 'syllabus' | 'debate' | 'pronunciation';

export type Language = 'english' | 'malay' | 'tamil' | 'chinese';

export interface User {
  name: string;
  email: string;
  profilePic: string;
  role: 'student' | 'teacher';
  language: Language;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [language, setLanguage] = useState<Language | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Check for saved language and user
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
    const savedUser = localStorage.getItem('user');
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Show language selector on first visit
  if (!language) {
    return <LanguageSelector onLanguageSelect={(lang) => {
      setLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
    }} />;
  }

  // Show login page if not authenticated
  if (!user) {
    return <LoginPage language={language} onLogin={(userData) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        user={user}
        language={language}
        onLogout={() => {
          setUser(null);
          localStorage.removeItem('user');
        }}
        onLanguageChange={(lang) => {
          setLanguage(lang);
          localStorage.setItem('preferredLanguage', lang);
        }}
      />
      
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} language={language} />}
        {currentPage === 'forum' && <ForumPage language={language} />}
        {currentPage === 'games' && <GamesPage language={language} />}
        {currentPage === 'dictionary' && <PictureDictionary language={language} />}
        {currentPage === 'music' && <MusicLearning language={language} />}
        {currentPage === 'tests' && <TestPapers language={language} />}
        {currentPage === 'essay' && <EssayWriter language={language} user={user} />}
        {currentPage === 'literature' && <LiteratureHub language={language} />}
        {currentPage === 'teacher' && user.role === 'teacher' && <TeacherDashboard language={language} />}
        {currentPage === 'syllabus' && <CambridgeSyllabus language={language} user={user} />}
        {currentPage === 'debate' && <AIDebate language={language} user={user} />}
        {currentPage === 'pronunciation' && <PronunciationPractice language={language} user={user} />}
      </main>
    </div>
  );
}
