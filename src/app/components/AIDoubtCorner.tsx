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
    const lowerQuestion = question.toLowerCase().trim();
    
    // Extract key words for better matching
    const words = lowerQuestion.split(' ');

    // GRAMMAR TOPICS
    if (lowerQuestion.match(/\b(tense|tenses|past|present|future|perfect|continuous|progressive)\b/i)) {
      if (lowerQuestion.includes('past perfect')) {
        return `📚 Past Perfect Tense Explanation:\n\n**Formation:** had + past participle\n**Usage:** Shows an action completed before another past action\n\n**Examples:**\n• "I had finished dinner before she arrived."\n• "They had never seen snow before they moved to Canada."\n• "Had you completed the homework?"\n\n**Signal words:** before, after, already, just, never, yet\n\nWould you like examples of other tenses?`;
      } else if (lowerQuestion.match(/\b(present perfect)\b/i)) {
        return `📚 Present Perfect Tense:\n\n**Formation:** have/has + past participle\n**Usage:** Actions that started in past and continue, or past actions with present relevance\n\n**Examples:**\n• "I have lived here for 5 years."\n• "She has just finished her homework."\n• "Have you ever been to Japan?"\n\n**Signal words:** for, since, already, yet, just, ever, never\n\nNeed more examples or explanations?`;
      } else if (lowerQuestion.match(/\b(simple present|present simple)\b/i)) {
        return `📚 Simple Present Tense:\n\n**Formation:** base verb (+ s/es for he/she/it)\n**Usage:** Habitual actions, general truths, schedules\n\n**Examples:**\n• "I work every day."\n• "The sun rises in the east."\n• "She speaks three languages."\n\n**Signal words:** always, usually, often, sometimes, never, every day\n\nWhat other tense would you like to learn?`;
      } else if (lowerQuestion.includes('future')) {
        return `📚 Future Tense Options:\n\n**1. Simple Future (will):**\n• "I will call you tomorrow."\n• Used for predictions and spontaneous decisions\n\n**2. Going to:**\n• "I'm going to study tonight."\n• Used for plans and intentions\n\n**3. Present Continuous (for arranged plans):**\n• "I'm meeting John at 5 PM."\n\nWhich one would you like explained in detail?`;
      }
      return `📚 English has 12 main tenses! Which one interests you?\n\n**Simple:** Present, Past, Future\n**Continuous:** Present, Past, Future  \n**Perfect:** Present, Past, Future\n**Perfect Continuous:** Present, Past, Future\n\nAsk about any specific tense!`;
    }

    // VOCABULARY AND WORD MEANING
    if (lowerQuestion.match(/\b(mean|meaning|define|definition|what is|what does|synonym|antonym)\b/i)) {
      if (lowerQuestion.includes('synonym')) {
        const targetWords = ['important', 'happy', 'sad', 'beautiful', 'good', 'bad', 'big', 'small'];
        const foundWord = targetWords.find(word => lowerQuestion.includes(word));
        
        if (foundWord === 'important') {
          return `📖 Synonyms for "important":\n\n• Crucial\n• Significant\n• Essential\n• Vital\n• Critical\n• Key\n• Fundamental\n• Pivotal\n• Major\n• Paramount\n\n**Example:** "Education is crucial/essential for success."\n\nWhich synonym would you like to use in a sentence?`;
        } else if (foundWord === 'happy') {
          return `📖 Synonyms for "happy":\n\n• Joyful\n• Cheerful\n• Delighted\n• Content\n• Pleased\n• Thrilled\n• Ecstatic\n• Elated\n\n**Example:** "She felt elated after winning the competition."\n\nNeed synonyms for another word?`;
        }
      }
      
      // Extract potential word being asked about
      const cleanQuestion = lowerQuestion.replace(/what (is|does|means?)|define|meaning of|what's/g, '').trim();
      return `📖 You're asking about the meaning of a word!\n\nTo help you better, could you:\n1. Tell me the specific word you want defined\n2. Provide the sentence where you saw it\n3. Let me know your current level (beginner/intermediate/advanced)\n\n**Example:** "What does 'eloquent' mean?"\n\nI can provide:\n✅ Definition\n✅ Synonyms\n✅ Example sentences\n✅ Usage in context`;
    }

    // ESSAY AND WRITING
    if (lowerQuestion.match(/\b(essay|write|writing|paragraph|introduction|conclusion|body)\b/i)) {
      if (lowerQuestion.includes('introduction')) {
        return `✍️ How to Write a Strong Introduction:\n\n**1. Hook (Opening sentence)**\n• Question: "Have you ever wondered...?"\n• Quote: "As Einstein said..."\n• Surprising fact: "Did you know that...?"\n• Personal story\n\n**2. Background Information**\n• Give context about your topic\n• Define key terms if needed\n\n**3. Thesis Statement**\n• State your main argument clearly\n• Preview your main points\n\n**Example:**\n"Have you ever considered the impact of social media on mental health? In recent years, platforms like Instagram and TikTok have become integral to daily life. This essay argues that while social media offers connectivity, it significantly impacts mental health through comparison culture, cyberbullying, and addiction."\n\nNeed help with YOUR specific essay?`;
      } else if (lowerQuestion.includes('conclusion')) {
        return `✍️ How to Write a Strong Conclusion:\n\n**Components:**\n1. **Restate thesis** (in different words)\n2. **Summarize main points** (briefly)\n3. **Final thought** (call to action, prediction, or reflection)\n\n**What NOT to do:**\n❌ Introduce new information\n❌ Just repeat the introduction\n❌ Use phrases like "In conclusion" too obviously\n\n**Example:**\n"Environmental protection requires immediate action from individuals, businesses, and governments. By implementing sustainable practices, reducing waste, and supporting green policies, we can preserve our planet for future generations. The time to act is now."\n\nWant me to check your conclusion?`;
      } else if (lowerQuestion.match(/\b(body paragraph)\b/i)) {
        return `✍️ Body Paragraph Structure:\n\n**Format: TEEL or PEEL**\n\n**T** - Topic Sentence (main idea)\n**E** - Evidence/Example\n**E** - Explanation (analyze the evidence)\n**L** - Link (connect back to thesis)\n\n**Example:**\n"Regular exercise provides significant mental health benefits. Studies show that 30 minutes of daily physical activity reduces anxiety by up to 40%. This occurs because exercise releases endorphins, natural mood elevators that create feelings of happiness and relaxation. Therefore, incorporating exercise into daily routines is essential for maintaining good mental health."\n\nWant help structuring your paragraph?`;
      }
      return `✍️ Writing Help Available!\n\nI can assist with:\n📝 Essay structure (introduction, body, conclusion)\n📝 Different essay types (argumentative, descriptive, narrative)\n📝 Paragraph development\n📝 Thesis statements\n📝 Transitions and flow\n📝 Grammar and vocabulary\n\nWhat specific aspect of writing do you need help with?`;
    }

    // GRAMMAR RULES
    if (lowerQuestion.match(/\b(grammar|subject|verb|agreement|article|preposition|adjective|adverb|noun|pronoun)\b/i)) {
      if (lowerQuestion.includes('article')) {
        return `📚 Articles (a, an, the):\n\n**A/AN (Indefinite):**\n• Use before consonant sounds: "a book"\n• Use before vowel sounds: "an apple"\n• For non-specific items: "I need a pen"\n\n**THE (Definite):**\n• For specific items: "the book on the table"\n• Unique things: "the sun, the moon"\n• Superlatives: "the best student"\n\n**No Article (Zero Article):**\n• Plural/uncountable generalizations: "Dogs are loyal"\n• Names: "John lives in Paris"\n• Meals: "I had breakfast"\n\nNeed more examples?`;
      } else if (lowerQuestion.match(/\b(subject.*verb|verb.*subject)\b/i)) {
        return `📚 Subject-Verb Agreement:\n\n**Rule:** Subject and verb must match in number\n\n**Singular subject = Singular verb:**\n• "She walks" ✅\n• "She walk" ❌\n\n**Plural subject = Plural verb:**\n• "They walk" ✅\n• "They walks" ❌\n\n**Tricky Cases:**\n• "Everyone is" (singular)\n• "The team is" (collective noun - singular)\n• "The students are" (plural)\n• "Neither John nor Mary is" (nearest subject)\n\nWhat grammar rule confuses you?`;
      }
      return `📚 Grammar Topics I Can Help With:\n\n✅ Tenses (present, past, future)\n✅ Articles (a, an, the)\n✅ Prepositions (in, on, at)\n✅ Subject-verb agreement\n✅ Passive voice\n✅ Conditionals (if clauses)\n✅ Reported speech\n✅ Relative clauses\n✅ Modals (can, must, should)\n\nWhich topic would you like to explore?`;
    }

    // PRONUNCIATION
    if (lowerQuestion.match(/\b(pronounce|pronunciation|say|sound|speak)\b/i)) {
      return `🎤 Pronunciation Help:\n\n**Tips for Better Pronunciation:**\n1. **Listen actively** - Watch English videos, pay attention to mouth movements\n2. **Record yourself** - Compare with native speakers\n3. **Practice minimal pairs** - ship/sheep, sit/seat\n4. **Learn IPA symbols** - /θ/ for "th" sound\n5. **Shadow speaking** - Repeat immediately after hearing\n\n**Common Challenges:**\n• TH sounds (/θ/ and /ð/)\n• R and L distinction\n• Vowel length\n• Word stress\n• Sentence intonation\n\n**Try our Speech Practice section for:**\n✅ AI pronunciation analysis\n✅ Real-time feedback\n✅ Word-by-word practice\n\nWhich sound gives you trouble?`;
    }

    // READING COMPREHENSION
    if (lowerQuestion.match(/\b(read|reading|comprehension|understand|passage|text)\b/i)) {
      return `📖 Reading Comprehension Strategies:\n\n**Before Reading:**\n• Preview titles, headings, images\n• Activate background knowledge\n• Set a purpose for reading\n\n**During Reading:**\n• Highlight key information\n• Take notes in margins\n• Ask questions\n• Visualize what you're reading\n• Identify main ideas and supporting details\n\n**After Reading:**\n• Summarize in your own words\n• Review highlighted sections\n• Discuss with others\n• Connect to personal experience\n\n**Techniques:**\n📍 Skimming (main idea)\n📍 Scanning (specific information)\n📍 Close reading (deep analysis)\n\nWhat type of reading do you struggle with?`;
    }

    // TEST PREPARATION
    if (lowerQuestion.match(/\b(test|exam|prepare|study|quiz|ielts|toefl|cambridge)\b/i)) {
      return `📝 Test Preparation Tips:\n\n**General Strategies:**\n1. **Study schedule** - Don't cram, spread it out\n2. **Practice tests** - Familiarize with format\n3. **Time management** - Practice under timed conditions\n4. **Review mistakes** - Learn from errors\n5. **Study groups** - Teach others to reinforce learning\n\n**Test-Taking Tips:**\n✅ Read instructions carefully\n✅ Answer easy questions first\n✅ Eliminate wrong answers\n✅ Check your work\n✅ Stay calm and focused\n\n**Our Platform Offers:**\n• Test Papers section\n• Grammar quizzes\n• Vocabulary games\n• 4 Skills practice\n\nWhich test are you preparing for?`;
    }

    // SPECIFIC WORDS
    if (lowerQuestion.match(/\b(affect|effect)\b/i)) {
      return `💡 AFFECT vs EFFECT:\n\n**AFFECT (verb)** = to influence\n• "The weather affects my mood."\n• "Stress affects performance."\n\n**EFFECT (noun)** = a result\n• "The effect was immediate."\n• "Side effects include drowsiness."\n\n**Memory Trick:**\n**A**ffect = **A**ction (verb)\n**E**ffect = **E**nd result (noun)\n\n**Exception:**\nEffect can be a verb meaning "to bring about"\n• "The new law will effect change."\n\nNeed more commonly confused words?`;
    }

    if (lowerQuestion.match(/\b(their|there|they're)\b/i)) {
      return `💡 THEIR vs THERE vs THEY'RE:\n\n**THEIR** (possessive) = belonging to them\n• "Their house is blue."\n• "The students submitted their homework."\n\n**THERE** (place or existence)\n• "Put it over there."\n• "There are three apples."\n\n**THEY'RE** (contraction) = they are\n• "They're coming tomorrow."\n• "They're the best team."\n\n**Test:** Can you replace it with "they are"?\n• If YES → use they're\n• If NO → use their or there\n\nNeed more homophones explained?`;
    }

    // SPEAKING
    if (lowerQuestion.match(/\b(conversation|talk|speaking|fluency|discussion)\b/i)) {
      return `🗣️ Improve Your Speaking Skills:\n\n**Practice Strategies:**\n1. **Think in English** - Don't translate from your native language\n2. **Talk to yourself** - Narrate your day in English\n3. **Record yourself** - Listen and improve\n4. **Find a language partner** - Practice regularly\n5. **Don't fear mistakes** - They're part of learning!\n\n**Conversation Tips:**\n✅ Ask follow-up questions\n✅ Use fillers naturally (um, well, you know)\n✅ Paraphrase if you don't know a word\n✅ Practice common phrases\n✅ Watch and mimic native speakers\n\n**On Our Platform:**\n• AI Debate for practice\n• Pronunciation checker\n• Speaking exercises in 4 Skills\n\nWhat aspect of speaking is challenging?`;
    }

    // ENCOURAGEMENT / GREETING
    if (lowerQuestion.match(/\b(hello|hi|hey|thanks|thank you)\b/i)) {
      if (lowerQuestion.match(/\b(thanks|thank you)\b/i)) {
        return `😊 You're very welcome! I'm glad I could help!\n\nRemember, learning English is a journey. Every question you ask brings you closer to fluency!\n\n**Keep practicing:**\n• Read daily (even 10 minutes helps!)\n• Watch English content\n• Practice speaking aloud\n• Use what you learn\n\nFeel free to ask me anything else! I'm here 24/7 to support your learning. 🚀`;
      }
      return `👋 Hello! Great to see you learning English!\n\nI'm your AI Learning Assistant. I can help you with:\n\n📚 **Grammar** - Tenses, articles, sentence structure\n📖 **Vocabulary** - Word meanings, synonyms, usage\n✍️ **Writing** - Essays, paragraphs, structure\n🎤 **Pronunciation** - Sounds, stress, intonation\n📝 **Test Prep** - Strategies and practice\n🗣️ **Speaking** - Conversation skills, fluency\n\nWhat would you like to learn about today?`;
    }

    // MOTIVATION / LEARNING ADVICE
    if (lowerQuestion.match(/\b(improve|better|learn|study|practice|advice|tip)\b/i)) {
      return `💪 Tips to Improve Your English:\n\n**Daily Habits:**\n1. **20-minute rule** - Study 20 mins daily (better than 2 hours once a week)\n2. **Immerse yourself** - Change phone/computer language to English\n3. **Active learning** - Don't just read, write and speak too!\n4. **Mixed practice** - Combine reading, writing, listening, speaking\n\n**Quick Wins:**\n✅ Learn 5 new words daily\n✅ Watch 1 English video with subtitles\n✅ Write 3 sentences about your day\n✅ Practice pronunciation for 5 minutes\n✅ Read English news/articles\n\n**Use This Platform:**\n• Complete daily lessons in 4 Skills\n• Play vocabulary games\n• Practice with AI tools\n• Track your progress\n\nRemember: **Consistency beats intensity!** 🎯\n\nWhat's your biggest challenge?`;
    }

    // DEFAULT INTELLIGENT RESPONSE
    // Try to extract key content from the question
    const questionWords = question.split(/\W+/).filter(word => word.length > 3);
    const topicHint = questionWords.slice(0, 3).join(', ');

    return `🤔 I want to help you with "${question}"!\n\nTo give you the best answer, could you clarify:\n\n**Is your question about:**\n• Grammar rules?\n• Vocabulary/word meanings?\n• Writing (essays, paragraphs)?\n• Pronunciation?\n• Reading comprehension?\n• Speaking/conversation?\n• Test preparation?\n\n**Or try asking like:**\n• "What is the past perfect tense?"\n• "How do I write an introduction?"\n• "What does [word] mean?"\n• "Explain the difference between affect and effect"\n• "How can I improve my pronunciation?"\n\n💡 **Tip:** The more specific your question, the better I can help!\n\nI'm here to make English learning easy and fun! 🚀`;
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