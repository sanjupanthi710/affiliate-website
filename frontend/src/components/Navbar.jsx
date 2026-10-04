import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'GlowPicks';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Deals', to: '/deals' },
    { label: 'Electronics', to: '/category/electronics' },
    { label: 'Fitness', to: '/category/fitness' },
    { label: 'Home & Kitchen', to: '/category/home-kitchen' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-ink/10">
      <div className="container-page flex items-center gap-4 h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span className="text-xl font-display font-semibold text-ink">{SITE_NAME}</span>
        </Link>

        <SearchBar className="hidden md:block flex-1 max-w-md" />

        <nav className="hidden lg:flex items-center gap-6 ml-auto">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-sm font-medium text-ink/70 hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="lg:hidden ml-auto p-2 text-ink"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></svg>
          )}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink/10 bg-paper">
          <div className="container-page py-4 flex flex-col gap-4">
            <SearchBar />
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="text-sm font-medium text-ink/80" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
