'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/articles', label: 'Artículos publicados' },
  { href: '/my-articles', label: 'Tus artículos' },
  { href: '/generator', label: 'Generador de IA' },
  { href: '/profile', label: 'Tu perfil' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen border-r bg-white p-4">
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'rounded px-3 py-2 text-sm font-medium hover:bg-gray-100 transition',
              pathname.startsWith(link.href) ? 'bg-gray-100 font-semibold' : ''
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
