import {FastifyInstance} from "fastify"
import {Playlist} from "../models/Playlist.js"

interface PlayListCreateBody{
    nome: string;
    descricao?: string;
}

export async function playListRoutes(app: FastifyInstance){

    // READ ALL
    app.get('/users/playlists', async(request, reply)=>{
        const playlists=await Playlist.find()
        return reply.send(playlists)
    })
    // CREATE
    // verificaao se o nome esta vazio

    app.post('/users/playlists', async(request, reply)=>{
        try{
            const {nome, descricao}=request.body as PlayListCreateBody
            const novo=await Playlist.create({nome, descricao})
            return reply.status(201).send(novo)
        }catch(error){
            request.log.error(error)
            return reply.status(500).send({
                error: "ENTITY_CREATE_FAILED",
                message: "erro ao criar a entidade",
            })
        }
    })

    // read by id
    app.get('/users/playlists/:id', async(request, reply)=>{
        try{
            const {id}=request.params as {id: string}
            const data=await Playlist.findById(id)

            if(!data){
                return reply.status(404).send({
                    message:"not found"
                })
            }
        return reply.send(data)
        }catch(error){
            return reply.status(400).send({error: "id invalido"})
        }
    })
    // DELETE BY ID
    app.delete('/users/playlists/:id', async(request, reply)=>{
        try{
            const {id}=request.params as {id: string}
            const deleted=await Playlist.findByIdAndDelete(id)

            if(!deleted){
                return reply.status(404).send({
                    message: "not-found"
                })

            }
        }catch(error){
            return reply.status(400).send({ error: 'Erro ao deletar usuário' });
        }
    })


}