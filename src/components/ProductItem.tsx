import { memo, useState } from 'react';
import dynamic from 'next/dynamic';
import { AddProductToWishlistProps } from './AddProductToWishlist';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist),
  { loading: () => <span>Carregando...</span> }
);

interface ProductItemProps {
  product: {
    id: number;
    title: string;
    price: number;
  };
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && <AddProductToWishlist
        onAddToWishlist={() => onAddToWishlist(product.id)}
        onRequestClone={() => setIsAddingToWishlist(false)}
      />}
    </div>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});