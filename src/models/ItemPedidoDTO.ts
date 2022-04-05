import { RendererFactory2 } from '@angular/core';
import { identity } from 'rxjs';
import { RefDTO } from './RefDTO';

/*Aqui eu to simplificando o retorno, por que no item pedido original retorna quantidade, preço, produto, etc
aqui eu só quero q quantidade e o id do produto (por isso uso o RendererFactory2, pq só quero o id, os
dados atrelado ao produtos vão vir por consequencia) */

export interface ItemPedidoDTO {
  quantidade: number;
  produto: RefDTO;
}
