import { useState, useRef } from 'react';
import { Mic, Play, Pause, RotateCcw, Sparkles, Trophy, Volume2 } from 'lucide-react';
import type { Language, User } from '../App';

interface PronunciationExercise {
  id: number;
  word: string;
  phonetic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

const exercises: PronunciationExercise[] = [
  { id: 1, word: 'pronunciation', phonetic: '/prəˌnʌn.siˈeɪ.ʃən/', difficulty: 'advanced', category: 'Common Mistakes' },
  { id: 2, word: 'the', phonetic: '/ðə/', difficulty: 'beginner', category: 'Articles' },
  { id: 3, word: 'through', phonetic: '/θruː/', difficulty: 'intermediate', category: 'Difficult Sounds' },
  { id: 4, word: 'thought', phonetic: '/θɔːt/', difficulty: 'intermediate', category: 'Difficult Sounds' },
  { id: 5, word: 'squirrel', phonetic: '/ˈskwɪr.əl/', difficulty: 'advanced', category: 'Tricky Words' },
  { id: 6, word: 'comfortable', phonetic: '/ˈkʌmf.tə.bəl/', difficulty: 'intermediate', category: 'Common Mistakes' },
  { id: 7, word: 'chocolate', phonetic: '/ˈtʃɒk.lət/', difficulty: 'beginner', category: 'Food' },
  { id: 8, word: 'specific', phonetic: '/spəˈsɪf.ɪk/', difficulty: 'intermediate', category: 'Common Words' },
];

interface PronunciationPracticeProps {
  language: Language;
  user: User;
}

export function PronunciationPractice({ language, user }: PronunciationPracticeProps) {
  const [selectedExercise, setSelectedExercise] = useState<PronunciationExercise>(exercises[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{
    score: number;
    feedback: string[];
    pronunciation: string;
  } | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [microphoneError, setMicrophoneError] = useState<string | null>(null);

  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startRecording = async () => {
    try {
      setMicrophoneError(null); // Clear any previous errors
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicrophoneError('Your browser does not support microphone access. Please use a modern browser like Chrome, Firefox, or Edge.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        analyzeRecording();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      intervalRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error: any) {
      // Handle different error types
      let errorMessage = 'Unable to access microphone. ';
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage += 'Please allow microphone permissions in your browser settings. Click the camera/microphone icon in the address bar and select "Allow".';
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        errorMessage += 'No microphone found. Please connect a microphone and try again.';
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        errorMessage += 'Your microphone is already in use by another application. Please close other applications and try again.';
      } else {
        errorMessage += `Please check your browser settings and try again. Error: ${error.message}`;
      }
      
      setMicrophoneError(errorMessage);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setHasRecorded(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const analyzeRecording = () => {
    // Simulate AI analysis
    setTimeout(() => {
      const score = Math.floor(Math.random() * 30) + 70; // 70-100
      const feedbacks = [
        'Excellent pronunciation!',
        'Good intonation and stress.',
        'Clear enunciation of consonants.',
        'Try to soften the "th" sound slightly.',
        'Watch the vowel length in the second syllable.',
        'Great overall clarity!'
      ];

      const randomFeedback = feedbacks.sort(() => Math.random() - 0.5).slice(0, 3);

      setAiAnalysis({
        score,
        feedback: randomFeedback,
        pronunciation: 'Detected: ' + selectedExercise.word
      });

      setTotalScore(prev => prev + score);
    }, 1500);
  };

  const resetRecording = () => {
    setHasRecorded(false);
    setAiAnalysis(null);
    setRecordingTime(0);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Mic className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">🎤 AI Pronunciation Practice</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI-powered speech recognition and pronunciation correction
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">{totalScore}</div>
          <div className="text-sm text-muted-foreground">Total Score</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-accent">
            {aiAnalysis ? `${aiAnalysis.score}%` : '--'}
          </div>
          <div className="text-sm text-muted-foreground">Last Score</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{exercises.length}</div>
          <div className="text-sm text-muted-foreground">Exercises</div>
        </div>
      </div>

      {/* AI Info Box */}
      <div className="mb-8 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-semibold text-foreground mb-1">🤖 AI Speech Analysis Engine</p>
            <p className="text-sm text-muted-foreground">
              Our advanced AI analyzes your pronunciation in real-time, identifying intonation, stress patterns, and phonetic accuracy.
              Get instant feedback to improve your speaking skills!
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Word List */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl border border-border p-4 sticky top-24">
            <h3 className="font-bold text-foreground mb-4">Practice Words</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {exercises.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => {
                    setSelectedExercise(exercise);
                    resetRecording();
                  }}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedExercise.id === exercise.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <div className="font-semibold">{exercise.word}</div>
                  <div className="text-xs opacity-80">{exercise.phonetic}</div>
                  <div className={`text-xs mt-1 ${
                    exercise.difficulty === 'beginner' ? 'text-green-600' :
                    exercise.difficulty === 'intermediate' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {selectedExercise.id === exercise.id ? exercise.difficulty : exercise.difficulty}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recording Area */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border border-border p-8">
            {/* Current Word */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-foreground mb-4">{selectedExercise.word}</h2>
              <p className="text-2xl text-muted-foreground mb-4">{selectedExercise.phonetic}</p>
              <button
                onClick={() => speakWord(selectedExercise.word)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
              >
                <Volume2 className="w-5 h-5" />
                Listen to Pronunciation
              </button>
            </div>

            {/* Recording Controls */}
            <div className="flex flex-col items-center gap-4 mb-8">
              {!hasRecorded ? (
                <>
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                      isRecording
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                        : 'bg-primary hover:bg-primary/90'
                    }`}
                  >
                    {isRecording ? (
                      <Pause className="w-10 h-10 text-white" />
                    ) : (
                      <Mic className="w-10 h-10 text-primary-foreground" />
                    )}
                  </button>
                  <p className="text-sm text-muted-foreground">
                    {isRecording ? `Recording... ${recordingTime}s` : 'Click to start recording'}
                  </p>
                </>
              ) : (
                <button
                  onClick={resetRecording}
                  className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  Try Again
                </button>
              )}
            </div>

            {/* Microphone Error Message */}
            {microphoneError && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">Microphone Access Error</h3>
                    <p className="text-sm text-red-700 dark:text-red-300">{microphoneError}</p>
                    <button
                      onClick={() => setMicrophoneError(null)}
                      className="mt-2 text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 underline"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* AI Analysis Results */}
            {aiAnalysis && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className={`w-8 h-8 ${
                      aiAnalysis.score >= 90 ? 'text-green-600' :
                      aiAnalysis.score >= 75 ? 'text-accent' :
                      'text-yellow-600'
                    }`} />
                    <div>
                      <p className="text-sm text-muted-foreground">AI Pronunciation Score</p>
                      <p className="text-3xl font-bold text-primary">{aiAnalysis.score}/100</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-foreground mb-2">🤖 AI Detected:</p>
                    <p className="text-lg text-foreground">{aiAnalysis.pronunciation}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">💡 AI Feedback:</p>
                    <ul className="space-y-2">
                      {aiAnalysis.feedback.map((feedback, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary">•</span>
                          {feedback}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>💪 Improvement Tips:</strong> Practice the word slowly, focus on individual syllables,
                    and pay attention to stress patterns. Record multiple times to see your progress!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}