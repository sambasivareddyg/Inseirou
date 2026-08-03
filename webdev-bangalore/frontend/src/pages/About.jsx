import React from 'react'

const TEAM = [
  { name:'Arjun Sharma',    role:'Founder & CTO',        exp:'12 yrs', stack:'Java · Spring · AWS' },
  { name:'Priya Nair',      role:'Lead Frontend Architect', exp:'9 yrs', stack:'React · TypeScript · UX' },
  { name:'Rahul Mehta',     role:'DevOps Lead',           exp:'8 yrs',  stack:'K8s · Docker · Terraform' },
  { name:'Sneha Reddy',     role:'Backend Engineer',      exp:'7 yrs',  stack:'Spring Boot · Kafka · Redis' },
]

const VALUES = [
  { icon:'🎯', title:'Quality First', desc:'We never ship mediocre code. Every line is reviewed, tested, and refined.' },
  { icon:'🚀', title:'Speed & Scale', desc:'Built for the long run. Our architectures handle 10x growth effortlessly.' },
  { icon:'🤝', title:'Transparency',  desc:'Real-time project dashboards. No surprises, ever.' },
  { icon:'🌱', title:'Continuous Learning', desc:'We adopt emerging tech early and transfer that knowledge to you.' },
]

export default function About() {
  return (
    <div className="min-h-screen pt-28 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-brand-400 font-mono text-xs uppercase tracking-widest mb-3">About Us</p>
          <h1 className="text-5xl md:text-6xl font-display font-black text-white mb-6">
            Built in Bangalore,<br/>
            <span className="text-gradient italic">Delivered Globally</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Founded in 2016, PixelCraft Studio is a boutique web development agency in HSR Layout, Bangalore. 
            We specialize in building high-performance, cloud-native web applications for startups and enterprises worldwide.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {VALUES.map(v => (
            <div key={v.title} className="glass rounded-2xl p-8 flex gap-5 hover:border-brand-500/40 transition-all">
              <div className="text-3xl flex-shrink-0">{v.icon}</div>
              <div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-white">Meet the Team</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map(m => (
            <div key={m.name} className="glass rounded-2xl p-6 text-center hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-accent-400 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="font-display font-black text-white text-xl">{m.name[0]}</span>
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-1">{m.name}</h3>
              <p className="text-brand-400 text-xs font-medium mb-1">{m.role}</p>
              <p className="text-slate-500 text-xs mb-3">{m.exp} experience</p>
              <p className="text-slate-400 font-mono text-xs">{m.stack}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
