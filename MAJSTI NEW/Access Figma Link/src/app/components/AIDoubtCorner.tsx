import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import type { Language } from '../App';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIDoubtCornerProps {
  language: Language;
}

export function AIDoubtCorner({ language }: AIDoubtCornerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hello! I'm your AI Learning Assistant. Ask me anything about English grammar, vocabulary, essays, or any topic you're studying!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "Explain past perfect tense",
    "What's the difference between 'affect' and 'effect'?",
    "How do I write a good introduction?",
    "Give me synonyms for 'important'"
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    // Grammar and tenses
    if (lowerQuestion.includes('past perfect') || lowerQuestion.includes('tense')) {
      if (lowerQuestion.includes('past perfect')) {
        return `📚 Great question about the past perfect tense!\n\nThe past perfect tense is formed using "had" + past participle. It's used to show that one action was completed before another action in the past.\n\nExample:\n"I had finished my homework before dinner."\n\nWould you like more examples or have any follow-up questions?`;
      } else if (lowerQuestion.includes('present')) {
        return `📚 The present tense!\n\nPresent Simple: I eat, he eats\nPresent Continuous: I am eating\nPresent Perfect: I have eaten\n\nWhich one would you like me to explain in detail?`;
      } else if (lowerQuestion.includes('future')) {
        return `📚 The future tense!\n\nWe use "will" or "going to":\n- "I will study tomorrow" (decision made now)\n- "I am going to study tomorrow" (planned in advance)\n\nWould you like more examples?`;
      }
      return `📚 Tenses in English can be tricky! Could you specify which tense you'd like to learn about? (past, present, future, perfect, continuous, etc.)`;
    }

    // Affect vs Effect
    if (lowerQuestion.includes('affect') && lowerQuestion.includes('effect')) {
      return `💡 Good question! This is a common confusion:\n\n"Affect" (verb) = to influence\nExample: "The weather affects my mood."\n\n"Effect" (noun) = a result\nExample: "The effect of the rain was flooding."\n\nTip: Remember "A" for "Affect" = "Action" (verb)\n"E" for "Effect" = "End result" (noun)`;
    }

    // Essay and writing
    if (lowerQuestion.includes('introduction') || lowerQuestion.includes('essay') || lowerQuestion.includes('write') || lowerQuestion.includes('paragraph')) {
      if (lowerQuestion.includes('introduction')) {
        return `✍️ Writing a strong introduction:\n\n1. Start with a hook (question, quote, or interesting fact)\n2. Provide background information\n3. State your thesis clearly\n\nExample:\n"Have you ever wondered why reading is important? Reading improves vocabulary and critical thinking. This essay explores the benefits of daily reading habits."\n\nNeed help with your specific essay?`;
      } else if (lowerQuestion.includes('conclusion')) {
        return `✍️ Writing a strong conclusion:\n\n1. Restate your main points\n2. Summarize key arguments\n3. End with a memorable statement\n\nDon't introduce new information in the conclusion!\n\nWould you like an example?`;
      }
      return `✍️ I can help with essay writing! Are you working on:\n- Introduction?\n- Body paragraphs?\n- Conclusion?\n- Specific topic?\n\nTell me more about what you need!`;
    }

    // Vocabulary and synonyms
    if (lowerQuestion.includes('synonym') || lowerQuestion.includes('meaning') || lowerQuestion.includes('define') || lowerQuestion.includes('what is') || lowerQuestion.includes('what does')) {
      if (lowerQuestion.includes('important')) {
        return `📖 Synonyms for "important":\n\n• Crucial\n• Significant\n• Essential\n• Vital\n• Critical\n• Key\n• Fundamental\n• Pivotal\n\nUsing varied vocabulary makes your writing more engaging! Which one would you like to use?`;
      }
      // Extract potential word from question
      const words = lowerQuestion.replace(/what (is|does|are|means?)|define|synonym for|meaning of/g, '').trim().split(' ');
      const targetWord = words[words.length - 1].replace(/[?.,!]/g, '');
      return `📖 You're asking about "${targetWord}"!\n\nI can help with:\n• Definition\n• Synonyms\n• Example sentences\n• Usage in context\n\nCould you be more specific about what you'd like to know?`;
    }

    // Grammar rules
    if (lowerQuestion.includes('grammar') || lowerQuestion.includes('rule')) {
      return `📚 Grammar questions! I can help with:\n\n✅ Verb tenses\n✅ Sentence structure\n✅ Punctuation\n✅ Parts of speech\n✅ Subject-verb agreement\n\nWhat specific grammar topic do you need help with?`;
    }

    // Pronunciation
    if (lowerQuestion.includes('pronounce') || lowerQuestion.includes('pronunciation') || lowerQuestion.includes('say') || lowerQuestion.includes('sound')) {
      return `🎤 Pronunciation help!\n\nFor pronunciation practice:\n1. Visit our Speech Practice section\n2. Use the AI pronunciation checker\n3. Listen to the audio examples\n4. Record yourself and compare\n\nWhich specific word do you need help pronouncing?`;
    }

    // Reading and comprehension
    if (lowerQuestion.includes('read') || lowerQuestion.includes('comprehension') || lowerQuestion.includes('understand')) {
      return `📖 Reading comprehension tips:\n\n1. Preview the text (titles, headings)\n2. Read actively (take notes)\n3. Identify main ideas\n4. Look up unfamiliar words\n5. Summarize what you read\n\nWhat specific reading challenge are you facing?`;
    }

    // Speaking and conversation
    if (lowerQuestion.includes('speak') || lowerQuestion.includes('conversation') || lowerQuestion.includes('talk')) {
      return `🗣️ Improving speaking skills:\n\n1. Practice pronunciation daily\n2. Record yourself speaking\n3. Use the AI Debate feature\n4. Think in English\n5. Don't be afraid of mistakes!\n\nWhat aspect of speaking would you like to improve?`;
    }

    // Test and exam preparation
    if (lowerQuestion.includes('test') || lowerQuestion.includes('exam') || lowerQuestion.includes('prepare')) {
      return `📝 Test preparation tips:\n\n1. Review regularly, not just before exams\n2. Practice with our Test Papers section\n3. Use flashcards for vocabulary\n4. Time yourself during practice\n5. Get enough sleep before the exam\n\nWhat test are you preparing for?`;
    }

    // Help and general questions
    if (lowerQuestion.includes('help') || lowerQuestion.includes('how')) {
      return `🤖 I'm here to help with:\n\n✅ Grammar explanations\n✅ Vocabulary building\n✅ Essay writing tips\n✅ Pronunciation guidance\n✅ Reading comprehension\n✅ Test preparation\n\nWhat specific topic would you like to explore?`;
    }

    // Thank you responses
    if (lowerQuestion.includes('thank') || lowerQuestion.includes('thanks')) {
      return `😊 You're welcome! I'm always here to help with your English learning journey.\n\nFeel free to ask me anything else!`;
    }

    // Greetings
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi ') || lowerQuestion.includes('hey')) {
      return `👋 Hello! How can I help you with your English learning today?\n\nYou can ask me about:\n• Grammar rules\n• Vocabulary\n• Writing tips\n• Pronunciation\n• Or anything else!`;
    }

    // Default response - try to be helpful based on question
    return `🤔 That's an interesting question! Let me help you with that.\n\nBased on your question about "${question}", I'd recommend:\n\n1. Check if our platform has relevant lessons in the 4 Skills section\n2. Review related vocabulary in the Picture Dictionary\n3. Practice with our interactive exercises\n\nCould you provide more details so I can give you a more specific answer? For example:\n• What exactly do you want to know?\n• Is this for homework or general learning?\n• What level are you at (beginner/intermediate/advanced)?`;
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    handleSendMessage();
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-50 animate-bounce"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs font-bold">
            AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-card border-2 border-border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">AI Doubt Corner</h3>
                <p className="text-xs opacity-90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Online - Ask me anything!
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-card border border-border rounded-bl-none'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-primary">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {message.text}
                  </p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-card border border-border rounded-bl-none">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-primary">AI Assistant</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-border bg-muted/10">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Quick questions:</p>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputText(question);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="w-full text-left px-3 py-2 bg-card hover:bg-muted border border-border rounded-lg text-xs transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-end gap-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask your doubt here..."
                className="flex-1 p-3 bg-input-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                rows={2}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      )}
    </>
  );
}