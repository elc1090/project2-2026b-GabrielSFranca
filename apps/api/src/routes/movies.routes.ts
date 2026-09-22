import { FastifyInstance } from "fastify";
import { BASE_URL, TOKEN } from "../services/tmdb.service.js";

const linguagemBr="language=pt-BR";
const appendCredits="&append_to_response=credits";

export async function moviesRoutes(fastify: FastifyInstance){

    fastify.get('/movies/:id', async(request, reply)=>{
        const {id}=request.params as {id: string}
        if(!TOKEN){
            return reply.status(500).send({
                error: "Token de acesso a api nao configurado"
            });
        }

        // const iiurl=`${BASE_URL}/movie/${id}?language=pt-BR`;
        const url=`${BASE_URL}/movie/${id}${linguagemBr}${appendCredits}`;
        try{
            const response=await fetch(
                url,
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                        accept: "application/json",
                    }
                },
            );

            if(!response.ok){
                throw new Error("Falha ao buscar detalhes na api TMDB");
            }

            const data=await response.json();
            console.log(data);
            return reply.send(data);
        }catch(error){
            fastify.log.error(error);
            return reply.status(500).send({
                error: "Falha ao buscar dados na API externa"
            });
        }
    });
}