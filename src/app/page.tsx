import Link from 'next/link';
import { contentClient } from '@/lib/content';
import { buildArticleHref, formatArticleDate, prepareArticleCard } from '@stackmatix/cms-core';
import BlossomSVG from '@/components/BlossomSVG';
import { siteConfig } from '@/lib/config';

export const revalidate = 300;

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

  return (
    <>
      {/* Hero Section */}
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
                    <article className="petal-panel overflow-hidden">
                      <div className="grid md:grid-cols-2">
                        <div className="relative h-64 md:h-full min-h-[300px]">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#2EE9FF]/20 to-[#A02EFF]/20" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#2EE9FF] to-[#A02EFF] opacity-60" />
                          </div>
                        </div>
                        <div className="p-6 lg:p-8 flex flex-col justify-center">
                          <span className="kicker block mb-3">Featured</span>
                          <h2 className="font-display font-black text-2xl lg:text-3xl leading-tight mb-4 group-hover:text-[#FF2D8F] transition-colors">
                            {featured.article.title}
                          </h2>
                          <p className="excerpt mb-6">{featured.article.excerpt}</p>
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
                        </div>
                      </div>
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

      {/* Tech Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#F6F7FB]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[120vmin] h-[120vmin]">
            <BlossomSVG variant={2} />
          </div>
        </div>

        <div className="relative z-10 px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <span className="category-label block mb-8 text-right">Tech</span>

            {techArticles[0] && (
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <Link href={techArticles[0].href} className="group block">
                    <article className="petal-panel p-8">
                      <span className="kicker block mb-3">Trending</span>
                      <h2 className="font-display font-black text-2xl lg:text-4xl leading-tight mb-4 group-hover:text-[#FF2D8F] transition-colors">
                        {techArticles[0].article.title}
                      </h2>
                      <p className="excerpt mb-6">{techArticles[0].article.excerpt}</p>
                      <span className="link-accent">
                        Read more
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </article>
                  </Link>
                </div>
                <div className="order-1 lg:order-2 relative h-80 lg:h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2EE9FF]/30 to-[#FF2D8F]/20 rounded-[28px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#2EE9FF] to-[#A02EFF] opacity-50 blur-xl" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#F6F7FB]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[120vmin] h-[120vmin]">
            <BlossomSVG variant={3} />
          </div>
        </div>

        <div className="relative z-10 px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <span className="category-label block mb-8">Business</span>

            {businessArticles[0] && (
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="relative h-80 lg:h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/30 to-[#A02EFF]/20 rounded-[28px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF2D8F] opacity-50 blur-xl" />
                  </div>
                </div>
                <div>
                  <Link href={businessArticles[0].href} className="group block">
                    <article className="petal-panel p-8">
                      <span className="kicker block mb-3">Analysis</span>
                      <h2 className="font-display font-black text-2xl lg:text-4xl leading-tight mb-4 group-hover:text-[#FF2D8F] transition-colors">
                        {businessArticles[0].article.title}
                      </h2>
                      <p className="excerpt mb-6">{businessArticles[0].article.excerpt}</p>
                      <span className="link-accent">
                        Explore the trend
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </article>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#F6F7FB]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[120vmin] h-[120vmin]">
            <BlossomSVG variant={4} />
          </div>
        </div>

        <div className="relative z-10 px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <span className="category-label block mb-8 text-right">Culture</span>

            {cultureArticles[0] && (
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <Link href={cultureArticles[0].href} className="group block">
                    <article className="petal-panel p-8">
                      <span className="kicker block mb-3">Spotlight</span>
                      <h2 className="font-display font-black text-2xl lg:text-4xl leading-tight mb-4 group-hover:text-[#FF2D8F] transition-colors">
                        {cultureArticles[0].article.title}
                      </h2>
                      <p className="excerpt mb-6">{cultureArticles[0].article.excerpt}</p>
                      <span className="link-accent">
                        See the list
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </article>
                  </Link>
                </div>
                <div className="order-1 lg:order-2 relative h-80 lg:h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D8F]/30 to-[#D0FF00]/20 rounded-[28px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#FF2D8F] to-[#2EE9FF] opacity-50 blur-xl" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Earth Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#F6F7FB]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[120vmin] h-[120vmin]">
            <BlossomSVG variant={5} />
          </div>
        </div>

        <div className="relative z-10 px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <span className="category-label block mb-8">Earth</span>

            {earthArticles[0] && (
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="relative h-80 lg:h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/30 to-[#2EE9FF]/20 rounded-[28px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#39FF14] to-[#2EE9FF] opacity-50 blur-xl" />
                  </div>
                </div>
                <div>
                  <Link href={earthArticles[0].href} className="group block">
                    <article className="petal-panel p-8">
                      <span className="kicker block mb-3">Field Notes</span>
                      <h2 className="font-display font-black text-2xl lg:text-4xl leading-tight mb-4 group-hover:text-[#FF2D8F] transition-colors">
                        {earthArticles[0].article.title}
                      </h2>
                      <p className="excerpt mb-6">{earthArticles[0].article.excerpt}</p>
                      <span className="link-accent">
                        Read the report
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </article>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#F6F7FB]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[120vmin] h-[120vmin]">
            <BlossomSVG variant={6} />
          </div>
        </div>

        <div className="relative z-10 px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <span className="category-label block mb-8 text-right">Science</span>

            {healthArticles[0] && (
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <Link href={healthArticles[0].href} className="group block">
                    <article className="petal-panel p-8">
                      <span className="kicker block mb-3">Discovery</span>
                      <h2 className="font-display font-black text-2xl lg:text-4xl leading-tight mb-4 group-hover:text-[#FF2D8F] transition-colors">
                        {healthArticles[0].article.title}
                      </h2>
                      <p className="excerpt mb-6">{healthArticles[0].article.excerpt}</p>
                      <span className="link-accent">
                        Dive deeper
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </article>
                  </Link>
                </div>
                <div className="order-1 lg:order-2 relative h-80 lg:h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#A02EFF]/30 to-[#FF2D8F]/20 rounded-[28px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#A02EFF] to-[#2EE9FF] opacity-50 blur-xl" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest Stories */}
      <section className="py-16 lg:py-24 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
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
              {articleCards.slice(3, 9).map((article) => (
                <Link key={article.article.id} href={article.href} className="group block article-card">
                  <article className="petal-panel p-4">
                    <div className="flex gap-4 items-start">
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D8F]/20 to-[#A02EFF]/20" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="category-label block mb-1">{article.article.category}</span>
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
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Most Read */}
      <section className="py-16 lg:py-24 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display font-black text-2xl lg:text-3xl uppercase tracking-tight mb-10">
              Most Read
            </h2>

            <div className="space-y-4">
              {articleCards.slice(0, 3).map((article, index) => (
                <Link key={article.article.id} href={article.href} className="group block">
                  <article className="petal-panel p-6 flex items-center gap-6">
                    <span className="font-display font-black text-4xl lg:text-5xl text-[#FF2D8F]/30">
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
      <section className="py-16 lg:py-24 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display font-black text-2xl lg:text-3xl uppercase tracking-tight mb-10">
              Browse by Topic
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siteConfig.categories.slice(0, 6).map((category, idx) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="group block"
                >
                  <div className="petal-panel p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
                      <BlossomSVG variant={((idx % 6) + 1) as 1|2|3|4|5|6} />
                    </div>
                    <h3 className="font-display font-bold text-xl group-hover:text-[#FF2D8F] transition-colors relative z-10">
                      {category.label}
                    </h3>
                    <span className="meta-text mt-2 block relative z-10">
                      {articles.filter(a => a.category === category.slug).length} articles
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter + Short Reads */}
      <section className="py-16 lg:py-24 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="petal-panel p-8 lg:p-10">
                <h2 className="font-display font-black text-2xl lg:text-3xl mb-4">
                  Get the morning brief
                </h2>
                <p className="excerpt mb-6">
                  Five stories, fresh context, zero fluff—delivered weekdays.
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
      <section className="py-16 lg:py-24 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="petal-panel overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-[#A02EFF]/30 to-[#FF2D8F]/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-[#FF2D8F] ml-1">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="category-label block mb-2">Podcast</span>
                  <h3 className="font-display font-bold text-lg">
                    Hacker-City Radio — Episode 42: The hardware comeback
                  </h3>
                </div>
              </div>

              <div className="petal-panel overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-[#2EE9FF]/30 to-[#A02EFF]/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-[#FF2D8F] ml-1">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="category-label block mb-2">Video</span>
                  <h3 className="font-display font-bold text-lg">
                    Studio visit: Rebuilding a newsroom
                  </h3>
                </div>
              </div>
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
