"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createArticlesWithIA, createArticle } from "@/lib/api/articles";
import MDXEditorWrapper from "@/components/MDXEditorWrapper";
import rehypeRaw from "rehype-raw";

export default function IAform({ onSwitchToAI }: { onSwitchToAI: () => void }) {
  const router = useRouter();

  const [tema, setTema] = useState("");
  const [palabrasClave, setPalabrasClave] = useState("");
  const [tonoTexto, setTonoTexto] = useState("formal");
  const [formato, setFormato] = useState("guide");
  const [longitud, setLongitud] = useState("medium");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const result = await createArticlesWithIA({
        tema,
        palabrasClave,
        tonoTexto,
        Longitud: longitud,
      });
      const content = result.content ?? JSON.stringify(result);
      setGeneratedContent(content);
      setIsGenerated(true);
    } catch (err) {
      console.error("Error generando artículo:", err);
      alert("Ocurrió un error al generar el artículo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const startEditing = () => {
    setEditingContent(generatedContent);
    setIsEditing(true);
  };

  const saveEdits = () => {
    setGeneratedContent(editingContent);
    setIsEditing(false);
  };

  const cancelEdits = () => {
    setIsEditing(false);
  };

  const openSaveDialog = () => {
    setNewTitle("");
    setIsDialogOpen(true);
  };

  const handleConfirmSave = async () => {
    if (!newTitle.trim()) {
      alert("El título no puede estar vacío.");
      return;
    }
    try {
      await createArticle({
        title: newTitle.trim(),
        content: generatedContent,
      });
      setIsDialogOpen(false);
      router.push("/my-articles");
    } catch (err) {
      console.error("Error al guardar artículo:", err);
      alert("No se pudo guardar el artículo.");
    }
  };

  if (isGenerated) {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Artículo Generado</CardTitle>
            <CardDescription>
              {isEditing
                ? "Edita el contenido y guarda o cancela los cambios"
                : "Revisa el contenido generado"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isEditing ? (
              <MDXEditorWrapper
                initialContent={editingContent}
                onChange={(val) => setEditingContent(val)}
              />
            ) : (
              <article className="prose prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                >
                  {generatedContent}
                </ReactMarkdown>
              </article>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="outline" onClick={cancelEdits}>
                  Cancelar
                </Button>
                <Button onClick={saveEdits}>Guardar</Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsGenerated(false)}>
                  Volver a configurar
                </Button>
                <Button variant="outline" onClick={openSaveDialog}>
                  Guardar
                </Button>
                <Button onClick={startEditing}>Editar</Button>
              </div>
            )}
          </CardFooter>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Guardar Artículo</DialogTitle>
              <DialogDescription>
                Ingresa el título que deseas para este artículo.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="article-title">Título</Label>
              <Input
                id="article-title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ej: Mi artículo sobre IA"
              />
            </div>
            <DialogFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleConfirmSave}>Confirmar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
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
              <Select value={tonoTexto} onValueChange={setTonoTexto}>
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
              <Label htmlFor="format">Formato (opcional)</Label>
              <Select value={formato} onValueChange={setFormato}>
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
              <Select value={longitud} onValueChange={setLongitud}>
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
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onSwitchToAI}>
            Volver
          </Button>
          <Button type="submit" disabled={isGenerating}>
            {isGenerating ? "Generando..." : "Generar"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
