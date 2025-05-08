"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createArticle } from "@/lib/api/articles";
import MDXEditorWrapper from "@/components/MDXEditorWrapper";

export default function ManualForm({
  onSwitchToAI,
}: {
  onSwitchToAI: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const articleData = {
        title: title,
        content: content,
      };

      const createdArticle = await createArticle(articleData);
      if (!createdArticle) throw new Error("Error al crear el artículo");

      setTitle("");
      setContent("");
      alert("Artículo creado exitosamente");
    } catch (err) {
      console.error("Error al crear artículo:", err);
      alert("Ocurrió un error al guardar el artículo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Crear artículo manualmente</CardTitle>
          <CardDescription>Redacta tu artículo desde cero</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Título del artículo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <MDXEditorWrapper
              initialContent={content}
              onChange={(val) => setContent(val)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onSwitchToAI}>
            Usar IA para generar contenido
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar artículo"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
