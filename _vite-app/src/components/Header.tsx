import { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/lib/data';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mainCategories = siteConfig.categories.slice(0, 6);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F6F7FB]/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 lg:px-12 py-4">
          <Link to="/" className="font-display font-black text-xl tracking-tight text-[#0B0C10]">
            Hacker-City
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {mainCategories.map((category: typeof siteConfig.categories[number]) => (
              <Link
                key={category.slug}
                to={`/${category.slug}`}
                className="nav-link"
              >
                {category.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/newsletter"
              className="hidden sm:inline-flex btn-accent text-sm"
            >
              Subscribe
            </Link>
            
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 -mr-2"
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between mb-8">
          <span className="font-display font-black text-xl">Hacker-City</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-display font-bold"
          >
            Home
          </Link>
          {siteConfig.categories.map((category: typeof siteConfig.categories[number]) => (
            <Link
              key={category.slug}
              to={`/${category.slug}`}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-display font-bold"
            >
              {category.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <Link
            to="/newsletter"
            onClick={() => setMenuOpen(false)}
            className="btn-accent w-full text-center block"
          >
            Get the brief
          </Link>
        </div>
      </div>
    </>
  );
}
