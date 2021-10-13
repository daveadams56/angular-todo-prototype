import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TokenManager, UserManager, TokenStorage, FRUser } from '@forgerock/javascript-sdk';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.checkUserAuthenticated();
  }

  checkUserAuthenticated(): void {
    TokenStorage.get().then(tokens => {
      // Assume user is likely authenticated if there are tokens
      this.userService.isAuthenticated;

      console.log("user authenticated")
      UserManager.getCurrentUser().then((info) => {
        this.userService.info = info;
        console.log(info);
      }).catch(error => {
        // User likely has stale tokens; log them out
        FRUser.logout();
      });
    }).catch(error => {
      // User is probably not authenticated
      console.log("user not authenticated: " + error)
    })
  }
}
