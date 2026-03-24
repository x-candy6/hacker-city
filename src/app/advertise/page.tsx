import BlossomSVG from '@/components/BlossomSVG';

export const revalidate = 300;

/** Advertise page with audience stats. */
export default function AdvertisePage() {
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
              Advertise
            </h1>
            <p className="text-[#6B7280] text-lg lg:text-xl max-w-2xl mx-auto">
              Reach a curated audience of tech-savvy professionals and curious minds.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="petal-panel p-8 lg:p-12">
              <h2 className="font-display font-bold text-2xl mb-6">Why Hacker-City?</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <p className="font-display font-black text-3xl text-[#FF2D8F]">500K+</p>
                  <p className="excerpt text-sm">Monthly readers</p>
                </div>
                <div className="text-center">
                  <p className="font-display font-black text-3xl text-[#FF2D8F]">85%</p>
                  <p className="excerpt text-sm">Tech professionals</p>
                </div>
                <div className="text-center">
                  <p className="font-display font-black text-3xl text-[#FF2D8F]">4.5min</p>
                  <p className="excerpt text-sm">Avg. time on site</p>
                </div>
              </div>

              <p className="text-[#6B7280] mb-6">
                Our audience consists of founders, engineers, designers, and decision-makers
                who care about technology, business, and culture. They trust us to deliver
                stories that matter—without the fluff.
              </p>

              <p className="text-[#6B7280]">
                For advertising inquiries, please contact{' '}
                <a href="mailto:ads@hacker-city.io" className="text-[#FF2D8F] hover:underline">
                  ads@hacker-city.io
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
