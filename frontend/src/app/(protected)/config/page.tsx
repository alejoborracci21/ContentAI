'use client'

import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function ConfigPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()

  useEffect(() => {
    const user = auth.currentUser
    if (user) {
      setEmail(user.email || '')
      setName(user.displayName || '')
    }
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Configuración de tu cuenta</h1>

      <div className="space-y-2">
        <div>
          <p className="text-sm text-gray-500">Email:</p>
          <p className="font-medium">{email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Nombre:</p>
          <p className="font-medium">{name || 'No especificado'}</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
