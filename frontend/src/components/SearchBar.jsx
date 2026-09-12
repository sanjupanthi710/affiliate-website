import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchBar({ className = '' }) {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`} role="search">
      <label htmlFor="site-search" className="sr-only">Search products</label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products (e.g. headphones, laptop)…"
        className="w-full rounded-md border border-ink/15 bg-white pl-4 pr-12 py-2.5 text-sm focus:border-brand-500"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-ink/50 hover:text-brand-600"
      >
        <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
          <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M14.5 14.5L18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}
