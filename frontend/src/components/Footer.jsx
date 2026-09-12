import { Link } from 'react-router-dom';

const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'BestPicks';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/80 mt-16">
      <div className="container-page py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="text-lg font-display font-semibold text-white">{SITE_NAME}</span>
          <p className="mt-3 text-sm leading-relaxed text-paper/60 max-w-xs">
            Independent product research and comparisons to help you buy with confidence.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/deals" className="hover:text-white">Today's Deals</Link></li>
            <li><Link to="/category/electronics" className="hover:text-white">Electronics</Link></li>
            <li><Link to="/category/fitness" className="hover:text-white">Fitness</Link></li>
            <li><Link to="/category/fashion" className="hover:text-white">Fashion</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/affiliate-disclosure" className="hover:text-white">Affiliate Disclosure</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 text-xs text-paper/50 flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
          <span>As an affiliate, we may earn a commission from qualifying purchases at no extra cost to you.</span>
        </div>
      </div>
    </footer>
  );
}
