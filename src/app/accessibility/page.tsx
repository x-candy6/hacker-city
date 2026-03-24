import BlossomSVG from '@/components/BlossomSVG';

export const revalidate = 300;

/** Accessibility statement page. */
export default function AccessibilityPage() {
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
              Accessibility
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="petal-panel p-8 lg:p-12 prose prose-lg">
              <p>
                Hacker-City is committed to ensuring digital accessibility for people with disabilities.
              </p>

              <h2>Our Commitment</h2>
              <p>
                We are continually improving the user experience for everyone and applying
                relevant accessibility standards to ensure our website is accessible to
                people with disabilities.
              </p>

              <h2>Accessibility Features</h2>
              <ul>
                <li>Keyboard navigation support</li>
                <li>Screen reader compatibility</li>
                <li>Text resizing options</li>
                <li>High contrast mode support</li>
                <li>Alt text for images</li>
              </ul>

              <h2>Feedback</h2>
              <p>
                If you encounter any accessibility barriers or have suggestions for improvement,
                please contact us at{' '}
                <a href="mailto:accessibility@hacker-city.io">accessibility@hacker-city.io</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
