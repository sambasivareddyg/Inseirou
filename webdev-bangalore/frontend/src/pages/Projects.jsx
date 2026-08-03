import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SAMPLE = [
  { id:1, title:'FinTrack Pro',   category:'Fintech',    description:'Real-time portfolio tracking platform with microservices and Kafka event streaming.', tech:['React','Spring Boot','Kafka','Redis'], status:'LIVE' },
  { id:2, title:'MediCare Hub',   category:'Healthcare', description:'Patient management system with HIPAA-compliant data pipelines and real-time alerts.', tech:['React','Java','MySQL','Docker'], status:'LIVE' },
  { id:3, title:'ShopSphere',     category:'E-commerce', description:'Multi-vendor marketplace with ML-powered recommendations and Redis caching layer.', tech:['Next.js','Spring Cloud','Redis','AWS'], status:'LIVE' },
  { id:4, title:'LogiTrack',      category:'Logistics',  description:'Fleet management dashboard with GPS tracking, route optimization, and live updates.', tech:['React','Kafka','Kubernetes','MySQL'], status:'LIVE' },
  { id:5, title:'EduLearn',       category:'EdTech',     description:'Interactive learning platform with video streaming, quizzes, and progress analytics.', tech:['React','Spring Boot','AWS','Redis'], status:'LIVE' },
  { id:6, title:'HRPulse',        category:'HRTech',     description:'Employee engagement platform with payroll automation and compliance reporting.', tech:['React','Java','MySQL','Docker'], status:'LIVE' },
]

const CATS = ['All', 'Fintech', 'Healthcare', 'E-commerce', 'Logistics', 'EdTech', 'HRTech']

export default function Projects() {
  const [projects, setProjects]   = useState(SAMPLE)
  const [filter, setFilter]       = useState('All')

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <div className="min-h-screen pt-28 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-400 font-mono text-xs uppercase tracking-widest mb-3">Portfolio</p>
          <h1 className="text-5xl md:text-6xl font-display font-black text-white mb-4">Our Projects</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Delivered solutions across industries with real business impact.</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {CATS.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === c ? 'bg-brand-500 text-white glow' : 'glass text-slate-400 hover:text-white'
              }`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(p => (
            <div key={p.id} className="glass rounded-2xl p-8 hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-mono text-brand-400 uppercase tracking-widest">{p.category}</span>
                <span className="flex items-center gap-1.5 text-xs text-green-400">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  {p.status}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map(t => (
                  <span key={t} className="text-xs px-3 py-1 bg-brand-950/60 text-brand-300 rounded-full font-mono border border-brand-800/40">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
