'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Star, TrendingUp, Shield } from 'lucide-react'

const rotatingTexts = [
  'desenvolver seu código',
  'criar seu site',
  'escrever seu conteúdo',
  'desenhar seu logo',
  'melhorar seu SEO',
  'editar seu vídeo',
]

const badges = [
  { icon: Star, text: '3.4M+ Freelancers' },
  { icon: Shield, text: 'Pagamento Seguro' },
  { icon: TrendingUp, text: '136k Projetos' },
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % rotatingTexts.length)
        setVisible(true)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden text-white hero-mesh" style={{ minHeight: '480px' }}>
      {/* Decorative orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }} />
      <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #22D3EE, transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #F97316, transparent)' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-cyan-300 mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
          A maior plataforma de freelancers do Brasil
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
          Encontre o freelancer ideal
          <br />
          <span className="text-white/60 font-light text-xl sm:text-3xl md:text-4xl">para </span>
          <span
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, #6366F1, #22D3EE)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'opacity 0.3s ease',
              opacity: visible ? 1 : 0,
            }}
          >
            {rotatingTexts[currentIndex]}
          </span>
        </h1>

        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8">
          Conectamos empresas e profissionais talentosos. Publique seu projeto e receba propostas em minutos.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link
            href="/publicar-projeto"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-bold px-8 py-3.5 rounded-xl text-sm md:text-base transition-all shadow-2xl shadow-orange-900/40 hover:-translate-y-0.5"
          >
            Publicar Projeto <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/cadastro?tipo=freelancer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-xl text-sm md:text-base transition-all backdrop-blur-sm"
          >
            Sou Freelancer
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          {badges.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-medium text-gray-300 backdrop-blur-sm">
              <Icon className="w-3.5 h-3.5 text-indigo-400" />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40L1440 40L1440 20C1200 0 960 40 720 20C480 0 240 40 0 20L0 40Z" fill="#F8FAFC"/>
        </svg>
      </div>
    </section>
  )
}
