"use client";

import { useRef, useState } from "react";
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
import MDXEditorWrapper, {
  MDXEditorWrapperRef,
} from "@/components/MDXEditorWrapper";
import { useToast } from "@/hooks/use-toast";

export default function ManualForm({
  onSwitchToAI,
}: {
  onSwitchToAI: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const editorRef = useRef<MDXEditorWrapperRef>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const articleData = { title, content };
      const createdArticle = await createArticle(articleData);
      if (!createdArticle) throw new Error("Error al crear el artículo");

      setTitle("");
      setContent("");
      editorRef.current?.resetContent();

      toast({
        title: "Artículo creado exitosamente",
        description: "Ahora puedes publicar o editar el artículo.",
        variant: "blue",
      });
    } catch (err) {
      console.error("Error al crear artículo:", err);
      toast({
        title: "Error al crear artículo",
        description: "Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Escribe un artículo</CardTitle>
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
              minLength={10}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <MDXEditorWrapper
              ref={editorRef}
              initialContent={content}
              onChange={(val) => setContent(val)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onSwitchToAI}>
            Generar con IA
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar artículo"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
