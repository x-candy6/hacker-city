import Link from 'next/link';
import { contentClient } from '@/lib/content';
import { prepareArticleCard } from '@stackmatix/cms-core';
import BlossomSVG from '@/components/BlossomSVG';
import { siteConfig } from '@/lib/config';

export const revalidate = 300;

const CATEGORY_COLORS: Record<string, string> = {
  technology: '#2EE9FF',
  business: '#FF6A00',
  culture: '#FF2D8F',
  earth: '#39FF14',
  health: '#A02EFF',
  news: '#FF2D8F',
  sport: '#2EE9FF',
  arts: '#D0FF00',
  travel: '#39FF14',
};

/** Homepage with hero, category sections, latest stories, and newsletter CTA. */
export default async function HomePage() {
  const articles = await contentClient.getArticles({ limit: 20 });
  const articleCards = articles.map(prepareArticleCard);
  const [featured, ...rest] = articleCards;
  const miniArticles = rest.slice(0, 3);

  const techArticles = articleCards.filter(a => a.article.category === 'technology').slice(0, 3);
  const businessArticles = articleCards.filter(a => a.article.category === 'business').slice(0, 3);
  const cultureArticles = articleCards.filter(a => a.article.category === 'culture').slice(0, 3);
  const earthArticles = articleCards.filter(a => a.article.category === 'earth').slice(0, 3);
  const healthArticles = articleCards.filter(a => a.article.category === 'health').slice(0, 3);

  const categorySections = [
    { label: 'Tech', slug: 'technology', kicker: 'Trending', articles: techArticles, color: '#2EE9FF' },
    { label: 'Business', slug: 'business', kicker: 'Analysis', articles: businessArticles, color: '#FF6A00' },
    { label: 'Culture', slug: 'culture', kicker: 'Spotlight', articles: cultureArticles, color: '#FF2D8F' },
    { label: 'Earth', slug: 'earth', kicker: 'Field Notes', articles: earthArticles, color: '#39FF14' },
    { label: 'Science', slug: 'health', kicker: 'Discovery', articles: healthArticles, color: '#A02EFF' },
  ];

  return (
    <>
      {/* Hero Section -- keep the ambient BlossomSVG here only */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#F6F7FB]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[140vmin] h-[140vmin] -translate-y-8">
            <BlossomSVG variant={1} />
          </div>
        </div>

        <div className="relative z-10 px-6 lg:px-12 py-12 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="hero-headline text-[#0B0C10] mb-8 lg:mb-12">
              Hacker-City
            </h1>

            <div className="grid lg:grid-cols-3 gap-6">
              {featured && (
                <div className="lg:col-span-2">
                  <Link href={featured.href} className="group block">
                    <article className="petal-panel p-8 lg:p-10 border-l-4 border-[#FF2D8F]">
                      <span className="kicker block mb-4">Featured</span>
                      <h2 className="font-display font-black text-4xl lg:text-6xl leading-[1.05] mb-6 group-hover:text-[#FF2D8F] transition-colors">
                        {featured.article.title}
                      </h2>
                      <p className="excerpt mb-6 max-w-2xl">{featured.article.excerpt}</p>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="meta-text">{featured.formattedDate}</span>
                        <span className="reading-time">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {featured.article.readingTime} min
                        </span>
                      </div>
                      <span className="link-accent">
                        Read the story
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </article>
                  </Link>
                </div>
              )}

              <div className="space-y-4">
                {miniArticles.map((article) => (
                  <Link key={article.article.id} href={article.href} className="group block">
                    <article className="petal-panel p-4">
                      <span className="category-label block mb-2">{article.article.category}</span>
                      <h3 className="font-display font-bold text-base leading-tight group-hover:text-[#FF2D8F] transition-colors line-clamp-2">
                        {article.article.title}
                      </h3>
                      <span className="meta-text mt-2 block">{article.formattedDate}</span>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Sections -- clean alternating backgrounds, no BlossomSVG */}
      {categorySections.map((section, idx) => (
        <section
          key={section.slug}
          className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F6F7FB]'}
        >
          {/* Thin colored divider */}
          <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${section.color}, transparent 60%)` }} />

          <div className="px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-10">
                <h2 className="font-display font-black text-3xl lg:text-4xl uppercase tracking-tight">
                  <span style={{ color: section.color }}>{'//\u00A0'}</span>
                  {section.label}
                </h2>
                <Link href={`/${section.slug}`} className="link-accent text-sm">
                  All {section.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>

              {section.articles[0] && (
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Lead article */}
                  <div className="lg:col-span-2">
                    <Link href={section.articles[0].href} className="group block">
                      <article
                        className="petal-panel p-8 h-full border-l-4"
                        style={{ borderColor: section.color }}
                      >
                        <span className="kicker block mb-3">{section.kicker}</span>
                        <h3 className="font-display font-black text-2xl lg:text-4xl leading-tight mb-4 group-hover:text-[#FF2D8F] transition-colors">
                          {section.articles[0].article.title}
                        </h3>
                        <p className="excerpt mb-6 max-w-xl">{section.articles[0].article.excerpt}</p>
                        <div className="flex items-center gap-4">
                          <span className="meta-text">{section.articles[0].formattedDate}</span>
                          <span className="reading-time">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {section.articles[0].article.readingTime} min
                          </span>
                        </div>
                      </article>
                    </Link>
                  </div>

                  {/* Secondary articles */}
                  <div className="space-y-4">
                    {section.articles.slice(1).map((article) => (
                      <Link key={article.article.id} href={article.href} className="group block">
                        <article className="petal-panel p-4">
                          <h4 className="font-display font-bold text-base leading-tight group-hover:text-[#FF2D8F] transition-colors line-clamp-2">
                            {article.article.title}
                          </h4>
                          <span className="meta-text mt-2 block">{article.formattedDate}</span>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Latest Stories */}
      <section className="bg-white">
        <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #FF2D8F, transparent 40%)' }} />
        <div className="px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-display font-black text-2xl lg:text-3xl uppercase tracking-tight">
                Latest
              </h2>
              <Link href="/news" className="link-accent text-sm">
                View all
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {articleCards.slice(3, 9).map((article) => {
                const catColor = CATEGORY_COLORS[article.article.category] ?? '#FF2D8F';
                return (
                  <Link key={article.article.id} href={article.href} className="group block article-card">
                    <article className="petal-panel p-5 border-l-4" style={{ borderColor: catColor }}>
                      <span className="category-label block mb-1" style={{ color: catColor }}>
                        {article.article.category}
                      </span>
                      <h4 className="font-display font-bold text-base leading-tight line-clamp-2 group-hover:text-[#FF2D8F] transition-colors">
                        {article.article.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="meta-text">{article.formattedDate}</span>
                        <span className="reading-time">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {article.article.readingTime} min
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Most Read */}
      <section className="bg-[#F6F7FB]">
        <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #A02EFF, transparent 40%)' }} />
        <div className="px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display font-black text-2xl lg:text-3xl uppercase tracking-tight mb-10">
              Most Read
            </h2>

            <div className="space-y-4">
              {articleCards.slice(0, 3).map((article, index) => (
                <Link key={article.article.id} href={article.href} className="group block">
                  <article className="petal-panel p-6 flex items-center gap-6">
                    <span className="font-display font-black text-4xl lg:text-5xl text-[#FF2D8F]/20 select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <span className="category-label block mb-2">{article.article.category}</span>
                      <h3 className="font-display font-bold text-lg lg:text-xl group-hover:text-[#FF2D8F] transition-colors">
                        {article.article.title}
                      </h3>
                    </div>
                    <div className="hidden sm:flex items-center gap-4">
                      <span className="meta-text">{article.formattedDate}</span>
                      <span className="reading-time">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {article.article.readingTime} min
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Topic */}
      <section className="bg-white">
        <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #2EE9FF, #FF2D8F, transparent 60%)' }} />
        <div className="px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display font-black text-2xl lg:text-3xl uppercase tracking-tight mb-10">
              Browse by Topic
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siteConfig.categories.slice(0, 9).map((category) => {
                const catColor = CATEGORY_COLORS[category.slug] ?? '#FF2D8F';
                return (
                  <Link
                    key={category.slug}
                    href={`/${category.slug}`}
                    className="group block"
                  >
                    <div className="petal-panel p-6 border-l-4 transition-shadow hover:shadow-xl" style={{ borderColor: catColor }}>
                      <h3 className="font-display font-bold text-xl group-hover:text-[#FF2D8F] transition-colors">
                        {category.label}
                      </h3>
                      <span className="meta-text mt-2 block">
                        {articles.filter(a => a.category === category.slug).length} articles
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter + Short Reads */}
      <section className="bg-[#F6F7FB]">
        <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #D0FF00, transparent 40%)' }} />
        <div className="px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="petal-panel p-8 lg:p-10 border-t-4 border-[#FF2D8F]">
                <h2 className="font-display font-black text-2xl lg:text-3xl mb-4">
                  Get the morning brief
                </h2>
                <p className="excerpt mb-6">
                  Five stories, fresh context, zero fluff -- delivered weekdays.
                </p>
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="newsletter-input flex-1"
                  />
                  <button type="submit" className="btn-accent whitespace-nowrap">
                    Subscribe
                  </button>
                </form>
              </div>

              <div className="petal-panel p-8 lg:p-10">
                <h3 className="font-display font-bold text-lg mb-4">Short Reads</h3>
                <div className="space-y-4">
                  <Link href="#" className="group block">
                    <p className="font-medium group-hover:text-[#FF2D8F] transition-colors">
                      Tip: How to archive a newsletter
                    </p>
                    <span className="meta-text">2 min read</span>
                  </Link>
                  <Link href="#" className="group block">
                    <p className="font-medium group-hover:text-[#FF2D8F] transition-colors">
                      Tool: A better RSS finder
                    </p>
                    <span className="meta-text">1 min read</span>
                  </Link>
                  <Link href="#" className="group block">
                    <p className="font-medium group-hover:text-[#FF2D8F] transition-colors">
                      Template: Meeting notes
                    </p>
                    <span className="meta-text">3 min read</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast + Video */}
      <section className="bg-white">
        <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #A02EFF, #2EE9FF, transparent 60%)' }} />
        <div className="px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              <Link href="#" className="group block">
                <div className="petal-panel p-8 border-l-4 border-[#A02EFF] flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#A02EFF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#A02EFF]/20 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#A02EFF] ml-0.5">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <div>
                    <span className="category-label block mb-1" style={{ color: '#A02EFF' }}>Podcast</span>
                    <h3 className="font-display font-bold text-lg group-hover:text-[#FF2D8F] transition-colors">
                      Hacker-City Radio -- Episode 42: The hardware comeback
                    </h3>
                  </div>
                </div>
              </Link>

              <Link href="#" className="group block">
                <div className="petal-panel p-8 border-l-4 border-[#2EE9FF] flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#2EE9FF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2EE9FF]/20 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#2EE9FF] ml-0.5">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <div>
                    <span className="category-label block mb-1" style={{ color: '#2EE9FF' }}>Video</span>
                    <h3 className="font-display font-bold text-lg group-hover:text-[#FF2D8F] transition-colors">
                      Studio visit: Rebuilding a newsroom
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 lg:py-32 bg-[#0B0C10] text-white">
        <div className="px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-black text-3xl lg:text-5xl mb-6">
              Tell us what you&apos;re building.
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Pitch a story, propose a partnership, or just say hello.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 btn-accent text-lg px-8 py-4"
            >
              Start a conversation
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <p className="mt-8 text-white/40">
              <a href="mailto:hello@hacker-city.io" className="hover:text-white transition-colors">
                hello@hacker-city.io
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
