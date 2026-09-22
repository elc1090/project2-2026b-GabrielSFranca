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