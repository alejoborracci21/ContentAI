"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const [userEmail] = useState("usuario@ejemplo.com")


  return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>

        <Card>
          <CardHeader>
            <CardTitle>Información de usuario</CardTitle>
            <CardDescription>Gestiona tu información de perfil y preferencias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p className="text-lg">{userEmail}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" >
              Cerrar sesión
            </Button>
          </CardFooter>
        </Card>
      </div>
  )
}
