import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { MenuControllerI } from '@ionic/core';
import { CredenciaisDTO } from 'src/models/CredenciaisDTO';
import { AuthService } from 'src/services/AuthService';
import { StorageService } from 'src/services/StorageService';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage {

  credenciais: CredenciaisDTO = {
    email: '',
    senha: ''

  };

  constructor(
    private router: Router,
    public nav: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public storage: StorageService
    ) { }


  ionViewDidEnter() {
    if(this.storage.getLocalUser() != null){
      this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.router.navigateByUrl('categorias');
      },
      error => {});

    }

  }

  login() {
    this.auth.authenticate(this.credenciais).subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.router.navigateByUrl('categorias');
    },

    error => {});

    }

  }
