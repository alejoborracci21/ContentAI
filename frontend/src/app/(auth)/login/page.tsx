"use client"

import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createArticlesWithIA } from "@/lib/api/articles"

export default function IAForm({ onBack }: { onBack: () => void }) {
  const [tema, setTema] = useState("")
  const [palabrasClave, setPalabrasClave] = useState("")
  const [tonoTexto, setTonoTexto] = useState("formal")
  const [formato, setFormato] = useState("guide")    // opcional según tu API
  const [longitud, setLongitud] = useState("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      const result = await createArticlesWithIA({
        tema,
        palabrasClave,
        tonoTexto,
        Longitud: longitud,
      })
      // asumimos { content: string } o similar
      setGeneratedContent(result.content ?? JSON.stringify(result))
      setIsGenerated(true)
    } catch (err) {
      console.error("Error generando artículo:", err)
      alert("Ocurrió un error al generar el artículo.")
    } finally {
      setIsGenerating(false)
    }
  }

  if (isGenerated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Artículo Generado</CardTitle>
          <CardDescription>Revisa el contenido generado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-neutral max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {generatedContent}
            </ReactMarkdown>
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
            <Input
              id="topic"
              required
              placeholder="Ej: Inteligencia Artificial"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Palabras clave</Label>
            <Input
              id="keywords"
              placeholder="Ej: IA, modelos, GPT"
              value={palabrasClave}
              onChange={(e) => setPalabrasClave(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tone">Tono</Label>
              <Select
                value={tonoTexto}
                onValueChange={(v) => setTonoTexto(v)}
              >
                <SelectTrigger>
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
              <Label htmlFor="format">Formato (opcional)</Label>
              <Select
                value={formato}
                onValueChange={(v) => setFormato(v)}
              >
                <SelectTrigger>
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
              <Select
                value={longitud}
                onValueChange={(v) => setLongitud(v)}
              >
                <SelectTrigger>
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
