'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    // Simulate sending (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormState('sent');
    setFormData({ name: '', email: '', subject: 'general', message: '' });
  };

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
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Contact Us</h1>
          <p className="text-lg text-primary-500">
            Have a question or feedback? We'd like to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Contact Options */}
          <div className="space-y-8">
            <div>
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-primary-900 mb-1">Email</h3>
              <p className="text-primary-500 text-sm mb-2">For general inquiries</p>
              <a
                href="mailto:hello@asciv.com"
                className="text-accent-500 hover:text-accent-600 transition-colors text-sm"
              >
                hello@asciv.com
              </a>
            </div>

            <div>
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-primary-900 mb-1">Support</h3>
              <p className="text-primary-500 text-sm mb-2">Technical assistance</p>
              <a
                href="mailto:support@asciv.com"
                className="text-accent-500 hover:text-accent-600 transition-colors text-sm"
              >
                support@asciv.com
              </a>
            </div>

            <div className="pt-4 border-t border-primary-100">
              <p className="text-sm text-primary-400">
                Response time: within 48 hours on business days.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            {formState === 'sent' ? (
              <div className="bg-success-50 border border-success-200 rounded-xl p-8 text-center">
                <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-success-600" />
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Message sent</h3>
                <p className="text-primary-500 mb-6">
                  Thank you for reaching out. We'll respond within 48 hours.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="text-sm text-accent-500 hover:text-accent-600 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-colors bg-white"
                  >
                    <option value="general">General inquiry</option>
                    <option value="support">Technical support</option>
                    <option value="feedback">Product feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="privacy">Privacy / Data request</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-colors resize-none"
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
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
