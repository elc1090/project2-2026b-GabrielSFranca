// src/routes/userRoutes.ts
import {FastifyInstance} from "fastify"
import { LibraryItem } from "../models/LibraryItem.js";

interface LibraryItemBody{
  tmdbId: number;
  titulo: string;
  ano: number;
  posterPath?: string;
  nota?: number;
  avaliacao?: string;
  playlists?: string[];
}

export async function libraryItemsRoutes(app: FastifyInstance){
  app.get("/library-items", async () => {
    return LibraryItem.find()
      .populate("playlists")
      .sort({ adicionadoEm: -1 });
  });
}



// import fastify, { FastifyInstance } from "fastify";

// type Usuario={
//   id: string;
//   nome: string;
//   email: string;
// }

// export async function usuarioRoutes(fastify: FastifyInstance, options: any) {
//   const usuarios: Usuario[] = [];
//   fastify.post("/usuarios", async (request, reply) => {
//     const { nome, email } = request.body;

//     const novoUsuario = {
//       id: String(Date.now()),
//       nome,
//       email,
//     };

//     usuarios.push(novoUsuario)

//     reply.code(201).send(novoUsuario);
//   });

//   fastify.get("/usuarios", async (request, reply) => {
//     return usuarios;
//   });

//   fastify.get("/usuarios/:id", async (request, reply) => {
//     const { id } = request.params;
//     const usuario = usuarios.find((u) => u.id === id);
//     if (!usuario) {
//       reply.code(404).send({ error: "entidade nao encontrada" });
//       return;
//     }
//   });
// }

// // src/routes/userRoutes.ts
// import { FastifyInstance } from 'fastify';
// import { Usuario } from '../models/Usuario.js';

// export async function usuarioRoutes( fastify: FastifyInstance) {

//   // CREATE
//   fastify.post("/usuarios", async (request, reply) => {
//     try{
//       const { nome, email, idade}=request.body as {nome: string; email: string; idade?: number};
//       const novoUsuario= await Usuario.create({nome, email, idade});

//       return reply.status(201).send(novoUsuario);
//     } catch(erro) {
//       return reply.status(400).send({ erro: 'erro ao criar a entidade', details: erro});
//     }
//   });

//   // READ ALL
//   fastify.get("/usuarios", async (request, reply)=> {
//     const usuarios=await Usuario.find();
//     return reply.send(usuarios);
//   })

// }
