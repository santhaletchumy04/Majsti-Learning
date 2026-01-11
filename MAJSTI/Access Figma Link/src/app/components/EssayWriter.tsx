import { useState } from 'react';
import { PenTool, Sparkles, Check, AlertCircle, Lightbulb, FileText } from 'lucide-react';
import type { Language, User } from '../App';

interface EssayWriterProps {
  language: Language;
  user: User;
}

export function EssayWriter({ language, user }: EssayWriterProps) {
  const [essayTitle, setEssayTitle] = useState('');
  const [essayContent, setEssayContent] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<{
    grammar: { score: number; issues: string[] };
    vocabulary: { score: number; suggestions: string[] };
    structure: { score: number; tips: string[] };
    overallScore: number;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeEssay = () => {
    if (!essayContent.trim()) {
      alert('Please write some content first!');
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setAiAnalysis({
        grammar: {
          score: 85,
          issues: [
            'Line 3: Consider using "have been" instead of "has been" for plural subject',
            'Line 7: Missing comma after introductory phrase',
            'Line 12: Subject-verb agreement error'
          ]
        },
        vocabulary: {
          score: 78,
          suggestions: [
            'Replace "good" with more specific adjectives like "excellent" or "beneficial"',
            'Use "consequently" instead of repeated "so"',
            'Consider synonyms for "important" to avoid repetition'
          ]
        },
        structure: {
          score: 90,
          tips: [
            'Strong introduction with clear thesis statement',
            'Good use of topic sentences in body paragraphs',
            'Consider adding a counter-argument paragraph for balance'
          ]
        },
        overallScore: 84
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const aiGenerateOutline = () => {
    const outline = `
Introduction:
  - Hook: Start with an interesting fact or question
  - Background information
  - Thesis statement

Body Paragraph 1:
  - Topic sentence
  - Supporting evidence
  - Examples
  - Concluding sentence

Body Paragraph 2:
  - Topic sentence
  - Supporting evidence
  - Examples
  - Concluding sentence

Body Paragraph 3:
  - Topic sentence
  - Supporting evidence
  - Examples
  - Concluding sentence

Conclusion:
  - Restate thesis
  - Summarize main points
  - Closing thought or call to action
    `;
    alert('AI Generated Outline:\n' + outline);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <PenTool className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">✍️ AI Essay Writing Assistant</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Advanced AI-powered grammar, vocabulary, and structure analysis
            </p>
          </div>
        </div>
      </div>

      {/* AI Features Banner */}
      <div className="mb-8 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-semibold text-foreground mb-1">🤖 AI Writing Coach</p>
            <p className="text-sm text-muted-foreground">
              Our AI analyzes grammar, vocabulary, essay structure, coherence, and provides personalized suggestions
              to improve your writing skills. Get instant feedback on your essays!
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Writing Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title Input */}
          <div className="bg-card rounded-xl border border-border p-4">
            <label className="block text-sm font-semibold text-foreground mb-2">Essay Title</label>
            <input
              type="text"
              value={essayTitle}
              onChange={(e) => setEssayTitle(e.target.value)}
              placeholder="Enter your essay title..."
              className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Content Editor */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-foreground">Essay Content</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={aiGenerateOutline}
                  className="text-xs px-3 py-1 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 flex items-center gap-1"
                >
                  <Lightbulb className="w-3 h-3" />
                  AI Outline
                </button>
                <span className="text-xs text-muted-foreground">
                  {essayContent.split(' ').filter(w => w).length} words
                </span>
              </div>
            </div>
            <textarea
              value={essayContent}
              onChange={(e) => setEssayContent(e.target.value)}
              placeholder="Start writing your essay here... The AI will analyze your grammar, vocabulary, and structure."
              className="w-full h-96 p-4 bg-input-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={analyzeEssay}
              disabled={isAnalyzing}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analyze with AI
                </>
              )}
            </button>
            <button className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-semibold">
              Save Draft
            </button>
          </div>
        </div>

        {/* AI Analysis Panel */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              AI Analysis
            </h3>

            {!aiAnalysis ? (
              <div className="text-center py-8">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Write your essay and click "Analyze with AI" to get instant feedback!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Overall Score</p>
                  <p className="text-4xl font-bold text-primary">{aiAnalysis.overallScore}%</p>
                </div>

                {/* Grammar Analysis */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">Grammar</h4>
                    <span className="text-sm font-bold text-primary">{aiAnalysis.grammar.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full mb-3">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${aiAnalysis.grammar.score}%` }} />
                  </div>
                  <div className="space-y-2">
                    {aiAnalysis.grammar.issues.map((issue, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <AlertCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vocabulary Analysis */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">Vocabulary</h4>
                    <span className="text-sm font-bold text-primary">{aiAnalysis.vocabulary.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full mb-3">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${aiAnalysis.vocabulary.score}%` }} />
                  </div>
                  <div className="space-y-2">
                    {aiAnalysis.vocabulary.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Lightbulb className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Structure Analysis */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">Structure</h4>
                    <span className="text-sm font-bold text-primary">{aiAnalysis.structure.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full mb-3">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${aiAnalysis.structure.score}%` }} />
                  </div>
                  <div className="space-y-2">
                    {aiAnalysis.structure.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Writing Tips */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <h4 className="font-semibold text-foreground mb-2">📚 Essay Types</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Argumentative</li>
            <li>• Descriptive</li>
            <li>• Narrative</li>
            <li>• Expository</li>
          </ul>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <h4 className="font-semibold text-foreground mb-2">💡 Quick Tips</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use clear topic sentences</li>
            <li>• Provide evidence</li>
            <li>• Vary sentence structure</li>
            <li>• Proofread carefully</li>
          </ul>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <h4 className="font-semibold text-foreground mb-2">🎯 AI Features</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Grammar correction</li>
            <li>• Vocabulary enhancement</li>
            <li>• Structure analysis</li>
            <li>• Plagiarism detection</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
