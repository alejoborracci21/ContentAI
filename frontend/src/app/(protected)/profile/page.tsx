"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut, onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        router.push("/login") // Si no hay usuario, redirige
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleClick = () => {
    signOut(auth)
      .then(() => {
        console.log("Sesión cerrada con éxito")
        router.push("/login")
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error)
      })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>

      <Card>
        <CardHeader>
          <CardTitle>Información de usuario</CardTitle>
          <CardDescription>
            Gestiona tu información de perfil y preferencias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p className="text-lg">{user?.email || "Cargando..."}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleClick} variant="destructive">
            Cerrar sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
