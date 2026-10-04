import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend endpoint is wired up for this demo form — replace with your
    // own form handler, email service, or a connector of your choice.
    setSent(true);
  };

  return (
    <div className="container-page py-14 max-w-xl">
      <Helmet><title>Contact Us | glowPicks</title></Helmet>
      <h1 className="text-3xl font-semibold text-ink mb-3">Contact Us</h1>
      <p className="text-ink/60 mb-8">Have a question about a product, a partnership idea, or found something wrong on the site? Send us a note.</p>

      {sent ? (
        <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 text-brand-800">
          Thanks — your message has been noted. We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink mb-1">Name</label>
            <input id="name" required className="w-full rounded-md border border-ink/15 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">Email</label>
            <input id="email" type="email" required className="w-full rounded-md border border-ink/15 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-ink mb-1">Message</label>
            <textarea id="message" rows={5} required className="w-full rounded-md border border-ink/15 px-3 py-2" />
          </div>
          <button type="submit" className="btn-primary">Send message</button>
        </form>
      )}
    </div>
  );
}
