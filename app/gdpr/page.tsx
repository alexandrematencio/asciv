import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Shield, Download, Trash2, Eye, Ban, UserX } from 'lucide-react';

export default function GDPRPage() {
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
          <h1 className="text-4xl font-bold text-primary-900 mb-4">GDPR Compliance</h1>
          <p className="text-primary-500">Your data rights under the General Data Protection Regulation</p>
        </div>

        <div className="prose prose-primary max-w-none">
          <p className="text-lg text-primary-600 mb-8">
            Asciv is committed to protecting your personal data in accordance with the
            General Data Protection Regulation (GDPR). This page explains your rights
            and how we comply with GDPR requirements.
          </p>

          {/* Rights Overview Cards */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary-900 mb-6">Your Rights at a Glance</h2>
            <div className="grid sm:grid-cols-2 gap-4 not-prose">
              {[
                {
                  icon: Eye,
                  title: 'Right to Access',
                  description: 'Request a copy of all personal data we hold about you.',
                },
                {
                  icon: Download,
                  title: 'Right to Portability',
                  description: 'Export your data in a machine-readable format.',
                },
                {
                  icon: Trash2,
                  title: 'Right to Erasure',
                  description: 'Request deletion of your personal data.',
                },
                {
                  icon: Ban,
                  title: 'Right to Object',
                  description: 'Object to processing of your data for certain purposes.',
                },
                {
                  icon: Shield,
                  title: 'Right to Rectification',
                  description: 'Correct inaccurate personal data.',
                },
                {
                  icon: UserX,
                  title: 'Right to Withdraw Consent',
                  description: 'Withdraw consent for AI processing at any time.',
                },
              ].map((right, i) => (
                <div key={i} className="p-5 border border-primary-200 rounded-xl">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                    <right.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-primary-900 mb-1">{right.title}</h3>
                  <p className="text-sm text-primary-500">{right.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">How to Exercise Your Rights</h2>

            <h3 className="text-lg font-medium text-primary-800 mt-6 mb-3">Self-Service Options</h3>
            <p className="text-primary-600 mb-4">
              Many rights can be exercised directly through your account:
            </p>
            <ul className="list-disc pl-6 text-primary-600 space-y-2">
              <li><strong>Access & Rectification:</strong> View and edit your profile in <Link href="/account" className="text-accent-500 hover:text-accent-600">Account Settings</Link></li>
              <li><strong>Data Export:</strong> Download your data from Account Settings → Data & Privacy</li>
              <li><strong>AI Consent Withdrawal:</strong> Disable AI processing in Account Settings</li>
              <li><strong>Account Deletion:</strong> Delete your account from Account Settings → Delete Account</li>
            </ul>

            <h3 className="text-lg font-medium text-primary-800 mt-6 mb-3">Contact Requests</h3>
            <p className="text-primary-600 mb-4">
              For requests that require verification or cannot be done self-service:
            </p>
            <ul className="list-disc pl-6 text-primary-600 space-y-2">
              <li>Email: <a href="mailto:privacy@asciv.com" className="text-accent-500 hover:text-accent-600">privacy@asciv.com</a></li>
              <li>Subject line: "GDPR Request - [Your Right]"</li>
              <li>Include: Your account email and specific request</li>
              <li>Response time: Within 30 days (extendable by 60 days for complex requests)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">Legal Basis for Processing</h2>
            <p className="text-primary-600 mb-4">
              We process your data under these legal bases:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-primary-600 border border-primary-200 rounded-lg">
                <thead className="bg-primary-50">
                  <tr>
                    <th className="text-left p-3 border-b border-primary-200">Data Type</th>
                    <th className="text-left p-3 border-b border-primary-200">Legal Basis</th>
                    <th className="text-left p-3 border-b border-primary-200">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-primary-100">
                    <td className="p-3">Account data</td>
                    <td className="p-3">Contract performance</td>
                    <td className="p-3">Provide the service</td>
                  </tr>
                  <tr className="border-b border-primary-100">
                    <td className="p-3">Profile data</td>
                    <td className="p-3">Contract performance</td>
                    <td className="p-3">Job matching, CV generation</td>
                  </tr>
                  <tr className="border-b border-primary-100">
                    <td className="p-3">AI processing</td>
                    <td className="p-3">Consent</td>
                    <td className="p-3">Analysis and generation</td>
                  </tr>
                  <tr className="border-b border-primary-100">
                    <td className="p-3">Usage data</td>
                    <td className="p-3">Legitimate interest</td>
                    <td className="p-3">Service improvement</td>
                  </tr>
                  <tr>
                    <td className="p-3">Security logs</td>
                    <td className="p-3">Legal obligation</td>
                    <td className="p-3">Fraud prevention</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">Data Protection Measures</h2>
            <ul className="list-disc pl-6 text-primary-600 space-y-2">
              <li><strong>Encryption:</strong> All data encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
              <li><strong>Access Controls:</strong> Row-level security ensures data isolation between users</li>
              <li><strong>Minimization:</strong> We only collect data necessary for the service</li>
              <li><strong>Retention Limits:</strong> Data deleted within 30 days of account closure</li>
              <li><strong>Vendor Compliance:</strong> All third-party processors are GDPR-compliant</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">International Transfers</h2>
            <p className="text-primary-600 mb-4">
              Your data may be transferred to:
            </p>
            <ul className="list-disc pl-6 text-primary-600 space-y-2">
              <li><strong>United States:</strong> Anthropic (AI processing) - covered by Standard Contractual Clauses</li>
              <li><strong>European Union:</strong> Supabase (database) - data remains in EU region</li>
            </ul>
            <p className="text-primary-600 mt-4">
              All transfers are protected by appropriate safeguards as required by GDPR Article 46.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">Data Retention</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-primary-600 border border-primary-200 rounded-lg">
                <thead className="bg-primary-50">
                  <tr>
                    <th className="text-left p-3 border-b border-primary-200">Data Type</th>
                    <th className="text-left p-3 border-b border-primary-200">Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-primary-100">
                    <td className="p-3">Active account data</td>
                    <td className="p-3">Duration of account + 30 days</td>
                  </tr>
                  <tr className="border-b border-primary-100">
                    <td className="p-3">Deleted account data</td>
                    <td className="p-3">Deleted within 30 days</td>
                  </tr>
                  <tr className="border-b border-primary-100">
                    <td className="p-3">Security logs</td>
                    <td className="p-3">90 days</td>
                  </tr>
                  <tr>
                    <td className="p-3">Legal/tax records</td>
                    <td className="p-3">As required by law (typically 7 years)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">Supervisory Authority</h2>
            <p className="text-primary-600 mb-4">
              If you believe your data protection rights have been violated, you have the right
              to lodge a complaint with a supervisory authority. For France:
            </p>
            <div className="bg-primary-50 p-4 rounded-lg text-primary-600">
              <p className="font-medium">Commission Nationale de l'Informatique et des Libertés (CNIL)</p>
              <p className="text-sm mt-2">3 Place de Fontenoy, TSA 80715</p>
              <p className="text-sm">75334 Paris Cedex 07, France</p>
              <p className="text-sm mt-2">
                Website: <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:text-accent-600">www.cnil.fr</a>
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">Data Protection Officer</h2>
            <p className="text-primary-600">
              For data protection inquiries, contact our DPO:
            </p>
            <ul className="list-none text-primary-600 mt-4 space-y-1">
              <li>Email: <a href="mailto:dpo@asciv.com" className="text-accent-500 hover:text-accent-600">dpo@asciv.com</a></li>
            </ul>
          </section>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 p-8 bg-primary-50 rounded-xl">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/account"
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-white border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <Eye className="w-4 h-4 mr-2" />
              View my data
            </Link>
            <Link
              href="/contact?subject=privacy"
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-white border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Request data export
            </Link>
            <Link
              href="/contact?subject=privacy"
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-white border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Request deletion
            </Link>
          </div>
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
            <Link href="/cookies" className="text-sm text-primary-500 hover:text-primary-900 transition-colors">
              Cookie Policy →
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
