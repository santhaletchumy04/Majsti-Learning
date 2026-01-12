import { useState } from 'react';
import { GraduationCap, Mail, User as UserIcon, Lock } from 'lucide-react';
import type { Language, User } from '../App';

interface LoginPageProps {
  language: Language;
  onLogin: (user: User) => void;
}

const translations = {
  english: {
    title: 'Sign in to MAJSTI LEARNING',
    subtitle: 'Continue your learning journey',
    googleButton: 'Continue with Google',
    teacherButton: 'Sign in as Teacher',
    studentButton: 'Sign in as Student',
    emailPlaceholder: 'Enter your email',
    or: 'OR',
    demoNote: 'Demo Mode: Click any button to continue'
  },
  malay: {
    title: 'Log masuk ke MAJSTI LEARNING',
    subtitle: 'Teruskan perjalanan pembelajaran anda',
    googleButton: 'Teruskan dengan Google',
    teacherButton: 'Log masuk sebagai Guru',
    studentButton: 'Log masuk sebagai Pelajar',
    emailPlaceholder: 'Masukkan e-mel anda',
    or: 'ATAU',
    demoNote: 'Mod Demo: Klik mana-mana butang untuk meneruskan'
  },
  tamil: {
    title: 'MAJSTI LEARNING இல் உள்நுழையவும்',
    subtitle: 'உங்கள் கற்றல் பயணத்தைத் தொடரவும்',
    googleButton: 'Google உடன் தொடரவும்',
    teacherButton: 'ஆசிரியராக உள்நுழையவும்',
    studentButton: 'மாணவராக உள்நுழையவும்',
    emailPlaceholder: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
    or: 'அல்லது',
    demoNote: 'டெமோ பயன்முறை: தொடர எந்த பொத்தானையும் கிளிக் செய்யவும்'
  },
  chinese: {
    title: '登录 MAJSTI LEARNING',
    subtitle: '继续您的学习之旅',
    googleButton: '使用 Google 继续',
    teacherButton: '以教师身份登录',
    studentButton: '以学生身份登录',
    emailPlaceholder: '输入您的电子邮件',
    or: '或者',
    demoNote: '演示模式：点击任意按钮继续'
  }
};

export function LoginPage({ language, onLogin }: LoginPageProps) {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const t = translations[language];

  const handleGoogleLogin = (selectedRole: 'student' | 'teacher') => {
    // Simulate Google OAuth login with timestamp
    const loginData = {
      timestamp: new Date().toISOString(),
      method: 'Google',
      role: selectedRole
    };
    
    // Store login data for teacher tracking
    const existingLogins = JSON.parse(localStorage.getItem('loginHistory') || '[]');
    existingLogins.push(loginData);
    localStorage.setItem('loginHistory', JSON.stringify(existingLogins));

    const demoUser: User = {
      name: selectedRole === 'teacher' ? 'Teacher Demo' : 'Student Demo',
      email: selectedRole === 'teacher' ? 'teacher@majsti.edu' : 'student@majsti.edu',
      profilePic: selectedRole === 'teacher' ? '👨‍🏫' : '👨‍🎓',
      role: selectedRole,
      language: language
    };
    onLogin(demoUser);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (isSignup && !name) {
      alert('Please enter your name');
      return;
    }

    // Store login/signup data
    const loginData = {
      timestamp: new Date().toISOString(),
      method: isSignup ? 'Email Signup' : 'Email Login',
      role: role,
      email: email,
      name: name || email.split('@')[0]
    };
    
    const existingLogins = JSON.parse(localStorage.getItem('loginHistory') || '[]');
    existingLogins.push(loginData);
    localStorage.setItem('loginHistory', JSON.stringify(existingLogins));

    // If signup, store user data
    if (isSignup) {
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      users.push({ email, password, name, role });
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    }

    const user: User = {
      name: name || email.split('@')[0],
      email: email,
      profilePic: role === 'teacher' ? '👨‍🏫' : '👨‍🎓',
      role: role,
      language: language
    };
    
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-2xl border border-border p-8 shadow-xl">
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setRole('student')}
              className={`p-4 rounded-lg border-2 transition-all ${
                role === 'student'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="text-3xl mb-2">👨‍🎓</div>
              <div className="text-sm font-semibold">Student</div>
            </button>
            <button
              onClick={() => setRole('teacher')}
              className={`p-4 rounded-lg border-2 transition-all ${
                role === 'teacher'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="text-3xl mb-2">👨‍🏫</div>
              <div className="text-sm font-semibold">Teacher</div>
            </button>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={() => handleGoogleLogin(role)}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-border rounded-lg hover:shadow-lg transition-all mb-4 group"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-semibold text-foreground">{t.googleButton}</span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">{t.or}</span>
            </div>
          </div>

          {/* Quick Demo Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleGoogleLogin('student')}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold"
            >
              {t.studentButton}
            </button>
            <button
              onClick={() => handleGoogleLogin('teacher')}
              className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all font-semibold"
            >
              {t.teacherButton}
            </button>
          </div>

          {/* Demo Note */}
          <div className="mt-6 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-center text-muted-foreground">
              🤖 {t.demoNote}
            </p>
          </div>
        </div>

        {/* AI Features Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-sm text-primary font-semibold">✨ Powered by AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}