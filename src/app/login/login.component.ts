import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FRAuth, FRStep, FRLoginFailure, FRLoginSuccess, FRUser, TokenManager, UserManager } from '@forgerock/javascript-sdk'
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit(): void {
  }
}
