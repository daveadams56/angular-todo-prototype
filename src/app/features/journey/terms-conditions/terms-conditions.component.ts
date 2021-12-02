/*
 * angular-todo-prototype
 *
 * terms-conditions.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TermsAndConditionsCallback } from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
})
export class TermsConditionsComponent {
  @Input() callback?: TermsAndConditionsCallback;
  @Input() name?: string;
  @Output() updatedCallback = new EventEmitter<boolean>();

  updateValue(event: any): void {
    this.updatedCallback.emit(event.target.checked);
  }
}
