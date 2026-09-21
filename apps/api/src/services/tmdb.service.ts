const BASE_URL = "https://api.themoviedb.org/3/search/movie?";

const TMDB_ACCESS_TOKEN=process.env.TMDB_ACCESS_TOKEN;

export async function pesquisaFilmes(query: string) {
  const response = await fetch(
    BASE_URL +
      new URLSearchParams({
        query,
        language: "pt-BR",
      }),
    {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    },
  );
  return response;
}
