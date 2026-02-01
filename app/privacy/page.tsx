import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Privacy Policy</h1>
          <p className="text-primary-500">Last updated: February 1, 2026</p>
        </div>

        <div className="prose prose-primary max-w-none">
          <p className="text-lg text-primary-600 mb-8">
            At Asciv, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our platform.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">1. Information We Collect</h2>

            <h3 className="text-lg font-medium text-primary-800 mt-6 mb-3">1.1 Information You Provide</h3>
            <ul className="list-disc pl-6 text-primary-600 space-y-2">
              <li><strong>Account Information:</strong> Email address, password (encrypted), and name when you create an account.</li>
              <li><strong>Profile Data:</strong> Professional information including work experience, education, skills, certifications, and languages.</li>
              <li><strong>Job Data:</strong> Job descriptions you import for analysis, your preferences (salary, location, remote policy), and application tracking data.</li>
              <li><strong>Generated Content:</strong> CVs and cover letters generated using our platform.</li>
              <li><strong>Communications:</strong> Messages you send through our contact forms.</li>
            </ul>

            <h3 className="text-lg font-medium text-primary-800 mt-6 mb-3">1.2 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-primary-600 space-y-2">
              <li><strong>Usage Data:</strong> How you interact with our platform (pages visited, features used).</li>
              <li><strong>Device Information:</strong> Browser type, operating system, device type.</li>
              <li><strong>Log Data:</strong> IP address, access times, referring URLs.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-primary-600 space-y-2">
              <li><strong>Service Delivery:</strong> To provide job matching, CV generation, and application tracking features.</li>
              <li><strong>AI Processing:</strong> To analyze job descriptions and generate tailored documents using AI. Your data is processed by our AI partner (Anthropic) solely for this purpose.</li>
              <li><strong>Account Management:</strong> To manage your account and provide customer support.</li>
              <li><strong>Platform Improvement:</strong> To analyze usage patterns and improve our services (aggregated, anonymized data only).</li>
              <li><strong>Security:</strong> To detect and prevent fraud, abuse, and security issues.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">3. Data Storage and Security</h2>
            <p className="text-primary-600 mb-4">
              Your data is stored securely using industry-standard practices:
            </p>
            <ul className="list-disc pl-6 text-primary-600 space-y-2">
              <li><strong>Database Security:</strong> Row-level security (RLS) ensures only you can access your data.</li>
              <li><strong>Encryption:</strong> Data is encrypted in transit (TLS) and at rest.</li>
              <li><strong>Access Control:</strong> Strict access controls limit who can access our systems.</li>
              <li><strong>Infrastructure:</strong> Hosted on Supabase with SOC 2 Type II compliance.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">4. Data Sharing</h2>
            <p className="text-primary-600 mb-4">We do not sell your personal data. We share data only in these cases:</p>
            <ul className="list-disc pl-6 text-primary-600 space-y-2">
              <li><strong>AI Processing:</strong> Job descriptions and profile data are sent to Anthropic's Claude API for analysis. Anthropic does not use this data to train models.</li>
              <li><strong>Service Providers:</strong> Infrastructure providers (Supabase, Vercel) who process data on our behalf under strict agreements.</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">5. Your Rights</h2>
            <p className="text-primary-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-primary-600 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data.</li>
              <li><strong>Rectification:</strong> Correct inaccurate data in your profile.</li>
              <li><strong>Deletion:</strong> Delete your account and all associated data.</li>
              <li><strong>Portability:</strong> Export your data in a machine-readable format.</li>
              <li><strong>Withdraw Consent:</strong> Opt out of AI processing at any time.</li>
            </ul>
            <p className="text-primary-600 mt-4">
              To exercise these rights, visit your <Link href="/account" className="text-accent-500 hover:text-accent-600">Account Settings</Link> or <Link href="/contact" className="text-accent-500 hover:text-accent-600">contact us</Link>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">6. Data Retention</h2>
            <p className="text-primary-600">
              We retain your data for as long as your account is active. When you delete your account,
              all personal data is permanently deleted within 30 days, except where retention is required
              by law or for legitimate business purposes (e.g., fraud prevention).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">7. International Transfers</h2>
            <p className="text-primary-600">
              Your data may be processed in countries outside your residence, including the United States
              (where our AI partner Anthropic is based). We ensure appropriate safeguards are in place,
              including Standard Contractual Clauses for EU data transfers.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">8. Children's Privacy</h2>
            <p className="text-primary-600">
              Asciv is not intended for users under 16 years of age. We do not knowingly collect
              data from children under 16.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-primary-600">
              We may update this Privacy Policy from time to time. We will notify you of material
              changes by email or through the platform. Continued use after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">10. Contact Us</h2>
            <p className="text-primary-600">
              For privacy-related questions or to exercise your rights:
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
            <Link href="/terms" className="text-sm text-primary-500 hover:text-primary-900 transition-colors">
              Terms of Service →
            </Link>
            <Link href="/cookies" className="text-sm text-primary-500 hover:text-primary-900 transition-colors">
              Cookie Policy →
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
