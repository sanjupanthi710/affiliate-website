import { Helmet } from 'react-helmet-async';

// TODO: replace [Site Name], [Contact Email], and [Country/State] (for governing law)
// with your own details before publishing. Consider having a lawyer review this before launch.
export default function Terms() {
  return (
    <div className="container-page py-14 max-w-3xl">
      <Helmet><title>Terms of Service | GlowPicks</title></Helmet>
      <h1 className="text-3xl font-semibold text-ink mb-2">Terms of Service</h1>
      <p className="text-sm text-ink/50 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="text-ink/80 leading-relaxed space-y-6">
        <p>
          These Terms of Service ("Terms") govern your use of [Site Name] (the "Site"). By
          accessing or using the Site, you agree to be bound by these Terms. If you do not agree,
          please do not use the Site.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">1. Nature of this site</h2>
          <p>
            This Site provides independent product information, comparisons, ratings, and links
            to third-party retailers for informational purposes. The Site does not sell products
            directly, does not process payments, and no purchase transaction occurs on this Site.
            All purchases are completed on the applicable third-party retailer's own website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">2. Affiliate relationships</h2>
          <p>
            We may earn a commission when you click certain links on this Site and make a
            purchase through a linked retailer, at no additional cost to you. See our{' '}
            <a href="/affiliate-disclosure" className="text-brand-700 underline">Affiliate Disclosure</a>{' '}
            for details.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">3. Accuracy of information</h2>
          <p>
            We make reasonable efforts to keep product information, pricing, and availability
            accurate and up to date, but we do not guarantee accuracy, completeness, or
            timeliness. Prices and availability shown on this Site may differ from what is
            currently offered by the retailer. Always verify details on the retailer's website
            before purchasing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">4. Third-party websites</h2>
          <p>
            This Site contains links to third-party websites that are not owned or controlled by
            us. We have no control over, and assume no responsibility for, the content, privacy
            policies, terms, order fulfillment, returns, refunds, or customer service practices of
            any third-party websites. You access such websites entirely at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">5. Intellectual property</h2>
          <p>
            Unless otherwise noted, the text, layout, and original content on this Site are owned
            by or licensed to [Site Name] and may not be copied, reproduced, or distributed
            without permission. Product images and names may be trademarks or property of their
            respective owners and are used for identification purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">6. Disclaimer of warranties</h2>
          <p>
            The Site is provided on an "as is" and "as available" basis without warranties of any
            kind, express or implied, including but not limited to warranties of merchantability,
            fitness for a particular purpose, or non-infringement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">7. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, [Site Name] and its owners shall not be liable
            for any indirect, incidental, special, consequential, or punitive damages arising out
            of or related to your use of the Site, any third-party website linked from the Site,
            or any transaction with a third-party retailer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">8. Changes to these terms</h2>
          <p>
            We may revise these Terms from time to time. Updated Terms will be posted on this page
            with a revised "Last updated" date. Continued use of the Site after changes are posted
            constitutes your acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">9. Governing law</h2>
          <p>These Terms are governed by the laws of [Country/State], without regard to its conflict of law provisions.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">10. Contact us</h2>
          <p>
            Questions about these Terms can be sent to{' '}
            <a href="mailto:[contact@yoursite.com]" className="text-brand-700 underline">[contact@yoursite.com]</a>{' '}
            or via our <a href="/contact" className="text-brand-700 underline">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}