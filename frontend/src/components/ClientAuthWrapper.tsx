'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function ClientAuthWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const token = localStorage.getItem('token')

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        if (!token) {
          setLoading(false)
        }
        router.replace('/login')
      } else {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router, token])

  if (loading) {
    return <div className="p-6">Cargando...</div>
  }

  return <>{children}</>
}
