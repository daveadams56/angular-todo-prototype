import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FRAuth, FRLoginFailure, FRLoginSuccess, FRStep, TokenManager, UserManager, StepType } from '@forgerock/javascript-sdk';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
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

  async nextStep(step?: FRStep): Promise<void> {
    this.submittingForm = true;

    try {
      let nextStep = await FRAuth.next(step, { tree: this.tree });

      switch (nextStep.type) {
        case 'LoginFailure':
          this.handleFailure(nextStep);
          break;
        case 'LoginSuccess':
          this.handleSuccess(nextStep);
          break;
        case 'Step':
          this.handleStep(nextStep);
          break;
        default: this.handleFailure();
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.submittingForm = false
    }
  }

  handleFailure(failure?: FRLoginFailure) {
    this.failure = failure;
  }

  async handleSuccess(success?: FRLoginSuccess) {
    this.success = success;

    try {
      await TokenManager.getTokens({ forceRenew: true });

      let info = await UserManager.getCurrentUser();
      this.userService.info = info;
      this.userService.isAuthenticated = true;

      this.router.navigateByUrl('/');
    } catch (err) {
      console.error(err);
    }
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
        this.buttonText = "Sign In";
        this.tree = environment.JOURNEY_LOGIN;
        break;
      }
      case 'register': {
        this.title = "Sign Up";
        this.buttonText = "Register",
        this.tree = environment.JOURNEY_REGISTER
        break;
      }
      default: {
        this.title = "Welcome";
        this.buttonText = "Next"
        this.tree = environment.JOURNEY_LOGIN
        break;
      }
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
