import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FRAuth, FRLoginFailure, FRLoginSuccess, FRStep, TokenManager, UserManager, StepType } from '@forgerock/javascript-sdk';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() action?: string

  step?: FRStep;
  failure?: FRLoginFailure
  success?: FRLoginSuccess
  title?: String
  submittingForm: boolean = false

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.nextStep();
  }

  nextStep(step?: FRStep): void {
    this.submittingForm = true;
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
      .catch(console.log)
      .finally(() => this.submittingForm = false);
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

        this.router.navigateByUrl('/todos');
      });
    }).catch(console.error);
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
}
