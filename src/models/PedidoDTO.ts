import { ItemPedidoDTO } from './ItemPedidoDTO';
import { PagamentoDTO } from './PagamentoDTO';
import { RefDTO } from './RefDTO';

export interface PedidoDTO {
  cliente: RefDTO;
  enderecoDaEntrega: RefDTO;
  pagamento: PagamentoDTO;
  itens: ItemPedidoDTO[];
}
