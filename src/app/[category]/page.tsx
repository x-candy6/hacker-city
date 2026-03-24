import Link from 'next/link';
import { contentClient } from '@/lib/content';
import { prepareArticleCard } from '@stackmatix/cms-core';
import { siteConfig } from '@/lib/config';

export const revalidate = 300;

/** Map category slug to its brand color. */
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    technology: '#2EE9FF', business: '#FF6A00', culture: '#FF2D8F',
    earth: '#39FF14', health: '#A02EFF', news: '#FF2D8F',
    sport: '#2EE9FF', arts: '#D0FF00', travel: '#39FF14',
  };
  return colors[category] ?? '#FF2D8F';
}

/** Generate static params for all known categories. */
export async function generateStaticParams() {
  return siteConfig.categories.map((c) => ({ category: c.slug }));
}

/** Category listing page -- text-focused Frutiger Metro layout. */
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = siteConfig.categories.find(c => c.slug === categorySlug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F7FB]">
        <div className="text-center">
          <h1 className="font-display font-black text-4xl mb-4">Category Not Found</h1>
          <Link href="/" className="link-accent">Back to home</Link>
        </div>
      </div>
    );
  }

  const articles = await contentClient.getArticlesByCategory(categorySlug);
  const articleCards = articles.map(prepareArticleCard);
  const color = getCategoryColor(categorySlug);

  const fullCategory = await contentClient.getCategory(categorySlug);
  const subCategories = fullCategory?.subCategories ?? [];

  return (
    <>
      <section className="relative min-h-[40vh] flex flex-col justify-end overflow-hidden bg-[#0B0C10]">
        <div className="relative z-10 px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <nav className="breadcrumb mb-6">
              <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">Home</Link>
              <span className="breadcrumb-separator text-white/30">/</span>
              <span className="text-white/80">{category.label}</span>
            </nav>

            <h1
              className="font-display font-black text-6xl lg:text-8xl tracking-tight leading-none mb-4"
              style={{ color }}
            >
              {category.label}
            </h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Latest stories, analysis, and insights from the world of {category.label.toLowerCase()}.
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: color }}
        />
      </section>

      <section className="py-6 bg-[#F6F7FB] border-b border-black/5">
        <div className="px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2">
              <button className="subcategory-button active">All</button>
              {subCategories.map((sub) => (
                <button key={sub.slug} className="subcategory-button">
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {articleCards.length > 0 ? (
              <div className="flex flex-col gap-4">
                {articleCards.map((card) => (
                  <Link key={card.article.id} href={card.href} className="group block">
                    <article
                      className="bg-white rounded-lg border border-black/5 p-5 lg:p-6 border-l-4 transition-shadow hover:shadow-md"
                      style={{ borderLeftColor: color }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h2 className="font-display font-bold text-lg lg:text-xl leading-tight mb-2 group-hover:text-[#0B0C10]/70 transition-colors">
                            {card.article.title}
                          </h2>
                          <p className="text-[#6B7280] text-sm leading-relaxed mb-3 line-clamp-2">
                            {card.article.excerpt}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-[#9CA3AF]">
                            <span>{card.formattedDate}</span>
                            <span className="flex items-center gap-1">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              {card.article.readingTime} min
                            </span>
                            {card.article.tags && card.article.tags.length > 0 && (
                              <div className="flex gap-1.5">
                                {card.article.tags.slice(0, 3).map((tag: string) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide"
                                    style={{ backgroundColor: `${color}15`, color }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-[#6B7280] text-lg">
                  No articles found in this category yet.
                </p>
                <Link href="/" className="link-accent mt-4 inline-flex">
                  Back to home
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
