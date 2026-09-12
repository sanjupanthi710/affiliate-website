export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-ink/50 gap-3" role="status">
      <div className="w-8 h-8 rounded-full border-2 border-ink/15 border-t-brand-600 animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
