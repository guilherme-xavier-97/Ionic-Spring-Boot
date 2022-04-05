import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_CONFIG } from 'src/config/APIConfig';
import { ClienteDTO } from 'src/models/ClienteDTO';
import { ClienteService } from 'src/services/domain/ClienteService';
import { StorageService } from 'src/services/StorageService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO;

  constructor(
    public storage: StorageService,
    public clienteService: ClienteService,
    public router: Router) { }

  ngOnInit() {
    const localUser = this.storage.getLocalUser();

    if(localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.getImageIfExists();
      },
      error => {
        //Se o token estiver inválido e der ero 403, eu redireciono prapágina inicial
        if (error.status === 403) {
          this.router.navigate(['/folder/Inbox']);
        }

      });

    }

    else {
      this.router.navigate(['/folder/Inbox']);
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error => {});
  }

}
