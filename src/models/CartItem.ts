import { ProdutoDTO } from './ProdutoDTO';

export interface CartItem {
  quantidade: number;
  produto: ProdutoDTO;
}
