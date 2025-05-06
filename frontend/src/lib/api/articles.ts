import { getFirebaseToken } from "../getFirebaseToken";

export interface Article {
  id: string;
  title: string;
  author: string;
  content: string;
  creationDate?: string;
  publicationDate?: boolean;
}

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchArticles(): Promise<Article[]> {
  const token = await getFirebaseToken();

  if (!token) return [];

  try {
    const res = await fetch(`${url}/articulo/listaArticulos`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener artículos");
    return await res.json();
  } catch (error) {
    console.error("Error en fetchArticles:", error);
    return [];
  }
}

export async function fetchArticleById(id: string | number): Promise<Article | null> {
  const token = await getFirebaseToken();

  if (!token) return null;

  const res = await fetch(`${url}/articulo/obtenerArticulo?id=${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener artículo");
  const data = await res.json();
  return data[0] || null;
}

export async function myArticles(): Promise<Article[]> {
  const token = await getFirebaseToken();

  if (!token) return [];

  const res = await fetch(`${url}/articulo/articulos`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function createArticle(data: { title: string; content: string }) {
  const token = await getFirebaseToken();
  if (!token) throw new Error("Usuario no autenticado");

  const res = await fetch(`${url}/articulo/createArticulo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear artículo");
  return await res.json();
}

export async function updateArticle(id: string, data: { title: string; content: string }) {
  const token = await getFirebaseToken();
  if (!token) throw new Error("Usuario no autenticado");

  const res = await fetch(`${url}/articulo/actualizarArticulo?id=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar artículo");
  return await res.json();
}

export async function deleteArticle(id: string) {
  const token = await getFirebaseToken();
  if (!token) throw new Error("Usuario no autenticado");

  const res = await fetch(`${url}/articulo/eliminarArticulo?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al eliminar artículo");
  return true;
}
