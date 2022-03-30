import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/AuthService';
import { StorageService } from 'src/services/StorageService';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Categorias', url: '/categorias' },
    { title: 'Perfil', url: '/profile' },
    { title: 'Logout', url: '' },
  ];

  constructor(public authService: AuthService, public router: Router) {

  }

  logout(page: {title: string; url: string}) {
    switch(page.title) {
      case 'Logout':
        this.authService.lougout();
        this.router.navigateByUrl('');
        break;

    }
  }


}


