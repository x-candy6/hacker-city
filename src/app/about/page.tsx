import BlossomSVG from '@/components/BlossomSVG';

export const revalidate = 300;

/** About page with company mission and values. */
export default function AboutPage() {
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
              About Hacker-City
            </h1>
            <p className="text-[#6B7280] text-lg lg:text-xl max-w-2xl mx-auto">
              Bright news for a curious world.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="petal-panel p-8 lg:p-12 prose prose-lg">
              <p>
                Hacker-City is a modern news publication covering technology, business, culture,
                earth, and science. We believe in delivering stories with context, depth, and
                clarity—without the noise.
              </p>
              <p>
                Our mission is to help curious readers stay informed about the forces shaping
                our world. From the latest in AI and startups to environmental breakthroughs
                and cultural movements, we bring you the stories that matter.
              </p>
              <h2>Our Values</h2>
              <ul>
                <li><strong>Depth over clicks:</strong> We prioritize understanding over sensationalism.</li>
                <li><strong>Context matters:</strong> Every story includes the background you need.</li>
                <li><strong>Design-first:</strong> Beautiful, readable, accessible content.</li>
                <li><strong>Independent:</strong> Free from corporate influence and political bias.</li>
              </ul>
              <h2>The Team</h2>
              <p>
                Hacker-City is powered by a small team of journalists, editors, and designers
                who are passionate about storytelling. We&apos;re always looking for new voices
                and perspectives.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
