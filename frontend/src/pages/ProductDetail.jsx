import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchProductBySlug, recordAffiliateClick } from '../services/api';
import RatingStars from '../components/RatingStars';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

export default function ProductDetail() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setActiveImage(0);
    fetchProductBySlug(slug)
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader label="Loading product…" />;
  if (error || !data) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <Link to="/" className="btn-primary mt-6 inline-flex">Back to homepage</Link>
      </div>
    );
  }

  const { product, related } = data;

  const handleBuyNow = async () => {
    try {
      const { affiliateUrl } = await recordAffiliateClick(product._id);
      window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const pageTitle = product.seoTitle || `${product.name} — Review, Price & Where to Buy`;
  const pageDesc = product.seoDescription || product.shortDescription;

  return (
    <div className="container-page py-10">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`${window.location.origin}/product/${product.slug}`} />
      </Helmet>

      {/* Breadcrumb */}
      <nav className="text-sm text-ink/50 mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        {product.category && (
          <>
            <Link to={`/category/${product.category.slug}`} className="hover:text-ink">{product.category.name}</Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-ink/80">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-lg overflow-hidden border border-ink/10 bg-white">
            <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 ${i === activeImage ? 'border-brand-600' : 'border-transparent'}`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.brand && <p className="text-sm font-medium text-brand-700">{product.brand}</p>}
          <h1 className="text-3xl font-semibold text-ink mt-1">{product.name}</h1>
          <div className="mt-3"><RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" /></div>

          <p className="mt-5 text-ink/70 leading-relaxed">{product.shortDescription}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-ink">₹{product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-ink/40 line-through">₹{product.originalPrice.toFixed(2)}</span>
                <span className="rounded-full bg-clay/10 text-clay text-sm font-semibold px-2.5 py-1">
                  Save {product.discountPercent}%
                </span>
              </>
            )}
          </div>

          <button onClick={handleBuyNow} className="btn-primary w-full sm:w-auto mt-6 text-base px-8 py-3">
            Buy Now / Check Price
          </button>
          <p className="text-xs text-ink/50 mt-2">
            You'll be redirected to {product.affiliateNetwork || 'our retail partner'} to complete your purchase.{' '}
            <Link to="/affiliate-disclosure" className="underline">Why we link out</Link>.
          </p>

          {product.features?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-ink mb-3">Key features</h2>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex gap-2 text-sm text-ink/80">
                    <span className="text-brand-600 mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mt-14 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-ink mb-3">Full description</h2>
          <p className="text-ink/75 leading-relaxed whitespace-pre-line">{product.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
          {product.pros?.length > 0 && (
            <div className="rounded-lg border border-brand-200 bg-brand-50 p-5">
              <h3 className="font-semibold text-brand-800 mb-3">Pros</h3>
              <ul className="space-y-2 text-sm text-brand-900/80">
                {product.pros.map((p, i) => <li key={i} className="flex gap-2"><span>+</span>{p}</li>)}
              </ul>
            </div>
          )}
          {product.cons?.length > 0 && (
            <div className="rounded-lg border border-ink/10 bg-white p-5">
              <h3 className="font-semibold text-ink mb-3">Cons</h3>
              <ul className="space-y-2 text-sm text-ink/70">
                {product.cons.map((c, i) => <li key={i} className="flex gap-2"><span>−</span>{c}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 text-center">
        <button onClick={handleBuyNow} className="btn-primary text-base px-8 py-3">
          Buy Now / Check Price
        </button>
      </div>

      {/* Related */}
      {related?.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-ink mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
