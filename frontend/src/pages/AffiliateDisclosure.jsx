import { Helmet } from 'react-helmet-async';

// TODO: replace [Site Name], [Contact Email], and [Business Name] below with your own details.
export default function AffiliateDisclosure() {
  return (
    <div className="container-page py-14 max-w-3xl">
      <Helmet><title>Affiliate Disclosure | GlowPicks</title></Helmet>
      <h1 className="text-3xl font-semibold text-ink mb-2">Affiliate Disclosure</h1>
      <p className="text-sm text-ink/50 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="text-ink/80 leading-relaxed space-y-5">
        <p>
          In accordance with the Federal Trade Commission's guidelines concerning the use of
          endorsements and testimonials, please be aware of the following:
        </p>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">We earn commissions from affiliate links</h2>
          <p>
            trendy-picks ("we," "us," or "our") participates in affiliate marketing programs,
            including but not limited to the Amazon Associates Program, an affiliate advertising
            program designed to provide a means for sites to earn advertising fees by advertising
            and linking to affiliated retailers. We may also participate in similar affiliate
            programs with other retailers and networks.
          </p>
          <p>
            This means that when you click a "View Deal," "Buy Now," or "Check Price" button on
            this site and go on to make a qualifying purchase, we may earn a small commission —
            at no additional cost to you. The price you pay is the same whether or not you use
            our link.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">How this affects our content</h2>
          <p>
            These commissions help support the operation of this site, including the time spent
            researching, writing, and maintaining product information. However, affiliate
            relationships do not influence which products we choose to feature, our ratings, or
            the opinions expressed in our content. Our goal is to provide accurate, useful
            information to help you make informed purchasing decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">Accuracy of prices and availability</h2>
          <p>
            Prices, discounts, and availability displayed on this site are believed to be accurate
            as of the date of publishing but are subject to change at any time without notice.
            Always verify the current price and product details on the retailer's website before
            completing a purchase — the retailer's listing is authoritative, not ours.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">No checkout on this site</h2>
          <p>
            This website does not process payments, store payment information, or fulfill orders
            of any kind. All purchases are made directly on the retailer's own website after you
            are redirected from one of our links.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">Questions</h2>
          <p>
            If you have any questions about our affiliate relationships, how we select products to
            feature, or this disclosure in general, please contact us at{' '}
            <a href="mailto:[contact@yoursite.com]" className="text-brand-700 underline">[trendy-picks@gmai.com]</a>{' '}
            or via our <a href="/contact" className="text-brand-700 underline">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
