import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'DivorceFig privacy policy: How we protect your data and respect your privacy.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: September 19, 2026</p>
      
      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold mb-2">1. Information We Collect</h2>
          <p>DivorceFig collects only the information necessary to provide our services. This includes:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Browser and device information (for analytics purposes)</li>
            <li>Calculations performed using our tools (processed locally in your browser)</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Provide and maintain our services</li>
            <li>Improve user experience</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">3. Cookies and Tracking</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Remember your preferences</li>
            <li>Understand how you use our site</li>
            <li>Display relevant advertising through Google AdSense</li>
          </ul>
          <p className="mt-2">You can control cookie settings through our cookie consent banner or your browser settings.</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">4. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Google AdSense</strong> — for displaying advertisements. Google may use cookies to serve ads based on your prior visits.</li>
            <li><strong>Analytics</strong> — to understand visitor behavior and improve our content.</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">5. Data Security</h2>
          <p>We implement appropriate security measures to protect your information. However, no method of transmission over the Internet is 100% secure.</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">6. Your Rights</h2>
          <p>Depending on your location, you may have rights regarding your personal data, including the right to access, correct, delete, or port your data.</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">7. Children's Privacy</h2>
          <p>Our services are not directed to children under 13. We do not knowingly collect personal information from children.</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">8. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">9. Contact Us</h2>
          <p>If you have questions about this privacy policy, please contact us at <a href="mailto:support@divorcefig.com" className="text-blue-600 underline">support@divorcefig.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
