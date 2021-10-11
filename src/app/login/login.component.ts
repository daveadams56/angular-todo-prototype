import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config, FRAuth, FRStep, FRLoginFailure, FRLoginSuccess, FRUser } from '@forgerock/javascript-sdk'
import { environment } from '../../environments/environment';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    Config.set({
      clientId: environment.WEB_OAUTH_CLIENT, // e.g. 'ForgeRockSDKClient'
      redirectUri: environment.APP_URL, // e.g. 'https://sdkapp.example.com:8443/_callback'
      scope: "openid profile", // e.g. 'openid profile me.read'
      serverConfig: {
        baseUrl: environment.AM_URL, // e.g. 'https://openam.example.com:9443/openam/'
        timeout: 30000, // 90000 or less
      },
      realmPath: environment.REALM_PATH, // e.g. 'root'
      tree: environment.JOURNEY_LOGIN, // e.g. 'Login'
    });

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
    console.log("success")
  }

  handleStep(step?: FRStep) {
    this.step = step;
    this.title = step?.getHeader();
    console.log("step");
  }

  reset() {
    this.step = undefined;
    this.failure = undefined;
    this.success = undefined;
    this.title = undefined;
    this.nextStep();
  }

  logout() {
    FRUser.logout().then(() => this.redirectToHome());
  }

  redirectToHome() {
    this.router.navigateByUrl('/home');
  }

}
