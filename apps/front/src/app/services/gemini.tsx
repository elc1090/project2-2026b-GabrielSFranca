// // components/SearchBar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

// Definindo a interface baseada nos dados retornados pelo TMDB
interface Movie {
  id: number;
  title: string;
  release_date: string;
}

export default function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      // O frontend chama a API do Fastify na rota '/search'
      const response = await fetch(`http://localhost:8080/search?query=${encodeURIComponent(query)}`);
      
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      } else {
        console.error('Erro na resposta do backend');
      }
    } catch (error) {
      console.error('Erro ao conectar com o backend:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Buscar Filmes</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Digite o nome do filme..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '300px' }}
        />
        <button onClick={handleSearch} disabled={loading} style={{ padding: '8px 16px' }}>
          {loading ? 'Buscando...' : 'Pesquisar'}
        </button>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {movies.map((movie) => {
          // Extrai apenas o ano da data de lançamento (formato YYYY-MM-DD)
          const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'Ano desconhecido';
          
          return (
            <li key={movie.id} style={{ marginBottom: '10px' }}>
              <Link 
                href={`/movie/${movie.id}`} 
                style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}
              >
                {movie.title} ({releaseYear})
              </Link>
            </li>
          );
        })}
      </ul>
      
      {!loading && movies.length === 0 && query && (
        <p>Nenhum filme encontrado para a pesquisa.</p>
      )}
    </div>
  );
}

//"use client";

// import React, { useState, ChangeEvent, FormEvent } from "react";

// // 1. Definimos a tipagem das propriedades (Props) do componente
// interface SearchBarProps {
//   placeholder?: string;
//   onSearch: (query: string) => void;
// }

// export default function SearchBar({ placeholder = "Pesquisar...", onSearch }: SearchBarProps) {
//   // 2. Estado para armazenar o texto digitado
//   const [query, setQuery] = useState<string>("");

//   // 3. Tipagem correta para o evento de mudança do input
//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setQuery(event.target.value);
//   };

//   // 4. Tipagem para o envio do formulário
//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault(); // Evita o recarregamento da página
//     onSearch(query); // Dispara a função de busca herdada do componente pai
//   };

//   return (
//     <form onSubmit={handleSubmit} style={styles.form}>
//       <input
//         type="text"
//         value={query}
//         onChange={handleInputChange}
//         placeholder={placeholder}
//         style={styles.input}
//       />
//       <button type="submit" style={styles.button}>
//         🔍 Buscar
//       </button>
//     </form>
//   );
// }

// // Estilização básica (você pode substituir por Tailwind CSS ou CSS Modules)
// const styles: { [key: string]: React.CSSProperties } = {
//   form: {
//     display: "flex",
//     gap: "8px",
//     width: "100%",
//     maxWidth: "500px",
//     margin: "20px 0",
//   },
//   input: {
//     flex: 1,
//     padding: "10px 14px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     fontSize: "16px",
//     outline: "none",
//   },
//   button: {
//     padding: "10px 16px",
//     backgroundColor: "#0070f3",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "16px",
//   },
// };

// /**
//  * "use client";

// import SearchBar from "@/components/SearchBar";

// export default function HomePage() {
//   // Esta função será executada sempre que o usuário clicar no botão de buscar
//   const handleSearchSubmit = (searchTerm: string) => {
//     console.log("Termo pesquisado pelo usuário:", searchTerm);
    
//     // Aqui você pode:
//     // 1. Filtrar uma lista local
//     // 2. Fazer um fetch para o seu backend Express (ex: localhost:3001/api/produtos?search=...)
//     // 3. Fazer uma busca direta no Supabase
//   };

//   return (
//     <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
//       <h1>Painel de Controle</h1>
//       <p>Encontre os itens do seu banco de dados:</p>
      
    
//       <SearchBar 
//         placeholder="Digite o nome do produto..." 
//         onSearch={handleSearchSubmit} 
//       />
//     </main>
//   );
// }
//  */

//'use client';

// import { useState, ChangeEvent } from 'react';

// // 1. Tipagem das Props da Barra de Pesquisa
// interface BarraDePesquisaProps {
//   termo: string;
//   aoMudar: (novoTermo: string) => void;
//   placeholder?: string;
// }

// // Componente Reutilizável de Input
// export function BarraDePesquisa({ termo, aoMudar, placeholder = 'Pesquisar...' }: BarraDePesquisaProps) {
//   const lidarComMudanca = (e: ChangeEvent<HTMLInputElement>) => {
//     aoMudar(e.target.value);
//   };

//   return (
//     <div className="w-full max-w-md">
//       <input
//         type="text"
//         value={termo}
//         onChange={lidarComMudanca}
//         placeholder={placeholder}
//         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// }

// // 2. Exemplo de uso em uma Página
// export default function PaginaExemplo() {
//   const [busca, setBusca] = useState<string>('');

//   const itens = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'];

//   // Filtragem estática com base na digitação
//   const itensFiltrados = itens.filter((item) =>
//     item.toLowerCase().includes(busca.toLowerCase())
//   );

//   return (
//     <main className="p-8 space-y-4">
//       <h1 className="text-2xl font-bold">Lista de Tecnologias</h1>
      
//       <BarraDePesquisa termo={busca} aoMudar={setBusca} placeholder="Busque uma tecnologia..." />

//       <ul className="list-disc pl-5">
//         {itensFiltrados.length > 0 ? (
//           itensFiltrados.map((item, index) => <li key={index}>{item}</li>)
//         ) : (
//           <p className="text-gray-500">Nenhum resultado encontrado.</p>
//         )}
//       </ul>
//     </main>
//   );
// }

// const BACKEND_URL=process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"

// export async function buscarRecurso(query: string){
//     if(!query || query.trim() === '') return []
//     try{
//         const response=await fetch(`${BACKEND_URL}/api/search?query=`)
//         `${BACKEND_URL}/api/search?query=${encodeUR
//     }
// }



// "use client";

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { fetchMovieSuggestions, MovieSearchResult } from '@/services/api';

// export default function SearchBar() {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState<MovieSearchResult[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const searchContainerRef = useRef<HTMLDivElement>(null);

//   // Efeito disparado no evento "input" (à medida que o valor de query muda)
//   useEffect(() => {
//     const getSuggestions = async () => {
//       // Limpa as sugestões se o campo for esvaziado
//       if (query.trim().length === 0) {
//         setSuggestions([]);
//         setIsOpen(false);
//         return;
//       }

//       // Busca as previsões no backend Fastify
//       const results = await fetchMovieSuggestions(query);
//       setSuggestions(results.slice(0, 5)); // Exibe até 5 resultados na prévia
//       setIsOpen(results.length > 0);
//     };

//     // Debounce simples para otimizar chamadas
//     const timeoutId = setTimeout(getSuggestions, 300);
//     return () => clearTimeout(timeoutId);
//   }, [query]);

//   // Esconde o dropdown se o usuário clicar fora do componente
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div ref={searchContainerRef} className="relative w-full max-w-md">
//       {/* Entrada do Usuário */}
//       <input
//         type="text"
//         id="field"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onFocus={() => query.trim() !== '' && setIsOpen(true)}
//         placeholder="Buscar filmes ou séries..."
//         className="w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       {/* Dropdown de Previsão de Pesquisa (AutoComplete) */}
//       {isOpen && (
//         <div 
//           id="suggestions" 
//           className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
//         >
//           {suggestions.map((movie) => (
//             <Link
//               key={movie.id}
//               href={`/filme/${movie.id}`} // Link que leva diretamente à página do filme
//               onClick={() => setIsOpen(false)}
//               className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors border-b last:border-b-0"
//             >
//               {movie.poster_path ? (
//                 <Image
//                   src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
//                   alt={movie.title}
//                   width={36}
//                   height={54}
//                   className="rounded object-cover"
//                 />
//               ) : (
//                 <div className="w-9 h-13 bg-gray-300 rounded flex items-center justify-center text-xs">
//                   Sem Foto
//                 </div>
//               )}
              
//               <div className="flex flex-col">
//                 <span className="font-semibold text-gray-800 text-sm">{movie.title}</span>
//                 {movie.release_date && (
//                   <span className="text-xs text-gray-500">
//                     {new Date(movie.release_date).getFullYear()}
//                   </span>
//                 )}
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }