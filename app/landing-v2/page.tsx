'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Target,
  FileText,
  Sparkles,
  Filter,
  BarChart2,
  ArrowRight,
  Zap,
  Clock,
  Briefcase,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

// Intersection Observer hook for scroll animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Animated counter
function AnimatedNumber({ value, suffix = '', duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const { ref, isInView } = useInView(0.5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function LandingV2() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(-45deg, #0F172A, #1E293B, #1E00FF10, #6D28D920, #10B98110, #0F172A)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite',
        }}
      />

      {/* Floating orbs */}
      <div
        className="fixed top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(30,0,255,0.4) 0%, transparent 70%)',
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      <div
        className="fixed bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)',
          transform: `translateY(${-scrollY * 0.1}px)`,
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <Link href="/landing-v2" className="flex items-center gap-3">
              <Image src="/logo.svg" alt="Asciv" width={40} height={20} className="h-5 w-auto invert" />
              <span className="text-xl font-semibold text-white">Asciv</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2.5 text-sm font-medium bg-white text-primary-900 rounded-xl hover:bg-white/90 transition-all shadow-lg shadow-white/10"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <Sparkles className="w-4 h-4 text-accent-400" />
                AI-powered job matching
              </div>

              <h1
                className={`text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                Find jobs that
                <br />
                <span className="bg-gradient-to-r from-accent-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                  actually fit you
                </span>
              </h1>

              <p
                className={`text-xl text-white/60 mb-10 leading-relaxed max-w-xl transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                Import any job description. AI instantly scores it against your profile —
                skills, salary, location, culture fit. No more guessing.
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <Link
                  href="/signup"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-primary-900 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(255,255,255,0.15)]"
                >
                  Get started free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border border-white/20 hover:bg-white/10 rounded-2xl transition-all backdrop-blur-sm"
                >
                  See how it works
                </Link>
              </div>
            </div>

            {/* Right: Floating Glass Cards */}
            <div className="relative h-[500px]">
              {/* Main card */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.05}px))` }}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-accent-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-accent-500/30">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Match Score</p>
                      <p className="text-4xl font-bold text-white">
                        <AnimatedNumber value={87} suffix="%" />
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {['8 of 10 skills matched', 'Salary in range', 'Remote-friendly'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle className="w-4 h-4 text-teal-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating stat 1 */}
              <div
                className={`absolute top-8 right-0 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ transform: `translateY(${scrollY * -0.08}px)` }}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">
                        <AnimatedNumber value={12} suffix="h" />
                      </p>
                      <p className="text-xs text-white/50">saved weekly</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat 2 */}
              <div
                className={`absolute bottom-16 left-0 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ transform: `translateY(${scrollY * 0.06}px)` }}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">
                        <AnimatedNumber value={156} suffix="+" />
                      </p>
                      <p className="text-xs text-white/50">CVs generated</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: 87, suffix: '%', label: 'Match accuracy' },
              { value: 3, suffix: 'min', label: 'To analyze a job' },
              { value: 10, suffix: 'x', label: 'Faster applications' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Powered by{' '}
              <span className="bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                intelligent matching
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Every feature designed to help you find the right opportunities faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Smart Matching', desc: 'AI compares jobs against your profile. See your match score instantly.', gradient: 'from-accent-500 to-purple-500' },
              { icon: Filter, title: 'Blocker Detection', desc: 'Salary, location, remote policy — flagged before you invest time.', gradient: 'from-purple-500 to-pink-500' },
              { icon: FileText, title: 'Tailored CVs', desc: 'Generate CVs customized to each role in seconds.', gradient: 'from-teal-500 to-cyan-500' },
              { icon: Zap, title: 'Cover Letters', desc: 'French formal or American creative. Your style, instantly.', gradient: 'from-yellow-500 to-orange-500' },
              { icon: Briefcase, title: 'Role Profiles', desc: 'Create distinct identities for different job types.', gradient: 'from-pink-500 to-rose-500' },
              { icon: Clock, title: 'Pipeline Tracking', desc: 'Track applications from draft to offer.', gradient: 'from-cyan-500 to-blue-500' },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Get started in{' '}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                minutes
              </span>
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { step: 1, title: 'Build your profile', desc: 'Import your CV or fill in your experience. This is your matching foundation.' },
              { step: 2, title: 'Import a job', desc: 'Paste text or provide a URL. AI extracts requirements automatically.' },
              { step: 3, title: 'Review your match', desc: 'See your score, skill gaps, blockers, and strategic advice.' },
              { step: 4, title: 'Generate and apply', desc: 'AI creates tailored CV and cover letter. Track through your pipeline.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-400 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent-500/30">
                  <span className="text-white font-bold">{item.step}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative p-12 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 text-center overflow-hidden">
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s infinite',
              }}
            />

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10">
              Ready to find your match?
            </h2>
            <p className="text-lg text-white/60 mb-10 relative z-10">
              Build your profile once. Evaluate every opportunity with AI. Free to start.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-primary-900 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
              >
                Create free account
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border border-white/20 hover:bg-white/10 rounded-2xl transition-all"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Asciv" width={32} height={16} className="h-4 w-auto invert opacity-50" />
            <span className="text-white/40 text-sm">Asciv</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href="/login" className="hover:text-white/70 transition-colors">Log in</Link>
            <Link href="/signup" className="hover:text-white/70 transition-colors">Sign up</Link>
          </div>
          <p className="text-white/30 text-sm">2026 Asciv. Built for job seekers.</p>
        </div>
      </footer>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
