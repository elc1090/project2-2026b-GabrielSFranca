import mongoose from "mongoose";

export async function connDB() {
    try{
        const mongoURI = process.env.MONGO_URI;
        if(!mongoURI){
            throw new Error("A variável MONGOURI nao foi definida no env");
        }

        await mongoose.connect(mongoURI, {
            family: 4 // Força o Node a usar IPv4 para resolver o Atlas, matando o erro de DNS
        });
        console.log("🚀 Conectado com sucesso ao MongoDB");

    } catch(error){
        console.error("Erro ao conectar ao mongo", error);
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
