// Renders a 5-star rating using simple inline SVGs (no icon lib dependency).
const Star = ({ fill }) => (
  <svg viewBox="0 0 20 20" className="w-4 h-4" aria-hidden="true">
    <defs>
      <linearGradient id={`grad-${fill}`}>
        <stop offset={`${fill * 100}%`} stopColor="#1F8B73" />
        <stop offset={`${fill * 100}%`} stopColor="#D8D3C8" />
      </linearGradient>
    </defs>
    <path
      fill={`url(#grad-${fill})`}
      d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85z"
    />
  </svg>
);

export default function RatingStars({ rating = 0, reviewCount, size = 'sm' }) {
  const stars = [0, 1, 2, 3, 4].map((i) => Math.max(0, Math.min(1, rating - i)));
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      <div className="flex">
        {stars.map((fill, i) => (
          <Star key={i} fill={fill} />
        ))}
      </div>
      <span className={`text-ink/70 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        {rating?.toFixed(1)}
        {reviewCount !== undefined && <span className="text-ink/50"> ({reviewCount.toLocaleString()})</span>}
      </span>
    </div>
  );
}
