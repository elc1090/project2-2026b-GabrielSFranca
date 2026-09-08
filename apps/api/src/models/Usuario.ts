// src/models/User.ts

import {Schema, model, Document} from "mongoose";

// 1- Interface TS descrevendo o documento
export interface IUsuario extends Document{
    nome: string;
    email: string;
    idade?: number;
    createdAt: Date;
}

// 2- Esquema do Mongoose mapeando a colecao
const usuarioSchema = new Schema<IUsuario>({
    nome:{type: String, required: true},
    email: { type: String, required: true, unique: true },
    idade: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

// 3- modelo exportado para realizar operacoes no banco
export const Usuario=model<IUsuario>('Usuario', usuarioSchema);