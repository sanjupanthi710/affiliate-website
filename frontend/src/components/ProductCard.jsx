import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';
import { recordAffiliateClick } from '../services/api';

export default function ProductCard({ product }) {
  const { name, slug, images, price, originalPrice, rating, reviewCount, discountPercent, _id } = product;

  const handleViewDeal = async (e) => {
    e.preventDefault();
    try {
      const { affiliateUrl } = await recordAffiliateClick(_id);
      window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // fail-safe: if tracking fails, still let the user reach the product page
      window.location.href = `/product/${slug}`;
    }
  };

  return (
    <div className="group relative flex flex-col rounded-lg border border-ink/10 bg-white overflow-hidden shadow-card hover:shadow-lg transition-shadow">
      {discountPercent > 0 && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-clay text-white text-xs font-semibold px-2.5 py-1">
          -{discountPercent}%
        </span>
      )}
      <Link to={`/product/${slug}`} className="block aspect-[4/3] overflow-hidden bg-paper">
        <img
          src={images?.[0]}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </Link>
      <div className="flex flex-col flex-1 p-4 gap-2">
        <Link to={`/product/${slug}`} className="font-semibold text-ink leading-snug line-clamp-2 hover:text-brand-700">
          {name}
        </Link>
        <RatingStars rating={rating} reviewCount={reviewCount} />
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-bold text-ink">₹{price?.toFixed(2)}</span>
          {originalPrice > price && (
            <span className="text-sm text-ink/40 line-through">₹{originalPrice.toFixed(2)}</span>
          )}
        </div>
        <button onClick={handleViewDeal} className="btn-primary mt-2 w-full">
          View Deal
        </button>
      </div>
    </div>
  );
}
