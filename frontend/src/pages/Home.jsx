import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchProducts, fetchCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

function Section({ title, subtitle, viewAllTo, children }) {
  return (
    <section className="container-page py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-ink">{title}</h2>
          {subtitle && <p className="text-ink/60 mt-1">{subtitle}</p>}
        </div>
        {viewAllTo && (
          <Link to={viewAllTo} className="hidden sm:inline text-sm font-semibold text-brand-700 hover:text-brand-800">
            View all
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [cats, featuredRes, trendingRes, dealsRes] = await Promise.all([
          fetchCategories(),
          fetchProducts({ featured: 'true', limit: 4 }),
          fetchProducts({ trending: 'true', limit: 4 }),
          fetchProducts({ deals: 'true', limit: 4 })
        ]);
        setCategories(cats);
        setFeatured(featuredRes.products);
        setTrending(trendingRes.products);
        setDeals(dealsRes.products);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader label="Loading products…" />;

  return (
    <div>
      <Helmet>
        <title>GlowPicks — Honest product picks & comparisons</title>
        <meta name="description" content="Discover top-rated products, compare prices, and find today's best deals — researched so you don't have to." />
      </Helmet>

      {/* Hero */}
      <section className="border-b border-ink/10 bg-gradient-to-b from-brand-50 to-paper">
        <div className="container-page py-16 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight text-ink">
              Find the right product,<br /> the first time.
            </h1>
            <p className="mt-5 text-lg text-ink/70 max-w-md">
              We test, compare, and track prices across categories — so every recommendation here is one we'd
              actually make to a friend.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/deals" className="btn-primary">Browse today's deals</Link>
              <Link to="/category/electronics" className="btn-secondary">Explore electronics</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {featured.slice(0, 2).map((p) => (
              <img
                key={p._id}
                src={p.images?.[0]}
                alt={p.name}
                className="rounded-lg object-cover aspect-square shadow-card"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-ink mb-6">Shop by category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/category/${cat.slug}`}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-ink/10 bg-white p-6 text-center hover:border-brand-400 hover:shadow-card transition"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="font-semibold text-ink text-sm">{cat.name}</span>
              <span className="text-xs text-ink/50">{cat.productCount} products</span>
            </Link>
          ))}
        </div>
      </section>

      <Section title="Featured picks" subtitle="Our top recommendations right now" viewAllTo="/search?featured=true">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </Section>

      <Section title="Trending now" subtitle="What readers are clicking this week" viewAllTo="/search?trending=true">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trending.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </Section>

      <Section title="Today's deals" subtitle="Limited-time price drops" viewAllTo="/deals">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {deals.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </Section>
    </div>
  );
}
