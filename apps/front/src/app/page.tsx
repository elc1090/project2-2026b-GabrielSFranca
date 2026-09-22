"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, {useState, ChangeEvent, FormEvent, useEffect} from "react";
import Link from "next/link";

const BACKEND_URL=process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

interface Movie{
  id: number;
  title: string;
  overview?: string;
  release_date: string;
  vote_average: number;
  poster_path?: string | null;
}

function anoLancamento(movie : Movie){
  const ano=movie.release_date ? movie.release_date.split('-')[0] : "sem ano";
  return (ano);
}

export default function Home(){
  const [query, setQuery]=useState<string>('');
  const [movies, setMovies]=useState<Movie[]>([]);
  const [carregando, setCarregando]=useState(false);

  async function pesquisaFilmes(event: React.FormEvent){
    event.preventDefault();

    setCarregando(true);
    const term=query.trim();
    if(!term) return;

    const url=`${BACKEND_URL}/search?query=${encodeURIComponent(query)}`;

    try{
      const res=await fetch(url);
      const data=await res.json();
      setMovies(data.results);
    }catch(error){
      console.error("erro na resposta do backend", error);
    }finally{
      setCarregando(false);
    }
    // const response=await fetch(`${BACKEND_URL}/search?query=${encodeURIComponent(query)}`);
    // const data=await response.json();
    // setMovies(data.results);
    // setMovies(response);
  }

  return(
    <main className={styles.main}>
      <h1>FilmesBR</h1>

      <form onSubmit={pesquisaFilmes}>
        <input 
          type="search"
          id="campo"
          value={query}
          placeholder="Busque por um filme"
          onChange={(e)=> setQuery(e.target.value)}
        />

        <button type="submit">
          Buscar
        </button>
    </form>
    {/* {movies.map((movie)=>(
      <div key={movie.id} className={styles.filmlink}>
        <h2 className={styles.titulo}>{movie.title}</h2>
        <p className={styles.dados}>{movie.release_date}</p>
        <p className={styles.dados}>{movie.overview}</p>
      </div>
    ))} */}

    {movies.map((movie)=>(
      <Link
        key={movie.id}
        href={`/movie/${movie.id}`}
        className={styles.filmlink}
      >
        {/* <h2 className={styles.titulo}>{movie.title}</h2> */}
        <strong>{movie.title}</strong> {anoLancamento(movie)}
        {/* <p className={styles.dados}>{movie.overview}</p>        */}
      </Link>
    ))}
    </main>
  );
}

// // 1. Tipagem das Props da Barra de Pesquisa
// interface BarraBuscaProps{
//   term: string;
//   aoMudar: (novoTerm: string)=> void;
//   placeholder?: string;
// }
// // type BarraPesquisaProps={
// //   query:string;
// //   aoMudar:(novoTermo:string)=>void;
// //   placeholder?: string;
// // }


// function handleInputChange(event:ChangeEvent<HTMLInputElement>){
//     aoMudar(event.target.value);

//   }

// function BarraPesquisa({
//   term,
//   aoMudar,
//   placeholder="Pesquisar..."
// } : BarraBuscaProps){
//   const [query, setQuery]=useState<string>('');
//   const [filmes, setFilmes]=useState([]);



//   async function buscaFilmes(){
//     const response=await fetch(`http://localhost:3333/api/search/movies?query=${encodeURIComponent(query)}`)

//     const data=await response.json()

//     setFilmes(data.results)
//   }

//   return(
//     <form onSubmit={buscaFilmes}>
//       <input 
//         type="text"
//         id="campo"
//         className="campo-busca"
//         value={query}
//         placeholder={placeholder}
//         onChange={handleInputChange}
//         />
//       <button type="submit">
//         Buscar
//       </button>
//     </form>
//   )
// }

// function BarraBusca({term, aoMudar, placeholder="Busque um filme..."}: BarraBuscaProps){
//   const [query, setQuery]=useState<string>('')

  
//   return(
//     <form action="/search" method="GET">
//       <input 
//         type="text" 
//         id="campo-busca"
//         value={query}
//         placeholder={placeholder}
//         onChange={Busca}
//         />
//       <button type="submit" onClick={Busca}>
//         Buscar
//       </button>
//     </form>
//   )
// }
// export default function Home() {
//   const [data,setData]=useState<{mensagem: string} | null>(null);

//   useEffect(()=>{
//     fetch(BACKEND_URL)
//     .then((res)=>res.json())
//     .then((data)=>setData(data));
//   }, []);

//   return (
//     <div className={styles.page}>
//       {/* escrevemos uma barra de busca por meio da tag input tipo search
//       o modo semantico e recomendado eh estruturar dentro de um formulario */}
//       <main className={styles.main}>
//         <h1>Frontend Next.js</h1>
//         <BarraPesquisa term="Interestelar" aoMudar={handleInputChange}/>

//         <p>{data? data.mensagem: "Carregando dados da API..."}</p>
//         {/* <form action="/buscar" method="GET">
//           <label htmlFor="campo-busca">Pesquisar: </label>
//           <input type="search" id="campo-busca" name="q" placeholder="Digite o que procura" />
//           <button type="submit">Buscar</button>
//         </form> */}


//       </main>
//     </div>
//   );
// }


/*
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.intro}>
          <h1>
            To get started, edit the{" "}
            <code className={styles.code}>page.tsx</code> file.
          </h1>
          <p>
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className={styles.secondary}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}

*/