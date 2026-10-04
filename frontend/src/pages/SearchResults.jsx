import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchProducts, fetchCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import Loader from '../components/Loader';

export default function SearchResults() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const categoryId = params.get('category') || '';
  const sort = params.get('sort') || 'newest';

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    const apiParams = { sort, limit: 24 };
    if (query) apiParams.search = query;
    if (categoryId) apiParams.category = categoryId;
    if (params.get('featured')) apiParams.featured = params.get('featured');
    if (params.get('trending')) apiParams.trending = params.get('trending');

    fetchProducts(apiParams)
      .then((res) => {
        setProducts(res.products);
        setTotal(res.pagination.total);
      })
      .finally(() => setLoading(false));
  }, [query, categoryId, sort]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next);
  };

  return (
    <div className="container-page py-10">
      <Helmet>
        <title>{query ? `"${query}" — Search results` : 'Browse products'} | GlowPicks</title>
        <meta name="description" content="Search and filter our full product catalog by category, price and rating." />
      </Helmet>

      <h1 className="text-2xl sm:text-3xl font-semibold text-ink mb-2">
        {query ? `Results for "${query}"` : 'Browse all products'}
      </h1>
      <p className="text-ink/60 mb-6">{loading ? 'Searching…' : `${total} product${total !== 1 ? 's' : ''} found`}</p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <CategoryFilter categories={categories} selected={categoryId} onSelect={(id) => updateParam('category', id)} />
        <select
          value={sort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="rounded-md border border-ink/15 px-3 py-2 text-sm bg-white"
        >
          <option value="newest">Newest</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-ink/50">No products matched your search. Try a different term or filter.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}
