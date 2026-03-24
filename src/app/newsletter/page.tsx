import BlossomSVG from '@/components/BlossomSVG';

export const revalidate = 300;

/** Newsletter subscription page. */
export default function NewsletterPage() {
  return (
    <>
      <section className="relative min-h-[50vh] flex flex-col justify-center overflow-hidden bg-[#F6F7FB]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[80vmin] h-[80vmin]">
            <BlossomSVG variant={1} />
          </div>
        </div>

        <div className="relative z-10 px-6 lg:px-12 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="hero-headline text-[#0B0C10] mb-6">
              Get the Brief
            </h1>
            <p className="text-[#6B7280] text-lg lg:text-xl max-w-2xl mx-auto">
              Five stories, fresh context, zero fluff—delivered to your inbox every weekday morning.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="petal-panel p-8 lg:p-12">
              <form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block font-medium mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    className="newsletter-input"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block font-medium mb-2">
                    First name (optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="newsletter-input"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1"
                  />
                  <label htmlFor="consent" className="text-sm text-[#6B7280]">
                    I agree to receive the Hacker-City morning brief and related communications.
                    You can unsubscribe at any time.
                  </label>
                </div>

                <button type="submit" className="btn-accent w-full">
                  Subscribe
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-black/5">
                <p className="text-sm text-[#6B7280] text-center">
                  We respect your privacy. No spam, ever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-black text-2xl lg:text-3xl mb-10 text-center">
              What to Expect
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="petal-panel p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FF2D8F]/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FF2D8F]">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">Curated Stories</h3>
                <p className="excerpt text-sm">Five essential stories handpicked by our editors every morning.</p>
              </div>

              <div className="petal-panel p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FF2D8F]/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FF2D8F]">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">5-Minute Read</h3>
                <p className="excerpt text-sm">Get up to speed quickly with our concise, context-rich format.</p>
              </div>

              <div className="petal-panel p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FF2D8F]/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FF2D8F]">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">No Clutter</h3>
                <p className="excerpt text-sm">Clean design, zero ads, just the stories that matter.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
