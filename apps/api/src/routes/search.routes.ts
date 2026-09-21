import {FastifyInstance} from "fastify";
// import { pesquisaFilmes } from "../services/tmdb.service.js";
// const BASE_URL = "https://api.themoviedb.org/3/search/movie?";

export const BASE_URL="https://api.themoviedb.org/3";
export const TMDB_ACCESS_TOKEN=process.env.TMDB_ACCESS_TOKEN;

export async function searchRoutes(fastify: FastifyInstance){

    fastify.get('/search', async(request, reply)=>{
        const { query } = request.query as { query?: string};

        if(!query || query.trim() === ''){
            return reply.code(400).send({
                error: "Parametro de busca query obrigatorio"
            });
        }
        const url=`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=pt-BR`;

        try{
            const response=await fetch(
                url,
                {
                    headers: {
                        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                        accept: "application/json",
                    }
                },
            );
            const data=await response.json();
            return reply.send(data);
        }catch(error){
            fastify.log.error(error);
            return reply.status(500).send({
                error: "Falha ao buscar dados na API externa"
            });
        }
        // const data=await pesquisaFilmes(query);
        // return reply.send(data || []);
    });
}