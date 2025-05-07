"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlusCircle, Eye } from "lucide-react"
import { fetchArticles, Article } from "@/lib/api/articles"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Función para formatear fechas con date-fns
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return format(date, "dd 'de' MMMM yyyy", { locale: es })
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const loadArticles = async () => {
      const data = await fetchArticles()
      setArticles(data)
    }
    loadArticles()
  }, [])

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Foro de artículos</h1>
        <Button asChild>
          <Link href="/generator" className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Artículo
          </Link>
        </Button>
      </div>

      {/* Tabla de artículos */}
      <Card>
        <CardHeader>
          <CardTitle>Artículos Publicados</CardTitle>
          <CardDescription>
            Lista de todos tus artículos generados y publicados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.length > 0 ? (
                articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">
                      {article.title}
                    </TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>
                      {article.publicationDate
                        ? formatDate(article.publicationDate)
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm">
                        <Link
                          href={`/articles/${article.id}`}
                          className="flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalle
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground py-4"
                  >
                    No se encontraron artículos
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
