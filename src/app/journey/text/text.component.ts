import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AttributeInputCallback, NameCallback, PolicyRequirement, ValidatedCreateUsernameCallback } from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() callback?: NameCallback | ValidatedCreateUsernameCallback | AttributeInputCallback<string>
  @Input() name?: string
  @Output() updatedCallback = new EventEmitter<string>();

  isRequired: boolean = false;

  // TODO adapt input type based on callback type
  stringAttributeName: string = "text"

  failureMessages: string[] = []

  constructor() {
  }

  ngOnInit(): void {
    this.isRequired = this.getIsRequired(this.callback);
    console.log(this.callback?.getPrompt() + " " + this.isRequired)
    this.failureMessages = this.evaluateFailedPolicies(this.callback);
  }

  updateValue(event: any): void {
    this.updatedCallback.emit(event.target.value);
  }

  getIsRequired(callback?: NameCallback | ValidatedCreateUsernameCallback | AttributeInputCallback<string>): boolean {

    if (callback === undefined || callback instanceof NameCallback || callback.getType() === "NameCallback") return false;
    
    const policies = callback.getPolicies();

    if (callback.getType() === "ValidatedCreateUsernameCallback") {
      return policies.policyRequirements.includes('REQUIRED');
    } else {
      return callback.isRequired();
    }
  }

  evaluateFailedPolicies(callback?: NameCallback | ValidatedCreateUsernameCallback | AttributeInputCallback<string>): string[] {
    if (callback === undefined || callback instanceof NameCallback || callback.getType() === "NameCallback") return [];

    const failedPolicies = callback.getFailedPolicies();

    const validationFailures: string[] = [];

    failedPolicies.forEach(policy => {
      const policyObj = JSON.parse(JSON.parse(JSON.stringify(policy)))

      switch (policyObj.policyRequirement) {

        case 'VALID_USERNAME':
          validationFailures.push("Please choose a different username");
          break;
        case 'VALID_EMAIL_ADDRESS_FORMAT':
          validationFailures.push("Please use a valid email address");
          break;
        case 'REQUIRED':
          validationFailures.push("Please fill in this field");
          break;
        default:
          break;
      }
    });
    return validationFailures;
  }

}
