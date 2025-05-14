"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchArticleById, publishArticle, Article } from "@/lib/api/articles";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import rehypeRaw from "rehype-raw";
import { Skeleton } from "@/components/ui/skeleton";

// Función para formatear fecha ISO a "dd 'de' MMMM yyyy"
const formatDate = (dateString: string): string =>
  format(new Date(dateString), "dd 'de' MMMM yyyy", { locale: es });

export default function ArticleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);

  const handlePublish = () => {
    publishArticle(id as string)
      .then(() => router.push("/my-articles"))
      .catch(() => console.error("Error al publicar artículo:"));
  };

  useEffect(() => {
    async function fetchArticle() {
      const res = await fetchArticleById(id as string);
      setArticle(res);
    }
    if (id) fetchArticle();
  }, [id]);

  if (!article) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-screen w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <Button variant="ghost" onClick={() => router.push("/my-articles")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a mis artículos
      </Button>

      <Card className="max-w-screen-xl mx-auto">
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
          <CardDescription>
            <div className="flex gap-2 items-center">
              <Badge variant="outline">{article.author || "Desconocido"}</Badge>
              <span className="text-xs text-muted-foreground">
                {article.creationDate
                  ? formatDate(article.creationDate)
                  : "Fecha no disponible"}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <article className="prose prose-neutral dark:prose-invert max-w-none ">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
            >
              {article.content}
            </ReactMarkdown>
          </article>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => router.push(`/my-articles/${article.id}/edit`)}
            >
              Editar
            </Button>
            <Button onClick={handlePublish}>Publicar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
