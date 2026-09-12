import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import SearchResults from './pages/SearchResults';
import Deals from './pages/Deals';
import AffiliateDisclosure from './pages/AffiliateDisclosure';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminAnalytics from './pages/admin/AdminAnalytics';

function SiteLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
      <Route path="/product/:slug" element={<SiteLayout><ProductDetail /></SiteLayout>} />
      <Route path="/category/:slug" element={<SiteLayout><CategoryPage /></SiteLayout>} />
      <Route path="/search" element={<SiteLayout><SearchResults /></SiteLayout>} />
      <Route path="/deals" element={<SiteLayout><Deals /></SiteLayout>} />
      <Route path="/affiliate-disclosure" element={<SiteLayout><AffiliateDisclosure /></SiteLayout>} />
      <Route path="/privacy-policy" element={<SiteLayout><PrivacyPolicy /></SiteLayout>} />
      <Route path="/terms" element={<SiteLayout><Terms /></SiteLayout>} />
      <Route path="/contact" element={<SiteLayout><Contact /></SiteLayout>} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductForm />} />
        <Route path="products/:id/edit" element={<AdminProductForm />} />
        <Route path="analytics" element={<AdminAnalytics />} />
      </Route>

      <Route path="*" element={<SiteLayout><NotFound /></SiteLayout>} />
    </Routes>
  );
}
