import { Component, OnInit } from '@angular/core';
import { FRUser } from '@forgerock/javascript-sdk';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit(): void { 
    this.logout();
  }

  async logout() {
    try {
      await FRUser.logout();
      this.userService.info = undefined;
      this.userService.isAuthenticated = false;
      setTimeout(() => this.redirectToHome(), 1000);
    } catch (err) {
      console.error(`Error: logout did not successfully complete; ${err}`);
    }
  }

  redirectToHome() {
    this.router.navigateByUrl('/home');
  }

}
