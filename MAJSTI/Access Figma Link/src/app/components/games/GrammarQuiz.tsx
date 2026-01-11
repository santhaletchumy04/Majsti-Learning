import { useState } from 'react';
import { ArrowLeft, Check, X, BookOpen, Trophy } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  chapter: string;
}

// Comprehensive 14-chapter grammar question bank (10+ questions each)
const grammarQuestions: Question[] = [
  // CHAPTER 1: ARTICLES (10 questions)
  { question: "I need ___ umbrella because it's raining.", options: ['a', 'an', 'the', 'no article'], correctAnswer: 1, explanation: '"An" is used before words starting with a vowel sound.', chapter: 'Articles' },
  { question: '___ sun rises in the east.', options: ['A', 'An', 'The', 'No article'], correctAnswer: 2, explanation: '"The" is used for unique objects.', chapter: 'Articles' },
  { question: 'She is ___ honest girl.', options: ['a', 'an', 'the', 'no article'], correctAnswer: 1, explanation: '"An" is used before "honest" because "h" is silent.', chapter: 'Articles' },
  { question: 'I saw ___ cat in the garden.', options: ['a', 'an', 'the', 'no article'], correctAnswer: 0, explanation: '"A" is used for singular countable nouns mentioned for the first time.', chapter: 'Articles' },
  { question: 'He is ___ best player on the team.', options: ['a', 'an', 'the', 'no article'], correctAnswer: 2, explanation: '"The" is used with superlatives.', chapter: 'Articles' },
  { question: '___ wisdom is better than strength.', options: ['A', 'An', 'The', 'No article'], correctAnswer: 3, explanation: 'No article is used with abstract nouns in general sense.', chapter: 'Articles' },
  { question: 'I go to ___ school every day.', options: ['a', 'an', 'the', 'no article'], correctAnswer: 3, explanation: 'No article when referring to the purpose of an institution.', chapter: 'Articles' },
  { question: 'She plays ___ piano beautifully.', options: ['a', 'an', 'the', 'no article'], correctAnswer: 2, explanation: '"The" is used before musical instruments.', chapter: 'Articles' },
  { question: '___ Mount Everest is the highest mountain.', options: ['A', 'An', 'The', 'No article'], correctAnswer: 3, explanation: 'No article with proper nouns of mountains.', chapter: 'Articles' },
  { question: 'We had ___ dinner at 8 PM.', options: ['a', 'an', 'the', 'no article'], correctAnswer: 3, explanation: 'No article with meals unless specific.', chapter: 'Articles' },

  // CHAPTER 2: NOUNS (12 questions)
  { question: 'What type of noun is "London"?', options: ['Common noun', 'Proper noun', 'Abstract noun', 'Collective noun'], correctAnswer: 1, explanation: 'Proper nouns name specific persons, places, or things.', chapter: 'Nouns' },
  { question: 'Which is a collective noun?', options: ['Dog', 'Team', 'Happiness', 'School'], correctAnswer: 1, explanation: 'Collective nouns refer to groups.', chapter: 'Nouns' },
  { question: 'What is the plural of "child"?', options: ['Childs', 'Childes', 'Children', 'Childrens'], correctAnswer: 2, explanation: '"Children" is the irregular plural form.', chapter: 'Nouns' },
  { question: '"Love" is an example of:', options: ['Concrete noun', 'Abstract noun', 'Proper noun', 'Collective noun'], correctAnswer: 1, explanation: 'Abstract nouns name ideas, qualities, or emotions.', chapter: 'Nouns' },
  { question: 'What is the plural of "tooth"?', options: ['Tooths', 'Toothes', 'Teeth', 'Teeths'], correctAnswer: 2, explanation: '"Teeth" is the irregular plural form.', chapter: 'Nouns' },
  { question: 'Which noun is countable?', options: ['Water', 'Book', 'Air', 'Rice'], correctAnswer: 1, explanation: 'Countable nouns can be counted (one book, two books).', chapter: 'Nouns' },
  { question: 'What is the possessive form of "James"?', options: ["James'", "James's", "Jameses", "James"], correctAnswer: 1, explanation: "For singular nouns ending in s, add 's.", chapter: 'Nouns' },
  { question: '"Furniture" is:', options: ['Countable', 'Uncountable', 'Both', 'Neither'], correctAnswer: 1, explanation: 'Furniture is an uncountable noun.', chapter: 'Nouns' },
  { question: 'What is the plural of "sheep"?', options: ['Sheeps', 'Sheepes', 'Sheep', 'Sheepen'], correctAnswer: 2, explanation: '"Sheep" remains the same in plural form.', chapter: 'Nouns' },
  { question: 'Which is a material noun?', options: ['Gold', 'Book', 'Teacher', 'Kindness'], correctAnswer: 0, explanation: 'Material nouns are substances.', chapter: 'Nouns' },
  { question: 'The noun "scissors" is:', options: ['Singular', 'Plural', 'Both', 'Abstract'], correctAnswer: 1, explanation: '"Scissors" is always plural.', chapter: 'Nouns' },
  { question: 'What is the abstract noun form of "brave"?', options: ['Braveness', 'Bravity', 'Bravery', 'Bravely'], correctAnswer: 2, explanation: '"Bravery" is the abstract noun.', chapter: 'Nouns' },

  // CHAPTER 3: VERBS (12 questions)
  { question: 'She ___ to school every day.', options: ['go', 'goes', 'going', 'gone'], correctAnswer: 1, explanation: 'Third person singular present takes -s/-es.', chapter: 'Verbs' },
  { question: 'They ___ playing football now.', options: ['is', 'am', 'are', 'be'], correctAnswer: 2, explanation: '"They" takes "are" as helping verb.', chapter: 'Verbs' },
  { question: 'What is the past tense of "eat"?', options: ['Eated', 'Ate', 'Eaten', 'Eating'], correctAnswer: 1, explanation: '"Ate" is the simple past form.', chapter: 'Verbs' },
  { question: 'I ___ finished my homework.', options: ['has', 'have', 'had', 'having'], correctAnswer: 1, explanation: '"I" takes "have" in present perfect.', chapter: 'Verbs' },
  { question: 'Which is an action verb?', options: ['is', 'run', 'seem', 'appear'], correctAnswer: 1, explanation: 'Action verbs show physical or mental action.', chapter: 'Verbs' },
  { question: 'She ___ a doctor.', options: ['are', 'is', 'am', 'be'], correctAnswer: 1, explanation: '"She" takes "is" as linking verb.', chapter: 'Verbs' },
  { question: 'What is the past participle of "write"?', options: ['Wrote', 'Written', 'Writing', 'Writes'], correctAnswer: 1, explanation: '"Written" is the past participle form.', chapter: 'Verbs' },
  { question: 'They ___ to the park yesterday.', options: ['go', 'goes', 'went', 'gone'], correctAnswer: 2, explanation: '"Went" is the simple past form of "go".', chapter: 'Verbs' },
  { question: 'Which is a helping verb?', options: ['Play', 'Jump', 'Will', 'Write'], correctAnswer: 2, explanation: '"Will" is an auxiliary/helping verb.', chapter: 'Verbs' },
  { question: 'He ___ been studying for hours.', options: ['has', 'have', 'had', 'having'], correctAnswer: 0, explanation: '"He" takes "has" in present perfect continuous.', chapter: 'Verbs' },
  { question: 'What type of verb is "seem"?', options: ['Action', 'Linking', 'Helping', 'Modal'], correctAnswer: 1, explanation: '"Seem" is a linking verb.', chapter: 'Verbs' },
  { question: 'I ___ a new car last week.', options: ['buy', 'buys', 'bought', 'buying'], correctAnswer: 2, explanation: '"Bought" is the past tense of "buy".', chapter: 'Verbs' },

  // CHAPTER 4: TENSES (15 questions)
  { question: 'She ___ to school every day. (Simple Present)', options: ['go', 'goes', 'is going', 'went'], correctAnswer: 1, explanation: 'Simple present for regular actions.', chapter: 'Tenses' },
  { question: 'They ___ playing now. (Present Continuous)', options: ['is', 'are', 'was', 'were'], correctAnswer: 1, explanation: 'Present continuous for ongoing actions.', chapter: 'Tenses' },
  { question: 'I ___ this book. (Present Perfect)', options: ['read', 'am reading', 'have read', 'had read'], correctAnswer: 2, explanation: 'Present perfect: have/has + past participle.', chapter: 'Tenses' },
  { question: 'He ___ there yesterday. (Simple Past)', options: ['go', 'went', 'has gone', 'had gone'], correctAnswer: 1, explanation: 'Simple past for completed actions.', chapter: 'Tenses' },
  { question: 'She ___ cooking when I called. (Past Continuous)', options: ['is', 'was', 'has been', 'had been'], correctAnswer: 1, explanation: 'Past continuous for ongoing past actions.', chapter: 'Tenses' },
  { question: 'They ___ before I arrived. (Past Perfect)', options: ['left', 'have left', 'had left', 'were leaving'], correctAnswer: 2, explanation: 'Past perfect: had + past participle.', chapter: 'Tenses' },
  { question: 'I ___ go tomorrow. (Simple Future)', options: ['go', 'went', 'will go', 'have gone'], correctAnswer: 2, explanation: 'Simple future: will + base form.', chapter: 'Tenses' },
  { question: 'She ___ for two hours. (Present Perfect Continuous)', options: ['studies', 'is studying', 'has been studying', 'had been studying'], correctAnswer: 2, explanation: 'Present perfect continuous: have/has been + -ing.', chapter: 'Tenses' },
  { question: 'We ___ here since 2010. (Present Perfect)', options: ['live', 'are living', 'have lived', 'had lived'], correctAnswer: 2, explanation: 'Present perfect with "since".', chapter: 'Tenses' },
  { question: 'He ___ the work by tomorrow. (Future Perfect)', options: ['will finish', 'will be finishing', 'will have finished', 'has finished'], correctAnswer: 2, explanation: 'Future perfect: will have + past participle.', chapter: 'Tenses' },
  { question: 'I ___ at 6 AM every day.', options: ['wake up', 'woke up', 'have woken up', 'will wake up'], correctAnswer: 0, explanation: 'Simple present for habitual actions.', chapter: 'Tenses' },
  { question: 'They ___ for three hours yesterday. (Past Perfect Continuous)', options: ['waited', 'were waiting', 'had been waiting', 'have been waiting'], correctAnswer: 2, explanation: 'Past perfect continuous: had been + -ing.', chapter: 'Tenses' },
  { question: 'She ___ tomorrow at this time. (Future Continuous)', options: ['will work', 'will be working', 'will have worked', 'works'], correctAnswer: 1, explanation: 'Future continuous: will be + -ing.', chapter: 'Tenses' },
  { question: 'By next year, I ___ here for 5 years.', options: ['will work', 'will be working', 'will have worked', 'will have been working'], correctAnswer: 3, explanation: 'Future perfect continuous.', chapter: 'Tenses' },
  { question: 'Water ___ at 100°C. (Simple Present for facts)', options: ['boil', 'boils', 'is boiling', 'boiled'], correctAnswer: 1, explanation: 'Simple present for universal truths.', chapter: 'Tenses' },

  // CHAPTER 5: DEMONSTRATIVE (10 questions)
  { question: '___ book is mine.', options: ['This', 'These', 'Those', 'That'], correctAnswer: 0, explanation: '"This" for singular, near objects.', chapter: 'Demonstrative' },
  { question: '___ are my friends.', options: ['This', 'That', 'These', 'Those'], correctAnswer: 2, explanation: '"These" for plural, near objects.', chapter: 'Demonstrative' },
  { question: '___ house over there is beautiful.', options: ['This', 'These', 'That', 'Those'], correctAnswer: 2, explanation: '"That" for singular, far objects.', chapter: 'Demonstrative' },
  { question: '___ were difficult questions.', options: ['This', 'That', 'These', 'Those'], correctAnswer: 3, explanation: '"Those" for plural, far objects.', chapter: 'Demonstrative' },
  { question: '___ is my pen.', options: ['This', 'These', 'Those', 'That'], correctAnswer: 0, explanation: '"This" for near singular objects.', chapter: 'Demonstrative' },
  { question: 'Look at ___ birds in the tree!', options: ['this', 'that', 'these', 'those'], correctAnswer: 3, explanation: '"Those" for plural far objects.', chapter: 'Demonstrative' },
  { question: '___ pencil is broken.', options: ['This', 'These', 'Those', 'That'], correctAnswer: 0, explanation: '"This" for near singular objects.', chapter: 'Demonstrative' },
  { question: 'I prefer ___ shoes to those.', options: ['this', 'that', 'these', 'those'], correctAnswer: 2, explanation: '"These" for near plural objects.', chapter: 'Demonstrative' },
  { question: '___ was a great movie.', options: ['This', 'These', 'Those', 'That'], correctAnswer: 3, explanation: '"That" can refer to past events.', chapter: 'Demonstrative' },
  { question: '___ flowers are fragrant.', options: ['This', 'That', 'These', 'Those'], correctAnswer: 2, explanation: '"These" for near plural objects.', chapter: 'Demonstrative' },

  // CHAPTER 6: PREPOSITIONS (12 questions)
  { question: 'The cat is ___ the table.', options: ['in', 'on', 'at', 'by'], correctAnswer: 1, explanation: '"On" for surfaces.', chapter: 'Prepositions' },
  { question: 'She lives ___ New York.', options: ['in', 'on', 'at', 'by'], correctAnswer: 0, explanation: '"In" for cities and countries.', chapter: 'Prepositions' },
  { question: 'I wake up ___ 6 AM.', options: ['in', 'on', 'at', 'by'], correctAnswer: 2, explanation: '"At" for specific times.', chapter: 'Prepositions' },
  { question: 'He was born ___ 1990.', options: ['in', 'on', 'at', 'by'], correctAnswer: 0, explanation: '"In" for years.', chapter: 'Prepositions' },
  { question: 'The meeting is ___ Monday.', options: ['in', 'on', 'at', 'by'], correctAnswer: 1, explanation: '"On" for days.', chapter: 'Prepositions' },
  { question: 'She is good ___ mathematics.', options: ['in', 'on', 'at', 'with'], correctAnswer: 2, explanation: '"At" used with "good".', chapter: 'Prepositions' },
  { question: 'The book is ___ the shelf.', options: ['in', 'on', 'at', 'by'], correctAnswer: 1, explanation: '"On" for flat surfaces.', chapter: 'Prepositions' },
  { question: 'I am waiting ___ you.', options: ['for', 'to', 'at', 'with'], correctAnswer: 0, explanation: '"For" used with "waiting".', chapter: 'Prepositions' },
  { question: 'He jumped ___ the pool.', options: ['in', 'into', 'on', 'at'], correctAnswer: 1, explanation: '"Into" shows movement inside.', chapter: 'Prepositions' },
  { question: 'She walked ___ the park.', options: ['through', 'in', 'at', 'on'], correctAnswer: 0, explanation: '"Through" for passing across.', chapter: 'Prepositions' },
  { question: 'The plane flies ___ the clouds.', options: ['above', 'on', 'in', 'at'], correctAnswer: 0, explanation: '"Above" for higher position.', chapter: 'Prepositions' },
  { question: 'He sat ___ me.', options: ['beside', 'in', 'on', 'at'], correctAnswer: 0, explanation: '"Beside" means next to.', chapter: 'Prepositions' },

  // CHAPTER 7: SENTENCE STRUCTURE (10 questions)
  { question: 'Which is a simple sentence?', options: ['I eat apples and oranges.', "I eat apples, but I don't like oranges.", 'Although I eat apples, I prefer oranges.', 'I eat apples because they are healthy.'], correctAnswer: 0, explanation: 'Simple sentence has one independent clause.', chapter: 'Sentence Structure' },
  { question: 'Identify the subject: "The dog barks."', options: ['The', 'dog', 'barks', 'The dog'], correctAnswer: 1, explanation: 'The subject performs the action.', chapter: 'Sentence Structure' },
  { question: 'What type: "Stop talking!" ?', options: ['Declarative', 'Interrogative', 'Imperative', 'Exclamatory'], correctAnswer: 2, explanation: 'Imperative sentences give commands.', chapter: 'Sentence Structure' },
  { question: 'Which is a compound sentence?', options: ['I like tea.', 'I like tea, and she likes coffee.', 'Although I like tea.', 'I like tea very much.'], correctAnswer: 1, explanation: 'Compound sentences have two independent clauses.', chapter: 'Sentence Structure' },
  { question: 'Identify the predicate: "She sings beautifully."', options: ['She', 'sings', 'beautifully', 'sings beautifully'], correctAnswer: 3, explanation: 'Predicate includes verb and complements.', chapter: 'Sentence Structure' },
  { question: 'What type: "What a beautiful day!"?', options: ['Declarative', 'Interrogative', 'Imperative', 'Exclamatory'], correctAnswer: 3, explanation: 'Exclamatory sentences express strong emotion.', chapter: 'Sentence Structure' },
  { question: 'Which is correct word order?', options: ['Always she goes', 'She always goes', 'She goes always', 'Goes she always'], correctAnswer: 1, explanation: 'Adverbs of frequency come before main verbs.', chapter: 'Sentence Structure' },
  { question: 'What is the object: "I read books."?', options: ['I', 'read', 'books', 'I read'], correctAnswer: 2, explanation: 'Object receives the action.', chapter: 'Sentence Structure' },
  { question: 'Which is a complex sentence?', options: ['I eat and sleep.', 'I eat.', 'I eat when I am hungry.', "I eat, but I don't sleep."], correctAnswer: 2, explanation: 'Complex sentences have dependent clause.', chapter: 'Sentence Structure' },
  { question: 'Identify sentence type: "Where are you going?"', options: ['Declarative', 'Interrogative', 'Imperative', 'Exclamatory'], correctAnswer: 1, explanation: 'Interrogative sentences ask questions.', chapter: 'Sentence Structure' },

  // CHAPTER 8: ADJECTIVES (12 questions)
  { question: 'She is a ___ girl.', options: ['beautiful', 'beautifully', 'beauty', 'beautify'], correctAnswer: 0, explanation: 'Adjectives describe nouns.', chapter: 'Adjectives' },
  { question: 'This is ___ than that.', options: ['good', 'better', 'best', 'well'], correctAnswer: 1, explanation: '"Better" is the comparative form.', chapter: 'Adjectives' },
  { question: 'He is the ___ student.', options: ['intelligent', 'more intelligent', 'most intelligent', 'intelligently'], correctAnswer: 2, explanation: 'Superlative with "most" for long adjectives.', chapter: 'Adjectives' },
  { question: 'She has ___ friends.', options: ['much', 'many', 'more', 'most'], correctAnswer: 1, explanation: '"Many" for countable nouns.', chapter: 'Adjectives' },
  { question: 'There is ___ water in the glass.', options: ['few', 'little', 'many', 'several'], correctAnswer: 1, explanation: '"Little" for uncountable nouns.', chapter: 'Adjectives' },
  { question: 'He is ___ taller than me.', options: ['very', 'much', 'more', 'most'], correctAnswer: 1, explanation: '"Much" intensifies comparatives.', chapter: 'Adjectives' },
  { question: "This is ___ book I've read.", options: ['good', 'better', 'the best', 'best'], correctAnswer: 2, explanation: 'Superlative with "the".', chapter: 'Adjectives' },
  { question: '___ children are playing.', options: ['This', 'These', 'That', 'Those'], correctAnswer: 1, explanation: 'Demonstrative adjective for near plural.', chapter: 'Adjectives' },
  { question: 'He bought ___ apples.', options: ['a few', 'a little', 'much', 'less'], correctAnswer: 0, explanation: '"A few" for countable positive meaning.', chapter: 'Adjectives' },
  { question: 'She is as ___ as her sister.', options: ['tall', 'taller', 'tallest', 'more tall'], correctAnswer: 0, explanation: 'Positive degree in "as...as".', chapter: 'Adjectives' },
  { question: 'Mount Everest is ___ mountain.', options: ['high', 'higher', 'highest', 'the highest'], correctAnswer: 3, explanation: 'Superlative with article.', chapter: 'Adjectives' },
  { question: 'I have ___ time today.', options: ['few', 'little', 'less', 'least'], correctAnswer: 1, explanation: '"Little" for uncountable nouns.', chapter: 'Adjectives' },

  // CHAPTER 9: PERSONAL PRONOUNS (10 questions)
  { question: '___ am a student.', options: ['I', 'Me', 'My', 'Mine'], correctAnswer: 0, explanation: '"I" is the subject pronoun.', chapter: 'Personal Pronouns' },
  { question: 'This book belongs to ___.', options: ['I', 'me', 'my', 'mine'], correctAnswer: 1, explanation: '"Me" is the object pronoun.', chapter: 'Personal Pronouns' },
  { question: '___ are my friends.', options: ['They', 'Them', 'Their', 'Theirs'], correctAnswer: 0, explanation: '"They" is the subject pronoun.', chapter: 'Personal Pronouns' },
  { question: 'I gave ___ a gift.', options: ['he', 'him', 'his', "he's"], correctAnswer: 1, explanation: '"Him" is the object pronoun.', chapter: 'Personal Pronouns' },
  { question: 'This is ___ book.', options: ['I', 'me', 'my', 'mine'], correctAnswer: 2, explanation: '"My" is the possessive adjective.', chapter: 'Personal Pronouns' },
  { question: 'The book is ___.', options: ['I', 'me', 'my', 'mine'], correctAnswer: 3, explanation: '"Mine" is the possessive pronoun.', chapter: 'Personal Pronouns' },
  { question: '___ is raining.', options: ['It', 'Its', "It's", 'He'], correctAnswer: 0, explanation: '"It" for weather.', chapter: 'Personal Pronouns' },
  { question: 'Between you and ___.', options: ['I', 'me', 'my', 'myself'], correctAnswer: 1, explanation: 'Object pronoun after preposition.', chapter: 'Personal Pronouns' },
  { question: '___ did it myself.', options: ['I', 'Me', 'My', 'Mine'], correctAnswer: 0, explanation: 'Subject pronoun before verb.', chapter: 'Personal Pronouns' },
  { question: 'He hurt ___.', options: ['him', 'himself', 'his', 'he'], correctAnswer: 1, explanation: 'Reflexive pronoun when subject and object are same.', chapter: 'Personal Pronouns' },

  // CHAPTER 10: ADVERBS (10 questions)
  { question: 'She sings ___.', options: ['beautiful', 'beautifully', 'beauty', 'beautify'], correctAnswer: 1, explanation: 'Adverbs modify verbs.', chapter: 'Adverbs' },
  { question: 'He runs ___ than me.', options: ['fast', 'faster', 'fastest', 'fastly'], correctAnswer: 1, explanation: 'Comparative adverb.', chapter: 'Adverbs' },
  { question: 'She ___ goes to school.', options: ['always', 'never', 'often', 'usually'], correctAnswer: 0, explanation: 'Adverb of frequency.', chapter: 'Adverbs' },
  { question: 'I ___ finished my work.', options: ['just', 'very', 'too', 'much'], correctAnswer: 0, explanation: '"Just" is adverb of time.', chapter: 'Adverbs' },
  { question: 'He works ___.', options: ['hard', 'hardly', 'harder', 'hardest'], correctAnswer: 0, explanation: '"Hard" as adverb means with effort.', chapter: 'Adverbs' },
  { question: 'She can ___ speak English.', options: ['hard', 'hardly', 'harder', 'hardest'], correctAnswer: 1, explanation: '"Hardly" means almost not.', chapter: 'Adverbs' },
  { question: 'Come ___.', options: ['here', 'hear', 'hare', 'hair'], correctAnswer: 0, explanation: '"Here" is adverb of place.', chapter: 'Adverbs' },
  { question: 'She is ___ intelligent.', options: ['very', 'much', 'more', 'most'], correctAnswer: 0, explanation: '"Very" intensifies adjectives.', chapter: 'Adverbs' },
  { question: 'He drives ___.', options: ['careful', 'carefully', 'care', 'cares'], correctAnswer: 1, explanation: 'Adverb modifies verb.', chapter: 'Adverbs' },
  { question: 'I have ___ seen this movie.', options: ['already', 'yet', 'still', 'always'], correctAnswer: 0, explanation: '"Already" for completed actions.', chapter: 'Adverbs' },

  // CHAPTER 11: CONJUNCTIONS (10 questions)
  { question: 'I like tea ___ coffee.', options: ['and', 'but', 'or', 'because'], correctAnswer: 0, explanation: '"And" connects similar ideas.', chapter: 'Conjunctions' },
  { question: 'She is smart ___ lazy.', options: ['and', 'but', 'or', 'so'], correctAnswer: 1, explanation: '"But" shows contrast.', chapter: 'Conjunctions' },
  { question: 'Would you like tea ___ coffee?', options: ['and', 'but', 'or', 'so'], correctAnswer: 2, explanation: '"Or" gives choice.', chapter: 'Conjunctions' },
  { question: 'I stayed home ___ I was sick.', options: ['and', 'but', 'or', 'because'], correctAnswer: 3, explanation: '"Because" shows reason.', chapter: 'Conjunctions' },
  { question: 'It was raining, ___ we stayed inside.', options: ['and', 'but', 'or', 'so'], correctAnswer: 3, explanation: '"So" shows result.', chapter: 'Conjunctions' },
  { question: '___ you work hard, you will succeed.', options: ['If', 'Unless', 'Because', 'So'], correctAnswer: 0, explanation: '"If" introduces condition.', chapter: 'Conjunctions' },
  { question: 'I will go ___ it rains.', options: ['if', 'unless', 'because', 'so'], correctAnswer: 1, explanation: '"Unless" means if not.', chapter: 'Conjunctions' },
  { question: 'She is not only smart ___ also kind.', options: ['and', 'but', 'or', 'so'], correctAnswer: 1, explanation: 'Correlative conjunction pair.', chapter: 'Conjunctions' },
  { question: '___ I was tired, I continued working.', options: ['Because', 'Although', 'If', 'So'], correctAnswer: 1, explanation: '"Although" shows contrast.', chapter: 'Conjunctions' },
  { question: 'Neither tea ___ coffee is available.', options: ['and', 'or', 'nor', 'but'], correctAnswer: 2, explanation: '"Nor" pairs with "neither".', chapter: 'Conjunctions' },

  // CHAPTER 12: INTERJECTIONS (10 questions)
  { question: '___! That hurts!', options: ['Ouch', 'Wow', 'Hurray', 'Hello'], correctAnswer: 0, explanation: '"Ouch" expresses pain.', chapter: 'Interjections' },
  { question: '___! I won the prize!', options: ['Ouch', 'Wow', 'Alas', 'Oops'], correctAnswer: 1, explanation: '"Wow" expresses surprise/joy.', chapter: 'Interjections' },
  { question: '___! I dropped the plate.', options: ['Hurray', 'Wow', 'Oops', 'Bravo'], correctAnswer: 2, explanation: '"Oops" expresses mistake.', chapter: 'Interjections' },
  { question: '___! Be quiet!', options: ['Hurray', 'Shh', 'Wow', 'Hello'], correctAnswer: 1, explanation: '"Shh" signals silence.', chapter: 'Interjections' },
  { question: '___! We won the match!', options: ['Alas', 'Oops', 'Hurray', 'Oh no'], correctAnswer: 2, explanation: '"Hurray" expresses joy.', chapter: 'Interjections' },
  { question: '___! He failed the exam.', options: ['Hurray', 'Wow', 'Alas', 'Yay'], correctAnswer: 2, explanation: '"Alas" expresses sorrow.', chapter: 'Interjections' },
  { question: '___! What a performance!', options: ['Oops', 'Bravo', 'Ouch', 'Shh'], correctAnswer: 1, explanation: '"Bravo" expresses appreciation.', chapter: 'Interjections' },
  { question: '___! I forgot my keys!', options: ['Hurray', 'Wow', 'Oh no', 'Bravo'], correctAnswer: 2, explanation: '"Oh no" expresses concern.', chapter: 'Interjections' },
  { question: '___, can you help me?', options: ['Wow', 'Hey', 'Alas', 'Ouch'], correctAnswer: 1, explanation: '"Hey" gets attention.', chapter: 'Interjections' },
  { question: '___! I finally understand!', options: ['Oops', 'Aha', 'Alas', 'Ouch'], correctAnswer: 1, explanation: '"Aha" expresses realization.', chapter: 'Interjections' },

  // CHAPTER 13: PUNCTUATION (10 questions)
  { question: 'Which needs a question mark?', options: ['Stop it', 'What is your name', 'I am fine', 'What a day'], correctAnswer: 1, explanation: 'Questions end with "?".', chapter: 'Punctuation' },
  { question: 'I like apples___ oranges___ and bananas.', options: [', ;', '; ,', ', ,', '. .'], correctAnswer: 2, explanation: 'Commas separate items in a list.', chapter: 'Punctuation' },
  { question: 'She said___ "I am happy"', options: ['.', ',', ':', ';'], correctAnswer: 1, explanation: 'Comma before direct speech.', chapter: 'Punctuation' },
  { question: 'Which is correct?', options: ['Its raining', "It's raining", "Its' raining", "It' s raining"], correctAnswer: 1, explanation: 'Apostrophe in contractions.', chapter: 'Punctuation' },
  { question: 'John___ Mary and Sarah went home.', options: [',', '.', ':', ';'], correctAnswer: 0, explanation: 'Comma separates names.', chapter: 'Punctuation' },
  { question: 'Which needs an exclamation mark?', options: ['Where are you', 'I am here', 'What a beautiful day', 'She is tall'], correctAnswer: 2, explanation: 'Exclamations show strong feeling.', chapter: 'Punctuation' },
  { question: 'Which is correct?', options: ['The dogs bone', "The dog's bone", "The dogs' bone", 'The dog bone'], correctAnswer: 1, explanation: 'Apostrophe for possession.', chapter: 'Punctuation' },
  { question: 'I need___ bread, milk, and eggs.', options: [':', ';', ',', '.'], correctAnswer: 0, explanation: 'Colon introduces list.', chapter: 'Punctuation' },
  { question: 'She is smart___ she works hard.', options: [',', ';', ':', '.'], correctAnswer: 1, explanation: 'Semicolon joins related clauses.', chapter: 'Punctuation' },
  { question: 'Which needs a period?', options: ['What time is it', 'I am tired', 'Stop talking', 'What a mess'], correctAnswer: 1, explanation: 'Statements end with period.', chapter: 'Punctuation' },

  // CHAPTER 14: COMPOUND WORDS (10 questions)
  { question: 'Which is a compound word?', options: ['Beautiful', 'Rainbow', 'Happy', 'Running'], correctAnswer: 1, explanation: '"Rainbow" = rain + bow.', chapter: 'Compound Words' },
  { question: 'What is the compound: sun + flower?', options: ['Sunflower', 'Sun flower', 'Sunflowers', 'Flowersun'], correctAnswer: 0, explanation: 'Compound words join two words.', chapter: 'Compound Words' },
  { question: 'Which is compound?', options: ['Classroom', 'Student', 'Teacher', 'Book'], correctAnswer: 0, explanation: '"Classroom" = class + room.', chapter: 'Compound Words' },
  { question: 'tooth + brush = ?', options: ['Toothbrush', 'Tooth brush', 'Brushes tooth', 'Teeth brush'], correctAnswer: 0, explanation: 'Closed compound word.', chapter: 'Compound Words' },
  { question: 'Which is NOT compound?', options: ['Football', 'Basketball', 'Swimming', 'Baseball'], correctAnswer: 2, explanation: '"Swimming" is single word.', chapter: 'Compound Words' },
  { question: 'book + shelf = ?', options: ['Bookshelf', 'Book shelf', 'Shelf book', 'Books'], correctAnswer: 0, explanation: 'Closed compound.', chapter: 'Compound Words' },
  { question: 'Which is a compound?', options: ['Running', 'Bedroom', 'Happy', 'Teacher'], correctAnswer: 1, explanation: '"Bedroom" = bed + room.', chapter: 'Compound Words' },
  { question: 'sun + shine = ?', options: ['Sunshine', 'Sun shine', 'Shining sun', 'Sunshines'], correctAnswer: 0, explanation: 'Closed compound word.', chapter: 'Compound Words' },
  { question: 'Which is compound?', options: ['Butterfly', 'Flower', 'Garden', 'Tree'], correctAnswer: 0, explanation: '"Butterfly" = butter + fly.', chapter: 'Compound Words' },
  { question: 'rain + coat = ?', options: ['Raincoat', 'Rain coat', 'Coatrain', 'Rains'], correctAnswer: 0, explanation: 'Closed compound word.', chapter: 'Compound Words' }
];

interface GrammarQuizProps {
  onBack: () => void;
  onScoreUpdate: (score: number) => void;
}

export function GrammarQuiz({ onBack, onScoreUpdate }: GrammarQuizProps) {
  const [selectedChapter, setSelectedChapter] = useState<string>('All');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [viewMode, setViewMode] = useState<'chapterSelect' | 'quiz'>('chapterSelect');

  const chapters = [
    'Articles', 'Nouns', 'Verbs', 'Tenses', 'Demonstrative',
    'Prepositions', 'Sentence Structure', 'Adjectives', 'Personal Pronouns',
    'Adverbs', 'Conjunctions', 'Interjections', 'Punctuation', 'Compound Words'
  ];

  const filteredQuestions = selectedChapter === 'All'
    ? grammarQuestions
    : grammarQuestions.filter(q => q.chapter === selectedChapter);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const startQuiz = (chapter: string) => {
    setSelectedChapter(chapter);
    setViewMode('quiz');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    const questionsCount = chapter === 'All' ? grammarQuestions.length : grammarQuestions.filter(q => q.chapter === chapter).length;
    setAnsweredQuestions(Array(questionsCount).fill(false));
  };

  const handleAnswerClick = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      const points = 10;
      setScore(prev => prev + points);
      onScoreUpdate(points);
    }
    
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
  const isGameComplete = answeredQuestions.every(a => a);

  if (viewMode === 'chapterSelect') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Games
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">📚 Grammar Mastery Quiz</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master all 14 fundamental grammar chapters with 140+ comprehensive questions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter, index) => {
            const chapterQuestions = grammarQuestions.filter(q => q.chapter === chapter);
            return (
              <button
                key={chapter}
                onClick={() => startQuiz(chapter)}
                className="group bg-card rounded-xl border-2 border-border hover:border-primary p-6 transition-all hover:shadow-xl hover:scale-105 text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">📖</div>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    Ch. {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {chapter}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {chapterQuestions.length} questions • 10 points each
                </p>
                <div className="flex items-center gap-2 text-sm text-accent">
                  <Trophy className="w-4 h-4" />
                  <span>Max: {chapterQuestions.length * 10} points</span>
                </div>
              </button>
            );
          })}

          {/* Practice All Button */}
          <button
            onClick={() => startQuiz('All')}
            className="group bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl border-2 border-primary p-6 transition-all hover:shadow-xl hover:scale-105 text-left"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">🎯</div>
              <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                All
              </span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              Practice All Chapters
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {grammarQuestions.length} questions • Complete mastery test
            </p>
            <div className="flex items-center gap-2 text-sm text-primary font-semibold">
              <Trophy className="w-4 h-4" />
              <span>Max: {grammarQuestions.length * 10} points</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Quiz Mode
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => setViewMode('chapterSelect')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Chapters
        </button>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{selectedChapter} Quiz</h1>
            <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {filteredQuestions.length}</p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{score}</div>
            <div className="text-sm text-muted-foreground">Points</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Game Complete */}
      {isGameComplete && (
        <div className="mb-6 p-6 bg-primary/10 border border-primary/20 rounded-xl">
          <h2 className="text-2xl font-bold text-primary mb-2">🎉 Chapter Complete!</h2>
          <p className="text-foreground mb-4">Excellent work on completing this chapter!</p>
          <div className="flex gap-6">
            <div>
              <div className="text-2xl font-bold text-primary">{score}</div>
              <div className="text-sm text-muted-foreground">Total Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">
                {Math.round((score / (filteredQuestions.length * 10)) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </div>
      )}

      {/* Question Card */}
      {currentQuestion && (
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold">
              {currentQuestion.chapter}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-6">{currentQuestion.question}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === currentQuestion.correctAnswer;
              const showAsCorrect = showExplanation && isCorrectOption;
              const showAsWrong = showExplanation && isSelected && !isCorrect;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-lg text-left transition-all flex items-center justify-between ${
                    showAsCorrect
                      ? 'bg-green-100 text-green-800 border-2 border-green-300'
                      : showAsWrong
                      ? 'bg-red-100 text-red-800 border-2 border-red-300'
                      : isSelected
                      ? 'bg-primary text-primary-foreground border-2 border-primary'
                      : 'bg-muted border-2 border-border hover:border-primary hover:bg-primary/5'
                  } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <span className="font-medium">{option}</span>
                  {showAsCorrect && <Check className="w-5 h-5" />}
                  {showAsWrong && <X className="w-5 h-5" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`mt-6 p-4 rounded-lg ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <div className="flex items-center gap-2 font-semibold mb-2">
                {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                {isCorrect ? 'Correct! +10 points' : 'Incorrect'}
              </div>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {!showExplanation ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        ) : currentQuestionIndex < filteredQuestions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Next Question
          </button>
        ) : (
          <button
            onClick={() => setViewMode('chapterSelect')}
            className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
          >
            Back to Chapters
          </button>
        )}
      </div>
    </div>
  );
}
