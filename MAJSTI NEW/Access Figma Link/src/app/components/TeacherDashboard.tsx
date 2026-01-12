import { useState } from 'react';
import { Users, TrendingUp, Award, FileText, Clock, BarChart3, BookOpen, Mic, PenTool, Target, Calendar, TrendingDown, Plus, Save, X } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { Language } from '../App';

interface Student {
  id: number;
  name: string;
  email: string;
  testsCompleted: number;
  avgScore: number;
  lastActive: string;
  progress: number;
  skillsProgress: {
    reading: number;
    writing: number;
    speaking: number;
    listening: number;
  };
  weeklyActivity: { day: string; hours: number }[];
  recentTests: { subject: string; score: number; date: string }[];
}

interface CustomLesson {
  id: number;
  title: string;
  description: string;
  type: 'lesson' | 'activity' | 'quiz' | 'assignment';
  targetSkill: 'reading' | 'writing' | 'speaking' | 'listening' | 'grammar' | 'vocabulary';
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  content: string;
  createdDate: string;
}

const students: Student[] = [
  { 
    id: 1, 
    name: 'Alice Johnson', 
    email: 'alice@student.com', 
    testsCompleted: 15, 
    avgScore: 85, 
    lastActive: '2 hours ago', 
    progress: 75,
    skillsProgress: { reading: 82, writing: 88, speaking: 80, listening: 85 },
    weeklyActivity: [
      { day: 'Mon', hours: 2.5 },
      { day: 'Tue', hours: 3 },
      { day: 'Wed', hours: 1.5 },
      { day: 'Thu', hours: 2 },
      { day: 'Fri', hours: 4 },
      { day: 'Sat', hours: 3.5 },
      { day: 'Sun', hours: 2 }
    ],
    recentTests: [
      { subject: 'Grammar Quiz', score: 88, date: '2 days ago' },
      { subject: 'Essay Writing', score: 85, date: '4 days ago' },
      { subject: 'Listening Comprehension', score: 92, date: '1 week ago' }
    ]
  },
  { 
    id: 2, 
    name: 'Bob Smith', 
    email: 'bob@student.com', 
    testsCompleted: 12, 
    avgScore: 78, 
    lastActive: '1 day ago', 
    progress: 60,
    skillsProgress: { reading: 75, writing: 72, speaking: 80, listening: 78 },
    weeklyActivity: [
      { day: 'Mon', hours: 1 },
      { day: 'Tue', hours: 2 },
      { day: 'Wed', hours: 1.5 },
      { day: 'Thu', hours: 0.5 },
      { day: 'Fri', hours: 2.5 },
      { day: 'Sat', hours: 3 },
      { day: 'Sun', hours: 1.5 }
    ],
    recentTests: [
      { subject: 'Vocabulary Test', score: 76, date: '3 days ago' },
      { subject: 'Pronunciation', score: 82, date: '5 days ago' },
      { subject: 'Reading Comprehension', score: 74, date: '1 week ago' }
    ]
  },
  { 
    id: 3, 
    name: 'Charlie Brown', 
    email: 'charlie@student.com', 
    testsCompleted: 18, 
    avgScore: 92, 
    lastActive: '3 hours ago', 
    progress: 90,
    skillsProgress: { reading: 94, writing: 90, speaking: 88, listening: 95 },
    weeklyActivity: [
      { day: 'Mon', hours: 3 },
      { day: 'Tue', hours: 4 },
      { day: 'Wed', hours: 3.5 },
      { day: 'Thu', hours: 4 },
      { day: 'Fri', hours: 3 },
      { day: 'Sat', hours: 2.5 },
      { day: 'Sun', hours: 3 }
    ],
    recentTests: [
      { subject: 'Advanced Essay', score: 95, date: '1 day ago' },
      { subject: 'Debate Skills', score: 91, date: '3 days ago' },
      { subject: 'Literature Analysis', score: 94, date: '6 days ago' }
    ]
  },
  { 
    id: 4, 
    name: 'Diana Prince', 
    email: 'diana@student.com', 
    testsCompleted: 10, 
    avgScore: 88, 
    lastActive: '5 hours ago', 
    progress: 50,
    skillsProgress: { reading: 90, writing: 88, speaking: 85, listening: 87 },
    weeklyActivity: [
      { day: 'Mon', hours: 2 },
      { day: 'Tue', hours: 2.5 },
      { day: 'Wed', hours: 2 },
      { day: 'Thu', hours: 3 },
      { day: 'Fri', hours: 2.5 },
      { day: 'Sat', hours: 1.5 },
      { day: 'Sun', hours: 2 }
    ],
    recentTests: [
      { subject: 'Speaking Test', score: 87, date: '2 days ago' },
      { subject: 'Writing Skills', score: 90, date: '4 days ago' },
      { subject: 'Grammar Test', score: 86, date: '1 week ago' }
    ]
  },
  { 
    id: 5, 
    name: 'Eve Wilson', 
    email: 'eve@student.com', 
    testsCompleted: 14, 
    avgScore: 81, 
    lastActive: '1 hour ago', 
    progress: 70,
    skillsProgress: { reading: 80, writing: 83, speaking: 78, listening: 82 },
    weeklyActivity: [
      { day: 'Mon', hours: 2.5 },
      { day: 'Tue', hours: 2 },
      { day: 'Wed', hours: 3 },
      { day: 'Thu', hours: 2.5 },
      { day: 'Fri', hours: 3.5 },
      { day: 'Sat', hours: 2 },
      { day: 'Sun', hours: 2.5 }
    ],
    recentTests: [
      { subject: 'Listening Test', score: 83, date: '1 day ago' },
      { subject: 'Essay Practice', score: 80, date: '3 days ago' },
      { subject: 'Vocabulary Quiz', score: 79, date: '5 days ago' }
    ]
  },
];

interface TeacherDashboardProps {
  language: Language;
}

export function TeacherDashboard({ language }: TeacherDashboardProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');
  const [customLessons, setCustomLessons] = useState<CustomLesson[]>([]);
  const [showLessonCreator, setShowLessonCreator] = useState(false);
  const [newLesson, setNewLesson] = useState<Omit<CustomLesson, 'id' | 'createdDate'>>({
    title: '',
    description: '',
    type: 'lesson',
    targetSkill: 'reading',
    difficultyLevel: 'intermediate',
    content: ''
  });

  // Calculate class analytics
  const classPerformanceData = [
    { month: 'Jan', avgScore: 76 },
    { month: 'Feb', avgScore: 78 },
    { month: 'Mar', avgScore: 82 },
    { month: 'Apr', avgScore: 84 },
    { month: 'May', avgScore: 86 },
    { month: 'Jun', avgScore: 84 },
  ];

  const skillsDistribution = [
    { skill: 'Reading', value: 87, color: '#8b7355' },
    { skill: 'Writing', value: 79, color: '#a0826d' },
    { skill: 'Speaking', value: 75, color: '#b8956d' },
    { skill: 'Listening', value: 82, color: '#d4af37' },
  ];

  const weeklyActivityData = [
    { day: 'Mon', students: 28 },
    { day: 'Tue', students: 32 },
    { day: 'Wed', students: 25 },
    { day: 'Thu', students: 30 },
    { day: 'Fri', students: 35 },
    { day: 'Sat', students: 20 },
    { day: 'Sun', students: 15 },
  ];

  const totalStudyHours = students.reduce((sum, student) => {
    return sum + student.weeklyActivity.reduce((total, day) => total + day.hours, 0);
  }, 0);

  const handleCreateLesson = () => {
    if (!newLesson.title.trim() || !newLesson.content.trim()) {
      alert('Please fill in the title and content fields!');
      return;
    }

    const lesson: CustomLesson = {
      ...newLesson,
      id: Date.now(),
      createdDate: new Date().toLocaleDateString()
    };

    setCustomLessons([...customLessons, lesson]);
    setNewLesson({
      title: '',
      description: '',
      type: 'lesson',
      targetSkill: 'reading',
      difficultyLevel: 'intermediate',
      content: ''
    });
    setShowLessonCreator(false);
    alert('Lesson created successfully! Students can now access this lesson.');
  };

  const handleDeleteLesson = (id: number) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      setCustomLessons(customLessons.filter(lesson => lesson.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">👨‍🏫 Teacher Dashboard</h1>
        <p className="text-muted-foreground">Monitor and track your students' learning progress with comprehensive analytics</p>
        
        {/* Time Range Selector */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === 'week' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === 'month' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{students.length}</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs">
            <TrendingUp className="w-3 h-3 text-green-600" />
            <span className="text-green-600 font-medium">+2 this month</span>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">84%</p>
              <p className="text-sm text-muted-foreground">Avg Class Score</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs">
            <TrendingUp className="w-3 h-3 text-green-600" />
            <span className="text-green-600 font-medium">+3% from last week</span>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">69</p>
              <p className="text-sm text-muted-foreground">Tests Completed</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs">
            <TrendingUp className="w-3 h-3 text-green-600" />
            <span className="text-green-600 font-medium">+12 this week</span>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{Math.round(totalStudyHours)}</p>
              <p className="text-sm text-muted-foreground">Study Hours (Week)</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs">
            <TrendingUp className="w-3 h-3 text-green-600" />
            <span className="text-green-600 font-medium">+8 hrs from last week</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Class Performance Trend */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Class Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={classPerformanceData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b7355" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b7355" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="avgScore" 
                stroke="#8b7355" 
                strokeWidth={2}
                fill="url(#colorScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Distribution */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Skills Performance Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={skillsDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="skill" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {skillsDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-card rounded-xl border border-border p-6 mb-8">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Weekly Student Activity
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weeklyActivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="students" 
              stroke="#8b7355" 
              strokeWidth={3}
              dot={{ fill: '#8b7355', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Students List */}
      <div className="bg-card rounded-xl border border-border p-6 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-6">Student Progress Tracking</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-sm font-semibold text-foreground">Student</th>
                <th className="text-left p-3 text-sm font-semibold text-foreground">Tests</th>
                <th className="text-left p-3 text-sm font-semibold text-foreground">Avg Score</th>
                <th className="text-left p-3 text-sm font-semibold text-foreground">Progress</th>
                <th className="text-left p-3 text-sm font-semibold text-foreground">Last Active</th>
                <th className="text-left p-3 text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-3">
                    <div>
                      <p className="font-semibold text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </td>
                  <td className="p-3 text-foreground">{student.testsCompleted}</td>
                  <td className="p-3">
                    <span className={`font-semibold ${
                      student.avgScore >= 85 ? 'text-green-600' :
                      student.avgScore >= 70 ? 'text-accent' :
                      'text-yellow-600'
                    }`}>
                      {student.avgScore}%
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-full max-w-[100px] h-2 bg-muted rounded-full">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">{student.lastActive}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Class Performance Overview & Recent Activities */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Performance by Category
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Grammar Tests
                </span>
                <span className="text-sm font-semibold text-primary">87%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: '87%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground flex items-center gap-2">
                  <PenTool className="w-4 h-4" />
                  Essay Writing
                </span>
                <span className="text-sm font-semibold text-accent">79%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full">
                <div className="h-full bg-accent rounded-full transition-all" style={{ width: '79%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Literature Analysis
                </span>
                <span className="text-sm font-semibold text-green-600">91%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full">
                <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: '91%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  Pronunciation
                </span>
                <span className="text-sm font-semibold text-yellow-600">75%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full">
                <div className="h-full bg-yellow-500 rounded-full transition-all" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Recent Student Activities
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Alice completed Grammar Test</p>
                <p className="text-xs text-muted-foreground">2 hours ago • Score: 88%</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Charlie submitted Essay</p>
                <p className="text-xs text-muted-foreground">3 hours ago • Awaiting review</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Eve practiced Pronunciation</p>
                <p className="text-xs text-muted-foreground">1 hour ago • Score: 82%</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Bob completed Reading Lesson</p>
                <p className="text-xs text-muted-foreground">4 hours ago • Score: 76%</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Diana practiced Speaking</p>
                <p className="text-xs text-muted-foreground">5 hours ago • Score: 90%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login & Signup Tracking */}
      <div className="bg-card rounded-xl border border-border p-6 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          📊 Login & Signup Tracking
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-sm font-semibold text-foreground">Timestamp</th>
                <th className="text-left p-3 text-sm font-semibold text-foreground">Name/Email</th>
                <th className="text-left p-3 text-sm font-semibold text-foreground">Method</th>
                <th className="text-left p-3 text-sm font-semibold text-foreground">Role</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
                return loginHistory.slice(-10).reverse().map((login: any, index: number) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="p-3 text-sm text-foreground">
                      {new Date(login.timestamp).toLocaleString()}
                    </td>
                    <td className="p-3 text-sm text-foreground">
                      {login.name || login.email || `${login.role === 'teacher' ? 'Teacher' : 'Student'} Demo`}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        login.method === 'Google' ? 'bg-blue-100 text-blue-800' :
                        login.method === 'Email Signup' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {login.method}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        login.role === 'teacher' ? 'bg-accent/20 text-accent' :
                        'bg-primary/20 text-primary'
                      }`}>
                        {login.role === 'teacher' ? '👨‍🏫 Teacher' : '👨‍🎓 Student'}
                      </span>
                    </td>
                  </tr>
                ));
              })()}
              {(() => {
                const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
                if (loginHistory.length === 0) {
                  return (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-muted-foreground">
                        No login/signup data available yet
                      </td>
                    </tr>
                  );
                }
                return null;
              })()}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">
                {JSON.parse(localStorage.getItem('loginHistory') || '[]').length}
              </p>
              <p className="text-xs text-muted-foreground">Total Logins</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {JSON.parse(localStorage.getItem('loginHistory') || '[]').filter((l: any) => l.method === 'Email Signup').length}
              </p>
              <p className="text-xs text-muted-foreground">New Signups</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">
                {JSON.parse(localStorage.getItem('registeredUsers') || '[]').length}
              </p>
              <p className="text-xs text-muted-foreground">Registered Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Lessons Management */}
      <div className="bg-card rounded-xl border border-border p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">📚 Custom Lessons & Activities</h2>
            <p className="text-sm text-muted-foreground mt-1">Create and manage custom lessons and activities for your students</p>
          </div>
          <button
            onClick={() => setShowLessonCreator(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            <Plus className="w-5 h-5" />
            Create Lesson
          </button>
        </div>

        {/* Lessons List */}
        {customLessons.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-1">No custom lessons created yet</p>
            <p className="text-sm text-muted-foreground">Click "Create Lesson" to add your first custom lesson or activity</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customLessons.map((lesson) => (
              <div key={lesson.id} className="bg-muted/50 rounded-lg p-4 border border-border hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{lesson.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{lesson.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="text-muted-foreground hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs capitalize">
                    {lesson.type}
                  </span>
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs capitalize">
                    {lesson.targetSkill}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs capitalize">
                    {lesson.difficultyLevel}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Created: {lesson.createdDate}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lesson Creator Modal */}
      {showLessonCreator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm" onClick={() => setShowLessonCreator(false)}>
          <div className="bg-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Create Custom Lesson</h3>
              <button
                onClick={() => setShowLessonCreator(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  placeholder="e.g., Advanced Grammar: Present Perfect"
                  className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={newLesson.description}
                  onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                  placeholder="Brief description of the lesson"
                  className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Type and Skill */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Type
                  </label>
                  <select
                    value={newLesson.type}
                    onChange={(e) => setNewLesson({ ...newLesson, type: e.target.value as any })}
                    className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="lesson">Lesson</option>
                    <option value="activity">Activity</option>
                    <option value="quiz">Quiz</option>
                    <option value="assignment">Assignment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Target Skill
                  </label>
                  <select
                    value={newLesson.targetSkill}
                    onChange={(e) => setNewLesson({ ...newLesson, targetSkill: e.target.value as any })}
                    className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="reading">Reading</option>
                    <option value="writing">Writing</option>
                    <option value="speaking">Speaking</option>
                    <option value="listening">Listening</option>
                    <option value="grammar">Grammar</option>
                    <option value="vocabulary">Vocabulary</option>
                  </select>
                </div>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Difficulty Level
                </label>
                <select
                  value={newLesson.difficultyLevel}
                  onChange={(e) => setNewLesson({ ...newLesson, difficultyLevel: e.target.value as any })}
                  className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Lesson Content *
                </label>
                <textarea
                  value={newLesson.content}
                  onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                  placeholder="Enter the lesson content, instructions, questions, or exercises..."
                  className="w-full h-48 p-3 bg-input-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateLesson}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                >
                  <Save className="w-5 h-5" />
                  Create Lesson
                </button>
                <button
                  onClick={() => setShowLessonCreator(false)}
                  className="px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm" onClick={() => setSelectedStudent(null)}>
          <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{selectedStudent.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedStudent.email}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {/* Student Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Tests Completed</p>
                <p className="text-2xl font-bold text-primary">{selectedStudent.testsCompleted}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Average Score</p>
                <p className="text-2xl font-bold text-accent">{selectedStudent.avgScore}%</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Course Progress</p>
                <p className="text-2xl font-bold text-foreground">{selectedStudent.progress}%</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Last Active</p>
                <p className="text-lg font-semibold text-foreground">{selectedStudent.lastActive}</p>
              </div>
            </div>

            {/* Skills Progress */}
            <div className="mb-6">
              <h4 className="font-bold text-foreground mb-4">Skills Breakdown</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Reading
                    </span>
                    <span className="text-sm font-bold text-blue-600">{selectedStudent.skillsProgress.reading}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${selectedStudent.skillsProgress.reading}%` }} />
                  </div>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <PenTool className="w-4 h-4" />
                      Writing
                    </span>
                    <span className="text-sm font-bold text-purple-600">{selectedStudent.skillsProgress.writing}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${selectedStudent.skillsProgress.writing}%` }} />
                  </div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Mic className="w-4 h-4" />
                      Speaking
                    </span>
                    <span className="text-sm font-bold text-green-600">{selectedStudent.skillsProgress.speaking}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${selectedStudent.skillsProgress.speaking}%` }} />
                  </div>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Listening
                    </span>
                    <span className="text-sm font-bold text-orange-600">{selectedStudent.skillsProgress.listening}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${selectedStudent.skillsProgress.listening}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Activity Chart */}
            <div className="mb-6">
              <h4 className="font-bold text-foreground mb-4">Weekly Study Activity</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={selectedStudent.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="hours" fill="#8b7355" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Tests */}
            <div className="mb-6">
              <h4 className="font-bold text-foreground mb-4">Recent Test Results</h4>
              <div className="space-y-2">
                {selectedStudent.recentTests.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">{test.subject}</p>
                      <p className="text-xs text-muted-foreground">{test.date}</p>
                    </div>
                    <span className={`font-bold ${
                      test.score >= 85 ? 'text-green-600' :
                      test.score >= 70 ? 'text-accent' :
                      'text-yellow-600'
                    }`}>
                      {test.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}