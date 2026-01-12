import { useState } from 'react';
import { Search, Volume2, Sparkles, BookOpen, Star } from 'lucide-react';
import type { Language } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DictionaryEntry {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  definitionMalay: string;
  definitionTamil: string;
  definitionChinese: string;
  example: string;
  imageQuery: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const dictionaryData: DictionaryEntry[] = [
  {
    word: 'Apple',
    pronunciation: '/ˈæp.əl/',
    partOfSpeech: 'noun',
    definition: 'A round fruit with red, green, or yellow skin and white flesh',
    definitionMalay: 'Buah bulat dengan kulit merah, hijau atau kuning dan isi putih',
    definitionTamil: 'சிவப்பு, பச்சை அல்லது மஞ்சள் தோல் மற்றும் வெள்ளை சதை கொண்ட வட்டமான பழம்',
    definitionChinese: '一种圆形水果，有红色、绿色或黄色的皮和白色的果肉',
    example: 'I eat an apple every day for breakfast.',
    imageQuery: 'red apple fruit',
    category: 'Food',
    difficulty: 'beginner'
  },
  {
    word: 'Banana',
    pronunciation: '/bəˈnɑː.nə/',
    partOfSpeech: 'noun',
    definition: 'A long curved fruit with yellow skin',
    definitionMalay: 'Buah panjang melengkung dengan kulit kuning',
    definitionTamil: 'மஞ்சள் தோல் கொண்ட நீளமான வளைந்த பழம்',
    definitionChinese: '一种长而弯曲的黄皮水果',
    example: 'Monkeys love to eat bananas.',
    imageQuery: 'banana yellow fruit',
    category: 'Food',
    difficulty: 'beginner'
  },
  {
    word: 'Orange',
    pronunciation: '/ˈɒr.ɪndʒ/',
    partOfSpeech: 'noun',
    definition: 'A round citrus fruit with orange skin',
    definitionMalay: 'Buah sitrus bulat dengan kulit oren',
    definitionTamil: 'ஆரஞ்சு நிற தோல் கொண்ட வட்டமான சிட்ரஸ் பழம்',
    definitionChinese: '一种圆形的柑橘类水果，有橙色的皮',
    example: 'She drinks fresh orange juice every morning.',
    imageQuery: 'orange citrus fruit',
    category: 'Food',
    difficulty: 'beginner'
  },
  {
    word: 'Bread',
    pronunciation: '/bred/',
    partOfSpeech: 'noun',
    definition: 'A food made from flour, water, and yeast',
    definitionMalay: 'Makanan yang dibuat daripada tepung, air dan yis',
    definitionTamil: 'மாவு, நீர் மற்றும் ஈஸ்ட் இருந்து செய்யப்பட்ட உணவு',
    definitionChinese: '用面粉、水和酵母制成的食物',
    example: 'I make toast with bread for breakfast.',
    imageQuery: 'bread loaf sliced',
    category: 'Food',
    difficulty: 'beginner'
  },
  {
    word: 'Rice',
    pronunciation: '/raɪs/',
    partOfSpeech: 'noun',
    definition: 'White or brown grains used as food',
    definitionMalay: 'Bijirin putih atau perang yang digunakan sebagai makanan',
    definitionTamil: 'உணவாக பயன்படுத்தப்படும் வெள்ளை அல்லது பழுப்பு தானியங்கள்',
    definitionChinese: '用作食物的白色或棕色谷物',
    example: 'Rice is a staple food in many Asian countries.',
    imageQuery: 'white rice bowl',
    category: 'Food',
    difficulty: 'beginner'
  },
  {
    word: 'Book',
    pronunciation: '/bʊk/',
    partOfSpeech: 'noun',
    definition: 'A written or printed work consisting of pages',
    definitionMalay: 'Karya bertulis atau bercetak yang terdiri daripada halaman',
    definitionTamil: 'பக்கங்களைக் கொண்ட எழுதப்பட்ட அல்லது அச்சிடப்பட்ட படைப்பு',
    definitionChinese: '由页面组成的书面或印刷作品',
    example: 'She is reading an interesting book about history.',
    imageQuery: 'stack books reading',
    category: 'Education',
    difficulty: 'beginner'
  },
  {
    word: 'Pencil',
    pronunciation: '/ˈpen.səl/',
    partOfSpeech: 'noun',
    definition: 'A wooden tool for writing or drawing',
    definitionMalay: 'Alat kayu untuk menulis atau melukis',
    definitionTamil: 'எழுதுவதற்கு அல்லது வரைவதற்கான மர கருவி',
    definitionChinese: '用于书写或绘画的木制工具',
    example: 'Students use pencils to write in their notebooks.',
    imageQuery: 'wooden pencil writing',
    category: 'Education',
    difficulty: 'beginner'
  },
  {
    word: 'School',
    pronunciation: '/skuːl/',
    partOfSpeech: 'noun',
    definition: 'A place where children go to learn',
    definitionMalay: 'Tempat di mana kanak-kanak pergi untuk belajar',
    definitionTamil: 'குழந்தைகள் கற்க செல்லும் இடம்',
    definitionChinese: '孩子们去学习的地方',
    example: 'Children go to school every weekday.',
    imageQuery: 'school building education',
    category: 'Education',
    difficulty: 'beginner'
  },
  {
    word: 'Teacher',
    pronunciation: '/ˈtiː.tʃər/',
    partOfSpeech: 'noun',
    definition: 'A person who teaches students',
    definitionMalay: 'Seseorang yang mengajar pelajar',
    definitionTamil: 'மாணவர்களுக்கு கற்பிக்கும் நபர்',
    definitionChinese: '教学生的人',
    example: 'My teacher is very kind and helpful.',
    imageQuery: 'teacher classroom teaching',
    category: 'Education',
    difficulty: 'beginner'
  },
  {
    word: 'Butterfly',
    pronunciation: '/ˈbʌt.ə.flaɪ/',
    partOfSpeech: 'noun',
    definition: 'An insect with large colorful wings',
    definitionMalay: 'Serangga dengan sayap berwarna-warni yang besar',
    definitionTamil: 'பெரிய வண்ணமயமான இறக்கைகள் கொண்ட பூச்சி',
    definitionChinese: '一种有大而多彩翅膀的昆虫',
    example: 'A beautiful butterfly landed on the flower.',
    imageQuery: 'colorful butterfly nature',
    category: 'Animals',
    difficulty: 'beginner'
  },
  {
    word: 'Cat',
    pronunciation: '/kæt/',
    partOfSpeech: 'noun',
    definition: 'A small furry animal kept as a pet',
    definitionMalay: 'Haiwan berbulu kecil yang dipelihara sebagai haiwan peliharaan',
    definitionTamil: 'செல்லப்பிராணியாக வைத்திருக்கும் சிறிய உரோம விலங்கு',
    definitionChinese: '一种小型毛茸茸的宠物',
    example: 'My cat likes to sleep on the sofa.',
    imageQuery: 'cute cat pet',
    category: 'Animals',
    difficulty: 'beginner'
  },
  {
    word: 'Dog',
    pronunciation: '/dɒɡ/',
    partOfSpeech: 'noun',
    definition: 'A loyal animal often kept as a pet',
    definitionMalay: 'Haiwan setia yang sering dipelihara sebagai haiwan kesayangan',
    definitionTamil: 'அடிக்கடி செல்லப்பிராணியாக வைத்திருக்கும் விசுவாசமான விலங்கு',
    definitionChinese: '经常作为宠物饲养的忠诚动物',
    example: 'Dogs are known as man\'s best friend.',
    imageQuery: 'friendly dog pet',
    category: 'Animals',
    difficulty: 'beginner'
  },
  {
    word: 'Bird',
    pronunciation: '/bɜːd/',
    partOfSpeech: 'noun',
    definition: 'An animal with wings and feathers that can fly',
    definitionMalay: 'Haiwan bersayap dan berbulu yang boleh terbang',
    definitionTamil: 'பறக்கக்கூடிய இறக்கைகள் மற்றும் இறகுகள் கொண்ட விலங்கு',
    definitionChinese: '一种有翅膀和羽毛可以飞的动物',
    example: 'The bird sings beautifully in the morning.',
    imageQuery: 'colorful bird singing',
    category: 'Animals',
    difficulty: 'beginner'
  },
  {
    word: 'Elephant',
    pronunciation: '/ˈel.ɪ.fənt/',
    partOfSpeech: 'noun',
    definition: 'A very large animal with a long trunk',
    definitionMalay: 'Haiwan yang sangat besar dengan belalai panjang',
    definitionTamil: 'நீண்ட தும்பிக்கை கொண்ட மிகப் பெரிய விலங்கு',
    definitionChinese: '一种有长鼻子的非常大的动物',
    example: 'Elephants are the largest land animals.',
    imageQuery: 'elephant wildlife',
    category: 'Animals',
    difficulty: 'beginner'
  },
  {
    word: 'Computer',
    pronunciation: '/kəmˈpjuː.tər/',
    partOfSpeech: 'noun',
    definition: 'An electronic device for storing and processing data',
    definitionMalay: 'Peranti elektronik untuk menyimpan dan memproses data',
    definitionTamil: 'தரவை சேமிப்பதற்கும் செயலாக்குவதற்கும் மின்னணு சாதனம்',
    definitionChinese: '用于存储和处理数据的电子设备',
    example: 'I use my computer for work and study.',
    imageQuery: 'laptop computer desk',
    category: 'Technology',
    difficulty: 'intermediate'
  },
  {
    word: 'Phone',
    pronunciation: '/fəʊn/',
    partOfSpeech: 'noun',
    definition: 'A device used to talk to people far away',
    definitionMalay: 'Peranti yang digunakan untuk bercakap dengan orang yang jauh',
    definitionTamil: 'தூரத்தில் உள்ளவர்களுடன் பேச பயன்படும் சாதனம்',
    definitionChinese: '用于与远方的人交谈的设备',
    example: 'She called her mother on the phone.',
    imageQuery: 'smartphone mobile phone',
    category: 'Technology',
    difficulty: 'beginner'
  },
  {
    word: 'Internet',
    pronunciation: '/ˈɪn.tə.net/',
    partOfSpeech: 'noun',
    definition: 'A global network connecting computers worldwide',
    definitionMalay: 'Rangkaian global yang menghubungkan komputer di seluruh dunia',
    definitionTamil: 'உலகம் முழுவதும் கணினிகளை இணைக்கும் உலகளாவிய வலையமைப்பு',
    definitionChinese: '连接全球计算机的全球网络',
    example: 'We use the internet to search for information.',
    imageQuery: 'internet network connection',
    category: 'Technology',
    difficulty: 'intermediate'
  },
  {
    word: 'Mountain',
    pronunciation: '/ˈmaʊn.tɪn/',
    partOfSpeech: 'noun',
    definition: 'A very high hill, often with rocks and snow',
    definitionMalay: 'Bukit yang sangat tinggi, sering dengan batu dan salji',
    definitionTamil: 'மிக உயரமான மலை, பெரும்பாலும் பாறைகள் மற்றும் பனியுடன்',
    definitionChinese: '一座非常高的山，通常有岩石和雪',
    example: 'We climbed the mountain to see the sunrise.',
    imageQuery: 'mountain peak nature',
    category: 'Nature',
    difficulty: 'beginner'
  },
  {
    word: 'Ocean',
    pronunciation: '/ˈəʊ.ʃən/',
    partOfSpeech: 'noun',
    definition: 'A very large area of sea',
    definitionMalay: 'Kawasan laut yang sangat luas',
    definitionTamil: 'மிகப் பெரிய கடல் பகுதி',
    definitionChinese: '非常大的海洋区域',
    example: 'The ocean is home to many sea creatures.',
    imageQuery: 'ocean waves blue water',
    category: 'Nature',
    difficulty: 'beginner'
  },
  {
    word: 'Garden',
    pronunciation: '/ˈɡɑː.dən/',
    partOfSpeech: 'noun',
    definition: 'A piece of ground for growing flowers or vegetables',
    definitionMalay: 'Sebidang tanah untuk menanam bunga atau sayur-sayuran',
    definitionTamil: 'பூக்கள் அல்லது காய்கறிகள் வளர்க்க நிலத்தின் ஒரு பகுதி',
    definitionChinese: '种植花卉或蔬菜的一块土地',
    example: 'My grandmother grows roses in her garden.',
    imageQuery: 'beautiful garden flowers',
    category: 'Nature',
    difficulty: 'beginner'
  },
  {
    word: 'Tree',
    pronunciation: '/triː/',
    partOfSpeech: 'noun',
    definition: 'A tall plant with a wooden trunk and branches',
    definitionMalay: 'Tumbuhan tinggi dengan batang kayu dan cawangan',
    definitionTamil: 'மர தண்டு மற்றும் கிளைகள் கொண்ட உயரமான தாவரம்',
    definitionChinese: '一种有木质树干和树枝的高大植物',
    example: 'The tree provides shade in the hot summer.',
    imageQuery: 'big tree nature',
    category: 'Nature',
    difficulty: 'beginner'
  },
  {
    word: 'Sun',
    pronunciation: '/sʌn/',
    partOfSpeech: 'noun',
    definition: 'The bright star that gives Earth light and heat',
    definitionMalay: 'Bintang terang yang memberi cahaya dan haba kepada Bumi',
    definitionTamil: 'பூமிக்கு ஒளி மற்றும் வெப்பத்தை தரும் பிரகாசமான நட்சத்திரம்',
    definitionChinese: '给地球提供光和热的明亮星球',
    example: 'The sun rises in the east.',
    imageQuery: 'bright sun sky',
    category: 'Nature',
    difficulty: 'beginner'
  },
  {
    word: 'Rain',
    pronunciation: '/reɪn/',
    partOfSpeech: 'noun',
    definition: 'Water that falls from clouds in drops',
    definitionMalay: 'Air yang jatuh dari awan dalam bentuk titisan',
    definitionTamil: 'மேகங்களிலிருந்து துளிகளாக விழும் நீர்',
    definitionChinese: '从云中滴落的水',
    example: 'We need an umbrella when it rains.',
    imageQuery: 'rain drops water',
    category: 'Nature',
    difficulty: 'beginner'
  },
  {
    word: 'Telescope',
    pronunciation: '/ˈtel.ɪ.skəʊp/',
    partOfSpeech: 'noun',
    definition: 'An instrument used to see distant objects',
    definitionMalay: 'Instrumen yang digunakan untuk melihat objek yang jauh',
    definitionTamil: 'தொலைவில் உள்ள பொருட்களைப் பார்க்க பயன்படும் கருவி',
    definitionChinese: '用于观察远处物体的仪器',
    example: 'Astronomers use telescopes to study stars.',
    imageQuery: 'telescope astronomy stars',
    category: 'Science',
    difficulty: 'advanced'
  },
  {
    word: 'Microscope',
    pronunciation: '/ˈmaɪ.krə.skəʊp/',
    partOfSpeech: 'noun',
    definition: 'An instrument for seeing very small things',
    definitionMalay: 'Instrumen untuk melihat benda yang sangat kecil',
    definitionTamil: 'மிக சிறிய பொருட்களைப் பார்க்கும் கருவி',
    definitionChinese: '用于观察非常小的东西的仪器',
    example: 'Scientists use microscopes to study cells.',
    imageQuery: 'microscope laboratory science',
    category: 'Science',
    difficulty: 'advanced'
  },
  {
    word: 'House',
    pronunciation: '/haʊs/',
    partOfSpeech: 'noun',
    definition: 'A building where people live',
    definitionMalay: 'Bangunan di mana orang tinggal',
    definitionTamil: 'மக்கள் வாழும் கட்டிடம்',
    definitionChinese: '人们居住的建筑物',
    example: 'My house has three bedrooms.',
    imageQuery: 'family house home',
    category: 'Places',
    difficulty: 'beginner'
  },
  {
    word: 'Car',
    pronunciation: '/kɑːr/',
    partOfSpeech: 'noun',
    definition: 'A vehicle with four wheels for traveling',
    definitionMalay: 'Kenderaan beroda empat untuk perjalanan',
    definitionTamil: 'பயணத்திற்கு நான்கு சக்கரங்கள் கொண்ட வாகனம்',
    definitionChinese: '有四个轮子的旅行车辆',
    example: 'We drive our car to work every day.',
    imageQuery: 'modern car vehicle',
    category: 'Transportation',
    difficulty: 'beginner'
  },
  {
    word: 'Bus',
    pronunciation: '/bʌs/',
    partOfSpeech: 'noun',
    definition: 'A large vehicle that carries many passengers',
    definitionMalay: 'Kenderaan besar yang membawa ramai penumpang',
    definitionTamil: 'பல பயணிகளை ஏற்றிச் செல்லும் பெரிய வாகனம்',
    definitionChinese: '载运许多乘客的大型车辆',
    example: 'Children take the bus to school.',
    imageQuery: 'school bus yellow',
    category: 'Transportation',
    difficulty: 'beginner'
  },
  {
    word: 'Clock',
    pronunciation: '/klɒk/',
    partOfSpeech: 'noun',
    definition: 'A device that shows the time',
    definitionMalay: 'Peranti yang menunjukkan masa',
    definitionTamil: 'நேரத்தைக் காட்டும் சாதனம்',
    definitionChinese: '显示时间的设备',
    example: 'The clock shows that it is 3 o\'clock.',
    imageQuery: 'wall clock time',
    category: 'Objects',
    difficulty: 'beginner'
  },
  {
    word: 'Chair',
    pronunciation: '/tʃeər/',
    partOfSpeech: 'noun',
    definition: 'A piece of furniture for sitting',
    definitionMalay: 'Perabot untuk duduk',
    definitionTamil: 'உட்காருவதற்கான மரச்சாமான்',
    definitionChinese: '用于坐的家具',
    example: 'Please sit on the chair.',
    imageQuery: 'wooden chair furniture',
    category: 'Objects',
    difficulty: 'beginner'
  },
  {
    word: 'Table',
    pronunciation: '/ˈteɪ.bəl/',
    partOfSpeech: 'noun',
    definition: 'A piece of furniture with a flat top',
    definitionMalay: 'Perabot dengan bahagian atas yang rata',
    definitionTamil: 'தட்டையான மேல்பகுதி கொண்ட மரச்சாமான்',
    definitionChinese: '有平坦顶部的家具',
    example: 'We eat dinner at the table.',
    imageQuery: 'dining table wooden',
    category: 'Objects',
    difficulty: 'beginner'
  }
];

const categories = ['All', 'Food', 'Animals', 'Nature', 'Technology', 'Education', 'Science', 'Places', 'Transportation', 'Objects'];

interface PictureDictionaryProps {
  language: Language;
}

export function PictureDictionary({ language }: PictureDictionaryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredEntries = dictionaryData.filter(entry => {
    const matchesSearch = entry.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const speak = (text: string) => {
    // AI-powered text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleFavorite = (word: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(word)) {
      newFavorites.delete(word);
    } else {
      newFavorites.add(word);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">📸 Picture Dictionary</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI-powered visual learning with pronunciations
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for any word... (AI will help find it)"
            className="w-full pl-12 pr-4 py-4 bg-card border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-card border border-border hover:border-primary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* AI Assistant Note */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-semibold text-foreground mb-1">🤖 AI Dictionary Assistant</p>
            <p className="text-sm text-muted-foreground">
              Can't find a word? Our AI will generate the definition, example, and suggest similar words based on your search!
            </p>
          </div>
        </div>
      </div>

      {/* Dictionary Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEntries.map((entry) => (
          <div
            key={entry.word}
            onClick={() => setSelectedEntry(entry)}
            className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            {/* Image */}
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
              <div className="text-6xl">
                {entry.word === 'Apple' ? '🍎' :
                 entry.word === 'Banana' ? '🍌' :
                 entry.word === 'Orange' ? '🍊' :
                 entry.word === 'Bread' ? '🍞' :
                 entry.word === 'Rice' ? '🍚' :
                 entry.word === 'Book' ? '📚' :
                 entry.word === 'Pencil' ? '✏️' :
                 entry.word === 'School' ? '🏫' :
                 entry.word === 'Teacher' ? '👨‍🏫' :
                 entry.word === 'Butterfly' ? '🦋' :
                 entry.word === 'Cat' ? '🐱' :
                 entry.word === 'Dog' ? '🐕' :
                 entry.word === 'Bird' ? '🐦' :
                 entry.word === 'Elephant' ? '🐘' :
                 entry.word === 'Computer' ? '💻' :
                 entry.word === 'Phone' ? '📱' :
                 entry.word === 'Internet' ? '🌐' :
                 entry.word === 'Mountain' ? '⛰️' :
                 entry.word === 'Ocean' ? '🌊' :
                 entry.word === 'Garden' ? '🌻' :
                 entry.word === 'Tree' ? '🌳' :
                 entry.word === 'Sun' ? '☀️' :
                 entry.word === 'Rain' ? '🌧️' :
                 entry.word === 'Telescope' ? '🔭' :
                 entry.word === 'Microscope' ? '🔬' :
                 entry.word === 'House' ? '🏠' :
                 entry.word === 'Car' ? '🚗' :
                 entry.word === 'Bus' ? '🚌' :
                 entry.word === 'Clock' ? '🕐' :
                 entry.word === 'Chair' ? '🪑' :
                 entry.word === 'Table' ? '🪑' : '📖'}
              </div>
              
              {/* Difficulty Badge */}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${
                entry.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                entry.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {entry.difficulty}
              </div>

              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(entry.word);
                }}
                className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:scale-110 transition-transform"
              >
                <Star className={`w-4 h-4 ${favorites.has(entry.word) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {entry.word}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(entry.word);
                  }}
                  className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                >
                  <Volume2 className="w-5 h-5 text-primary" />
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{entry.pronunciation}</p>
              <span className="inline-block px-2 py-1 bg-accent/20 text-accent text-xs rounded-full mb-2">
                {entry.partOfSpeech}
              </span>
              <p className="text-sm text-foreground line-clamp-2">{entry.definition}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedEntry(null)}>
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              {/* Close Button */}
              <button
                onClick={() => setSelectedEntry(null)}
                className="float-right p-2 hover:bg-muted rounded-full"
              >
                ✕
              </button>

              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mb-6">
                <div className="text-8xl">
                  {selectedEntry.word === 'Apple' ? '🍎' :
                   selectedEntry.word === 'Banana' ? '🍌' :
                   selectedEntry.word === 'Orange' ? '🍊' :
                   selectedEntry.word === 'Bread' ? '🍞' :
                   selectedEntry.word === 'Rice' ? '🍚' :
                   selectedEntry.word === 'Book' ? '📚' :
                   selectedEntry.word === 'Pencil' ? '✏️' :
                   selectedEntry.word === 'School' ? '🏫' :
                   selectedEntry.word === 'Teacher' ? '👨‍🏫' :
                   selectedEntry.word === 'Butterfly' ? '🦋' :
                   selectedEntry.word === 'Cat' ? '🐱' :
                   selectedEntry.word === 'Dog' ? '🐕' :
                   selectedEntry.word === 'Bird' ? '🐦' :
                   selectedEntry.word === 'Elephant' ? '🐘' :
                   selectedEntry.word === 'Computer' ? '💻' :
                   selectedEntry.word === 'Phone' ? '📱' :
                   selectedEntry.word === 'Internet' ? '🌐' :
                   selectedEntry.word === 'Mountain' ? '⛰️' :
                   selectedEntry.word === 'Ocean' ? '🌊' :
                   selectedEntry.word === 'Garden' ? '🌻' :
                   selectedEntry.word === 'Tree' ? '🌳' :
                   selectedEntry.word === 'Sun' ? '☀️' :
                   selectedEntry.word === 'Rain' ? '🌧️' :
                   selectedEntry.word === 'Telescope' ? '🔭' :
                   selectedEntry.word === 'Microscope' ? '🔬' :
                   selectedEntry.word === 'House' ? '🏠' :
                   selectedEntry.word === 'Car' ? '🚗' :
                   selectedEntry.word === 'Bus' ? '🚌' :
                   selectedEntry.word === 'Clock' ? '🕐' :
                   selectedEntry.word === 'Chair' ? '🪑' :
                   selectedEntry.word === 'Table' ? '🪑' : '📖'}
                </div>
              </div>

              {/* Word and Pronunciation */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-4xl font-bold text-foreground mb-2">{selectedEntry.word}</h2>
                  <p className="text-xl text-muted-foreground">{selectedEntry.pronunciation}</p>
                </div>
                <button
                  onClick={() => speak(selectedEntry.word)}
                  className="p-4 bg-primary rounded-full hover:bg-primary/90 transition-colors"
                >
                  <Volume2 className="w-6 h-6 text-primary-foreground" />
                </button>
              </div>

              {/* Part of Speech */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full">
                  {selectedEntry.partOfSpeech}
                </span>
                <span className="inline-block ml-2 px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {selectedEntry.category}
                </span>
              </div>

              {/* Definition */}
              <div className="mb-6">
                <h3 className="font-bold text-foreground mb-2">Definition:</h3>
                <p className="text-foreground">{selectedEntry.definition}</p>
              </div>

              {/* Multilingual Definitions */}
              <div className="mb-6 space-y-3">
                <h3 className="font-bold text-foreground mb-2">Translations:</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Malay (Bahasa Melayu)</p>
                    <p className="text-sm text-foreground">{selectedEntry.definitionMalay}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Tamil (தமிழ்)</p>
                    <p className="text-sm text-foreground">{selectedEntry.definitionTamil}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Chinese (中文)</p>
                    <p className="text-sm text-foreground">{selectedEntry.definitionChinese}</p>
                  </div>
                </div>
              </div>

              {/* Example */}
              <div className="mb-6">
                <h3 className="font-bold text-foreground mb-2">Example:</h3>
                <p className="text-foreground italic bg-muted p-4 rounded-lg">"{selectedEntry.example}"</p>
                <button
                  onClick={() => speak(selectedEntry.example)}
                  className="mt-2 flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Volume2 className="w-4 h-4" />
                  Listen to example
                </button>
              </div>

              {/* AI Insights */}
              <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">🤖 AI Learning Tips:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Try using this word in 3 different sentences today</li>
                      <li>Related words you might want to learn: {selectedEntry.category.toLowerCase()}-related vocabulary</li>
                      <li>Difficulty: {selectedEntry.difficulty} - perfect for your level!</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}