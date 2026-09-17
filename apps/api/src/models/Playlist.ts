import { Schema, model, Document, Types } from "mongoose";

export type MediaType = "movie" | "tv";

export interface IPlaylistItem {
  _id?: Types.ObjectId;
  tmdbId: number;
  mediaType: MediaType;
  titulo: string;
  posterPath?: string;
  adicionadoEm: Date;
}

export interface IPlaylist extends Document {
  nome: string;
  descricao?: string;
  itens: IPlaylistItem[];
  criadoEm: Date;
  atualizadoEm: Date;
}

const playlistItemSchema = new Schema<IPlaylistItem>(
  {
    tmdbId: { type: Number, required: true, min: 1 },
    mediaType: { type: String, enum: ["movie", "tv"], required: true },
    titulo: { type: String, required: true, trim: true, minlength: 1 },
    posterPath: { type: String, default: "" },
    adicionadoEm: { type: Date, default: Date.now },
  },
  { _id: true }
);

const playlistSchema = new Schema<IPlaylist>(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 80,
      unique: true,
    },
    descricao: { type: String, default: "", trim: true, maxlength: 300 },
    itens: { type: [playlistItemSchema], default: [] },
  },
  {
    collection: "playlists",
    timestamps: { createdAt: "criadoEm", updatedAt: "atualizadoEm" },
  }
);

export const Playlist = model<IPlaylist>("Playlist", playlistSchema);
