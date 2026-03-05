'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

const rotatingWords = ['website', 'aplicativo', 'logotipo', 'conteúdo', 'marketing', 'vídeo']

const popularSearches = ['Designer UI/UX', 'Desenvolvedor React', 'Redator', 'Especialista SEO']

export default function HeroSection() {
  const router = useRouter()
  const [wordIndex, setWordIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState('Freelancers')
  const [showDrop, setShowDrop] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setWordIndex(p => (p + 1) % rotatingWords.length)
        setAnimating(false)
      }, 250)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setShowDrop(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const path = searchType === 'Projetos' ? '/projetos' : '/freelancers'
    router.push(query.trim() ? `${path}?q=${encodeURIComponent(query)}` : path)
  }

  return (
    <section
      className="relative text-white"
      style={{ background: 'linear-gradient(135deg, #1140A0 0%, #1A56DB 50%, #1E6FE8 100%)', paddingTop: '60px', paddingBottom: '70px' }}
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-[2.8rem] font-extrabold leading-tight mb-3 tracking-tight">
          Encontre o freelancer ideal<br />
          para o seu{' '}
          <span
            className="inline-block min-w-[140px] text-left transition-all duration-200"
            style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(-6px)' : 'translateY(0)' }}
          >
            <span className="relative">
              <span className="relative z-10">{rotatingWords[wordIndex]}</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-white/20 rounded" />
            </span>
          </span>
        </h1>

        <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-xl mx-auto font-normal">
          Mais de <strong className="text-white">3.4 milhões</strong> de profissionais prontos para o seu projeto.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl mb-5">
          {/* Type selector */}
          <div ref={dropRef} className="relative bg-white border-r border-gray-200 flex-shrink-0">
            <button type="button" onClick={() => setShowDrop(!showDrop)}
              className="flex items-center gap-1.5 px-4 py-4 text-sm font-semibold text-gray-700 whitespace-nowrap h-full hover:bg-gray-50 transition-colors">
              {searchType} <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            {showDrop && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-36 overflow-hidden">
                {['Freelancers', 'Projetos'].map(opt => (
                  <button key={opt} type="button" onClick={() => { setSearchType(opt); setShowDrop(false) }}
                    className="block w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-[#1A56DB]">
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Input */}
          <input
            type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder={`Ex: desenvolvedor React, designer, redator...`}
            className="flex-1 px-5 py-4 text-gray-800 text-sm outline-none bg-white"
          />
          {/* Submit */}
          <button type="submit"
            className="px-6 py-4 bg-[#F97316] hover:bg-[#E86300] text-white font-bold text-sm transition-colors whitespace-nowrap flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Buscar</span>
          </button>
        </form>

        {/* Popular searches */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-blue-200 text-xs font-medium">Popular:</span>
          {popularSearches.map(term => (
            <button key={term} onClick={() => { setQuery(term); router.push(`/freelancers?q=${encodeURIComponent(term)}`) }}
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full border border-white/20 transition-colors">
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative mt-10 border-t border-white/20">
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {[
              { value: '3.4M+', label: 'Freelancers cadastrados' },
              { value: '136 mil', label: 'Projetos publicados' },
              { value: 'R$ 26M+', label: 'Pagos com segurança' },
              { value: '4.8★', label: 'Avaliação média' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-white">{stat.value}</div>
                <div className="text-xs text-blue-200 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
