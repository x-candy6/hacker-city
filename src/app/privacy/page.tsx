import BlossomSVG from '@/components/BlossomSVG';

export const revalidate = 300;

/** Privacy policy page. */
export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="petal-panel p-8 lg:p-12 prose prose-lg">
              <p>Last updated: March 2026</p>

              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you
                subscribe to our newsletter, contact us, or interact with our website.
              </p>

              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve
                our services, to communicate with you, and to personalize your experience.
              </p>

              <h2>3. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information
                to third parties without your consent, except as described in this policy.
              </p>

              <h2>4. Cookies</h2>
              <p>
                We use cookies to enhance your experience on our website. You can choose
                to disable cookies through your browser settings.
              </p>

              <h2>5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@hacker-city.io">privacy@hacker-city.io</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
