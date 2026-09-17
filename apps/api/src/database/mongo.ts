import mongoose from "mongoose";

export async function connDB() {
    try{
        const mongoURI=process.env.MONGODB_URI;
        if(!mongoURI){
            throw new Error("A variavel mongouri nao foi definida no env");
        }

        await mongoose.connect(mongoURI);
        console.log("MongoDB conectado");

    } catch(err){
        console.error("Erro ao conectar ao mongo", err);
        process.exit(1);
    }
}

export async function disconnDB(): Promise<void> {
  await mongoose.disconnect();
  console.log("MongoDB desconectado");
}

export function dataBaseConectada(): boolean{
    return mongoose.connection.readyState === 1;
}