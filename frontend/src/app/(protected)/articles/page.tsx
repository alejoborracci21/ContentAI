"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Datos de ejemplo para la tabla
  const articles = [
    { id: 1, title: "Tendencias de marketing digital en 2023", author: "IA ContenAI", date: "15/04/2023" },
    { id: 2, title: "Guía completa de SEO para principiantes", author: "IA ContenAI", date: "22/03/2023" },
    { id: 3, title: "Cómo mejorar la productividad en el trabajo remoto", author: "IA ContenAI", date: "10/02/2023" },
    { id: 4, title: "10 consejos para escribir mejores emails", author: "IA ContenAI", date: "05/01/2023" },
    { id: 5, title: "El futuro de la inteligencia artificial", author: "IA ContenAI", date: "28/12/2022" },
  ]

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button asChild>
            <Link href="/generator">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Artículo
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Artículos Publicados</CardTitle>
            <CardDescription>Lista de todos tus artículos generados y publicados</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>{article.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  )
}
