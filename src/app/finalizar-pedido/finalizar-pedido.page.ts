/* eslint-disable @typescript-eslint/dot-notation */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnderecoDTO } from 'src/models/EnderecoDTO';
import { ClienteService } from 'src/services/domain/ClienteService';
import { StorageService } from 'src/services/StorageService';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.page.html',
  styleUrls: ['./finalizar-pedido.page.scss'],
})
export class FinalizarPedidoPage implements OnInit {

  items: EnderecoDTO[];

  constructor(
    public location: Location,
    public storage: StorageService,
    public clienteService: ClienteService,
    public router: Router) { }

  ngOnInit() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];
        },
        error => {
          if (error.status === 403) {
            this.router.navigateByUrl('');
          }
        });
  }

    }

  back() {
    this.location.back();
  }
  }
