import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function CTASection() {
  return (
    <section style={{ background: 'linear-gradient(135deg, #1140A0 0%, #1A56DB 100%)' }} className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-white">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight">
              Pronto para contratar o melhor freelancer?
            </h2>
            <p className="text-blue-100 text-sm mb-5">
              Publique seu projeto agora e receba propostas de profissionais qualificados em minutos.
            </p>
            <ul className="space-y-2 text-sm text-blue-50">
              {[
                'Cadastro gratuito e sem burocracia',
                'Receba propostas em minutos',
                'Pagamento 100% protegido',
                'Freelancers verificados e avaliados',
              ].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-300 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Link
              href="/publicar-projeto"
              className="text-center bg-white text-[#1A56DB] font-bold py-3.5 px-10 rounded-lg hover:bg-blue-50 transition-colors text-sm shadow-xl"
            >
              Publicar projeto agora
            </Link>
            <Link
              href="/cadastro?tipo=freelancer"
              className="text-center border-2 border-white/50 text-white font-semibold py-3.5 px-10 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              Quero trabalhar como freelancer
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
