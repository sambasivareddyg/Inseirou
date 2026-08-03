import React from 'react'
import { Link } from 'react-router-dom'

const SERVICES = [
  {
    icon: '⚛️', title: 'Frontend Development',
    desc: 'Modern, responsive web interfaces using React, Next.js, and Tailwind CSS. We prioritize performance, accessibility, and user experience.',
    points: ['React & Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion', 'Progressive Web Apps'],
  },
  {
    icon: '⚙️', title: 'Backend & APIs',
    desc: 'Robust, scalable backend systems using Java Spring Boot microservices, RESTful APIs, and GraphQL.',
    points: ['Spring Boot Microservices', 'REST & GraphQL APIs', 'Java & Kotlin', 'Spring Security', 'API Gateway'],
  },
  {
    icon: '☁️', title: 'Cloud & DevOps',
    desc: 'End-to-end cloud solutions with Docker, Kubernetes, CI/CD pipelines, and infrastructure as code.',
    points: ['AWS / GCP / Azure', 'Kubernetes & Docker', 'CI/CD Pipelines', 'Terraform', 'Monitoring & Alerting'],
  },
  {
    icon: '📊', title: 'Data Engineering',
    desc: 'Real-time data pipelines, event streaming with Apache Kafka, and analytics dashboards.',
    points: ['Apache Kafka', 'Redis Cluster', 'MySQL / PostgreSQL', 'Elasticsearch', 'Real-time Analytics'],
  },
  {
    icon: '📱', title: 'Mobile Development',
    desc: 'Cross-platform mobile applications with React Native and Flutter, deployed to iOS and Android.',
    points: ['React Native', 'Flutter', 'iOS & Android', 'Push Notifications', 'Offline Support'],
  },
  {
    icon: '🎨', title: 'UI/UX Design',
    desc: 'User-centered design from wireframes to polished prototypes. We design experiences that convert.',
    points: ['Figma Design', 'User Research', 'Design Systems', 'Prototyping', 'Usability Testing'],
  },
]

export default function Services() {
  return (
    <div className="min-h-screen pt-28 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-brand-400 font-mono text-xs uppercase tracking-widest mb-3">What We Offer</p>
          <h1 className="text-5xl md:text-6xl font-display font-black text-white mb-4">Our Services</h1>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Full-stack digital solutions tailored for startups, enterprises, and everything in between.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="glass rounded-2xl p-8 hover:border-brand-500/40 hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="text-4xl mb-5">{s.icon}</div>
              <h2 className="text-2xl font-display font-bold text-white mb-3">{s.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>
              <ul className="space-y-2">
                {s.points.map(p => (
                  <li key={p} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 bg-brand-400 rounded-full flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link to="/contact" className="inline-flex px-10 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl hover:glow transition-all duration-200">
            Request a Consultation →
          </Link>
        </div>
      </div>
    </div>
  )
}
