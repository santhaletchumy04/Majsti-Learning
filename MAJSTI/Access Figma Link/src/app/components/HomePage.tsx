import { BookOpen, Users, Trophy, MessageCircle, Sparkles, GraduationCap } from 'lucide-react';
import type { Page, Language } from '../App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  language: Language;
}

export function HomePage({ onNavigate, language }: HomePageProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">Interactive Learning Platform</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Welcome to <span className="text-primary">MAJSTI LEARNING</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl">
                Discover a new way to learn with interactive lessons, engaging games, 
                and a vibrant community. Master new skills through fun and effective learning experiences.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('games')}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                >
                  Start Learning
                </button>
                <button
                  onClick={() => onNavigate('forum')}
                  className="px-6 py-3 bg-card text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Join Community
                </button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-2xl font-bold text-primary">5,000+</div>
                  <div className="text-sm text-muted-foreground">Active Learners</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">200+</div>
                  <div className="text-sm text-muted-foreground">Lessons</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Games</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden shadow-2xl">
                <GraduationCap className="w-64 h-64 text-primary/30" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full animate-pulse" />
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
              title="Personalized Path"
              description="Get customized learning recommendations based on your progress and interests. Your unique journey awaits."
              color="bg-accent"
            />
            
            <FeatureCard
              icon={<GraduationCap className="w-8 h-8" />}
              title="Expert Content"
              description="Learn from carefully crafted materials created by education professionals and industry experts."
              color="bg-secondary"
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