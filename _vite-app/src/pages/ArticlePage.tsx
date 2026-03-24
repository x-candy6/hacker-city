import { useParams, Link } from 'react-router-dom';
import { mockArticles, renderMarkdown, findRelatedArticles, siteConfig } from '@/lib/data';
import BlossomSVG from '@/components/BlossomSVG';

export default function ArticlePage() {
  const { category: categorySlug, slug } = useParams<{ category: string; slug: string }>();
  
  const article = mockArticles.find((a: typeof mockArticles[number]) => a.slug === slug);
  const category = siteConfig.categories.find((c: typeof siteConfig.categories[number]) => c.slug === article?.category);
  
  if (!article || article.category !== categorySlug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F7FB]">
        <div className="text-center">
          <h1 className="font-display font-black text-4xl mb-4">Article Not Found</h1>
          <Link to="/" className="link-accent">Back to home</Link>
        </div>
      </div>
    );
  }

  const htmlBody = renderMarkdown(article.body);
  const related = findRelatedArticles(article, mockArticles, 5);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

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

  return (
    <>
      <section className="relative min-h-[50vh] flex flex-col justify-center overflow-hidden bg-[#F6F7FB]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[80vmin] h-[80vmin]">
            <BlossomSVG variant={blossomVariant} />
          </div>
        </div>

        <div className="relative z-10 px-6 lg:px-12 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto">
            <nav className="breadcrumb mb-6">
              <Link to="/">Home</Link>
              <span className="breadcrumb-separator">/</span>
              <Link to={`/${article.category}`}>{category?.label || article.category}</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="text-[#0B0C10] truncate max-w-[200px] inline-block align-bottom">{article.title}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="kicker">{category?.label || article.category}</span>
              <span className="text-[#6B7280]">|</span>
              <span className="meta-text">{formattedDate}</span>
              <span className="text-[#6B7280]">|</span>
              <span className="reading-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {article.readingTime} min read
              </span>
            </div>

            <h1 className="font-display font-black text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
              {article.title}
            </h1>

            <p className="excerpt text-lg lg:text-xl">{article.excerpt}</p>

            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {article.tags.map((tag: string) => (
                  <span key={tag} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <article className="petal-panel p-8 lg:p-12">
                  <div className="relative h-64 lg:h-96 mb-8 rounded-[28px] overflow-hidden bg-gradient-to-br from-[#FF2D8F]/10 to-[#A02EFF]/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF2D8F]/40 to-[#A02EFF]/30 blur-xl" />
                    </div>
                  </div>

                  {article.author && (
                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-black/5">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF2D8F] to-[#A02EFF] flex items-center justify-center text-white font-bold">
                        {article.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{article.author}</p>
                        <p className="meta-text">Contributor</p>
                      </div>
                    </div>
                  )}

                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: htmlBody }}
                  />

                  <div className="mt-12 pt-8 border-t border-black/5">
                    <p className="category-label mb-4">Share this story</p>
                    <div className="flex gap-3">
                      <button className="p-3 rounded-full bg-black/5 hover:bg-[#FF2D8F] hover:text-white transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </button>
                      <button className="p-3 rounded-full bg-black/5 hover:bg-[#FF2D8F] hover:text-white transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </button>
                      <button className="p-3 rounded-full bg-black/5 hover:bg-[#FF2D8F] hover:text-white transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                          <polyline points="16 6 12 2 8 6" />
                          <line x1="12" y1="2" x2="12" y2="15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              </div>

              <aside className="space-y-6">
                {related.length > 0 && (
                  <div className="petal-panel p-6">
                    <h3 className="font-display font-bold text-lg mb-6">Related Stories</h3>
                    <div className="space-y-0">
                      {related.map(({ article: relatedArticle, href, matchType }: typeof related[number]) => (
                        <Link
                          key={relatedArticle.id}
                          to={href}
                          className="related-article group block"
                        >
                          <article className="flex gap-4 items-start">
                            <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D8F]/20 to-[#A02EFF]/20" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-medium text-[#FF2D8F] mb-1 block">
                                {matchType === 'subcategory' ? 'Same topic' : matchType === 'category' ? 'Same category' : 'Related'}
                              </span>
                              <h4 className="font-display font-bold text-sm leading-tight line-clamp-2 group-hover:text-[#FF2D8F] transition-colors">
                                {relatedArticle.title}
                              </h4>
                              <span className="meta-text mt-1 block">
                                {new Date(relatedArticle.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="petal-panel p-6">
                  <h3 className="font-display font-bold text-lg mb-3">
                    Get the brief
                  </h3>
                  <p className="excerpt text-sm mb-4">
                    Five stories, fresh context, zero fluff.
                  </p>
                  <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="newsletter-input text-sm py-2"
                    />
                    <button type="submit" className="btn-accent text-sm">
                      Subscribe
                    </button>
                  </form>
                </div>

                <div className="petal-panel p-6">
                  <h3 className="font-display font-bold text-lg mb-3">
                    More in {category?.label || article.category}
                  </h3>
                  <Link
                    to={`/${article.category}`}
                    className="link-accent text-sm"
                  >
                    View all stories
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {related[0] && (
        <section className="py-12 lg:py-16 bg-[#F6F7FB] border-t border-black/5">
          <div className="px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <p className="category-label mb-4">Next story</p>
              <Link to={related[0].href} className="group block">
                <article className="petal-panel p-8">
                  <h2 className="font-display font-black text-2xl lg:text-3xl group-hover:text-[#FF2D8F] transition-colors">
                    {related[0].article.title}
                  </h2>
                  <p className="excerpt mt-3">{related[0].article.excerpt}</p>
                </article>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
