export default function CategoryFilter({ categories = [], selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
          !selected ? 'bg-ink text-white border-ink' : 'border-ink/15 text-ink/70 hover:border-ink/30'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onSelect(cat._id)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            selected === cat._id ? 'bg-ink text-white border-ink' : 'border-ink/15 text-ink/70 hover:border-ink/30'
          }`}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
}
