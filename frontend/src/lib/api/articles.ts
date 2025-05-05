export interface Article {
    id: string
    title: string
    author: string
    content: string
    creationDate?: string
    publicationDate?: boolean
  }

  const url = process.env.NEXT_PUBLIC_BACKEND_URL
  
  export async function fetchArticles(): Promise<Article[]> {
    try {
      const res = await fetch(`${url}/articulo/listaArticulos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
  
      if (!res.ok) throw new Error("Error al obtener artículos")
  
      const data = await res.json()
      return data 
    } catch (error) {
      console.error("Error en fetchArticles:", error)
      return []
    }
  }
  

  export async function fetchArticleById(id: string | number): Promise<Article | null> {
    const token = localStorage.getItem("token")
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articulo/obtenerArticulo?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error("Error al obtener artículo")
      
      const data = await res.json()
    return data[0] || null
  }


  export async function myArticles(): Promise<Article[]> {
    const token = localStorage.getItem("token")
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articulo/articulos`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  
    if (!res.ok) return []
  
    const data = await res.json()
    return Array.isArray(data) ? data : []
  }


  export async function createArticle(data: { title: string; content: string }) {
    const token = localStorage.getItem("token")
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articulo/createArticulo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
  
    if (!res.ok) throw new Error("Error al crear artículo")
  
    const article = await res.json()
    return article
  }


  export async function updateArticle(id: string, data: { title: string; content: string }) {
    const token = localStorage.getItem("token")
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articulo/actualizarArticulo?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
  
    if (!res.ok) throw new Error("Error al actualizar artículo")
  
    const article = await res.json()
    return article
  }


  export async function deleteArticle(id: string) {
    const token = localStorage.getItem("token")
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articulo/eliminarArticulo?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  
    if (!res.ok) throw new Error("Error al eliminar artículo")
  
    return true
  }
