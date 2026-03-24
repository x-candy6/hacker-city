import BlossomSVG from '@/components/BlossomSVG';

export default function CareersPage() {
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
              Careers
            </h1>
            <p className="text-[#6B7280] text-lg lg:text-xl max-w-2xl mx-auto">
              Join our team and help shape the future of news.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#F6F7FB]">
        <div className="px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="petal-panel p-8 lg:p-12">
              <h2 className="font-display font-bold text-2xl mb-6">Open Positions</h2>
              
              <div className="space-y-4">
                <div className="p-4 border border-black/10 rounded-xl hover:border-[#FF2D8F] transition-colors cursor-pointer">
                  <h3 className="font-display font-bold text-lg">Senior Technology Reporter</h3>
                  <p className="excerpt text-sm mt-1">Remote • Full-time</p>
                </div>
                
                <div className="p-4 border border-black/10 rounded-xl hover:border-[#FF2D8F] transition-colors cursor-pointer">
                  <h3 className="font-display font-bold text-lg">Staff Writer, Business</h3>
                  <p className="excerpt text-sm mt-1">Remote • Full-time</p>
                </div>
                
                <div className="p-4 border border-black/10 rounded-xl hover:border-[#FF2D8F] transition-colors cursor-pointer">
                  <h3 className="font-display font-bold text-lg">Product Designer</h3>
                  <p className="excerpt text-sm mt-1">Remote • Full-time</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-black/5">
                <p className="text-[#6B7280]">
                  Don&apos;t see a role that fits? We&apos;re always interested in meeting talented 
                  people. Send us a note at{' '}
                  <a href="mailto:careers@hacker-city.io" className="text-[#FF2D8F] hover:underline">
                    careers@hacker-city.io
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
