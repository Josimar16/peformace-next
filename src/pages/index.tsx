import { FormEvent, useCallback, useState } from 'react';
import { SearchResults } from '../components/SearchResults';

interface Product {
  id: number;
  title: string;
  price: number;
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json();

    setResults(data);
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Digite aqui"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <SearchResults
        results={results}
        onAddToWishlist={addToWishlist}
      />
    </div>
  )
}


/**
 * 1. Criar uma nova versão do componente
 * 2. Comparar com a versão anterior
 * 3. Se houverem alterações vai atualizar o que alterou
 */

/**
 * 1. Pure Function Components -> quando o componente não depende de nada de terceiros
 * 2. Renders too often
 * 3. Re-renders with same props
 * 4. Medium to big size
 */

/**
 * useMemo / useCallback
 *
 * 1. Cálculos pesados
 * 2. Igualdade referencial (quando repassa a informação para o componente filho)
 */