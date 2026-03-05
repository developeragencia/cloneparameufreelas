import Link from 'next/link'
import Image from 'next/image'
type Props = {
  href?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'light' | 'dark'
  className?: string
  priority?: boolean
}
const sizeMap: Record<NonNullable<Props['size']>, { w: number; h: number }> = {
  sm: { w: 96, h: 24 },
  md: { w: 140, h: 32 },
  lg: { w: 180, h: 40 },
  xl: { w: 220, h: 48 },
}
export default function Logo({ href = '/', size = 'md', className, priority }: Props) {
  const { w, h } = sizeMap[size]
  return (
    <Link href={href} className={className}>
      <Image src="/logo.png" alt="meufreelas" width={w} height={h} priority={priority} />
    </Link>
  )
}
