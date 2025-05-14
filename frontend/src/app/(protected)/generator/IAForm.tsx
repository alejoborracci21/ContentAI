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
import { useToast } from "@/hooks/use-toast";

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

  const [temaError, setTemaError] = useState("");
  const [palabrasClaveError, setPalabrasClaveError] = useState("");

  const { toast } = useToast();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!tema.trim()) {
      setTemaError("El tema no puede estar vacío.");
      hasError = true;
    } else if (tema.trim().length < 5) {
      setTemaError("El tema debe tener al menos 5 caracteres.");
      hasError = true;
    } else {
      setTemaError("");
    }

    if (!palabrasClave.trim()) {
      setPalabrasClaveError("Las palabras clave no pueden estar vacías.");
      hasError = true;
    } else if (palabrasClave.trim().length < 5) {
      setPalabrasClaveError(
        "Las palabras clave deben tener al menos 5 caracteres."
      );
      hasError = true;
    } else {
      setPalabrasClaveError("");
    }
    if (hasError) return;

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
      toast({
        title: "Artículo creado exitosamente",
        description: "Ahora puedes publicar o editar el artículo.",
        variant: "blue",
      });
    } catch (err) {
      console.error("Error generando artículo:", err);
      toast({
        title: "Error al crear artículo",
        description: "Por favor intenta nuevamente.",
        variant: "destructive",
      });
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
      toast({
        title: "El título no puede estar vacío.",
        description: "Por favor intenta nuevamente.",
        variant: "destructive",
      });
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
      toast({
        title: "Error al crear artículo",
        description: "Por favor intenta nuevamente.",
        variant: "destructive",
      });
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
        <fieldset
          disabled={isGenerating}
          className={`space-y-4  transition-opacity ${
            isGenerating ? "animate-pulse" : ""
          }`}
        >
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Tema del artículo</Label>
              <Input
                id="topic"
                placeholder="Ej: Inteligencia Artificial"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                className={temaError ? "border-red-500 focus:ring-red-500" : ""}
              />
              {temaError && <p className="text-red-500 text-sm">{temaError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Palabras clave</Label>
              <Input
                id="keywords"
                placeholder="Ej: IA, modelos, GPT"
                value={palabrasClave}
                onChange={(e) => setPalabrasClave(e.target.value)}
                className={
                  palabrasClaveError ? "border-red-500 focus:ring-red-500" : ""
                }
              />
              {palabrasClaveError && (
                <p className="text-red-500 text-sm">{palabrasClaveError}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tone">Tono</Label>
                <Select value={tonoTexto} onValueChange={setTonoTexto}>
                  <SelectTrigger disabled={isGenerating} id="tone">
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
                  <SelectTrigger disabled={isGenerating} id="format">
                    <SelectValue placeholder="Formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guide">Guía</SelectItem>
                    <SelectItem value="list (numered and bulleted)">
                      Lista
                    </SelectItem>
                    <SelectItem value="comparison">Comparativa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">Longitud</Label>
                <Select value={longitud} onValueChange={setLongitud}>
                  <SelectTrigger disabled={isGenerating} id="length">
                    <SelectValue placeholder="Longitud" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Corta</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="very long">Larga</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={onSwitchToAI}>
              Escribir un artículo
            </Button>
            <Button type="submit">
              {isGenerating ? "Generando..." : "Generar"}
            </Button>
          </CardFooter>
        </fieldset>
      </Card>
    </form>
  );
}
