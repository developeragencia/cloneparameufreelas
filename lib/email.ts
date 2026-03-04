import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  return transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, html })
}

export const emailTemplates = {
  verifyEmail: (name: string, link: string) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
      <div style="background:#00aeef;padding:20px;text-align:center;border-radius:8px 8px 0 0">
        <h1 style="color:white;margin:0">MeuFreelas</h1>
      </div>
      <div style="background:#f9f9f9;padding:30px;border-radius:0 0 8px 8px">
        <h2>Olá, ${name}!</h2>
        <p>Confirme seu email para ativar sua conta no MeuFreelas.</p>
        <a href="${link}" style="display:inline-block;background:#00aeef;color:white;padding:12px 24px;border-radius:4px;text-decoration:none;font-weight:bold;margin:20px 0">Verificar Email</a>
        <p style="color:#666;font-size:14px">Se você não criou uma conta, ignore este email.</p>
      </div>
    </div>
  `,
  resetPassword: (name: string, link: string) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
      <div style="background:#00aeef;padding:20px;text-align:center;border-radius:8px 8px 0 0">
        <h1 style="color:white;margin:0">MeuFreelas</h1>
      </div>
      <div style="background:#f9f9f9;padding:30px;border-radius:0 0 8px 8px">
        <h2>Redefinir Senha</h2>
        <p>Olá, ${name}! Clique no botão abaixo para redefinir sua senha.</p>
        <a href="${link}" style="display:inline-block;background:#00aeef;color:white;padding:12px 24px;border-radius:4px;text-decoration:none;font-weight:bold;margin:20px 0">Redefinir Senha</a>
        <p style="color:#666;font-size:14px">Este link expira em 1 hora. Se você não solicitou isso, ignore este email.</p>
      </div>
    </div>
  `,
  newProposal: (clientName: string, projectTitle: string, freelancerName: string, dashboardLink: string) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
      <div style="background:#00aeef;padding:20px;text-align:center;border-radius:8px 8px 0 0">
        <h1 style="color:white;margin:0">MeuFreelas</h1>
      </div>
      <div style="background:#f9f9f9;padding:30px;border-radius:0 0 8px 8px">
        <h2>Nova Proposta Recebida!</h2>
        <p>Olá, ${clientName}! <strong>${freelancerName}</strong> enviou uma proposta para o seu projeto <strong>"${projectTitle}"</strong>.</p>
        <a href="${dashboardLink}" style="display:inline-block;background:#00aeef;color:white;padding:12px 24px;border-radius:4px;text-decoration:none;font-weight:bold;margin:20px 0">Ver Proposta</a>
      </div>
    </div>
  `,
  proposalAccepted: (freelancerName: string, projectTitle: string, dashboardLink: string) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
      <div style="background:#00aeef;padding:20px;text-align:center;border-radius:8px 8px 0 0">
        <h1 style="color:white;margin:0">MeuFreelas</h1>
      </div>
      <div style="background:#f9f9f9;padding:30px;border-radius:0 0 8px 8px">
        <h2>Proposta Aceita! 🎉</h2>
        <p>Parabéns, ${freelancerName}! Sua proposta para o projeto <strong>"${projectTitle}"</strong> foi aceita.</p>
        <a href="${dashboardLink}" style="display:inline-block;background:#00aeef;color:white;padding:12px 24px;border-radius:4px;text-decoration:none;font-weight:bold;margin:20px 0">Ver Projeto</a>
      </div>
    </div>
  `,
  paymentReceived: (freelancerName: string, amount: string, projectTitle: string) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
      <div style="background:#00aeef;padding:20px;text-align:center;border-radius:8px 8px 0 0">
        <h1 style="color:white;margin:0">MeuFreelas</h1>
      </div>
      <div style="background:#f9f9f9;padding:30px;border-radius:0 0 8px 8px">
        <h2>Pagamento Liberado! 💰</h2>
        <p>Olá, ${freelancerName}! O valor de <strong>${amount}</strong> referente ao projeto <strong>"${projectTitle}"</strong> foi liberado para o seu saldo.</p>
      </div>
    </div>
  `,
}
