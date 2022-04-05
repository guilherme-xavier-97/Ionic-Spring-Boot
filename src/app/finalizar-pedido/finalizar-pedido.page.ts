import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EnderecoDTO } from 'src/models/EnderecoDTO';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.page.html',
  styleUrls: ['./finalizar-pedido.page.scss'],
})
export class FinalizarPedidoPage implements OnInit {

  items: EnderecoDTO[];

  constructor(public location: Location) { }

  ngOnInit() {

    this.items = [
      {
        id: '1',
        logradouro: 'Rua Quinze de Novembro',
        numero: '300',
        complemento: 'Apto 200',
        bairro: 'Santa Mônica',
        cep: '48293822',
        cidade: {
          id: '1',
          nome: 'Uberlândia',
          estado: {
            id: '1',
            nome: 'Minas Gerais'
          }
        }
      },
      {
        id: '2',
        logradouro: 'Rua Alexandre Toledo da Silva',
        numero: '405',
        complemento: null,
        bairro: 'Centro',
        cep: '88933822',
        cidade: {
          id: '3',
          nome: 'São Paulo',
          estado: {
            id: '2',
            nome: 'São Paulo'
          }
        }
      }
    ];
  }

  back() {
    this.location.back();
  }

}
