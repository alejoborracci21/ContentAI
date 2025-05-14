"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Eye, Trash2, Search } from "lucide-react";
import { myArticles, deleteArticle, Article } from "@/lib/api/articles";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Formatea "YYYY-MM-DD..." a "dd 'de' MMMM yyyy"
const formatDate = (dateString: string): string =>
  format(new Date(dateString), "dd 'de' MMMM yyyy", { locale: es });

export default function HistoryPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null
  );

  const router = useRouter();

  useEffect(() => {
  const fetchAndSort = async () => {
    try {
      const res = await myArticles();
      // Ordena por timestamp (incluye hora), del más reciente al más antiguo
      const sorted = res.sort((a, b) => {
        const timeA = Date.parse(a.creationDate || "");
        const timeB = Date.parse(b.creationDate || "");
        return timeB - timeA;
      });
      setArticles(sorted);
    } catch (error) {
      console.error("Error al cargar artículos:", error);
    }
  };
  fetchAndSort();
}, []);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (timeFilter === "all") return matchesSearch;

    const daysAgo = timeFilter === "7days" ? 7 : 30;
    const articleDate = new Date(article.creationDate || "");
    const now = new Date();
    const diffInDays =
      (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24);

    return matchesSearch && diffInDays <= daysAgo;
  });

  const confirmDelete = async () => {
    if (!selectedArticleId) return;

    try {
      await deleteArticle(selectedArticleId);
      setArticles((prev) => prev.filter((a) => a.id !== selectedArticleId));
    } catch (error) {
      console.error("Error eliminando artículo:", error);
    } finally {
      setIsDialogOpen(false);
      setSelectedArticleId(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Historial de Artículos
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Tus artículos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Buscador y filtro temporal */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por fecha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="7days">Últimos 7 días</SelectItem>
                <SelectItem value="30days">Último mes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabla de historial */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">
                        {article.title}
                      </TableCell>
                      <TableCell>
                        {article.creationDate
                          ? formatDate(article.creationDate)
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              router.push(`/my-articles/${article.id}`)
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedArticleId(article.id);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center py-4 text-muted-foreground"
                    >
                      No se encontraron artículos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar artículo?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. ¿Estás seguro de que quieres
              eliminar este artículo?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
