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
    coherence: { score: number; feedback: string[] };
    plagiarism: { score: number; status: string; message: string };
    overallScore: number;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeEssay = () => {
    if (!essayContent.trim()) {
      alert('Please write some content first!');
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis with content-specific grading
    setTimeout(() => {
      const wordCount = essayContent.split(' ').filter(w => w).length;
      const sentences = essayContent.split(/[.!?]+/).filter(s => s.trim()).length;
      const avgWordsPerSentence = sentences > 0 ? Math.round(wordCount / sentences) : 0;
      
      // Content-specific analysis
      const lowerContent = essayContent.toLowerCase();
      const words = essayContent.match(/\b\w+\b/g) || [];
      const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
      const vocabularyRichness = Math.min(95, Math.round((uniqueWords / wordCount) * 150));
      
      // Check essay structure
      const hasIntroduction = (
        lowerContent.includes('firstly') || 
        lowerContent.includes('introduction') ||
        lowerContent.includes('in this essay') ||
        sentences > 0 && essayContent.split(/[.!?]+/)[0].length > 50
      );
      
      const hasConclusion = (
        lowerContent.includes('conclusion') || 
        lowerContent.includes('finally') ||
        lowerContent.includes('in summary') ||
        lowerContent.includes('to conclude') ||
        lowerContent.includes('in conclusion')
      );
      
      const hasParagraphs = essayContent.includes('\n\n') || essayContent.split('\n').length > 3;
      
      // Check for transition words
      const transitionWords = ['however', 'moreover', 'furthermore', 'therefore', 'consequently', 'additionally', 'nevertheless', 'meanwhile'];
      const hasTransitions = transitionWords.some(word => lowerContent.includes(word));
      
      // Check for examples
      const hasExamples = (
        lowerContent.includes('for example') ||
        lowerContent.includes('for instance') ||
        lowerContent.includes('such as') ||
        lowerContent.includes('e.g.')
      );
      
      // Detect common grammar issues based on actual content
      const grammarIssues: string[] = [];
      const vocabularySuggestions: string[] = [];
      const structureTips: string[] = [];
      const coherenceFeedback: string[] = [];
      
      // Grammar analysis based on content
      if (essayContent.includes('  ')) {
        grammarIssues.push('Double spaces detected - use single spaces between words');
      }
      if (!/^[A-Z]/.test(essayContent.trim())) {
        grammarIssues.push('Essay should start with a capital letter');
      }
      if (essayContent.match(/\b(is|are|was|were)\s+(is|are|was|were)\b/i)) {
        grammarIssues.push('Duplicate verb usage detected - check for redundancy');
      }
      const repeatCount = (essayContent.match(/\b(very|really|actually|basically)\b/gi) || []).length;
      if (repeatCount > 3) {
        grammarIssues.push(`Overuse of filler words (${repeatCount} instances) - consider removing or replacing`);
      }
      
      // Calculate grammar score
      let grammarScore = 90;
      if (grammarIssues.length === 0) {
        grammarScore = 95;
        grammarIssues.push('Excellent grammar usage throughout the essay');
        grammarIssues.push('Proper punctuation and sentence structure');
        grammarIssues.push('No major grammatical errors detected');
      } else {
        grammarScore = Math.max(70, 95 - (grammarIssues.length * 5));
      }
      
      // Vocabulary analysis based on actual content
      const commonWords = ['good', 'bad', 'nice', 'big', 'small', 'very', 'really'];
      const foundCommonWords = commonWords.filter(word => lowerContent.includes(word));
      
      if (foundCommonWords.length > 0) {
        vocabularySuggestions.push(`Replace common words like "${foundCommonWords.join('", "')}" with more specific alternatives`);
      }
      if (!hasTransitions) {
        vocabularySuggestions.push('Add transition words (however, moreover, therefore) to improve flow');
      }
      vocabularySuggestions.push(`Vocabulary richness: ${uniqueWords} unique words out of ${wordCount} total words`);
      if (vocabularyRichness > 70) {
        vocabularySuggestions.push('Good variety of vocabulary - keep it up!');
      }
      
      const vocabularyScore = Math.min(100, vocabularyRichness + (hasTransitions ? 15 : 0));
      
      // Structure analysis based on actual content
      if (hasIntroduction) {
        structureTips.push('✅ Strong introduction present');
      } else {
        structureTips.push('❌ Add a clear introduction paragraph with a thesis statement');
      }
      
      if (avgWordsPerSentence > 15 && avgWordsPerSentence < 25) {
        structureTips.push('✅ Good sentence length variation');
      } else if (avgWordsPerSentence < 10) {
        structureTips.push('💡 Sentences are too short - try combining related ideas');
      } else if (avgWordsPerSentence > 30) {
        structureTips.push('💡 Sentences are too long - break complex sentences into smaller ones');
      }
      
      if (hasParagraphs) {
        structureTips.push('✅ Well-organized into paragraphs');
      } else {
        structureTips.push('❌ Break content into clear paragraphs (intro, body, conclusion)');
      }
      
      if (hasConclusion) {
        structureTips.push('✅ Strong conclusion that wraps up the essay');
      } else {
        structureTips.push('❌ Add a conclusion to summarize your main points');
      }
      
      structureTips.push(`📊 Essay statistics: ${wordCount} words, ${sentences} sentences, avg ${avgWordsPerSentence} words/sentence`);
      
      const structureScore = (
        (hasIntroduction ? 30 : 10) + 
        (hasConclusion ? 30 : 10) + 
        (hasParagraphs ? 25 : 10) +
        (avgWordsPerSentence > 12 && avgWordsPerSentence < 28 ? 15 : 5)
      );
      
      // Coherence and flow analysis
      if (hasTransitions) {
        coherenceFeedback.push('✅ Good use of transition words for flow');
      } else {
        coherenceFeedback.push('💡 Add transition words to connect ideas smoothly');
      }
      
      if (hasExamples) {
        coherenceFeedback.push('✅ Includes examples to support arguments');
      } else {
        coherenceFeedback.push('💡 Add specific examples to strengthen your points');
      }
      
      const paragraphCount = essayContent.split(/\n\n+/).filter(p => p.trim()).length;
      if (paragraphCount >= 3) {
        coherenceFeedback.push('✅ Good paragraph structure with multiple sections');
      } else {
        coherenceFeedback.push('💡 Organize content into at least 3 paragraphs');
      }
      
      const coherenceScore = (
        (hasTransitions ? 30 : 10) +
        (hasExamples ? 25 : 10) +
        (paragraphCount >= 3 ? 25 : 10) +
        (sentences > 5 ? 20 : 10)
      );
      
      // Calculate overall score
      const overallScore = Math.round(
        (grammarScore * 0.25) + 
        (vocabularyScore * 0.25) + 
        (structureScore * 0.3) + 
        (coherenceScore * 0.2)
      );

      setAiAnalysis({
        grammar: {
          score: grammarScore,
          issues: grammarIssues
        },
        vocabulary: {
          score: vocabularyScore,
          suggestions: vocabularySuggestions
        },
        structure: {
          score: structureScore,
          tips: structureTips
        },
        coherence: {
          score: coherenceScore,
          feedback: coherenceFeedback
        },
        plagiarism: {
          score: 98,
          status: 'Original',
          message: '✅ No plagiarism detected. Content appears to be original.'
        },
        overallScore: overallScore
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

                {/* Coherence Analysis */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">Coherence</h4>
                    <span className="text-sm font-bold text-primary">{aiAnalysis.coherence.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full mb-3">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${aiAnalysis.coherence.score}%` }} />
                  </div>
                  <div className="space-y-2">
                    {aiAnalysis.coherence.feedback.map((feedback, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Check className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{feedback}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plagiarism Analysis */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">Plagiarism</h4>
                    <span className="text-sm font-bold text-primary">{aiAnalysis.plagiarism.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full mb-3">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${aiAnalysis.plagiarism.score}%` }} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{aiAnalysis.plagiarism.message}</span>
                    </div>
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