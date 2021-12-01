import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  PasswordCallback,
  ValidatedCreatePasswordCallback,
} from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
})
export class PasswordComponent implements OnInit {
  @Input() callback?: PasswordCallback | ValidatedCreatePasswordCallback;
  @Input() name?: string;
  @Output() updatedCallback = new EventEmitter<string>();

  isVisible: boolean = false;
  isRequired: boolean = false;

  failureMessages: string[] = [];

  ngOnInit(): void {
    this.isRequired = this.getIsRequired(this.callback);
    this.failureMessages = this.evaluateFailedPolicies(this.callback);
  }

  updateValue(event: any): void {
    this.updatedCallback.emit(event.target.value);
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  getIsRequired(
    callback?: PasswordCallback | ValidatedCreatePasswordCallback
  ): boolean {
    if (callback === undefined || callback instanceof PasswordCallback)
      return false;

    const policies = callback.getPolicies();

    if (policies.policyRequirements) {
      return policies.policyRequirements.includes('REQUIRED');
    } else if (callback?.isRequired) {
      return callback.isRequired();
    }

    return false;
  }

  evaluateFailedPolicies(
    callback?: PasswordCallback | ValidatedCreatePasswordCallback
  ): string[] {
    if (callback === undefined || callback instanceof PasswordCallback)
      return [];

    const failedPolicies = callback.getFailedPolicies();

    const validationFailures: string[] = [];

    failedPolicies.forEach((policy) => {
      const policyObj = JSON.parse(JSON.parse(JSON.stringify(policy)));

      console.log(policyObj.policyRequirement);

      switch (policyObj.policyRequirement) {
        case 'LENGTH_BASED':
          validationFailures.push(
            `Ensure password contains more than ${policyObj.params['min-password-length']} characters. `
          );
          break;
        case 'CHARACTER_SET':
          validationFailures.push(
            `Ensure password contains 1 of each: capital letter, number and special character. `
          );
          break;
        default:
          break;
      }
    });
    return validationFailures;
  }
}
