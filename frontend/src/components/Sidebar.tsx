'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  FileText,
  FilePlus,
  Sparkles,
  User,
  Settings
} from 'lucide-react'

const links = [
  { href: '/articles', label: 'Artículos publicados', icon: FileText },
  { href: '/my-articles', label: 'Tus artículos', icon: FilePlus },
  { href: '/generator', label: 'Generador de IA', icon: Sparkles },
  { href: '/profile', label: 'Tu perfil', icon: User },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen flex flex-col justify-between border-r bg-gray-50 p-4">
      <nav className="flex flex-col gap-2">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition',
                isActive
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      <Link
        href="/config"
        className={cn(
          'flex items-center gap-2 rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition'
        )}
      >
        <Settings className="w-4 h-4" />
        Configuración
      </Link>
    </aside>
  )
}
