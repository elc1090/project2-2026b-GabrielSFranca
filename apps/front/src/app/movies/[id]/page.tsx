"use client";
import React, {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import {BACKEND_URL} from "@/app/services/api";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

interface Genero{
    id: number;
    name: string;
}

interface MembroElenco{
    id: number;
    name: string;
    character: string;
}
interface FilmeDetalhes{
    id: number;
    title: string;
    release_date?: string;
    overview: string;
    runtime: number;
    poster_path?: string | null;
    genres: Genero[];
    credits?: {
        cast: MembroElenco[];
    }
}

export default function FilmeDetalhesPage({params}: {params: {id:string}}){
    const [movie, setMovie]=useState<FilmeDetalhes | null>(null)
    const [carregando, setCarregando]=useState(true)

    useEffect(()=>{
        const buscaDetalhesFilme=async()=>{
            try{
                const res=await fetch(`${BACKEND_URL}/movies/${params.id}`)
                if(res.ok){
                    const data=await res.json()
                    setMovie(data)
                }else{
                    console.error("erro na resposta da api")
                }
            }catch(error){
                console.error("erro ao conecar com a api", error)
            }finally{
                setCarregando(false)
            }
        }
        buscaDetalhesFilme()
    }, [params.id])
    if (carregando) {
        return <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>Carregando detalhes do filme...</div>;
    }
    if (!movie) {
        return <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>Carregando detalhes do filme...</div>;
    }

    const posterUrl=movie.poster_path ? `${IMG_URL}${movie.poster_path}` : null
    const elenco=movie.credits?.cast?.slice(0,10) || [];

    return(
        <div>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <div>
                {posterUrl && (
                    <Image
                        src={posterUrl}
                        alt="poster"
                        width={20}
                        height={100}
                    />
                )}
            </div>

            <h2>Detalhes técnicos</h2>
            <p>Duração: {movie.runtime} minutos</p>
            <p>Gêneros:{movie.genres?.map(g => g.name).join(', ')}</p>

            <h2>Sinopse</h2>
            <p>{movie.overview || "Nenhuma sinopse disponível para este filme."}</p>


            {/* Renderiza o elenco do filme (cast)[cite: 3] */}
            <div style={{ marginTop: '40px' }}>
                <h3>Elenco Principal</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                    {elenco.map(actor => (
                     <li key={actor.id} style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
                     <strong>{actor.name}</strong>
                      <br />
                <span style={{ fontSize: '14px', color: '#555' }}>como {actor.character}</span>
            </li>
          ))}
        </ul>
      </div>
            <footer>
                <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
                <p>This project is academic and non-commercial.</p>
            </footer>
        </div>
    )
}
// import styles from "./page.module.css";
// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>