"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { fetchArticleById, publishArticle, Article } from "@/lib/api/articles"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Función para formatear fecha ISO a "dd 'de' MMMM yyyy"
const formatDate = (dateString: string): string =>
  format(new Date(dateString), "dd 'de' MMMM yyyy", { locale: es })

export default function ArticleDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)

  const handlePublish = () => {
    publishArticle(id as string)
      .then(() => router.push("/my-articles"))
      .catch(() => console.error("Error al publicar artículo:"))
  }

  useEffect(() => {
    async function fetchArticle() {
      const res = await fetchArticleById(id as string)
      setArticle(res)
    }
    if (id) fetchArticle()
  }, [id])

  if (!article) {
    return <div className="p-6">Cargando artículo...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>
          <div className="flex gap-2 items-center">
            <Badge variant="outline">
              {article.author || "Desconocido"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {article.creationDate
                ? formatDate(article.creationDate)
                : "Fecha no disponible"}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="whitespace-pre-line">{article.content}</p>
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
  )
}
