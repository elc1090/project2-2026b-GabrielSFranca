import Fastify from "fastify";
import cors from "@fastify/cors";

const app=Fastify({logger:true});

app.register(cors, {
    origin: ["http://localhost:3000"],
});


app.get("/api/mensagem", async (request, reply) => {
    return { mensagem: "ola backend fastfy"};
});

const start=async()=>{
    try{
        await app.listen({port: 3333, host: '0.0.0.0'});

    }catch(erro){
        app.log.error(erro);
        process.exit(1);
    }
};

start();
