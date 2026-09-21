const BASE_URL="https://api.themoviedb.org/3/movie";

const linguagem="pt-BR";

const filmePTBR= "https://api.themoviedb.org/3/movie/550?language=pt-BR";
const appendToResponse=  "https://api.themoviedb.org/3/movie/550?append_to_respose=videos,images,credits";

// Filmes
// Series= trocar movies por tv
const movies="https://api.themoviedb.org/3/movie/popular";

// const object={
//     Authorization: Bearer ${TMDB_ACCESS_TOKEN}
// }

// Parametros importantes
// query=texto pesquisado 
// language=idioma de resposta

async function testObterFilmesPop(){
    try{
        const response=await fetch(`${BASE_URL}/popular`,{
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                    accept: "aplication/json"}
                }
        );
        const data=await response.json();
        console.log(data.results);
    } catch(error){
        console.error("err ao buscas", error)
    }
}



// const resposta=await fetch(
//     "https://api.themoviedb.org/3/movie/550",
//     {
//         headers: {
//             Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
//             accept: "aplication/json"
//         }
//     }
// );



// const data=await resposta.json();

// console.log(data);



// model/playlist.model.ts

// import mongoose, { InferSchemaType } from 'mongoose';

// const playlistSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true, minlength: 1, maxlength: 80 },
//     description: { type: String, default: '', trim: true, maxlength: 300 },
//     items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LibraryItem' }],
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
//   },
//   { versionKey: false },
// );

// playlistSchema.index({ name: 1 }, { unique: true });
// playlistSchema.pre('save', function () { this.updatedAt = new Date(); });

// export type Playlist = InferSchemaType<typeof playlistSchema>;
// export const PlaylistModel = mongoose.model('Playlist', playlistSchema);



// https://github.com/mmj030703/Movie-Search-App/