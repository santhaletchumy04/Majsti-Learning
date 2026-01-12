import { useState } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, User, Clock, Send, Plus, Search } from 'lucide-react';
import type { Language } from '../App';

interface Topic {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  timestamp: string;
  content: string;
}

interface Reply {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

const initialTopics: Topic[] = [
  {
    id: 1,
    title: "Best strategies for learning vocabulary?",
    author: "Sarah Chen",
    category: "Learning Tips",
    replies: 12,
    likes: 24,
    timestamp: "2 hours ago",
    content: "I'm struggling to remember new vocabulary words. What strategies work best for you? I've tried flashcards but they don't seem to stick."
  },
  {
    id: 2,
    title: "How to improve pronunciation skills",
    author: "Michael Park",
    category: "Speaking",
    replies: 8,
    likes: 18,
    timestamp: "5 hours ago",
    content: "Looking for tips on improving pronunciation. Any recommended resources or techniques that have worked for you?"
  },
  {
    id: 3,
    title: "Grammar exercises - present perfect tense",
    author: "Emma Wilson",
    category: "Grammar",
    replies: 15,
    likes: 31,
    timestamp: "1 day ago",
    content: "Can someone explain when to use present perfect vs simple past? I keep getting confused with these two tenses."
  },
  {
    id: 4,
    title: "Favorite learning games on the platform?",
    author: "David Lee",
    category: "Games",
    replies: 20,
    likes: 45,
    timestamp: "1 day ago",
    content: "What are your favorite games on MAJSTI LEARNING? I've been enjoying the word matching game. Looking for more recommendations!"
  },
  {
    id: 5,
    title: "Study group for intermediate learners",
    author: "Lisa Rodriguez",
    category: "Study Groups",
    replies: 6,
    likes: 12,
    timestamp: "2 days ago",
    content: "Anyone interested in forming a study group? I'm at intermediate level and would love to practice with others."
  }
];

const topicReplies: { [key: number]: Reply[] } = {
  1: [
    {
      id: 1,
      author: "John Smith",
      content: "I use spaced repetition! Review words after 1 day, then 3 days, then a week. It really helps with long-term retention.",
      timestamp: "1 hour ago",
      likes: 8
    },
    {
      id: 2,
      author: "Anna Martinez",
      content: "Try using the words in sentences! Context helps memory. I write a short story using new vocabulary.",
      timestamp: "45 minutes ago",
      likes: 5
    }
  ]
};

interface ForumPageProps {
  language: Language;
}

export function ForumPage({ language }: ForumPageProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [newReply, setNewReply] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState('General');

  const categories = ['All', 'Learning Tips', 'Grammar', 'Speaking', 'Games', 'Study Groups'];

  const filteredTopics = initialTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitReply = () => {
    if (newReply.trim() && selectedTopic) {
      // In a real app, this would add to the database
      setNewReply('');
    }
  };

  const handleCreateTopic = () => {
    if (newTopicTitle.trim() && newTopicContent.trim()) {
      // In a real app, this would add to the database
      setNewTopicTitle('');
      setNewTopicContent('');
      setShowNewTopicForm(false);
    }
  };

  if (selectedTopic) {
    const replies = topicReplies[selectedTopic.id] || [];
    
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setSelectedTopic(null)}
          className="mb-6 text-primary hover:text-primary/80 flex items-center gap-2"
        >
          ← Back to topics
        </button>

        {/* Topic Detail */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground">{selectedTopic.author}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="w-3 h-3" />
                {selectedTopic.timestamp}
              </div>
            </div>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {selectedTopic.category}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-4">{selectedTopic.title}</h1>
          <p className="text-foreground mb-4">{selectedTopic.content}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <ThumbsUp className="w-4 h-4" />
              {selectedTopic.likes}
            </button>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {replies.length} replies
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-bold text-foreground">{replies.length} Replies</h2>
          
          {replies.map((reply) => (
            <div key={reply.id} className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{reply.author}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {reply.timestamp}
                  </div>
                </div>
              </div>
              
              <p className="text-foreground mb-3">{reply.content}</p>
              
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ThumbsUp className="w-4 h-4" />
                {reply.likes}
              </button>
            </div>
          ))}
        </div>

        {/* New Reply Form */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h3 className="font-bold text-foreground mb-4">Add a Reply</h3>
          <textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full p-4 bg-input-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            rows={4}
          />
          <button
            onClick={handleSubmitReply}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Post Reply
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Community Forum</h1>
        <p className="text-muted-foreground">Connect, discuss, and learn together</p>
      </div>

      {/* Search and New Topic */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics..."
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          onClick={() => setShowNewTopicForm(!showNewTopicForm)}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          New Topic
        </button>
      </div>

      {/* New Topic Form */}
      {showNewTopicForm && (
        <div className="bg-card rounded-xl border border-border p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-4">Create New Topic</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
              <select
                value={newTopicCategory}
                onChange={(e) => setNewTopicCategory(e.target.value)}
                className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Title</label>
              <input
                type="text"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
                placeholder="Enter topic title..."
                className="w-full p-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Content</label>
              <textarea
                value={newTopicContent}
                onChange={(e) => setNewTopicContent(e.target.value)}
                placeholder="Describe your topic..."
                className="w-full p-3 bg-input-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreateTopic}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Create Topic
              </button>
              <button
                onClick={() => setShowNewTopicForm(false)}
                className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm whitespace-nowrap">
                    {topic.category}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {topic.content}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {topic.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {topic.timestamp}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {topic.replies}
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {topic.likes}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}