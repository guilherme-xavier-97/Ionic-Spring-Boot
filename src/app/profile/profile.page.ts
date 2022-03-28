import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/StorageService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email: string;

  constructor(public storage: StorageService) { }

  ngOnInit() {
    const localUser = this.storage.getLocalUser();

    if(localUser && localUser.email) {
      this.email = localUser.email;
    }
  }

}
