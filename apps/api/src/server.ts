import Fastify from "fastify";
import cors from "@fastify/cors";
import "dotenv/config";
import { connDB } from "./database/mongo.js";
import { playlistRoutes } from "./routes/playlistRoutes.js";

// Fastify é um microframework para Node.js
// API REST
// Localhost significa hospedagem local

// Parametros de busca= `http://localhost:3333/users?name=Gabriel`

const app = Fastify({ logger: true });

// habilita CORS para o front-end conseguir efetuar requisicoes de outro endereço:PORTA
app.register(cors, {
  origin: true, // permite qlqr origem durante o desenvolvimento
});

app.register(playlistRoutes);

const BASE_URL = "https://api.themoviedb.org/3/movie";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
interface FilmDTO {
  id: number;
  titulo: string;
  poster: string | null;
  aval: number;
  sinopse: string;
  anoLancamento: string;
}
//  '/' -> rota raiz


app.get('/', async(request, reply)=>{
  return{
    mensagem: "Integrado com sucesso ao backend Fastify"
  }
})

app.get("/popular", async (request, reply) => {
  const popMovieUrl = `${BASE_URL}/popular`;
  try {
    const response = await fetch(popMovieUrl, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });
    const data = await response.json();
    console.log(data.results);
    return reply.send(data.results);
  } catch (error) {
    console.error("Falha ao se comunicar com a API", error);
  }
});

// app.get("/playlists", async (request, reply) => {
//   return {
//     assistidos: "filmes assistidos",
//   };
// });

// app.get("/search", async (request, reply) => {
//   const { q } = request.query as { q?: string };
//   // Validação simples: se o usuário não enviou o texto de busca
//   if (!q || q.trim() === "") {
//     return reply
//       .status(400)
//       .send({ error: 'O parâmetro de busca "q" é obrigatório.' });
//   }

//   const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(q)}&language=pt-BR&page=1`;

//   try {
//     // 2. Faz a chamada para a API do TMDB enviando o texto da busca
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
//         accept: "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error("falha ao se comunicar com a api");
//     }
//     const data = await response.json();

//     const filmes: FilmDTO[] = data.results.map((movie: any) => ({
//       id: movie.id,
//       titulo: movie.title,
//       poster: null,
//       aval: Number(movie.vote_avarage.toFixed(1)),
//       sinopse: movie.overview || "Sinopse nao disponivel",
//       anoLancamento: movie.release_date,
//     }));

//     return reply.send(filmes);
//   } catch (error) {
//     app.log.error(error);
//     return reply.status(500).send({ error: "erro ao buscar filmes" });
//   }
// });

// inicializa servidor
const start = async () => {
  try {
    await connDB();
    await app.listen({ port: 3333, host: "0.0.0.0" });
    console.log("🚀 Servidor rodando em localhost:3333");
  } catch (erro) {
    app.log.error(erro);
    process.exit(1);
  }
};

start();
