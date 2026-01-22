'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Briefcase,
  FileText,
  Sparkles,
  RefreshCw,
  Filter,
  Target,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Clock
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-primary-900/80 backdrop-blur-sm border-b border-primary-200 dark:border-primary-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/landing" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="AppTracker"
              width={40}
              height={20}
              className="h-5 w-auto"
            />
            <span className="text-xl font-semibold text-primary-900 dark:text-primary-50">
              AppTracker
            </span>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="btn-primary text-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              {/* Badge "Coming Soon" */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-powered job tracking coming soon
              </div>

              <h1 className="text-4xl lg:text-5xl font-semibold text-primary-900 dark:text-primary-50 leading-tight mb-6">
                Track applications.
                <br />
                <span className="text-accent-600 dark:text-accent-400">Land interviews.</span>
              </h1>

              <p className="text-lg text-primary-600 dark:text-primary-400 mb-8 leading-relaxed">
                Stop losing track of where you applied. AppTracker helps you manage job applications,
                generate tailored CVs, and soon — discover opportunities matched to your profile.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="btn-primary btn-lg">
                  Get started free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="#features" className="btn-secondary btn-lg">
                  See how it works
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-4 text-sm text-primary-500 dark:text-primary-400">
                <div className="flex -space-x-2">
                  {/* Placeholder avatars */}
                  <div className="w-8 h-8 rounded-full bg-primary-300 dark:bg-primary-600 border-2 border-white dark:border-primary-900"></div>
                  <div className="w-8 h-8 rounded-full bg-primary-400 dark:bg-primary-500 border-2 border-white dark:border-primary-900"></div>
                  <div className="w-8 h-8 rounded-full bg-accent-400 border-2 border-white dark:border-primary-900"></div>
                </div>
                <span>Join 500+ job seekers tracking smarter</span>
              </div>
            </div>

            {/* Right: Hero Image Placeholder */}
            <div className="relative">
              <div className="bg-white dark:bg-primary-800 rounded-xl shadow-xl border border-primary-200 dark:border-primary-700 overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-primary-100 dark:bg-primary-900 border-b border-primary-200 dark:border-primary-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-error-400"></div>
                    <div className="w-3 h-3 rounded-full bg-warning-400"></div>
                    <div className="w-3 h-3 rounded-full bg-success-400"></div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white dark:bg-primary-800 rounded px-3 py-1 text-xs text-primary-400 text-center">
                      app.apptracker.io
                    </div>
                  </div>
                </div>
                {/* Placeholder for dashboard screenshot */}
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-800 dark:to-primary-900 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <Briefcase className="w-16 h-16 text-primary-400 dark:text-primary-600 mx-auto mb-4" />
                    <p className="text-sm text-primary-500 dark:text-primary-400 font-medium">
                      Dashboard Screenshot
                    </p>
                    <p className="text-xs text-primary-400 dark:text-primary-500 mt-1">
                      Replace with: Full dashboard view showing application list with status badges
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating card - Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-primary-800 rounded-lg shadow-lg border border-primary-200 dark:border-primary-700 p-4 w-48">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-success-600 dark:text-success-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-primary-900 dark:text-primary-50">23%</p>
                    <p className="text-xs text-primary-500 dark:text-primary-400">Interview rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white dark:bg-primary-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-primary-900 dark:text-primary-50 mb-4">
              Everything you need to manage your job search
            </h2>
            <p className="text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
              From tracking applications to generating tailored CVs, AppTracker streamlines your entire job search workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-800/50 border border-primary-100 dark:border-primary-700">
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-2">
                Application Tracking
              </h3>
              <p className="text-primary-600 dark:text-primary-400 text-sm leading-relaxed">
                Keep all your job applications organized in one place. Track status from draft to offer with a clear visual pipeline.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-800/50 border border-primary-100 dark:border-primary-700">
              <div className="w-12 h-12 bg-info-100 dark:bg-info-900/30 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-info-600 dark:text-info-400" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-2">
                AI-Generated CVs
              </h3>
              <p className="text-primary-600 dark:text-primary-400 text-sm leading-relaxed">
                Generate tailored CVs for each application. Our AI adapts your experience to match job requirements.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-800/50 border border-primary-100 dark:border-primary-700">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-2">
                Cover Letter Generation
              </h3>
              <p className="text-primary-600 dark:text-primary-400 text-sm leading-relaxed">
                Create compelling cover letters in multiple styles. French formal, American creative — you choose.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-800/50 border border-primary-100 dark:border-primary-700">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-2">
                Interview Scheduling
              </h3>
              <p className="text-primary-600 dark:text-primary-400 text-sm leading-relaxed">
                Never miss an interview. Track dates, prepare notes, and record outcomes all in one place.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-800/50 border border-primary-100 dark:border-primary-700">
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-2">
                Profile Management
              </h3>
              <p className="text-primary-600 dark:text-primary-400 text-sm leading-relaxed">
                Store your experience, skills, and education once. Create role-specific profiles for different job types.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-800/50 border border-primary-100 dark:border-primary-700">
              <div className="w-12 h-12 bg-error-100 dark:bg-error-900/30 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-error-600 dark:text-error-400" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-2">
                Success Analytics
              </h3>
              <p className="text-primary-600 dark:text-primary-400 text-sm leading-relaxed">
                Understand your job search performance. Track response rates, interview conversion, and time to offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section - Job Matching */}
      <section className="py-20 px-6 bg-gradient-to-b from-primary-900 to-primary-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Feature preview placeholder */}
            <div className="order-2 lg:order-1">
              <div className="bg-primary-800 rounded-xl border border-primary-700 overflow-hidden">
                {/* Placeholder for job matching UI */}
                <div className="aspect-[4/3] p-6 flex items-center justify-center">
                  <div className="text-center">
                    <Filter className="w-16 h-16 text-accent-500 mx-auto mb-4" />
                    <p className="text-sm text-primary-300 font-medium">
                      Job Matching Interface
                    </p>
                    <p className="text-xs text-primary-500 mt-1 max-w-xs">
                      Replace with: UI mockup showing filtered job listings with match scores and "Apply" CTAs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Copy */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-900/50 text-accent-300 rounded-full text-sm font-medium mb-6">
                <RefreshCw className="w-4 h-4" />
                Coming Soon
              </div>

              <h2 className="text-3xl lg:text-4xl font-semibold text-white leading-tight mb-6">
                AI-powered job discovery
              </h2>

              <p className="text-lg text-primary-300 mb-8 leading-relaxed">
                Stop endless scrolling. Our AI will analyze your profile and match you with relevant opportunities — refreshed every 6 hours from top job boards.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Smart filtering</span>
                    <p className="text-primary-400 text-sm mt-1">
                      AI analyzes job requirements against your skills to show only positions you're qualified for.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Auto-refresh every 6 hours</span>
                    <p className="text-primary-400 text-sm mt-1">
                      New opportunities delivered automatically. Never miss a fresh posting.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Match score</span>
                    <p className="text-primary-400 text-sm mt-1">
                      See how well each job matches your profile with a clear percentage score.
                    </p>
                  </div>
                </li>
              </ul>

              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-lg transition-colors"
              >
                Join the waitlist
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white dark:bg-primary-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-primary-900 dark:text-primary-50 mb-4">
              Get started in minutes
            </h2>
            <p className="text-primary-600 dark:text-primary-400">
              Three simple steps to take control of your job search.
            </p>
          </div>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-accent-700 dark:text-accent-300 font-semibold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-2">
                  Create your profile
                </h3>
                <p className="text-primary-600 dark:text-primary-400">
                  Import your existing CV or fill in your experience, skills, and education. Your profile becomes the foundation for all generated documents.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-accent-700 dark:text-accent-300 font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-2">
                  Add job applications
                </h3>
                <p className="text-primary-600 dark:text-primary-400">
                  Paste the job description and let AI generate a tailored CV and cover letter. Track each application's status as you progress.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-accent-700 dark:text-accent-300 font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-2">
                  Track and iterate
                </h3>
                <p className="text-primary-600 dark:text-primary-400">
                  Move applications through your pipeline, schedule interviews, and analyze what's working. Improve your approach based on real data.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/signup" className="btn-primary btn-lg">
              Start tracking for free
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary-50 dark:bg-primary-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold text-primary-900 dark:text-primary-50 mb-6">
            Ready to streamline your job search?
          </h2>
          <p className="text-lg text-primary-600 dark:text-primary-400 mb-8">
            Join hundreds of job seekers who've taken control of their applications. Free to start, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary btn-lg">
              Create free account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/login" className="btn-secondary btn-lg">
              I already have an account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-primary-900 dark:bg-primary-950 border-t border-primary-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="AppTracker"
                width={32}
                height={16}
                className="h-4 w-auto opacity-80"
              />
              <span className="text-primary-400 text-sm">
                AppTracker
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-primary-500">
              <Link href="/login" className="hover:text-primary-300 transition-colors">
                Log in
              </Link>
              <Link href="/signup" className="hover:text-primary-300 transition-colors">
                Sign up
              </Link>
            </div>
            <p className="text-primary-600 text-sm">
              2025 AppTracker. Built for job seekers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
