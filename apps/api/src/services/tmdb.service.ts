export const BASE_URL="https://api.themoviedb.org/3";
export const TOKEN=process.env.TMDB_ACCESS_TOKEN;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// const object={
//     Authorization: Bearer ${TMDB_ACCESS_TOKEN}
// }

// Parametros importantes
// query=texto pesquisado 
// language=idioma de resposta

interface FilmDTO {
  id: number;
  titulo: string;
  poster: string | null;
  aval: number;
  sinopse: string;
  anoLancamento: string;
}

interface MovieDTO{
  id: number;
  tmdb_id: number;
  title: string;
  poster_path?: string | null;
  overview: string;
  release_date: string;
}

export async function pesquisaFilmes(query: string) {
  const response = await fetch(
    BASE_URL +
      new URLSearchParams({
        query,
        language: "pt-BR",
      }),
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: "application/json",
      },
    },
  );
  return response;
}
