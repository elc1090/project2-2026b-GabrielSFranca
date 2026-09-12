import Fastify from "fastify";
import cors from "@fastify/cors";

const app=Fastify({logger:true});

app.register(cors, {
    origin: ["http://localhost:3000"],
});


app.get("/", async (request, reply) => {
    return { mensagem: "API Fastify rodando com sucesso!"};
});

const start=async()=>{
    try{
        await app.listen({port: 3333, host: '0.0.0.0'});
        console.log("Servidor rodando em localhost:3000")

    }catch(erro){
        app.log.error(erro);
        process.exit(1);
    }
};

start();
