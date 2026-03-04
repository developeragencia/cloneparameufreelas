'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

const heroCategories = ['deseno', 'programação', 'marketing', 'redação', 'SEO', 'vídeo']

export default function HeroSection() {
  const [currentCategory, setCurrentCategory] = useState(0)
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) router.push(`/freelancers?q=${encodeURIComponent(search)}`)
  }

  return (
    <section
      className="relative min-h-[520px] flex flex-col items-center justify-center text-white"
      style={{
        background: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80) center/cover no-repeat',
      }}
    >
      <div className="container-main text-center py-20 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
          Encontre o melhor profissional freelancer
          <br />
          <span className="text-[#00aeef]">para {heroCategories[currentCategory % heroCategories.length]}.</span>
        </h1>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex items-center max-w-xl mx-auto mt-8 mb-8 shadow-xl rounded overflow-hidden">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar freelancers por habilidade..."
            className="flex-1 px-5 py-4 text-gray-800 text-base outline-none"
          />
          <button
            type="submit"
            className="bg-[#00aeef] hover:bg-[#0099d4] px-6 py-4 text-white transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
          <Link
            href="/publicar-projeto"
            className="bg-[#00aeef] hover:bg-[#0099d4] text-white font-bold px-10 py-4 rounded text-lg transition-colors shadow-lg"
          >
            Publicar projeto
          </Link>
          <Link
            href="/cadastro?tipo=freelancer"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-800 font-bold px-10 py-4 rounded text-lg transition-colors"
          >
            Quero Trabalhar
          </Link>
        </div>
      </div>
    </section>
  )
}
