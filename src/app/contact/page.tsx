import BlossomSVG from '@/components/BlossomSVG';

export const revalidate = 300;

/** Contact page with form and contact info cards. */
export default function ContactPage() {
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
              Get in Touch
            </h1>
            <p className="text-[#6B7280] text-lg lg:text-xl max-w-2xl mx-auto">
              Pitch a story, propose a partnership, or just say hello. We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="petal-panel p-8 lg:p-12">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your name"
                      className="newsletter-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      className="newsletter-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block font-medium mb-2">
                    Subject
                  </label>
                  <select id="subject" className="newsletter-input">
                    <option>Story pitch</option>
                    <option>Partnership inquiry</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    className="newsletter-input resize-none"
                  />
                </div>

                <button type="submit" className="btn-accent w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="petal-panel p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FF2D8F]/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FF2D8F]">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">Email</h3>
                <a href="mailto:hello@hacker-city.io" className="text-[#FF2D8F] hover:underline">
                  hello@hacker-city.io
                </a>
              </div>

              <div className="petal-panel p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FF2D8F]/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FF2D8F]">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">Twitter</h3>
                <a href="https://twitter.com/hackercity" target="_blank" rel="noopener noreferrer" className="text-[#FF2D8F] hover:underline">
                  @hackercity
                </a>
              </div>

              <div className="petal-panel p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FF2D8F]/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FF2D8F]">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">LinkedIn</h3>
                <a href="https://linkedin.com/company/hackercity" target="_blank" rel="noopener noreferrer" className="text-[#FF2D8F] hover:underline">
                  Hacker-City
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
