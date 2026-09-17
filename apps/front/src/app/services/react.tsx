'use client';

import { useState, ChangeEvent } from 'react';

// 1. Tipagem das Props da Barra de Pesquisa
interface BarraDePesquisaProps {
  termo: string;
  aoMudar: (novoTermo: string) => void;
  placeholder?: string;
}

// Componente Reutilizável de Input
export function BarraDePesquisa({ termo, aoMudar, placeholder = 'Pesquisar...' }: BarraDePesquisaProps) {
  const lidarComMudanca = (e: ChangeEvent<HTMLInputElement>) => {
    aoMudar(e.target.value);
  };

  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        value={termo}
        onChange={lidarComMudanca}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

// 2. Exemplo de uso em uma Página
export default function PaginaExemplo() {
  const [busca, setBusca] = useState<string>('');

  const itens = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'];

  // Filtragem estática com base na digitação
  const itensFiltrados = itens.filter((item) =>
    item.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Lista de Tecnologias</h1>
      
      <BarraDePesquisa termo={busca} aoMudar={setBusca} placeholder="Busque uma tecnologia..." />

      <ul className="list-disc pl-5">
        {itensFiltrados.length > 0 ? (
          itensFiltrados.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <p className="text-gray-500">Nenhum resultado encontrado.</p>
        )}
      </ul>
    </main>
  );
}