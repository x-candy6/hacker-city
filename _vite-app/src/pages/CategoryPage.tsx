import { useParams, Link } from 'react-router-dom';
import { mockArticles, prepareArticleCard, siteConfig } from '@/lib/data';
import BlossomSVG from '@/components/BlossomSVG';

export default function CategoryPage() {
  const { category: categorySlug } = useParams<{ category: string }>();
  const category = siteConfig.categories.find((c: typeof siteConfig.categories[number]) => c.slug === categorySlug);
  
  const articles = mockArticles.filter((a: typeof mockArticles[number]) => a.category === categorySlug);
  const articleCards = articles.map(prepareArticleCard);
  const subCategories = category?.subCategories || [];

  const categoryToVariant: Record<string, 1 | 2 | 3 | 4 | 5 | 6> = {
    technology: 2,
    business: 3,
    culture: 4,
    earth: 5,
    health: 6,
    news: 1,
    sport: 2,
    arts: 4,
    travel: 5,
  };
  const blossomVariant = categoryToVariant[categorySlug || ''] || 1;

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F7FB]">
        <div className="text-center">
          <h1 className="font-display font-black text-4xl mb-4">Category Not Found</h1>
          <Link to="/" className="link-accent">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden bg-[#F6F7FB]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
          <div className="w-[100vmin] h-[100vmin]">
            <BlossomSVG variant={blossomVariant} />
          </div>
        </div>

        <div className="relative z-10 px-6 lg:px-12 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <nav className="breadcrumb mb-6">
              <Link to="/">Home</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="text-[#0B0C10]">{category.label}</span>
            </nav>

            <h1 className="hero-headline text-[#0B0C10] mb-4">
              {category.label}
            </h1>
            <p className="text-[#6B7280] text-lg max-w-2xl">
              Latest stories, analysis, and insights from the world of {category.label.toLowerCase()}.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 bg-[#F6F7FB] border-b border-black/5">
        <div className="px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2">
              <button className="subcategory-button active">All</button>
              {subCategories.map((sub: typeof subCategories[number]) => (
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
              <>
                {articleCards[0] && (
                  <div className="mb-10">
                    <Link to={articleCards[0].href} className="group block">
                      <article className="petal-panel overflow-hidden">
                        <div className="grid lg:grid-cols-2">
                          <div className="relative h-64 lg:h-full min-h-[350px] bg-gradient-to-br from-[#FF2D8F]/10 to-[#A02EFF]/10">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#FF2D8F]/40 to-[#A02EFF]/30 blur-xl" />
                            </div>
                          </div>
                          <div className="p-6 lg:p-10 flex flex-col justify-center">
                            <span className="kicker block mb-3">Featured</span>
                            <h2 className="font-display font-black text-2xl lg:text-3xl leading-tight mb-4 group-hover:text-[#FF2D8F] transition-colors">
                              {articleCards[0].article.title}
                            </h2>
                            <p className="excerpt mb-6">{articleCards[0].article.excerpt}</p>
                            <div className="flex items-center gap-4 mb-6">
                              <span className="meta-text">{articleCards[0].formattedDate}</span>
                              <span className="reading-time">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                                {articleCards[0].article.readingTime} min
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {articleCards.slice(1).map((article: typeof articleCards[number]) => (
                    <Link key={article.article.id} to={article.href} className="group block article-card">
                      <article className="petal-panel overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D8F]/10 to-[#A02EFF]/10 article-card-image" />
                        </div>
                        <div className="p-5">
                          <span className="category-label block mb-2">{article.article.category}</span>
                          <h3 className="font-display font-bold text-lg leading-tight mb-2 group-hover:text-[#FF2D8F] transition-colors">
                            {article.article.title}
                          </h3>
                          <div className="flex items-center gap-4">
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
                      </article>
                    </Link>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button className="pagination-button active">1</button>
                  <button className="pagination-button">2</button>
                  <button className="pagination-button">3</button>
                  <span className="px-2">...</span>
                  <button className="pagination-button">Next</button>
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-[#6B7280] text-lg">
                  No articles found in this category yet.
                </p>
                <Link to="/" className="link-accent mt-4 inline-flex">
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
