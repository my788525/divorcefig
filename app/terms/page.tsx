import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'DivorceFig terms of use: acceptable use, disclaimer, and limitations of liability.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: September 19, 2026</p>
      
      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>By accessing and using DivorceFig (the "Site"), you agree to be bound by these Terms of Use. If you disagree with any part of these terms, you may not access the Site.</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">2. Services</h2>
          <p>DivorceFig provides educational and informational resources including calculators, guides, and reference materials. All content is for general information purposes only.</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">3. No Professional Advice</h2>
          <p>The content on DivorceFig does not constitute professional advice. You should consult with qualified professionals before making any decisions based on information provided on this Site.</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">4. Accuracy of Information</h2>
          <p>While we strive to provide accurate and up-to-date information, we make no representations or warranties about the completeness, accuracy, or reliability of the content.</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">5. Intellectual Property</h2>
          <p>All content on this Site, including text, graphics, logos, and software, is the property of DivorceFig or its licensors and is protected by copyright and other intellectual property laws.</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">6. Limitation of Liability</h2>
          <p>DivorceFig shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site.</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">7. Third-Party Links</h2>
          <p>The Site may contain links to third-party websites. We are not responsible for the content or practices of these third-party sites.</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">8. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the Site after changes constitutes acceptance of the new terms.</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">9. Contact</h2>
          <p>Questions about these Terms should be sent to <a href="mailto:support@divorcefig.com" className="text-blue-600 underline">support@divorcefig.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
