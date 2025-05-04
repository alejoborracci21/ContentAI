"use client";

import type React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GenerateArticlePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulación de generación de contenido
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      setGeneratedContent(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.\n\nNullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl."
      );
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Generar Artículo</h1>

      {!isGenerated ? (
        <Card>
          <form onSubmit={handleGenerate}>
            <CardHeader className="mb-4">
              <CardTitle>Configuración del artículo</CardTitle>
              <CardDescription>
                Configura los parámetros para generar tu artículo con IA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Tema del artículo</Label>
                <Input
                  id="topic"
                  placeholder="Ej: Marketing digital para pequeñas empresas"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">
                  Palabras clave (separadas por comas)
                </Label>
                <Input
                  id="keywords"
                  placeholder="Ej: marketing, redes sociales, estrategia"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tone">Tono</Label>
                  <Select defaultValue="formal">
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Selecciona un tono" />
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
                      <SelectValue placeholder="Selecciona un formato" />
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
                      <SelectValue placeholder="Selecciona una longitud" />
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
            <CardFooter className="mt-4">
              <Button type="submit" className="w-full" disabled={isGenerating}>
                {isGenerating ? "Generando..." : "Generar Artículo"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Artículo Generado</CardTitle>
            <CardDescription>
              Revisa el contenido generado por la IA
            </CardDescription>
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
      )}
    </div>
  );
}
