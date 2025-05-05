"use client"

import type React from "react"
import { useState } from "react"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"

export default function IAForm({ onBack }: { onBack: () => void }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
      setGeneratedContent(
        "Artículo generado por IA: Lorem ipsum dolor sit amet..."
      )
    }, 2000)
  }

  if (isGenerated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Artículo Generado</CardTitle>
          <CardDescription>Revisa el contenido generado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 rounded-md whitespace-pre-line">
            {generatedContent}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setIsGenerated(false)}>
            Volver a configurar
          </Button>
          <div className="space-x-2">
            <Button variant="outline">Guardar en borradores</Button>
            <Button>Editar</Button>
          </div>
        </CardFooter>
      </Card>
    )
  }

  return (
    <form onSubmit={handleGenerate}>
      <Card>
        <CardHeader>
          <CardTitle>Generar con IA</CardTitle>
          <CardDescription>Configura los parámetros</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Tema del artículo</Label>
            <Input id="topic" required placeholder="Ej: Inteligencia Artificial" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Palabras clave</Label>
            <Input id="keywords" placeholder="Ej: IA, modelos, GPT" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tone">Tono</Label>
              <Select defaultValue="formal">
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Tono" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="friendly">Amigable</SelectItem>
                  <SelectItem value="technical">Técnico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="format">Formato</Label>
              <Select defaultValue="guide">
                <SelectTrigger id="format">
                  <SelectValue placeholder="Formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guide">Guía</SelectItem>
                  <SelectItem value="list">Lista</SelectItem>
                  <SelectItem value="comparison">Comparativa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="length">Longitud</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="length">
                  <SelectValue placeholder="Longitud" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Corta</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="long">Larga</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Volver
          </Button>
          <Button type="submit" disabled={isGenerating}>
            {isGenerating ? "Generando..." : "Generar"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
