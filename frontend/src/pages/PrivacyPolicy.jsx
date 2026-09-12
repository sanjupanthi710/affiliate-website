import { Helmet } from 'react-helmet-async';

// TODO: replace [Site Name], [Contact Email], [Business Name/Address], and [Country/State]
// with your own details before publishing. Consider having a lawyer review this before
// launch if you plan to collect any personal data (e.g. via forms, newsletters, cookies).
export default function PrivacyPolicy() {
  return (
    <div className="container-page py-14 max-w-3xl">
      <Helmet><title>Privacy Policy | BestPicks</title></Helmet>
      <h1 className="text-3xl font-semibold text-ink mb-2">Privacy Policy</h1>
      <p className="text-sm text-ink/50 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="text-ink/80 leading-relaxed space-y-6">
        <p>
          This Privacy Policy describes how [Site Name] ("we," "us," or "our") collects, uses,
          and discloses information when you visit our website (the "Site"). By using the Site,
          you agree to the collection and use of information in accordance with this policy.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">1. Information we collect</h2>
          <p className="mb-2">We collect limited information in the following ways:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Usage data:</strong> When you visit the Site, we may automatically collect
              information such as pages viewed, links and buttons clicked (including which
              product links you click), approximate device type, browser type, and referring
              pages, for analytics purposes.
            </li>
            <li>
              <strong>Voluntarily provided information:</strong> If you use our Contact form, we
              collect the name, email address, and message content you choose to submit.
            </li>
            <li>
              <strong>Cookies and similar technologies:</strong> We may use cookies or local
              storage to remember basic preferences and to support analytics. You can disable
              cookies in your browser settings, though some site features may not function as
              intended without them.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">2. How we use this information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To operate, maintain, and improve the Site and its content</li>
            <li>To understand which products and categories are most useful to visitors</li>
            <li>To respond to inquiries submitted through our Contact page</li>
            <li>To detect, prevent, and address technical issues or abuse</li>
          </ul>
          <p className="mt-2">We do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">3. Affiliate links and third-party sites</h2>
          <p>
            This Site contains affiliate links to third-party retailers. When you click an
            affiliate link, you will be taken to a website operated by that retailer, which is
            not controlled by us. Once you leave our Site, the destination retailer's own privacy
            policy, cookie practices, and data collection apply — not this policy. We encourage
            you to review the privacy policy of any third-party site you visit. See also our{' '}
            <a href="/affiliate-disclosure" className="text-brand-700 underline">Affiliate Disclosure</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">4. Data retention</h2>
          <p>
            We retain analytics and click data for as long as reasonably necessary to support the
            purposes described in this policy, after which it may be deleted or anonymized.
            Contact form submissions are retained only as long as needed to respond to your
            inquiry.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">5. Children's privacy</h2>
          <p>
            This Site is not directed at children under 13, and we do not knowingly collect
            personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">6. Your rights</h2>
          <p>
            Depending on where you live, you may have rights regarding your personal information,
            such as the right to request access to, correction of, or deletion of data we hold
            about you. To exercise any such rights, contact us using the details below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">7. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated "Last updated" date. Continued use of the Site after changes are
            posted constitutes acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-2">8. Contact us</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at{' '}
            <a href="mailto:[contact@yoursite.com]" className="text-brand-700 underline">[contact@yoursite.com]</a>{' '}
            or via our <a href="/contact" className="text-brand-700 underline">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}