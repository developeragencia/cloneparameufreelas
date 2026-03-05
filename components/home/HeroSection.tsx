'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const rotatingTexts = [
  'desenvolver o seu código',
  'criar o seu site',
  'escrever o seu conteúdo',
  'desenhar o seu logo',
  'melhorar o seu SEO',
  'editar o seu vídeo',
]

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative w-full flex items-center justify-center text-white"
      style={{
        minHeight: '480px',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 leading-tight">
          Encontre o melhor profissional freelancer<br />
          para{' '}
          <span className="text-[#00aeef]">{rotatingTexts[currentTextIndex]}</span>.
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/publicar-projeto"
            className="bg-[#00aeef] hover:bg-[#0099d4] text-white font-bold px-10 py-4 rounded text-base transition-colors shadow-lg"
          >
            Publicar projeto
          </Link>
          <Link
            href="/cadastro?tipo=freelancer"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-800 font-bold px-10 py-4 rounded text-base transition-colors"
          >
            Quero Trabalhar
          </Link>
        </div>
      </div>
    </section>
  )
}
