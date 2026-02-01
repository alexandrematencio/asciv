import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-primary-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/landing-v4" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Asciv" width={40} height={20} className="h-5 w-auto" />
            <span className="text-xl font-semibold text-primary-900">Asciv</span>
          </Link>
          <Link
            href="/landing-v4"
            className="flex items-center gap-2 text-sm text-primary-500 hover:text-primary-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Cookie Policy</h1>
          <p className="text-primary-500">Last updated: February 1, 2026</p>
        </div>

        <div className="prose prose-primary max-w-none">
          <p className="text-lg text-primary-600 mb-8">
            This Cookie Policy explains how Asciv uses cookies and similar technologies
            when you use our platform.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">1. What Are Cookies?</h2>
            <p className="text-primary-600">
              Cookies are small text files stored on your device when you visit a website.
              They help the website remember your preferences and understand how you use the site.
              Similar technologies include local storage and session storage.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">2. Cookies We Use</h2>

            <h3 className="text-lg font-medium text-primary-800 mt-6 mb-3">2.1 Essential Cookies</h3>
            <p className="text-primary-600 mb-4">
              Required for the platform to function. Cannot be disabled.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-primary-600 border border-primary-200 rounded-lg">
                <thead className="bg-primary-50">
                  <tr>
                    <th className="text-left p-3 border-b border-primary-200">Cookie</th>
                    <th className="text-left p-3 border-b border-primary-200">Purpose</th>
                    <th className="text-left p-3 border-b border-primary-200">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-primary-100">
                    <td className="p-3 font-mono text-xs">sb-access-token</td>
                    <td className="p-3">Authentication session</td>
                    <td className="p-3">1 hour</td>
                  </tr>
                  <tr className="border-b border-primary-100">
                    <td className="p-3 font-mono text-xs">sb-refresh-token</td>
                    <td className="p-3">Session renewal</td>
                    <td className="p-3">7 days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">cookie-consent</td>
                    <td className="p-3">Remember your cookie preferences</td>
                    <td className="p-3">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium text-primary-800 mt-6 mb-3">2.2 Functional Cookies</h3>
            <p className="text-primary-600 mb-4">
              Enhance your experience by remembering preferences.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-primary-600 border border-primary-200 rounded-lg">
                <thead className="bg-primary-50">
                  <tr>
                    <th className="text-left p-3 border-b border-primary-200">Cookie</th>
                    <th className="text-left p-3 border-b border-primary-200">Purpose</th>
                    <th className="text-left p-3 border-b border-primary-200">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-primary-100">
                    <td className="p-3 font-mono text-xs">theme</td>
                    <td className="p-3">Light/dark mode preference</td>
                    <td className="p-3">1 year</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">locale</td>
                    <td className="p-3">Language preference</td>
                    <td className="p-3">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium text-primary-800 mt-6 mb-3">2.3 Analytics Cookies</h3>
            <p className="text-primary-600 mb-4">
              Help us understand how the platform is used. Optional — you can disable these.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-primary-600 border border-primary-200 rounded-lg">
                <thead className="bg-primary-50">
                  <tr>
                    <th className="text-left p-3 border-b border-primary-200">Cookie</th>
                    <th className="text-left p-3 border-b border-primary-200">Purpose</th>
                    <th className="text-left p-3 border-b border-primary-200">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 font-mono text-xs">_vercel_insights</td>
                    <td className="p-3">Anonymous usage analytics</td>
                    <td className="p-3">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">3. What We Don't Use</h2>
            <p className="text-primary-600 mb-4">Asciv does NOT use:</p>
            <ul className="list-disc pl-6 text-primary-600 space-y-2">
              <li><strong>Advertising cookies:</strong> We don't show ads or track you for advertising purposes.</li>
              <li><strong>Third-party tracking:</strong> No social media plugins or cross-site tracking.</li>
              <li><strong>Marketing cookies:</strong> No retargeting or behavioral advertising.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">4. Managing Cookies</h2>

            <h3 className="text-lg font-medium text-primary-800 mt-6 mb-3">4.1 Browser Settings</h3>
            <p className="text-primary-600 mb-4">
              You can manage cookies through your browser settings. Common options:
            </p>
            <ul className="list-disc pl-6 text-primary-600 space-y-2">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
              <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
              <li><strong>Edge:</strong> Settings → Privacy → Cookies</li>
            </ul>

            <h3 className="text-lg font-medium text-primary-800 mt-6 mb-3">4.2 Impact of Disabling Cookies</h3>
            <p className="text-primary-600">
              If you disable essential cookies, you will not be able to log in or use authenticated features.
              Disabling functional cookies may result in a less personalized experience.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">5. Local Storage</h2>
            <p className="text-primary-600">
              We use browser local storage for temporary data caching to improve performance.
              This data is stored locally on your device and is not transmitted to our servers.
              You can clear local storage through your browser's developer tools.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">6. Updates to This Policy</h2>
            <p className="text-primary-600">
              We may update this Cookie Policy as our practices change. The "Last updated" date
              at the top indicates when changes were made. Continued use of the platform
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">7. Contact</h2>
            <p className="text-primary-600">
              For questions about our use of cookies:
            </p>
            <ul className="list-none text-primary-600 mt-4 space-y-1">
              <li>Email: <a href="mailto:privacy@asciv.com" className="text-accent-500 hover:text-accent-600">privacy@asciv.com</a></li>
              <li>Contact form: <Link href="/contact" className="text-accent-500 hover:text-accent-600">asciv.com/contact</Link></li>
            </ul>
          </section>
        </div>

        {/* Related Links */}
        <div className="mt-16 pt-8 border-t border-primary-100">
          <h3 className="text-sm font-semibold text-primary-900 mb-4">Related</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="text-sm text-primary-500 hover:text-primary-900 transition-colors">
              Privacy Policy →
            </Link>
            <Link href="/terms" className="text-sm text-primary-500 hover:text-primary-900 transition-colors">
              Terms of Service →
            </Link>
            <Link href="/gdpr" className="text-sm text-primary-500 hover:text-primary-900 transition-colors">
              GDPR →
            </Link>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-primary-100 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-400">© 2026 Asciv. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-primary-500 hover:text-primary-900 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-primary-500 hover:text-primary-900 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
