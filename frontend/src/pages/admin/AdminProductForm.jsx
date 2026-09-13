// This is the admin product form page, used for both creating and editing products
import { uploadImage } from '../../services/api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchProductByIdAdmin,
  createProduct,
  updateProduct,
  fetchCategories,
  createCategory
} from '../../services/api';
import Loader from '../../components/Loader';

const emptyForm = {
  name: '',
  shortDescription: '',
  description: '',
  images: ['', ''],
  category: '',
  brand: '',
  price: '',
  originalPrice: '',
  rating: 4.5,
  reviewCount: 0,
  features: [''],
  pros: [''],
  cons: [''],
  affiliateUrl: '',
  affiliateNetwork: 'Amazon Associates',
  isFeatured: false,
  isTrending: false,
  isDeal: false,
  status: 'active',
  seoTitle: '',
  seoDescription: ''
};

// Helper for editing simple string-array fields (features/pros/cons/images)
function ListEditor({ label, values, onChange, placeholder }) {
  const update = (i, val) => {
    const next = [...values];
    next[i] = val;
    onChange(next);
  };
  const add = () => onChange([...values, '']);
  const remove = (i) => onChange(values.filter((_, idx) => idx !== i));

  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1">{label}</label>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={v}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 rounded-md border border-ink/15 px-3 py-2 text-sm"
            />
            <button type="button" onClick={() => remove(i)} className="text-red-600 text-sm px-2">Remove</button>
          </div>
        ))}
      </div>
      <button type="button" onClick={add} className="text-brand-700 text-sm font-medium mt-2">+ Add another</button>
    </div>
  );
}

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    fetchProductByIdAdmin(id).then((p) => {
      setForm({
        ...emptyForm,
        ...p,
        category: p.category?._id || p.category || '',
        images: p.images?.length ? p.images : [''],
        features: p.features?.length ? p.features : [''],
        pros: p.pros?.length ? p.pros : [''],
        cons: p.cons?.length ? p.cons : ['']
      });
      setLoading(false);
    });
  }, [id, isEdit]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    const cat = await createCategory({ name: newCategoryName.trim() });
    setCategories((prev) => [...prev, { ...cat, productCount: 0 }]);
    set('category', cat._id);
    setNewCategoryName('');
  };

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setUploading(true);
  try {
    const url = await uploadImage(file);
    setForm((f) => ({
      ...f,
      images: [...f.images.filter(Boolean), url]
    }));
  } catch (err) {
    setError('Image upload failed. Please try again.');
  } finally {
    setUploading(false);
    e.target.value = '';
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        rating: Number(form.rating),
        reviewCount: Number(form.reviewCount),
        images: form.images.map((i) => i.trim()).filter(Boolean),
        features: form.features.map((i) => i.trim()).filter(Boolean),
        pros: form.pros.map((i) => i.trim()).filter(Boolean),
        cons: form.cons.map((i) => i.trim()).filter(Boolean)
      };

      if (isEdit) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">{isEdit ? 'Edit product' : 'Add product'}</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">{error}</p>}

        <div className="rounded-lg border border-ink/10 bg-white p-5 space-y-4">
          <h2 className="font-semibold text-ink">Basic information</h2>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Product name *</label>
            <input required value={form.name} onChange={(e) => set('name', e.target.value)} className="w-full rounded-md border border-ink/15 px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Short description (shown on cards, max 200 chars) *</label>
            <input required maxLength={200} value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} className="w-full rounded-md border border-ink/15 px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Full description *</label>
            <textarea required rows={5} value={form.description} onChange={(e) => set('description', e.target.value)} className="w-full rounded-md border border-ink/15 px-3 py-2" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Category *</label>
              <select required value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full rounded-md border border-ink/15 px-3 py-2 bg-white">
                <option value="">Select a category…</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
              <div className="flex gap-2 mt-2">
                <input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Or create new category…"
                  className="flex-1 rounded-md border border-ink/15 px-3 py-1.5 text-sm"
                />
                <button type="button" onClick={handleAddCategory} className="text-sm text-brand-700 font-medium">Add</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Brand</label>
              <input value={form.brand} onChange={(e) => set('brand', e.target.value)} className="w-full rounded-md border border-ink/15 px-3 py-2" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-ink/10 bg-white p-5 space-y-4">
          <h2 className="font-semibold text-ink">Pricing & rating</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Price ($) *</label>
              <input required type="number" step="0.01" min="0" value={form.price} onChange={(e) => set('price', e.target.value)} className="w-full rounded-md border border-ink/15 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Original price ($) — for discount badge</label>
              <input type="number" step="0.01" min="0" value={form.originalPrice} onChange={(e) => set('originalPrice', e.target.value)} className="w-full rounded-md border border-ink/15 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Rating (0-5)</label>
              <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => set('rating', e.target.value)} className="w-full rounded-md border border-ink/15 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Review count</label>
              <input type="number" min="0" value={form.reviewCount} onChange={(e) => set('reviewCount', e.target.value)} className="w-full rounded-md border border-ink/15 px-3 py-2" />
            </div>
          </div>
        </div>

        
        <div className="rounded-lg border border-ink/10 bg-white p-5 space-y-4">
  <h2 className="font-semibold text-ink">Images</h2>

  <div>
    <label className="block text-sm font-medium text-ink mb-1">Upload a photo</label>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      disabled={uploading}
      className="block w-full text-sm text-ink/70 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-brand-700 file:text-white file:text-sm hover:file:bg-brand-800"
    />
    {uploading && <p className="text-sm text-brand-700 mt-1">Uploading…</p>}
  </div>

  <ListEditor label="Image URLs (first = main image)" values={form.images} onChange={(v) => set('images', v)} placeholder="https://… (or use the upload button above)" />
</div>

        <div className="rounded-lg border border-ink/10 bg-white p-5 space-y-6">
          <h2 className="font-semibold text-ink">Details</h2>
          <ListEditor label="Key features" values={form.features} onChange={(v) => set('features', v)} placeholder="e.g. 40-hour battery life" />
          <ListEditor label="Pros" values={form.pros} onChange={(v) => set('pros', v)} placeholder="e.g. Excellent battery life" />
          <ListEditor label="Cons" values={form.cons} onChange={(v) => set('cons', v)} placeholder="e.g. A bit bulky" />
        </div>

        <div className="rounded-lg border border-brand-200 bg-brand-50 p-5 space-y-4">
          <h2 className="font-semibold text-brand-800">Affiliate link (required)</h2>
          <p className="text-sm text-brand-900/70">
            Paste your real tracked affiliate URL here. This is where "View Deal" and "Buy Now / Check Price"
            will send visitors — replace the demo link with your own.
          </p>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Affiliate URL *</label>
            <input required type="url" value={form.affiliateUrl} onChange={(e) => set('affiliateUrl', e.target.value)} placeholder="https://www.amazon.com/dp/XXXX?tag=your-id-20" className="w-full rounded-md border border-ink/15 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Affiliate network</label>
            <input value={form.affiliateNetwork} onChange={(e) => set('affiliateNetwork', e.target.value)} className="w-full rounded-md border border-ink/15 px-3 py-2" />
          </div>
        </div>

        <div className="rounded-lg border border-ink/10 bg-white p-5 space-y-4">
          <h2 className="font-semibold text-ink">Visibility</h2>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} /> Featured</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isTrending} onChange={(e) => set('isTrending', e.target.checked)} /> Trending</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isDeal} onChange={(e) => set('isDeal', e.target.checked)} /> Deal</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Status</label>
            <select value={form.status} onChange={(e) => set('status', e.target.value)} className="w-full sm:w-56 rounded-md border border-ink/15 px-3 py-2 bg-white">
              <option value="active">Active (visible on site)</option>
              <option value="draft">Draft (hidden)</option>
              <option value="archived">Archived (hidden)</option>
            </select>
          </div>
        </div>

        <div className="rounded-lg border border-ink/10 bg-white p-5 space-y-4">
          <h2 className="font-semibold text-ink">SEO (optional)</h2>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">SEO title override</label>
            <input value={form.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} className="w-full rounded-md border border-ink/15 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">SEO meta description override</label>
            <textarea rows={2} value={form.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} className="w-full rounded-md border border-ink/15 px-3 py-2" />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create product'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}
