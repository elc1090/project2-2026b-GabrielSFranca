import { Schema, model, Document, Types } from "mongoose";

export interface ILibraryItem extends Document{
    tmdbId: number;
    titulo: string;
    ano: number;
    posterPath?: string;
    nota?: number;
    avaliacao?: string;
    playlists: Types.ObjectId[];
    createdAt: Date;
}

const libISchema=new Schema<ILibraryItem>(
  {
    tmdbId: {
      type: Number,
      required: true,
      min: 1,
    },
    titulo: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
    },
    ano: {
      type: Number,
      required: true,
      min: 1800,
    },
    posterPath: {
      type: String,
      default: "",
    },
    nota: {
      type: Number,
      min: 0,
      max: 10,
    },
    avaliacao: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    playlists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "libraryItems",
  }
);

export const LibraryItem=model<ILibraryItem>(
    "LibraryItem", 
    libISchema);