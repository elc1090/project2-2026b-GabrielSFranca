"use client"
import Image from "next/image";
import styles from "./page.module.css";
import React, {useState, ChangeEvent, FormEvent, useEffect} from "react";

const BACKEND_URL=process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
// 1. Tipagem das Props da Barra de Pesquisa
interface BarraBuscaProps{
  term: string;
  aoMudar: (novoTerm: string)=> void;
  placeholder?: string;
}

// function Busca(){
// }
// function BarraBusca({term, aoMudar, placeholder="Busque um filme..."}: BarraBuscaProps){
//   const [query, setQuery]=useState<string>('')

  
//   return(
//     <form action="/search" method="GET">
//       <input 
//         type="text" 
//         id="campo-busca"
//         placeholder={placeholder}
//         onChange={Busca}
//         />
//       <button type="submit">
//         Buscar
//       </button>
//     </form>
//   )
// }
export default function Home() {
  const [data,setData]=useState<{mensagem: string} | null>(null);

  useEffect(()=>{
    fetch(BACKEND_URL)
    .then((res)=>res.json())
    .then((data)=>setData(data));
  }, []);

  return (
    <div className={styles.page}>
      {/* escrevemos uma barra de busca por meio da tag input tipo search
      o modo semantico e recomendado eh estruturar dentro de um formulario */}
      <main className={styles.main}>
        <h1>Frontend Next.js</h1>
        <p>{data? data.mensagem: "Carregando dados da API..."}</p>
        {/* <form action="/buscar" method="GET">
          <label htmlFor="campo-busca">Pesquisar: </label>
          <input type="search" id="campo-busca" name="q" placeholder="Digite o que procura" />
          <button type="submit">Buscar</button>
        </form> */}


      </main>
    </div>
  );
}


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