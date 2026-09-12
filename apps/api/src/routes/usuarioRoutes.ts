// src/routes/userRoutes.ts
import { FastifyInstance } from 'fastify';

import { Usuario } from '../models/Usuario.js';

export async function usuarioRoutes( fastify: FastifyInstance) {

  // CREATE
  fastify.post("/usuarios", async (request, reply) => {
    try{
      const { nome, email, idade}=request.body as {nome: string; email: string; idade?: number};
      const novoUsuario= await Usuario.create({nome, email, idade});

      return reply.status(201).send(novoUsuario);
    } catch(erro) {
      return reply.status(400).send({ erro: 'erro ao criar a entidade', details: erro});
      
    }
  });

  // READ ALL
  fastify.get("/usuarios/", async (request, reply)=> {
    const usuarios=await Usuario.find();
    return reply.send(usuarios);
  })

}