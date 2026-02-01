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
  CheckCircle
} from 'lucide-react';

// Animated counter hook
function useCountUp(end: number, duration: number = 2000, start: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

export default function LandingV1() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Track mouse for glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Trigger animations on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const matchScore = useCountUp(87, 1500, isVisible);
  const timeSaved = useCountUp(12, 1500, isVisible);

  return (
    <div className="min-h-screen bg-primary-950 text-white overflow-hidden">
      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary-950/80 backdrop-blur-md border-b border-primary-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/landing-v1" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Asciv" width={40} height={20} className="h-5 w-auto invert" />
            <span className="text-xl font-semibold">Asciv</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-primary-400 hover:text-white transition-colors">
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 text-sm font-medium bg-accent-600 hover:bg-accent-500 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(30,0,255,0.4)]"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-24 px-6 min-h-screen flex items-center"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(30, 0, 255, 0.08), transparent 40%)`,
        }}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div>
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/30 text-accent-400 rounded-full text-sm font-medium mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <Sparkles className="w-4 h-4" />
                AI-powered matching
              </div>

              <h1
                className={`text-5xl lg:text-7xl font-bold leading-[1.1] mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                Stop guessing.
                <br />
                <span className="text-accent-500" style={{ textShadow: '0 0 60px rgba(30, 0, 255, 0.6)' }}>
                  Start matching.
                </span>
              </h1>

              <p
                className={`text-xl text-primary-400 mb-10 leading-relaxed max-w-xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                Import any job. AI scores it against your profile in seconds.
                Skills match. Salary fit. Red flags. Then generates a tailored CV.
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <Link
                  href="/signup"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-accent-600 hover:bg-accent-500 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(30,0,255,0.5)] hover:scale-[1.02]"
                >
                  Get started free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium border border-primary-700 hover:border-primary-500 hover:bg-primary-800/50 rounded-xl transition-all"
                >
                  See how it works
                </Link>
              </div>
            </div>

            {/* Right: Stats Cards */}
            <div className="relative">
              {/* Main stat card */}
              <div
                className={`relative bg-primary-900/80 backdrop-blur-sm rounded-2xl border border-primary-700/50 p-8 transition-all duration-700 delay-400 hover:border-accent-500/50 hover:shadow-[0_0_40px_rgba(30,0,255,0.2)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-accent-500/20 rounded-xl flex items-center justify-center">
                    <Target className="w-7 h-7 text-accent-400" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-500">Match Score</p>
                    <p
                      className="text-4xl font-bold text-accent-400"
                      style={{ textShadow: '0 0 30px rgba(30, 0, 255, 0.5)' }}
                    >
                      {matchScore}%
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-success-400" />
                    <span className="text-primary-300">8 of 10 skills matched</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-success-400" />
                    <span className="text-primary-300">Salary in your range</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-success-400" />
                    <span className="text-primary-300">Remote-friendly</span>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div
                className={`absolute -bottom-8 -left-8 bg-primary-900/90 backdrop-blur-sm rounded-xl border border-primary-700/50 p-5 transition-all duration-700 delay-500 hover:border-success-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-success-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-success-400">{timeSaved}h</p>
                    <p className="text-xs text-primary-500">saved per week</p>
                  </div>
                </div>
              </div>

              {/* Glow orb */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to
              <span className="text-accent-400"> land the right job</span>
            </h2>
            <p className="text-primary-400 text-lg max-w-2xl mx-auto">
              AI-powered tools that cut through noise and help you focus on opportunities that actually fit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Smart Matching', desc: 'AI compares jobs against your profile. See your match score before you invest time.', color: 'accent' },
              { icon: Filter, title: 'Hard Blocker Detection', desc: 'Salary too low? Wrong location? The system tells you before you waste time.', color: 'info' },
              { icon: FileText, title: 'Tailored CVs', desc: 'Generate a CV customized to each role. Your experience, restructured to fit.', color: 'success' },
              { icon: Zap, title: 'Cover Letters', desc: 'French formal or American creative. AI drafts it in your style, in seconds.', color: 'warning' },
              { icon: Briefcase, title: 'Role Profiles', desc: 'Create distinct identities for different job types. Frontend, fullstack, management.', color: 'accent' },
              { icon: BarChart2, title: 'Pipeline Tracking', desc: 'Track every application from draft to offer. Schedule interviews, record outcomes.', color: 'primary' },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-xl bg-primary-900/50 border border-primary-800/50 hover:border-accent-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(30,0,255,0.15)]"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-${feature.color}-500/10`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-primary-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Feature Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/5 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/30 text-accent-400 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Core Feature
              </div>

              <h2 className="text-4xl font-bold mb-6 leading-tight">
                AI evaluates every job
                <span className="text-accent-400"> against your profile</span>
              </h2>

              <p className="text-lg text-primary-400 mb-8 leading-relaxed">
                Import a job description — by URL or paste. In seconds, AI extracts requirements,
                compares them to your skills, and gives you a clear picture.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  { title: 'Skills match analysis', desc: 'See exactly which skills align with the role.' },
                  { title: 'Hard blockers detected', desc: 'Salary, location, remote policy — checked instantly.' },
                  { title: 'Strategic insights', desc: 'Culture fit, growth potential, positioning advice.' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{item.title}</span>
                      <p className="text-primary-500 text-sm mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-accent-600 hover:bg-accent-500 font-medium rounded-lg transition-all hover:shadow-[0_0_25px_rgba(30,0,255,0.4)]"
              >
                Get started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mockup */}
            <div className="relative">
              <div className="bg-primary-900 rounded-2xl border border-primary-700/50 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-primary-800 border-b border-primary-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-error-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-warning-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-success-500/80"></div>
                  </div>
                </div>
                <div className="aspect-[4/3] p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-24 h-24 mx-auto mb-4 rounded-full bg-accent-500/20 flex items-center justify-center"
                      style={{ boxShadow: '0 0 60px rgba(30, 0, 255, 0.3)' }}
                    >
                      <Target className="w-12 h-12 text-accent-400" />
                    </div>
                    <p className="text-primary-400 text-sm">Intelligence View</p>
                  </div>
                </div>
              </div>

              {/* Glow */}
              <div className="absolute -inset-4 bg-accent-500/10 rounded-3xl blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to find
            <span className="text-accent-400" style={{ textShadow: '0 0 40px rgba(30, 0, 255, 0.5)' }}> your match</span>?
          </h2>
          <p className="text-lg text-primary-400 mb-10">
            Build your profile once. Evaluate every opportunity with AI. Free to start.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-accent-600 hover:bg-accent-500 rounded-xl transition-all hover:shadow-[0_0_40px_rgba(30,0,255,0.5)] hover:scale-[1.02]"
            >
              Create free account
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium border border-primary-700 hover:border-primary-500 hover:bg-primary-800/50 rounded-xl transition-all"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-primary-800/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Asciv" width={32} height={16} className="h-4 w-auto invert opacity-60" />
            <span className="text-primary-500 text-sm">Asciv</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-primary-600">
            <Link href="/login" className="hover:text-primary-300 transition-colors">Log in</Link>
            <Link href="/signup" className="hover:text-primary-300 transition-colors">Sign up</Link>
          </div>
          <p className="text-primary-600 text-sm">2026 Asciv. Built for job seekers.</p>
        </div>
      </footer>
    </div>
  );
}
