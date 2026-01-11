import { useState } from 'react';
import { BookMarked, Sparkles, FileText, MessageCircle } from 'lucide-react';
import type { Language } from '../App';

interface Literature {
  id: number;
  title: string;
  author: string;
  type: 'novel' | 'poem' | 'play' | 'short story';
  level: string;
  excerpt: string;
}

const literatures: Literature[] = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    type: 'novel',
    level: 'Advanced',
    excerpt: 'A classic novel about racial injustice and moral growth in the American South.'
  },
  {
    id: 2,
    title: 'The Road Not Taken',
    author: 'Robert Frost',
    type: 'poem',
    level: 'Intermediate',
    excerpt: 'Two roads diverged in a yellow wood, And sorry I could not travel both...'
  },
  {
    id: 3,
    title: 'Romeo and Juliet',
    author: 'William Shakespeare',
    type: 'play',
    level: 'Advanced',
    excerpt: 'A tragic love story set in Verona, exploring themes of love, fate, and family conflict.'
  },
  {
    id: 4,
    title: 'The Gift of the Magi',
    author: 'O. Henry',
    type: 'short story',
    level: 'Intermediate',
    excerpt: 'A touching story about love and sacrifice during Christmas time.'
  }
];

const sampleQuestions = [
  'What is the main theme of the text?',
  'Describe the protagonist\'s character development.',
  'Identify and explain three literary devices used.',
  'What is the significance of the title?',
  'How does the setting contribute to the story?',
  'Analyze the author\'s writing style.',
  'What is the climax of the story?',
  'Explain the symbolism in the text.',
  'Compare this work with another by the same author.',
  'What social issues are addressed in the text?'
];

interface LiteratureHubProps {
  language: Language;
}

export function LiteratureHub({ language }: LiteratureHubProps) {
  const [selectedLiterature, setSelectedLiterature] = useState<Literature | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const analyzeAnswer = () => {
    if (!userAnswer.trim()) {
      alert('Please write your answer first!');
      return;
    }

    // Simulate AI analysis
    setTimeout(() => {
      setAiAnalysis(`
🤖 AI Analysis of Your Answer:

✅ Strengths:
• Good understanding of the main theme
• Clear and well-structured response
• Appropriate use of textual evidence

💡 Areas for Improvement:
• Consider exploring deeper symbolic meanings
• Add more specific quotes from the text
• Discuss the historical context

📊 Score: 85/100

Your answer demonstrates strong analytical skills and good comprehension of the literature. 
Focus on providing more detailed textual analysis to reach the highest levels.
      `);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <BookMarked className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">📚 Literature & Novel Study Hub</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI-powered literary analysis and comprehension practice
            </p>
          </div>
        </div>
      </div>

      {/* AI Features */}
      <div className="mb-8 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-semibold text-foreground mb-1">🤖 AI Literature Assistant</p>
            <p className="text-sm text-muted-foreground">
              Our AI analyzes your literary responses, provides detailed feedback on interpretation and analysis,
              and helps you understand complex literary devices, themes, and character development.
            </p>
          </div>
        </div>
      </div>

      {selectedLiterature ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Question and Answer Area */}
          <div className="lg:col-span-2 space-y-6">
            <button
              onClick={() => setSelectedLiterature(null)}
              className="text-primary hover:text-primary/80"
            >
              ← Back to Literature List
            </button>

            {/* Literature Info */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{selectedLiterature.title}</h2>
                  <p className="text-muted-foreground">by {selectedLiterature.author}</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {selectedLiterature.type}
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                    {selectedLiterature.level}
                  </span>
                </div>
              </div>
              <p className="text-foreground italic">{selectedLiterature.excerpt}</p>
            </div>

            {/* Practice Questions */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                AI-Generated Practice Questions
              </h3>
              <div className="space-y-3 mb-6">
                {sampleQuestions.map((question, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <p className="text-foreground">
                      <span className="font-semibold text-primary">{index + 1}.</span> {question}
                    </p>
                  </div>
                ))}
              </div>

              {/* Answer Input */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Your Answer (Choose any question above)
                </label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Write your detailed answer here... AI will provide feedback on your literary analysis."
                  className="w-full h-48 p-4 bg-input-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                />
                <button
                  onClick={analyzeAnswer}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Analyze with AI
                </button>
              </div>
            </div>

            {/* AI Analysis Result */}
            {aiAnalysis && (
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
                <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                  {aiAnalysis}
                </pre>
              </div>
            )}
          </div>

          {/* Literary Devices Guide */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <h3 className="font-bold text-foreground mb-4">📖 Literary Devices</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-foreground">Metaphor</p>
                  <p className="text-muted-foreground">Direct comparison without "like" or "as"</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Simile</p>
                  <p className="text-muted-foreground">Comparison using "like" or "as"</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Personification</p>
                  <p className="text-muted-foreground">Giving human qualities to non-human things</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Symbolism</p>
                  <p className="text-muted-foreground">Using objects to represent ideas</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Foreshadowing</p>
                  <p className="text-muted-foreground">Hints about future events</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Irony</p>
                  <p className="text-muted-foreground">Contrast between expectation and reality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Literature Grid */
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {literatures.map((lit) => (
            <button
              key={lit.id}
              onClick={() => setSelectedLiterature(lit)}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all hover:scale-105 text-left"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <BookMarked className="w-20 h-20 text-primary/40" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {lit.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{lit.author}</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                    {lit.type}
                  </span>
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                    {lit.level}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
