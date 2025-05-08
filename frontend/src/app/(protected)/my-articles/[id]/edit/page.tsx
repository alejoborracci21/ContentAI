"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchArticleById, updateArticle } from "@/lib/api/articles";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MDXEditorWrapper from "@/components/MDXEditorWrapper";

export default function EditArticlePage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function loadArticle() {
      const data = await fetchArticleById(id as string);
      if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
    }
    loadArticle();
  }, [id]);

  const handleUpdate = async () => {
    await updateArticle(id as string, { title, content });
    router.push(`/my-articles/${id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar artículo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        {content && (
          <MDXEditorWrapper
            initialContent={content}
            onChange={(val) => {
              setContent(val);
            }}
          />
        )}
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button onClick={handleUpdate}>Guardar</Button>
      </CardFooter>
    </Card>
  );
}
