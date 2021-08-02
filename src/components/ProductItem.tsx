import { memo, useState } from 'react';
import dynamic from 'next/dynamic';
import { AddProductToWishlistProps } from './AddProductToWishlist';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist),
  // eslint-disable-next-line react/display-name
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

  async function showFormattedDate() {
    // Caso queira buscar uma lib apenas na chamada de uma função, sem precisar que ela recarregue na renderização
    const {format} = await import('date-fns');

    format();
  }

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