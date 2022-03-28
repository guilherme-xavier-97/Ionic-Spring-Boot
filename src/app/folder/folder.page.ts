import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { MenuControllerI } from '@ionic/core';
import { CredenciaisDTO } from 'src/models/CredenciaisDTO';
import { AuthService } from 'src/services/AuthService';

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
    public menu: MenuController,
    public auth: AuthService
    ) { }

  ionViewWillEnter(){
    this.menu.swipeGesture(false);
  }

  ionViewDidLeave() {
    this.menu.swipeGesture(true);
  }
  login() {
    this.auth.authenticate(this.credenciais).subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.router.navigate(['/categorias']);
    },

    error => {});

    }

  }

