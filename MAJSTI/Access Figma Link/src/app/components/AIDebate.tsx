import { useState } from 'react';
import { MessageSquare, Sparkles, Send, Trophy, Clock } from 'lucide-react';
import type { Language, User } from '../App';

interface DebateMessage {
  id: number;
  role: 'user' | 'ai';
  message: string;
  timestamp: string;
}

interface DebateTopic {
  id: number;
  topic: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const debateTopics: DebateTopic[] = [
  { id: 1, topic: 'Technology makes life better', category: 'Technology', difficulty: 'beginner' },
  { id: 2, topic: 'School uniforms should be mandatory', category: 'Education', difficulty: 'beginner' },
  { id: 3, topic: 'Social media has more benefits than drawbacks', category: 'Society', difficulty: 'intermediate' },
  { id: 4, topic: 'Climate change is the most pressing global issue', category: 'Environment', difficulty: 'intermediate' },
  { id: 5, topic: 'Artificial Intelligence will replace many human jobs', category: 'Technology', difficulty: 'advanced' },
  { id: 6, topic: 'Homework should be abolished', category: 'Education', difficulty: 'beginner' },
];

interface AIDebateProps {
  language: Language;
  user: User;
}

export function AIDebate({ language, user }: AIDebateProps) {
  const [selectedTopic, setSelectedTopic] = useState<DebateTopic | null>(null);
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [debateStarted, setDebateStarted] = useState(false);
  const [debateScore, setDebateScore] = useState(0);
  const [turnCount, setTurnCount] = useState(0);

  const startDebate = (topic: DebateTopic) => {
    setSelectedTopic(topic);
    setDebateStarted(true);
    setMessages([
      {
        id: 1,
        role: 'ai',
        message: `Hello! I'll be your debate opponent today. Our topic is: "${topic.topic}". I'll be arguing against this position. Please present your opening argument in favor of the topic. Remember to use clear reasoning and examples!`,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    setTurnCount(0);
    setDebateScore(0);
  };

  const sendMessage = () => {
    if (!userInput.trim() || !selectedTopic) return;

    // Add user message
    const userMessage: DebateMessage = {
      id: messages.length + 1,
      role: 'user',
      message: userInput,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsAITyping(true);
    setTurnCount(prev => prev + 1);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        `That's an interesting point! However, I must counter by saying that while ${userInput.substring(0, 20)}... may seem beneficial, we must consider the broader implications. For instance, studies have shown that there are significant drawbacks to consider.`,
        `I appreciate your argument, but I respectfully disagree. Let me present an alternative perspective: Research indicates that your position overlooks several critical factors that could undermine your main point.`,
        `Your reasoning raises valid concerns, yet I believe you're missing a crucial aspect. Consider this: historical evidence suggests that similar approaches have led to unexpected consequences in the past.`,
        `While I understand your viewpoint, the data doesn't fully support that conclusion. Allow me to present counterevidence: Multiple studies have demonstrated that the opposite position holds stronger merit when we examine the long-term effects.`,
        `That's a compelling argument, but let me challenge that assumption. If we look at real-world examples, we can see that your premise doesn't always hold true in practical applications.`
      ];

      const aiMessage: DebateMessage = {
        id: messages.length + 2,
        role: 'ai',
        message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsAITyping(false);
      
      // Award points based on message length and complexity
      const points = Math.min(20, Math.floor(userInput.split(' ').length / 2));
      setDebateScore(prev => prev + points);
    }, 2000);
  };

  const endDebate = () => {
    const aiMessage: DebateMessage = {
      id: messages.length + 1,
      role: 'ai',
      message: `🤖 Debate Analysis:

Excellent debate! Here's your performance summary:

📊 Your Score: ${debateScore} points
💬 Total Arguments: ${turnCount}
📈 Argumentation Quality: ${debateScore > 80 ? 'Excellent' : debateScore > 50 ? 'Good' : 'Needs Improvement'}

Strengths:
• Clear expression of ideas
• Good use of reasoning
• Appropriate language level

Areas for Improvement:
• Provide more specific examples
• Address counterarguments more directly
• Use stronger transitional phrases

Keep practicing to improve your debate skills! Would you like to try another topic?`,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, aiMessage]);
  };

  if (!debateStarted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">🤖 AI Debate Arena</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Practice debating with our advanced AI opponent
              </p>
            </div>
          </div>
        </div>

        {/* AI Info */}
        <div className="mb-8 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold text-foreground mb-1">🤖 AI Debate Coach</p>
              <p className="text-sm text-muted-foreground">
                Our AI opponent will challenge your arguments, provide counterpoints, and help you develop
                critical thinking and persuasive speaking skills. Get real-time feedback on your debate performance!
              </p>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <h2 className="text-2xl font-bold text-foreground mb-6">Choose Your Debate Topic</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {debateTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => startDebate(topic)}
              className="group bg-card rounded-xl border-2 border-border hover:border-primary p-6 transition-all hover:shadow-xl hover:scale-105 text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">💬</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  topic.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  topic.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {topic.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {topic.topic}
              </h3>
              <p className="text-sm text-muted-foreground">{topic.category}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => {
            setDebateStarted(false);
            setSelectedTopic(null);
            setMessages([]);
          }}
          className="text-primary hover:text-primary/80 mb-4"
        >
          ← Back to Topics
        </button>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">{selectedTopic?.topic}</h2>
              <p className="text-sm text-muted-foreground">{selectedTopic?.category}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{debateScore}</div>
                <div className="text-xs text-muted-foreground">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{turnCount}</div>
                <div className="text-xs text-muted-foreground">Turns</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Debate Messages */}
      <div className="bg-card rounded-xl border border-border mb-6">
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${
                message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
              } rounded-lg p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  {message.role === 'ai' && <span className="text-sm font-semibold">🤖 AI Opponent</span>}
                  {message.role === 'user' && <span className="text-sm font-semibold">You</span>}
                  <span className="text-xs opacity-70">{message.timestamp}</span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.message}</p>
              </div>
            </div>
          ))}
          
          {isAITyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">🤖 AI Opponent</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <div className="flex gap-3">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your argument here... Make it compelling!"
              className="flex-1 p-3 bg-input-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <div className="flex flex-col gap-2">
              <button
                onClick={sendMessage}
                disabled={!userInput.trim() || isAITyping}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
              <button
                onClick={endDebate}
                className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm"
              >
                End Debate
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            💡 Tip: Use strong arguments, provide examples, and address counterpoints to earn more points!
          </p>
        </div>
      </div>

      {/* Debate Tips */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <h4 className="font-semibold text-foreground mb-2">🎯 Strong Arguments</h4>
          <p className="text-sm text-muted-foreground">Back your claims with evidence and examples</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <h4 className="font-semibold text-foreground mb-2">🔄 Counter Responses</h4>
          <p className="text-sm text-muted-foreground">Address the AI's counterarguments directly</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <h4 className="font-semibold text-foreground mb-2">📝 Clear Language</h4>
          <p className="text-sm text-muted-foreground">Use precise and persuasive vocabulary</p>
        </div>
      </div>
    </div>
  );
}
