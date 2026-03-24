// Mock content data for Hacker-City

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  subCategory: string | null;
  tags: string[];
  author: string | null;
  body: string;
  publishedAt: string;
  updatedAt: string | null;
  heroImage: string | null;
  readingTime: number;
}

export interface Category {
  slug: string;
  label: string;
  aliases: string[];
  subCategories: { slug: string; label: string }[];
}

export interface ArticleCardData {
  article: Article;
  href: string;
  formattedDate: string;
}

export const siteConfig = {
  name: 'Hacker-City',
  tagline: 'Bright news for a curious world.',
  url: 'https://hacker-city.io',
  description: 'Tech, business, culture, earth, and science news for the curious mind.',
  categories: [
    { slug: 'news', label: 'News', subCategories: [{ slug: 'politics', label: 'Politics' }, { slug: 'world', label: 'World' }, { slug: 'local', label: 'Local' }] },
    { slug: 'sport', label: 'Sport', subCategories: [] },
    { slug: 'business', label: 'Business', subCategories: [{ slug: 'markets', label: 'Markets' }, { slug: 'startups', label: 'Startups' }, { slug: 'economy', label: 'Economy' }] },
    { slug: 'technology', label: 'Technology', subCategories: [{ slug: 'artificial-intelligence', label: 'Artificial Intelligence' }, { slug: 'cybersecurity', label: 'Cybersecurity' }, { slug: 'gadgets', label: 'Gadgets' }, { slug: 'software', label: 'Software' }] },
    { slug: 'health', label: 'Health', subCategories: [] },
    { slug: 'culture', label: 'Culture', subCategories: [] },
    { slug: 'arts', label: 'Arts', subCategories: [] },
    { slug: 'travel', label: 'Travel', subCategories: [] },
    { slug: 'earth', label: 'Earth', subCategories: [] },
  ],
} as const;

// Mock articles data
export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The quiet rise of open hardware',
    slug: 'quiet-rise-open-hardware',
    excerpt: 'A new wave of modular laptops and repairable phones is changing how we think about devices.',
    category: 'technology',
    subCategory: 'gadgets',
    tags: ['hardware', 'repair', 'modular'],
    author: 'Hacker-City Editorial',
    body: '# The Quiet Rise of Open Hardware\n\nIn an era of sealed devices and planned obsolescence, a counter-movement is gaining momentum. Open hardware—devices designed to be repaired, modified, and understood—is reshaping how we think about technology.\n\n## The Repair Revolution\n\nFrom Framework laptops to Fairphone smartphones, manufacturers are embracing modularity. These devices are designed with repairability in mind, featuring easily replaceable components and comprehensive documentation.\n\n## Why It Matters\n\nThe environmental impact of electronic waste is staggering. By extending device lifespans through repair and upgrades, open hardware offers a more sustainable path forward.',
    publishedAt: '2026-03-22T10:00:00Z',
    updatedAt: null,
    heroImage: '/images/hardware.jpg',
    readingTime: 6,
  },
  {
    id: '2',
    title: 'AI agents are becoming teammates',
    slug: 'ai-agents-becoming-teammates',
    excerpt: 'From code review to customer support, autonomous agents are starting to feel like colleagues.',
    category: 'technology',
    subCategory: 'artificial-intelligence',
    tags: ['ai', 'automation', 'work'],
    author: 'Tech Desk',
    body: '# AI Agents Are Becoming Teammates\n\nThe workplace is undergoing a subtle but profound transformation. AI agents—autonomous systems capable of performing complex tasks—are increasingly integrated into our daily workflows.\n\n## Beyond Assistants\n\nUnlike traditional chatbots, modern AI agents can take initiative, learn from context, and collaborate across tools. They\'re not just answering questions; they\'re completing projects.\n\n## The New Normal\n\nFrom automated code reviews to intelligent customer support routing, these agents are becoming indistinguishable from human colleagues in certain contexts.',
    publishedAt: '2026-03-21T14:30:00Z',
    updatedAt: null,
    heroImage: '/images/ai-agents.jpg',
    readingTime: 5,
  },
  {
    id: '3',
    title: 'Startups rethink the 40-hour playbook',
    slug: 'startups-rethink-40-hour-playbook',
    excerpt: 'Founders are experimenting with shorter weeks, async comms, and clearer goals.',
    category: 'business',
    subCategory: 'startups',
    tags: ['startups', 'work-life', 'productivity'],
    author: 'Business Desk',
    body: '# Startups Rethink the 40-Hour Playbook\n\nThe traditional work week is being challenged by a new generation of founders who prioritize outcomes over hours.\n\n## Experiments in Efficiency\n\nFour-day work weeks, asynchronous communication, and radical transparency are becoming common practices in forward-thinking startups. The focus is shifting from time spent to results achieved.\n\n## The Data Speaks\n\nEarly adopters report increased productivity, better retention, and improved employee wellbeing. The 40-hour week may be due for a revision.',
    publishedAt: '2026-03-20T09:00:00Z',
    updatedAt: null,
    heroImage: '/images/startups.jpg',
    readingTime: 7,
  },
  {
    id: '4',
    title: 'A new wave of independent publishing',
    slug: 'new-wave-independent-publishing',
    excerpt: 'Zines, newsletters, and small-print magazines are reshaping how stories find audiences.',
    category: 'culture',
    subCategory: null,
    tags: ['publishing', 'media', 'independent'],
    author: 'Culture Desk',
    body: '# A New Wave of Independent Publishing\n\nIn an age of algorithmic feeds, independent publishers are carving out spaces for thoughtful, intentional storytelling.\n\n## The Zine Renaissance\n\nFrom DIY zines to premium newsletters, creators are finding direct paths to their audiences. Platforms like Substack and Ghost have democratized publishing infrastructure.\n\n## Quality Over Quantity\n\nThese publications prioritize depth over clicks, building loyal communities around niche interests and unique perspectives.',
    publishedAt: '2026-03-19T11:00:00Z',
    updatedAt: null,
    heroImage: '/images/publishing.jpg',
    readingTime: 5,
  },
  {
    id: '5',
    title: 'Cities are rewilding rooftops',
    slug: 'cities-rewilding-rooftops',
    excerpt: 'Urban farms, pollinator corridors, and cooler buildings—green roofs are scaling fast.',
    category: 'earth',
    subCategory: null,
    tags: ['urban', 'sustainability', 'green'],
    author: 'Earth Desk',
    body: '# Cities Are Rewilding Rooftops\n\nAcross the globe, cities are transforming barren rooftops into thriving ecosystems. Green roofs are no longer just aesthetic choices—they\'re essential infrastructure.\n\n## Benefits Beyond Beauty\n\nGreen roofs reduce urban heat, manage stormwater, provide habitat for pollinators, and improve air quality. They\'re also extending the lifespan of roofing materials.\n\n## Scaling Up\n\nFrom Singapore to Copenhagen, municipalities are incentivizing green roof installations. The result is a patchwork of urban gardens that collectively make cities more livable.',
    publishedAt: '2026-03-18T08:00:00Z',
    updatedAt: null,
    heroImage: '/images/green-roofs.jpg',
    readingTime: 6,
  },
  {
    id: '6',
    title: 'The brain\'s cleanup crew is more precise than we thought',
    slug: 'brains-cleanup-crew-more-precise',
    excerpt: 'New imaging reveals how sleep and micro-movements help the brain maintain itself.',
    category: 'health',
    subCategory: null,
    tags: ['neuroscience', 'sleep', 'health'],
    author: 'Science Desk',
    body: '# The Brain\'s Cleanup Crew Is More Precise Than We Thought\n\nNew research is revealing the intricate mechanisms by which the brain cleanses itself during sleep.\n\n## The Glymphatic System\n\nRecent imaging studies show that the brain\'s waste-clearance system is far more sophisticated than previously understood. Micro-movements of fluid help flush toxins and metabolic byproducts.\n\n## Implications for Health\n\nUnderstanding these processes could lead to new treatments for neurodegenerative diseases and insights into the critical importance of quality sleep.',
    publishedAt: '2026-03-17T13:00:00Z',
    updatedAt: null,
    heroImage: '/images/brain.jpg',
    readingTime: 8,
  },
  {
    id: '7',
    title: 'Space startups bet on modular satellites',
    slug: 'space-startups-modular-satellites',
    excerpt: 'A new generation of satellites is designed to be upgraded, not replaced.',
    category: 'technology',
    subCategory: 'gadgets',
    tags: ['space', 'satellites', 'modular'],
    author: 'Tech Desk',
    body: '# Space Startups Bet on Modular Satellites\n\nThe satellite industry is embracing modularity, with new designs that allow for in-orbit upgrades and repairs.\n\n## The Old Model\n\nTraditional satellites are monolithic systems with fixed lifespans. When they fail or become obsolete, they become space debris.\n\n## The New Approach\n\nModular satellites feature standardized interfaces and swappable components. This approach reduces costs, extends operational lifespans, and minimizes orbital debris.',
    publishedAt: '2026-03-16T10:00:00Z',
    updatedAt: null,
    heroImage: '/images/satellites.jpg',
    readingTime: 6,
  },
  {
    id: '8',
    title: 'The future of work is written in policy',
    slug: 'future-work-written-policy',
    excerpt: 'Governments are catching up to the realities of remote and flexible work.',
    category: 'business',
    subCategory: 'economy',
    tags: ['policy', 'remote-work', 'future'],
    author: 'Business Desk',
    body: '# The Future of Work Is Written in Policy\n\nAs remote work becomes permanent for many, governments are crafting new policies to address the implications.\n\n## New Frameworks\n\nFrom tax implications to labor protections, policymakers are grappling with the complexities of distributed workforces.\n\n## Global Implications\n\nDifferent approaches across jurisdictions are creating both opportunities and challenges for multinational organizations.',
    publishedAt: '2026-03-15T09:30:00Z',
    updatedAt: null,
    heroImage: '/images/policy.jpg',
    readingTime: 7,
  },
  {
    id: '9',
    title: 'A brief history of neon in art',
    slug: 'brief-history-neon-art',
    excerpt: 'From advertising to installation, neon has illuminated artistic expression for over a century.',
    category: 'arts',
    subCategory: null,
    tags: ['art', 'neon', 'history'],
    author: 'Arts Desk',
    body: '# A Brief History of Neon in Art\n\nNeon lighting has transcended its commercial origins to become a respected medium in contemporary art.\n\n## From Signs to Galleries\n\nArtists like Dan Flavin and Tracey Emin have elevated neon from advertising material to fine art. The medium\'s unique properties—its glow, its fragility, its association with urban nightlife—offer rich symbolic possibilities.\n\n## Contemporary Practice\n\nToday, neon continues to captivate artists and audiences alike, bridging the gap between sculpture and light.',
    publishedAt: '2026-03-14T14:00:00Z',
    updatedAt: null,
    heroImage: '/images/neon.jpg',
    readingTime: 5,
  },
  {
    id: '10',
    title: 'How heat maps are changing urban planning',
    slug: 'heat-maps-changing-urban-planning',
    excerpt: 'Thermal imaging reveals the hidden patterns of city life.',
    category: 'earth',
    subCategory: null,
    tags: ['urban', 'data', 'climate'],
    author: 'Earth Desk',
    body: '# How Heat Maps Are Changing Urban Planning\n\nThermal imaging and heat mapping are providing urban planners with unprecedented insights into how cities function.\n\n## Seeing the Invisible\n\nHeat maps reveal patterns of human activity, energy consumption, and environmental conditions that are invisible to the naked eye.\n\n## Data-Driven Design\n\nPlanners are using this data to optimize everything from traffic flow to green space placement, creating more efficient and livable cities.',
    publishedAt: '2026-03-13T11:00:00Z',
    updatedAt: null,
    heroImage: '/images/heat-maps.jpg',
    readingTime: 6,
  },
];

// Helper functions
export function buildArticleHref(article: Article): string {
  const date = new Date(article.publishedAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `/${article.category}/${year}/${month}/${day}/${article.slug}`;
}

export function formatArticleDate(article: Article): string {
  const date = new Date(article.publishedAt);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function prepareArticleCard(article: Article): ArticleCardData {
  return {
    article,
    href: buildArticleHref(article),
    formattedDate: formatArticleDate(article),
  };
}

export function groupByCategory(articles: Article[]): Map<string, Article[]> {
  const grouped = new Map<string, Article[]>();
  for (const article of articles) {
    const existing = grouped.get(article.category) || [];
    existing.push(article);
    grouped.set(article.category, existing);
  }
  return grouped;
}

export function findRelatedArticles(
  currentArticle: Article, 
  allArticles: Article[], 
  limit = 5
): { article: Article; href: string; matchType: 'category' | 'tag' | 'subcategory' }[] {
  const related: { article: Article; href: string; matchType: 'category' | 'tag' | 'subcategory'; score: number }[] = [];
  
  for (const article of allArticles) {
    if (article.id === currentArticle.id) continue;
    
    let score = 0;
    let matchType: 'category' | 'tag' | 'subcategory' = 'category';
    
    if (article.subCategory && article.subCategory === currentArticle.subCategory) {
      score += 3;
      matchType = 'subcategory';
    } else if (article.category === currentArticle.category) {
      score += 2;
      matchType = 'category';
    }
    
    const commonTags = article.tags.filter(tag => currentArticle.tags.includes(tag));
    if (commonTags.length > 0) {
      score += commonTags.length;
      if (score <= 1) matchType = 'tag';
    }
    
    if (score > 0) {
      related.push({ article, href: buildArticleHref(article), matchType, score });
    }
  }
  
  return related
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article, href, matchType }) => ({ article, href, matchType }));
}

export function renderMarkdown(body: string): string {
  return body
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    .replace(/\n/gim, '<br>');
}

// Content client mock
export const contentClient = {
  getArticles: async ({ limit = 20 }: { limit?: number } = {}) => 
    mockArticles.slice(0, limit),
  
  getArticlesByCategory: async (category: string, { limit = 20 }: { limit?: number } = {}) => 
    mockArticles.filter(a => a.category === category).slice(0, limit),
  
  getArticle: async (slug: string) => 
    mockArticles.find(a => a.slug === slug) || null,
  
  getCategories: async () => 
    siteConfig.categories.map(c => ({ ...c, aliases: [] })),
  
  getCategory: async (slug: string) => 
    siteConfig.categories.find(c => c.slug === slug) || null,
};
