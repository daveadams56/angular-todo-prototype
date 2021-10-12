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

  step?: FRStep;
  failure?: FRLoginFailure
  success?: FRLoginSuccess
  title?: String

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.nextStep();
  }

  nextStep(step?: any): void {
    FRAuth.next(step)
      .then((step) => {
        switch (step.type) {
          case 'LoginFailure':
            this.handleFailure(step);
            break;
          case 'LoginSuccess':
            this.handleSuccess(step);
            break;
          case 'Step':
            this.handleStep(step);
            break;
          default: this.handleFailure()
        }
      })
      .catch(console.log);
  }

  handleFailure(failure?: FRLoginFailure) {
    this.title = "Sorry, that didn't work"
    this.failure = failure;
    console.log("failure: ")
  }

  handleSuccess(success?: FRLoginSuccess) {
    this.title = "You are now authenticated"
    this.success = success;
    console.log("success");

    TokenManager.getTokens({ forceRenew: true }).then(() => {
      UserManager.getCurrentUser().then((info) => {
        this.userService.info = info;
        this.userService.isAuthenticated = true;

        this.redirectToHome();
      });
    });
  }

  handleStep(step?: FRStep) {
    this.step = step;
    this.title = step?.getHeader();
  }

  reset() {
    this.step = undefined;
    this.failure = undefined;
    this.success = undefined;
    this.title = undefined;
    this.nextStep();
  }

  redirectToHome() {
    this.router.navigateByUrl('/home');
  }

}
