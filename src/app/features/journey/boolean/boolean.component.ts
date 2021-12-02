/*
 * angular-todo-prototype
 *
 * boolean.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttributeInputCallback } from '@forgerock/javascript-sdk/lib';

@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.component.html',
})
export class BooleanComponent {
  @Input() callback?: AttributeInputCallback<boolean>;
  @Input() name?: string;
  @Output() updatedCallback = new EventEmitter<boolean>();

  updateValue(event: any): void {
    this.updatedCallback.emit(event.currentTarget.checked);
  }
}
