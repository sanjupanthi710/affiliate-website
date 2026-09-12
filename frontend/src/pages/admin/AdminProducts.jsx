import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProductsAdmin, deleteProduct } from '../../services/api';
import Loader from '../../components/Loader';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const load = () => {
    setLoading(true);
    fetchAllProductsAdmin().then(setProducts).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await deleteProduct(id);
    load();
  };

  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-ink">Products</h1>
        <Link to="/admin/products/new" className="btn-primary">+ Add product</Link>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter by name…"
        className="w-full sm:w-72 rounded-md border border-ink/15 px-3 py-2 mb-6 bg-white"
      />

      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-lg border border-ink/10 bg-white overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-ink/50 border-b border-ink/10">
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3">Clicks</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p._id} className="border-b border-ink/5 last:border-0">
                  <td className="p-3 flex items-center gap-3">
                    <img src={p.images?.[0]} alt="" className="w-10 h-10 rounded object-cover bg-paper" />
                    <span className="font-medium text-ink">{p.name}</span>
                  </td>
                  <td className="p-3 text-ink/60">{p.category?.name || '—'}</td>
                  <td className="p-3">${p.price?.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      p.status === 'active' ? 'bg-brand-100 text-brand-800' : 'bg-ink/10 text-ink/60'
                    }`}>{p.status}</span>
                  </td>
                  <td className="p-3">{p.clickCount}</td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <Link to={`/admin/products/${p._id}/edit`} className="text-brand-700 hover:underline mr-3">Edit</Link>
                    <button onClick={() => handleDelete(p._id, p.name)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-6 text-center text-ink/50">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
