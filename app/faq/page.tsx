'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowLeft } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqCategories: { title: string; items: FAQItem[] }[] = [
  {
    title: 'Getting Started',
    items: [
      {
        question: 'What is Asciv?',
        answer: 'Asciv is an AI-powered job evaluation and application preparation platform. It helps you determine if a job is worth your time before you apply by analyzing job descriptions against your profile, then generates tailored CVs and cover letters.',
      },
      {
        question: 'Is Asciv free to use?',
        answer: 'Yes, Asciv is free to use. You can create an account, build your profile, analyze jobs, and generate documents without a credit card.',
      },
      {
        question: 'How do I get started?',
        answer: 'Create an account, then build your profile by importing your CV or filling in your experience manually. Once your profile is complete, you can start importing job descriptions to analyze them against your profile.',
      },
    ],
  },
  {
    title: 'Job Matching',
    items: [
      {
        question: 'How does the matching score work?',
        answer: 'The matching score (0-100) is calculated by comparing the job requirements against your profile. It considers skills match, salary fit, location preferences, remote policy, and other factors. The score is transparent — you can see exactly which criteria contributed to it.',
      },
      {
        question: 'What are hard blockers?',
        answer: 'Hard blockers are deal-breakers that automatically flag a job as potentially unsuitable. Examples include: salary below your minimum, location outside your preferences, or remote policy that doesn\'t match your needs. You define these in your preferences.',
      },
      {
        question: 'Can I import jobs from any website?',
        answer: 'You can paste job descriptions from any source. Simply copy the text from any job posting and paste it into Asciv. The AI will extract the relevant information automatically.',
      },
    ],
  },
  {
    title: 'Documents',
    items: [
      {
        question: 'How are CVs tailored to each job?',
        answer: 'The AI analyzes the job requirements and restructures your experience to highlight what matters most for that specific role. It emphasizes relevant skills, reorders experiences, and adjusts language to match the job\'s context.',
      },
      {
        question: 'What cover letter styles are available?',
        answer: 'Asciv offers multiple styles: French formal, French modern, American standard, and American creative. Each style follows different conventions and tone appropriate for different markets and company cultures.',
      },
      {
        question: 'Can I edit the generated documents?',
        answer: 'Yes, all generated content is fully editable. The AI provides a starting point that you can refine. You maintain complete control over the final version.',
      },
    ],
  },
  {
    title: 'Privacy & Data',
    items: [
      {
        question: 'How is my data protected?',
        answer: 'Your data is stored securely with row-level security (RLS) ensuring only you can access your information. We follow GDPR guidelines and never share your personal data with third parties. See our Privacy Policy for details.',
      },
      {
        question: 'Is my CV data used to train AI?',
        answer: 'No. Your personal data is never used to train AI models. We use AI to analyze and generate content for you, but your data remains private and is not used for any other purpose.',
      },
      {
        question: 'Can I delete my account and data?',
        answer: 'Yes, you can delete your account at any time from your account settings. This permanently removes all your data from our systems in accordance with GDPR requirements.',
      },
    ],
  },
];

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-primary-100 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left hover:bg-primary-50/50 transition-colors px-1 -mx-1 rounded"
      >
        <span className="text-lg font-medium text-primary-900 pr-4">{item.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}
      >
        <p className="text-primary-600 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
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
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-primary-500">
            Find answers to common questions about Asciv.
          </p>
        </div>

        <div className="space-y-12">
          {faqCategories.map((category, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold text-primary-900 mb-6 pb-2 border-b border-primary-200">
                {category.title}
              </h2>
              <div>
                {category.items.map((item, j) => (
                  <FAQAccordion key={j} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 p-8 bg-primary-50 rounded-xl text-center">
          <h3 className="text-xl font-semibold text-primary-900 mb-2">Still have questions?</h3>
          <p className="text-primary-500 mb-6">We're here to help.</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors"
          >
            Contact us
          </Link>
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
