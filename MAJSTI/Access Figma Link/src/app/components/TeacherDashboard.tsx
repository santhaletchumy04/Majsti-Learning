import { useState } from 'react';
import { Users, TrendingUp, Award, FileText, Clock, BarChart3 } from 'lucide-react';
import type { Language } from '../App';

interface Student {
  id: number;
  name: string;
  email: string;
  testsCompleted: number;
  avgScore: number;
  lastActive: string;
  progress: number;
}

const students: Student[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@student.com', testsCompleted: 15, avgScore: 85, lastActive: '2 hours ago', progress: 75 },
  { id: 2, name: 'Bob Smith', email: 'bob@student.com', testsCompleted: 12, avgScore: 78, lastActive: '1 day ago', progress: 60 },
  { id: 3, name: 'Charlie Brown', email: 'charlie@student.com', testsCompleted: 18, avgScore: 92, lastActive: '3 hours ago', progress: 90 },
  { id: 4, name: 'Diana Prince', email: 'diana@student.com', testsCompleted: 10, avgScore: 88, lastActive: '5 hours ago', progress: 50 },
  { id: 5, name: 'Eve Wilson', email: 'eve@student.com', testsCompleted: 14, avgScore: 81, lastActive: '1 hour ago', progress: 70 },
];

interface TeacherDashboardProps {
  language: Language;
}

export function TeacherDashboard({ language }: TeacherDashboardProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">👨‍🏫 Teacher Dashboard</h1>
        <p className="text-muted-foreground">Monitor and track your students' learning progress</p>
      </div>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{students.length}</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">84%</p>
              <p className="text-sm text-muted-foreground">Avg Class Score</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">69</p>
              <p className="text-sm text-muted-foreground">Tests Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">127</p>
              <p className="text-sm text-muted-foreground">Study Hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-card rounded-xl border border-border p-6 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-6">Student Progress</h2>
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
                <tr key={student.id} className="border-b border-border hover:bg-muted/50">
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
                          className="h-full bg-primary rounded-full"
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
                      className="text-sm text-primary hover:underline"
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

      {/* Class Performance Chart */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Performance Overview
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">Grammar Tests</span>
                <span className="text-sm font-semibold text-primary">87%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full">
                <div className="h-full bg-primary rounded-full" style={{ width: '87%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">Essay Writing</span>
                <span className="text-sm font-semibold text-accent">79%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full">
                <div className="h-full bg-accent rounded-full" style={{ width: '79%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">Literature Analysis</span>
                <span className="text-sm font-semibold text-green-600">91%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '91%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">Pronunciation</span>
                <span className="text-sm font-semibold text-yellow-600">75%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Recent Activities
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-semibold text-foreground">Alice completed Grammar Test</p>
                <p className="text-xs text-muted-foreground">2 hours ago • Score: 88%</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-semibold text-foreground">Charlie submitted Essay</p>
                <p className="text-xs text-muted-foreground">3 hours ago • Awaiting review</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-semibold text-foreground">Eve practiced Pronunciation</p>
                <p className="text-xs text-muted-foreground">1 hour ago • Score: 82%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedStudent(null)}>
          <div className="bg-card rounded-2xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-foreground mb-6">{selectedStudent.name}</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
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
            <button
              onClick={() => setSelectedStudent(null)}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
