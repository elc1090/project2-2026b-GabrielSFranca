"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

// 1. Definimos a tipagem das propriedades (Props) do componente
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({ placeholder = "Pesquisar...", onSearch }: SearchBarProps) {
  // 2. Estado para armazenar o texto digitado
  const [query, setQuery] = useState<string>("");

  // 3. Tipagem correta para o evento de mudança do input
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // 4. Tipagem para o envio do formulário
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita o recarregamento da página
    onSearch(query); // Dispara a função de busca herdada do componente pai
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        🔍 Buscar
      </button>
    </form>
  );
}

// Estilização básica (você pode substituir por Tailwind CSS ou CSS Modules)
const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: "flex",
    gap: "8px",
    width: "100%",
    maxWidth: "500px",
    margin: "20px 0",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

/**
 * "use client";

import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  // Esta função será executada sempre que o usuário clicar no botão de buscar
  const handleSearchSubmit = (searchTerm: string) => {
    console.log("Termo pesquisado pelo usuário:", searchTerm);
    
    // Aqui você pode:
    // 1. Filtrar uma lista local
    // 2. Fazer um fetch para o seu backend Express (ex: localhost:3001/api/produtos?search=...)
    // 3. Fazer uma busca direta no Supabase
  };

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Painel de Controle</h1>
      <p>Encontre os itens do seu banco de dados:</p>
      
    
      <SearchBar 
        placeholder="Digite o nome do produto..." 
        onSearch={handleSearchSubmit} 
      />
    </main>
  );
}
 */