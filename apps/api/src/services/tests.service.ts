const BASE_URL="https://api.themoviedb.org/3/movie";

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