'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const rotatingKeywords = [
  'melhorar o seu SEO',
  'desenvolver o seu código',
  'desenhar o seu website',
  'escrever o seu conteúdo',
  'criar o seu logotipo',
  'criar o seu vídeo',
]

export default function HeroSection() {
  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % rotatingKeywords.length)
        setFade(true)
      }, 300)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      className="relative min-h-[380px] flex items-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)' }} />

      <div className="relative w-full max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6 text-white">
          Encontre o melhor profissional freelancer<br />
          para{' '}
          <span
            className="text-white transition-opacity duration-300"
            style={{ opacity: fade ? 1 : 0 }}
          >
            {rotatingKeywords[idx]}.
          </span>
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/publicar-projeto"
            className="px-8 py-3 text-sm font-semibold text-white rounded transition-colors"
            style={{ background: '#00AEEF' }}
          >
            Publicar projeto
          </Link>
          <Link
            href="/cadastro?tipo=freelancer"
            className="px-8 py-3 text-sm font-semibold text-white border-2 border-white rounded hover:bg-white hover:text-gray-800 transition-colors"
          >
            Quero Trabalhar
          </Link>
        </div>
      </div>
    </section>
  )
}
