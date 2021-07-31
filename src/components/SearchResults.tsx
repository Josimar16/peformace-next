import { useMemo } from 'react';
import { ProductItem } from "./ProductItem";

interface Product {
  id: number;
  title: string;
  price: number;
}

interface SearchResultsProps {
  results: Product[];
  onAddToWishlist: (id: number) => void;
}

export function SearchResults({ results, onAddToWishlist }: SearchResultsProps) {

  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]);

  return (
    <div>
      <span>{totalPrice}</span>
      {results && results.map(product => (
        <ProductItem 
          key={product.id} 
          product={product} 
          onAddToWishlist={onAddToWishlist}
        />
      ))}
    </div>
  );
}