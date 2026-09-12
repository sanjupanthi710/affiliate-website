import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-ink text-center mb-1">Admin Login</h1>
        <p className="text-ink/50 text-center text-sm mb-8">Sign in to manage products and view analytics.</p>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-ink/10 rounded-lg p-6 shadow-card">
          {error && <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">Email</label>
            <input
              id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-ink/15 px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink mb-1">Password</label>
            <input
              id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-ink/15 px-3 py-2"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="text-xs text-ink/40 text-center mt-4">
          Default credentials come from the backend .env file used during seeding.
        </p>
      </div>
    </div>
  );
}
