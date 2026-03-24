import BlossomSVG from '@/components/BlossomSVG';

export const revalidate = 300;

/** Terms of service page. */
export default function TermsPage() {
  return (
    <>
      <section className="relative min-h-[40vh] flex flex-col justify-center overflow-hidden bg-[#F6F7FB]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[80vmin] h-[80vmin]">
            <BlossomSVG variant={1} />
          </div>
        </div>

        <div className="relative z-10 px-6 lg:px-12 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="hero-headline text-[#0B0C10] mb-6">
              Terms of Service
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="petal-panel p-8 lg:p-12 prose prose-lg">
              <p>Last updated: March 2026</p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using Hacker-City, you agree to be bound by these Terms of Service.
              </p>

              <h2>2. Use of Content</h2>
              <p>
                All content on Hacker-City is for informational purposes only. You may not
                reproduce, distribute, or create derivative works without our permission.
              </p>

              <h2>3. User Conduct</h2>
              <p>
                You agree not to use our website for any unlawful purpose or in any way that
                could damage, disable, and impair our services.
              </p>

              <h2>4. Disclaimer</h2>
              <p>
                The content on Hacker-City is provided &quot;as is&quot; without warranties of any kind.
              </p>

              <h2>5. Contact</h2>
              <p>
                For questions about these terms, please contact{' '}
                <a href="mailto:legal@hacker-city.io">legal@hacker-city.io</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
