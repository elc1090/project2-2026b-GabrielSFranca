import { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import { Playlist, MediaType } from "../models/Playlist.js";

type PlaylistBody = {
  nome?: string;
  name?: string;
  descricao?: string;
  description?: string;
};

type PlaylistItemBody = {
  tmdbId?: number;
  mediaType?: MediaType;
  titulo?: string;
  title?: string;
  posterPath?: string;
};

type IdParams = {
  id: string;
};

type ItemParams = {
  playlistId: string;
  itemId: string;
};

function getPlaylistInput(body: PlaylistBody) {
  return {
    nome: body.nome ?? body.name,
    descricao: body.descricao ?? body.description ?? "",
  };
}

function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

function duplicateKeyError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}

export async function playlistRoutes(app: FastifyInstance) {
  app.get("/playlists", async () => {
    return Playlist.find().sort({ criadoEm: -1 });
  });

  app.post("/playlists", async (request, reply) => {
    const { nome, descricao } = getPlaylistInput(request.body as PlaylistBody);

    if (!nome || nome.trim().length === 0) {
      return reply.status(400).send({
        error: "PLAYLIST_NAME_REQUIRED",
        message: "O nome da playlist e obrigatorio.",
      });
    }

    try {
      const playlist = await Playlist.create({ nome, descricao });
      return reply.status(201).send(playlist);
    } catch (error) {
      if (duplicateKeyError(error)) {
        return reply.status(409).send({
          error: "PLAYLIST_ALREADY_EXISTS",
          message: "Ja existe uma playlist com esse nome.",
        });
      }

      request.log.error(error);
      return reply.status(500).send({
        error: "PLAYLIST_CREATE_FAILED",
        message: "Erro ao criar playlist.",
      });
    }
  });

  app.get("/playlists/:id", async (request, reply) => {
    const { id } = request.params as IdParams;

    if (!isValidObjectId(id)) {
      return reply.status(400).send({
        error: "INVALID_PLAYLIST_ID",
        message: "O id da playlist e invalido.",
      });
    }

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return reply.status(404).send({
        error: "PLAYLIST_NOT_FOUND",
        message: "Playlist nao encontrada.",
      });
    }

    return playlist;
  });

  app.patch("/playlists/:id", async (request, reply) => {
    const { id } = request.params as IdParams;
    const { nome, descricao } = getPlaylistInput(request.body as PlaylistBody);

    if (!isValidObjectId(id)) {
      return reply.status(400).send({
        error: "INVALID_PLAYLIST_ID",
        message: "O id da playlist e invalido.",
      });
    }

    if (nome !== undefined && nome.trim().length === 0) {
      return reply.status(400).send({
        error: "PLAYLIST_NAME_REQUIRED",
        message: "O nome da playlist nao pode ficar vazio.",
      });
    }

    const updates: Partial<PlaylistBody> = {};

    if (nome !== undefined) {
      updates.nome = nome;
    }

    if (descricao !== undefined) {
      updates.descricao = descricao;
    }

    try {
      const playlist = await Playlist.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!playlist) {
        return reply.status(404).send({
          error: "PLAYLIST_NOT_FOUND",
          message: "Playlist nao encontrada.",
        });
      }

      return playlist;
    } catch (error) {
      if (duplicateKeyError(error)) {
        return reply.status(409).send({
          error: "PLAYLIST_ALREADY_EXISTS",
          message: "Ja existe uma playlist com esse nome.",
        });
      }

      request.log.error(error);
      return reply.status(500).send({
        error: "PLAYLIST_UPDATE_FAILED",
        message: "Erro ao atualizar playlist.",
      });
    }
  });

  app.delete("/playlists/:id", async (request, reply) => {
    const { id } = request.params as IdParams;

    if (!isValidObjectId(id)) {
      return reply.status(400).send({
        error: "INVALID_PLAYLIST_ID",
        message: "O id da playlist e invalido.",
      });
    }

    const playlist = await Playlist.findByIdAndDelete(id);

    if (!playlist) {
      return reply.status(404).send({
        error: "PLAYLIST_NOT_FOUND",
        message: "Playlist nao encontrada.",
      });
    }

    return reply.status(204).send();
  });

  app.post("/playlists/:playlistId/items", async (request, reply) => {
    const { playlistId } = request.params as { playlistId: string };
    const { tmdbId, mediaType, posterPath } = request.body as PlaylistItemBody;
    const titulo = (request.body as PlaylistItemBody).titulo ?? (request.body as PlaylistItemBody).title;

    if (!isValidObjectId(playlistId)) {
      return reply.status(400).send({
        error: "INVALID_PLAYLIST_ID",
        message: "O id da playlist e invalido.",
      });
    }

    if (!tmdbId || tmdbId < 1 || !mediaType || !["movie", "tv"].includes(mediaType) || !titulo?.trim()) {
      return reply.status(400).send({
        error: "INVALID_PLAYLIST_ITEM",
        message: "Informe tmdbId, mediaType e titulo validos.",
      });
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return reply.status(404).send({
        error: "PLAYLIST_NOT_FOUND",
        message: "Playlist nao encontrada.",
      });
    }

    const alreadyExists = playlist.itens.some(
      (item) => item.tmdbId === tmdbId && item.mediaType === mediaType
    );

    if (alreadyExists) {
      return reply.status(409).send({
        error: "PLAYLIST_ITEM_ALREADY_EXISTS",
        message: "Esse titulo ja esta na playlist.",
      });
    }

    playlist.itens.push({ tmdbId, mediaType, titulo, posterPath, adicionadoEm: new Date() });
    await playlist.save();

    return reply.status(201).send(playlist);
  });

  app.delete("/playlists/:playlistId/items/:itemId", async (request, reply) => {
    const { playlistId, itemId } = request.params as ItemParams;

    if (!isValidObjectId(playlistId) || !isValidObjectId(itemId)) {
      return reply.status(400).send({
        error: "INVALID_ID",
        message: "O id da playlist ou do item e invalido.",
      });
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return reply.status(404).send({
        error: "PLAYLIST_NOT_FOUND",
        message: "Playlist nao encontrada.",
      });
    }

    const originalLength = playlist.itens.length;
    playlist.itens = playlist.itens.filter((item) => item._id?.toString() !== itemId);

    if (playlist.itens.length === originalLength) {
      return reply.status(404).send({
        error: "PLAYLIST_ITEM_NOT_FOUND",
        message: "Item nao encontrado na playlist.",
      });
    }

    await playlist.save();

    return reply.status(204).send();
  });
}
