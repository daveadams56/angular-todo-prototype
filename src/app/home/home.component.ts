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
    this.userService.refreshUserAuthentication();
  }

  
}
