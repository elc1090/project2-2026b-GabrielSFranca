'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

export function BarraPesquisa({ placeholder = 'Buscar...' }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    // Atualiza a URL sem recarregar a página inteira
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
        defaultValue={searchParams.get('query')?.toString() || ''}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}