const BACKEND_URL=process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"

export async function buscarRecurso(query: string){
    if(!query || query.trim() === '') return []
    try{
        const response=await fetch(`${BACKEND_URL}/api/search?query=`)
        `${BACKEND_URL}/api/search?query=${encodeUR
    }
}