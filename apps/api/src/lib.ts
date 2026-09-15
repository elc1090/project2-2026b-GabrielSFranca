const BASE_URL="https://api.themoviedb.org/3/movie";

const linguagem="pt-BR"


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