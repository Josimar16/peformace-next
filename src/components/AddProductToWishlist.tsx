export interface AddProductToWishlistProps {
  onAddToWishlist: () => void;
  onRequestClone: () => void;
}

export function AddProductToWishlist({ onAddToWishlist, onRequestClone }: AddProductToWishlistProps) {
  return (
    <span>
      Deseja adicionar aos favoritos
      <button onClick={onAddToWishlist}>Sim</button>
      <button onClick={onRequestClone}>Não</button>
    </span>
  );
}