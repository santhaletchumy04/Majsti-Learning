import { useState } from 'react';
import { BookMarked, Sparkles, FileText, MessageCircle, Mic, Video } from 'lucide-react';
import type { Language } from '../App';

interface Literature {
  id: number;
  title: string;
  author: string;
  type: 'novel' | 'poem' | 'play' | 'short story' | 'speech';
  level: string;
  excerpt: string;
  fullStory: string;
}

const literatures: Literature[] = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    type: 'novel',
    level: 'Advanced',
    excerpt: 'A classic novel about racial injustice and moral growth in the American South.',
    fullStory: `CHAPTER 1

When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, and Jem's fears of never being able to play football were assuaged, he was seldom self-conscious about his injury. His left arm was somewhat shorter than his right; when he stood or walked, the back of his hand was at right angles to his body, his thumb parallel to his thigh.

When enough years had gone by to enable us to look back on them, we sometimes discussed the events leading to his accident. I maintain that the Ewells started it all, but Jem, who was four years my senior, said it started long before that. He said it began the summer Dill came to us, when Dill first gave us the idea of making Boo Radley come out.

Maycomb was an old town, but it was a tired old town when I first knew it. In rainy weather the streets turned to red slop; grass grew on the sidewalks, the courthouse sagged in the square. Somehow, it was hotter then: a black dog suffered on a summer's day; bony mules hitched to Hoover carts flicked flies in the sweltering shade of the live oaks on the square. Men's stiff collars wilted by nine in the morning. Ladies bathed before noon, after their three-o'clock naps, and by nightfall were like soft teacakes with frostings of sweat and sweet talcum.

The story follows Scout Finch and her brother Jem as their father, Atticus Finch, defends a black man falsely accused of assaulting a white woman. Through the children's eyes, we witness themes of racial injustice, moral growth, courage, and the loss of innocence in 1930s Alabama. The novel explores the complexities of good and evil in human nature and remains one of the most important works of American literature.`
  },
  {
    id: 2,
    title: 'The Road Not Taken',
    author: 'Robert Frost',
    type: 'poem',
    level: 'Intermediate',
    excerpt: 'Two roads diverged in a yellow wood, And sorry I could not travel both...',
    fullStory: `THE ROAD NOT TAKEN
By Robert Frost

Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,

And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back.

I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.

ANALYSIS:
This famous poem by Robert Frost explores themes of choice, individualism, and the paths we take in life. The speaker comes to a fork in a wooded path and must choose which way to go. Though the roads appear similar, the speaker chooses the one "less traveled by" and reflects on how this decision has shaped their life. The poem's beauty lies in its ambiguity—is the speaker satisfied or regretful? The work encourages readers to reflect on their own life choices and the consequences of those decisions.`
  },
  {
    id: 3,
    title: 'Romeo and Juliet',
    author: 'William Shakespeare',
    type: 'play',
    level: 'Advanced',
    excerpt: 'A tragic love story set in Verona, exploring themes of love, fate, and family conflict.',
    fullStory: `ROMEO AND JULIET
By William Shakespeare

ACT I, SCENE I (Excerpt)
[A public place in Verona. Enter SAMPSON and GREGORY, armed with swords and bucklers.]

PROLOGUE:
Two households, both alike in dignity,
In fair Verona, where we lay our scene,
From ancient grudge break to new mutiny,
Where civil blood makes civil hands unclean.
From forth the fatal loins of these two foes
A pair of star-cross'd lovers take their life;
Whose misadventured piteous overthrows
Doth with their death bury their parents' strife.

THE FAMOUS BALCONY SCENE (Act II, Scene II):

ROMEO: But, soft! what light through yonder window breaks?
It is the east, and Juliet is the sun.
Arise, fair sun, and kill the envious moon,
Who is already sick and pale with grief,
That thou her maid art far more fair than she...

JULIET: O Romeo, Romeo! wherefore art thou Romeo?
Deny thy father and refuse thy name;
Or, if thou wilt not, be but sworn my love,
And I'll no longer be a Capulet.

ROMEO: [Aside] Shall I hear more, or shall I speak at this?

JULIET: 'Tis but thy name that is my enemy;
Thou art thyself, though not a Montague.
What's Montague? It is nor hand, nor foot,
Nor arm, nor face, nor any other part
Belonging to a man. O, be some other name!
What's in a name? That which we call a rose
By any other name would smell as sweet...

SUMMARY:
Romeo and Juliet is Shakespeare's timeless tragedy about two young lovers from feuding families in Verona. Their passionate love defies their families' hatred, but ultimately leads to their tragic deaths. The play explores themes of love versus hate, fate versus free will, youth versus age, and the destructive nature of vendettas. It remains one of the most performed and adapted plays in theatre history.`
  },
  {
    id: 4,
    title: 'The Gift of the Magi',
    author: 'O. Henry',
    type: 'short story',
    level: 'Intermediate',
    excerpt: 'A touching story about love and sacrifice during Christmas time.',
    fullStory: `THE GIFT OF THE MAGI
By O. Henry

One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one's cheeks burned with the silent imputation of parsimony that such close dealing implied. Three times Della counted it. One dollar and eighty-seven cents. And the next day would be Christmas.

There was clearly nothing to do but flop down on the shabby little couch and howl. So Della did it. Which instigates the moral reflection that life is made up of sobs, sniffles, and smiles, with sniffles predominating.

Della lived in a furnished flat with her husband Jim. They had only eight dollars a week to live on. But there were two possessions of which they were both very proud. One was Jim's gold watch that had been his father's and his grandfather's. The other was Della's beautiful hair that fell about her like a cascade of brown waters.

On this particular Christmas Eve, Della wanted desperately to buy Jim something special. Looking in the mirror at her beautiful hair, she suddenly had an idea. She rushed to a hair goods shop where Madame Sofronie bought hair.

"Will you buy my hair?" asked Della.
"Twenty dollars," said Madame, lifting the mass of Della's hair with a practiced hand.

With the money, Della searched for the perfect gift. At last she found it—a platinum watch chain, simple and elegant, worthy of Jim's precious watch. It cost twenty-one dollars.

When Jim came home that evening and saw Della's short hair, he stood frozen with an odd expression on his face. From his pocket, he drew a package and threw it on the table.

"Don't make any mistake about me, Dell," he said. "I don't think there's anything that could make me like you any less. But if you'll unwrap that package, you may see why I had a strange look on my face."

Della tore at the package. There lay The Combs—the set of combs that Della had worshipped for months in a Broadway window. Beautiful combs, pure tortoise shell, with jeweled rims—just the shade to wear in her beautiful hair.

"My hair grows fast, Jim!" she cried. Then she remembered her gift. "Isn't it perfect for your watch? Give me your watch. I want to see how it looks on it."

Instead of obeying, Jim tumbled down on the couch and put his hands behind his head and smiled.

"Dell," said he, "let's put our Christmas presents away and keep 'em a while. They're too nice to use just at present. I sold the watch to get the money to buy your combs."

The magi, as you know, were wise men—wonderfully wise men—who brought gifts to the newborn Jesus. They invented the art of giving Christmas presents. Being wise, their gifts were no doubt wise ones. And here I have lamely related to you the uneventful chronicle of two foolish children in a flat who most unwisely sacrificed for each other the greatest treasures of their house. But in a last word to the wise of these days, let it be said that of all who give gifts, these two were the wisest. Of all who give and receive gifts, such as they are wisest. Everywhere they are wisest. They are the magi.`
  },
  {
    id: 5,
    title: 'I Have a Dream',
    author: 'Martin Luther King Jr.',
    type: 'speech',
    level: 'Advanced',
    excerpt: 'A historic speech about civil rights and equality delivered in 1963.',
    fullStory: `I HAVE A DREAM
By Martin Luther King Jr.
Delivered August 28, 1963, at the Lincoln Memorial, Washington D.C.

I am happy to join with you today in what will go down in history as the greatest demonstration for freedom in the history of our nation.

Five score years ago, a great American, in whose symbolic shadow we stand today, signed the Emancipation Proclamation. This momentous decree came as a great beacon light of hope to millions of Negro slaves who had been seared in the flames of withering injustice. It came as a joyous daybreak to end the long night of their captivity.

But one hundred years later, the Negro still is not free. One hundred years later, the life of the Negro is still sadly crippled by the manacles of segregation and the chains of discrimination. One hundred years later, the Negro lives on a lonely island of poverty in the midst of a vast ocean of material prosperity. One hundred years later, the Negro is still languished in the corners of American society and finds himself an exile in his own land.

So we have come here today to dramatize a shameful condition. In a sense we've come to our nation's capital to cash a check. When the architects of our republic wrote the magnificent words of the Constitution and the Declaration of Independence, they were signing a promissory note to which every American was to fall heir.

I say to you today, my friends, though, even though we face the difficulties of today and tomorrow, I still have a dream. It is a dream deeply rooted in the American dream.

I have a dream that one day this nation will rise up and live out the true meaning of its creed: "We hold these truths to be self-evident, that all men are created equal."

I have a dream that one day on the red hills of Georgia, sons of former slaves and the sons of former slave owners will be able to sit down together at the table of brotherhood.

I have a dream that one day even the state of Mississippi, a state sweltering with the heat of injustice, sweltering with the heat of oppression, will be transformed into an oasis of freedom and justice.

I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character. I have a dream today!

When we allow freedom to ring, when we let it ring from every village and every hamlet, from every state and every city, we will be able to speed up that day when all of God's children, black men and white men, Jews and Gentiles, Protestants and Catholics, will be able to join hands and sing in the words of the old Negro spiritual: "Free at last! Free at last! Thank God Almighty, we are free at last!"

HISTORICAL CONTEXT:
This speech was delivered during the March on Washington for Jobs and Freedom, where over 250,000 people gathered to advocate for civil and economic rights for African Americans. It is considered one of the finest speeches in American history and helped galvanize the civil rights movement.`
  },
  {
    id: 6,
    title: 'The Gettysburg Address',
    author: 'Abraham Lincoln',
    type: 'speech',
    level: 'Advanced',
    excerpt: 'A powerful speech about democracy and equality during the American Civil War.',
    fullStory: `THE GETTYSBURG ADDRESS
By Abraham Lincoln
Delivered November 19, 1863, at Gettysburg, Pennsylvania

Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.

Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.

But, in a larger sense, we can not dedicate -- we can not consecrate -- we can not hallow -- this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here.

It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.

HISTORICAL CONTEXT:
Delivered during the Civil War at the dedication of the Soldiers' National Cemetery in Gettysburg, Pennsylvania, this speech redefined the Civil War as a struggle not just for the Union, but as "a new birth of freedom" that would bring true equality to all citizens. Despite being only 272 words and lasting just over two minutes, it is considered one of the greatest speeches in American history. Lincoln's prophecy that "the world will little note, nor long remember what we say here" proved remarkably wrong—the Gettysburg Address is memorized by schoolchildren and remains a defining statement of American national purpose.`
  }
];

const sampleQuestions = [
  'What is the main theme of the text?',
  'Describe the protagonist\'s character development.',
  'Identify and explain three literary devices used.',
  'What is the significance of the title?',
  'How does the setting contribute to the story?',
  'Analyze the author\'s writing style.',
  'What is the climax of the story?',
  'Explain the symbolism in the text.',
  'Compare this work with another by the same author.',
  'What social issues are addressed in the text?'
];

interface LiteratureHubProps {
  language: Language;
}

export function LiteratureHub({ language }: LiteratureHubProps) {
  const [selectedLiterature, setSelectedLiterature] = useState<Literature | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'analysis' | 'speech' | 'presentation'>('analysis');
  const [speechRecording, setSpeechRecording] = useState(false);

  const analyzeAnswer = () => {
    if (!userAnswer.trim()) {
      alert('Please write your answer first!');
      return;
    }

    // Simulate AI analysis
    setTimeout(() => {
      setAiAnalysis(`
🤖 AI Analysis of Your Answer:

✅ Strengths:
• Good understanding of the main theme
• Clear and well-structured response
• Appropriate use of textual evidence

💡 Areas for Improvement:
• Consider exploring deeper symbolic meanings
• Add more specific quotes from the text
• Discuss the historical context

📊 Score: 85/100

Your answer demonstrates strong analytical skills and good comprehension of the literature. 
Focus on providing more detailed textual analysis to reach the highest levels.
      `);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <BookMarked className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">📚 Literature & Novel Study Hub</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI-powered literary analysis and comprehension practice
            </p>
          </div>
        </div>
      </div>

      {/* AI Features */}
      <div className="mb-8 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-semibold text-foreground mb-1">🤖 AI Literature Assistant</p>
            <p className="text-sm text-muted-foreground">
              Our AI analyzes your literary responses, provides detailed feedback on interpretation and analysis,
              and helps you understand complex literary devices, themes, and character development.
            </p>
          </div>
        </div>
      </div>

      {selectedLiterature ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Question and Answer Area */}
          <div className="lg:col-span-2 space-y-6">
            <button
              onClick={() => setSelectedLiterature(null)}
              className="text-primary hover:text-primary/80"
            >
              ← Back to Literature List
            </button>

            {/* Literature Info */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{selectedLiterature.title}</h2>
                  <p className="text-muted-foreground">by {selectedLiterature.author}</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {selectedLiterature.type}
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                    {selectedLiterature.level}
                  </span>
                </div>
              </div>
              <p className="text-foreground italic mb-4">{selectedLiterature.excerpt}</p>
            </div>

            {/* Full Story/Text */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-primary" />
                Complete Text
              </h3>
              <div className="prose prose-sm max-w-none">
                <div className="p-4 bg-muted/30 rounded-lg max-h-[500px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
                    {selectedLiterature.fullStory}
                  </pre>
                </div>
              </div>
            </div>

            {/* Practice Questions */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                AI-Generated Practice Questions
              </h3>
              <div className="space-y-3 mb-6">
                {sampleQuestions.map((question, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <p className="text-foreground">
                      <span className="font-semibold text-primary">{index + 1}.</span> {question}
                    </p>
                  </div>
                ))}
              </div>

              {/* Answer Input */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Your Answer (Choose any question above)
                </label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Write your detailed answer here... AI will provide feedback on your literary analysis."
                  className="w-full h-48 p-4 bg-input-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                />
                <button
                  onClick={analyzeAnswer}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Analyze with AI
                </button>
              </div>
            </div>

            {/* AI Analysis Result */}
            {aiAnalysis && (
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
                <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                  {aiAnalysis}
                </pre>
              </div>
            )}
          </div>

          {/* Literary Devices Guide */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <h3 className="font-bold text-foreground mb-4">📖 Literary Devices</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-foreground">Metaphor</p>
                  <p className="text-muted-foreground">Direct comparison without "like" or "as"</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Simile</p>
                  <p className="text-muted-foreground">Comparison using "like" or "as"</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Personification</p>
                  <p className="text-muted-foreground">Giving human qualities to non-human things</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Symbolism</p>
                  <p className="text-muted-foreground">Using objects to represent ideas</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Foreshadowing</p>
                  <p className="text-muted-foreground">Hints about future events</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Irony</p>
                  <p className="text-muted-foreground">Contrast between expectation and reality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Literature Grid */
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {literatures.map((lit) => (
            <button
              key={lit.id}
              onClick={() => setSelectedLiterature(lit)}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all hover:scale-105 text-left"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <BookMarked className="w-20 h-20 text-primary/40" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {lit.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{lit.author}</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                    {lit.type}
                  </span>
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                    {lit.level}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}