import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { to: '/admin', label: 'Dashboard', end: true },
    { to: '/admin/products', label: 'Products' },
    { to: '/admin/analytics', label: 'Analytics' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-paper">
      <aside className="w-56 shrink-0 border-r border-ink/10 bg-white flex flex-col">
        <div className="px-5 py-5 border-b border-ink/10">
          <span className="font-display font-semibold text-ink">BestPicks</span>
          <p className="text-xs text-ink/40">Admin panel</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-ink/70 hover:bg-paper'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-ink/10 text-xs text-ink/50">
          <p className="mb-2">{admin?.email}</p>
          <button onClick={handleLogout} className="text-red-600 font-medium hover:underline">Log out</button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <div className="p-6 sm:p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
