import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number | string): string {
  const num = typeof value === 'string' ? parseFloat(value) : value
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export function formatRelativeTime(date: Date | string): string {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (minutes < 1) return 'agora mesmo'
  if (minutes < 60) return `há ${minutes} min`
  if (hours < 24) return `há ${hours}h`
  if (days < 7) return `há ${days} dia${days > 1 ? 's' : ''}`
  return formatDate(date)
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('pt-BR').format(num)
}

export function calculatePlatformFee(amount: number, feePercent: number = 10): number {
  return (amount * feePercent) / 100
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    OPEN: 'Aberto',
    IN_PROGRESS: 'Em andamento',
    COMPLETED: 'Concluído',
    CANCELLED: 'Cancelado',
    DISPUTED: 'Em disputa',
    UNDER_REVIEW: 'Em análise',
    RESOLVED_CLIENT: 'Resolvido (cliente)',
    RESOLVED_FREELANCER: 'Resolvido (freelancer)',
    CLOSED: 'Fechado',
    PENDING: 'Pendente',
    ACCEPTED: 'Aceita',
    REJECTED: 'Rejeitada',
    WITHDRAWN: 'Retirada',
    HELD: 'Retido',
    RELEASED: 'Liberado',
    REFUNDED: 'Reembolsado',
  }
  return labels[status] ?? status
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    OPEN: 'bg-blue-100 text-blue-800',
    IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    DISPUTED: 'bg-orange-100 text-orange-800',
    UNDER_REVIEW: 'bg-blue-100 text-blue-800',
    RESOLVED_CLIENT: 'bg-green-100 text-green-800',
    RESOLVED_FREELANCER: 'bg-green-100 text-green-800',
    CLOSED: 'bg-gray-200 text-gray-800',
    PENDING: 'bg-gray-100 text-gray-800',
    ACCEPTED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    HELD: 'bg-yellow-100 text-yellow-800',
    RELEASED: 'bg-green-100 text-green-800',
  }
  return colors[status] ?? 'bg-gray-100 text-gray-800'
}
