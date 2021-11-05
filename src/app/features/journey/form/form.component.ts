import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FRAuth, FRLoginFailure, FRLoginSuccess, FRStep, TokenManager, UserManager, StepType } from '@forgerock/javascript-sdk';
import { UserService } from 'src/app/services/user.service';

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
  title?: string
  buttonText?: string
  submittingForm: boolean = false
  tree?: string

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.setConfigForAction(this.action);
    this.nextStep();
  }

  nextStep(step?: FRStep): void {
    this.submittingForm = true;
    FRAuth.next(step, { tree: this.tree })
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
    this.failure = failure;
  }

  handleSuccess(success?: FRLoginSuccess) {
    this.success = success;

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

    this.setConfigForAction(this.action);

    if (step?.getHeader()) {
      this.title = step?.getHeader();
    }
  }

  setConfigForAction(action?: string) {
    switch (action) {
      case 'login': {
        this.title = "Sign In";
        this.buttonText = "Sign In"
        this.tree = environment.JOURNEY_LOGIN
      } break;
      case 'register': {
        this.title = "Sign Up";
        this.buttonText = "Register",
        this.tree = environment.JOURNEY_REGISTER
      } break;
      default: {
        this.title = "Welcome";
        this.buttonText = "Next"
        this.tree = environment.JOURNEY_LOGIN
      } break;
    }
  }

  reset() {
    this.step = undefined;
    this.failure = undefined;
    this.success = undefined;
    this.title = undefined;
    this.submittingForm = false;
    this.nextStep();
  }
}
