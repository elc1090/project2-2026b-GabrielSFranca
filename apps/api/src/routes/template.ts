// src/routes/userRoutes.ts
import { FastifyInstance } from 'fastify';
import { User } from '../models/User.js';

export async function userRoutes(fastify: FastifyInstance) {
  // Criar Usuário (Create)
  fastify.post('/users', async (request, reply) => {
    try {
      const { name, email, age } = request.body as { name: string; email: string; age?: number };
      const newUser = await User.create({ name, email, age });
      return reply.status(201).send(newUser);
    } catch (error) {
      return reply.status(400).send({ error: 'Erro ao criar usuário', details: error });
    }
  });

  // Listar Todos os Usuários (Read)
  fastify.get('/users', async (request, reply) => {
    const users = await User.find();
    return reply.send(users);
  });

  // Buscar Usuário por ID (Read)
  fastify.get('/users/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const user = await User.findById(id);
      
      if (!user) {
        return reply.status(404).send({ message: 'Usuário não encontrado' });
      }
      return reply.send(user);
    } catch (error) {
      return reply.status(400).send({ error: 'ID inválido' });
    }
  });

  // Atualizar Usuário (Update)
  fastify.put('/users/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const body = request.body as Partial<{ name: string; email: string; age: number }>;
      
      const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
      if (!updatedUser) {
        return reply.status(404).send({ message: 'Usuário não encontrado' });
      }
      return reply.send(updatedUser);
    } catch (error) {
      return reply.status(400).send({ error: 'Erro ao atualizar usuário' });
    }
  });

  // Excluir Usuário (Delete)
  fastify.delete('/users/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const deletedUser = await User.findByIdAndDelete(id);
      
      if (!deletedUser) {
        return reply.status(404).send({ message: 'Usuário não encontrado' });
      }
      return reply.send({ message: 'Usuário removido com sucesso' });
    } catch (error) {
      return reply.status(400).send({ error: 'Erro ao deletar usuário' });
    }
  });
}