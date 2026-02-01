'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Target,
  FileText,
  Sparkles,
  Filter,
  ArrowRight,
  Zap,
  Briefcase,
  CheckCircle,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';

// Text reveal on scroll
function RevealText({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

// Animated counter that spins from 0 to value
function AnimatedStat({
  value,
  suffix = '',
  label,
  delay = 0
}: {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const duration = 2000; // 2 seconds

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <p className="text-7xl lg:text-8xl font-bold text-primary-900 mb-2 tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-primary-500 text-lg">{label}</p>
    </div>
  );
}

// Animated underline
function UnderlineWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block group">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-1 bg-accent-500 transition-all duration-500 group-hover:w-full" />
    </span>
  );
}

// Footer link component
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-primary-500 hover:text-primary-900 transition-colors"
    >
      {children}
    </Link>
  );
}

export default function LandingV3() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/landing-v3" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Asciv" width={40} height={20} className="h-5 w-auto" />
            <span className="text-xl font-semibold text-primary-900">Asciv</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-900 transition-colors">
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 text-sm font-medium bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 min-h-screen flex items-center">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 bg-accent-50 text-accent-600 rounded-full text-sm font-medium mb-12 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <Sparkles className="w-4 h-4" />
              AI-powered matching
            </div>

            <h1
              className={`text-6xl sm:text-7xl lg:text-8xl font-bold text-primary-900 leading-[1.05] mb-10 tracking-tight transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Know if a job fits
              <br />
              <span className="text-accent-600">before you apply.</span>
            </h1>

            <p
              className={`text-xl sm:text-2xl text-primary-500 mb-14 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Import any job description. Get an instant match score.
              <br className="hidden sm:block" />
              Then generate a tailored CV in seconds.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold bg-primary-900 text-white rounded-xl transition-all hover:bg-primary-800 hover:scale-[1.02]"
              >
                Get started free
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <p
              className={`mt-8 text-sm text-primary-400 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
              Free to use. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section - Animated Counters */}
      <section className="py-32 px-6 bg-primary-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <AnimatedStat
              value={92}
              suffix="%"
              label="Skills accurately matched"
              delay={0}
            />
            <AnimatedStat
              value={3}
              suffix="min"
              label="To analyze any job"
              delay={150}
            />
            <AnimatedStat
              value={10}
              suffix="x"
              label="Faster applications"
              delay={300}
            />
          </div>
          <p className="text-center text-primary-400 text-sm mt-8">
            Based on skills comparison between user profiles and job requirements
          </p>
        </div>
      </section>

      {/* Feature Spotlight 1 */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealText>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-accent-600" />
              </div>
              <span className="text-sm font-medium text-accent-600 uppercase tracking-wide">Core Feature</span>
            </div>
          </RevealText>

          <RevealText delay={100}>
            <h2 className="text-5xl lg:text-6xl font-bold text-primary-900 leading-tight mb-8">
              AI evaluates jobs
              <br />
              <UnderlineWord>against your profile.</UnderlineWord>
            </h2>
          </RevealText>

          <RevealText delay={200}>
            <p className="text-xl text-primary-500 leading-relaxed mb-12 max-w-2xl">
              Import a job description. In seconds, AI extracts requirements and compares them
              to your skills. You see: match score, skill gaps, blockers, strategic advice.
            </p>
          </RevealText>

          <RevealText delay={300}>
            <ul className="space-y-4">
              {[
                'Skills match analysis — see which skills align',
                'Hard blockers detected — salary, location, remote',
                'Strategic insights — culture fit, growth potential',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lg text-primary-700">
                  <CheckCircle className="w-5 h-5 text-accent-600 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealText>
        </div>
      </section>

      {/* Feature Spotlight 2 */}
      <section className="py-32 px-6 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto">
          <RevealText>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-white/60 uppercase tracking-wide">Document Generation</span>
            </div>
          </RevealText>

          <RevealText delay={100}>
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-8">
              Tailored CVs and
              <br />
              cover letters.{' '}
              <span className="text-accent-400">Instantly.</span>
            </h2>
          </RevealText>

          <RevealText delay={200}>
            <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-2xl">
              AI restructures your experience to highlight what matters for each role.
              French formal or American creative — your style, generated in seconds.
            </p>
          </RevealText>

          <RevealText delay={300}>
            <Link
              href="/signup"
              className="group inline-flex items-center text-lg font-medium text-white border-b-2 border-white/30 hover:border-white transition-colors pb-1"
            >
              Try it free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </RevealText>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealText>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 text-center mb-16">
              Everything you need.
            </h2>
          </RevealText>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { icon: Target, title: 'Smart Matching', desc: 'AI compares jobs against your profile. See your match score before you invest time.' },
              { icon: Filter, title: 'Blocker Detection', desc: 'Salary too low? Wrong location? The system tells you before you waste time.' },
              { icon: Zap, title: 'Instant Generation', desc: 'CVs and cover letters tailored to each role, generated in seconds.' },
              { icon: Briefcase, title: 'Role Profiles', desc: 'Create distinct professional identities for different job types.' },
            ].map((feature, i) => (
              <RevealText key={i} delay={i * 100}>
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">{feature.title}</h3>
                    <p className="text-primary-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 px-6 bg-primary-50">
        <div className="max-w-4xl mx-auto">
          <RevealText>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 text-center mb-20">
              Get started in minutes.
            </h2>
          </RevealText>

          <div className="space-y-16">
            {[
              { step: '01', title: 'Build your profile', desc: 'Import your CV or fill in your experience. This is your matching foundation.' },
              { step: '02', title: 'Import a job', desc: 'Paste text or provide a URL. AI extracts requirements automatically.' },
              { step: '03', title: 'Review your match', desc: 'See your score, skill gaps, blockers, and strategic advice.' },
              { step: '04', title: 'Generate and apply', desc: 'AI creates tailored CV and cover letter. Track through your pipeline.' },
            ].map((item, i) => (
              <RevealText key={i} delay={i * 100}>
                <div className="flex gap-8 items-start">
                  <span className="text-6xl font-bold text-primary-200">{item.step}</span>
                  <div className="pt-3">
                    <h3 className="text-2xl font-semibold text-primary-900 mb-2">{item.title}</h3>
                    <p className="text-lg text-primary-500">{item.desc}</p>
                  </div>
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <RevealText>
            <h2 className="text-5xl lg:text-6xl font-bold text-primary-900 mb-8">
              Stop guessing.
              <br />
              <span className="text-accent-600">Start matching.</span>
            </h2>
          </RevealText>

          <RevealText delay={100}>
            <p className="text-xl text-primary-500 mb-12">
              Build your profile once. Evaluate every opportunity with AI.
            </p>
          </RevealText>

          <RevealText delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold bg-primary-900 text-white rounded-xl transition-all hover:bg-primary-800 hover:scale-[1.02]"
              >
                Create free account
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-medium text-primary-900 border border-primary-200 hover:border-primary-300 hover:bg-primary-50 rounded-xl transition-all"
              >
                I already have an account
              </Link>
            </div>
          </RevealText>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-primary-50 border-t border-primary-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/landing-v3" className="flex items-center gap-2 mb-4">
                <Image src="/logo.svg" alt="Asciv" width={32} height={16} className="h-4 w-auto" />
                <span className="text-lg font-semibold text-primary-900">Asciv</span>
              </Link>
              <p className="text-primary-500 text-sm leading-relaxed">
                AI-powered job matching. Find opportunities that fit.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-primary-900 mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><FooterLink href="#features">Features</FooterLink></li>
                <li><FooterLink href="/signup">Get Started</FooterLink></li>
                <li><FooterLink href="#">Pricing</FooterLink></li>
                <li><FooterLink href="#">Changelog</FooterLink></li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 className="font-semibold text-primary-900 mb-4">Account</h4>
              <ul className="space-y-3 text-sm">
                <li><FooterLink href="/login">Sign in</FooterLink></li>
                <li><FooterLink href="/signup">Create account</FooterLink></li>
                <li><FooterLink href="/account">My profile</FooterLink></li>
                <li><FooterLink href="/">Dashboard</FooterLink></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-primary-900 mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><FooterLink href="/faq">FAQ</FooterLink></li>
                <li><FooterLink href="/contact">Contact</FooterLink></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-primary-900 mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
                <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
                <li><FooterLink href="/cookies">Cookie Policy</FooterLink></li>
                <li><FooterLink href="/gdpr">GDPR</FooterLink></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-primary-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-400 text-sm">
              © 2026 Asciv. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-primary-100 hover:bg-primary-200 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-primary-600" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-primary-100 hover:bg-primary-200 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-primary-600" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-primary-100 hover:bg-primary-200 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-primary-600" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
