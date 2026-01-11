import { useState } from 'react';
import { FileText, Clock, Trophy, Download, Sparkles } from 'lucide-react';
import type { Language } from '../App';

interface TestPaper {
  id: number;
  title: string;
  level: string;
  duration: number;
  questions: number;
  topics: string[];
  type: 'grammar' | 'reading' | 'writing' | 'listening' | 'comprehensive';
}

const testPapers: TestPaper[] = [
  {
    id: 1,
    title: 'Basic Grammar Test',
    level: 'Beginner',
    duration: 30,
    questions: 25,
    topics: ['Articles', 'Nouns', 'Verbs', 'Tenses'],
    type: 'grammar'
  },
  {
    id: 2,
    title: 'Intermediate English Proficiency Test',
    level: 'Intermediate',
    duration: 60,
    questions: 50,
    topics: ['Grammar', 'Vocabulary', 'Reading Comprehension'],
    type: 'comprehensive'
  },
  {
    id: 3,
    title: 'Advanced Writing Skills Assessment',
    level: 'Advanced',
    duration: 90,
    questions: 10,
    topics: ['Essay Writing', 'Formal Letters', 'Creative Writing'],
    type: 'writing'
  },
  {
    id: 4,
    title: 'Cambridge IGCSE Practice Test',
    level: 'IGCSE',
    duration: 120,
    questions: 75,
    topics: ['All Grammar Chapters', 'Comprehension', 'Essay'],
    type: 'comprehensive'
  },
  {
    id: 5,
    title: 'Reading Comprehension Test',
    level: 'Intermediate',
    duration: 45,
    questions: 20,
    topics: ['Reading Skills', 'Inference', 'Vocabulary'],
    type: 'reading'
  },
  {
    id: 6,
    title: 'Vocabulary and Usage Test',
    level: 'Beginner',
    duration: 30,
    questions: 30,
    topics: ['Word Meanings', 'Synonyms', 'Antonyms'],
    type: 'grammar'
  }
];

interface TestPapersProps {
  language: Language;
}

export function TestPapers({ language }: TestPapersProps) {
  const [selectedTest, setSelectedTest] = useState<TestPaper | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);

  const startTest = (test: TestPaper) => {
    setSelectedTest(test);
    setTestStarted(true);
    setTimeLeft(test.duration * 60);
    setCurrentQuestion(1);
  };

  const downloadTest = (test: TestPaper) => {
    // Simulate PDF download
    alert(`Downloading ${test.title} test paper...`);
  };

  if (testStarted && selectedTest) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Test Header */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{selectedTest.title}</h2>
              <p className="text-muted-foreground">
                Question {currentQuestion} of {selectedTest.questions}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 text-primary">
                <Clock className="w-5 h-5" />
                <span className="text-xl font-bold">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Time Left</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(currentQuestion / selectedTest.questions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Area */}
        <div className="bg-card rounded-xl border border-border p-8 mb-6">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Sample Question {currentQuestion}
          </h3>
          <p className="text-foreground mb-6">
            Choose the correct answer for the following sentence:
            <br /><br />
            "She ___ to the market every Sunday."
          </p>
          <div className="space-y-3">
            {['go', 'goes', 'going', 'gone'].map((option, index) => (
              <button
                key={index}
                className="w-full p-4 rounded-lg text-left border-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(1, currentQuestion - 1))}
            disabled={currentQuestion === 1}
            className="px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (currentQuestion < selectedTest.questions) {
                setCurrentQuestion(currentQuestion + 1);
              } else {
                setTestStarted(false);
                alert('Test completed! Your results will be analyzed by AI.');
              }
            }}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            {currentQuestion < selectedTest.questions ? 'Next' : 'Submit Test'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">📝 English Test Papers</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI-graded comprehensive assessments based on Cambridge syllabus
            </p>
          </div>
        </div>
      </div>

      {/* AI Features Info */}
      <div className="mb-8 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-semibold text-foreground mb-1">🤖 AI-Powered Assessment</p>
            <p className="text-sm text-muted-foreground">
              All test papers are automatically graded by our AI system. Get instant results with detailed explanations,
              performance analytics, and personalized improvement recommendations!
            </p>
          </div>
        </div>
      </div>

      {/* Test Papers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testPapers.map((test) => (
          <div
            key={test.id}
            className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all group"
          >
            <div className={`p-4 ${
              test.level === 'Beginner' ? 'bg-green-100' :
              test.level === 'Intermediate' ? 'bg-yellow-100' :
              test.level === 'Advanced' ? 'bg-red-100' :
              'bg-blue-100'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  test.level === 'Beginner' ? 'bg-green-200 text-green-800' :
                  test.level === 'Intermediate' ? 'bg-yellow-200 text-yellow-800' :
                  test.level === 'Advanced' ? 'bg-red-200 text-red-800' :
                  'bg-blue-200 text-blue-800'
                }`}>
                  {test.level}
                </span>
                <span className="text-2xl">
                  {test.type === 'grammar' ? '📚' :
                   test.type === 'reading' ? '📖' :
                   test.type === 'writing' ? '✍️' :
                   test.type === 'listening' ? '🎧' :
                   '📝'}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {test.title}
              </h3>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{test.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>{test.questions} questions</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Topics Covered:</p>
                <div className="flex flex-wrap gap-2">
                  {test.topics.map((topic, index) => (
                    <span key={index} className="px-2 py-1 bg-muted rounded text-xs">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startTest(test)}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-semibold"
                >
                  Start Test
                </button>
                <button
                  onClick={() => downloadTest(test)}
                  className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Results Section */}
      <div className="mt-12 bg-card rounded-xl border border-border p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <Trophy className="w-7 h-7 text-primary" />
          Your Test History
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">Basic Grammar Test</p>
                <p className="text-sm text-muted-foreground">Completed: 2 days ago</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">85%</p>
                <p className="text-xs text-muted-foreground">AI Score</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-center text-muted-foreground">
            Complete more tests to see your progress tracked here!
          </p>
        </div>
      </div>
    </div>
  );
}
