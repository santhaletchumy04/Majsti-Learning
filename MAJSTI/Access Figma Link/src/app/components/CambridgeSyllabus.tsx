import { useState } from 'react';
import { GraduationCap, CheckCircle2, Circle, BookOpen, FileText } from 'lucide-react';
import type { Language, User } from '../App';

interface SyllabusItem {
  id: number;
  chapter: string;
  topics: string[];
  completed: boolean;
  score?: number;
}

const cambridgeSyllabus: SyllabusItem[] = [
  { id: 1, chapter: 'Reading Comprehension', topics: ['Inference', 'Main Ideas', 'Supporting Details', 'Vocabulary in Context'], completed: true, score: 88 },
  { id: 2, chapter: 'Writing Skills', topics: ['Essay Structure', 'Formal Letters', 'Reports', 'Creative Writing'], completed: true, score: 85 },
  { id: 3, chapter: 'Grammar & Usage', topics: ['All 14 Grammar Chapters', 'Sentence Structure', 'Punctuation'], completed: false },
  { id: 4, chapter: 'Speaking & Listening', topics: ['Pronunciation', 'Oral Presentations', 'Listening Comprehension'], completed: false },
  { id: 5, chapter: 'Literature Study', topics: ['Poetry Analysis', 'Novel Study', 'Drama & Plays', 'Literary Devices'], completed: false },
  { id: 6, chapter: 'Directed Writing', topics: ['Letters', 'Reports', 'Articles', 'Speeches'], completed: false },
  { id: 7, chapter: 'Composition', topics: ['Narrative Writing', 'Descriptive Writing', 'Argumentative Writing'], completed: false },
  { id: 8, chapter: 'Summary Writing', topics: ['Identifying Key Points', 'Paraphrasing', 'Word Limits'], completed: false },
];

interface CambridgeSyllabusProps {
  language: Language;
  user: User;
}

export function CambridgeSyllabus({ language, user }: CambridgeSyllabusProps) {
  const [selectedChapter, setSelectedChapter] = useState<SyllabusItem | null>(null);

  const completedCount = cambridgeSyllabus.filter(item => item.completed).length;
  const progressPercentage = (completedCount / cambridgeSyllabus.length) * 100;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">🎓 Cambridge English Syllabus</h1>
            <p className="text-muted-foreground">Track your progress through the Cambridge IGCSE curriculum</p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-card rounded-xl border border-border p-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Your Progress</h2>
          <span className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full h-4 bg-muted rounded-full mb-6">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{cambridgeSyllabus.length - completedCount}</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold text-primary">{cambridgeSyllabus.length}</p>
            <p className="text-sm text-muted-foreground">Total Chapters</p>
          </div>
        </div>
      </div>

      {/* Syllabus Chapters */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Curriculum Chapters</h2>
        {cambridgeSyllabus.map((item) => (
          <div
            key={item.id}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setSelectedChapter(item)}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {item.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      Chapter {item.id}: {item.chapter}
                    </h3>
                    {item.completed && item.score && (
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        Score: {item.score}%
                      </span>
                    )}
                  </div>
                  {item.completed ? (
                    <span className="text-sm text-green-600 font-semibold">✓ Completed</span>
                  ) : (
                    <span className="text-sm text-yellow-600 font-semibold">In Progress</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.topics.map((topic, index) => (
                    <span key={index} className="px-3 py-1 bg-muted text-foreground rounded-lg text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Resources */}
      <div className="mt-8 bg-card rounded-xl border border-border p-6">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Cambridge IGCSE Resources
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">📝 Practice Papers</h4>
            <p className="text-sm text-muted-foreground">Access Cambridge-style test papers and marking schemes</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">📚 Study Materials</h4>
            <p className="text-sm text-muted-foreground">Comprehensive notes and revision guides for all chapters</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">🎯 Mock Exams</h4>
            <p className="text-sm text-muted-foreground">Full-length practice exams with AI grading</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">💡 Exam Tips</h4>
            <p className="text-sm text-muted-foreground">Strategies and techniques for Cambridge IGCSE success</p>
          </div>
        </div>
      </div>

      {/* Chapter Detail Modal */}
      {selectedChapter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedChapter(null)}>
          <div className="bg-card rounded-2xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Chapter {selectedChapter.id}: {selectedChapter.chapter}
            </h3>
            
            {selectedChapter.completed && selectedChapter.score && (
              <div className="mb-6 p-4 bg-green-100 rounded-lg">
                <p className="text-green-800 font-semibold">✓ Chapter Completed!</p>
                <p className="text-green-700 text-sm">Your Score: {selectedChapter.score}%</p>
              </div>
            )}

            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-3">Topics Covered:</h4>
              <ul className="space-y-2">
                {selectedChapter.topics.map((topic, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              {!selectedChapter.completed && (
                <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Start Learning
                </button>
              )}
              <button
                onClick={() => setSelectedChapter(null)}
                className="flex-1 px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
