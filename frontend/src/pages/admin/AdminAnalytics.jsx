import { useEffect, useState } from 'react';
import { fetchAnalyticsOverview, fetchClicks } from '../../services/api';
import Loader from '../../components/Loader';

export default function AdminAnalytics() {
  const [overview, setOverview] = useState(null);
  const [clicks, setClicks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAnalyticsOverview().then(setOverview);
  }, []);

  useEffect(() => {
    fetchClicks({ page, limit: 15 }).then((res) => {
      setClicks(res.clicks);
      setTotalPages(res.pagination.totalPages);
    });
  }, [page]);

  if (!overview) return <Loader />;

  const maxDaily = Math.max(1, ...overview.dailyClicks.map((d) => d.count));

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">Analytics</h1>

      <div className="rounded-lg border border-ink/10 bg-white p-5 mb-8">
        <h2 className="font-semibold text-ink mb-4">Clicks — last 14 days</h2>
        {overview.dailyClicks.length === 0 ? (
          <p className="text-sm text-ink/50">No click data yet.</p>
        ) : (
          <div className="flex items-end gap-2 h-40">
            {overview.dailyClicks.map((d) => (
              <div key={d._id} className="flex-1 flex flex-col items-center gap-1" title={`${d._id}: ${d.count} clicks`}>
                <div
                  className="w-full bg-brand-400 rounded-t"
                  style={{ height: `${(d.count / maxDaily) * 100}%`, minHeight: 4 }}
                />
                <span className="text-[10px] text-ink/40 -rotate-45 origin-top-left translate-y-2">{d._id.slice(5)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="rounded-lg border border-ink/10 bg-white p-5">
          <h2 className="font-semibold text-ink mb-4">Device breakdown</h2>
          {overview.deviceBreakdown.map((d) => (
            <div key={d._id} className="flex items-center justify-between text-sm py-1.5 border-b border-ink/5 last:border-0">
              <span className="capitalize text-ink/70">{d._id || 'unknown'}</span>
              <span className="font-medium text-ink">{d.count}</span>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-ink/10 bg-white p-5">
          <h2 className="font-semibold text-ink mb-4">Top clicked products</h2>
          {overview.topProducts.map((p) => (
            <div key={p._id} className="flex items-center justify-between text-sm py-1.5 border-b border-ink/5 last:border-0">
              <span className="text-ink/70 truncate">{p.name}</span>
              <span className="font-medium text-ink">{p.clickCount}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-ink/10 bg-white p-5">
        <h2 className="font-semibold text-ink mb-4">Recent clicks</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink/50 border-b border-ink/10">
              <th className="pb-2">Product</th>
              <th className="pb-2">Device</th>
              <th className="pb-2">Referrer</th>
              <th className="pb-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {clicks.map((c) => (
              <tr key={c._id} className="border-b border-ink/5 last:border-0">
                <td className="py-2">{c.productName}</td>
                <td className="py-2 capitalize">{c.device}</td>
                <td className="py-2 text-ink/50 truncate max-w-[200px]">{c.referrer || '—'}</td>
                <td className="py-2 text-ink/50">{new Date(c.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4 text-sm">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="btn-secondary disabled:opacity-40">Previous</button>
          <span className="text-ink/50">Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="btn-secondary disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>
  );
}
