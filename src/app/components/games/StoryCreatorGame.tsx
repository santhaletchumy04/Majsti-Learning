import { useState } from 'react';
import { ArrowLeft, BookOpen, Sparkles, Trophy } from 'lucide-react';

interface StoryCreatorGameProps {
  onBack: () => void;
  onScoreUpdate: (score: number) => void;
}

interface StoryTemplate {
  id: number;
  title: string;
  level: string;
  description: string;
  template: string[];
  choices: { [key: string]: string[] };
}

const storyTemplates: StoryTemplate[] = [
  {
    id: 1,
    title: 'The Adventure Begins',
    level: 'Beginner',
    description: 'Create a simple adventure story',
    template: [
      'Once upon a time, there was a [ADJECTIVE1] [ANIMAL].',
      'The [ANIMAL] lived in a [PLACE].',
      'One day, the [ANIMAL] decided to go on a [ADJECTIVE2] adventure.',
      'The [ANIMAL] met a [FRIEND] who was very [EMOTION].',
      'Together they went to the [DESTINATION] and had a [ADJECTIVE3] time!'
    ],
    choices: {
      ADJECTIVE1: ['brave', 'curious', 'friendly', 'clever'],
      ANIMAL: ['cat', 'dog', 'rabbit', 'elephant'],
      PLACE: ['forest', 'mountain', 'beach', 'garden'],
      ADJECTIVE2: ['exciting', 'mysterious', 'magical', 'dangerous'],
      FRIEND: ['bird', 'turtle', 'monkey', 'squirrel'],
      EMOTION: ['happy', 'worried', 'excited', 'surprised'],
      DESTINATION: ['castle', 'cave', 'river', 'village'],
      ADJECTIVE3: ['wonderful', 'amazing', 'fantastic', 'great']
    }
  },
  {
    id: 2,
    title: 'My Day at School',
    level: 'Beginner',
    description: 'Tell a story about your school day',
    template: [
      'Today I woke up feeling [EMOTION1].',
      'I got ready and went to [PLACE].',
      'In class, we learned about [SUBJECT].',
      'During lunch, I ate [FOOD] with my [FRIEND].',
      'After school, I felt [EMOTION2] because the day was [ADJECTIVE]!'
    ],
    choices: {
      EMOTION1: ['excited', 'sleepy', 'happy', 'nervous'],
      PLACE: ['school', 'the library', 'the park', 'my friend\'s house'],
      SUBJECT: ['mathematics', 'science', 'history', 'art'],
      FOOD: ['sandwiches', 'pizza', 'rice', 'noodles'],
      FRIEND: ['best friend', 'classmate', 'teacher', 'sibling'],
      EMOTION2: ['happy', 'tired', 'proud', 'satisfied'],
      ADJECTIVE: ['fun', 'interesting', 'challenging', 'wonderful']
    }
  },
  {
    id: 3,
    title: 'The Lost Treasure',
    level: 'Intermediate',
    description: 'Create an adventure about finding treasure',
    template: [
      'A famous [EXPLORER] was searching for a [ADJECTIVE1] treasure.',
      'The treasure was hidden in a [PLACE] guarded by a [CREATURE].',
      'Using a [TOOL], the [EXPLORER] carefully [ACTION1] through the challenge.',
      'Suddenly, they discovered that the treasure was actually [TREASURE]!',
      'The [EXPLORER] felt [EMOTION] and decided to [ACTION2] it with everyone.'
    ],
    choices: {
      EXPLORER: ['pirate', 'archaeologist', 'detective', 'adventurer'],
      ADJECTIVE1: ['ancient', 'legendary', 'mysterious', 'magical'],
      PLACE: ['dark cave', 'old temple', 'sunken ship', 'abandoned castle'],
      CREATURE: ['dragon', 'giant spider', 'ghost', 'wise owl'],
      TOOL: ['magic map', 'golden key', 'special compass', 'ancient scroll'],
      ACTION1: ['navigated', 'solved', 'fought', 'negotiated'],
      TREASURE: ['knowledge and wisdom', 'gold and jewels', 'magical powers', 'ancient artifacts'],
      EMOTION: ['amazed', 'grateful', 'overwhelmed', 'joyful'],
      ACTION2: ['share', 'protect', 'study', 'display']
    }
  },
  {
    id: 4,
    title: 'Future World',
    level: 'Intermediate',
    description: 'Imagine life in the future',
    template: [
      'In the year [YEAR], people lived in [PLACE].',
      'Everyone had a [DEVICE] that could [ABILITY1].',
      'Transportation was done by [TRANSPORT] which was [ADJECTIVE].',
      'The biggest challenge was [PROBLEM], but scientists [ACTION].',
      'Life became [EMOTION] because technology made everything [ADJECTIVE2]!'
    ],
    choices: {
      YEAR: ['2100', '2500', '3000', '2200'],
      PLACE: ['floating cities', 'underground homes', 'space stations', 'crystal towers'],
      DEVICE: ['smart watch', 'hologram phone', 'AI assistant', 'teleporter'],
      ABILITY1: ['translate any language', 'read thoughts', 'create food', 'control weather'],
      TRANSPORT: ['flying cars', 'teleportation', 'magnetic trains', 'rocket ships'],
      ADJECTIVE: ['eco-friendly', 'super fast', 'completely safe', 'fun'],
      PROBLEM: ['climate change', 'energy shortage', 'overpopulation', 'robot rebellion'],
      ACTION: ['found solutions', 'invented new technology', 'worked together', 'discovered alternatives'],
      EMOTION: ['easier', 'more exciting', 'more peaceful', 'more connected'],
      ADJECTIVE2: ['possible', 'accessible', 'sustainable', 'innovative']
    }
  },
  {
    id: 5,
    title: 'The Hero\'s Journey',
    level: 'Advanced',
    description: 'Create an epic hero story',
    template: [
      'In a [SETTING], a [ADJECTIVE1] hero named [HERONAME] lived peacefully.',
      'One day, an evil [VILLAIN] threatened to [EVILPLAN].',
      '[HERONAME] embarked on a quest to find the legendary [ITEM].',
      'Along the journey, they faced [CHALLENGE] but learned to [SKILL].',
      'In the final battle, [HERONAME] used [POWER] and successfully [VICTORY]!',
      'The land was saved, and [HERONAME] became [LEGACY].'
    ],
    choices: {
      SETTING: ['kingdom far away', 'mystical realm', 'peaceful village', 'enchanted forest'],
      ADJECTIVE1: ['humble', 'reluctant', 'destined', 'unlikely'],
      HERONAME: ['Alex the Brave', 'Luna the Wise', 'Phoenix the Strong', 'River the Swift'],
      VILLAIN: ['sorcerer', 'dragon lord', 'dark knight', 'shadow queen'],
      EVILPLAN: ['destroy the world', 'enslave all people', 'steal all magic', 'plunge land into darkness'],
      ITEM: ['Sword of Light', 'Crystal of Truth', 'Shield of Courage', 'Crown of Wisdom'],
      CHALLENGE: ['dangerous monsters', 'impossible riddles', 'treacherous terrain', 'powerful curses'],
      SKILL: ['master their fears', 'trust their friends', 'believe in themselves', 'use their unique power'],
      POWER: ['courage and determination', 'wisdom and strategy', 'teamwork and friendship', 'hope and love'],
      VICTORY: ['defeated the villain', 'restored peace', 'broke the curse', 'united the kingdoms'],
      LEGACY: ['a legend', 'a wise ruler', 'a symbol of hope', 'a true hero']
    }
  }
];

export function StoryCreatorGame({ onBack, onScoreUpdate }: StoryCreatorGameProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<{ [key: string]: string }>({});
  const [completedStory, setCompletedStory] = useState<string[] | null>(null);
  const [score, setScore] = useState(0);

  const template = storyTemplates.find(t => t.id === selectedTemplate);

  const startStory = (templateId: number) => {
    setSelectedTemplate(templateId);
    setCurrentStep(0);
    setSelectedChoices({});
    setCompletedStory(null);
    setScore(0);
  };

  const getCurrentPlaceholder = (): string | null => {
    if (!template) return null;
    
    // Find the first unfilled placeholder
    const allPlaceholders = Object.keys(template.choices);
    for (const placeholder of allPlaceholders) {
      if (!selectedChoices[placeholder]) {
        return placeholder;
      }
    }
    return null;
  };

  const selectWord = (placeholder: string, word: string) => {
    const newChoices = { ...selectedChoices, [placeholder]: word };
    setSelectedChoices(newChoices);
    setScore(prev => prev + 10);

    // Check if all placeholders are filled
    const allFilled = Object.keys(template!.choices).every(key => newChoices[key]);
    
    if (allFilled) {
      // Generate completed story
      const story = template!.template.map(sentence => {
        let result = sentence;
        Object.entries(newChoices).forEach(([placeholder, word]) => {
          result = result.replace(`[${placeholder}]`, word);
        });
        return result;
      });
      setCompletedStory(story);
      onScoreUpdate(score + 100);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  if (!selectedTemplate) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Games
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">📖 Story Creator</h1>
              <p className="text-muted-foreground">Create your own stories by choosing words!</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storyTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => startStory(template.id)}
              className="bg-card rounded-xl border border-border p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105"
            >
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                template.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                template.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {template.level}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{template.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
              <div className="text-xs text-muted-foreground">
                {Object.keys(template.choices).length} word choices
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (completedStory) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setSelectedTemplate(null)}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Stories
        </button>

        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-2">Your Story is Complete!</h2>
            <p className="text-lg text-muted-foreground">Score: <span className="font-bold text-primary">{score + 100}</span></p>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">{template?.title}</h3>
            <div className="space-y-4">
              {completedStory.map((sentence, index) => (
                <p key={index} className="text-lg text-foreground leading-relaxed">
                  {sentence}
                </p>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => startStory(selectedTemplate)}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create Another Story
            </button>
            <button
              onClick={() => setSelectedTemplate(null)}
              className="px-8 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
            >
              Choose Different Template
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentPlaceholder = getCurrentPlaceholder();
  const choices = currentPlaceholder ? template!.choices[currentPlaceholder] : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => setSelectedTemplate(null)}
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Stories
      </button>

      {/* Progress */}
      <div className="bg-card rounded-xl border border-border p-4 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-semibold text-foreground">
            {Object.keys(selectedChoices).length} / {Object.keys(template!.choices).length}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(Object.keys(selectedChoices).length / Object.keys(template!.choices).length) * 100}%` }}
          />
        </div>
      </div>

      {/* Story Preview */}
      <div className="bg-card rounded-2xl border border-border p-8 mb-8">
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          {template?.title}
        </h3>
        <div className="space-y-3 bg-muted/30 rounded-xl p-6">
          {template!.template.map((sentence, index) => {
            let displaySentence = sentence;
            Object.entries(selectedChoices).forEach(([placeholder, word]) => {
              displaySentence = displaySentence.replace(`[${placeholder}]`, `<span class="font-bold text-primary">${word}</span>`);
            });
            return (
              <p
                key={index}
                className="text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: displaySentence.replace(/\[([^\]]+)\]/g, '<span class="text-accent">_____</span>') }}
              />
            );
          })}
        </div>
      </div>

      {/* Word Selection */}
      {currentPlaceholder && (
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="mb-6 text-center">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="text-xl font-semibold text-foreground mb-2">
              Choose a {currentPlaceholder.replace(/\d+$/, '').toLowerCase().replace(/_/g, ' ')}:
            </h4>
            <p className="text-sm text-muted-foreground">
              Select the word that fits best in your story
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {choices.map((word, index) => (
              <button
                key={index}
                onClick={() => selectWord(currentPlaceholder, word)}
                className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-border rounded-xl hover:border-primary hover:shadow-lg transition-all text-foreground font-semibold"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
