import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAnalyticsOverview } from '../../services/api';
import Loader from '../../components/Loader';

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-ink/10 bg-white p-5">
      <p className="text-sm text-ink/50">{label}</p>
      <p className="text-3xl font-semibold text-ink mt-1">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalyticsOverview().then(setData);
  }, []);

  if (!data) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">Dashboard</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total affiliate clicks" value={data.totalClicks.toLocaleString()} />
        <StatCard label="Clicks (last 7 days)" value={data.last7DaysClicks.toLocaleString()} />
        <StatCard label="Total products" value={data.totalProducts.toLocaleString()} />
      </div>

      <div className="flex gap-3 mb-8">
        <Link to="/admin/products/new" className="btn-primary">+ Add product</Link>
        <Link to="/admin/analytics" className="btn-secondary">View full analytics</Link>
      </div>

      <div className="rounded-lg border border-ink/10 bg-white p-5">
        <h2 className="font-semibold text-ink mb-4">Top clicked products</h2>
        {data.topProducts.length === 0 ? (
          <p className="text-sm text-ink/50">No clicks recorded yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink/50 border-b border-ink/10">
                <th className="pb-2">Product</th>
                <th className="pb-2">Clicks</th>
                <th className="pb-2">Views</th>
                <th className="pb-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {data.topProducts.map((p) => (
                <tr key={p._id} className="border-b border-ink/5 last:border-0">
                  <td className="py-2.5">
                    <Link to={`/admin/products/${p._id}/edit`} className="text-brand-700 hover:underline">{p.name}</Link>
                  </td>
                  <td className="py-2.5">{p.clickCount}</td>
                  <td className="py-2.5">{p.viewCount}</td>
                  <td className="py-2.5">${p.price?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
