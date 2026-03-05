import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react'

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:underline" style={{ color: '#00AEEF' }}>
          <ArrowLeft className="w-4 h-4" /> Voltar para home
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Entre em Contato</h1>
        <p className="text-gray-600 mb-8">Estamos aqui para ajudar. Envie sua mensagem!</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg border border-gray-200 text-center">
            <Mail className="w-8 h-8 mx-auto mb-3" style={{ color: '#00AEEF' }} />
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Email</h3>
            <p className="text-xs text-gray-600">contato@meufreelas.com.br</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200 text-center">
            <Phone className="w-8 h-8 mx-auto mb-3" style={{ color: '#00AEEF' }} />
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Telefone</h3>
            <p className="text-xs text-gray-600">(11) 9999-9999</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-3" style={{ color: '#00AEEF' }} />
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Localização</h3>
            <p className="text-xs text-gray-600">São Paulo, Brasil</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nome</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent text-sm"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent text-sm"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assunto</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent text-sm"
                placeholder="Como podemos ajudar?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mensagem</label>
              <textarea
                rows={6}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent text-sm resize-none"
                placeholder="Descreva sua dúvida ou sugestão..."
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 text-sm font-semibold text-white rounded transition-colors"
              style={{ background: '#00AEEF' }}
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
