"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Article, fetchArticleById } from "@/lib/api/articles";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import remarkGfm from "remark-gfm";

const formatDate = (dateString: string): string =>
  format(new Date(dateString), "dd 'de' MMMM yyyy", { locale: es });

export default function ArticleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchArticleById(id as string);
        setArticle(data);
      } catch (error) {
        console.error("Error cargando artículo:", error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-screen w-full" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center text-muted-foreground mt-10">
        No se encontró el artículo solicitado.
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <Button variant="ghost" onClick={() => router.push("/articles")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al listado
      </Button>

      <Card className="max-w-screen-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{article.title}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <Badge variant="outline">{article.author}</Badge>
            <span>
              {article.publicationDate
                ? formatDate(article.publicationDate)
                : "—"}
            </span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
            >
              {article.content}
            </ReactMarkdown>
          </article>
        </CardContent>
      </Card>
    </div>
  );
}
