import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-4xl font-semibold text-ink mb-3">404</h1>
      <p className="text-ink/60 mb-8">We couldn't find the page you were looking for.</p>
      <Link to="/" className="btn-primary inline-flex">Back to homepage</Link>
    </div>
  );
}
