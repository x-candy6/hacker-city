import Link from 'next/link';
import { siteConfig } from '@/lib/config';

/** Site footer with category links, company links, and social links. */
export default function Footer() {
  const mainCategories = siteConfig.categories.slice(0, 6);

  return (
    <footer className="bg-[#0B0C10] text-white py-16 lg:py-20">
      <div className="px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <Link href="/" className="font-display font-black text-2xl tracking-tight text-white block mb-4">
                Hacker-City
              </Link>
              <p className="text-white/60 text-sm leading-relaxed">
                Bright news for a curious world. Tech, business, culture, earth, and science.
              </p>
            </div>

            <div>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4">
                Categories
              </h4>
              <ul className="space-y-2">
                {mainCategories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/${category.slug}`}
                      className="footer-link text-white/60 hover:text-white"
                    >
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="footer-link text-white/60 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="footer-link text-white/60 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="footer-link text-white/60 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/advertise" className="footer-link text-white/60 hover:text-white">
                    Advertise
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4">
                Connect
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://twitter.com/hackercity" target="_blank" rel="noopener noreferrer" className="footer-link text-white/60 hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/company/hackercity" target="_blank" rel="noopener noreferrer" className="footer-link text-white/60 hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/hackercity" target="_blank" rel="noopener noreferrer" className="footer-link text-white/60 hover:text-white">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Hacker-City. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-white/40 text-sm hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-white/40 text-sm hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/accessibility" className="text-white/40 text-sm hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
