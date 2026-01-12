import { BookOpen, Users, Trophy, MessageCircle, Sparkles, Target, GraduationCap } from 'lucide-react';
import type { Page, Language } from '../App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  language: Language;
}

export function HomePage({ onNavigate, language }: HomePageProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 shadow-sm glow-on-hover">
                <Sparkles className="w-4 h-4 text-primary animate-pulse-soft" />
                <span className="text-sm text-primary font-medium">AI-Powered Interactive Learning Platform</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Welcome to <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">MAJSTI LEARNING</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl">
                Discover a new way to learn English with AI-powered lessons, engaging games, 
                and a vibrant community. Master reading, writing, speaking, and listening through fun and effective learning experiences.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('games')}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-xl glow-on-hover font-semibold"
                >
                  🚀 Start Learning Now
                </button>
                <button
                  onClick={() => onNavigate('forum')}
                  className="px-6 py-3 bg-card text-foreground border border-border rounded-lg hover:bg-muted transition-all shadow-sm hover:shadow-md font-semibold"
                >
                  👥 Join Community
                </button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="card-hover">
                  <div className="text-2xl font-bold text-primary">5,000+</div>
                  <div className="text-sm text-muted-foreground">Active Learners</div>
                </div>
                <div className="card-hover">
                  <div className="text-2xl font-bold text-primary">200+</div>
                  <div className="text-sm text-muted-foreground">Lessons</div>
                </div>
                <div className="card-hover">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Games</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden shadow-2xl border border-primary/10">
                <GraduationCap className="w-64 h-64 text-primary/30 animate-float" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-full animate-bounce-gentle shadow-lg" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full animate-pulse-soft shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose MAJSTI LEARNING?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience learning like never before with our comprehensive platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Interactive Lessons"
              description="Engage with dynamic content designed to make learning fun and effective. Practice at your own pace with real-time feedback."
              color="bg-primary"
            />
            
            <FeatureCard
              icon={<Trophy className="w-8 h-8" />}
              title="Gamified Learning"
              description="Earn points, unlock achievements, and compete with friends. Turn your learning journey into an exciting adventure."
              color="bg-accent"
              onClick={() => onNavigate('games')}
            />
            
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Community Forum"
              description="Connect with fellow learners, share insights, and get help from our supportive community. Learn together, grow together."
              color="bg-secondary"
              onClick={() => onNavigate('forum')}
            />
            
            <FeatureCard
              icon={<MessageCircle className="w-8 h-8" />}
              title="Discussion Boards"
              description="Participate in topic-specific discussions, ask questions, and share your knowledge with others in the community."
              color="bg-primary"
            />
            
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="AI-Powered Learning"
              description="Get personalized feedback with advanced AI that analyzes your grammar, pronunciation, essays, and provides instant improvements."
              color="bg-accent"
            />
            
            <FeatureCard
              icon={<Target className="w-8 h-8" />}
              title="4 English Skills"
              description="Master Reading, Speaking, Writing, and Listening with structured lessons and AI-guided practice exercises."
              color="bg-secondary"
              onClick={() => onNavigate('4skills')}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of learners who are already mastering new skills with MAJSTI LEARNING
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('games')}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
            >
              Explore Games
            </button>
            <button
              onClick={() => onNavigate('forum')}
              className="px-8 py-4 bg-card text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Join Discussions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick?: () => void;
}

function FeatureCard({ icon, title, description, color, onClick }: FeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      }`}
    >
      <div className={`w-16 h-16 ${color} rounded-lg flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}