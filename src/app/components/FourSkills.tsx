import { useState, useRef } from 'react';
import { BookOpen, Mic, PenTool, Headphones, Sparkles, Play, CheckCircle, Lock, Volume2, Pause, RotateCcw } from 'lucide-react';
import type { Language, User } from '../App';

interface Lesson {
  id: number;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
  locked: boolean;
  content: {
    type: 'reading' | 'speaking' | 'writing' | 'listening';
    passage?: string;
    prompt?: string;
    audioDescription?: string;
    question: string;
    options?: string[];
    speakingText?: string;
  };
}

interface FourSkillsProps {
  language: Language;
  user: User;
}

export function FourSkills({ language, user }: FourSkillsProps) {
  const [activeSkill, setActiveSkill] = useState<'reading' | 'speaking' | 'writing' | 'listening'>('reading');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [lessonStarted, setLessonStarted] = useState(false);
  const [exerciseAnswer, setExerciseAnswer] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [microphoneError, setMicrophoneError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<number | null>(null);

  const skills = [
    { 
      id: 'reading' as const, 
      icon: BookOpen, 
      title: 'Reading', 
      color: 'bg-blue-500',
      description: 'Improve comprehension, speed reading, and vocabulary through diverse texts'
    },
    { 
      id: 'speaking' as const, 
      icon: Mic, 
      title: 'Speaking', 
      color: 'bg-green-500',
      description: 'Practice pronunciation, fluency, and conversational skills with AI feedback'
    },
    { 
      id: 'writing' as const, 
      icon: PenTool, 
      title: 'Writing', 
      color: 'bg-purple-500',
      description: 'Master essay writing, creative writing, and formal communication'
    },
    { 
      id: 'listening' as const, 
      icon: Headphones, 
      title: 'Listening', 
      color: 'bg-orange-500',
      description: 'Enhance listening comprehension with audio passages and exercises'
    },
  ];

  const lessons: Record<string, Lesson[]> = {
    reading: [
      {
        id: 1,
        title: 'Introduction to Reading Strategies',
        level: 'Beginner',
        duration: '15 min',
        description: 'Learn skimming, scanning, and predicting techniques',
        locked: false,
        content: {
          type: 'reading',
          passage: 'Effective reading strategies help you understand texts better and save time. Skimming means reading quickly to get the main idea, while scanning is searching for specific information. Prediction involves guessing what comes next based on clues in the text. These techniques are essential for academic success and everyday reading.',
          question: 'What is the difference between skimming and scanning?'
        }
      },
      {
        id: 2,
        title: 'Understanding Main Ideas',
        level: 'Beginner',
        duration: '20 min',
        description: 'Identify topic sentences and main themes in passages',
        locked: false,
        content: {
          type: 'reading',
          passage: 'Every paragraph has a main idea - the most important point the author wants to make. The topic sentence usually contains this main idea and often appears at the beginning of the paragraph. Supporting sentences provide details, examples, or evidence. By identifying the main idea, you can better understand and remember what you read.',
          question: 'Where is the topic sentence usually found in a paragraph?'
        }
      },
      {
        id: 3,
        title: 'Context Clues & Vocabulary',
        level: 'Intermediate',
        duration: '25 min',
        description: 'Use context to understand unfamiliar words',
        locked: false,
        content: {
          type: 'reading',
          passage: 'When encountering an unfamiliar word, context clues can help decipher its meaning. These clues might be synonyms, antonyms, examples, or explanations nearby in the text. For instance, if a sentence says "The student was loquacious, talking constantly throughout the class," you can infer that loquacious means talkative. This strategy enhances vocabulary without constantly consulting a dictionary.',
          question: 'Based on the context, what does "loquacious" mean in the passage?'
        }
      },
      {
        id: 4,
        title: 'Critical Reading & Analysis',
        level: 'Advanced',
        duration: '30 min',
        description: 'Analyze arguments, evaluate evidence, and detect bias',
        locked: false,
        content: {
          type: 'reading',
          passage: 'Critical reading involves actively analyzing and evaluating what you read. Look for the author\'s main argument and the evidence supporting it. Question whether the evidence is credible, relevant, and sufficient. Be aware of potential bias in language and presentation. Critical readers don\'t accept everything at face value; they think deeply about meaning, implications, and reliability.',
          question: 'List three things critical readers should evaluate when analyzing a text.'
        }
      }
    ],
    speaking: [
      {
        id: 1,
        title: 'Basic Pronunciation Practice',
        level: 'Beginner',
        duration: '15 min',
        description: 'Master vowel and consonant sounds with AI feedback',
        locked: false,
        content: {
          type: 'speaking',
          speakingText: 'The quick brown fox jumps over the lazy dog. This sentence contains all the letters of the alphabet and helps practice clear pronunciation.',
          question: 'Practice your pronunciation'
        }
      },
      {
        id: 2,
        title: 'Self Introduction Skills',
        level: 'Intermediate',
        duration: '20 min',
        description: 'Learn to introduce yourself confidently',
        locked: false,
        content: {
          type: 'speaking',
          speakingText: 'Hello, my name is [Your Name]. I am a student from [Your Country]. I enjoy learning English because it helps me connect with people from around the world. In my free time, I like reading books and playing sports.',
          question: 'Introduce yourself using the template above'
        }
      },
      {
        id: 3,
        title: 'Presentation Skills',
        level: 'Intermediate',
        duration: '25 min',
        description: 'Learn to deliver clear and confident presentations',
        locked: false,
        content: {
          type: 'speaking',
          speakingText: 'Good morning everyone. Today, I will present about the importance of environmental protection. First, I will discuss the current situation. Then, I will propose some solutions. Finally, I will conclude with a call to action. Thank you for your attention.',
          question: 'Practice delivering this presentation opening'
        }
      },
      {
        id: 4,
        title: 'Interview Practice',
        level: 'Advanced',
        duration: '30 min',
        description: 'Practice answering common interview questions',
        locked: false,
        content: {
          type: 'speaking',
          speakingText: 'Tell me about yourself. What are your greatest strengths? Can you describe a challenge you faced and how you overcame it? Why should we hire you? Where do you see yourself in five years?',
          question: 'Practice answering these interview questions clearly and confidently'
        }
      }
    ],
    writing: [
      {
        id: 1,
        title: 'Sentence Structure Basics',
        level: 'Beginner',
        duration: '15 min',
        description: 'Learn to write clear and correct sentences',
        locked: false,
        content: {
          type: 'writing',
          prompt: 'Write 3 complete sentences about your favorite season. Make sure each sentence has a subject and a verb.',
          question: 'Write your sentences below'
        }
      },
      {
        id: 2,
        title: 'Paragraph Writing',
        level: 'Beginner',
        duration: '20 min',
        description: 'Master topic sentences, supporting details, and conclusions',
        locked: false,
        content: {
          type: 'writing',
          prompt: 'Write a paragraph (5-7 sentences) about the benefits of exercise. Include a topic sentence, 3-4 supporting sentences with examples, and a concluding sentence.',
          question: 'Write your paragraph below'
        }
      },
      {
        id: 3,
        title: 'Descriptive Writing',
        level: 'Intermediate',
        duration: '25 min',
        description: 'Use vivid language to describe people, places, and things',
        locked: false,
        content: {
          type: 'writing',
          prompt: 'Describe your favorite place in detail. Use sensory language (sight, sound, smell, touch, taste) to help readers visualize it. Write 100-150 words.',
          question: 'Write your descriptive paragraph below'
        }
      },
      {
        id: 4,
        title: 'Opinion Essay Writing',
        level: 'Advanced',
        duration: '30 min',
        description: 'Express and support your opinions with clear arguments',
        locked: false,
        content: {
          type: 'writing',
          prompt: 'Topic: "Social media has more positive effects than negative effects on society." Do you agree or disagree? Write an opinion essay (200-250 words) with an introduction, 2 body paragraphs (each with supporting reasons and examples), and a conclusion.',
          question: 'Write your opinion essay below'
        }
      }
    ],
    listening: [
      {
        id: 1,
        title: 'Listening for Main Ideas',
        level: 'Beginner',
        duration: '15 min',
        description: 'Understand the main idea in short audio clips',
        locked: false,
        content: {
          type: 'listening',
          audioDescription: 'Audio Passage: "Welcome to our city tour! Today, we will visit three famous landmarks: the ancient castle built in 1200, the beautiful botanical garden with over 5,000 plant species, and the modern art museum. The tour lasts approximately three hours. Please stay with the group and feel free to ask questions."',
          question: 'What is the main purpose of this audio?',
          options: ['To describe a city tour', 'To sell museum tickets', 'To teach history', 'To advertise a hotel']
        }
      },
      {
        id: 2,
        title: 'Listening for Specific Details',
        level: 'Intermediate',
        duration: '20 min',
        description: 'Identify specific information in conversations',
        locked: false,
        content: {
          type: 'listening',
          audioDescription: 'Phone Conversation: "Hello, I\'d like to book a table for dinner. Yes, for four people this Saturday at 7 PM. My name is Sarah Chen. Do you have any tables near the window? Perfect! Could you also note that one person is vegetarian? Thank you so much!"',
          question: 'How many people will be dining?',
          options: ['Two people', 'Three people', 'Four people', 'Five people']
        }
      },
      {
        id: 3,
        title: 'Understanding Speaker\'s Intent',
        level: 'Intermediate',
        duration: '25 min',
        description: 'Identify the speaker\'s purpose and attitude',
        locked: false,
        content: {
          type: 'listening',
          audioDescription: 'Announcement: "Attention all passengers. Due to unexpected weather conditions, Flight BA205 to London has been delayed by approximately two hours. We sincerely apologize for this inconvenience. Passengers may collect meal vouchers at the customer service desk. Thank you for your patience and understanding."',
          question: 'What is the speaker\'s attitude toward the passengers?',
          options: ['Angry and frustrated', 'Apologetic and helpful', 'Indifferent and cold', 'Excited and cheerful']
        }
      },
      {
        id: 4,
        title: 'Academic Lecture Comprehension',
        level: 'Advanced',
        duration: '30 min',
        description: 'Understand complex academic lectures and discussions',
        locked: false,
        content: {
          type: 'listening',
          audioDescription: 'Lecture Excerpt: "Today we\'ll examine the Industrial Revolution\'s impact on urbanization. As factories emerged in the late 18th century, rural populations migrated to cities seeking employment. This rapid urban growth created challenges: overcrowding, poor sanitation, and inadequate housing. However, it also drove innovations in public health, transportation, and social reform movements."',
          question: 'According to the lecture, what was ONE negative effect of rapid urbanization?',
          options: ['Improved transportation', 'Social reform movements', 'Poor sanitation conditions', 'Factory innovations']
        }
      }
    ]
  };

  const currentSkill = skills.find(s => s.id === activeSkill)!;
  const currentLessons = lessons[activeSkill];

  const startLesson = (lesson: Lesson) => {
    if (lesson.locked) {
      alert('🔒 This lesson is locked! Complete previous lessons to unlock.');
      return;
    }
    setSelectedLesson(lesson);
    setLessonStarted(true);
    setExerciseAnswer('');
  };

  const completeLesson = () => {
    if (!exerciseAnswer.trim()) {
      alert('Please complete the exercise before submitting!');
      return;
    }
    
    alert('🎉 Lesson completed! Your progress has been saved.\n\nAI Feedback:\n✅ Great job!\n✅ You\'ve mastered the key concepts\n💡 Continue to the next lesson to keep improving!');
    setLessonStarted(false);
    setSelectedLesson(null);
    setExerciseAnswer('');
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    setTimeout(() => setIsPlaying(false), 3000); // Simulate audio playback
  };

  const startRecording = () => {
    if (isRecording) return;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = event => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setExerciseAnswer(audioUrl);
          setHasRecorded(true);
        };

        mediaRecorder.start();
        setIsRecording(true);
        setRecordingTime(0);

        intervalRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      })
      .catch(error => {
        setMicrophoneError(error.message);
      });
  };

  const stopRecording = () => {
    if (!isRecording) return;

    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder) {
      mediaRecorder.stop();
    }

    setIsRecording(false);
    clearInterval(intervalRef.current!);
  };

  if (lessonStarted && selectedLesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => {
            setLessonStarted(false);
            setSelectedLesson(null);
            setExerciseAnswer('');
          }}
          className="mb-6 text-primary hover:text-primary/80 font-medium"
        >
          ← Back to Lessons
        </button>

        <div className="bg-card rounded-xl border border-border p-8 mb-6 shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{selectedLesson.title}</h2>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {selectedLesson.level}
                </span>
                <span className="text-sm text-muted-foreground">⏱️ {selectedLesson.duration}</span>
              </div>
            </div>
            <div className={`w-12 h-12 ${currentSkill.color} rounded-lg flex items-center justify-center`}>
              <currentSkill.icon className="w-6 h-6 text-white" />
            </div>
          </div>

          <p className="text-muted-foreground mb-8">{selectedLesson.description}</p>

          {/* Lesson Content */}
          <div className="space-y-6">
            {activeSkill === 'reading' && selectedLesson.content.passage && (
              <>
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    📖 Reading Passage:
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {selectedLesson.content.passage}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">❓ Comprehension Question:</h3>
                  <p className="text-foreground mb-4">
                    {selectedLesson.content.question}
                  </p>
                  <textarea
                    value={exerciseAnswer}
                    onChange={(e) => setExerciseAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full h-32 p-4 bg-input-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </>
            )}

            {activeSkill === 'speaking' && selectedLesson.content.speakingText && (
              <>
                <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg text-center border-l-4 border-green-500">
                  <Mic className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">🎤 Speaking Exercise</h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedLesson.content.question}
                  </p>
                  <div className="p-4 bg-card rounded-lg text-left mb-4">
                    <p className="text-foreground leading-relaxed">
                      {selectedLesson.content.speakingText}
                    </p>
                  </div>
                  <button 
                    onClick={startRecording}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    🎙️ Start Recording
                  </button>
                  {isRecording && (
                    <p className="mt-4 text-green-600 font-medium">Recording... {recordingTime} seconds</p>
                  )}
                  {hasRecorded && (
                    <p className="mt-4 text-green-600 font-medium">✓ Recording completed! AI is analyzing your pronunciation...</p>
                  )}
                </div>
              </>
            )}

            {activeSkill === 'writing' && selectedLesson.content.prompt && (
              <>
                <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border-l-4 border-purple-500">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-purple-600" />
                    ✍️ Writing Prompt:
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {selectedLesson.content.prompt}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">{selectedLesson.content.question}</h3>
                  <textarea
                    value={exerciseAnswer}
                    onChange={(e) => setExerciseAnswer(e.target.value)}
                    placeholder="Start writing here... AI will provide feedback on your grammar, structure, and vocabulary."
                    className="w-full h-64 p-4 bg-input-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Word count: {exerciseAnswer.split(' ').filter(w => w).length} words
                    </p>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                      <Sparkles className="w-4 h-4 inline mr-2" />
                      Get AI Feedback
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeSkill === 'listening' && selectedLesson.content.audioDescription && (
              <>
                <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border-l-4 border-orange-500">
                  <h3 className="font-semibold text-foreground mb-4 text-center flex items-center justify-center gap-2">
                    <Headphones className="w-5 h-5 text-orange-600" />
                    🎧 Listening Exercise
                  </h3>
                  <div className="flex flex-col items-center gap-4 mb-6">
                    <button 
                      onClick={toggleAudio}
                      className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors shadow-lg"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </button>
                    <p className="text-sm text-center text-muted-foreground">
                      {isPlaying ? 'Playing audio...' : 'Click play to listen to the audio passage'}
                    </p>
                  </div>
                  
                  {/* Show transcript after playing */}
                  {exerciseAnswer !== '' && (
                    <div className="p-4 bg-card/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-2">Audio Transcript:</p>
                      <p className="text-sm text-foreground italic">
                        {selectedLesson.content.audioDescription}
                      </p>
                    </div>
                  )}
                </div>
                
                {selectedLesson.content.options && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">❓ {selectedLesson.content.question}</h3>
                    <div className="space-y-2">
                      {selectedLesson.content.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => setExerciseAnswer(option)}
                          className={`w-full p-4 rounded-lg text-left border-2 transition-all ${
                            exerciseAnswer === option
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                              : 'border-border hover:border-orange-300 hover:bg-orange-50/50 dark:hover:bg-orange-900/10'
                          }`}
                        >
                          <span className="font-semibold text-foreground">
                            {String.fromCharCode(65 + index)}.
                          </span>{' '}
                          <span className="text-foreground">{option}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <button
            onClick={completeLesson}
            className="w-full mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2 shadow-md"
          >
            <CheckCircle className="w-5 h-5" />
            Complete Lesson & Get Feedback
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
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">🎯 4 English Skills Development</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Master Reading, Speaking, Writing, and Listening with AI-guided lessons
            </p>
          </div>
        </div>
      </div>

      {/* AI Features Banner */}
      <div className="mb-8 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl shadow-sm">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-semibold text-foreground mb-1">🤖 AI-Powered Learning Path</p>
            <p className="text-sm text-muted-foreground">
              Our AI creates personalized learning experiences for each skill, tracks your progress, 
              provides instant feedback, and adapts lessons to your proficiency level!
            </p>
          </div>
        </div>
      </div>

      {/* Skills Selector */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <button
              key={skill.id}
              onClick={() => {
                setActiveSkill(skill.id);
                setExerciseAnswer('');
              }}
              className={`p-6 rounded-xl border-2 transition-all text-left shadow-sm hover:shadow-md ${
                activeSkill === skill.id
                  ? 'border-primary bg-primary/5 scale-105'
                  : 'border-border hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <div className={`w-12 h-12 ${skill.color} rounded-lg flex items-center justify-center mb-3 shadow-sm`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{skill.title}</h3>
              <p className="text-xs text-muted-foreground">{skill.description}</p>
            </button>
          );
        })}
      </div>

      {/* Current Skill Display */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{currentSkill.title} Lessons</h2>
        <p className="text-muted-foreground">{currentSkill.description}</p>
      </div>

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {currentLessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`bg-card rounded-xl border border-border p-6 transition-all ${
              lesson.locked ? 'opacity-60' : 'hover:shadow-xl hover:scale-105'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {lesson.locked && <Lock className="w-4 h-4 text-muted-foreground" />}
                  <h3 className="font-bold text-foreground">{lesson.title}</h3>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    lesson.level === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    lesson.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {lesson.level}
                  </span>
                  <span className="text-sm text-muted-foreground">⏱️ {lesson.duration}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{lesson.description}</p>
              </div>
            </div>
            <button
              onClick={() => startLesson(lesson)}
              disabled={lesson.locked}
              className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
                lesson.locked
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
              }`}
            >
              {lesson.locked ? '🔒 Locked' : 'Start Lesson'}
            </button>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="mt-12 bg-card rounded-xl border border-border p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          📊 Your Progress
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div key={skill.id} className="text-center">
              <div className={`w-16 h-16 ${skill.color} rounded-full flex items-center justify-center mx-auto mb-3 shadow-md`}>
                <skill.icon className="w-8 h-8 text-white" />
              </div>
              <p className="font-semibold text-foreground mb-1">{skill.title}</p>
              <p className="text-2xl font-bold text-primary mb-1">75%</p>
              <p className="text-xs text-muted-foreground">3/4 lessons completed</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GraduationCap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}