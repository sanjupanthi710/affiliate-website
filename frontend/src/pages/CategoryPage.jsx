import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchCategoryBySlug, fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetchCategoryBySlug(slug)
      .then(async (cat) => {
        setCategory(cat);
        const res = await fetchProducts({ category: cat._id, sort, limit: 24 });
        setProducts(res.products);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug, sort]);

  if (loading) return <Loader />;
  if (notFound) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-semibold">Category not found</h1>
        <Link to="/" className="btn-primary mt-6 inline-flex">Back to homepage</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <Helmet>
        <title>{category.name} — Best {category.name} Picks & Deals | glowPicks</title>
        <meta name="description" content={category.description || `Compare top-rated ${category.name.toLowerCase()} products and find the best price.`} />
      </Helmet>

      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{category.icon}</span>
        <h1 className="text-2xl sm:text-3xl font-semibold text-ink">{category.name}</h1>
      </div>
      <p className="text-ink/60 mb-8 max-w-2xl">{category.description}</p>

      <div className="flex justify-end mb-6">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-md border border-ink/15 px-3 py-2 text-sm bg-white"
        >
          <option value="newest">Newest</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-ink/50">No products in this category yet — check back soon.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}
