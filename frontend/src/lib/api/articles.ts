export interface Article {
    id: string
    titulo: string
    autor: string
    contenido: string
    date?: string
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
      console.log("Data:", data)
      return data 
    } catch (error) {
      console.error("Error en fetchArticles:", error)
      return []
    }
  }
  

  export async function fetchArticleById(id: string | number): Promise<Article | null> {
    try {
      const res = await fetchArticles()
      const article = res.find((article) => String(article.id) === String(id))
  
      if (!res) throw new Error("Error al obtener el artículo")
  
      console.log("Article:", article)
      return article || null
    } catch (error) {
      console.error("Error en fetchArticleById:", error)
      return null
    }
  }


  export async function myArticles(): Promise<Article[]> {
    const token = localStorage.getItem("token")
    console.log("Token:", token)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articulo/articulos`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  
    if (!res.ok) throw new Error("Error al obtener artículos")
  
    const data = await res.json()
    console.log("Data:", data)
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