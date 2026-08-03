import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const STATS = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '8+',   label: 'Years Experience' },
  { value: '50+',  label: 'Happy Clients' },
  { value: '12',   label: 'Team Members' },
]

const SERVICES = [
  { icon: '⚡', title: 'React & Next.js', desc: 'Lightning-fast frontends with modern frameworks' },
  { icon: '☁️', title: 'Cloud Architecture', desc: 'Scalable microservices on AWS, GCP & Azure' },
  { icon: '📱', title: 'Mobile Apps', desc: 'Cross-platform apps with React Native & Flutter' },
  { icon: '🎨', title: 'UI/UX Design', desc: 'Pixel-perfect interfaces that convert' },
  { icon: '🔒', title: 'Security & DevOps', desc: 'CI/CD pipelines, Docker & Kubernetes' },
  { icon: '📊', title: 'Data & Analytics', desc: 'Real-time dashboards and data pipelines' },
]

const TECH = ['React', 'Spring Boot', 'Kubernetes', 'Kafka', 'Redis', 'MySQL', 'Docker', 'AWS']

export default function Home() {
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    el.querySelectorAll('[data-delay]').forEach(node => {
      node.style.animationDelay = node.dataset.delay
    })
  }, [])

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl animate-float" style={{animationDelay:'3s'}} />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-brand-300 font-mono mb-8 animate-fade-in" data-delay="0.1s">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Bangalore's Premier Web Studio
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[0.9] mb-6 opacity-0 animate-fade-up" data-delay="0.2s">
            We Build<br />
            <span className="text-gradient italic">Digital</span><br />
            Experiences
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up" data-delay="0.4s">
            From pixel-perfect UIs to cloud-native microservices — we engineer 
            products that scale, delight, and drive business growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" data-delay="0.6s">
            <Link to="/contact" className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all duration-200 hover:glow hover:scale-105 text-sm">
              Start a Project →
            </Link>
            <Link to="/projects" className="px-8 py-4 glass text-white font-semibold rounded-xl transition-all duration-200 hover:bg-white/10 text-sm">
              View Our Work
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs animate-bounce">
          <span>scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-slate-600 to-transparent" />
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(s => (
            <div key={s.label} className="glass rounded-2xl p-6 text-center hover:border-brand-500/40 transition-colors">
              <div className="text-4xl font-display font-black text-gradient mb-1">{s.value}</div>
              <div className="text-slate-400 text-xs uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-brand-400 font-mono text-xs uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="glass rounded-2xl p-8 hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-300 group">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-white font-display font-bold text-xl mb-2 group-hover:text-brand-300 transition-colors">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-500 text-xs uppercase tracking-widest mb-10">Technologies We Master</p>
          <div className="flex flex-wrap justify-center gap-4">
            {TECH.map(t => (
              <span key={t} className="glass px-6 py-3 rounded-full text-sm font-mono text-slate-300 hover:text-brand-300 hover:border-brand-500/40 transition-all cursor-default">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-accent-500/10 rounded-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Ready to Build Something <span className="text-gradient italic">Great?</span>
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Let's discuss your project and craft a solution that exceeds expectations.
            </p>
            <Link to="/contact" className="inline-flex px-10 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl hover:glow transition-all duration-200 hover:scale-105">
              Get in Touch →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
