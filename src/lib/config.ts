/** Site configuration for Hacker-City. */
export const siteConfig = {
  name: 'Hacker-City',
  tagline: 'Bright news for a curious world.',
  url: 'https://hacker-city.io',
  description: 'Tech, business, culture, earth, and science news for the curious mind.',
  categories: [
    { slug: 'news', label: 'News' },
    { slug: 'sport', label: 'Sport' },
    { slug: 'business', label: 'Business' },
    { slug: 'technology', label: 'Technology' },
    { slug: 'health', label: 'Health' },
    { slug: 'culture', label: 'Culture' },
    { slug: 'arts', label: 'Arts' },
    { slug: 'travel', label: 'Travel' },
    { slug: 'earth', label: 'Earth' },
  ],
} as const;
