import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

export default function Deals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ deals: 'true', sort: 'newest', limit: 48 })
      .then((res) => setProducts(res.products))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-page py-10">
      <Helmet>
        <title>Today's Deals — Best Current Discounts | glowPicks</title>
        <meta name="description" content="Browse today's best product deals and limited-time price drops, updated regularly." />
      </Helmet>
      <h1 className="text-2xl sm:text-3xl font-semibold text-ink mb-2">Today's Deals</h1>
      <p className="text-ink/60 mb-8">Hand-picked discounts, refreshed regularly.</p>

      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-ink/50">No active deals right now — check back soon.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}
